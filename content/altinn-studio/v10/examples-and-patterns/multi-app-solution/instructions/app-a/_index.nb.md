---
draft: true
title: App A
linktitle: App A
description: Slik setter du opp app A
weight: 10
tags: [needsReview]
aliases:
  - /app/multi-app-solution/instructions/app-a
---

App A er ansvarlig for å utløse opprettelsen av app B og sende data til den.
Du må følge flere trinn for å oppnå dette.

1. Utvid appprosessen med et ekstra steg.
2. Legg til logikk for opprettelse av app B til en hendelsestrigger.
3. Fyll/hent og send videre relevant data til den nyopprettede instansen av app B.

{{% notice warning %}}
Denne veilederen forutsetter at du allerede har en grunnleggende Altinn-app. Veilederen fokuserer på de tekniske tilpasningene som er nødvendige for å realisere formålet med flerappsløsningen.
{{% /notice %}}

## Legge til steg i prosessen

### Forstå behovet for flere steg

I de fleste tilfeller må du sende dataene som sluttbrukeren har lagt til i skjemaet, videre til app B.
Disse dataene er bevart i PDF-elementet som lagres som en del av instansobjektet.
Denne PDF-en genereres bare ved _slutten_ av et steg. Derfor trenger du et ekstra steg for å kunne hente ut PDF-en.
Du må ha minst to steg, der det siste steget _ikke_ er et datasteg. Steget kan være _confirm_ eller _feedback_.
Vi anbefaler å bruke stegtypen _confirm_, og det er det denne veilederen bruker.

### Utvide prosessen med flere steg

For å legge til steg og utvide appprosessen, må du oppdatere `process.bpmn` og `policy.xml`.

1. Du finner eksempler på hvordan du tilpasser filen `process.bpmn`, der appprosessen er definert, i
   [prosessdokumentasjonen](/nb/altinn-studio/v8/reference/configuration/process).
   <br><br>Når du bruker stegtypen _confirm_, må du tillate å gå tilbake til en tidligere stegtype, noe som også betyr
   at du må bruke _exclusive gateways_. Les mer om exclusive
   gateways [her](/nb/altinn-studio/v8/reference/configuration/process/exclusive-gateways).
2. Filen `policy.xml`, der autorisasjonsreglene er definert, trenger oppdateringer slik at du kan utføre lese- og skriveoperasjoner
   på det nye steget. <br><br>Se [XACML-policy](/nb/authorization/reference/xacml),
   [policyredigerer](/nb/altinn-studio/v8/reference/configuration/authorization)
   og [Retningslinjer for autorisasjonsregler](/nb/altinn-studio/v8/reference/configuration/authorization/guidelines_authorization)
   for detaljer. De fleste apper tillater dette som standard med gjeldende mal.

## Utløse opprettelse av app B

### Forstå behovet for spesiell tilpasning

Det essensielle formålet med en flerappsløsning avhenger av at en instans av en app opprettes av en
gitt utløserhandling i en annen Altinn-app. Den naturlige måten å opprette en Altinn-app på er ved å
gjøre en API POST-forespørsel til den kjørende Altinn-appen.
Det er ingen innebygd måte i Altinn for å utløse denne atferden, noe som betyr at du må utløse API-forespørselen med egendefinert kode i app A.

### Tilpasse app A for å utløse opprettelse av app B

Den generelle tilnærmingen for at en Altinn-app skal utføre egendefinerte operasjoner, er å implementere kode på
visse hooks, som er forhåndsdefinerte funksjoner i app-backend.
Les om hvordan du legger til denne egendefinerte koden [her](/nb/altinn-studio/v8/reference/configuration/process/pre-post-hooks).

1. Hvis filen ikke allerede finnes, opprett en fil for å implementere den egendefinerte koden som kjører på slutten
   av et steg: `ProcessTaskEnd.cs`. I filen implementerer du koden som oppretter instansobjektet som blir brukt som
   grunnlag for den nye instansen av app B. Se nedenfor for et eksempel på en mal. Sørg for at
   instansopprettelsen skjer når steget er fullført, det vil si at du bruker funksjonen `ProcessTaskEnd.End()`.
   Dette er nødvendig siden brukeren kan gå tilbake til datasteget og gjøre endringer på skjemaet.
   <br><br>`instanceOwner`-delen av instansobjektet er essensiell, da det er her du spesifiserer instanseieren.
   Når du definerer det med `OrganisationNumber`, er eieren en organisasjon. Når du definerer det med `PersonNumber`, er eieren en privatperson.
   <br><br>En naturlig del av instansobjektet er _prefill_-delen, der du legger til ønskede data som den nye instansen av app B skal fylles ut med.
   Det resulterende instansobjektet vil se omtrent slik ut:

   ```csharp
   var instanceTemplate = new InstansiationInstance
   {
       InstanceOwner = new InstanceOwner
       {
           //OrganisationNumber = [mottakerOrgNr], Eller
           //PersonNumber = [mottakerSsnNr],
       },
       Prefill = new()
       {
           {"noenDataIMottakerDataModell", noenVerdiFraDenneTriggerAppen},
           {"merDataIMottakerDataModell", noenStatiskVerdi},
           ...
       },
   };
   ```

2. For å faktisk utføre forespørselen for å opprette instansen, må du legge til en klient. Se
   [konsumer dokumentasjonen](/nb/altinn-studio/v8/reference/api/consume#implementere-klient) for et eksempel på hvordan
   du kan legge til en slik klient i appen. Et passende navn for klienten som brukes i denne konteksten kan for
   eksempel være `AppInstantiationClient`. I tillegg til instruksjonene i den refererte dokumentasjonen, trenger
   konstruktøren ytterligere konfigurasjon for HttpClient. Legg til følgende kode i konstruktøren for å legge til
   en subscription key i headeren til forespørslene som sendes av http-klienten.

   ```csharp
       public AppClient(
            ...
            HttpClient httpClient,
            ...
        {
            ...
            httpClient.DefaultRequestHeaders.Add(General.SubscriptionKeyHeaderName, platformSettings.Value.SubscriptionKey);
            _client = httpClient;
            ...
        }
   ```

   I stedet for å opprette en funksjon i klienten med navnet `GetCountry`, som i dokumentasjonen nevnt ovenfor,
   implementer følgende funksjon, `CreateNewInstance`:

   ```csharp
   public async Task<Instance> CreateNewInstance(string AppOwnerOrgName, string applicationB, InstansiationInstance instanceTemplate)
   {
      string apiUrl = $"{AppOwnerOrgName}/{applicationB}/instances/create";

      string envUrl = $"https://{AppOwnerOrgName}.apps.{_settings.HostName}";

      _client.BaseAddress = new Uri(envUrl);

      StringContent content = new StringContent(JsonConvert.SerializeObject(instanceTemplate), Encoding.UTF8, "application/json");

      HttpResponseMessage response = await _client.PostAsync(apiUrl, content);

      if (response.IsSuccessStatusCode)
      {
          Instance createdInstance = JsonConvert.DeserializeObject<Instance>(await response.Content.ReadAsStringAsync());

          return createdInstance;
      }
      throw await PlatformHttpException.CreateAsync(response);
   }
   ```

3. I filen `ProcessTaskEnd.cs` legger du til den nye _AppInstantiationClient_ i klassen `ProcessTaskEnd` på samme måte
   som _CountryClient_ legges til i klassen `DataProcessingHandler`
   i [konsumer dokumentasjonen](/nb/altinn-studio/v8/reference/api/consume#benytte-klient-i-applogikk).
   Kall deretter metoden som utløser forespørselen i appInstantiationClient slik:

   ```csharp
   Instance applicationBInstance = await _appInstantiationClient.CreateNewInstance([AppOwnerOrgName], [applicationB], [instanceTemplate]);
   ```

Hvis klienten skal autentisere seg selv som sluttbruker, heller enn appeieren via Maskinporten, se
[app-lib klientimplementeringene](https://github.com/Altinn/app-lib-dotnet/tree/main/src/Altinn.App.Core/Infrastructure/Clients)
for detaljer om hvordan du tilpasser API-forespørselen i AppInstantiationClient for å oppnå dette.

## Levere data til app B

### Forstå hvorfor du manipulerer dataene i app A

Det er naturlig å utnytte flerappsløsningen for å kontrollere presentasjonen av informasjon i app
B dynamisk, avhengig av hvilke data som er lagt inn i en instans av app A.
Dette betyr at alle tilpasninger på app B som er avhengige av data hentet fra app A, må du gjøre i app A
og på en eller annen måte levere eller representere i app B.

### Hente data fra app A

Før du kan legge til noen datatyper, må du hente dem fra Altinn Storage siden appen ikke har
direkte tilgang til dette som standard.
Den mest sannsynlige datatypen å sende videre fra app A til app B er PDF-en som inkluderer all
informasjonen som er fylt ut i instansen av app A.
For å hente denne dataen fra app A, må du hente den fra Altinn Storage.
PDF-en finnes på instansobjektet som en del av `dataTypes`-feltet med navnet `ref-data-as-pdf`.
Du kan hente dette ved å få tak i instansobjektet og hente dataen direkte på objektet, eller ved å bruke den allerede
definerte `GetBinaryData`-metoden på dataklienten.
Se eksempelkode nedenfor for begge deler:

```csharp
// Using the instance object directly with the GetInstance method on the InstanceClient
Instance updatedInstance = await _instanceClient.GetInstance(innsendingsApp, mutliAppOwner, int.Parse(instance.InstanceOwner.PartyId), instanceGuid);
DataElement pdf = updatedInstance.Data.FindLast(d => d.DataType == "ref-data-as-pdf");

// Using the GetBinaryData method on the DataClient
var stream = await _dataClient.GetBinaryData(instance.Org, instance.AppId,int.Parse(instance.InstanceOwner.PartyId), instanceGuid, Guid.Parse(pdf.Id));
```

_NB: For å bruke disse metodene i klassen `ProcessTaskEnd`, må du konfigurere konstruktøren til å bruke
InstanceClient og/eller DataClient._

<a name="kontrollere-data-i-app-b"></a>

### Kontrollere data i app B fra app A

Du kan kontrollere visse data i app B på flere måter, der du kan utnytte en eller flere:

- **Alt 1:** Legg til data som verdier i datamodellen til app B ved å legge til navnet på datamodellfeltet og
  den tilsvarende verdien i `prefill`-feltet til instansmalen som du opprettet i
  [Utløs opprettelsen av app B](#utløse-opprettelse-av-app-b)-delen over.
- **Alt 2:** Hvis intensjonen er å manipulere tekstene i Altinn-innboksen for instanser av app B,
  bruk [_presentasjonsfelt_](/nb/altinn-studio/v8/reference/configuration/messagebox/presentationfields).

- **Alt 3:** Legg til data som binære data ved å sende en POST-forespørsel til instansen av app B.

  ```csharp
  public async Task<DataElement> InsertBinaryData(string org, string app, string instanceId, string contentType, string filename, Stream stream)
  {
    string envUrl = $"https://{org}.apps.{_settings.HostName}";
    _client.BaseAddress = new Uri(envUrl);

    string apiUrl = $"{org}/{app}/instances/{instanceId}/data?dataType=vedlegg";

    StreamContent content = new(stream);
    content.Headers.ContentType = MediaTypeHeaderValue.Parse(contentType);
    if (!string.IsNullOrEmpty(filename))
    {
      content.Headers.ContentDisposition = new ContentDispositionHeaderValue(DispositionTypeNames.Attachment)
      {
        FileName = filename,
        FileNameStar = filename
      };
    }

    HttpResponseMessage response = await _client.PostAsync(apiUrl, content);

    if (response.IsSuccessStatusCode)
    {
      await Task.CompletedTask;
    }
  }
  ```

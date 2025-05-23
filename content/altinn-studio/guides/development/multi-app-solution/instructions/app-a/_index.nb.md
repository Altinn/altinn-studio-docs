---
title: Applikasjon A
linktitle: Applikasjon A
description: Instruksjoner for å sette opp applikasjon A
weight: 10
aliases:

- /app/multi-app-solution/instructions/app-a

---

Applikasjon A er ansvarlig for å utløse opprettelsen av applikasjon B og sende data til den.
For å oppnå dette må flere trinn følges.

1. Utvid applikasjonsprosessen med et ekstra steg.
2. Legg til logikk for opprettelse av applikasjon B til en hendelsestrigger.
3. Fyll/hent og send videre relevant data til den nyopprettede instansen av applikasjon B.

{{% notice warning %}}
Disse retningslinjene forutsetter at det allerede eksisterer en grunnleggende Altinn-applikasjon. Fokuset i denne
veilederen er på
de mer tekniske tilpasningene som er nødvendige for å realisere formålet med flerappsløsningen
{{% /notice %}}

## Legg til steg i prosessen

### Hvorfor behovet for flere steg

I de fleste tilfeller er det nødvendig å sende dataene som sluttbrukeren
har lagt til i skjemaet, videre til applikasjon B. Disse dataene er bevart i pdf-elementet som lagres som en del
av instansobjektet. Denne pdf-en genereres bare ved _slutten_ av et steg. Derfor er det behov for
et
ekstra steg for å kunne hente ut pdf-en. Du må ha minst to steg, der det
siste steget _ikke_ er et datasteg. Steget kan være _confirm_
eller _feedback_. Vi anbefaler å bruke stegtypen _confirm_, og det er det de følgende retningslinjene vil
bruke.

### Hvordan utvide prosessen med flere steg

For å legge til steg for å utvide applikasjonsprosessen, må vi oppdatere `process.bpmn` og `policy.xml`.

1. Du vil finne eksempler på hvordan du tilpasser filen `process.bpmn`, der applikasjonsprosessen er definert, i
   [prosessdokumentasjonen](/altinn-studio/reference/configuration/process).
   <br><br>Når du bruker stegtypen _confirm_, må vi tillate å gå tilbake til en tidligere stegtype, noe som også
   betyr
   at vi
   må dra nytte av _exclusive gateways_. Les mer om exclusive
   gateways [her](/altinn-studio/reference/configuration/process/exclusive-gateways).
2. Filen `policy.xml`, der autorisasjonsreglene er definert, trenger oppdateringer slik at lese- og skriveoperasjoner
   kan utføres på det nye steget. <br><br>Se [XACML-policy](/authorization/guides/xacml)
   , [policyredigerer](/altinn-studio/reference/configuration/authorization)
   og [Retningslinjer for autorisasjonsregler](/altinn-studio/reference/configuration/authorization/guidelines_authorization)
   for detaljer. De fleste apper tillater dette som standard med gjeldende mal.

## Utløs instansiering av applikasjon B

### Hvorfor kreves det spesiell tilpasning for å utløse instansieringen av applikasjon B

Det essensielle formålet med en flerappsløsning avhenger av at en instans av en applikasjon opprettes av en
gitt utløserhandlign i en annen Altinn-applikasjon. Den naturlige måten å instansiere en Altinn-applikasjon på er ved å
gjøre en
API POST-forespørsel til den kjørende Altinn-applikasjonen. Det er altså ingen innebygd måte i Altinn-konteksten
for å utløse
denne atferden, noe som betyr at vi må utløse API-forespørselen med egendefinert kode i applikasjon A.

### Hvordan tilpasse applikasjon A for å utløse instansiering av applikasjon B

Den generelle tilnærmingen for at en Altinn-applikasjon skal utføre egendefinerte operasjoner, er å implementere kode på
visse hooks, som
er forhåndsdefinerte funksjoner i app-backend.
Les om hvordan denne egendefinerte koden legges til [her](/altinn-studio/reference/configuration/process/pre-post-hooks).

1. Hvis det ikke allerede er til stede, opprett en fil for å implementere den egendefinerte koden som kjører på slutten
   av et
   steg, `ProcessTaskEnd.cs`. I filen implementerer du koden som oppretter instansobjektet som vil bli brukt som
   grunnlag for den nye instansen av applikasjon B. Se nedenfor for et eksempel på en mal. Sørg for at
   instansopprettelsen skjer når
   steget er fullført, dvs. bruk funksjonen `ProcessTaskEnd.End()`. Dette er nødvendig siden brukeren kan gå tilbake
   til datasteget og gjøre endringer på skjemaet. <br><br>`instanceOwner`-delen av instansobjektet er essensiell da
   det er her du spesifiserer instanseieren. Å definere det med `OrganisationNumber` betyr at eieren er en
   organisasjon,
   mens å definere det med `PersonNumber` betyr at eieren er en privatperson. <br><br>En naturlig del av instansobjektet
   er _prefill_-delen der du
   legger til ønskede data som den nye instansen av applikasjon B skal fylles ut med. Det resulterende instansobjektet
   vil se omtrent slik ut:

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
            {"noenDataIMottakerDataModell", noenVerdiFraDenneTriggerApplikasjonen},
            {"merDataIMottakerDataModell", noenStatiskVerdi}, 
            ...
        },
    };
    ```

2. For å faktisk utføre forespørselen for å opprette instansen, må vi legge til en klient. Se
   [konsumer dokumentasjonen](/nb/altinn-studio/reference/api/consume#implementere-klient) for å se et eksempel på hvordan
   en slik klient kan legges til i applikasjonen. Et passende navn for klienten som brukes i denne konteksten kan for
   eksempel være
   `AppInstantiationClient`. I tillegg til instruksjonene i den refererte dokumentasjonen, trenger
   konstruktøren vår ytterligere konfigurasjon for HttpClienten. Legg til følgende kode i konstruktøren for å legge til
   en
   subscription key i
   headeren til forespørslene som sendes av http-klienten.
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
   implementer
   den
   følgende funksjonen, `CreateNewInstance`:

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

3. I filen `ProcessTaskEnd.cs`, legg til den nye _AppInstantiationClient_ i klassen `ProcessTaskEnd` på samme måte
   som _CountryClient_ legges til i klassen `DataProcessingHandler`
   i [konsumer dokumentasjonen](/nb/altinn-studio/reference/api/consume#benytte-klient-i-applikasjonslogikk).
   Videre, kall metoden som utløser forespørselen i appInstantiationClient slik:

    ```csharp
    Instance applicationBInstance = await _appInstantiationClient.CreateNewInstance([AppOwnerOrgName], [applicationB], [instanceTemplate]);
    ```

Hvis klienten skal autentisere seg selv som sluttbruker, heller enn applikasjonseieren via maskinporten, vennligst
referanse
[app-lib klientimplementeringene](https://github.com/Altinn/app-lib-dotnet/tree/main/src/Altinn.App.Core/Infrastructure/Clients)
for detaljer om hvordan du tilpasser API-forespørselen i AppInstantiationClient for å oppnå dette.

## Levering av data til applikasjon B

### Hvorfor manipulere dataene for applikasjon B i applikasjon A

Det er naturlig å utnytte flerappsløsningen for å kontrollere presentasjonen av informasjon i applikasjon
B dynamisk avhengig av hvilke data som er lagt inn i en instans av applikasjon A. Dette betyr at alle tilpasninger på
applikasjon B som er avhengige av data hentet fra applikasjon A, må gjøres i applikasjon A og på en eller annen måte
bli levert eller representert i applikasjon B.

### Hente data fra applikasjon A for å sende videre til applikasjon B

Før noen datatyper kan legges til, må de hentes fra Altinn Storage siden applikasjonen ikke har
direkte tilgang til dette som standard.
Den mest sannsynlige datatypen å sende videre fra applikasjon A til applikasjon B er pdf-en som inkluderer all
informasjonen fylt ut i instansen av applikasjon A. For å hente denne dataen fra applikasjon A, må den hentes fra Altinn
Storage. Pdf-en eksisterer på instanstobjektet som en del av `dataTypes`-feltet med navnet `ref-data-as-pdf`. Dette kan
hentes ved å få tak i instansobjektet og hente dataen direkte på objektet, eller ved å bruke den allerede
definerte `GetBinaryData`-metoden på dataklienten.
Se eksempelkode nedenfor for begge deler:

   ```csharp
   // Using the instance object directly with the GetInstance method on the InstanceClient
   Instance updatedInstance = await _instanceClient.GetInstance(innsendingsApp, mutliAppOwner, int.Parse(instance.InstanceOwner.PartyId), instanceGuid);
   DataElement pdf = updatedInstance.Data.FindLast(d => d.DataType == "ref-data-as-pdf");
   
   // Using the GetBinaryData method on the DataClient
   var stream = await _dataClient.GetBinaryData(instance.Org, instance.AppId,int.Parse(instance.InstanceOwner.PartyId), instanceGuid, Guid.Parse(pdf.Id));
   ```

_NB: For å bruke disse metodene i klassen `ProcessTaskEnd`, må konstruktøren konfigureres for å bruke
InstanceClient og/eller DataClient._

<a name="kontrollere-data-i-app-b"></a>

### Hvordan kontrollere data i applikasjon B fra applikasjon A

Det er flere måter å kontrollere visse data i applikasjon B på, der en eller flere kan utnyttes:

- **Alt 1:** Legg til data som verdier i datamodellen til
  applikasjon B ved å legge til navnet på datamodellfeltet og
  den tilsvarende verdien i `prefill`-feltet til
  instansmalen som du opprettet i [Utløs opprettelsen av applikasjon B](#utløs-instansiering-av-applikasjon-b)
  -delen over.
- **Alt 2:** Hvis intensjonen er å manipulere tekstene i Altinn
  Innboks for instanser av applikasjon B,
  bruk [_presentasjonsfelt_](/altinn-studio/reference/configuration/messagebox/presentationfields)
  .

- **Alt 3:** Legg til data som binære data ved å sende en POST-forespørsel til instansen av applikasjon B.
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
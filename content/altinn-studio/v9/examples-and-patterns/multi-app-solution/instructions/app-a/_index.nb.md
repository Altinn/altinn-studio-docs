---
title: App A
linktitle: App A
description: Slik setter du opp app A
weight: 10
tags: [needsReview]
aliases:
  - /app/multi-app-solution/instructions/app-a
---

App A oppretter en instans av app B og sender data til den. Slik setter du det opp:

1. Legg til en PDF-oppgave i prosessen.
2. Opprett instansen av app B når prosessen i app A er ferdig.
3. Hent og send relevante data til den nye instansen av app B.

{{% notice warning %}}
Denne veilederen forutsetter at du allerede har en grunnleggende Altinn-app. Den tar bare for seg det du må endre for å lage en flerappsløsning.
{{% /notice %}}

## Legge til en PDF-oppgave i prosessen

I de fleste tilfeller må du sende dataene som brukeren har fylt ut i skjemaet, videre til app B.
Det enkleste er å sende dem som en PDF.

I v9 lager appen PDF-en i en egen systemoppgave i prosessen. Legg PDF-oppgaven rett etter dataoppgaven, slik at prosessen ser slik ut:

```text
Task_1 (data) → PDF (systemoppgave) → slutt
```

[Slik setter du opp PDF-oppgaven]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}). Du trenger ikke et ekstra steg av typen _confirm_ eller _feedback_ for å få tak i PDF-en.

Hvis du endrer prosessen, må du også sjekke at `policy.xml` gir tilgang til de nye stegene. Les mer om [tilgangsregler for appen]({{< relref "/altinn-studio/v9/develop-a-service/configuration/authorization" >}}).

## Opprette en instans av app B

### Forstå hvorfor du trenger egen kode

I en flerappsløsning oppretter app A en instans av app B. Du oppretter en instans ved å sende en POST-forespørsel til app B.
Altinn har ingen innebygd måte å gjøre dette på, så du må skrive koden selv i app A.

### Opprette instansen fra app A

Du oppretter instansen av app B i en [prosess-hook]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks" >}}) som implementerer `IOnProcessEndedHandler`. Den kjører når prosessen i app A er ferdig, altså etter PDF-oppgaven. Da kan ikke brukeren lenger gå tilbake og endre skjemaet. En app kan bare ha én `IOnProcessEndedHandler`, så hvis appen allerede har en, legger du koden inn i den. Grensesnittet ligger i `Altinn.App.Core.Features.Process`, som ikke er med i de globale `using`-linjene i appen. Du må derfor legge til `using Altinn.App.Core.Features.Process;` både i hook-klassen og i `Program.cs`.

1. Lag en klient som sender forespørslene til app B, for eksempel `AppInstantiationClient`.
   Klienten trenger metoden `CreateNewInstance`, som oppretter instansen, og metoden `InsertBinaryData`, som du bruker i [alternativ 3](#kontrollere-data-i-app-b) lenger ned.

   {{< code-title >}}
   App/logic/AppInstantiationClient.cs
   {{< /code-title >}}

   ```csharp
   public class AppInstantiationClient(HttpClient client, IOptions<GeneralSettings> settings)
   {
       public async Task<Instance> CreateNewInstance(
           string appOwnerOrgName,
           string applicationB,
           InstantiationInstance instanceTemplate,
           CancellationToken cancellationToken
       )
       {
           string url = $"https://{appOwnerOrgName}.apps.{settings.Value.HostName}/{appOwnerOrgName}/{applicationB}/instances/create";

           StringContent content = new(JsonConvert.SerializeObject(instanceTemplate), Encoding.UTF8, "application/json");

           HttpResponseMessage response = await client.PostAsync(url, content, cancellationToken);

           if (response.IsSuccessStatusCode)
           {
               return JsonConvert.DeserializeObject<Instance>(
                   await response.Content.ReadAsStringAsync(cancellationToken)
               )!;
           }
           throw await PlatformHttpException.Create(response, cancellationToken);
       }

       public async Task InsertBinaryData(
           string org,
           string app,
           string instanceId,
           string dataType,
           string contentType,
           string filename,
           ReadOnlyMemory<byte> data,
           CancellationToken cancellationToken
       )
       {
           string url = $"https://{org}.apps.{settings.Value.HostName}/{org}/{app}/instances/{instanceId}/data/type/{dataType}";

           ByteArrayContent content = new(data.ToArray());
           content.Headers.ContentType = MediaTypeHeaderValue.Parse(contentType);
           content.Headers.ContentDisposition = new ContentDispositionHeaderValue(DispositionTypeNames.Attachment)
           {
               FileName = filename,
               FileNameStar = filename,
           };

           HttpResponseMessage response = await client.PostAsync(url, content, cancellationToken);

           if (!response.IsSuccessStatusCode)
           {
               throw await PlatformHttpException.Create(response, cancellationToken);
           }
       }
   }
   ```

2. Lag hooken som oppretter instansen. Instansmalen er en `InstantiationInstance`.
   <br><br>I `InstanceOwner` oppgir du hvem som skal eie instansen.
   Med `OrganisationNumber` blir eieren en organisasjon, og med `PersonNumber` blir eieren en privatperson.
   <br><br>I `Prefill` legger du til data som appen skal fylle ut i den nye instansen av app B.

   {{< code-title >}}
   App/logic/OpprettInstansIAppB.cs
   {{< /code-title >}}

   ```csharp
   public class OpprettInstansIAppB(AppInstantiationClient appInstantiationClient) : IOnProcessEndedHandler
   {
       public async Task<HandlerResult> Execute(OnProcessEndedContext context)
       {
           var instanceTemplate = new InstantiationInstance
           {
               InstanceOwner = new InstanceOwner
               {
                   //OrganisationNumber = [mottakerOrgNr], Eller
                   //PersonNumber = [mottakerSsnNr],
               },
               Prefill = new()
               {
                   { "noenDataIMottakerDataModell", "noenVerdiFraDenneTriggerAppen" },
                   { "merDataIMottakerDataModell", "noenStatiskVerdi" },
               },
           };

           Instance instansIAppB = await appInstantiationClient.CreateNewInstance(
               "[AppOwnerOrgName]",
               "[applicationB]",
               instanceTemplate,
               context.CancellationToken
           );

           // Send eventuelt data til instansen, se «Levere data til app B» under

           return HandlerResult.Success();
       }
   }
   ```

3. Registrer klienten og hooken i `Program.cs`. Klienten bruker appens innebygde Maskinporten-identitet, slik at appen sender forespørslene til app B på vegne av tjenesteeieren.

   {{< code-title >}}
   App/Program.cs
   {{< /code-title >}}

   ```csharp
   void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
   {
       services
           .AddHttpClient<AppInstantiationClient>()
           .UseMaskinportenAltinnAuthorization(
               "altinn:serviceowner/instances.read",
               "altinn:serviceowner/instances.write"
           );

       services.AddTransient<IOnProcessEndedHandler, OpprettInstansIAppB>();
   }
   ```

{{% notice warning %}}
Appen kan kjøre hooken på nytt hvis noe feiler. Feiler hooken etter at instansen i app B er opprettet, kan et nytt forsøk opprette en instans til. Gjør derfor så lite som mulig etter `CreateNewInstance`, og vurder om koden din må sjekke om instansen allerede finnes.
{{% /notice %}}

Hooken kjører i arbeidsflytmotoren uten en innlogget bruker, så appen sender alltid forespørslene til app B som tjenesteeier. Derfor må `policy.xml` i app B gi tjenesteeieren rettighetene `instantiate`, `read` og `write`. Malen for v9 gir tjenesteeieren disse rettighetene, så du trenger bare å sjekke dette hvis du har endret tilgangsreglene i app B.

## Levere data til app B

### Forstå hvorfor app A sender data

Ofte skal det app B viser, avhenge av hva brukeren fylte ut i app A.
Da må app A sende dataene videre til app B.

### Hente data fra app A

Den mest sannsynlige datatypen å sende videre fra app A til app B er PDF-en som inkluderer all
informasjonen som er fylt ut i instansen av app A.
PDF-en ligger på instansen som et dataelement med datatypen `ref-data-as-pdf`.
I hooken henter du den gjennom `context.InstanceDataMutator`:

{{< code-title >}}
App/logic/OpprettInstansIAppB.cs
{{< /code-title >}}

```csharp
var mutator = context.InstanceDataMutator;
DataElement? pdf = mutator.Instance.Data.FindLast(d => d.DataType == "ref-data-as-pdf");

if (pdf is not null)
{
    ReadOnlyMemory<byte> pdfBytes = await mutator.GetBinaryData(pdf);
}
```

<a name="kontrollere-data-i-app-b"></a>

### Styre dataene i app B fra app A

Du kan styre dataene i app B på tre måter, og du kan kombinere dem:

- **Alt 1:** Legg til data som verdier i datamodellen til app B ved å legge til navnet på datamodellfeltet og
  den tilsvarende verdien i `Prefill`-feltet til instansmalen som du opprettet i
  delen [Opprette en instans av app B](#opprette-en-instans-av-app-b) over.
- **Alt 2:** Hvis du vil styre tekstene i Altinn-innboksen for instanser av app B,
  bruker du [presentasjonsfelt]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/messagebox/presentationfields" >}}).

- **Alt 3:** Legg til data som binære data i instansen av app B med metoden `InsertBinaryData` i klienten over. App B må ha en datatype med samme id, her `vedlegg`, i `App/config/applicationmetadata.json`. Har datatypen `allowedContentTypes`, må `application/pdf` være med. I hooken kaller du metoden etter at du har opprettet instansen:

  {{< code-title >}}
  App/logic/OpprettInstansIAppB.cs
  {{< /code-title >}}

  ```csharp
  if (pdf is not null)
  {
      ReadOnlyMemory<byte> pdfBytes = await mutator.GetBinaryData(pdf);

      await appInstantiationClient.InsertBinaryData(
          "[AppOwnerOrgName]",
          "[applicationB]",
          instansIAppB.Id,
          "vedlegg",
          "application/pdf",
          "skjema.pdf",
          pdfBytes,
          context.CancellationToken
      );
  }
  ```

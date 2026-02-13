---
draft: true
title: Utvidet filvalidering
description: Slik utfører du utvidet filvalidering.
toc: false

tags: [needsReview, needsTranslation]
---

{{% notice info %}}
Denne funksjonaliteten krever at appen bruker minst [versjon 7.10.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v7.10.0) av Altinn.App.Core og Altinn.App.Api NuGet-pakkene.
{{% /notice %}}

{{% notice warning %}}
Ved å aktivere denne funksjonen endrer du formatet på svaret i HTTP-responsen fra streng til JSON. Du får fremdeles samme HTTP-statuskode, men kroppen inneholder en rekke JSON-objekter som beskriver feilen.
{{% /notice %}}


## Innledning

Som standard utfører systemet bare enkel validering av en fil før du laster den opp og lagrer den.
Dette sikrer at filen overholder reglene satt for datatypen og opplastingskomponenten.
Standardsjekkene kontrollerer om

- filutvidelsen er gyldig i henhold til de konfigurerte MIME-typene
- filstørrelsen er under den konfigurerte grensen
- antall opplastede filer er under den konfigurerte grensen

Utvidet filvalidering gir deg mulighet til å analysere bytestrømmen til de opplastede filene før systemet lagrer dem, og returnere feilmeldinger til klienten hvis det er noe galt. Som standard følger det med en MIME-typekontroller som skanner filen for å se om den er av den typen den hevder å være. Du kan lage og legge til egenutviklede valideringer for å validere ulike typer filer og metadata. Du kan for eksempel skrive en analyse som sjekker om en PNG-fil har en minimumsoppløsning før systemet godtar den, eller om en PDF-fil er av en bestemt versjon.

Altinn.App.Core NuGet-pakken definerer grensesnittene som kreves, i tillegg til å sikre at systemet kaller koden. Analyseimplementeringene er tilgjengelige som en separat [NuGet-pakke](https://www.nuget.org/packages/Altinn.FileAnalyzers) som du kan importere i appen din. Grunnen til denne separasjonen er å holde kjernen til en Altinn 3-applikasjon så liten som mulig, og å kunne lansere og bruke nye analyser uten å måtte oppgradere appen (utover v7.10.0).


## Konfigurer og aktiver standard MIME-type-validering i appen din

1. **Legg til en referanse til [Altinn.FileAnalyzers NuGet-pakken](https://www.nuget.org/packages/Altinn.FileAnalyzers)**
   Åpne kommandolinjen til applikasjonsrepoet og naviger til mappen App der App.csproj-filen er plassert. Kjør følgende kommando:
   ```shell
   nuget install Altinn.FileAnalyzers
   ```
2. **Registrer tjenesten for MIME-type-valideringen slik at den blir tilgjengelig**
   ```csharp
   services.AddMimeTypeValidation();
   ```
3. **Konfigurer validatoren for den datatypen den skal brukes for**
   Konfigurer validatoren per datatype. Den kjører bare mot den konfigurerte datatypen. Eksempelet nedenfor konfigurerer MIME-type-analysen og den tilhørende valideringskomponenten.
   ```json
      {
         "id": "08112113-cc3a-4d35-a8d2-bfba53a1ddfd",
         "allowedContentTypes": ["image/jpeg", "application/pdf"],
         "taskId": "Task_1",
         "maxSize": 25,
         "maxCount": 1,
         "minCount": 1,
         "enablePdfCreation": false,
         "enabledFileAnalysers": [ "mimeTypeAnalyser" ],
         "enabledFileValidators": [ "mimeTypeValidator" ]
      }
   ```
4. **Legg til støtte for JSON-objekter i dataresponsen**
    Dette forteller frontend at den skal se etter JSON i svaret for å gi en feilmelding til brukeren.
    ```json
      "FeatureManagement": {
        "JsonObjectInDataResponse": true
      }
    ```

## Skriv din egen analyse

Hvis du vil skrive din egen validator, må du implementere to grensesnitt: `IFileAnalyser` og `IFileValidator`. `IFileAnalyser` analyserer filen for eventuelle metadata du vil validere på og returnerer disse i en `FileAnalysisResult`. Systemet sender deretter resultatet til valideringslogikken. Resultatet inneholder noen navngitte egenskaper som filnavn, MIME-type og ID-en til analysatoren som opprettet resultatet. Du sender eventuelle tilleggsmetadata som nøkkel/verdi-par i Metadata-propertyen. Denne separasjonen gjør det mulig å gjenbruke analysatoren for å ekstrahere metadata om filen for andre formål.

1. **Implementer grensesnittet `IFileAnalyser`**
   Grensesnittet har en egenskap `Id` og en metode `Analyse` som du må implementere.
    `Id`-egenskapen skal være unik og brukes når du konfigurerer analysatoren i filen `applicationmetadata.json`. Dette er hvordan implementasjonen din blir valgt når appen bestemmer hvilken analyse som skal kjøres for en gitt datatype.
    Eksempel fra standardimplementeringen av MIME-type-analysatoren:
    ```csharp
    public string Id { get; private set; } = "mimeTypeAnalyser";
    ```
    Metoden `Analyse` får bytestrømmen som representerer filen og et filnavn hvis tilgjengelig (vanligvis er det tilgjengelig). Strømmen er allerede satt til posisjon 0 og kan leses direkte.
    Eksempel fra standardimplementeringen av MIME-type-analysatoren:
    ```csharp
      public async Task<FileAnalysisResult> Analyse(Stream stream, string? filename = null)
        {
            var results = _inspector.Inspect(stream);

            var match = results.OrderByDescending(match => match.Points).FirstOrDefault(match => match.Percentage == 1);

            // Du oppgir ID-en til analysatoren i resultatet for å kunne skille mellom resultater fra forskjellige analysatorer.
            var fileAnalysisResult = new FileAnalysisResult(Id);
            if (match != null)
            {
                fileAnalysisResult.Extensions = match.Definition.File.Extensions.ToList();
                fileAnalysisResult.MimeType = match.Definition.File.MimeType;
                fileAnalysisResult.Filename = filename;
                fileAnalysisResult.Metadata.Add("key", "value"); //Dette viser bare hvordan du legger til egendefinerte metadata.
            }

            return fileAnalysisResult;
        }
      ```
2. **Implementer grensesnittet `IFileValidator`**
   Basert på analyseresultatet kan du skrive valideringslogikken. Valideringen er tett knyttet til metadataegenskapene du vil validere mot, noe som betyr at du må vite nøkkelen og typen verdier du kan forvente.
   Grensesnittet har en egenskap `Id` og en metode `Validate` som du må implementere.
   `Id`-egenskapen skal være unik og brukes når du konfigurerer analysatoren i filen `applicationmetadata.json`. Dette er hvordan implementasjonen din blir valgt når appen bestemmer hvilken validering som skal kjøres for en gitt datatype.
   Eksempel fra standardimplementeringen av MIME-type-validatoren:
   ```csharp
   public string Id { get; private set; } = "mimeTypeValidator";
   ```
   Metoden `Validate` får datatypen den kjører for, og resultatet fra analysen. Den returnerer en `bool` som indikerer om valideringen var vellykket eller ikke, og i tilfelle feil en liste over feilene.
   ```csharp
     public async Task<(bool Success, IEnumerable<ValidationIssue> Errors)> Validate(DataType dataType, IEnumerable<FileAnalysisResult> fileAnalysisResults)
     {
         List<ValidationIssue> errors = new();

         var fileMimeTypeResult = fileAnalysisResults.FirstOrDefault(x => x.MimeType != null);

         // Sjekk om filens MIME-type er en tillatt innholdstype
         if (!dataType.AllowedContentTypes.Contains(fileMimeTypeResult?.MimeType, StringComparer.InvariantCultureIgnoreCase) && !dataType.AllowedContentTypes.Contains("application/octet-stream"))
         {
             ValidationIssue error = new()
             {
                 Source = "File",
                 Code = ValidationIssueCodes.DataElementCodes.ContentTypeNotAllowed,
                 Severity = ValidationIssueSeverity.Error,
                 Description = $"Filen {fileMimeTypeResult?.Filename + " "}virker ikke å være av en tillatt innholdstype i henhold til konfigurasjonen for datatypen {dataType.Id}. Tillatte innholdstyper er {string.Join(", ", dataType.AllowedContentTypes)}",
                 CustomTextKey = "My.text.resource.key"
             };

             errors.Add(error);

             return (false, errors);
         }

         return (true, errors);
     }
   ```
3. **Registrer implementasjonen i appens DI-kontainer**
   Når koden din er på plass, må du registrere implementasjonen for at koden skal kjøre når brukeren laster opp filer.
   ```csharp
    services.AddTransient<IFileAnalyser, YourAnalyserImplementation>();
    services.AddTransient<IFileValidator, YourValidatorImplementation>();
   ```
4. **Konfigurer analysen og validatoren**
   Når du har implementert analysatoren og valideringslogikken, må du konfigurere dem i filen _applicationmetadata.json_. I konfigurasjonen av datatypen må du legge til analysatoren og valideringskomponenten med riktig ID.
   ```json
       {
      "id": "08112113-cc3a-4d35-a8d2-bfba53a1ddfd",
      "allowedContentTypes": [
        "image/jpeg", "application/pdf"
      ],
      "taskId": "Task_1",
      "maxSize": 25,
      "maxCount": 1,
      "minCount": 1,
      "enablePdfCreation": false,
      "enabledFileAnalysers": [ "mimeTypeAnalyser" ],
      "enabledFileValidators": [ "mimeTypeValidator" ]
    }
    ```

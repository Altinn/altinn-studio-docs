---
title: Hva er nytt?
description: Oversikt over endringer som ble introdusert i versjon 4.
toc: true
tags: [translate-to-norwegian]
---

## 4.34.1 (06.04.2022) - Støtte for forsendelsestype på eFormidling forsendelse

Denne releasen muliggjør spesifisering av forsendelsestype. 

Utvid `eFormidling`-seksjonen i applicationmetadata.json med den nye egenskapen `dpfShipmentType` som vist nedenfor.

```json
  "eFormidling": {
    ...
    "dpfShipmentType": "altinn3.skjema"
  }
```

## 4.33.0 (15.03.2022) - Støtte for å slå av PDF generering for skjema

- Denne releasen gjør det mulig å slå av PDF generering for enkeltskjema i en applikasjon. 

Dette gjøres ved å sette flag i application metadata på en gitt datatype. Standard er true

Eksempel.

```json
{
      "id": "melding",
      "allowedContentTypes": [ "application/xml" ],
      "maxCount": 1,
      "appLogic": {
        "autoCreate": false,
        "ClassRef": "App.IntegrationTestsRef.Data.apps.dibk.nabovarsel.Melding"
      },
      "taskId": "Task_1",
      "enablePdfCreation" : false
    }

```


## 4.32.0 (14.03.2022) - Person oppslagstjeneste
Register applikasjonen i platform har blitt oppdatert med et nytt endepunkt som kan brukes til å verifisere et personnummer. Denne versjonen av NuGet pakkene til en app har fått implementert en oppslagstjeneste som kan brukes til å gjøre oppslag mot dette nye endepunktet i Register.


## 4.31.1 (10.03.2022) - Fikset bug relatert til prefill og berriket instance events med personnumer

- Denne releasen løser en bug der prefill av samme verdi til mer enn ett felt kaster en _duplicate key exception_.
- Personnummer legges nå til i platformUser objektet for instance events.
  
## 4.30.0 (07.03.2022) - Støtte for readiness og livenessprober
Det er nå lagt til et endepunkt for helsesjekk i applikasjonen. 
Dette benyttes blant annet av Kubernetes til å vite når en applikasjonsinstans er klar til å settes inn i last. 

For alle applikasjon opprettet før 16.03.2022 må det gjøres manuelle endringer
for å aktivere readiness og liveness probene.

1. I  `App/Startup.cs`
   1.  Legg til linjen `using Altinn.App.Core.Health;` blant de andre _using_-referansene øverst i filen.

   2. I metoden `ConfigureServices` legger du til linjen 

      ```cs
      services.AddHealthChecks().AddCheck<HealthCheck>("default_health_check");
      ```
   3. I metoden `Configure` legger du til linjen

      ```cs
      app.UseHealthChecks("/health");
      ```
2. I `deployment/Chart.yaml` skal referansen til Studio helm charten oppdateres til versjon `2.1.0`
   
   Endelig resultat bør likne på dette: 

   ```yaml
   apiVersion: v1
   description: A Helm chart for Kubernetes
   name: deployment
   version: 1.1.0

   dependencies:
   - name: deployment
      repository: https://charts.altinn.studio/
      version: 2.1.0
   ```

3. I `deployment/values.yaml` legger du til 

   ```yaml
   readiness:
     enabled: true

   liveness:
     enabled: true
   ```

**MERK** antall innrykk er viktig i filen. `readiness` og `liveness` skal stå på nivået under `deployment` 
og på samme nivå som `volumeMounts` og `volumes`


## 4.27.0 (23.02.2022) - Sikre kodelister
Lagt til støtte for sikre kodelister
Rettet url og parameter logik i GetInstanceEvents
Endret redirect url fra string til base64 encoded string

## 4.26.0 (2022-02-10) - Forbedringer knyttet til PDF og tekstressurser

Nyinnførte tekstressurs `appName`  benyttes som tittel på PDF.
Lokal kopi av tekstressurser benyttes i PDF i stedet for tekstressurser fra Platform Storage. 


## 4.25.0 (2022-01-24) - Dynamiske konfigurasjonsverdier for frontend 
Det er blitt laget en ny seksjon kalt `FrontEndSettings` for bruk i `appsetting.{miljø}.json` filer. Dette eksponeres til frontendapplikasjonen som `applicationSettings` og er en dynamisk liste med verdier. I praksis betyr dette at `FrontEndSettings` kan utvides med innslag uten at man må gjøre kodeendringer i backend. Dette gjør det mulig for backend å tilby miljøspesifikke verdier til frontend.

## 4.24.0 (2020-01-21)

Støtte for språk og query parametre inn til dynamiske kodelister.
Ny måte å implementere dynamiske kodelister ved hjelp av IAppOptionsProvider. [Se dokumentasjon](../../../../../altinn-studio/guides/development/options/)

## 4.23.0 (2022-01-15) - Støtte for BPMN Gateways
Restrukturering av prosessmotor og støtte for BPMN gateways.

## 4.22.0 (2022-01-07) - Included access token generation for eFormidling integration point
Integrasjonspunktet som benyttes for å sende instansdata via eFormidling
krever nå et gyldig tilgangstoken. Applikasjonstemplaten er nå oppdatert til å 
fylle alle krav for integrasjonspunktet.

## 4.21.0 (2021-12-01) - Støtte for lagring av brukernavn for instanseier
Dersom en selvidentifisert bruker instansierer en instans vil dere brukernavn lagres i metadataen for instanseier.

## 4.20.0 (2021-11-18) - Støtte for egendefinert redirect URL når man avslutter appen
Lagt til støtte for ett spesifikt query parameter (returnUrl) for å videresende brukeren til den spesifiserte URLen når
brukeren avslutter appen ved å trykke på avslutt-knappen i Altinn 3 appen.
[Les mer om dette her](../../../../../../../altinn-studio/reference/configuration/queryparameters)   

Relatert til [7183](https://github.com/Altinn/altinn-studio/issues/7183)

## 4.19.0 (2021-11-15) - Added support for instantiation based of a copy of an archived instance
Lagt til støtte for å instansiere en applikasjon basert på en arkivert instans.
[Det nye endepunktet er dokumentert her](../../../../../api/apps/instances). 
Merk at støtte for kopiering av instans i meldingsboksen og konfigurasjon av funksjonaliteten via Altinn Studio enda er under utvikling.

Relatert til [6695](https://github.com/Altinn/altinn-studio/issues/6695)


## 4.18.0 (2021-11-10) - Støtte for OIDC konfigurasjon i App
Lagt til støtte for å konfigurere opp en spesifikk OIDC provider for en app.

Relatert til [7173](https://github.com/Altinn/altinn-studio/issues/7173)

## 4.17.2 (2021-10-27) - Lagt inn API for prefill i form av nøkkel-verdi par ved instansiering
Det er nå mulig å angi prefill i form av nøkkel-verdi par ved instansiering av en app. Støtten for dette er innført i et nytt API endepunkt.

Det er også mulig å bruke prefill verdiene i app spesifikk kode. Dette vil kreve at app'en implementerer siste versjon av `App.cs`. Legg til følgende metode:

```c#
public override async Task RunDataCreation(Instance instance, object data, Dictionary<string, string> prefill)
{
   await _instantiationHandler.DataCreation(instance, data, prefill);
}
```

I tillegg må `InstansiationHandler.cs` oppdateres med methoden:

```c#
public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
{
   await Task.CompletedTask;
}
```

## 4.16.0 (2021-10-07) - Nytt app API for tagging av data elementer
Det er blitt laget støtte for å lagre tags (stikkord) på et data element. I den sammenheng er det laget API endepunkter for å liste tags, legge til en tag, og sletting av tag.

Denne endringer tilhører saken [6861](https://github.com/Altinn/altinn-studio/issues/6861) på github.

Det er mer informasjon om endringen under app API dokumentasjon.

## 4.15.2 (2021-10-04) - Nytt endepunkt for å hente ut aktive instanser
Altinn Apps eksponerer nå et endepunkt for å hente ut aktive instanser for en gitt avgiver.
Det nye endepunktet er tilgjengelig på {org}.apps.altinn.no/{org}/{app}/instances/{instanceOwnerPartyId}/active.

Denne endringen tilhører issue [6767](https://github.com/Altinn/altinn-studio/issues/6767).

## 4.14.1 (2021-09-22) - Fikset en bug som medførte 500 error hvis instance ikke finnes
Det var en bug i koden som medførte 500 error hvis man spurte etter en ikke eksisterende instance. Dette er nå blitt fikset på en måten som gjør at API isteden nå svarer med 403. Open API spesifikasjon for aktuelt endepunkt har blitt oppdatert med mulige status koder.

## 4.14.0 (2021-09-13) - Delvis støtte for navnerom(namespace) i XML
Koden som deserialiserer XML inn i objekter har blitt oppdatert til å håndtere navneromsdeklarering i rotelementet til et XML-dokument.

Eksempel:
```xml
<Skjema xmlns="urn:no:altinn:skjema:v1">
   <Navn>Altinn</Navn>
</Skjema>
```
Deserialisering skjer når et eksternt system bruker et app API endepunkt til å sende inn et nytt skjema, overskrive et eksisterende skjema, og når en app henter et skjema dokument fra "blob-storage".

Endringen blir ikke automatisk tatt i bruk i alle apps som tar i burk denne versjonen av NuGet pakkene. For at endringen skal fungere må C# klassen som representerer modellen/skjema bli oppdatert. Klassen må bli dekorert med et `XmlRootAttribute` hvor det er angitt et navnerom.

Eksempel:
```cs
[XmlRoot(ElementName = "Skjema", Namespace = "urn:no:altinn:skjema:v1")]
public class Skjema {
    [MaxLength(100)]
    [XmlElement("Navn")]
    public string Navn { get; set; }
}
```
Denne endringen må foreløpig bli utført manuelt i både gamle og nye modeller. Modeleditoren i altinn.studio har ikke blitt oppdatert til å gjøre det automatisk.

## 4.13.0 (2021-09-03) - Hendelse for endring av substatus
Det å endre substatus på en instanse trigger nå en event av typen `app.instance.substatus.changed`. Dette kan eksterne systemer abonnere på via Events tjenesten.

Dette løser sak [#6691](https://github.com/Altinn/altinn-studio/issues/6691)

## 4.12.0 (2021-08-27) - Identitetsdata inkludert i request telemetri
Logging av requests til Application Insights nå inkluderer et lite set med identifiserende data for å mer effektivt kunne spore kilden til uvanlige requester. Følgende data punkter blir registrert:

- partyId
- authentication level
- userId 
- organisationNumber

Dette løser sak [#5983](https://github.com/Altinn/altinn-studio/issues/5983)


## 4.11.1 (2021-08-26) - Hindre caching av data for apps uten "state"
Det er lagt inn kode som gir hint til nettleser om å ikke cache data som blir brukt i apps uten state.

Dette løser [#6532](https://github.com/Altinn/altinn-studio/issues/6532)

## 4.11.0 (2021-08-03) - Support for disabling reportee selection in Altinn Portal
Apps now support adding query parameter `DontChooseReportee=true` to disable the reportee selection when an unauthorized user accesses an app. 
The result being that the user will represent themselves and be routed directly to the application after login.

This release solves issue [#6573](https://github.com/Altinn/altinn-studio/issues/6573).

## 4.10.2 (2021-07-15) - Text resources are loaded locally
- The app will now load texts from the locally stored text resource files (config/texts/*) instead of retrieving them from Storage. Texts are still uploaded to Storage during deploy. The change is to remove unnecessary calls to Storage and to avoid an issue with caching that prevented new texts from being used immediately. [#6466](https://github.com/Altinn/altinn-studio/issues/6466), [#6415](https://github.com/Altinn/altinn-studio/issues/6415)
- Fixed a bug where a filename with space in it could lead to a crash. [#6421](https://github.com/Altinn/altinn-studio/issues/6421)
- New apps created after the v2021.29 release will provide security headers like X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, and Referer-Policy. To activate this in existing apps follow these steps:
   - Open the `App/Startup.cs` file.
   - At the top of the file add the namespace reference: `using Altinn.App.Api.Middleware;`
   - Find the `Configure` method and add the statement: `app.UseDefaultSecurityHeaders();` Add it right before existing `app.Use*` statements. E.g. before `app.UseRouting();`


## 4.9.2 (2021-07-08) - Fixed messages from multipart request validation
Validation messages from multipart request validation was misleading. This release solved issue [#6418](https://github.com/Altinn/altinn-studio/issues/6418). 


## 4.9.1 (2021-07-02) - Bugfix for errors in multipart validation
Fixed a bug that caused validation messages to show C# type of DataType rather than DataTypeId.
Issue [#6418](https://github.com/Altinn/altinn-studio/issues/6418)


## 4.9.0 (2021-06-29) - Support for marking a single field validation error as fixed
It is now possible to mark a previous validation error as fixed by using the prefix `*FIXED*` in front of the original error. 
[documentation on how to implement the functionality](../../../../../altinn-studio/reference/logic/validation/#spesifisere-at-valideringsfeil-er-fikset) (in Norwegian )

## 4.8.0 (2021-06-22) - Application version number available in AppSettings
During app deployment an environment variable with the app version number/name is added to the app runtime environment. This version information can now be retrieved in any controller or service through the AppSettings configuration object. Just add a dependency on `AppSettings` into the class and access the new property called `AppVersion`.

## 4.7.1 (2021-06-15) - Adjustments to response headers
Some of the controllers exposed by the applications have been modified to not allow caching and/or storage of their responces in the client.

## 4.7.0 (2021-06-08)

Altinn Apps now authorize access for statless apps.

Altinn Apps now have two new application events where application developers can add data processing logic. calculation, population, and more.

In this update the RunCalculate application event is made obsolete/deprecated. It's recommended that Apps are updated to use RunProcessDataWrite and RunProcessDataRead instead. Calls to the RunCalculate method will be removed in a future update.

The process to update is

1. Add the DataProcessing folder and DataProcessingHandler class from our [app template](https://github.com/Altinn/altinn-studio/tree/master/src/Altinn.Apps/AppTemplates/AspNet/App/logic) to your app.
2. Update App.cs. Add a class field for DataProcessingHandler and copy new methods ( RunProcessDataRead and RunProcessDataWrite) from [App.cs](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/App/logic/App.cs)
3. Move logic from calculation handler to DataProcessinghandler
4. Remove RunCalculation method from App.cs
5. Remove CalculationHandler when code has been moved to DataProcessingHandler.
6. Compile and test your app. 

See details about data processing [here](../../../../../altinn-studio/reference/logic/dataprocessing/)

## 4.6.2 (2021-06-01) - Duplicate keys in options causing crash

This release has a fix for a crash related to PDF rendering when an app has [options](../../../../../altinn-studio/guides/development/options/) with duplicate entries. [#5887](https://github.com/Altinn/altinn-studio/issues/5887)

## 4.6.1. (2021-05-21) Changed alternative subject

Altinn Apps now uses org instead of organization as subject when publishing events.

## 4.6.0 (2021-05-11) - Apps now support data fields
Altinn Apps now support data fields.
Data fields allows for adding data values, from either form fields or a custom source, to the instance object.
Form data can be added by configuring data fields in `applicationmetadata.json` while custom sources require coding.
Documentation on how to add data values to an instance can be found [here](../../../../../altinn-studio/reference/configuration/datafields/).


## 4.5.2 (2021-05-04) - Endpoints for stateless data elements exposed through app. Bug stopping local testing fixed

Altinn Apps now expose endpoints for creating, prefilling and running calculations on stateless data elements.
A stateless data element entails there is no link to an instance or instance owner, and the data is simply presented to the end user, but not persisted in any database.

In addition, a bug breaking apps running with localtest intoduced in 4.4.1 has been fixed.

Information on the new endpoints can be found in the swagger exposed by each application https://{org}.apps.altinn.no/{org}{app}/swagger

## 4.4.1 (2021-04-30) - Ask user to upgrade security level 

An app would show the "unknown error" message if a user were trying to access an instance with a security level that was too low for the instance. This has been fixed. The user is now sent to authentication with the option to pick an authentication method that provides a higher security level. The fix targets the GET instance endpoint specifically.

## 4.4.0(2021-04-27) - Performance fix
Improved performance.

## 4.3.0 (2021-04-28) - Apps now support presentation fields

Altinn Apps now support presentation fields. 
By specifying presentation fields in `applicationmetadata.json`, speficied data values from the form data
will be stored on the instance in order to show them along with the app title in the Altinn messagebox. 
Further documentation on how to configure presentation fields is found [here](../../../../../altinn-studio/reference/configuration/messagebox/presentationfields/).

This change is related to [this epic](https://app.zenhub.com/workspace/o/altinn/altinn-studio/issues/594).

## 4.2.0 (2021-04-19) - Possible to integrate an app with eFormidling

Altinn Apps now support integration with eFormidling. 
Documentation on how to set up an application to use eFormidling will be published
once an integration point for eFormidling is set up in Altinn Platform. 

## 4.1.0 (2021-04-07) - Add new property with updated data to response for PUT to DataController

During PUT of data to DataController (`{org}/{app}/instances/{instanceOwnerPartyId:int}/{instanceGuid:guid}/data`), any calculations that are 
defined by the apps are run, and data is potentially updated before being saved.
Previously, the response returned only the metadata for the updated data element, and a GET to fetch the updated data was necessary.
In this version, a dictionary of all the fields that have updated data from calculations is returned as a new parameter
in the API response (in addition to the data element metadata), so that clients do not need to perform the additional GET request in order
to get the updated data.

This change is related to [this issue](https://github.com/Altinn/altinn-studio/issues/5754).

## 4.0.3 (2021-03-23) - Fixed a bug reading filename from Content-Disposition 

- The specification for Content-Disposition specify that `filename` should be in quotes. This was not supported by the app backend API, causing requests following the specification to fail. This has been fixed.
- Added support for `filename*` (FilenameStar). If Content-Disposition contain both `filename` and `filename*`, the value defined by `filename*` will be used.

## 4.0.1 (2021-03-15) - Upgraded application to .Net 5 and grouped references of Altinn App and Altinn Platform services in Startup.cs

Altinn.App.* librarires target .Net 5 now, which requires that the application does the same.
In addition we have created two methods for referencing all app and platform sevices in Startup.cs 

See [breaking changes](../breaking-changes) for how to update you app to be compatible with this version.

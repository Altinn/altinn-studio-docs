---
title: App-metadata
description: Filen applicationmetadata.json inneholder teknisk informasjon om appen og kravene til datatypene.
toc: true
tags: [api]
weight: 20
---

## Application

Application er hovedmodellen for metadata om appen.

| Navn | Beskrivelse |
| ---- | ----------- |
| id | En globalt unik ID for appen. Verdien har to deler, skilt med `/`. Den første delen er kortnavnet til tjenesteeieren, og den andre delen er navnet på appen. |
| versionId | Versjonen av appen i Altinn Storage. Når du publiserer appen, setter Studio den til commit-ID-en for releasen. |
| org | Kortnavnet til tjenesteeieren. |
| title | Tittelen på appen på ulike språk. |
| validFrom | Datoen og klokkeslettet brukerne kan begynne å opprette instanser i appen. |
| validTo | Datoen og klokkeslettet appen utløper. Etter det kan ingen opprette nye instanser i appen. |
| processId | ID-en til prosessmodellen appen bruker. (Ikke i bruk nå.) |
| dataTypes | En liste over alle datatypene til appen. Se [DataType](#datatype). |
| partyTypesAllowed | Flagg som bestemmer hvilke typer instanseiere brukerne kan opprette nye instanser for. Se [PartyTypesAllowed](#partytypesallowed). |
| autoDeleteOnProcessEnd | Om appen sletter instansen automatisk når prosessen er ferdig. Apper med svært sensitive data kan bruke dette til å slette instansen i stedet for å sende den til arkivet. |
| preventInstanceDeletionForDays | Hvor mange dager Altinn Storage nekter å slette en instans etter at den er arkivert. Ikke kombiner innstillingen med `autoDeleteOnProcessEnd: true`. Da kan du ikke bygge en v9-app. Se [minimum levetid for persistens]({{< relref "/altinn-studio/v8/reference/data/persistence#konfigurer-minimum-levetid-for-persistens" >}}). |
| presentationFields | En samling presentasjonsfelter. Se [PresentationField](#presentationfield). |
| dataFields | En samling datafelter. Se [DataField](#datafield). |
| eFormidling | Bare i v8. Oppsettet for eFormidling-integrasjonen til appen. Se [eFormidlingContract](#eformidlingcontract). |
| messageBoxConfig | En samling innstillinger for innboksen i Altinn. |
| onEntry | Hva brukeren ser når de åpner appen uten en instans. Se [OnEntry](#onentry). |
| copyInstanceSettings | Innstillinger for å lage en ny instans som en kopi av en arkivert instans. Se [CopyInstanceSettings](#copyinstancesettings). |
| apiScopes | Scopene et token må ha for å kalle instans-API-et til appen. Se [API-scopes]({{< relref "/altinn-studio/v8/reference/configuration/authorization/api-scopes" >}}). |
| disallowUserInstantiation | Om bare tjenesteeiere kan opprette nye instanser. Brukerne kan fortsatt lage en kopi av en arkivert instans. Appen sjekker dette bare i produksjon. Standardverdien er false. |
| promptForParty | `always` sender brukere som kan representere mer enn én aktør, til aktørvalget, også når de har valgt i profilen sin at de ikke vil bli spurt. `never` hopper over aktørvalget. Uten innstillingen bestemmer profilen til brukeren. |
| onProcessEnd | Bare i v9. `{ "confirm": true }` gjør at appen bekrefter instansen som fullført for tjenesteeieren når prosessen er ferdig. Policyen må gi tjenesteeieren handlingen `complete`. |
| logo | Viser en logo i stedet for Altinn-logoen. Er `source` satt til `org`, som er standard, viser appen logoen til tjenesteeieren. Er den satt til `resource`, viser appen logoen fra adressen i tekstressursen `appLogo.url`. Se [Logo]({{< relref "/altinn-studio/v8/reference/ux/logo#egenskaper" >}}). |
| description | En beskrivelse av appen på ulike språk. Studio sender den til Ressursregisteret når du publiserer appen. |
| access | Innstillinger for å delegere tilgang til appen: `rightDescription`, `delegable` og `visible`. Studio sender dem til Ressursregisteret når du publiserer appen. |
| contactPoints | En liste med kontaktpunkter for appen, hvert med `category`, `email`, `telephone` og `contactPage`. Studio sender dem til Ressursregisteret når du publiserer appen. |

## DataType

En datatype beskriver kravene til dataelementene. For datatyper som er et skjema, kontrollerer appen også dataene mot datamodellen.

| Navn | Beskrivelse |
| ---- | ----------- |
| id | ID-en til datatypen. Unik i appen. |
| description | En beskrivelse av datatypen på ulike språk. |
| allowedContentTypes | En liste over innholdstyper (Content-Type) som datatypen tillater. |
| allowedContributors | En liste over hvem som har lov til å bidra. Du kan bruke den til å begrense hvem som kan jobbe med datatypen. |
| actionRequiredToRead | En [handling]({{< relref "/altinn-studio/v8/reference/configuration/authorization#action-attributter" >}}) som brukeren må ha i tillegg til `read` for å lese dataelementer av denne typen. |
| actionRequiredToWrite | En [handling]({{< relref "/altinn-studio/v8/reference/configuration/authorization#action-attributter" >}}) som brukeren må ha i tillegg til `write` for å skrive til dataelementer av denne typen. |
| appLogic | Et sammensatt objekt med informasjon om hvordan datatypen er koblet til en modell. Se [ApplicationLogic](#applicationlogic). |
| taskId | En referanse til en oppgave i prosessen til appen. Verdien betyr at kravene til datatypen må være oppfylt før prosessen kan gå videre fra denne oppgaven. Gjelder v8. En v9-app bruker `taskIds` i stedet. |
| taskIds | En liste over oppgavene datatypen hører til. Altinn Storage nekter å opprette, endre eller slette data av denne typen i andre oppgaver. En v9-app nekter det samme, og krever i tillegg at kravene til datatypen er oppfylt før prosessen kan gå videre fra disse oppgavene. En v8-app leser den ikke. |
| maxSize | Den største tillatte størrelsen på dataelementet. |
| maxCount | Det største antallet dataelementer av denne typen. |
| minCount | Det minste antallet dataelementer av denne typen som instansen må ha. |
| grouping | Navnet på en gruppe. Du kan bruke den til å knytte datatypen logisk til en gruppe, for eksempel _Bilder_ eller en tekstnøkkel. |
| enablePdfCreation | Bare i v8. Om appen lager en PDF når oppgaven til en datatype med `appLogic` er ferdig. Standardverdien er true. En v9-app lager PDF-er i en PDF-systemoppgave, og du kan ikke bygge appen når denne verdien er true. |
| enableFileScan | Om Altinn skal skanne filer av denne typen for virus og skadevare. Finner skanningen en infisert fil før prosessen er ferdig, gir det en valideringsfeil. |
| validationErrorOnPendingFileScan | Om en skanning som pågår, skal gi en valideringsfeil. Da kan ikke appen fullføre prosessen før skanningen er ferdig. |
| enabledFileAnalysers | ID-ene til analysatorene appen kjører når noen laster opp en fil av denne typen. Se [filvalidering]({{< relref "/altinn-studio/v8/reference/logic/validation/files" >}}). |
| enabledFileValidators | ID-ene til validatorene appen kjører når noen laster opp en fil av denne typen. Feiler en validator, stopper appen opplastingen. Se [filvalidering]({{< relref "/altinn-studio/v8/reference/logic/validation/files" >}}). |
| allowedKeysForUserDefinedMetadata | Nøklene som er tillatt i de brukerdefinerte metadataene til et dataelement. Er listen satt, nekter appen andre nøkler. Standard er at alle nøkler er tillatt. |

## ApplicationLogic

ApplicationLogic inneholder informasjon om hvordan en datatype for et skjema er koblet til en modell.

| Navn | Beskrivelse |
| ---- | ----------- |
| autoCreate | Om appen oppretter et dataelement automatisk når en instans går til oppgaven i `taskId` (v8) eller en av oppgavene i `taskIds` (v9). |
| classRef | Navnet på C#-klassen som representerer skjemaet som modell i app-logikken. |
| schemaRef | En referanse til det opprinnelige skjemaet modellen er laget fra. |
| disallowUserCreate | Om brukeren ikke får opprette dataelementer av denne typen. Standardverdien er false, det vil si at brukeren får det. |
| disallowUserDelete | Om brukeren ikke får slette dataelementer av denne typen. Standardverdien er false, det vil si at brukeren får det. |
| allowAnonymousOnStateless | Om anonym tilgang er tillatt for denne datatypen i en stateless app. |
| autoDeleteOnProcessEnd | Om appen automatisk markerer data av denne typen for permanent sletting når prosessen er ferdig. Standardverdien er false. |
| shadowFields | Oppsettet for [hjelpefelter](#shadowfields). |

### ShadowFields

ShadowFields inneholder oppsettet for hjelpefelter (shadow fields) for en datatype.

| Navn | Beskrivelse |
| ---- | ----------- |
| prefix | Prefikset appen bruker for å filtrere bort hjelpefelter, for eksempel *"SF_"*. |
| saveToDataType | Datatypen appen lagrer de filtrerte dataene (uten hjelpefelter) i. Er den ikke satt, oppdaterer appen datatypen som inneholder feltene. |

## PartyTypesAllowed

PartyTypesAllowed inneholder verdier som bestemmer hvilke typer eiere en instans kan ha.

| Navn | Beskrivelse |
| ---- | ----------- |
| bankruptcyEstate | Instanseieren kan være et konkursbo. |
| organisation | Instanseieren kan være en hvilken som helst organisasjon. |
| person | Instanseieren kan være en person. |
| subUnit | Instanseieren kan være en underenhet. |

## PresentationField

PresentationField er en regel for å hente ut verdien av et skjemafelt. Hver gang appen lagrer skjemaet, bruker den reglene for presentasjonsfelter og lagrer verdiene fra skjemaet direkte på instansen. Andre tjenester, for eksempel innboksen, kan deretter vise verdiene. Målet er å gjøre det lettere å kjenne igjen en bestemt instans i en liste med mange nesten like instanser.

| Navn | Beskrivelse |
| ---- | ----------- |
| id | En ID eller nøkkel som identifiserer regelen. |
| path | Stien til et felt eller en egenskap i skjemamodellen. |
| dataTypeId | Navnet på datatypen. Se [DataType](#datatype). |

## DataField

DataField er en regel for å hente ut verdien av et skjemafelt. Hver gang appen lagrer skjemaet, bruker den reglene for datafelter og lagrer verdiene fra skjemaet direkte på instansen. Altinn har egen logikk for hvor og hvordan den viser [presentasjonsfelter](#presentationfield), mens app-utvikleren og tjenesteeieren bestemmer selv hva de bruker datafeltene til. Du kan for eksempel bruke datafelter til å sende instansen til riktig fagsystem.

| Navn | Beskrivelse |
| ---- | ----------- |
| id | En ID eller nøkkel som identifiserer regelen. |
| path | Stien til et felt eller en egenskap i skjemamodellen. |
| dataTypeId | Navnet på datatypen. Se [DataType](#datatype). |

## eFormidlingContract

eFormidlingContract inneholder oppsettet for eFormidling-integrasjonen til appen. Bare v8 leser det: Når `EnableEFormidling` er `true` i `AppSettings`, sender appen en forsendelse til eFormidling når oppgaven i `sendAfterTaskId` er ferdig. Se [eFormidling]({{< relref "/altinn-studio/v8/reference/configuration/eformidling" >}}). Har en v9-app en `eFormidling`-blokk, kan du ikke bygge appen, fordi v9 setter opp eFormidling i en systemoppgave i prosessen.

| Navn | Beskrivelse |
| ---- | ----------- |
| serviceId | Tjenesteidentifikatoren til prosessen. Appen leser den ikke. |
| dpfShipmentType | Forsendelsestypen for en DPF-forsendelse, for eksempel `altinn3.skjema`. Mottakersystemet bruker den til å sende forsendelsen videre til riktig sted. Er den satt, legger appen den til i forsendelsen. |
| process | Prosesstypen appen setter på forsendelsen. |
| receiver | Mottakeren av eFormidling-forsendelsen. |
| sendAfterTaskId | ID-en til den siste oppgaven som må være fullført før appen sender forsendelsen. |
| type | Dokumenttypen til forsendelsen, for eksempel arkivmelding. |
| typeVersion | Versjonen av dokumenttypen. |
| standard | Dokumentstandarden, for eksempel urn:no:difi:arkivmelding:xsd::arkivmelding. |
| securityLevel | Sikkerhetsnivået appen setter på Standard Business Document. |
| dataTypes | En liste over datatypene som skal være med i forsendelsen. Både datatyper for skjemadata og for vedlegg må stå i listen for å bli med i forsendelsen. |

## MessageBoxConfig

MessageBoxConfig inneholder innstillinger for hvordan innboksen i Altinn viser instansene.

| Navn | Beskrivelse |
| ---- | ----------- |
| hideSettings | Innstillingene for å skjule en instans i innboksen. |
| syncAdapterSettings | Innstillinger som slår av deler av synkroniseringen fra instanser til dialoger i Dialogporten. Se [innstillinger for sync-adapter]({{< relref "/dialogporten/reference/front-end/altinn-apps#innstillinger-for-sync-adapter" >}}). |

### HideSettings

Bruk bare én av de to innstillingene om gangen.

| Navn | Beskrivelse |
| ---- | ----------- |
| hideAlways | En boolsk verdi som sier at instansen alltid skal være skjult. |
| hideOnTask | En liste over oppgaver der instansen skal være skjult i innboksen. |

## CopyInstanceSettings

Her bestemmer du om brukeren kan lage en ny instans som en kopi av en arkivert instans. Du bestemmer også om appen kopierer vedlegg og fristen, og hvilke datatyper og datafelter den utelater. Til slutt velger du hvilke dataverdier og presentasjonstekster appen kopierer til den nye instansen.

| Navn | Beskrivelse |
| ---- | ----------- |
| enabled | Om brukeren kan lage en kopi av en instans. |
| excludedDataTypes | En liste over datatyper appen utelater når den lager en ny kopi. |
| excludedDataFields | En liste over felter i datamodellen som appen utelater når den lager en ny kopi. |
| includeAttachments | Om appen kopierer vedlegg. Standardverdien er false. |
| includeDueBefore | Om appen kopierer fristen (`dueBefore`). Standardverdien er false. |
| includedDataValues | En liste over nøkler i `dataValues` som appen kopierer fra den opprinnelige instansen. |
| includedPresentationTexts | En liste over nøkler i `presentationTexts` som appen kopierer fra den opprinnelige instansen. |

Innboksen i portalen viser lenken [Lag ny kopi]({{< relref "/altinn-studio/v8/reference/configuration/messagebox/create_copy" >}}) når brukeren velger en arkivert instans.

## OnEntry

Her bestemmer du hva appen gjør når brukeren åpner den uten en instans-ID.

| Navn | Beskrivelse |
| ---- | ----------- |
| show | Mulige verdier: new-instance, select-instance eller navnet på en stateless visning. <br/>_new-instance_: brukeren får alltid en ny instans. <br/>_select-instance_: brukeren ser en liste over aktive instanser hvis det finnes noen. Finnes det ingen, oppretter appen en ny instans. <br/>_andre verdier_: appen er stateless og viser layoutsettet (v8) eller mappen under `App/ui` (v9) med det navnet. |
| instanceSelection | Innstillinger for siden der brukeren velger en aktiv instans. Se [siden for instansvalg]({{< relref "/altinn-studio/v8/reference/configuration/startup#konfigurer-side-for-instansvalg" >}}). |

## Fullstendig eksempel {#complete-example}

Dette er en fullstendig `applicationmetadata.json` med datatyper.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "id": "ttd/bli-applikasjonseier",
  "versionId": null,
  "org": "ttd",
  "title": {
    "nb": "Bli applikasjonseier"
  },
  "validFrom": null,
  "validTo": null,
  "processId": null,
  "dataTypes": [
    {
      "id": "Kursdomene_BliTjenesteeier_M_2020-05-25_5703_34553_SERES",
      "description": null,
      "allowedContentTypes": ["application/xml"],
      "allowedContributors": null,
      "actionRequiredToRead": null,
      "actionRequiredToWrite": null,
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.BliTjenesteeier_M",
        "schemaRef": null,
        "allowAnonymousOnStateless": false,
        "autoDeleteOnProcessEnd": false,
        "disallowUserCreate": false,
        "disallowUserDelete": false,
        "shadowFields": null
      },
      "taskId": "Task_1",
      "maxSize": null,
      "maxCount": 1,
      "minCount": 1,
      "grouping": null,
      "enablePdfCreation": true,
      "enableFileScan": false,
      "validationErrorOnPendingFileScan": false,
      "enabledFileAnalysers": [],
      "enabledFileValidators": [],
      "allowedKeysForUserDefinedMetadata": null
    },
    {
      "id": "ref-data-as-pdf",
      "description": null,
      "allowedContentTypes": ["application/pdf"],
      "allowedContributors": null,
      "actionRequiredToRead": null,
      "actionRequiredToWrite": null,
      "appLogic": null,
      "taskId": null,
      "maxSize": null,
      "maxCount": 0,
      "minCount": 0,
      "grouping": null,
      "enablePdfCreation": false,
      "enableFileScan": false,
      "validationErrorOnPendingFileScan": false,
      "enabledFileAnalysers": [],
      "enabledFileValidators": [],
      "allowedKeysForUserDefinedMetadata": null
    },
    {
      "id": "uploaded-files",
      "description": null,
      "allowedContentTypes": ["image/jpeg"],
      "allowedContributors": null,
      "actionRequiredToRead": null,
      "actionRequiredToWrite": null,
      "appLogic": null,
      "taskId": "Task_1",
      "maxSize": 25,
      "maxCount": 5,
      "minCount": 1,
      "enablePdfCreation": false,
      "enableFileScan": true,
      "validationErrorOnPendingFileScan": true,
      "enabledFileAnalysers": [],
      "enabledFileValidators": [],
      "allowedKeysForUserDefinedMetadata": null
    }
  ],
  "partyTypesAllowed": {
    "bankruptcyEstate": true,
    "organisation": true,
    "person": true,
    "subUnit": true
  },
  "messageBoxConfig": {
    "hideSettings": {
      "hideOnTask": ["Task_3"]
    }
  },
  "autoDeleteOnProcessEnd": false,
  "created": "2020-07-17T08:26:21.5707559Z",
  "createdBy": "sandgrainone",
  "lastChanged": "2020-07-17T08:26:21.5708691Z",
  "lastChangedBy": "sandgrainone"
}
```

Eksempelet er for v8. I en v9-app bytter du ut hver `taskId` med en `taskIds`-liste, for eksempel `"taskIds": ["Task_1"]`, og fjerner `enablePdfCreation`. En v9-app lager da bare en PDF hvis du legger til en PDF-systemoppgave i prosessen.

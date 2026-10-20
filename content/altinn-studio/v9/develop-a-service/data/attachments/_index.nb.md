---
draft: true
title: Vedlegg og virusskanning
linktitle: Vedlegg
description: Slik tar appen imot vedlegg fra brukere og systemer, og slik slår du på virusskanning.
toc: true
tags: [needsReview]
---

Et vedlegg er en fil som en bruker eller et system laster opp til en instans, for eksempel en attest, et bilde eller en PDF. Du kan ta imot vedlegg på to måter:

- Brukerne laster opp filer i skjemaet med komponenten [`FileUpload`]({{< relref "../../look-and-feel/components/FileUpload" >}}).
- Systemer laster opp filer via API, uten at brukerne ser det i skjemaet.

Du kan bruke begge måtene i samme app. Det er ingen grense for hvor mange vedleggstyper appen kan ha.

Hver vedleggstype er en datatype i filen `App/config/applicationmetadata.json`. Datatypen bestemmer blant annet hvilke filtyper appen godtar, hvor store filene kan være og hvor mange filer brukeren kan laste opp. Skal brukerne laste opp i skjemaet, lager Altinn Studio Designer datatypen for deg når du legger til komponenten.

Denne siden handler om å sette opp vedlegg, bestemme hvem som kan laste opp og slå på virusskanning. Du finner kontroll av filtyper, filstørrelser og innholdet i filene på siden om [utvidet filvalidering]({{< relref "../validation/files" >}}).

## Ta imot vedlegg i skjemaet

Du legger til komponenten `FileUpload` i Designer. Du kan bruke flere vedleggskomponenter i samme skjema. Hvor mange du trenger, avhenger av hvilke dokumenter du ber om, og av hvilke begrensninger du vil sette for hver dokumenttype.

Her er de viktigste valgene:

- **Filtyper:** Du kan begrense hvilke filtyper brukerne kan laste opp. Brukeren får en feilmelding hvis de prøver å laste opp en annen filtype.
- **Antall filer:** Du setter hvor mange filer brukeren minst og maks kan laste opp.
- **Filstørrelse:** Du setter største filstørrelse i MB.
- **Merking:** Du kan la brukeren merke hver fil, for eksempel med dokumenttype, ved hjelp av en nedtrekksliste. Du setter opp merkingen med egenskapen `tagTitle` på `FileUpload` og en kodeliste med valgene.
- **Varsel ved sletting:** Med `alertOnDelete` åpner appen et varsel når brukeren klikker på **Slett**. Appen viser ikke varsel hvis du ikke setter egenskapen.

[[FIX BEFORE MERGE: skjermbilde av innstillingene for FileUpload i Designer, med filtyper, antall filer og filstørrelse synlige. Filnavn: fileupload-innstillinger.png. Alt-tekst: Innstillinger for vedleggskomponenten i Altinn Studio Designer]]

[[FIX BEFORE MERGE: skjermbilde av FileUpload med merking (tagTitle) slik den ser ut i Designer. Filnavn: fileupload-merking-designer.png]]

[[FIX BEFORE MERGE: skjermbilde av vedleggskomponenten med merking slik brukeren ser den i skjemaet, etter at en fil er lastet opp. Filnavn: fileupload-merking-skjema.png]]

Du finner alle egenskapene på siden om [`FileUpload`]({{< relref "../../look-and-feel/components/FileUpload" >}}).

{{% notice warning %}}
Komponenten `FileUploadWithTag` finnes ikke lenger. Du bruker `FileUpload` også når brukeren skal merke filene.
{{% /notice %}}

### Gjøre opplasting obligatorisk

Egenskapen `required` virker ikke på `FileUpload`. Vil du kreve at brukeren laster opp minst én fil, setter du `minNumberOfAttachments` til 1 eller mer. Setter du den til 0, kan brukeren sende inn uten å laste opp noe.

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json
{
  "id": "attest",
  "type": "FileUpload",
  "minNumberOfAttachments": 1,
  "alertOnDelete": true
}
```

### Endre id-en til datatypen

Når du bruker Designer, får datatypen en tilfeldig id (GUID). Vil du bruke et navn som er lettere å lese, må du endre id-en to steder: i `App/config/applicationmetadata.json` og i layoutfilen der komponenten ligger.

## Ta imot vedlegg via API

Skal bare systemer laste opp vedlegg, trenger du ingen komponent i skjemaet. Du legger i stedet til en datatype i `applicationmetadata.json`. Systemer kan da bare laste opp vedlegg av denne typen via API.

Systemer kan også laste opp til datatypene som vedleggskomponentene i skjemaet bruker.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "dataTypes": [
    {
      "id": "attest",
      "taskId": "Task_1",
      "maxSize": 25,
      "maxCount": 1,
      "minCount": 0,
      "allowedContentTypes": ["application/pdf"],
      "allowedContributors": ["org:nav", "orgNo:XXXXXXXXXX"],
      "grouping": "Attester"
    }
  ]
}
```

Appen kontrollerer at datatypen hører til prosessteget (taskId) som instansen står i. Laster et system opp til en datatype som hører til et annet prosessteg, svarer appen med feilkoden 409. Kontrollen er slått på som standard.

### Egenskaper på datatypen

| Egenskap              | Hva den gjør                                                                                                                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | Navnet på vedleggstypen.                                                                                                                                                                      |
| `taskId`              | Hvilket prosessteg i `process.bpmn` brukeren eller systemet skal laste opp vedlegget i. Verdien må være lik id-en til et av prosesstegene.                                                    |
| `maxSize`             | Største tillatte filstørrelse i MB.                                                                                                                                                           |
| `maxCount`            | Høyeste antall vedlegg av denne typen per instans.                                                                                                                                            |
| `minCount`            | Laveste antall vedlegg av denne typen per instans. Er verdien 0, er det ikke obligatorisk å laste opp.                                                                                        |
| `allowedContentTypes` | Hvilke filtyper appen godtar, oppgitt som MIME-typer, for eksempel `application/pdf`, `text/xml` og `image/jpeg`. Setter du ingen verdi, godtar appen alle filtyper.                          |
| `allowedContributors` | Hvem som kan opprette og endre vedlegg av denne typen. Se [Bestemme hvem som kan laste opp](#bestemme-hvem-som-kan-laste-opp).                                                                 |
| `grouping`            | Valgfritt navn på en gruppe. Vedlegg med samme gruppe havner i samme liste når du viser dem med komponenten [`AttachmentList`]({{< relref "../../look-and-feel/components/AttachmentList" >}}). Du kan bruke en tekstnøkkel hvis appen skal støtte flere språk. |

Du kan lese mer om MIME-typer i [oversikten fra MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types).

[[FIX BEFORE MERGE: skjermbilde som viser hvordan vedlegg med samme grouping vises i samme liste, for eksempel gruppen «Attester». Filnavn: attachment-grouping.png. Det gamle v8-bildet attachment-grouping-demo.png kan brukes hvis det fortsatt stemmer]]

## Bestemme hvem som kan laste opp

Med `allowedContributors` bestemmer du hvem som kan opprette og endre vedlegg av en datatype. Hvert valg skriver du på formen `{nøkkelord}:{verdi}`:

- `org:{kortnavn}` gir en tjenesteeier tilgang. Kortnavnet er forkortelsen til tjenesteeieren, for eksempel `nav`.
- `orgNo:{organisasjonsnummer}` gir en organisasjon tilgang ut fra organisasjonsnummeret.
- `app:owned` gir bare appen selv tilgang. Eksterne systemer kan da ikke opprette eller endre vedleggene via API. Du bruker dette for data som appen lager selv, for eksempel signaturer.

Du kan bare oppgi organisasjoner som er registrert som tjenesteeiere.

Før versjon 8.6 het egenskapen `allowedContributers` (med feil stavemåte). Den gamle stavemåten er foreldet. Bruk `allowedContributors`.

## Slå på virusskanning

Altinn kan skanne opplastede filer for virus. Skanningen starter rett etter at filen er lastet opp til lagringstjenesten Altinn Storage. Altinn lagrer resultatet på dataelementet litt senere, og alle som har tilgang til instansen, kan se det.
Når du bruker Designer til å lage datatyper for vedleggskomponenter, slår Designer på virusskanning som standard. Lager du datatypene selv, for eksempel for opplasting via API, må du slå på skanningen selv.

Du slår på skanningen per datatype med `enableFileScan`. Finner skanningen virus før prosessen er ferdig, får brukeren en valideringsfeil og kan ikke gå videre.

Skanningen kan ta litt tid. Vil du hindre at brukeren sender inn før skanningen er ferdig, setter du også `validationErrorOnPendingFileScan` til `true`. Da får brukeren en valideringsfeil så lenge skanningen pågår.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "dataTypes": [
    {
      "id": "attest",
      "taskId": "Task_1",
      "maxCount": 1,
      "minCount": 0,
      "allowedContentTypes": ["application/pdf"],
      "enableFileScan": true,
      "validationErrorOnPendingFileScan": true
    }
  ]
}
```

{{% notice warning %}}
Eldre eksempler viser ofte `"enablePdfCreation": true` på datatyper. Appen støtter ikke lenger den egenskapen, og du får byggefeilen [ALTINNAPP0600]({{< relref "../../reference/analysis/rules/ALTINNAPP0600" >}}). Du lager PDF med et eget PDF-steg i prosessen i stedet. Se [veiledningen om PDF]({{< relref "../../process/pdf" >}}).
{{% /notice %}}

### Skrive egne feilmeldinger

Appen har ferdige meldinger på bokmål, nynorsk og engelsk for infisert fil og for ventende skanning. Vil du bruke egne tekster, legger du til en tekstressurs med riktig nøkkel:

| Situasjon                                                          | Tekstnøkkel                          |
| ------------------------------------------------------------------ | ------------------------------------ |
| Filen er infisert                                                  | `validation_errors.file_infected`    |
| Skanningen er ikke ferdig (med `validationErrorOnPendingFileScan`) | `validation_errors.file_scan_pending` |

Begge meldingene får filnavnet og datatypen som parametere.

{{% notice warning %}}
Nøklene har fått nye navn. I tidligere versjoner het de `DataElementFileInfected` og `DataElementFileScanPending`. Har appen egne tekster med de gamle nøklene, må du bytte dem ut. Ellers viser appen standardmeldingene.
{{% /notice %}}

### Hva skjer med en infisert fil?

Altinn sletter ikke infiserte filer. Filen blir liggende på instansen, og brukeren må slette den selv. Brukeren kan fortsatt laste ned en infisert fil, men kan ikke sende inn et skjema som inneholder den.

## Spørsmål du kan stille utviklerne

- Hvilke vedleggstyper har tjenesten, og er filtyper, filstørrelser og antall filer riktige for hver av dem?
- Hvilke systemer skal laste opp via API, og står de i `allowedContributors`?
- Er virusskanning slått på for alle vedleggstypene, også de vi har laget uten Designer?
- Skal brukeren vente på skanningen før innsending (`validationErrorOnPendingFileScan`)?
- Er opplasting obligatorisk der den skal være det? Bruker vi `minNumberOfAttachments`, ikke `required`?

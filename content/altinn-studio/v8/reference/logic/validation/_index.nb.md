---
title: Validering
description: Slik kontrollerer appen at dataene brukeren fyller inn, er gyldige
toc: true
---

Med validering kontrollerer appen at dataene brukeren fyller inn, er gyldige. Brukeren ser en melding ved feltet som er feil, og får ikke sende inn før feilene er rettet.

Appen validerer både i nettleseren og på serveren. I nettleseren får brukerne raske tilbakemeldinger mens de fyller ut. På serveren kjører appen valideringene før brukeren får gå videre i prosessen. Det gjelder også når et sluttbrukersystem sender data rett til API-et til appen, uten å gå gjennom nettleseren. Noen av valideringene på serveren må du slå på selv. Se [Validering på serveren](#validering-på-serveren).

## Velge fremgangsmåte

Bruk den enkleste fremgangsmåten som løser oppgaven. Regler du kan sette opp uten kode, er enklere å vedlikeholde, og appen kan vise feilen i nettleseren med en gang.

| Hva vil du sjekke? | Fremgangsmåte | Trenger du C#? |
| --- | --- | --- |
| At brukeren har fylt ut et felt | [Påkrevde felt]({{< relref "/altinn-studio/v8/reference/logic/validation/required" >}}) | Nei |
| Lengde, format, tallgrenser og liknende for ett felt | [Begrensninger i datamodellen]({{< relref "/altinn-studio/v8/reference/logic/validation/data-model" >}}) | Nei |
| Regler du kan skrive med verdier fra datamodellen | [Validering med uttrykk]({{< relref "/altinn-studio/v8/reference/logic/validation/expression-validation" >}}) | Nei |
| Filtype, filstørrelse og antall vedlegg | Innstillinger på datatypen i `applicationmetadata.json` | Nei |
| Innholdet i en fil før appen lagrer den | [Utvidet filvalidering]({{< relref "/altinn-studio/v8/reference/logic/validation/files" >}}) | Ja |
| Alt annet, for eksempel oppslag i andre systemer eller regler på tvers av datamodeller | [En egen validator i C#]({{< relref "/altinn-studio/v8/reference/logic/validation/csharp" >}}) | Ja |

## Dette bør du avklare med utviklerne

Valideringsreglene bestemmer hva brukeren får lov til å sende inn. Som tjenesteeier bør du vite hvilke regler appen har, og hvorfor. Spør gjerne utviklerne om dette:

- Hvilke regler stopper innsendingen, og hvilke er bare advarsler eller informasjon?
- Finnes feilmeldingene på alle språkene tjenesten støtter?
- Ser brukerne feilen ved feltet de må rette, eller bare i oppsummeringen når de prøver å sende inn?
- Forklarer feilmeldingene hva som er feil, og hvordan brukeren retter det?
- Henter appen opplysninger fra andre systemer for å validere? Hva skjer hvis systemet ikke svarer – kan brukeren da bli stående uten å få sendt inn?
- Har dere testet reglene med repeterende grupper og innsending gjennom API-et? Kan et felt som er skjult for brukeren, stoppe innsendingen?

## Når brukeren ser valideringsmeldingene

Brukeren ser valideringsmeldingene ved feltet meldingen gjelder, og i en feiloppsummering nederst på siden.

### Mens brukeren fyller ut

Appen viser de fleste meldingene ved feltet med en gang, både når brukeren åpner skjemaet og like etter at brukeren har endret noe. Det gjelder både feil, advarsler og informasjon.

Feil om [påkrevde felt]({{< relref "/altinn-studio/v8/reference/logic/validation/required" >}}) viser appen først når brukeren prøver å sende inn, eller å bytte side hvis appen er satt opp til å sjekke ved sidebytte. Da slipper brukeren å se feil for felt brukeren ikke har kommet til ennå. Du kan endre hvilke meldinger appen viser med en gang. Se [Velge hvilke meldinger appen viser med en gang](#velge-hvilke-meldinger-appen-viser-med-en-gang).

Vanligvis lar du derfor `required` sjekke om et felt er fylt ut, og lar de andre reglene godta tomme felt. Da ser brukeren en feil først når brukeren har fylt ut noe som er feil, eller når brukeren prøver å gå videre uten å ha fylt ut et påkrevd felt. En regel som slår til på et tomt felt, viser feilen før brukeren har rukket å fylle ut noe.

### Når brukeren prøver å gå videre

Når brukeren prøver å sende inn, viser appen alle feilene som stopper brukeren. Feilene står ved feltene og i en feiloppsummering nederst på siden. Feiloppsummeringen viser appen også ellers når det finnes feil som brukeren kan se, for eksempel feil fra datamodellen allerede når skjemaet åpnes.

{{% notice info %}}
I v9 viser appen feiloppsummeringen først når brukeren har prøvd å sende inn eller bytte side.
{{% /notice %}}

Bare feil stopper brukeren. Advarsler, informasjon og bekreftelser kan brukeren lese og likevel gå videre.

Disse feilene vises først når brukeren prøver å sende inn:

- Feil fra regler som bare kjører ved innsending, fordi de er tunge å kjøre eller sjekker hele oppgaven.
- Feil som ikke gjelder et bestemt felt, for eksempel at en frist har gått ut.
- Feil i felt som er skjult for brukeren.

De to siste viser appen bare i feiloppsummeringen, fordi det ikke finnes noe synlig felt å vise dem ved.

Du kan også sette opp appen til å sjekke feilene når brukeren bytter side. Se [Angi validering ved sidebytte]({{< relref "/altinn-studio/v8/reference/ux/pages/navigation" >}}#angi-validering-ved-sidebytte).

Når brukeren retter feilene, fjerner appen dem fra oppsummeringen. Oppsummeringen forsvinner når det ikke er flere feil. Oppstår en ny feil senere som `showValidations` tillater å vise, viser appen den både ved feltet og i oppsummeringen med en gang. Feil om påkrevde felt viser appen ikke før brukeren prøver å bytte side eller sende inn igjen.

### Når brukeren lagrer en rad i en repeterende gruppe

Du kan få appen til å sjekke en rad i en repeterende gruppe når brukeren lagrer raden. Hvis det er feil i raden, kan ikke brukeren lukke raden før feilene er rettet.

```json {hl_lines=[6]}
{
  "id": "demo-gruppe",
  "type": "RepeatingGroup",
  "children": [...],
  "dataModelBindings": {...},
  "validateOnSaveRow": ["All"]
}
```

`validateOnSaveRow` inneholder hvilke typer valideringer appen skal sjekke. Se [Valideringstyper](#valideringstyper).

### Når brukeren laster opp vedlegg

Når brukeren laster opp en fil, sjekker appen filtype, filstørrelse og antall opplastede filer mot innstillingene på datatypen. Har du satt opp [utvidet filvalidering]({{< relref "/altinn-studio/v8/reference/logic/validation/files" >}}), kjører appen den også. Hvis filen ikke oppfyller kravene, lagrer ikke appen filen, og brukeren ser feilen med en gang.

## Velge hvilke meldinger appen viser med en gang

Med `showValidations` på en komponent bestemmer du hvilke valideringsmeldinger appen viser med en gang.

```json {hl_lines=[6]}
{
  "id": "fornavn",
  "type": "Input",
  "textResourceBindings": {...},
  "dataModelBindings": {...},
  "showValidations": ["AllExceptRequired"]
}
```

Er `showValidations` ikke satt, bruker appen `["AllExceptRequired"]`. Vil du ikke vise noen meldinger med en gang, setter du `showValidations` til en tom liste, `[]`.

### Valideringstyper

Du bruker de samme valideringstypene i `showValidations`, `validateOnSaveRow` og [`validationOnNavigation`]({{< relref "/altinn-studio/v8/reference/ux/pages/navigation" >}}#angi-validering-ved-sidebytte):

| Type | Betyr |
| --- | --- |
| `Schema` | [Begrensninger i datamodellen]({{< relref "/altinn-studio/v8/reference/logic/validation/data-model" >}}) |
| `Component` | Regler i selve komponenten, for eksempel datoformat |
| `Expression` | [Validering med uttrykk]({{< relref "/altinn-studio/v8/reference/logic/validation/expression-validation" >}}) |
| `CustomBackend` | [Egne validatorer i C#]({{< relref "/altinn-studio/v8/reference/logic/validation/csharp" >}}) som kjører mens brukeren fyller ut |
| `Required` | [Påkrevde felt]({{< relref "/altinn-studio/v8/reference/logic/validation/required" >}}) |
| `AllExceptRequired` | Alle typene unntatt `Required` |
| `All` | Alle typene |

{{% notice info %}}
I v9 finnes også typen `Invalid`, for verdier appen ikke kan lagre i datamodellen, for eksempel tekst i et tallfelt.
{{% /notice %}}

Validatorer i C# som bare kjører ved innsending, er ikke med i noen av typene. Feil fra dem viser appen først når brukeren prøver å sende inn.

## Myke valideringer

Myke valideringer stopper ikke brukeren fra å sende inn eller gå videre til neste oppgave i prosessen. Du kan bruke dem til å be brukeren kontrollere en verdi som virker feil, men som ikke er ugyldig, eller til å gi nyttig informasjon for resten av utfyllingen.

Det finnes tre typer myke valideringer: advarsel, informasjon og bekreftelse. Du lager dem ved å sette alvorlighetsgraden på valideringen, enten i [validering med uttrykk]({{< relref "/altinn-studio/v8/reference/logic/validation/expression-validation" >}}) eller i [en validator i C#]({{< relref "/altinn-studio/v8/reference/logic/validation/csharp" >}}#alvorlighetsgrad).

Slik ser de tre typene ut:

![Advarsel](./warning-message.jpeg "Eksempel på advarsel")

![Informasjon](./info-message.jpeg "Eksempel på informasjon")

![Bekreftelse](./success-message.jpeg "Eksempel på bekreftelse")

## Validering på serveren

Appen kjører valideringene på serveren før brukeren får gå videre i prosessen. Derfor kan ingen sende inn data som bryter reglene, heller ikke sluttbrukersystemer som bruker API-et til appen. Serveren sjekker likevel påkrevde felt og validering med uttrykk bare hvis du har slått dem på. Vi anbefaler å slå på begge. Serveren sjekker påkrevde felt bare i oppgaver som har et layoutsett.

{{% notice info %}}
I v9 er `RequiredValidation` og `ExpressionValidation` slått på som standard.
{{% /notice %}}

### Innebygde valideringer

Appen har disse valideringene innebygd:

| Validering | Hva den sjekker | Slår du den av eller på? |
| --- | --- | --- |
| [Påkrevde felt]({{< relref "/altinn-studio/v8/reference/logic/validation/required" >}}) | At synlige komponenter med `required` har en verdi, i oppgaver som har et layoutsett | `RequiredValidation` (av som standard) |
| [Validering med uttrykk]({{< relref "/altinn-studio/v8/reference/logic/validation/expression-validation" >}}) | Reglene i `models/[datatype-ID].validation.json` | `ExpressionValidation` (av som standard) |
| [Datamodell]({{< relref "/altinn-studio/v8/reference/logic/validation/data-model" >}}) | Attributter på C#-modellen, for eksempel `[Range]` og `[RegularExpression]` | Alltid på |
| XSD | At skjemadataene er gyldige mot `models/[datatype-ID].xsd` | `XsdValidation` (av som standard) |
| Vedlegg og andre dataelementer | Filtype (`allowedContentTypes`), filstørrelse (`maxSize`) og virusskanning (`enableFileScan`) | Innstillinger på datatypen |
| Antall dataelementer | `minCount` og `maxCount` for datatypene i oppgaven | Innstillinger på datatypen |
| Signering | At alle som skal signere, har signert | `runDefaultValidator` i signeringsoppgaven |
| Signerte data | At dataene ikke er endret etter at brukeren signerte | Alltid på i signeringsoppgaver |

Nettleseren sjekker også påkrevde felt, validering med uttrykk og datamodellen mens brukeren fyller ut. De andre innebygde valideringene kjører bare på serveren når brukeren går videre i prosessen. Brukeren ser derfor feil fra dem først når brukeren prøver å sende inn. Unntaket er filtype, filstørrelse og største antall filer (`maxCount`), som appen også sjekker når brukeren laster opp en fil. Minste antall filer (`minCount`) sjekker appen først når brukeren går videre.

Du slår valideringene på under `AppSettings` i `App/appsettings.json`:

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
{
  "AppSettings": {
    "RequiredValidation": true,
    "ExpressionValidation": true,
    "XsdValidation": false
  }
}
```

### Egne validatorer

Trenger du regler som de innebygde valideringene og validering med uttrykk ikke dekker, kan du eller utvikleren din skrive egne validatorer i C#, for eksempel for å

- sjekke innholdet i vedlegg, for eksempel at en PDF har riktig antall sider
- slå opp i andre systemer, som å sjekke at et organisasjonsnummer finnes
- sjekke data på tvers av flere datamodeller i samme oppgave

[Slik lager du validatorer i C#]({{< relref "/altinn-studio/v8/reference/logic/validation/csharp" >}}).

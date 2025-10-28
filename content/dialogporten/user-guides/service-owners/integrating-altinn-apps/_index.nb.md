---
title: 'Integrere Altinn Apps'
description: 'Hvordan overstyre eller berike den automatiske Dialogporten-integrasjonen fra appen din'
weight: 50
---

## Introduksjon

Altinn Apps synkroniseres automatisk med Dialogporten. Hver gang en ny
instans opprettes, vil dialogtjenesten opprette eller oppdatere en tilhørende
dialog som er synlig for sluttbrukeren i Altinn Innboks ("arbeidsflate"). Denne
guiden forklarer hvordan standardoppførselen kan justeres og hvordan du kan ta
full kontroll over integrasjonen ved behov.

## Automatisk dialogsynkronisering

Som standard er synkroniseringen aktivert for alle applikasjoner. Oppdateringer av
instansen, som statusendringer, lagt til aktiviteter eller vedlegg, vil bli
reflektert i Dialogporten. Oppførselen kan finjusteres i appinnstillingene. Se
referanseinformasjonen lenket nedenfor for detaljer.

**Les mer**

* {{<link "../../../reference/front-end/altinn-apps">}}

## Bruke Dialogporten WebAPI SDK

Noen scenarier krever mer kontroll enn den automatiske synkroniseringen tilbyr.
[Dialogporten WebAPI SDK](https://github.com/Altinn/dialogporten/tree/main/src/Digdir.Library.Dialogporten.WebApiClient)
gir applikasjonen din programmatisk tilgang til Dialogporten slik at du kan opprette og
oppdatere dialoger selv. Dette muliggjør finkornet håndtering av aktiviteter,
forsendelser og synkronisering med Altinn Innboks.

## Konvensjonsbasert bruk av applikasjonstekster

Altinn Apps kan automatisk finne lokalisert tekstinnhold for dialoger ved å følge et konvensjonsbasert system.
Dette systemet søker etter spesifikke nøkler i applikasjonstekstene dine med en fallback-mekanisme.

### Nøkkeloppslagsrekkefølge

Systemet forsøker å finne den mest spesifikke nøkkelen først, og faller deretter tilbake til mer generelle nøkler i
denne rekkefølgen:

1. **Aktiv oppgave for status** - Mest spesifikke treff
2. **Aktiv oppgave** - Oppgavespesifikt treff
3. **Enhver oppgave for status** - Statussspesifikt treff
4. **Enhver oppgave og enhver status** - Mest generelle treff

### Format

Alle nøkler følger dette mønsteret (ikke-sensitivt for store/små bokstaver, konvertert til små bokstaver):

dp.{content_type}[.{task}[.{state}]]

**Komponenter:**

- **content_type** (obligatorisk): En av:
    - `title` - Dialogtittel
    - `summary` - Dialogsammendrag/beskrivelse
    - `primaryactionlabel` - Primær handlingsknapptekst
    - `secondaryactionlabel` - Sekundær handlingsknapptekst
    - `tertiaryactionlabel` - Tertiær handlingsknapptekst

- **task** (valgfritt): Enten:
    - Et spesifikt oppgavenavn (alfanumerisk med interne bindestreker eller understreker)
    - `_any_` for wildcard-matching

- **state** (valgfritt): Instansstatusen, for eksempel:
    - `archivedunconfirmed`, `archivedconfirmed`
    - `rejected`
    - `awaitingserviceownerfeedback`, `awaitingconfirmation`
    - `awaitingsignature`, `awaitingadditionaluserinput`
    - `awaitinginitialuserinput`, `awaitinginitialuserinputfromprefill`

### Eksempler

**Grunnleggende innhold:**

* `dp.title` Generell dialogtittel
* `dp.summary` Generelt dialogsammendrag
* `dp.primaryactionlabel` Generell primær handlingstekst

**Oppgavespesifikt:**

* `dp.title.DataEntry` Tittel for DataEntry-oppgave
* `dp.summary.Review` Sammendrag for en Review-oppgave
* `dp.primaryactionlabel.Sign` Primær handling for en Sign-oppgave
* `dp.primaryactionlabel._any_` Primær handling for alle oppgaver

**Statussspesifikt:**

* `dp.title.DataEntry.awaitinginitialuserinput` Tittel for DataEntry-oppgave som venter på input
* `dp.summary._any_.rejected` Sammendrag for enhver oppgave når den er avvist
* `dp.primaryactionlabel.Sign.awaitingsignature` Handlingsetikett A for en Sign-oppgave som venter på signatur

### Stardard Fallback-verdier

Hvis ingen tilpassede applikasjonstekstnøkler blir funnet, gir systemet innebygde standardverdier for sammendrag basert
på
instansstatusen:

#### Titteltekststandarder

Bruker tittelen på appen

#### Standard sammendragstekster

| Status                                 | Bokmål (nb)                                                                                                                               | Nynorsk (nn)                                                                                                                            | Engelsk (en)                                                                                                                                    |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **archivedunconfirmed**                | Innsendingen er maskinelt kontrollert og formidlet, venter på endelig bekreftelse. Du kan åpne dialogen for å se en foreløpig kvittering. | Innsendinga er maskinelt kontrollert og formidla, ventar på endeleg stadfesting. Du kan opne dialogen for å sjå ei førebels kvittering. | The submission has been automatically checked and forwarded, awaiting final confirmation. You can open the dialog to see a preliminary receipt. |
| **archivedconfirmed**                  | Innsendingen er bekreftet mottatt. Du kan åpne dialogen for å se din kvittering.                                                          | Innsendinga er stadfesta motteken. Du kan opne dialogen for å sjå di kvittering.                                                        | The submission has been confirmed as received. You can open the dialog to see your receipt.                                                     |
| **rejected**                           | Innsendingen ble avvist. Åpne dialogen for mer informasjon.                                                                               | Innsendinga vart avvist. Opne dialogen for meir informasjon.                                                                            | The submission was rejected. Open the dialog for more information.                                                                              |
| **awaitingserviceownerfeedback**       | Innsendingen er maskinelt kontrollert og formidlet, venter på tilbakemelding.                                                             | Innsendinga er maskinelt kontrollert og formidla, ventar på tilbakemelding.                                                             | The submission has been automatically checked and forwarded, awaiting feedback.                                                                 |
| **awaitingconfirmation**               | Innsendingen må bekreftes for å gå til neste steg.                                                                                        | Innsendinga må stadfestast for å gå til neste steg.                                                                                     | The submission must be confirmed to proceed to the next step.                                                                                   |
| **awaitingsignature**                  | Innsendingen må signeres for å gå til neste steg.                                                                                         | Innsendinga må signerast for å gå til neste steg.                                                                                       | The submission must be signed to proceed to the next step.                                                                                      |
| **awaitingadditionaluserinput**        | Innsendingen er under arbeid og trenger flere opplysninger for å gå til neste steg.                                                       | Innsendinga er under arbeid og treng fleire opplysningar for å gå til neste steg.                                                       | The submission is in progress and requires more information to proceed to the next step.                                                        |
| **awaitinginitialuserinput** (default) | Innsendingen er klar for å fylles ut.                                                                                                     | Innsendinga er klar til å fyllast ut.                                                                                                   | The submission is ready to be filled out.                                                                                                       |

#### Standard primære handlingsetiketter

| Status                                    | Bokmål (nb)            | Nynorsk (nn)           | Engelsk (en)          |
|-------------------------------------------|------------------------|------------------------|-----------------------|
| **Archived** (alle arkiverte statuser)    | Se innsendt skjema     | Sjå innsendt skjema    | See submitted form    |
| **Active** (alle ikke-arkiverte statuser) | Gå til skjemautfylling | Gå til skjemautfylling | Go to form completion |

#### Standard sekundære handlingsetiketter

| Status  | Bokmål (nb) | Nynorsk (nn) | Engelsk (en) |
|---------|-------------|--------------|--------------|
| **any** | Slett       | Slett        | Delete       |

#### Standard tertiære handlingsetiketter

| Status  | Bokmål (nb) | Nynorsk (nn) | Engelsk (en)    |
|---------|-------------|--------------|-----------------|
| **any** | Lag en kopi | Lag en kopi  | Create new copy |

### Implementasjonsmerknader

- Alle nøkler konverteres til små bokstaver under oppslag
- Oppgavenavn kan inneholde bokstaver, tall, bindestreker (-) og understreker (_)
- Oppgavenavn må starte og slutte med alfanumeriske tegn
- Bruk `_any_` som en wildcard for å matche ethvert oppgavenavn
- Systemet returnerer det første treffet som blir funnet etter oppslagsrekkefølgen
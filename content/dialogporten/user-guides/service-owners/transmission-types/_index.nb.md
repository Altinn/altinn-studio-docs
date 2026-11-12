---
title: "Velge forsendelsestype"
description: "Slik velger du forsendelsestype, med eksempler på hver type"
weight: 22
---

Typen sier hva slags forsendelse det er og hvem som (etter konvensjon) sender den.
`Submission` og `Correction` sendes av parten. Alle andre typer sendes av tjenesteeieren.
Dette valideres ikke, men det avgjør om forsendelsen telles som sendt fra parten eller fra tjenesteeieren.
Velg derfor typen ut fra hvem som faktisk sender, og sett `sender.actorType` slik at den stemmer med typen: `PartyRepresentative` for `Submission` og `Correction`, og `ServiceOwner` for alle andre typer.

Trenger tjenesten en finere inndeling enn typene gir, kan du i tillegg oppgi en URI i `extendedType`.
Arbeidsflate viser ikke `extendedType`, men andre sluttbrukersystemer kan bruke den.

## Bakgrunn for typene

Typene er ikke hentet fra en formell standard. De er et pragmatisk utvalg som skal dekke de aller fleste behovene vi ser for oss i tjenesteeiernes saksprosesser, uten at det blir så mange typer at det er uklart hvilken man skal velge.

Typene er bevisst generelle og sier ikke noe om domenet. Det gjør at de kan brukes på tvers av tjenesteeiere, og at sluttbrukerflatene kan vise forsendelser likt uansett hvilken tjeneste de kommer fra. Hva forsendelsen konkret handler om, kommer frem av tittel og innhold. Typen sier hvilken rolle den har i dialogen.

## Relaterte forsendelser

En forsendelse kan peke på en tidligere forsendelse i samme dialog med `relatedTransmissionId`.
Det er ikke påkrevd, men vi oppfordrer til det, spesielt for `Correction`, `Acceptance`, `Rejection`
og svar på en `Request`. Da blir det tydelig hva forsendelsen svarer på eller endrer.

## Fra parten

### `Submission` – Innsending
En vanlig innsending av opplysninger eller et skjema.
- Virksomhet sender inn mva-meldingen for en termin
- Innbygger søker om byggetillatelse
- Ettersending av dokumentasjon etter en `Request` (bør relateres til forespørselen)

### `Correction` – Korrigering
Retter eller overstyrer en tidligere innsending. Bør relateres til innsendingen den korrigerer.
- Korrigert mva-melding for en termin som allerede er levert
- A-melding som retter et feil lønnsbeløp

## Fra tjenesteeieren

### `Information` – Informasjon
Generell informasjon som ikke er knyttet til en innsending. Krever ingen handling.
- «Saksbehandlingstiden er for tiden ca. 8 uker.»
- Orientering om regelendringer som gjelder saken

### `Acceptance` – Godkjenning
Sier at en tidligere innsending (`Submission` eller `Correction`) er godkjent. Bør relateres til innsendingen.
- «Mva-meldingen er mottatt og godkjent.»
- Kvittering på godkjent a-melding

### `Rejection` – Avvisning
Sier at en tidligere innsending (`Submission` eller `Correction`) ikke godkjennes. Gjelder én del av saken, ikke saken som helhet.
Bør relateres til innsendingen. Svaret er ofte en `Correction` eller en ny `Submission`.
- «Meldingen er avvist: organisasjonsnummeret finnes ikke.»
- Valideringsfeil i et innsendt skjema

### `Request` – Forespørsel
Ber parten om mer informasjon. Svaret er normalt en `Submission`.
- «Vi trenger kopi av leiekontrakten for å behandle søknaden.»
- Pålegg om å legge frem regnskapsbilag

### `Alert` – Kritisk varsel
Kritisk informasjon om prosessen. Det får følger for parten å overse den. Brukes med måte.
- «Fristen går ut i morgen. Etter fristen ilegges tvangsmulkt.»
- «Saken avsluttes om 7 dager hvis vi ikke hører fra deg.»

### `Decision` – Vedtak
Et formelt vedtak. En sak kan ha flere.
- Vedtak om innvilget eller avslått byggetillatelse
- Skatteoppgjøret
- Klagevedtak

## Huskeregel

| Spørsmål                                               | Type                       |
|--------------------------------------------------------|----------------------------|
| Godkjenner vi denne ene innsendingen?                  | `Acceptance` / `Rejection` |
| Er dette et formelt vedtak?                            | `Decision`                 |
| Trenger vi noe fra parten?                             | `Request`                  |
| Får det følger å overse meldingen?                     | `Alert`                    |
| Ingen av delene?                                       | `Information`              |

## Typisk forløp

```
Submission → Acceptance → Request → Submission → Acceptance → Decision
Submission → Rejection  → Correction → Acceptance → Decision
```

**Les mer**

- [Definere forsendelser]({{< relref "../creating-dialogs#definere-forsendelser" >}}) i veiledningen om å opprette dialoger
- {{<link "../../../reference/entities/transmission">}}

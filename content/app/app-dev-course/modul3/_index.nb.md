---
title: Modul 3
description: Bygg og publiser applikasjon til testmiljø
linktitle: Modul 3
tags: [apps, training, build, deploy, test ]
weight: 20
---

{{% notice warning %}}
 Denne modulen krever at du er medlem av en organisasjon som har et etablert testmiljø for Altinn Apps. Dersom dette ikke er tilfellet kan du gå videre til [neste modul](../modul4/).
{{% /notice %}}

I denne modulen skal du bygge og publisere applikasjonen til [Altinns testmiljø (TT02)](https://tt02.altinn.no/) og verifisere at alt fungerer som forventet også der.

**Temaer som dekkes i denne modulen:**
- Sette egendefinerte krav for ressursbruk
- Bygge applikasjon
- Publisering (deployment) av applikasjon

## Oppgaver
{{% expandlarge id="endre-ressurser" header="Sette egendefinerte krav for ressursbruk" %}}

Alle applikasjoner kommer med et standardoppsett for ressursbruk og skalering i applikasjonsclusteret.
Du kan overstyre følgende innstillinger for å tilpasse applikasjonens behov:

- Antall replikas (instanser av applikasjonen som kjører samtidig)
- Regler for når applikasjonen skal skalere antall instanser basert på CPU eller minnebruk
- Hvor mye ressurser som skal dedikeres til applikasjonens instanser i clusteret

Ved å overstyre disse innstillingene kan man spare kostnader og sørge for at de har en optimal ytelse med alle nødvendige ressurser tilgjengelig.

### Oppgaver

For denne testapplikasjonen ønsker vi at du skal skalere ned ressursbruken til det minimale med følgende innstillinger:

1. Skalering: `replicaCount: 1`
2. Ressursbruk: Sett _requests_ til `cpu: 50m` og `memory: 128Mi`

{{% notice info %}}
Alle endringer knyttet til skalering og ressursbruk gjøres i filen `App/deployment/values.yaml`
{{% /notice %}}

### Nyttig dokumentasjon
- [Sette egendefinerte regler for skalering](/nb/app/development/configuration/deployment/#skalering)
- [Sette egendefinerte grenser for ressursbruk](/nb/app/development/configuration/deployment/#konfigurasjon-av-ressurser)
{{% /expandlarge %}}

{{% expandlarge id="bygge-applikasjon" header="Bygge applikasjon" %}}

Når man refererer til å bygge en applikasjon i Altinn Studio,
betyr dette å opprette en versjon av applikasjonens nåværende tilstand
som kan publiseres til ett eller flere miljø.

### Oppgaver

1. Opprett et nytt bygg for applikasjonen med versjonsnr `0.0.1`
og legg til en beskrivende kommentar om hva versjonen inneholder.

### Nyttig dokumentasjon
- [Bygge app i Altinn Studio](/nb/app/testing/deploy/#bygge-app)

{{% /expandlarge %}}

{{% expandlarge id="publisere-applikasjon" header="Publisere applikasjon" %}}

Ved å publisere en applikasjon til testmiljø vil man kunne teste alle integrasjoner.
I tillegg benyttes TT02 ofte til å verifisere at en applikasjon oppfører seg som forventet
før man produksjonssetter den.

{{% notice info %}}
For å kunne publisere en applikasjon til TT02 må organisasjonen som eier den ha et app-cluster i testmiljøet.
I tillegg må utvikleren som skal gjennomføre publiseringen inneha [rollen Deploy-TT02](/nb/app/guides/access-management/studio/#deploy-tt02).
{{% /notice %}}

### Oppgaver

1. Publiser applikasjonen din til TT02.

### Nyttig dokumentasjon

- [Publisere app til testmiljø](/nb/app/testing/deploy/#deploy-av-app-til-testmiljø)
- [Tilgangsstyring for organisasjon i Altinn Studio](/nb/app/guides/access-management/studio/#tilgangsstyring-for-organisasjonen)

### Forståelsessjekk
{{% expandsmall id="m3t1q1" header="Er det mulig å ha to versjoner av en applikasjon i TT02 samtidig?" %}}

Nei, det er kun mulig å ha én versjon av applikasjonen ute i et miljø av gangen.
Publiserer man en annen versjon, vil eksisterende versjon av applikasjonen overskrives.
{{% /expandsmall %}}

{{% expandsmall id="m3t1q2" header="Hva skjer hvis man publiserer samme versjon av applikasjonen til miljøet en gang til?" %}}

Da vil alle operasjoner i forbindelse med publisering kjøres om igjen.
Ressurstekster og annen metadata lagres i Altinn Plattform,
og publiserings-pipeline for å rulle ut applikasjonen i clusteret vil og kjøre.

Det vil dog ikke bli spunnet opp nye poder i forbindelse med dette da det ikke er noen reelle endringer på
tjenesten som kjører i miljøet.
{{% /expandsmall %}}

{{% expandsmall id="m3t1q3" header="Vil applikasjonen være tilgjengelig umiddelbart etter publisering?" %}}

Ja, tjenesten vil være tilgjengelig umiddelbart etter publisering.
Dersom status er grønn i Altinn Studio skal du kunne nå applikasjonen.
{{% /expandsmall %}}

{{% expandsmall id="m3t1q4" header="Er det mulig å fjerne en applikasjon fra miljøet hvis den først er blitt publisert?" %}}

Det er foreløpig ikke mulig for en tjenesteeier å selv fjerne en applikasjon fra et miljø når den først er publisert.
 Det jobbes med å få på plass denne funksjonaliteten.
Ønsker du å fjerne en publisert applikasjon må du inntil videre kontakte support.
{{% /expandsmall %}}

{{% /expandlarge %}}

{{% expandlarge id="instansiere-i-tt02" header="Teste applikasjonen i TT02" %}}

På siden for publisering finner du direktelenken til applikasjonen din.
Den er på formatet `<org>.apps.tt02.altinn.no/<org>/<app>`.

Med mindre du er logget inn med en bruker fra før av vil denne lenken ta deg til innloggingssiden til Altinn.
Logg inn med en testbruker fra organisasjonen din eller benytt deg av [Tenors testdata](https://www.skatteetaten.no/skjema/testdata/).
 
Er du intern i Digdir kan du bruke "TestID" innloggings-metoden og generere en tilfeldig bruker,
eller hente innloggings-detaljer for testbruker i [det interne Altinn 3 test-datasettet](https://pedia.altinn.cloud/altinn-3/testing/test-data/).

### Oppgaver

1. Logg inn med en testbruker.
2. Test de ulike sporvalgene og skjemasidene for å bekrefte at de oppfører seg som forventet.

### Nyttig dokumentasjon
- [Tenor testdata](https://www.skatteetaten.no/skjema/testdata/)
- [Digdir Altinn 3 testdatasett](https://pedia.altinn.cloud/altinn-3/testing/test-data/)

{{% /expandlarge %}}

## Oppsummering

I denne modulen har du bygget og publisert applikasjonen din til testmiljøet TT02,
logget inn i Altinn med en testbruker og testet applikasjonen din.

## Løsningsforslag

[Kildekode Modul 3](https://altinn.studio/repos/testdep/flyttemelding-sogndal/src/branch/modul3)

{{% expandlarge id="resources-solution" header="Sette egendefinerte krav for ressursbruk" %}}

Følgende endringer er gjort i koden:

{{< code-title >}}
App/deployment/values.yaml
{{< /code-title >}}

```yaml{linenos=false,hl_lines="3-7"}
deployment:
  
  replicaCount: 1
  
  requests:
      cpu: 50m
      memory: 128Mi

...
```

{{% /expandlarge %}}

<br><br>

{{% center %}}
[<< Forrige modul](../modul2/)      [Neste modul >>](../modul4/)
{{% /center %}}

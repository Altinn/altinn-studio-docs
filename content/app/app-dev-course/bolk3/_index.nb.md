---
title: Bolk 3
description: Bygg og deploy applikasjon til testmiljø
linktitle: Bolk 3
tags: [apps, training, build, deploy, test ]
weight: 20
---
{{% notice warning %}}
 Denne bolken krever at du er medlem av en organisasjon som har et etablert testmiljø for Altinn Apps. Dersom dette ikke er tilfellet, går du bare videre til neste bolk.
{{% /notice %}}


I denne bolken skal du bygge og deploye applikasjonen til Altinns testmiljø (TT02) og verifisere at alt fungerer som forventet også der.


**Temaer som dekkes i denne bolken:**
- Sette egendefinerte krav for ressursbruk
- Bygg av applikasjon
- Deploy av applikasjon


## Oppgaver
{{% expandlarge id="endre-resursser" header="Sette egendefinerte krav for ressursbruk" %}}

Alle applikasjoner kommer med et standardoppsett for ressursbruk og skalering i applikasjonsclusteret.
Det oppsettet er mulig å overstyre dersom applikasjonen din skulle ha andre behov.
- Man kan endre antall replikas (instanser av applikasjonen som kjører samtidig)
- Man kan endre reglene for hvor tidlig eller sent applikasjonen skal skalere antall instanser ut ifra CPU eller minnebruk
- Man kan endre hvor mye ressurser som skal dedikeres til applikasjonens instanser i clusteret

Ved å overstyre disse verdiene kan man for mindre applikasjoner spare kostnader,
og for større applikasjoner sørge for at de har en optimal ytelse med alle nødvendige ressurser tilgjengelig.

For denne testapplikasjonen ønsker vi at du skal skalere ned resursbruken til det minimale.

Skalering: `replicaCount: 1`

Ressursbruk: Sett _requests_ til `cpu: 50m` og `128Mi`

{{% notice info %}}
Alle endringer knyttet til skalering og ressursbruk gjøres i `deployment/values.yaml`-filen
{{% /notice %}}


### Nyttig dokumentasjon
- [Sette egendefinerte regler for skalering](../../development/configuration/deployment/#skalering)
- [Sette egendefinerte grenser for ressursbruk](../../development/configuration/deployment/#resources-konfigurasjon)
{{% /expandlarge %}}



{{% expandlarge id="bygge-applikasjon" header="Bygge applikasjon" %}}

Når man referer til å bygge en applikasjon i Altinn Studio,
betyr dette å opprette en versjon av applikasjonens nåværende tilstand
som kan deployes til et eller flere miljø.

Opprett et nytt bygg for applikasjonen med versjonsnr `0.0.1`
og legg til en beskrivende kommentar om hva versjonen inneholder.

### Nyttig dokumentasjon
- [Bygge app i Altinn Studio](../../testing/deploy/#bygge-app)

{{% /expandlarge %}}


{{% expandlarge id="deploye-applikasjon" header="Deploye applikasjon" %}}

Ved å deploye en applikasjon til testmiljø vil man kunne teste alle integrasjoner.
I tillegg benyttes TT02ofte til å verifisere at en applikasjon oppfører seg som forventet
før man deployer til produksjon.

{{% notice info %}}
For å kunne deploye en applikasjon til TT02
må organisasjonen som eier applikasjonen ha et apps cluster i testmiljøet.
I tillegg trenger utvikleren som skal deplopye applikasjonen [rollen Deploy-TT02](../app/getting-started/access-management/studio/#deploy-tt02)
for organisasjonen i Altinn Studio.
{{% /notice %}}

**Deploy applikasjonen din til TT02 og test de ulike sporvalgene og skjemasidene for å bekrefte at det oppfører seg som forventet.**

### Nyttig dokumentasjon
- [Deploye app til testmiljø](../../testing/deploy/#bygge-app)
- [Tilgangsstyring for organisasjon i Altinn Studio](../../getting-started/access-management/studio/#tilgangsstyring-for-organisasjonen)

### Forståelsessjekk
- Er det mulig å ha to versjoner av en applikasjon i TT02 samtidig?
- Hva skjer hvis man deployer samme versjon av applikasjonen til miljøet en gang til?
- Vil applikasjonen være tilgjengelig umiddelbart etter deploy?
- Er det mulig å fjerne en applikasjon fra miljøet hvis den først er blitt deployet?
{{% /expandlarge %}}

{{% expandlarge id="instansiere-i-tt02" header="Teste applikasjonen i TT02" %}}

På deploysiden finner du direktelenken til applikasjonen din.
Den er på formatet _{org}.apps.tt02.altinn.no/{org}/{app}_


Med mindre du er logget inn med en bruker fra før av,
vil denne lenken ta deg til innloggingssiden til Altinn.
Organisasjonen din bør ha tilgang på et sett med testbrukere, benytt en av disse for å logge inn.

For interne ressurser i DigDir: Benytt deg av en av testbruker som du finner i [testdatasettet](https://pedia.altinn.cloud/testing/testdata/datasets/) og logg inn.

{{% /expandlarge %}}

## Oppsummering

I denne boken har du bygget og deployet applikasjonen din til TT02,
logget inn i Altinn med en testbruker, og testet applikasjonen din.

### Løsningsforslag
Dersom du ikke har fått til alle stegene har vi et [løsningsforslag](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/3) som du kan hente inspirasjon fra.


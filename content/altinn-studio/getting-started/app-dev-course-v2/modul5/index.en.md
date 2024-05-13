---
title: Modul 2
description: Forhåndsutfylling, bygg og publisering
linktitle: Modul 2
tags: [apps, training, prefill, sporvalg]
weight: 20
hidden: true
---
I denne modulen skal du sette opp forhåndsutfylling av personopplysninger. Du skal så bygge 
og publisere applikasjonen til testmiljø for å teste at den fungerer som forventet.

**Temaer som dekkes av denne modulen:**
- Sette opp preutfylling av felter
- Bygge applikasjon
- Publisering av applikasjon til testmiljø

{{% expandlarge id="prefill" header="Forhåndsutfylling av personopplysninger" %}}

Altinn gir fordelen av å ha lett tilgjengelig [metadata](/nb/api/models/instance/#instance) for enkeltpersoner og bedrifter.
Ved hjelp av forhåndsutfylling kan vi hente brukerdata og fylle ut felt sømløst.
Dette reduserer behovet for manuell inntasting av data, spesielt for standardopplysninger som navn, adresser og e-postadresser.

Du kan integrere data fra Altinns [forhåndsutfyllingskilder](/nb/altinn-studio/guides/prefill/config/#tilgjengelige-prefill-verdier) direkte i appen ved å tilordne dataene til spesifikke felt i datamodellen. Dette automatiserer utfylling av felt under opprettelse av skjema. Du kan også integrere egendefinerte løsninger for forhåndsutfylling.

Denne oppgaven fokuserer på den første siden for datainnsamling og har som mål å effektivisere brukeropplevelsen ved å forhåndsutfylle brukerens personalia.

### Krav fra kommunen

- Følgende verdier skal forhåndsutfylles for brukeren:
  - Fornavn
  - Mellomnavn
  - Etternavn
  - E-post
  - Telefonnummer

- Det skal **ikke** være mulig å endre forhåndsutfylt navn.
- Det skal være mulig å endre forhåndsutfylt e-post og telefonnummer

### Oppgaver

1. Opprett en [fil for forhåndsutfylling](/nb/altinn-studio/guides/prefill/config/#oppsett-av-prefill-i-applikasjons-repository).
2. Konfigurer forhåndsutfylling for verdier tilgjengelig i Altinns [forhåndsutfyllingskilder](/nb/altinn-studio/guides/prefill/config/#tilgjengelige-prefill-verdier)
3. Konfigurer innstillinger for felter som ikke skal kunne endres av brukeren.

{{% notice info %}}
**Merk:** Applikasjonen publiseres til testmiljø for at forhåndsutfyllinger skal vises.
{{% /notice %}}

### Nyttig dokumentasjon
- [Forhåndsutfylling fra nasjonale registre og brukerprofil](/nb/altinn-studio/guides/prefill/config/#prefill-fra-nasjonale-register-og-brukerprofil)
- [Tilgjengelige kilder og verdier for forhåndsutfylling](/nb/altinn-studio/guides/prefill/config/#tilgjengelige-prefill-verdier)
- [Bonus: Egendefinert forhåndsutfylling](/nb/altinn-studio/guides/prefill/custom)
- [Instance](/nb/api/models/instance/#instance) - Metadata for applikasjonen.

### Forståelsessjekk

{{% expandsmall id="m2t2q1" header="Er det mulig å endre en forhåndsutfylt verdi?" %}}
Ja, en standardkomponent med forhåndsutfylt data vil i utgangspunktet være redigerbar.
{{% /expandsmall %}}

{{% expandsmall id="m2t2q2" header="Hvordan kan man hindre at en forhåndsutfylt verdi endres av sluttbrukeren?" %}}

Komponenten kan settes til `readOnly` ved å huke av ved "Det skal ikke være mulig å svare (read only)" for den aktuelle komponenten i Altinn Studio.


Alternativt kan man kjøre valideringer av dataen på serversiden for å verifisere at dataen i feltet matcher dataen fra forhåndsutfyllingskilden. Dette kan gjøres i prosesserings- eller valideringslogikken til applikasjonen.
{{% /expandsmall %}}

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
I tillegg må utvikleren som skal gjennomføre publiseringen inneha [rollen Deploy-TT02](/nb/altinn-studio/guides/access-management/studio/#deploy-tt02).
{{% /notice %}}

### Oppgaver

1. Publiser applikasjonen din til TT02.

### Nyttig dokumentasjon

- [Publisere app til testmiljø](/nb/app/testing/deploy/#deploy-av-app-til-testmiljø)
- [Tilgangsstyring for organisasjon i Altinn Studio](/altinn-studio/guides/access-management/studio/#access-management-for-the-organization)

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
 Er du intern i Digdir kan du logge inn med en testbruker fra [testdatasettet](https://pedia.altinn.cloud/testing/testdata/datasets/).

### Oppgaver

1. Logg inn med en testbruker.
2. Test de ulike sporvalgene og skjemasidene for å bekrefte at de oppfører seg som forventet.

### Nyttig dokumentasjon
- [Tenor testdata](https://www.skatteetaten.no/skjema/testdata/)
- [Digdir testdatasett](https://pedia.altinn.cloud/testing/testdata/datasets/)

{{% /expandlarge %}}

## Oppsummering

I denne modulen har du satt opp preutfylling av data, bygget og publisert applikasjonen din til testmiljøet TT02,
logget inn i Altinn med en testbruker og testet applikasjonen din.

{{% center %}}
[<< Forrige modul](../modul4/)
{{% /center %}}
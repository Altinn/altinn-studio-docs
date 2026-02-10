---
draft: true
title: Forhåndsutfylling
linktitle: Forhåndsutfylling
description: Forhåndsutfylle data i appen
tags: [needsReview, needsTranslation]

aliases:
- /nb/altinn-studio/guides/prefill/
---

Altinn-appen din kan automatisk fylle ut deler av skjemaet før brukeren begynner. Det finnes flere forskjellige metoder
for å gjøre dette, og disse kan brukes sammen eller hver for seg.

## Konfigurasjonsbasert oppsett
### Hva gjør denne funksjonen?
Altinn-appen din kan automatisk fylle ut deler av skjemaet før brukeren begynner. Du kan hente dataene fra:
- Enhetsregisteret (for bedriftsinformasjon)
- Folkeregisteret (for personinformasjon)
- Brukerens Altinn-profil

Når noen starter skjemaet, blir feltene du velger, fylt ut automatisk med riktige data.

### Når bør jeg bruke dette?
Hvis du skal forhåndsutfylle data fra en av kildene listet over. Det er et begrenset sett med felter som er tilgjengelige. 
Se [fullstendig liste over tilgjengelige datafelt for alle kildene](/nb/altinn-studio/v10/develop-a-service/prefill/reference/sources).

## Egendefinert kode
### Hva gjør denne funksjonen?

Du kan lage din egen kode for å fylle ut deler av skjemaet automatisk før brukeren begynner. Dette gir deg mer fleksibilitet enn den vanlige konfigurasjonsfilen. Du kan for eksempel:
- Hente data fra et API
- Gjøre beregninger
- Bruke annen logikk du selv bestemmer

### Når bør jeg bruke dette?
Hvis du har behov for kilder utover de som er tilgjengelige via konfigurasjonsbasert oppsett, eller har behov for annen logikk som del av forhåndsutfyllingen.

## HTTP POST
### Hva gjør denne funksjonen?

Du kan starte opp en skjema-instans med ferdig utfylte data fra f.eks. eget fagsystem. Dataene sendes som en multipart 
i HTTP POST-requesten til appen.

### Når bør jeg bruke dette?
Hvis du skal starte opp en skjema-instans på vegne av en bruker, f.eks. hvis du kun sender ut skjema til en gitt liste med
mottakere, og har noe data tilgjengelig i egne systemer.

## Spørringsparametre
### Hva gjør denne funksjonen?
Du kan sende med en eller flere spørringsparametre i URL som lenker til tjenesten. Når bruker starter tjenesten via URL som
bruker spørringsparametre, vil data fra URL'ens spørringsparametre kunne forhåndsutfylles i skjema.

#### Eksempel
Dette gjør det mulig for brukere å klikke på en lenke som
https://ttd.apps.tt02.altinn.no/ttd/stateless-app/set-query-params?jobTitle=designer,
og få ordet "designer" forhåndsutfylt i et datamodellfelt.

Du kan teste det selv ved å klikke på lenken til vår test-app over, og logge inn med TestID. Bytt gjerne ut `designer`
i URL'en og se resultatet.

### Når bør jeg bruke dette?
Hvis bruker selv skal starte skjema-instans, og klikker på lenke for å gjøre dette. Denne funksjonen kan være særlig 
nyttig f.eks. om det er behov for å forhåndsutfylle forskjellig verdi basert på hvor brukeren startet tjenesten fra 
(f.eks. forskjellige nettsider).

### Forbehold
Det er imidlertid noen viktige forbehold knyttet til sikkerhet når du bruker denne tilnærmingen.

1. Forhåndsutfylling med spørringsparametere bare brukes i en stateless-oppgave - dvs. FØR skjema-instansen
    faktisk opprettes (og før noe data faktisk lagres). Dette gjør at dataene kan vises til brukeren før instansiering, slik at brukeren fortsatt har kontroll
    over hvilke data som lagres.
    > Uten dette kravet, ville det vært mulig for en angriper å endre verdien i parameteren og få den 
    > verdien til å dukke opp direkte i mottakerens Altinn-innboks.

2. Vi anbefaler på det sterkeste at du inspiserer verdien av spørringsparametere i applikasjonen din. På denne måten 
   sikrer du at bare gyldige data kan forhåndsutfylles. Du kan da stoppe en angriper fra å bruke en lenke som
    
    `altinn.no/ttd/stateless-app/set-query-params?jobTitle=Im a scammer`
    
    som kan få teksten "Im a scammer" til å vises i applikasjonen din.


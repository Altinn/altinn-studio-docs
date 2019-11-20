---
title: Designsystem
description: Selv om Altinn er satt sammen av flere ulike bakenforliggende system, sørger vi for en helhetlig og konsistent brukeropplevelse ved hjelp av designsystemet som binder det hele sammen.
jumbotron: true
---

Siden vi er flere ulike team som jobber med ulike løsninger (men med samme brukergrensesnitt), trenger vi et felles sted for frontend. Dette er for å sikre at vi kun lager komponentene èn gang og at de fremtrer konsistent i brukergrensesnittet selv om de er implementert i ulike løsninger.

![Illustrasjon av ulike team som jobber med ulike bakenforliggendesystem, men frontend-koden må gå via et felles designsystem](designsystemTeams.png)

Designsystemet er i bruk av infoportal, portal og altinn digitalisering. 

For å komme i gang med utvikling på Altinn og Brønnøysundregistrenes webløsninger, bør du ha kjennskap til hvordan designsystemet er tenkt å fungere som bindeledd mellom de ulike løsningene.

## Pattern Lab

For å bygge designsystemet har vi brukt «Pattern Lab», som er et verktøy for å lage atomiske designsystem. Pattern Lab fungerer som et arbeidsverktøy der frontend-utviklere lager alle UI-komponentene i HTML, CSS og Javasript. Komponentene kan settes sammen til sider, og deretter til en klikkbar prototype som kan brukertestes. Pattern Lab sørger for enkel prototyping og overlevering av CSS, javascript og HTML-kode til backend-utviklere.

<b>Pattern Lab brukes i hovedsak til to formål:</b>

- Pattern Lab skal være et hjem for alle UI-komponenter med deres styling og retningslinjer. CSS og javascript for komponentene skal **kun** eksistere og vedlikeholdes her.
- Pattern Lab skal fungere som prototypeverktøy. Alle maler skal i de fleste tilfeller prototypes og brukertestes før implementering.

## Er du backend-utvikler?

Er du backend-utvikler og skal benytte deg av designet fra designsystemet, trenger du ikke å innstallere Pattern Lab som utviklingsmiljø. Du trenger kun å hente ned de distribuerte designfilene (css og javascript) fra [NPM](https://www.npmjs.com/package/altinn-designsystem). I tillegg kan du bruke designsystemet for å finne og kopiere HTML-koden inn i ditt system. (Grunnen til at HTML ikke kan være synkronisert, er at de ulike løsningene er bygget på ulike bakenforliggende system). Designsystemet er versjonsbasert, slik at din løsning kan velge å oppdatere til nyeste versjon av designsystemet når det er ønskelig. NB: jQuery må hentes inn i tillegg.

<a class="a-noUnderline" href="https://badge.fury.io/js/altinn-designsystem"><img src="https://badge.fury.io/js/altinn-designsystem.svg" alt="npm version" height="18"></a>

## Er du frontend-utvikler?

Med definerte UI-komponenter i Patternlab kan man som frontend-utvikler enkelt sy sammen nye maler og prototyper. NB: En designer skal alltid være ivolvert i design av nye brukergrensesnitt.

Skal du jobbe med frontend, må du først klone Git-repositoriet fra Altinns [github](https://github.com/Altinn/DesignSystem) og følge oppskriften der for hvordan du setter opp utviklingsmiljøet. Når du er ferdig med innstallasjonen skal du kunne se [dette](http://altinn.github.io/DesignSystem/public/) på din localhost:3000.

### Pattern Lab Dokumentasjon
Dokumentasjon for hvordan utvikle atomisk design med Pattern Lab er tilgjengelig på [Pattern Lab](http://patternlab.io/docs/index.html) sine nettsider.

### Rutiner for oppdatering
Når et nytt atom, molekyl eller organisme lages, skal følgene sjekkes:

- Følg retningslinjene for <a href="../retningslinjer-altinn/frontend.html">frontend-kode</a>.
- Dersom du har endret en eksisterende komponent, sjekk at den fortsatt fungerer som den skal på alle steder den er brukt.
- Placeholder-tekst i komponenter skal beskrive funksjonen. F.eks "Tittel på listen". Løpende tekst kan være lorem ipsum.
- Oppdater komponentens MD-fil med versjon, status, og eventuelle notater relatert til frontend.
- Sjekk at komponenten fungerer i alle skjermstørrelser (responsivt).
- Sjekk at både koden og komponenten er <a href="../retningslinjer-altinn/uu.html">universelt utformet</a> i henhold til kravene.

### Branching i github
Designsystemet benytter trunk-basert utvikling. Les mer om dette på [altinnpedia](http://altinnpedia.ai-dev.brreg.no/dev/design-system/branching)

### Publisering
Designsystemet versjoneres og publiseres slik at det enkelt kan benyttes av andre løsninger. Vi publiserer til både npmjs.com og github.com. Les mer om dette på [altinnpedia](http://altinnpedia.ai-dev.brreg.no/dev/design-system/publishing/)

## CSS
Designsystemets css-filer er delt inn etter prosjekt. Vi har en felles "scss-common"-mappe som inneholder felles gjenbrukbar css på tvers av prosjekter.

Hvert enkelt prosjekt kan selv velge hva de ønsker å inkludere av common-filer. De kan også velge hvilken Bootstrap-css de ønsker å inkludere. Til slutt inkluderes spesifikk css for det aktuelle prosjektet. Dette gjelder alle prosjekter i designsystemet.

Ingen av prosjektene eier "scss-common"-mappen, og dersom det gjøres endringer her, skal minst en representant fra hvert prosjekt tagges i pull requesten, og godkjenne endringen.

Dersom et prosjekt ønsker å gjøre endringer som **ikke** påvirker de andre prosjektene, gjøres dette i prosjektets egen scss-mappe. F.eks: Dersom AltinNett har behov for å for å endre "breadcrumb-scss", men ikke vil risikere at det påvirker brreg, oppretter de en egen "breadcrumb.scss" under scss-altinnett og gjør den aktuelle endringen her.

## JavaScript
Designsystemets JavaScript-filer er delt inn i "prototyping" og "production".

- source/js/prototyping/ inneholder funksjonalitet som bare brukes i prototype-sammenheng
- source/js/production/ inneholder funksjonalitet som brukes i produksjon

Hvert prosjekt har en egen "init"-fil som starter javascript-filene prosjektet har behov for.

Filen "config.json" spesifiserer hvilke javascript-filer hvert prosjekt skal hente inn. Hvert prosjekt har i config-filen en prototype-del og en produksjons-del. Config-filen leses av Gulp for å generere produksjonsfilene til dist-mappen, mens prototypefilene genereres til public-mappen.

### Eksterne biblioteker
Utviklingsoppsettet er orientert rundt et Node.js-miljø og derfor blir JavaScript-biblioteker (til bruk i både utvikling og produksjon) hentet inn som Node.js-moduler (definert i fila package.json).

### Distribuert kode
JavaScript-kode for Altinns brukergrensesnitt leveres som produksjonsfiler:

- dist/js/infoportal.js sammenfatter internt produsert kode for de visninger og moduler som omfattes av infoportal
- dist/js/infoportal.vendor.js sammenfatter eksterne biblioteker for de visninger og moduler som omfattes av infoportal
- dist/js/portal.js sammenfatter internt produsert kode for de visninger og moduler som omfattes av portal
- dist/js/portal.vendor.js sammenfatter eksterne biblioteker for de visninger og moduler som omfattes av portal

### Øvrig informasjon
En del av koden forutsetter jQuery som avhengighet. jQuery bundles imidlertid aldri med distrubusjonsfiler, grunnet utbredelsen til bibilioteket, og må derfor refereres til utenom.

## Oppdatere Designsystemets utstillingsvindu
Designsystemet har et eget "utstillingsvindu" (det er her du er akkurat nå). Koden for dette ligger på Git-repositoriet "[designsystem-styleguide](https://github.com/Altinn/designsystem-styleguide)." Dersom du skal oppdatere dette må du først klone Git-repositoriet og følge installasjonsveiledningen.

For å importere de siste komponentene fra Pattern Lab inn i utstillingsvinduet, gå tilbake til git-repositoriet "Designsystem" (Pattern Lab), og kjør ```gulp style-guide-export``` i kommandolinjen. Alle patterns vil da havne i "designsystem-styleguide" > "patterns".

For å vise komponentene, må man lage en ny md-fil under ønsket kategori i "components"-mappen. F.eks under "skjemakomponenter". Deretter må md-filen oppdateres med info og referere til korrekt fil i "patterns"-mappen.

### Github gh-pages
Vi har en egen branch som heter "gh-pages". Filene som ligger i denne branchen vises som en demo på [altinn.github.io/DesignSystem/](altinn.github.io/DesignSystem/) .

I denne branchen ligger følgende:
- Alle filer under "designsystem-styleguide" > "_site". (Index-filen vil da sørge for at designsystemets utstillingsvindu er tilgjengelig på demoen over.)
- Innholdet fra PatternLabs "public"-mappe, slik at frontendmiljøet kan være synlig fra [altinn.github.io/DesignSystem/PatternLab](altinn.github.io/DesignSystem/PatternLab)
- Et par andre mapper som er relevant for tidligere versjoner av prototypen

For å oppdatere [altinn.github.io/DesignSystem/](altinn.github.io/DesignSystem/), kopier de nyeste filene fra "designsystem-styleguide" > "_site" og innholdet fra PatternLabs "public"-mappe. Kjør ```git checkout gh-pages``` i "Designsystem"-repositoriet, og lim inn de nye filene. Commit til gh-pages branchen.

---
title: Design
description: Altinn har som mål å gjøre det enklere for innbyggere og næringsliv å være i kontakt med det offentlige uavhengig av digital kompetanse. Felles retningslinjer for design hjelper oss å skape konsistens på tvers av tjenester som lages i Altinn Studio. 
weight: 10
toc: true
tags: [translate-to-english]
---

## Designprinsipper
Når vi utvikler nye eller forbedrer eksisterende produkter følger vi et sett med prinsipper for å kunne sikre oss at vi 
leverer brukervennlige løsninger til alle. Vi anbefaler å følge disse prinsippene når du jobber med utvikling av nye tjenester.

1. **Vi setter brukerbehov først** Vi bruker innsikt om brukernes behov aktivt i utviklingen av produktene våre. Alle 
løsninger skal fokusere på å løse reelle problemer for brukerne og vi bruker undersøkelser og brukerinnsikt til å 
ta beslutninger.
1. **Skjule kompleksitet** Vi lager fokuserte og forenklede løsninger og skreller vekk unødvendig kompleksitet for 
brukerne. Løsningene er ofte komplekse på baksiden, men fremstår enkle og brukervennlige for folk som bruker dem.
2. **Helhetlige brukeropplevelser** Produktene våre skal henge sammen slik at folk får en helhetlig brukeropplevelse. 
Vi bruker konsistent språk og samme komponenter i alle digitale løsninger. Brukerne skal kjenne seg igjen uansett 
hvilken del av produktet man bruker.
3. **Visuelt design som motiverer** Det visuelle designet skal bidra til å gjøre brukerne trygge i dialogen med 
det offentlige. Vi bruker en vennlig fargepalett, et enklere grensesnitt, tydelige interaksjonselementer og fargesterke 
illustrasjoner til å skal skape en god atmosfære. Alle visuelle beslutninger skal ha et klart formål om å skape en spesifikk effekt.
4. **Tilgjengelighet for alle** Vi strekker oss langt for å lage digitale løsninger som skal være tilgjengelige for alle. 
Vi gjenbruker komponenter som en måte å optimalisere tilgjengelighet på - teknisk så vel som interaksjonsdesign og visuelt design.


## Konsistens på tvers av tjenester
Felles retningslinjer for design hjelper oss å skape konsistens på tvers av tjenester som lages i Altinn Studio. 

Når brukere møter en ny tjeneste, har de med seg forventninger fra tidligere opplevelser. Når disse forventningene møtes, 
kreves det mindre av brukeren for å samhandle med komponentene, og det bygges selvtillit. Ved å ikke trenge å lære nye 
interaksjoner, vil brukerens fokus i større grad være på innholdet.

Vi anbefaler **ikke** å endre CSS for individuelle tjenester som bruker Altinn-designet. Dersom vi åpner opp for 
designendringer og fargeendringer, vil dette skade konsistensen mellom tjenestene. Konsekvent design mellom 
tjenesteeiere er noe vi bør strekke oss mot. For å få det til kreves et godt samarbeid mellom fagmiljøet i Altinn 
og hos de ulike tjenesteeierene. 
**Vi ønsker oss en god felles løsning som kan brukes og forbedres av alle, fremfor mange forskjellige løsninger gjennom ulike CSS-endringer.** 
Dette vil også gjøre det lettere å kontrollere tilgjengeligheten på tvers av apper på plattformen vår. 
Velger du likevel å gå bort fra designet, er du selv ansvarlig for å følge alle 
[WCAG-krav](https://www.uutilsynet.no/wcag-standarden/wcag-20-standarden/86). 

{{% panel-contribute 
src1="https://github.com/Altinn/altinn-studio/issues/new/choose" title1="Opprett en sak i github" 
src2="https://altinn.slack.com/" title2="Skriv til oss på Slack" %}}

**Har du behov for en ny komponent?**


Vi ønsker at alle er med på å videreutvikle 
[biblioteket av komponenter](../components) med både design og kode. 
I praksis vil dette si at Altinn ønsker å [ta imot forslag til nye komponenter](../../../../community/contributing/propose-component/) etter hvert som tjenesteeierne ser 
behovet for det.

{{% /panel-contribute %}}

## Inngang til skjema
Brukertester har vist at når brukerne starter på etaten/kommunens sider for å fylle ut et skjema og så blir sendt 
videre til Altinn, får de ofte opplevelsen av at «plutselig var jeg i altinn». Innganger til skjema bør derfor 
presenteres slik at det er tydelig at man går til Altinn, men samtidig slipper å gå innom unødvendige mellomledd. 
"Start innsending" bør lenke direkte til skjemaet. Opplevelsen til bruker vil da også i større grad bli at man får 
løst oppgaven i konteksten man er i, men at Altinn er brukt som løsning for innsending og historikk. 

![Forslag til hvordan man kan presentere et skjema fra en Etat/kommunes nettside](link-to-altinn.png "Inngang til et skjema i Altinn bør presenteres tydelig")


{{% panel %}}
**Integrerte komponenter** 

I tett samarbeid med sentrale tjenesteeiere planlegger vi på sikt å kunne tilby komponenter som kan benyttes på 
etatens nettsider, slik at brukerne kan løse oppgaven i den konteksten de er i. 

Altinns brukere ønsker både løsning der de er og en samlet oversikt. Og de bør få begge deler. Men behovene dekkes 
best på litt forskjellige måter.

{{% /panel %}}

## Innhold i skjema
Brukeren skal ikke trenge å få feilmelding for å forstå hva som skal til for å fylle ut skjemaet riktig. Dette bør 
tydelig komme frem i informasjonstekst i begynnelsen av skjemaet og i labels som tilhører hvert enkelt skjemafelt. 

Som hovedregel bør man kun spørre om informasjon som er helt nødvendig å innhente. Du kan derfor opplyse i starten 
av skjemaet om at alle felt er påkrevde og må fylles ut (for å slippe å markere alle som påkrevde). Frivillige 
felt kan eventuelt markeres med "frivillig" i selve labelen til feltet.

### Fordel innholdet i flere steg og bruk sporvalg
En side med mye informasjon og flere oppgaver kan fort bli overveldende for en bruker. Prøv å del opp tjenesten 
slik at brukeren bare har en oppgave per side. Dette kan for eksempel være et spørsmål brukeren må svare på eller 
viktig informasjon som må leses. Dette kan gjøre det lettere for brukeren å fokusere på og forstå det du ber dem om.

Designet vi tilbyr nå er laget med utgangspunkt i dette konseptet. Et større antall komponenter kan føre til mye 
scrolling og en mer uoversiktlig opplevelse for brukeren. 
Se eksempel: [Starte enkeltpersonforetak](dsf).

Brukeren skal slippe å svare på mer enn nødvendig. Dersom brukeren har svart nei på et spørsmål og du dermed kan 
skjule flere av stegene for ham, kan du gjøre dette med 
[dynamisk sporvalg](https://altinn.github.io/docs/altinn-studio/app-creation/ux/sporvalg/).

### Disabled
Ved å vise skjemafelt som disabled forventer man at brukeren skal vite hvorfor de ikke kan bruke elementet, 
men dette er ikke alltid tilfellet. Noen brukerer forstår heller ikke at feltet er deaktivert, som igjen kan 
føre til forvirring. Bruk av disabled bør derfor unngås. Dersom en handlingen av en eller annen grunn ikke er 
tillatt, kan dette i stedet forklares i en informasjonstekst.


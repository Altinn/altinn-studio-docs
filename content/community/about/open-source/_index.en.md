---
title: Altinn som åpen kildekode
linktitle: Åpen kildekode
description: Altinn 3 er åpen kildekode med åpen backlog og prioritering, åpen dokumentasjon og åpen dialog og diskusjoner.
toc: true
---

Det er flere som har fått med seg at Altinn har tatt en fundamentalt ny og åpen retning de siste årene.
Vi har fått litt spørsmål om hvorfor vi har gjort dette, og tenkte det er fint å dele våre tanker.


## Deling og gjenbruk

Det finnes veldig [mange](https://opensource.com/life/15/12/why-open-source)
[gode](https://tom.preston-werner.com/2011/11/22/open-source-everything.html)
[grunner](https://opensource.google/docs/why/) til å dele kode som åpen kildekode.

[NAV](https://github.com/navikt/offentlig#retningslinjer-for-%C3%A5pen-kildekode-i-nav), en av de virkelig store inne åpen kildekode i Norge,
er også inne på flere av de samme punktene, men særlig dette med gjennomsiktighet og tillit i forhold til løsninger finansiert av det offentlige.

Vi applauderer når NAV skriver dette:

*Offentlig finansierte løsninger bør være offentlig tilgjengelig.
Motivasjonen er da ikke hovedsakelig gjenbruk, selv om det selvsagt er en heldig bieffekt.
Motivasjonen er først og fremst åpenhet og gjennomsiktighet i de digitale løsningene.*

Gjenbruk er derimot noe vi i Altinn har som en sentral motivasjon.

Vi legger til rette for gjenbruk og deling på alle nivåer, fra hele plattformen og infrastruktur ned til apper, design og GUI-komponenter, kode og konfigurasjon.

Dette er også en av flere grunner til at Altinn nå er et [digitalt fellesgode](https://digitalpublicgoods.net/),
der målsettingen er å kunne gjenbruke det vi utvikler ikke bare på nasjonalt nivå, men også globalt.

## Samarbeid

Den beste måten å få til et godt samarbeid på tvers av organisasjoner og prosjekter er åpenhet og gjennomsiktighet, at alle kan bidra, gi input, bli hørt, følge med.

Det er dette som har vært helt sentralt i "revolusjonen" med åpen kildekode som har blitt den nye normalen for store deler av programvareutvikling i verden, f.eks.
så er det nå [40 millioner utviklere og over 28 millioner åpne repos](https://en.wikipedia.org/wiki/GitHub) på GitHub.

Siden alle våre verktøy og avhengigeheter ligger åpent på GitHub så kan også vi i Altinn følge med, samarbeide og bidra tilbake til programvare som vi benytter.

Eksempler på dette er [.NET](https://dotnet.microsoft.com/platform/open-source),
[Kubernetes](https://github.com/kubernetes/kubernetes), [React](https://github.com/facebook/react), [Linkerd](https://linkerd.io/) og [Gitea](https://github.com/go-gitea/gitea).

Denne måten å spore og enkelt kunne lenke til problemer på tvers av programvare er [issue #5992](https://github.com/Altinn/altinn-studio/issues/5992) et eksempel på.

Og siden Altinn er åpen kildekode på GitHub, så er det like enkelt for alle andre å gjøre det samme mot oss,
både det å [opprette nye issues](https://github.com/Altinn/altinn-studio/issues/new/choose), bidra i diskusjoner eller bidra med kode,
noe labelen [external-contribution-❤️](https://github.com/Altinn/altinn-studio/pulls?q=is%3Apr+label%3Aexternal-contribution-%E2%9D%A4%EF%B8%8F) illustrerer godt.


## Leverandørbindinger

Altinn som felleskomponent har tidligere fått store utfordringer ved å basere seg på lukket proprietær programvare. Programvare fra Adobe i Altinn 1 og fra Microsoft i Altinn 2.
Dette er faktisk [hovedårsaken](https://www.digi.no/artikler/altinn-skal-aldri-mer-ga-ut-pa-dato-men-forst-ma-inntil-tusen-tjenester-skrives-om/508174) til behovet for Altinn 3.

Når du bygger en løsning på toppen av proprietær programvare så har du i praksis mistet kontroll over egen fremtid, f.eks. om leverandøren velger å fase ut produktet.
Om man baserer seg på åpen kildekode så kan man i en slik situasjon lage en [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo), om ikke noen andre gjør det.

Derfor er Altinn 3 [basert på programvare og biblioteker](../../../technology/tools/) som er åpen kildekode.

Vi tenker at dette naturlig nok også er veldig viktig for de som vurderer om man skal ta i bruk Altinn.

*Hvilke bindinger innfører vi til Altinn som teknisk løsning og Digdir som leverandør?*
Selv om Altinn er [et samarbeid](https://www.altinn.no/om-altinn/om-altinn-samarbeidet/), så vil dette være viktige spørsmål.

Derfor er Altinn 3 helt åpen kildekode med [liberal lisensiering](https://github.com/Altinn/altinn-studio/blob/master/LICENSE.md),
og alt som utvikles kjører som vanlige [containere](https://www.docker.com/resources/what-container).

## De beste verktøyene

For å utvikle god programvare så er det viktig å ha tilgang til gode verktøy.

En ting som mange kanskje ikke tenker på er at når du deler det du utvikler som åpen kildekode,
så blir mange av de aller beste verktøyene der ute tilgjengelig - helt gratis.

*"Del, og du blir delt med..."*

Her er noen av de fantastiske SaaS-verktøyene som vi benytter:

- [GitHub](https://github.com/features) - Håndtering av kildekode, backlogs, boards, automatisering, CI/CD, etc.
- [ZenHub](https://www.zenhub.com/) - Epos, estimering, avhengigheter, rapporter.
- [Cypress](https://www.cypress.io/) - Dashboards og automatisert testing av GUI.
- [SonarCloud](https://sonarcloud.io/) - Statisk analyse av kildekode.
- [LGTM](https://semmle.com/lgtm) - Sikkerhetsanalyse av kildekode.

Og dette er bare et lite utvalg...  
Alle verktøy og rammeverk som vi bygger Altinn på toppen av, er åpen programvare som er
[veldig godt likt](/technology/architecture/principles/#build-with-modern-and-popular-frameworks).

## De beste folkene

Det er et gjennomgående tema at [folk](https://github.com/orgs/Altinn/people) liker å jobbe med ny teknologi og de beste verktøyene.
De beste utviklerne foretrekker også å jobbe med åpen kildekode, føle at man bidrar til noe større, at man setter spor.

I tiden som har gått siden vi [lanserte Altinn 3](https://www.digdir.no/digitale-felleslosninger/altinns-nye-skyplattform-i-produksjon/1590)
så har vi ansatt en del veldig dyktige folk, og et gjennomganstema i intervjuer og diskusjoner er at de beste
kandidatene er tydelige på at de synes det er viktig med åpen kildekode, og at dette er noe de ønsker å være med på.

Vi ønsker å bygge et stort community, der alle kan bidra, og da er det ekstremt viktig at vi har teams med dyktige og
[fornøyde utviklere](https://www.techrepublic.com/article/what-makes-developers-happy-contributing-to-open-source/) som kan hjelpe til med å få det til å skje.

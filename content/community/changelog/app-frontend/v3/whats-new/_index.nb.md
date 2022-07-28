---
title: Hva er nytt?
description: Oversikt over endringer som ble introdusert i v3 av app frontend.
toc: true
---

Endringslogg for app-frontend er nå [tilgjengelig på Github Releases](https://github.com/Altinn/app-frontend-react/releases).

For å se en oversikt over [endringer som kommer snart kan du se på roadmap](https://github.com/Altinn/altinn-roadmap/issues).

## 3.37.2 (2022-05-20) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 20 av 2022.

## 3.37.1 (2022-05-15) - Fiks for prefill sammen med preselectedOptionIndex
Om man bruker `preselectedOptionIndex` på et felt som igjen brukes til å påvirke
dynamiske prefill-verdier for andre felt (eller om du bare klikker veldig fort),
kunne feil prefill-verdier bli vist.
Issue [#8255](https://github.com/Altinn/altinn-studio/issues/8255).

## 3.37.0 (2022-05-15) - Støtte for sporvalg i tilstandsløse apper
Tilstandsløse (stateless) apper kan nå benytte sporvalg. Krever versjon 5.1.0 eller senere av nuget-pakker.
Issue [#8347](https://github.com/Altinn/altinn-studio/issues/8347).

## 3.36.4 (2022-05-10) - Fikset validering av tomme felter for skjulte grupper (igjen)
Etter den forrige fiksen lansert i versjon 3.35.2 ble det oppdaget at problemet vedvarte om man skjulte spesifikke
felter istedenfor hele gruppen. Dette problemet er nå løst.
Issue [#6398](https://github.com/Altinn/altinn-studio/issues/6398).

## 3.36.3 (2022-05-10) - Kun referere til beskrivelse om denne finnes
Fikset en feil hvor komponenter hadde satt `aria-describedby` til et element som ikke fantes.
Issue [#23](https://github.com/Altinn/app-frontend-react/issues/23).

## 3.36.2 (2022-05-06) - Fikset potensiell kræsj etter valideringsfeil fra server
Fikser en nylig introdusert feil hvor en feilende validering fra serversiden kunne føre til at appen stoppet.
Issue [#8481](https://github.com/Altinn/altinn-studio/issues/8481).  
Oppdaterte eksterne avhengigheter for uke 18 av 2022.

## 3.36.1 (2022-05-06) - Fikset validering av tomme felter for flerside repeterende grupper
Fikser en feil hvor påkrevde felter i en flerside repeterende gruppe førte til en feilmelding
selv om man ikke hadde lagt til en instans av den repeterende gruppen.
Issue [#7478](https://github.com/Altinn/altinn-studio/issues/7478).

## 3.36.0 (2022-05-03) - Støtte for dynamikk i nøstede repeterende grupper
La til støtte for dynamikk i nøstede repeterende grupper.
Issue [#55](https://github.com/Altinn/app-frontend-react/issues/55).

## 3.35.2 (2022-05-02) - Fikset validering av tomme felter for skjulte grupper
Fikser en feil hvor skjuling av en (ikke-repeterende) gruppe med obligatoriske felter kunne føre til valideringsfeil med
beskjed om at noen usynlige felter ikke var fyllt ut.
Issue [#6398](https://github.com/Altinn/altinn-studio/issues/6398).

## 3.35.1 (2022-04-28) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 17 av 2022.

## 3.35.0 (2022-04-28) - Merke påkrevde felter
Endret standard visning av felter til at påkrevde felter markeres med en *, mens felter som er valgfrie
ikke har noen markering. Valgfrie felter kan settes opp til å markeres med `(Valgfri)` via `labelSettings`-property
på feltet i form layout. Se [her](/app/development/ux/fields/settings/).

## 3.34.4 (2022-04-28) - Fjernet overskrift om vedlegg når det ikke er noen vedlegg
Under kvitteringen ble det vist en overskrift over listen med vedlegg. Etter det ble mulig å skru av generering av
PDF ble denne overskriften fortsatt vist, men har nå blitt skjult.
Issue [#8296](https://github.com/Altinn/altinn-studio/issues/8296).

## 3.34.3 (2022-04-28) - Fikset feil relatert til caching av sist besøkte side
Fikser en feil hvor stateless-applikasjoner brukte en delt nøkkel for persistering av sist besøkte side. Fikser også en feil hvor en tom side ville vises til brukeren om den cachede side-nøkkelen ikke lenger fantes.
Issues [#7897](https://github.com/Altinn/altinn-studio/issues/7897) og [#6975](https://github.com/Altinn/altinn-studio/issues/6975).

## 3.34.2 (2022-04-25) - Fikset kantfarger for checkbox og radio
Kantfargene for disse komponentene fulgte ikke kontrastkravene fra WCAG 2.1.
Fargene på disse har blitt endret til å følge en standardfarge.
Issue [#11](https://github.com/Altinn/app-frontend-react/issues/11).

## 3.34.1 (2022-04-22) - Fikset ugyldig HTML attributt i ImageComponent
`width` attributt på `img` elementer kan kun være [tallverdi som representerer px](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-width). Vi støtter å definere width med andre måleenheter, som f.ex %. 
Width deklarasjonen ble flyttet til inline styling for å løse problemet.
Issue [#14](https://github.com/Altinn/app-frontend-react/issues/14). 

## 3.34.0 (2022-04-11) - Options fra Redux
La til støtte for å sette opp options (kodelister) fra repeterende grupper i Redux staten. Les mer på [docs.](/app/development/data/options/#options-based-on-repeating-groups-from-redux)
Issue [#7626](https://github.com/Altinn/altinn-studio/issues/7626). 

## 3.33.5 (2022-04-11) - Oppdaterte ekstern avhengighet
Oppdatering av ekstern avhengighet grunnet sikkerhetshull.
Pull request [#8371](https://github.com/Altinn/altinn-studio/pull/8371).

## 3.33.4 (2022-03-31) - Webpack 5 + oppdaterte avhengigheter
App frontend bundles nå med webpack 5. Oppdaterte også eksterne avhengigheter.
Issue [#5073](https://github.com/Altinn/altinn-studio/issues/5073).

## 3.33.3 (2022-03-25) - Støtte for å definere rad eller kolonne for checkbox og radio
Lagt til støtte for å definere om radio/checkbox skal vises på en rad eller i kolonne.
Issue [#5730](https://github.com/Altinn/altinn-studio/issues/5730).

## 3.33.2 (2022-03-24) - Justert høyde for inputfelter og datovelger
Høyden på disse feltene var feil. Det har blitt rettet til 36px høyde.
Issue [#7377](https://github.com/Altinn/altinn-studio/issues/7377).

## 3.33.1 (2022-03-23) - Fikset feil med dynamiske options
Fikset en feil hvor kun den første option ble hentet om man hadde definert to komponenter med samme optionId men ulik mapping.
Issue [#8292](https://github.com/Altinn/altinn-studio/issues/8292).

## 3.33.0 (2022-03-18) - Oppdatert tekst i bekreftelsessteg + mulighet til å overstyre
Ny tekst for `confirm.sender` i bekreftelsessteget. Nå også mulighet til å overstyre denne.
Issue [#8243](https://github.com/Altinn/altinn-studio/issues/8243).

## 3.32.10 (2022-03-18) - Fikset feil i datovelgeren
Fikset en feil hvor ugyldige datoer ikke ville vise noen feilmelding.
Issue [#8121](https://github.com/Altinn/altinn-studio/issues/8121).

## 3.32.9 (2022-03-10) - Fikset feil med vedlegg i LocalTest
Er nå mulig å laste ned vedlegg i LocalTest.
Pull request [#7925](https://github.com/Altinn/altinn-studio/pull/7925).

## 3.32.8 (2022-03-04) - Fikset feil for nedtrekkskomponent i repeterende grupper
Fikset en feil hvor nedtrekkskomponenten i repeterende grupper kunne resultere i en ukjent feil.
Issue [#8169](https://github.com/Altinn/altinn-studio/issues/8169).

## 3.32.7 (2022-03-04) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 9 av 2022.
Issue [#8137](https://github.com/Altinn/altinn-studio/issues/8137).

## 3.32.6 (2022-03-02) - Forbedret validerings-støtte for sporvalg
La til støtte for å kunne koble valideirngsmelding til data-felt som ble brukt på flere sider.
Issue [#8145](https://github.com/Altinn/altinn-studio/issues/8145).

## 3.32.5 (2022-03-02) - Forbedringer i tekster
Ulike forbedringer relatert til teksthåndtering. La også til støtte for markdown i tittel-komponentens.
Issue [#7874](https://github.com/Altinn/altinn-studio/issues/7874).
Issue [#7571](https://github.com/Altinn/altinn-studio/issues/7571).

## 3.32.4 (2022-03-01) - Visuelle fikser i modalen.
Justeringer i padding i modalen i mobilvisningen.
Issue [#8143](https://github.com/Altinn/altinn-studio/issues/8143).

# 3.32.3 (2022-03-01) - Kjøre frontendregler på serversidekalkuleringer
Fikset en feil der frontend regler ikke ville bli kjørt når en kalkulering på serversiden oppdaterte et felt koblet til en regel.
Issue [#8054](https://github.com/Altinn/altinn-studio/issues/8054).

# 3.32.2 (2022-02-28) - Fikset feil i Adresse-komponenten
Fikset en feil i adresse-komponenten hvor poststed enkelte ganger ikke ble oppdatert når man skrev inn postnummer.
Issue [#8130](https://github.com/Altinn/altinn-studio/issues/8130).

# 3.32.1 (2022-02-25) - Fikset feil for layout-navn
Fikset en feil hvor en app med en layout-side med navn "data" ikke ville starte.
Issue [#8125](https://github.com/Altinn/altinn-studio/issues/8125).

## 3.32.0 (2022-02-23) - Sikrede options
Er nå mulig å sette opp sikrede options.
Issue [#7893](https://github.com/Altinn/altinn-studio/issues/7893).

## 3.31.4 (2022-02-23) - Feilretting for Bekreft-steget
Fikset feil hvor spinneren ikke ble vist mens confirm request ble gjort.
Viser også nå den genererte PDF'en i bekreft-steget.
Issue [#7824](https://github.com/Altinn/altinn-studio/issues/7824).

## 3.31.3 (2022-02-17) - Fikset oppstilling av label grid
Fikset oppstilling av label grid slik at den matcher en vanlig grid.
Pull request [#8059](https://github.com/Altinn/altinn-studio/pull/8059).

## 3.31.2 (2022-02-17) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 7 av 2022.
Issue [#8048](https://github.com/Altinn/altinn-studio/issues/8048).

## 3.31.1 (2022-02-16) - Ny styling for knapp
Ny styling for knapp-komponent for å matche figma-skisser.
Pull request [#8057](https://github.com/Altinn/altinn-studio/pull/8057).

## 3.31.0 (2022-02-16) - Lagt til støtte for å endre tekster i arkivkvittering
Tekster i arkivkvittering kan nå overstyres fra applikasjonen, og tekstene støtter også markdown og variabler.

Issue [#7902](https://github.com/Altinn/altinn-studio/issues/7902).

## 3.30.0 (2022-02-16) - Automatisk hente nye options når mapping endres
La til funksjonalitet for å automatisk hente options på nytt når et felt i mappingen endres.

Issue [#7888](https://github.com/Altinn/altinn-studio/issues/7888).

## 3.29.1 (2022-02-14) - Fikset feil hvor variables i tekster ble ignorert ved kalkulering
Dette fikser en feil som ble introdusert i 3.29.0

Pull request [#5893](https://github.com/Altinn/altinn-studio/pull/8045).

## 3.29.0 (2022-02-11) - Lagt til Navigationbar komponent 
Lagt til Navigationbar komponent

Issue [#5893](https://github.com/Altinn/altinn-studio/issues/5893).

## 3.28.2 (2022-02-10) - Flyttet testfiler
Ingen kodeendringer

Pull request [#7999](https://github.com/Altinn/altinn-studio/pull/7999).

## 3.28.1 (2022-02-09) - Fikset en feil i checkboxkomponent
Fikset en feil som ble introdusert i 3.27.5, hvor endringer av checkbox førte til at simplebindingverdien ble satt til `,`

Pull request [#7996](https://github.com/Altinn/altinn-studio/pull/7996).

## 3.28.0 (2022-02-09) - Lagt til FileUploadWithTag komponent
Lagt til filopplastningskomponent med mulighet for merking av filer.

Issue [#6479](https://github.com/Altinn/altinn-studio/issues/6479).

## 3.27.5 (2022-02-09) - Fikset feil i checkboxkomponent
Fikset feil i checkboxkomponent

Endringen støtter under sak [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.27.4 (2022-02-08) - Fikset feil i confirm container
Fikset feil i confirm container

Endringen støtter under sak [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.27.3 (2022-02-07) - Fikset feil i radiobuttonkomponent
Fikset feil i radiobuttonkomponent

Endringen støtter under sak [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.27.2 (2022-02-07) - Fikset feil i receipt container
Fikset feil i receipt container

Endringen støtter under sak [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.27.1 (2022-02-07) - Fikset feil i datepickerkomponent
Fikset feil i datepickerkomponent

Endringen støtter under sak [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.27.0 (2022-02-01) - Vise applikasjonseier header
Applikasjonseier vil nå vises i header for å tydeliggjøre hvem som er eier av appen.

Issue [#7227](https://github.com/Altinn/altinn-studio/issues/7227).

## 3.26.3 (2022-02-01) - Fikset feil i adressekomponent
Fikset feil i adresse komponent

Endringen støtter under sak [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.26.2 (2022-02-01) - Fikset feil i dropdownkomponent
Fikset feil i dropdown komponent

Endringen støtter under sak [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.26.1 (2022-01-31) - Fikset feil i InstantiateContainer
Fikset feil i instantiate container

Endringen støtter under sak [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.26.0 (2022-01-30) - Designendringer for repeterende grupper
- "Lagre"-knappen får annereledes stil enn "Neste"-knappen.
- "Rediger"-knappen får samme focus-state stil som den redigerbare boksen så man enklere ser hvilken rad som redigeres.
- Ikon justeres til venstre for tekst i alle ikonknapper.
- Margen i gruppen endres slik at teksten utnytter hele bredden og flyter på samme vertikale linje som resten av innholdet i skjemaet.

Endringen støtter under sak [#7577](https://github.com/Altinn/altinn-studio/issues/7577).

## 3.25.1 (2022-01-24) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 4 av 2022.

Issue [#7842](https://github.com/Altinn/altinn-studio/issues/7842).

## 3.25.0 (2022-01-24) - Lagt til flere datakilder for variabler i tekst
Funksjonaliteten knyttet til variabler i tekster har fått to nye datakilder. Det blir nå mulig å hente verdier fra instance og konfigurasjonsverdier fra ApplicationSettings. Støtten for konfigurasjonsverdier krever versjon 4.25.0 eller nyere av backend sine NuGet pakker.

Endringen støtter under sak [#7520](https://github.com/Altinn/altinn-studio/issues/7520).

## 3.24.0 (2022-01-24) - Nøytralt design
La til et mer nøytralt design for app-frontend.
Issue [#7234](https://github.com/Altinn/altinn-studio/issues/7234).

## 3.23.1 (2022-01-24) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 3 av 2022.
Issue [#7842](https://github.com/Altinn/altinn-studio/issues/7842).

## 3.23.0 (2022-01-21) - Dynamiske options (kodelister)
La til støtte for første utgave av dynamiske options (kodelister).
Issue [#5247](https://github.com/Altinn/altinn-studio/issues/5247).

## 3.22.9 (2022-01-20) - Typestabil FormData + Typescript forbedringer
Gjør FormData typestabil og ulike forbedringer til typer.
Pull request [#7718](https://github.com/Altinn/altinn-studio/pull/7718).

## 3.22.8 (2022-01-17) - Fikset ulike eslint feil
Fikset ulike eslint feil, la til testdekning. Noe refaktorering av eldre komponenter.
Pull request [#7786](https://github.com/Altinn/altinn-studio/pull/7786).

## 3.22.7 (2022-01-13) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 2 av 2022.
Issue [#7753](https://github.com/Altinn/altinn-studio/issues/7753).

## 3.22.6 (2022-01-11) - Fikset feil med repeterende grupper
Fikset feil hvor repeterende grupper staten ikke ville bli fjernet når man lastet ny formlayout.
Issue [#7773](https://github.com/Altinn/altinn-studio/issues/7773).

## 3.22.5 (2022-01-10) - Optimalisering for SummaryGroupComponent
La til manglende keys for forbedret ytelse.
Pull request [#7720](https://github.com/Altinn/altinn-studio/pull/7720).

## 3.22.4 (2022-01-07) - Vise feilmelding for ukjent komponent
App frontend viser nå en feilmelding når den prøver rendre en ukjent komponent.
Pull request [#7724](https://github.com/Altinn/altinn-studio/pull/7724).

## 3.22.3 (2022-01-07) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 1 av 2022.
Issue [#7753](https://github.com/Altinn/altinn-studio/issues/7753).

## 3.22.2 (2021-12-23) - Fikset feil med variabler i tekst
Fikset en feil hvor variabler i tekst ikke ville bli oppdatert etter en backend kalkulering.
Issue [#7308](https://github.com/Altinn/altinn-studio/issues/7308).

## 3.22.1 (2021-12-23) - Fikset feil for manglende rettigheter i stateless view
Fikset en feil hvor manglende rettigheter ville resultere i en generisk feilmelding og ikke feilmelding om manglende rettigheter.
Issue [#6514](https://github.com/Altinn/altinn-studio/issues/6514).

## 3.22.0 (2021-12-22) - Flere muligheter til å skreddersy repeterende gruppe
La til flere muligheter til å overstyre tekster og skjule "legg til" knappen for repeterende gruppe.
Issue [#7164](https://github.com/Altinn/altinn-studio/issues/7164).

## 3.21.1 (2021-12-17) - Fikset feil med validering på task
Fikset en feil hvor feilmeldinger satt i `ValidateTask` i `ValidationHandler.cs` ikke ble vist til bruker.
Issue [#7333](https://github.com/Altinn/altinn-studio/issues/7333).

## 3.21.0 (2021-12-17) - Mulighet for å bruke h2, h3 og h4 for størrelse i header komponenten i FormLayout
Det er nå mulig å bruke h2, h3 og h4, istedenfor S, M og L som verdier for størrelse i header komponenten.
Issue [#7611](https://github.com/Altinn/altinn-studio/issues/7611).

## 3.20.1 (2021-12-16) - Fikset feil i adressekomponenten
Fikset en feil hvor adressekomponenten kræsjet uventet for tomme verdier.
Issue [#7658](https://github.com/Altinn/altinn-studio/issues/7658).

## 3.20.0 (2021-12-14) - Støtte for egendefinert OIDC provider
La til støtte i frontend for at Altinn.Apps kan ha ulike OIDC provider.
Issue [#7173](https://github.com/Altinn/altinn-studio/issues/7173).

## 3.19.2 (2021-12-09) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 49.
Issue [#7590](https://github.com/Altinn/altinn-studio/issues/7590).

## 3.19.1 (2021-12-09) - Endringer i bilde komponent
Flere endringer for bilde-komponenten.
Issue [#7484](https://github.com/Altinn/altinn-studio/issues/7484).

## 3.19.0 (2021-12-06) - Starte instans fra stateless visning
Støtte for å starte en data instans fra stateless visning innad i samme applikasjon.
Issue [#6196](https://github.com/Altinn/altinn-studio/issues/6196).

## 3.18.4 (2021-12-03) - Optimalisering for mobil visning
Tilbakestilte endring av maxWidth fra versjon 3.18.3 da dette skapte trøbbel med fokus-visning på større skjermer.
Issue [#7588](https://github.com/Altinn/altinn-studio/pull/7588).

## 3.18.3 (2021-12-01) - Optimalisering for mobil visning - bredde
Fikset maxWidth for input-komponenter og  for address component.
Issue [#6697](https://github.com/Altinn/altinn-studio/issues/6697).

## 3.18.2 (2021-11-30) - Optimalisering for mobil visning - luft
Forbedret luft for tittel og paragraf-komponentene.
Issue [#6697](https://github.com/Altinn/altinn-studio/issues/6697).

## 3.18.1 (2021-11-30) - Optimalisering for mobil visning - bredde
Endret maxWidth på valideringsmeldinger fra auto til none.
Issue [#6697](https://github.com/Altinn/altinn-studio/issues/6697).

## 3.18.0 (2021-11-29) - Støtte for labelgrid
La til støtte for labelGrid i grid som muliggjør lengre lister med korte spørsmål og svar som kan bli presentert i en tabell-liknende visning.
Issue [#7027](https://github.com/Altinn/altinn-studio/pull/7027).

## 3.17.1 (2021-11-24) - Bugfiks DataProcessWrite.
Fikset en feil hvor numeriske felter som ble satt i DataProcessWrite ikke ble oppdatert i skjema om verdien var 0.
Issue [#7393](https://github.com/Altinn/altinn-studio/issues/7393).

## 3.17.0 (2021-11-24) - Optimalisering for mobilvisning
La til forbedringer i måten skjema ser ut på mobil.
Issue [#6697](https://github.com/Altinn/altinn-studio/issues/6697).

## 3.16.0 (2021-11-24) - Endret ikon for hjelpetekst.
Endret hjelpetekst ikonet fra plus til spørsmålstegn.
Issue [#5722](https://github.com/Altinn/altinn-studio/issues/5722).

## 3.15.1 (2021-11-18) - Ugyldige typer for reselect
Fikset ugyldige typer for reselect.
Pull request [#7502](https://github.com/Altinn/altinn-studio/pull/7502).  

## 3.15.0 (2021-11-15) - Støtte for returnUrl
La til støtte for returnUrl i app-frontend.
Issue [#7183](https://github.com/Altinn/altinn-studio/issues/7183).

## 3.14.2 (2021-11-11) - Oppdatering av jsonpointer
Oppdaterte ekstern avhenghighet jsonpointer.
Issue [#7317](https://github.com/Altinn/altinn-studio/issues/7317).

## 3.14.1 (2021-11-11) -  Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 45.
Issue [#7317](https://github.com/Altinn/altinn-studio/issues/7317).

## 3.14.0 (2021-11-08) - "today"-flagg for datovelger min/max datoer
La til et flag for å dynamisk kunne styre min/max datoer basert på dagens dato.
Issue [#7228](https://github.com/Altinn/altinn-studio/issues/7228).

## 3.13.6 (2021-11-04) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 44.
Issue [#7317](https://github.com/Altinn/altinn-studio/issues/7317).

## 3.13.5 (2021-10-28) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 43.
Issue [#7303](https://github.com/Altinn/altinn-studio/issues/7303).

## 3.13.4 (2021-10-22) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 42.
Issue [#7303](https://github.com/Altinn/altinn-studio/issues/7303).

## 3.13.3 (2021-10-15) - Høyrejustere tekst i inputfelter
La til funksjonalitete for å høyrejustere tekst i inputfelter.
Pull request [#7034](https://github.com/Altinn/altinn-studio/pull/7034).

## 3.13.2 (2021-10-14) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 41.
Issue [#7051](https://github.com/Altinn/altinn-studio/issues/7051).

## 3.13.1 (2021-10-13) - Fiks for tilpasset validering av vedlegg
Fikset validering av vedlegg som krasjet med tilpasset logikk.
Issue [#7107](https://github.com/Altinn/altinn-studio/issues/7107).

## 3.13.0 (2021-10-11) - Start fra aktiv instans
La til funksjonalitet for å starte en applikasjon fra en aktiv instans.
Issue [#6766.](https://github.com/Altinn/altinn-studio/issues/6766)

## 3.12.4 (2021-10-11) - Repeterende gruppe åpen konfigurasjon
La til funksjonalitet til å styre om en repeterende gruppe skal være åpen i editeringsmodus når applikasjonen lastes.
Løser deler av issue [#4870.](https://github.com/Altinn/altinn-studio/issues/4870)

## 3.12.3 (2021-10-07) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for uke 40.
Issue [#7051](https://github.com/Altinn/altinn-studio/issues/7051).

## 3.12.2 (2021-10-04) - Fiks for design av readonly datovelger
Readonly datovelger nå har samme design som andre readonly komponenter.
Issue [#6253.](https://github.com/Altinn/altinn-studio/issues/6253)

## 3.12.1 (2021-09-30) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for u39.
Issue [#6873.](https://github.com/Altinn/altinn-studio/issues/6873).

## 3.12.0 (2021-09-29) - Bildekomponent
La til bildekomponent for enklere å kunne legge til bilder i applikasjonen.
Issue [#379.](https://github.com/Altinn/altinn-studio/issues/379)

## 3.11.9 (2021-09-29) - Støtte for JSON Schema 2020-12 i app frontend
Fikset bug hvor JSON Schema 2020-12 ikke var støttet i app frontend.
Tilhørende issues: [#6703](https://github.com/Altinn/altinn-studio/issues/6703) [#6812.](https://github.com/Altinn/altinn-studio/issues/6812)

## 3.11.8 (2021-09-27) - Lagt til mellomrom mellom valgfri tekst og titteltekst
Lagt til mellomrom mellom valgfri tekst og titteltekst i radioknapp, avkrysningsboks og adresse komponenter.
Issue [#6893](https://github.com/Altinn/altinn-studio/issues/6893).

## 3.11.7 (2021-09-24) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for u38.
Issue [#6873](https://github.com/Altinn/altinn-studio/issues/6873).

## 3.11.6 (20201-09-21) - Fokus indikator for input-felt
Fikset bug hvor fokus indikator ikke var synlig for input-felter.
Issue [#6801.](https://github.com/Altinn/altinn-studio/issues/6801)

## 3.11.5 (2021-09-21) - Content loader visning på mobil
Fikset bug hvor content loader gikk over tildelt bredde for små skjermer.
Issue [#6876.](https://github.com/Altinn/altinn-studio/issues/6876)

## 3.11.4 (2021-09-20) - Fiks for tekst parse feil
Fikset tekst parse feil i confirm steget av en app.
Issue [#6775](https://github.com/Altinn/altinn-studio/issues/6775).

## 3.11.3 (2021-09-17) - Forhåndsvalgt nedtrekksliste
Nedtrekksliste støtter forhåndsvalgt (preselectedOptionIndex) verdi.
Issue [#5255](https://github.com/Altinn/altinn-studio/issues/5255).

## 3.11.2 (2021-09-16) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for u37.
Issue [#6794](https://github.com/Altinn/altinn-studio/issues/6794).

## 3.11.1 (2021-09-09) - Oppdaterte avhengigheter
Oppdaterte eksterne avhengigheter for u36.
Issue [#6794](https://github.com/Altinn/altinn-studio/issues/6794).

## 3.11.0 (2021-09-08) - Aktør valg i stateless app
Stateless appene støtter aktør valg basert på innstillinger i app metadata.
Issue [#6443](https://github.com/Altinn/altinn-studio/issues/6443).

## 3.10.3 (2021-08-23) - Added some IDs used by automated tests
Non functional change. Not connected to an issue.

## 3.10.2 (2021-08-19) - Dependency patching
Patching of external dependencies for w33.
Issue [#6600](https://github.com/Altinn/altinn-studio/issues/6600)

## 3.10.1 (2021-08-16) - App frontend includes partyID for stateless apps
App frontend includes partyID in calls for fetching stateless data.
Issue [#6609](https://github.com/Altinn/altinn-studio/issues/6609)

## 3.10.0 (2021-08-13) - Log out functionality
Added functionality for log out from app frontend.
Issue [#6620](https://github.com/Altinn/altinn-studio/issues/6620)

## 3.9.9 (2021-08-12) - Dependency patching
Patching of external dependencies for w32.
Issue [#6600](https://github.com/Altinn/altinn-studio/issues/6600).

## 3.9.8 (2021-08-05) - Dependency patching
Patching of external dependenecies for w31.
Issue [#6571](https://github.com/Altinn/altinn-studio/issues/6571).

## 3.9.7 (2021-08-03) - Bugfix print view
Fixed a bug where the print view for Altinn Apps would display an empty container.
Issue [#6578](https://github.com/Altinn/altinn-studio/issues/6578).

## 3.9.6 (2021-08-02) - Dependency patching
Patching of external dependenecies for w30.
Issue [#6571](https://github.com/Altinn/altinn-studio/issues/6571).

## 3.9.5 (2021-07-28) - Bugfix for mobile view during app startup
Fixed a bug where the app modal would behave inconsistent during app startup on mobile devices.
Issue [#6558](https://github.com/Altinn/altinn-studio/issues/6558).

## 3.9.4 (2021-07-23) - Bugfix validation trigger for groups.
Fix a bug where validations would not be triggered when closing a repeating group by clicking `Edit` button when trigger was present.
Issue [#6427](https://github.com/Altinn/altinn-studio/issues/6427).

## 3.9.3 (2021-07-23) - Dependency patching
Patching of external dependencies for w29.

## 3.9.2 (2021-07-02) - Dependency patching
Patching of external dependencies for w26.
Issue [#6385](https://github.com/Altinn/altinn-studio/issues/6385).

## 3.9.1 (2021-07-01) - Support for redirect to require higher authentication level for stateless app
Fix for bug that didn't redirect user to login page with allowed authentication levels if logged in with a too low level.
Issue [#6506](https://github.com/Altinn/altinn-studio/issues/6506).

## 3.8.0 (2021-06-29) - Several updates to validation functionality
- Support for adding custom error messages to client side validations (JSON schema).
- Support for specifying single field validation (server) as FIXED to make sure resolved validation error messages are removed.
- Fixes bug where single field validation that returned empty (no errors/warnings) did not remove existing validation messages.
Issue [#5747](https://github.com/Altinn/altinn-studio/issues/5747).

## 3.7.0 (2021-06-29) - Support for posting data from stateless app
Issue [#6194](https://github.com/Altinn/altinn-studio/issues/6194).

## 3.6.14 (2021-06-22) - Bug fix for duplicated validation messages
Fixed a bug that caused validation messages on a FileUpload component to be displayed twice.
Issue [#6400](https://github.com/Altinn/altinn-studio/issues/6400).

## 3.6.13 (2021-06-18) - Bugfix for replaceAll with variables in text
Fix for bug introduced in 3.6.9, where only the last variable in texts with multiple variables was replaced. 
The change in 3.6.9 also caused summary page to fail in some cases.
Issue [#6455](https://github.com/Altinn/altinn-studio/issues/6455).

## 3.6.12 (2021-06-18) - Dependency patching
Patching of external dependencies.
Issue [#6385](https://github.com/Altinn/altinn-studio/issues/6385).

## 3.6.11 (2021-06-16) - Bugfix for disappearing validation messages
Fixed bug for disappearing validation messages. Single field validation response would overwrite all 
existing validations, causing earlier triggered validation messages to disappear.
Issue [#5857](https://github.com/Altinn/altinn-studio/issues/5857).

## 3.6.10 (2021-06-15) - Bugfix for navigation buttons with multiple triggers
Fixed bug for navigation buttons configured with multiple triggers, where only the first one was actually triggered.
Issue [#6387](https://github.com/Altinn/altinn-studio/issues/6387).

## 3.6.9 (2021-06-14) - Bugfix variables in text
Fixed bug where only first occurance of a variable in a given text was replaced.
Issue [#6091](https://github.com/Altinn/altinn-studio/issues/6091)

## 3.6.8 (2021-06-11) - New endpoints for statless app
New endpoints for stateless app.
Issue [#6227](https://github.com/Altinn/altinn-studio/issues/6227)

## 3.6.7 (2021-06-10) - Dependency patching
Patching of external dependencies.
Issue [#6385](https://github.com/Altinn/altinn-studio/issues/6385)

## 3.6.6 (2021-06-09) - Dependency patching
Updated to latest major version of react v17. 
Issue [#5072](https://github.com/Altinn/altinn-studio/issues/5072)

## 3.6.5 (2021-06-02) Bugfix for stateless app 
Fixed bug where stateless app with onEntry.show set to `new-instance` would crash.
Issue [#6321](https://github.com/Altinn/altinn-studio/issues/6321).

## 3.6.4 (2021-06-02) Bugfix for simple receipt
Fixed bug where simple receipt did not parse markdown if the app overrides defult texts.
Issue [#6232](https://github.com/Altinn/altinn-studio/issues/6362).

## 3.6.3 (2021-06-02) Bufix for content loader
Fixed bug where content loader did not scale for whole view.
Issue [#4888](https://github.com/Altinn/altinn-studio/issues/4888).

## 3.6.2 (2021-06-01) Bugfix for summary view of group with multiple pages
Fixed bug that caused app frontend to crash when rendering summary component for group when the group was defined with
multiple pages in edit mode.
Issue [#6233](https://github.com/Altinn/altinn-studio/issues/6233).

## 3.6.1 (2021-05-28) Dependency patching
Patching of external dependencies. Issue [#6324](https://github.com/Altinn/altinn-studio/issues/6324).

## 3.6.0 (2021-05-28) Support for hiding back button in apps
Issue [#6193](https://github.com/altinn/altinn-studio/issues/6193).

## 3.5.0 (2021-05-27) Support for number formatting
Added support for formatting numbers for `Input`-components. 
Issue [#5972](https://github.com/altinn/altinn-studio/issues/5972).

## 3.4.2 (2021-05-26) Improve look of summary for checkboxes component
Issue [#6329](https://github.com/Altinn/altinn-studio/issues/6329).

## 3.4.1 (2021-05-20) Dependency patching
Patching of external dependencies. Issue [#6221](https://github.com/Altinn/altinn-studio/issues/6221).

## 3.4.0 (2021-05-18) Support for stateless apps
Issue [#6124](https://github.com/Altinn/altinn-studio/issues/6124).

## 3.3.5 (2021-05-14) - Dependency patching
Patching of external dependencies. Issue [#6221](https://github.com/Altinn/altinn-studio/issues/6221).

## 3.3.4 (2021-05-11) Bugfix for calculation in groups
Issue [#6235](https://github.com/Altinn/altinn-studio/issues/6235).

## 3.3.3 (2021-05-11) Run data validation on page switch, and fix group component mobile view
Issue [#6236](https://github.com/Altinn/altinn-studio/issues/6236).
Issue [#5977](https://github.com/Altinn/altinn-studio/issues/5977).

## 3.3.2 (2021-05-06) - Dependency patching
Patching of external dependencies. Issue [#6011](https://github.com/Altinn/altinn-studio/issues/6011).

## 3.3.1 (2021-05-06) Support for markdown in validation messages
Issue [#5137](https://github.com/Altinn/altinn-studio/issues/5137).

## 3.3.0 (2021-05-03) Support for multiple views in repeating group edit mode
Issue [#5869](https://github.com/Altinn/altinn-studio/issues/5869).

## 3.2.2 (2021-04-23) - Dependency patching
Patching of external dependencies. Issue [#6011.](https://github.com/Altinn/altinn-studio/issues/6011)

## 3.2.1 (2021-04-23) - Bugfix for group validations
Fixed a bug where groups with validation trigger would call the instance validation api. Now calls data validation. Issue [#6089.](https://github.com/Altinn/altinn-studio/issues/6089)

## 3.2.0 (2021-04-21) - Validation on group save
Added support for running validations on a group when the user tries to save an entry. Issue [#5281.](https://github.com/Altinn/altinn-studio/issues/5281)

## 3.1.6 (2021-04-19) - Bugfix for checkbox values in summary component
Fixed bug where summary would display an empty string for checkboxes with multiple selected values. Issue [#5993.](https://github.com/Altinn/altinn-studio/issues/5993)

## 3.1.5 (2021-04-19) - Bugfix for repeating group state on calculation
Fixed bug where repeating group state would not be updated if a backend calculation had altered a repeating group. Issue [#6006.](https://github.com/Altinn/altinn-studio/issues/6006)

## 3.1.4 (2021-04-19) - Bugfix for validations on group delete
Fixed bug where validations for a given group index would not be removed on delete. Issue [#5960.](https://github.com/Altinn/altinn-studio/issues/5960)

## 3.1.3 (2021-04-16) - Bugfix for validation
Fixed bug where single field validation would validate the whole instance and not data. Issue [#5885.](https://github.com/Altinn/altinn-studio/issues/5885)

## 3.1.2 (2021-04-12) - Dependency patching.
Patching of external dependencies. Issue [#5957.](https://github.com/Altinn/altinn-studio/issues/5957)

## 3.1.1 (2021-04-09) - Bugfix for slow calculate 
Fixed bug where a slow backend calculation can overwrite later entered data. Issue [#5754.](https://github.com/Altinn/altinn-studio/issues/5754)

## 3.1.0 (2021-04-07)- Help text for paragraph and header components
App now supports help text for paragraph and header components. Issue [#5862.](https://github.com/Altinn/altinn-studio/issues/5862)

## 3.0.16 (2021-04-06) - Dependency patching
Patching of external dependencies. Issue [#5877.](https://github.com/Altinn/altinn-studio/issues/5877)

## 3.0.15 (2021-03-22) - Bugix for group component with checkboxes
Fixed bug where group component summary would display an empty value for checkboxes that had several selected values. Issue [#5907.](https://github.com/Altinn/altinn-studio/issues/5907)

## 3.0.14 (2021-03-19) - Dependency patching
Patching of external dependencies. Issue [#5877.](https://github.com/Altinn/altinn-studio/issues/5877) 

## 3.0.13 (2021-03-18) - Internal typings 
App frontend internal typings updated to fix failing tests. No issue connected.

## 3.0.12 (2021-03-17) - Bugfix for markdown support in summary and group titles
Fixed bug where app frontend would not render markdown in summary and group titles. Issue [#5781.](https://github.com/Altinn/altinn-studio/issues/5781)

## 3.0.11 (2021-03-17) - Bugfix for page order calculation
Fixed bug where app frontend would trigger call to calculate page order even when no calculation trigger was present. Issue [#5863.](https://github.com/Altinn/altinn-studio/issues/5863)

## 3.0.10 (2021-03-12) - Bugfix for page order calculation 
Fixed bug where app frontend would trigger call to calculate page order for single page applications. Issue [#5859.](https://github.com/Altinn/altinn-studio/issues/5859) 

## 3.0.9 (2021-03-12) - Dependency patching
Patching of external dependencies. Issue [#5771.](https://github.com/Altinn/altinn-studio/issues/5771) 


## 3.0.8 (2021-03-12) - Support for dynamicly getting page order
App frontend now supports dynamicly fetching the page order on next page ("sporvalg"). See [docs](https://altinn.github.io/docs/altinn-studio/app-creation/sporvalg/) for more information. Issue [#5640.](https://github.com/Altinn/altinn-studio/issues/5640) 

## 3.0.7 (2021-03-09) - Bugfix for page caching
Fixed issue where the app would cache the first page in alphabetical order and not respect the order in Settings.json. Issue [#5819.](https://github.com/Altinn/altinn-studio/issues/5819) 

## 3.0.6 (2021-03-08) - Caching of last viewed page
Introduced caching of the last viewed form page, so user is returned to this page when refreshing or coming back at a later
time. Issue [#5278.](https://github.com/Altinn/altinn-studio/issues/5278) 

## 3.0.5 (2021-03-05) - Dependency patching
Patching of external dependencies. Issue [#5770.](https://github.com/Altinn/altinn-studio/issues/5770) 

## 3.0.4 (2021-03-05) - Bugfix for text styling in titles/descriptions
Fix issue where label and description texts would get cut off mid word. Issue [#5810.](https://github.com/Altinn/altinn-studio/issues/5810)

## 3.0.3 (2021-03-02) - Bugfix for metadata with layoutsets
Fix issue where app-frontend feched wrong metadata when using layoutsets. Issue [#5624.](https://github.com/Altinn/altinn-studio/issues/5624) 

## 3.0.2 (2021-02-26) - Dependency patching
Patching of external dependencies. Issue [#5676.](https://github.com/Altinn/altinn-studio/issues/5676) 

## 3.0.1 (2021-02-25) - Horizontally aligned components & Bugfix for loading options
App-frontend now supports horizontally aligned components. See [docs](https://altinn.github.io/docs/altinn-studio/app-creation/ui-editor/layout-style/#sidestilte-komponenter) for more information. Issue [#1515.](https://github.com/Altinn/altinn-studio/issues/1515) 

Fix issue that only loaded options related to form layout in first data task - for subsequent data tasks
options were not loaded. Issue [#5619.](https://github.com/Altinn/altinn-studio/issues/5619)

## 3.0.0 (2021-02-23) - New font for App Frontend

This version changes the font for the app frontend from Roboto to Altinn-DIN.
For the apps to show fonts as expected, some changes need to be made. See [breaking changes](../breaking-changes)
for the details.

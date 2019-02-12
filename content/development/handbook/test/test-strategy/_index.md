---
title: Test Strategy
description: Test Strategy
tags: ["development", "handbook", "test"]
weight: 100
---

## Hva skal testes?
I tjenester 3.0 er det behov for både testing av Altinn studio, altså tjeneste designeren, samt tjenester
utviklet av en tjenesteutvikler i Altinn studio. Disse to områdene av tjenester 3.0 krever forskjellige,
tilnærminger.

Testing av Altinn studio er hovedsakelig tenkt å testes på enhets, og integrasjons nivå. Enhets nivået
av testing innebærer testing av javascript funksjoner, samt av react/UI komponenter. På integrasjons nivå
testes typisk API'er og mindre services: Effektiv enhets testing og integrasjons testing krever ett godt test rammeverk
som tjenester 3.0 utviklere lett kan ta i bruk, og som kan lett integreres med den nåværende kodebase og nåværende 
bygg verktøy. 

Testing av arbeidsflyter i Altinn Studio samt test av tjenester utviklet ved bruk av Altinn studio er ansvaret til
test utvikler, samt tjeneste utviklere. På regresjon, eller ende-til-ende, nivå er tester man at hele arbeidsflyten i altinn studio, 
eller den ferdig utviklede tjenesten, fungerer slikt som tenkt.  

Ett godt ende-til-ende test verktøy, har samme krav som verktøy og rammeverk som skal taes i bruk til enhet og integrasjons test,
men må også gi muligheten for mindre teknisk instilte tjeneste utviklere å raskt lage UI tester for tjeneste de ferdigstiller uten å
ha kunnskap om det underliggende AltinnCore systemet. 

## Verktøy
Etter diskusjon i tjenester 3.0 teamet, har disse test verktøy/rammeverk blitt bestemt å taes i bruk:  
 - Enhetstesting: Jest / Enzyme / xUnit 
 - Integrasjonstesting: Jest / Sinon  
 - Regresjonstesting: Testcafe  

 De utvalgte verktøyene er valgt da de raskt kan integreres inn i eksisterende kodebase, samt er open source verktøy. Testcafe
 gir også muligheten til å "ta opp" tester (så kalt test recording) hvis man betaler for ett lisens, testcafe rammeverket og UI
 test prosjektet blir ansvaret til testutvikler i teamet. Utviklere skriver test ved bruk av Jest og xUnit (jest for javascript, xUnit for C#)

dokumentasjon til de nevnte verktøyene kan finnes i lenkene under:  
 - [xUnit](https://xunit.github.io/)
 - [Jest](https://jestjs.io/)  
 - [Enzyme](http://airbnb.io/enzyme/)  
 - [Sinon](https://sinonjs.org/)  
 - [Testcafe](https://testcafe.devexpress.com/)  


### Test i første MVP leveranse
Testing i første MVP leveranse bestod hovedsakelig av enhetstester skrevet i xunit, og Jest, samt manuell funksjonell testing av brukerhistorier under utvikling. Enhetstest rammeverkene xunit og jest er integrert i dagens løsning via kontinuerlig integrasjons bygg i azure devops; testbyggene trigges både av pull requests og merging av kode inn i master. Pipelines for enhetstest finnes [her](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=22) for xunit pipelinen, og [her](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=26) for jest pipelinen. Ved slutten av MVP 1 ble også testcafe regressions tester en del av nattlige bygg; Pipelinen for testcafe kan finnes [her](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=25).


### Test i andre MVP leveranse
I andre MVP leveranse har deploy av tjenester i altinn studio SBL blitt definert som en "Hill" eller en hovedleveranse. I denne sammenheng kommer regressjons tester skrevet i testcafe til å fokusere på arbeidsflyten utvikleren "Christian" kommer til å bruke for å kunne få ett deploy av tjenesten sin til ett testmiljø. Målet med testautomatisering, er å redusere tiden det tar å kjøre Altinn Studio sine regresjonstest suite nøyaktig og effektivt, både automatiske og manuelle regresjonstester skal kjøres mot dev.altinn.studio for å kunne kvalitetssikre løfting av koden til produksjon. Enhetstesting og system testing i andre MVP leveranse skal fungere på samme måte som i MVP01; utviklere skriver enhets og integrasjonstester i sine test rammeverk (hovedsakelig jest og xunit), for å teste nytviklet logikk. Snapshot testing, som ble påbegynt i MVP01, utgår i MVP02, da "look and feel", og funksjonell testing blir prioritert av manuelle regresjonstester og testcafe regresjons suiten. 

## Test nivåer
Pyramide figuren under viser en overordnet struktur av de ulike test nivåene, samt de mulige verktøyene og rollen som har ansvaret
for test på hvert testnivå.

{{<figure src="testing_pyramid.jpeg?width=400" title="Testpyramiden" >}}

## Testdata
For å kunne enkelt og effektivt teste på alle nivåer, kan det være bruk for ett verktøy for å lett
kunne hente eller lage testdata. Tjenester 3.0 teamet må bestemme seg for om vi skal lage f.eks en testdata klasse som gir bruker muligheten til å lage brukere/elementer spesifikt til testen de skal kjøre. En annen mulighet er å støtte muligheten for å hente spesifikk ferdigstilt testdata (f.eks testdata sett 164/5) fra en json fil eller lignende. I MVP02 er arbeid påbegynt på en testdata klasse som integreres inn i testcafe sin testkode. 

## Arbeidsmetodikk
Under sprint plannlegging blir produkteier, utviklere, og testutvikler enig om hvilket nivå det er behov å teste de enkelte User Stories. Man lager så en plan for hvordan den ansvarlige rollen skal teste den tenkte funksjonaliteten og sub-tasks på de enkelte User stories kan da lages. Etter en ferdigstilt test er laget, gjennomføres det en kvalitetsikkring med ett annet medlem av tjenester 3.0 teamet før testen kan inkluderes i ett bygg-løp.

**Navngivningskonvensjon for element id'er**  
Testcafe sitt test api har forskjellige måter å instansiere Selector objekter som kan brukes i test. Den desiderte letteste og mest robuste måten å definere en Selector i testcafe er med en css id selector. Tanken bak å bruke css id'er istedenfor relativ lokasjon av elementet i DOM eller inner text er å lage mer robuste tester, som ikke knekker straks det kommer endringer i design. Id'er må være unike; for å påse at en selector er unik er følgende konvensjon foreslått for å oprette id på ett element: Id'en er tekstbasert og skrevet i camelCase, id'en følger logisk plassering i Altinn Studio, f.eks: "pagelocation Submenu Elementtype Descriptiveword". Tekstboks elementet under GUI "Lage" kan for eksempel få følgende id: "designerSkjemakomponenterKnappTekstområde".

## Bygg og deploy av testkode 
Se pipelines lenkene tidligere i dette dokumentet.
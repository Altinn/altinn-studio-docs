---
title: Test av autorisasjonsregler
linktitle: Testing 
description: Testing av autorisasjonsregler er viktig før produksjonssetting for å verifisere at valgte regler fungerer etter intensjon og gir en sikker og brukervennlig opplevelse
---
{{%notice warning%}}
Feil i autoriasjonsregler eller valg av ikke passende rolle for et eller flere arbeidstrinn kan i verste fall føre til at urettmessige 
brukere får tilgang til data de ikke skal ha. 
Dette kan få alvorlige konsekvenser for aktør og vil være å betrakte som en sikkerhetsbrudd. 
{{% /notice%}}

## Hva må testes?

Ved testing er det viktig å gjennomføre både positive og negative tester, dvs at man verifiserer at ønskede brukere får tilgang og at andre IKKE får tilgang. 

Nedenfor har vi laget en liste over testsituasjoner som applikasjonsutvikler bør lage testscenario på og verifisere. 
Vi anbefaler at man automatiserer disse testene på samme måte som annen app-testing. 

- Verifisèr at at ønskede eksterne roller får utført de ulike trinnene i prosessen og får tilgang til nødvendig data for å utføre dette
- Verifisèr at andre eksterne roller IKKE får utført de ulike trinnene i prosessen og får tilgang til nødvendig data for å utføre dette
- Verifisèr at brukere som får delegert altinn-roller knyttet til applikasjonen får utført de ulike trinnene i prosessen og får tilgang til nødvendig data for å utføre dette
- Verifisèr at applikasjonen finnes i listen av delegerbare tjenester og at det er mulig å bare delegere tilgang til applikasjonen uten rolledelegering, se [her](https://www.altinn.no/hjelp/profil/roller-og-rettigheter/gi-roller-eller-rettighet-via-sokefunksjon/)
- Verifisèr at bruker med for lavt sikkerhetsnivå ikke får tilgang uten å heve sikkerhetsnivå på innlogging
  

## Dokumentasjon av manuell testing
For å sikre tilstrekkelig kvalitet på test av autorisasjonsregler er det nødvendig med en systematisk tilnærming og dokumenterer testing ved å ha detaljerte test-skript. 
Ved evt feil under testing eller senere er det viktig at man har god kontroll på hvilke brukere og akøtører som ble brukt og hvilke trinn i arbeidsprosessen som ble verifisert. 


## Testdata
Det er mulig å benytte [testdata fra Tenor](https://www.skatteetaten.no/skjema/testdata/) i Altinn for å finne brukere med riktige roller for riktige aktører. 

Noen ganger kan det være utfordrende å finne til testdata som dekker ønskede testscenario avhengig av hvilke type aktører som benyttes (f eks bestemte organisasjonsformer) eller at man har tatt i bruk "uvanlige" eksterne roller. 
Ta kontakt med Altinn hvis du ikke finner passende testdata så kan vi lese inn testbrukere og -aktører tilpasset ditt behov. 
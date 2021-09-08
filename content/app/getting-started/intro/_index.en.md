---
title: Introduction to Altinn Studio
linktitle: Introduction
description: Altinn Studio is our new tool for developing public digital services. This can be anything from very simple forms to advanced applications.
weight: 10
tags: [translate-to-english]
---

Prosessen for å lage skjemaer og meldinger vil være forskjellig alt etter som hvor stor eller liten målgruppen er,
hvor mye data som skal behandles eller hvor mye jobb det er å legge til rette for at egne systemer kan snakke med Altinn.

Slik går du frem: 

1. **Start alltid med å definere brukerbehov**  
   Tenk nøye gjennom hele prosessen fra et brukerperspektiv. Hva er utfordringen og hvem skal den løses for?
   Hva er databehovet? Lag gjerne en skisse til kommunikasjon med brukeren og test skissen på folk i målgruppen.
   [Lese også vår guide til prototyping i Figma](../../design/figma/). God planlegging er nøkkelen til et godt resultat.
   Sjekk Guide: [Hvordan jobbe brukerorientert?](https://www.altinndigital.no/kom-i-gang/hvordan-jobbe-brukerorientert/) for inspirasjon.
2. **Få tilgang til systemer**  
   Hvis du ikke har utviklet tjenester i Altinn Studio før trenger du å [opprette en bruker](../first-time-setup/).
   Har du ikke allerede en ferdig datamodell/XSD så trenger du i tillegg tilgang til [SERES-domeneklient](https://altinn.github.io/docs/seres/).
3. **Tilrettelegge egne systemer for sending og mottak av data**  
   Det finnes [standardiserte mønstre basert på REST-API](/api)
   for å sende og motta data fra/til dine interne systemer.
   Autentisering skjer med [Maskinporten](https://www.digdir.no/digitale-felleslosninger/maskinporten/869) og du laster ned data ved pull fra database,
   og laster opp data direkte mot API i den enkelte applikasjon.
   Vår referanseapplikasjon [Altinn CLI](https://github.com/Altinn/altinn-cli) ​viser disse mønstrene og kan brukes for å komme i gang.
4. **Utvikle tjenestene**  
   Altinn Studio brukes til å [opprette applikasjoner](../create-app) (apps).
   En app kan være alt fra enkle skjemaer til større avanserte applikasjoner som digitaliserer komplekse prosesser.
   Det er viktig å tenke på at brukeren skal oppleve prosessene som sammenhengende og oversiktlige.
   Prosessene kan startes av det offentlige eller av brukeren selv, eller automatisk som en reaksjon på en hendelse.
5. **Teste tjenestene**  
   Altinn har et eget testmiljø hvor du kan teste om apper og opp-/nedlasting av data virker som det skal.
   I testmiljøet bruker du fiktive testpersoner og organisasjoner.
   Når du har kommet så langt i utviklingen er det også viktig å brukerteste den endelige løsningen på reelle folk i målgruppen.
   Dette for å sikre at det ikke er noen hinder for de som skal bruke tjenestene. Det er også mulig å [teste app lokalt](../../testing/local/) på egen maskin. 
6. **Produksjonssette tjenestene**  
   Tjenesteeier kan [selv produksjonssette](../../deployment) sine applikasjoner og gjøre vedlikehold av kode og avhengigheter.
7. **Melding av feil**  
   Feil meldes til Altinn fra den enkelte tjenesteeier sitt dashboard på [Altinn Digitalisering](https://www.altinndigital.no/oversikt/) (krever innlogging).

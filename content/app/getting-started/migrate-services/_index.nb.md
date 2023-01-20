---
title: Migrere tjenester
description: Fra Altinn 2 til Altinn 3.
toc: true
weight: 170
---

## Migrere en eksisterende tjeneste til Altinn 3
Gjør deg kjent med Tjenesteeier-funksjonalitet i Altinn 3.

1. **Opprett [bruker](../first-time-setup/) og [app](../create-app/) i [Altinn Studio](https://altinn.studio/).**  
   Når bruker er opprettet kan du be om å [bli en del av en organisasjon](../first-time-setup/#bli-del-av-en-organisasjon).
   Dette for å kunne samarbeide med andre i organisasjonen og ha tilgang til å kjøre deploy av apper.
2. **Utvikle [app/tjeneste](../../development).**  
   Her finner du veiledninger som er nyttige når man utvikler en app i Altinn Studio. Se også punkt 9.
3. **Laste opp [datamodell](../../development/data/data-model).**  
   Det er mulig å [gjenbruke datamodeller](https://altinn.github.io/docs/ny-funksjonalitet/prosjekter/tjenester30/faq/) som er basert på InfoPath uten for store endringer.
   Slik [importerer du datamodellen](../../development/data/data-model) i Altinn Studio.
4. **Kombiner [UI editor](../navigation/designer/ui-editor/) og [kodeverktøy](../navigation/code/).**  
   Altinn Studio UI editor gjør det enkelt å legge til og flytte skjema komponenter. Kodeverktøy er enklere å bruke når man skal redigere koden. 
5. **Test [lokalt](../../testing/local/).**  
   Lokalt test miljø er en effektiv måte å teste apper uten å måtte kjøre en delploy. 
6. **Test app i [testmiljø](../../testing/deploy/).**  
   Under fanen Deploy i Altinn Studio kan du bygge og deploye app. Når Appen er klart kan du logge inn i test miljøet med en testbruker for å kjøre tjenesten.
7. **Sette opp App i  [produksjonsmiljø](../../deployment/) og [bestille om skjema-side](../../deployment#bestille-om-skjema-side).**  
   Før man setter app i produksjon må man ha tilgang til et produksjonsmiljø.
   Nyttig informasjon på om skjema-side gjør bruker av tjenesten selvhjulpen og Altinn brukerservice i stand til å hjelpe brukere.
8. **Tilrettelegge system for mottak av data.**  
   Det finnes [standardiserte mønstre basert på REST-API](/nb/api) for å sende og motta data fra/til dine interne systemer.
   Autentisering skjer med [Maskinporten](https://www.digdir.no/digitale-felleslosninger/maskinporten/869) og du laster ned data ved pull fra database,
   og laster opp data direkte mot API i den enkelte applikasjon. Vår referanseapplikasjon [Altinn CLI](https://github.com/Altinn/altinn-cli)​
   viser disse mønstrene og kan brukes for å komme i gang.
9. **Konvertere fra tjenster med [Altinn2-converter](https://github.com/Altinn/altinn2-convert)**.  
   Altinn2-converter er et komandolinje basert verktøy for å konvertere Altinn 2 tjenester til Altinn 3 apps.
   Dette verktøyet har status som Proof of concept (POC) og kan derfor mangle en del funksjonalitet. 

## Lag en skisse av skjema
For å migrere en utvalgt tjeneste kan det være nyttig å lage seg en skisse av tjenesten slik at man gjør seg kjent med designelementer i Altinn 3,
og slik at man har en referanse å se til når man utvikler løsningen. Slik gjør du dette.

{{%expandlarge id="Figma" header="Lage en skisse av skjema i Figma." %}}
- Gå inn på nettsiden [https://www.figma.com/](https://www.figma.com/) og lag deg en bruker.
- Figma kan installeres lokalt eller brukes i din nettleser.
- Altinn har et åpent design kit for eksterne og det finner du [her](https://www.figma.com/proto/wnBveAG2ikUspFsQwM3GNE/ADS---Prototyping-for-eksterne?node-id=47%3A4068&amp;viewport=326%2C2144%2C0.653957724571228&amp;scaling=min-zoom).
- Gå inn på [denne](/app/design/prototype/) siden for å få mer informasjon om hvordan du kan komme i gang med Figma.
{{% /expandlarge %}}
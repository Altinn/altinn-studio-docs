---
title: Lag datamodell
description: Slik lager du en datamodell for tjenesten din
weight: 2
---

En datamodell beskriver hvordan dataene du ønsker å hente inn i et skjema skal se ut. 
Ved å navngi felter med beskrivende navn er det enkelt å hente ut dataene i egne systemer 
senere. 
Ved å legge på kontroller og regler på felter gjør du det enklere for brukerne av skjema å
fylle ut rett informasjon, og dermed sikrer du også kvaliteten på dataene du henter inn.

Det fins mange formater på datamodeller, og de kan være alt fra en helt enkel liste med felter
til store avanserte strukturer. Felles for alle datamodeller er at de beskriver et sett med
felter. 

> _Man kan se på en datamodell som en innholdsfortegnelse for skjemaet._

Datamodellen kan være et lurt sted å starte når man skal lage en tjeneste, da man bør ha en plan for hva man ønsker 
å spørre brukeren om før man setter i gang og lager skjema. 
Har du f.eks. en skisse eller et eksisterende skjema å gå ut fra er det enkelt å lage en datamodell med det som 
utgangspunkt.

### Datamodell-verktøyet i Studio
Verktøyet for datamodellering finner du ved å navigere til din tjeneste. Når du er inne på arbeidsflaten til tjenesten
kan du navigere til _Datamodellering_ i topp-menyen, eller fra navigeringsknappene på oversikts-siden for tjenesten.

### Lage datamodell i Studio

Du oppretter en ny datamodell ved å trykke på "Lag ny". Skriv inn ønsket navn på modellen og trykk på "Opprett modell".

Det opprettes da en datamodell med 3 tekst-felter som utgangspunkt. 

Klikk på et felt for å få opp redigerings-panel til høyre, der du kan redigere navn, felttype, begrensninger, mm.
Les [denne artikkelen](../../../development/data/data-modeling) for mer informasjon om datamodellering.

![Datamodell](https://altinncdn.no/studio/docs/images/schema-editor_example.png)

Du kan også laste opp eksisterende datamodell (i XSD-format) - denne blir da lastet inn og du kan jobbe
videre med den i verktøyet.
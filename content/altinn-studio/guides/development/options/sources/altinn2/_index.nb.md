---
title: Gjenbruk av svaralternativer fra Altinn 2
linktitle: Fra Altinn 2
description: Svaralternativer hentet fra Altinn 2
toc: false
weight: 300
aliases:
  - /nb/altinn-studio/guides/development/options/altinn2-codelists
---
{{<notice warning >}}
**Utgående funksjonalitet**  
Altinn 2 tilbød en felles samling av kodelister som kunne brukes i skjemaer. Inntil mai 2023 fantes det egentlig ingen alternativ for vanlig brukte kodelister på tvers av Altinn 3-applikasjoner. Ved å eksponere Altinn 2 kodeliste-API-en i Altinn 3-applikasjoner, får du tilgang til den samme samlingen av kodelister.  
<br/>

Dette er imidlertid ikke en langsiktig løsning, og med utgivelsen av [Altinn felles kodelister](https://github.com/Altinn/codelists-lib-dotnet)-pakken, har du nå tilgang til mange av de samme kodelistene som i Altinn 2.  
<br/>

Du kan fortsatt oppleve at det mangler en eller to kodelister i Altinn 3 sammenlignet med Altinn 2. I så fall kan du vurdere følgende:
1. Kan du opprette en "pull request" i [Altinn felles kodelister-repositoriet](https://github.com/Altinn/codelists-lib-dotnet) og bidra til felleskapet slik at andre kan gjenbruke implementasjonen din?
2. Hvis du ikke har kunnskapen eller tiden til å opprette en "pull request", gi oss beskjed ved å opprette en [ny sak](https://github.com/Altinn/codelists-lib-dotnet/issues/new/choose) og beskriv hvilken kodeliste du trenger, så vil vi enten opprette den eller hjelpe deg med å gjøre det.
3. Hvis du bestemmer deg for å bruke Altinn 2-versjonen, vær oppmerksom på at dette API-et ikke vil være tilgjengelig etter juni 2025.
{{</notice>}}

## Konfigurer en Altinn 2 kodeliste
For en oversikt over tilgjengelige kodelister i Altinn 2, kan du bruke [apiet](https://altinn.github.io/docs/api/rest/metadata/#hente-oversikt-over-kodelister)
Du registrerer listene du ønsker å bruke i applikasjonens `Program.cs`, og du kan oppdatere kodelisten gjennom TUL.

```C#
using Altinn.App.Core.Features.Options;
...
services.AddAltinn2CodeList(
    id: "ASF_Land",
    transform: (code) => new (){ Value = code.Code, Label = code.Value1 }, 
    // filter: (code) => int.Parse(code.Value3) > 100,
    codeListVersion: 3994, // Optional (use latest version if missing)
    metadataApiId: "ASF_Land" // Code list name in Altinn 2 (use id if missing)
);
```
Det eneste som er påkrevd er `id` for hva kodelisten heter i Altinn 2, og `transform` for å fortelle hvilke kolonner du
ønsker å bruke som `Value` og `Label`. Oversetting fungerer automatisk. Etter versjon `v7.2.0` vil `nb` bli brukt om
listen mangler språket brukeren har valgt. Om du ønsker to ulike transformasjoner av samme liste, blir `id` navnet
som brukes i Altinn 3 og `metadataApiId` brukes i oppslaget mot Altinn 2

Bruken er som alle andre kodelister der `id` kommer igjen som `optionsId` i komponenten.

```json
{
  "id": "landvelger",
  "type": "Dropdown",
  ...
  "optionsId": "ASF_Land"
},
```

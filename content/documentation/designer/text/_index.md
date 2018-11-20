---
title: Text and translations
linktitle: Texts and translations
description: Solution for designing service UI, defining workflow, other settings, deploy ++
tags: ["tjenester 3.0"]
weight: 100
---

### Tekstredigering og oversettelse

Enkel of effektiv behandling av tekster og oversettinger er utrolig viktig i en tjenesteuviklingsløsning, og ikke minst enkel gjenbruk
av tekster på tvers av flere tjenester.

Editoren for tekster skrives som en ini-fil som deretter konverteres til en enkel JSON-fil. På den måten kan det effektivt jobbes direkte på i kodeeditorer
eller konverteres til formater som eksterne oversettelsesverktøy benytter. Dette gjør også at 3.0 kan støtte vilkårlige språk,
selv språk som ikke er støtte av Altinn-portalen.

- Definering av tekster med hierarkiske og lesbare nøkler
- Gjenbruk av tekster, internt på tvers av sider og i valideringer, og fra nivåene over tjenesten
- Oversetting
- Kunne legge til vilkårlige språk

**Hvordan legge til nytt språk:**

- Lag en ny ini-fil og plasser den i AltinnCore > Common > Languages > ini
- Endre parametret "languageCode" i API-kall til hva enn du har kalt den nye språkfilen <br/>
    Eksempel for språkfilen norsk bokmål: <br/>
    http://altinn3.no/designer/y/types/Language/getLanguageAsJSON?languageCode=nb

**Føringer for språkfiler:**

- Nøkler sorteres etter hvilken app det tilhører hvor universelle nøkler ([general]) ligger øverst
- Nøkler sorteres etter alfabetisk rekkefølge
- Nøkler er skrevet med små bokstaver og understreker (example_key)

{{<figure src="oversetting.png?width=1000" title="Editor for oversetting av tekster">}}

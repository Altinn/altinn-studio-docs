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

Editoren for tekster skal lagre hvert språk som enkel JSON-fil som effektivt kan jobbes direkte på i kodeeditorer
eller konverteres til formater som eksterne oversettelsesverktøy benytter. Dette gjør også at 3.0 kan støtte vilkårlige språk,
selv språk som ikke er støtte av Altinn-portalen.

- Definering av tekster med hierarkiske og lesbare nøkler
- Gjenbruk av tekster, internt på tvers av sider og i valideringer, og fra nivåene over tjenesten
- Oversetting
- Kunne legge til vilkårlige språk

{{<figure src="oversetting.png?width=1000" title="Editor for oversetting av tekster">}}

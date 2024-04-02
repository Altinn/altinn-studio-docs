---
title: App API
linktitle: App
description: Standard-API-er eksponert av apper i Altinn 3
toc: false
tags: [api]
---

## Oversikt

De API-funksjonene som er dokumentert her er standardfunksjoner i en app basert på app-malen i Altinn Studio. Applikasjonseiere kan fritt gjøre endringer, men det er relativt trygt å anta at fjerning av funksjoner vil være ekstremt sjeldent. Enhver app med tillegg eller endringer skal ha sin egen dokumentasjon publisert av applikasjonseieren.

Alle app-API-adresser starter med samme navn og filsti, men de varierer fra én app til en annen basert på appeier og appnavn.

**Testmiljø (TT02)**
```http
https://{org}.apps.tt02.altinn.no/{org}/{appname}
```

**Produksjon**
```http
https://{org}.apps.altinn.no/{org}/{appname}
```

URL-en identifiserer domenet til applikasjonseier ved hjelp av applikasjonseier sitt kortnavn (**org**), og identifiserer spesifikk app ved hjelp av både kortnavnet til applikasjonseier og navnet på appen (**org/appname**).

{{<children />}}

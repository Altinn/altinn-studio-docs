---
title: Oppsett av Maskinporten-klient
linktitle: Maskinporten
description: Her finner du informasjon om hvordan du setter opp Maskinporten-klient
---

## Sette opp en Maskinporten-klient
{{% insert "content/shared/maskinporten/maskinporten-client-create.nb.md" %}}

## Påkrevde scopes
Maskinporten-klienten din trenger følgende scopes lagt til:
- `altinn:serviceowner`
- `altinn:serviceowner/instances.read`
- `altinn:serviceowner/instances.write`

## Bruke Maskinporten-klienten i Altinn CLI
For å kunne ta i bruk Maskinporten-klienten i Altinn CLI, må du legge til JWK nøkkelparet fra _steg 6_ i konfigurasjonen:

Naviger til [Maskinporten-konfigurasjonen i appsettings.json](../#maskinporten-settings) og legg til en 
base64-formattert versjon av nøkkelen i `EncodedJwk` feltet.

Hvis du brukte [Altinn JWKS-verktøyet](https://github.com/Altinn/altinn-authorization-utils/tree/main/src/Altinn.Cli) til opprettelse
av nøkkelen din, kan du eksportere en base64 versjon ved hjelp av `export` kommandoen sammen med `--base64` flagget. Ellers kan du
benytte et hvilken som helst base64-encoder verkøy, for eksempel https://www.base64encode.org/.
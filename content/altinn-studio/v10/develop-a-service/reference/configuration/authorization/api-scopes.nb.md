---
title: API Scopes-konfigurasjon
linktitle: API Scopes
description: Konfigurer tilpassede API-scopes for tjenesten din.
weight: 200
toc: true
tags: [needsReview]
---

Tilpassede API-scopes lar deg definere API-nivå klienttilgang til tjenestens instansrelaterte API-er.

{{% notice info %}}
Tilgjengelig fra [v8.9.0-preview.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.9.0-preview.0)
{{% /notice %}}

{{%notice warning%}}
Scope-konfigurasjon håndheves ikke ennå i Storage-API-er. Dette kommer i en fremtidig utgivelse, og dokumentasjonen oppdateres da. Vi varsler på Slack når dette er tilgjengelig.
{{% /notice%}}

## Oversikt

Mens XACML muliggjør granulær tilgangskontroll til de faktiske underliggende ressursene (instanser), implementerer API scope-autorisasjonen enkel autorisasjon av klienter for instansrelaterte API-er i appen din. Den inntreffer _før_ XACML-autorisasjonen.

Det finnes innebygde scopes for brukere og tjenesteeiere:

- `altinn:instances.read` og `altinn:instances.write` for brukere (og systembrukere)
- `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write` for tjenesteeiere

Disse er "globale", i den forstand at de gir en klient tilgang til app-API-ene for _alle Altinn-apper_. Vi støtter konfigurasjon for å gjøre det mulig for apper å ha app-spesifikke scopes, slik at en gitt klient kan hente tilgangstokens som har scopes som er spesifikke for én eller flere apper.

## Konfigurasjon

App-spesifikke API-scopes konfigureres i [`applicationmetadata.json`-filen](https://github.com/Altinn/altinn-studio/blob/main/src/App/template/src/App/config/applicationmetadata.json) som ligger i `App/config/` i applageret.

### Eksempel

Her er et eksempel på konfigurasjon som bruker en lignende scope-struktur, men med et tilpasset ID-porten scope-prefiks og bruker `[app]`-plassholderstøtten (den erstattes med app-navnet under kjøring).

{{% insert "content/altinn-studio/v8/reference/configuration/authorization/shared/api-scopes-example.md" %}}

`errorMessageTextResourceKey` spesifisert ovenfor er standardverdiene. De kan overstyres på begge nivåer, og de indre nøklene har prioritet hvis de er satt (de er valgfrie). Verdien som løses gjennom tekstressursene, settes i `details`-egenskapen i `ProblemDetails` 403-responsen når scope-autorisasjon mislykkes.

### Konfigurasjonsegenskaper

| Egenskap | Beskrivelse |
|----------|-------------|
| `users` | Definerer API-scopes for vanlige brukere |
| `serviceOwners` | Definerer API-scopes for tjenesteeier-klienter |
| `read` | Scope påkrevd for leseoperasjoner |
| `write` | Scope påkrevd for skriveoperasjoner |
| `errorMessageTextResourceKey` | Tilpasset feilmeldingsnøkkel (valgfritt) |

## API-respons

Når scope-autorisasjon feiler, returnerer appen en 403-respons med `ProblemDetails`-format:

```json
{
    "title": "Forbidden",
    "status": 403,
    "detail": "Insufficient scope",
    "instance": "<request-path>"
}
```

`detail`-egenskapen til responsen overstyres gjennom `errorMessageTextResourceKey`-konfigurasjonen.

### Feilsøking

Appen beregner og bufrer nødvendige scopes per API-endepunkt under oppstart av tjenesten. Hvis du vil se resultatene av dette, kan du aktivere `Debug`-logger i `appsettings` JSON-filen og kjøre tjenesten på nytt. Da logger den en liste over endepunkter og nødvendige scopes per bruker/tjenesteeier. Disse loggene kommer fra `ScopeAuthorizationService` i bibliotekskoden.

## Relatert dokumentasjon

- [Autorisasjonsretningslinjer](../) - Lær om XACML-basert autorisasjon
- [Autentisering](../../../api/auth/) - Forstå autentiseringsmekanismer
- [Tekstressurser](../../../ux/texts/) - Konfigurer tilpassede tekstmeldinger

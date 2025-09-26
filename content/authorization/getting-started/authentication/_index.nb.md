---
title: Autentisering
linktitle: Autentisering
description: Autentiseringskomponenten tilbyr funksjonalitet for å autentisere brukere og systemer som får tilgang til Altinn Apps og Altinn-plattformen.
tags: [platform, authentication]
toc: true
---

Autentiseringskomponenten er ikke en ID-leverandør og oppretter kun autentiseringssesjoner basert på eksterne
ID-leverandører som

- [ID-porten](https://eid.difi.no/nb/id-porten)
- [Maskinporten](https://samarbeid.digdir.no/maskinporten/maskinporten/25)
- [Feide](https://www.feide.no/).

Autentiseringskomponenten oppretter JWT-tokene med påstander om brukeren og systemet.

Påstandene er basert på autentiseringsinformasjonen som kommer fra ID-leverandørene.

Repository for Altinn-autentisering finner du [her](https://github.com/Altinn/altinn-authentication).

Backlog med åpne saker finner du [her](https://github.com/Altinn/altinn-authentication/issues).

## Tokenutveksling for Altinn-portalen

Når en bruker logger inn i Altinn-portalen (gammel løsning), utstedes en informasjonskapsel (cookie) som inneholder informasjon om den autentiserte brukeren. Denne informasjonskapselen bruker [et proprietært format for ASP.NET](https://support.microsoft.com/en-us/help/301240/how-to-implement-forms-based-authentication-in-your-asp-net-applicatio) (Full rammeverk)
og kan kun tolkes av applikasjoner bygget på .NET Framework som har tilgang til den symmetriske krypteringsnøkkelen.

Altinn-plattformen er basert på ASP.NET Core og kan ikke tolke informasjonskapselen.

For å gi en bruker tilgang til en app i Altinn Apps eller en komponent i Altinn-plattformen, vil den nåværende plattformen eksponere et API som kan dekryptere en ASP.NET-informasjonskapsel og returnere brukerinfo til autentiseringskomponenten i Altinn-plattformen.

## Tokenutveksling for Maskinporten

Organisasjoner autentisert i Maskinporten kan bytte sitt JWT mot et gyldig Altinn-plattform JWT, som deretter kan brukes til å få tilgang til Altinn Apps og Altinn-plattformen.

## Tokenutveksling for ID-porten

Sluttbrukere autentisert gjennom ID-porten kan bytte sitt JWT mot et gyldig Altinn-plattform JWT, som deretter kan brukes til å få tilgang til Altinn Apps og Altinn-plattformen.

Løsningen er tilgjengelig på https://platform.altinn.cloud/authentication/api/v1.

## Autentiser bruker

Autentiseringsressursen muliggjør autentisering av brukeren og videresender brukeren til en annen Altinn-URL. Hvis brukeren ikke allerede er autentisert, vil de bli sendt til innloggingssiden før de blir videresendt til sin endelige destinasjon på {url}.

```http
GET /authentication?goto={url}
```

## Oppdater et gyldig JWT

```http
GET /refresh
```

## Bytt et JWT fra en ekstern tokenleverandør

Godkjente leverandører inkluderer: `Maskinporten` og `id-porten`.
Forespørselen må inkludere et bearer-token i autorisasjonsheaderen.

Sett parameteren test til true hvis du henter et token for Testdepartementet.
(Bemerk: Dette fungerer kun med Maskinporten som tokenleverandør.)

{{%notice info%}}
Et token fra ID-porten inneholder både et ID-token og et access-token. Kun access-token skal byttes ved hjelp av dette endepunktet.
{{% /notice%}}

```http
GET /exchange/{tokenProvider}?test={bool}
```

## Arkitektur

Se [applikasjonsutvikling komponenter]({{< relref "/authorization/reference/architecture/" >}})
For detaljer om hvordan denne komponenten er konstruert.

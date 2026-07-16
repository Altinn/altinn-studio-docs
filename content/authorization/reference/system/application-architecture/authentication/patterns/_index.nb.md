---
title: Arkitekturmønstre i Authentication
linktitle: Arkitekturmønstre
description: Mønstre for OIDC, tokenflyter og System User i Altinn Authentication.
weight: 1
toc: true
---

Authentication kombinerer protokollendepunkter for identitet med arbeidsflyter for System User. Sikkerhetskritisk tilstand lagres bak egne repositorygrenser.

## OIDC som protokolltilstandsmaskin

Innlogging, autorisasjonskode, token, sesjon og utlogging behandles som separate steg med lagret, kortlivet tilstand.

**Fordeler:** standardiserte steg, begrenset levetid for hemmeligheter og tydelige valideringspunkter. **Ulemper:** mange avhengige steg gir krevende feilsøking, og feil i omdirigering eller tilstand kan bli sikkerhetshull.

- [`OidcTokenController` eksponerer tokensteget](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Authentication/Controllers/OidcTokenController.cs).
- [`OidcServerService` orkestrerer OIDC-flyten](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Authentication/Services/OidcServerService.cs).
- [`AuthorizationCodeRepository` lagrer kortlivet kodetilstand](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Persistance/RepositoryImplementations/OidcServer/AuthorizationCodeRepository.cs).

## Tokenutstedelse bak en tjenestegrense

Controllere overlater oppretting og signering av token til egne tjenester og sertifikatleverandører.

**Fordeler:** kryptografi og nøkkelhåndtering samles og kan byttes. **Ulemper:** feil levetid, målgruppe eller nøkkelvalg påvirker alle konsumenter.

- [`TokenService` bygger tokenene](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Authentication/Services/TokenService.cs).
- [`JwtSigningCertificateProvider` skaffer signeringssertifikatet](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Authentication/Services/JwtSigningCertificateProvider.cs).

## Arbeidsflyter med forespørsel og godkjenning

System User skiller registrerte systemer, forespørsler, endringsforespørsler og den ferdige systembrukeren. Hver overgang går gjennom en applikasjonstjeneste og lagres.

**Fordeler:** godkjenning kan revideres og domenestatus blir eksplisitt. **Ulemper:** flere statuser og endepunkter krever beskyttelse mot ugyldige og gjentatte overganger.

- [`RequestSystemUserService` håndterer opprettingsforespørsler](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Authentication/Services/RequestSystemUserService.cs).
- [`ChangeRequestSystemUserService` håndterer endringer](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Authentication/Services/ChangeRequestSystemUserService.cs).
- [`SystemUserRepository` lagrer systembrukeren](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Persistance/RepositoryImplementations/SystemUserRepository.cs).

## Porter rundt persistens og eksterne identitetskilder

Kjernen definerer repository- og tjenestegrensesnitt, mens verten setter sammen konkrete lagrings- og integrasjonsklasser.

**Fordeler:** protokoll- og domenelogikk kan prøves isolert. **Ulemper:** mange abstraksjoner kan skjule transaksjonsgrenser og gjøre kallkjeden lang.

- [`IRefreshTokenRepository` definerer en lagringsport](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Core/RepositoryInterfaces/IRefreshTokenRepository.cs).
- [`IOidcProvider` avgrenser den eksterne identitetskilden](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Authentication/Services/Interfaces/IOidcProvider.cs).

Når mønstrene endres, må teamet bevare protokollkrav, engangsbruk, utløpstid, revisjonsspor og sikre feilutfall.
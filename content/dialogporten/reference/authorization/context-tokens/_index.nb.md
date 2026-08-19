---
title: 'Konteksttoken'
description: 'Referanseinformasjon om konteksttoken'
slug: 'konteksttoken'
weight: 25
---

{{<notice warning>}}
Konteksttoken er en eksperimentell funksjon og kan endres eller fjernes uten en større versjonsoppdatering. Se [sak #3978](https://github.com/Altinn/dialogporten/issues/3978) for detaljer.
{{</notice>}}

## Introduksjon

Se [komme i gang med autorisasjonskontekster]({{< relref "/dialogporten/getting-started/authorization/authorization-contexts" >}}) og [teknisk referanse for autorisasjonskontekster]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) for skrivekontrakten som fører til at et konteksttoken utstedes.

Et konteksttoken bekrefter én PDP-verifisert rettighet på én entitet i én dialog, for parten eller partene Altinn Authorization faktisk tillot for akkurat den sjekken.

Dialogporten utsteder to typer token, begge signert med de samme nøklene og skilt fra hverandre med JOSE-headeren `typ`: [dialogtokenet]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}}), som har verdien `"JWT"`, og konteksttokenet som beskrives på denne siden, som har verdien `"dialogcontexttoken+jwt"`. Mottakende tjenester må validere `typ`-headeren og avvise et token med en type de ikke forventer; en tjeneste som forventer et dialogtoken, må spesielt avvise `"dialogcontexttoken+jwt"`, og en tjeneste som forventer et konteksttoken, må avvise `"JWT"`.

## Bruk for sluttbrukersystemer (OAuth-klienter)

Et `contextToken` er med på de seks sluttbrukerentitetstypene som kan ha en autorisasjonskontekst: API-handlinger, GUI-handlinger, forsendelser, vedlegg på dialogen, vedlegg på forsendelser og navigasjonshandlinger på forsendelser. Det er til stede både i single dialog-svaret og i endepunktene for enkeltstående forsendelser (GET etter ID og søk).

`contextToken` er til stede hvis, og bare hvis, entiteten har en autorisasjonskontekst *og* den nåværende brukeren er autorisert for den. Ellers er den `null` - blant annet alltid når `isAuthorized` er `false`, og på alle entiteter uten autorisasjonskontekst.

En entitet der konteksten setter `unauthorizedPresentation` til `Excluded`, når deg aldri som en uautorisert entitet i det hele tatt: den fjernes fra listen sin, og bare ID-en og opprettelsestidspunktet vises i `excluded*`-listen ved siden av. Der finnes det ikke noe `contextToken` å lese, og det trengs heller ikke - se [hva en uautorisert sluttbruker ser]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}#hva-en-uautorisert-sluttbruker-ser).

Behandle konteksttokenet som en ugjennomsiktig streng, på samme måte som dialogtokenet.

Et konteksttoken skal brukes i stedet for dialogtokenet mot URL-ene til den entiteten. For en forsendelse gjelder dette også [front channel embed]({{< relref "/dialogporten/reference/front-end/front-channel-embeds" >}}).

### Konteksttokenets levetid

Levetiden (`exp`-claimet) til et konteksttoken er **10 minutter**, samme som for dialogtokenet - kort levetid for å begrense misbruk etter at rettigheter er trukket tilbake. Hent dialogen eller forsendelsen på nytt for å få et ferskt sett med token.

### Bruke .NET-SDK-et

To ting du bør være klar over når du bruker konteksttoken fra .NET-SDK-et:

1. **Å referere til `AuthorizationContext`, `ContextToken` eller `DialogTokenTypes.DialogContextToken` gir en kompilatoradvarsel, `DPEXP001`.** Dette er forventet, ikke en byggefeil du må omgå - alle genererte SDK-medlemmer som berører denne funksjonen, er markert som eksperimentelle, og peker tilbake til [sak #3978](https://github.com/Altinn/dialogporten/issues/3978). Undertrykk den med `#pragma warning disable DPEXP001` rundt den aktuelle koden, eller `<NoWarn>DPEXP001</NoWarn>` i prosjektfilen, når du har bestemt deg for å ta avhengigheten i bruk.
2. **`DialogTokenValidator.ValidTokenTypes` har som standard bare dialogtokenet.** For å validere konteksttoken må du legge `DialogTokenTypes.DialogContextToken` eksplisitt til i den listen - uten videre avviser validatoren et konteksttoken på samme måte som den ville avvist enhver annen uventet `typ`. Dette er en bevisst standardverdi: strengere med mindre du aktivt velger noe annet, i stedet for å godta et hvilket som helst signert token uansett type.

## Motta og verifisere konteksttoken (OAuth-ressursservere)

### Tokentype

Et konteksttokens `typ`-header er `dialogcontexttoken+jwt`. Dialogtokenets egen `typ` er den samme generiske `"JWT"`-en den alltid har hatt - den endres ikke. En mottakende tjeneste må validere `typ` og feile lukket på alt den ikke forventer. De to tokentypene er signert med de samme nøklene, så signaturen alene sier ingenting om hvilken type token du har.

### Liste over claims

| Claim | Betydning | Delt med dialogtokenet? |
|---|---|---|
| `jti` | JWT-ID - en fersk, unik identifikator per token | Delt |
| `c` | Autentisert konsument. For en systembruker er dette konsumentorganisasjonen, med `y`/`o` som bærer systembrukeren | Delt |
| `y` | Systembrukerens identifikator (bare til stede når en systembruker er autentisert) | Delt |
| `o` | Systembrukerens organisasjon (bare til stede når en systembruker er autentisert) | Delt |
| `u` | Leverandørorganisasjon fra et Maskinporten-leverandørtoken (valgfritt) | Delt |
| `l` | Autentiseringsnivå | Delt |
| `p` | Dialogens part - hvem som eier dialogen | Delt |
| `s` | Dialogens tjenesteressurs | Delt |
| `i` | Dialog-ID | Delt |
| `a` | På et konteksttoken: den ene XACML-handlingen rettigheten gjelder | Navnet delt, formen er ulik - se under |
| `e` | Entitets-ID (UUIDv7) for entiteten dette tokenet gjelder | Bare konteksttoken |
| `t` | Entitetstype - se tabellen under | Bare konteksttoken |
| `r` | Den effektive ressursen for rettigheten. Utelates når rettigheten gjelder dialogens egen ressurs | Bare konteksttoken |
| `pp` | Liste over partene PDP-en faktisk tillot for denne rettigheten | Bare konteksttoken |
| `iss` | Utsteder - Dialogportens grunn-URI pluss `/api/v1` | Delt |
| `iat`, `nbf`, `exp` | Utstedelsestidspunkt, ikke-før-tidspunkt, utløp (`exp` er `iat` pluss 10 minutter) | Delt |

#### Claimet `a` er ulikt for de to tokentypene

På dialogtokenet er `a` en liste atskilt med `;` av oppføringer på formen `action` eller `action,attributt`, for eksempel `"read;write;sign;elementread,urn:altinn:subresource:foo"`.

På et konteksttoken er `a` alltid én enkelt handlingsstreng, for eksempel `"sign"`.

Rettigheter avledet fra autorisasjonskontekster utelates bevisst helt fra dialogtokenets `a`-claim - de vises bare som `a`-claimet i sitt eget konteksttoken.

#### `p` versus `pp`

Dette er claim-paret som betyr mest for korrekt autorisasjon, og fortjener en egen forklaring:

- `p` er alltid dialogens egen part, uansett hvordan rettigheten ble oppnådd.
- `pp` er settet med parter PDP-en faktisk tillot for akkurat denne sjekken.

Disse er ofte **ulike**. Med `includeDialogParty: false` og en eksplisitt `parties`-liste i autorisasjonskonteksten, vil `pp` slett ikke inneholde `p` - tokenet bekrefter en rettighet for en annen part enn dialogens egen.

**Autoriser mot `pp`, ikke `p`.** `p` forteller deg hvilken dialog du ser på; `pp` forteller deg på hvis vegne den som kaller har rett til å handle mot akkurat denne entiteten. Å behandle `p` som autorisasjonssubjektet gjør at hele poenget med claimet forsvinner.

#### Claimet `r`

Den effektive ressursen for rettigheten: autorisasjonskontekstens `serviceResource` hvis den satte en, ellers `additionalResourceAttribute`.

`r` utelates helt når konteksten ikke satte noen av delene - altså når rettigheten gjelder dialogens egen ressurs med bare partsavgrensing. Behandle et fraværende `r` som «ressursen som er oppgitt i `s`».

#### Entitetstyper (`t`)

| `t` | Entitet | Hvor den finnes i sluttbruker-API-et |
|---|---|---|
| `apiaction` | API-handling | `apiActions[]` |
| `guiaction` | GUI-handling | `guiActions[]` |
| `attachment` | Vedlegg på dialogen | `attachments[]` |
| `transmission` | Forsendelse | `transmissions[]` |
| `transmissionattachment` | Vedlegg på forsendelse | `transmissions[].attachments[]` |
| `navigationalaction` | Navigasjonshandling på forsendelse | `transmissions[].navigationalActions[]` |

#### Eksempel på dekodet token

```json
{
  "alg": "EdDSA",
  "typ": "dialogcontexttoken+jwt",
  "kid": "dp-2023-01"
}
// .
{
  "jti": "8e1f2c3d-4b5a-6978-8a9b-0c1d2e3f4a5b",
  "c": "urn:altinn:person:identifier-no:12018212345",
  "l": 4,
  "p": "urn:altinn:organization:identifier-no:991825827",
  "s": "urn:altinn:resource:super-simple-service",
  "i": "e0300961-85fb-4ef2-abff-681d77f9960e",
  "e": "0194a1b2-3c4d-7e5f-8a9b-0c1d2e3f4a5b",
  "t": "guiaction",
  "a": "sign",
  "r": "urn:altinn:task:Task_1",
  "pp": ["urn:altinn:organization:identifier-no:912345678"],
  "iss": "https://platform.altinn.no/dialogporten/api/v1",
  "iat": 1672771934,
  "nbf": 1672771934,
  "exp": 1672772534
}
// .
// <signature>
```

To ting å legge merke til i eksempelet over:

- `p` (`991825827`) er dialogeieren; `pp` (`912345678`) er parten PDP-en faktisk tillot. De er ulike - autoriser på `pp`.
- `exp - iat` er `600` sekunder, altså 10 minutter.

Til sammenligning, dialogtokenet utstedt for den samme forespørselen:

```json
{
  "alg": "EdDSA",
  "typ": "JWT",
  "kid": "dp-2023-01"
}
// .
{
  "jti": "1a2b3c4d-5e6f-7089-8a9b-0c1d2e3f4a5b",
  "c": "urn:altinn:person:identifier-no:12018212345",
  "l": 4,
  "p": "urn:altinn:organization:identifier-no:991825827",
  "s": "urn:altinn:resource:super-simple-service",
  "i": "e0300961-85fb-4ef2-abff-681d77f9960e",
  "a": "read",
  "iss": "https://platform.altinn.no/dialogporten/api/v1",
  "iat": 1672771934,
  "nbf": 1672771934,
  "exp": 1672772534
}
```

Merk at `sign` ikke vises i dialogtokenets `a`-claim - rettigheter avledet fra autorisasjonskontekster er utelatt med hensikt.

### Signaturalgoritme for token

Konteksttoken bruker samme [Edwards-Curve Digital Signature Algorithm (EdDSA)](https://datatracker.ietf.org/doc/html/rfc8032) med Ed25519-kurven som dialogtokenet, og de samme `kid`-verdiene. Se [referansen for dialogtoken]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}}#token-signature-cipher) for detaljer.

### Well-known-endepunkter

Dialogporten tilbyr [OAuth 2.0 Authorization Server Metadata (RFC 8414)](https://datatracker.ietf.org/doc/html/rfc8414) for nøkkeloppdagelse ved kjøretid:

- `{base}/api/v1/.well-known/oauth-authorization-server` returnerer `issuer` og `jwks_uri` for det aktuelle miljøet.
- `{base}/api/v1/.well-known/jwks.json` returnerer selve nøkkelsettet.

`issuer` er Dialogportens grunn-URI pluss `/api/v1`. Verdiene per miljø er:

| Miljø | `issuer` |
|---|---|
| Produksjon | `https://platform.altinn.no/dialogporten/api/v1` |
| Staging (TT02) | `https://platform.tt02.altinn.no/dialogporten/api/v1` |
| Test (at23) | `https://platform.at23.altinn.cloud/dialogporten/api/v1` |

Begge operasjonene er også beskrevet i OpenAPI-spesifikasjonen, under taggen «Metadata».

### Nøkkelsett og rotasjon

Konteksttoken signeres med de samme nøklene som dialogtokenet, så de samme reglene gjelder - se [nøkkelsett og rotasjon]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}}#nøkkelsett-og-rotasjon) på referansesiden for dialogtoken.

### Sjekkliste for validering hos mottakende tjenester

1. Verifiser signaturen mot JWKS-en, og velg nøkkelen ut fra `kid`.
2. Verifiser at `typ == "dialogcontexttoken+jwt"`. Avvis `"JWT"` (dialogtokenets `typ`) her.
3. Verifiser at `iss` samsvarer med den forventede Dialogporten-utstederen for miljøet.
4. Verifiser `exp`/`nbf` med minimal klokkeskjevhet, gitt levetiden på 10 minutter.
5. Verifiser at `i` (dialog-ID) samsvarer med dialogen du forventer, hvis du kjenner den.
6. Verifiser at `e` samsvarer med ID-en til entiteten hvis URL ble kalt, og at `t` samsvarer med typen dens. Dette er det som stopper et token utstedt for én entitet fra å bli gjenbrukt mot en annen.
7. Verifiser at `a` er handlingen du er i ferd med å utføre.
8. Verifiser ressursen: `r` hvis den er til stede, ellers `s`.
9. Autoriser på `pp` - den som kaller kan handle på vegne av en hvilken som helst part i `pp`, og bare disse. Ikke bruk `p`.
10. Verifiser at `l` oppfyller ditt minste påkrevde autentiseringsnivå.
11. Feil lukket på alt du ikke kjenner igjen. Se [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) for generell beste praksis for JWS-validering.

{{<children />}}

---
title: Sluttbrukersystemer
description: Integrasjon med sluttbrukersystemer.
weight: 40
toc: true
---

Sluttbrukersystemer (SBS) er systemer utviklet av leverandører som forenkler innsending til Altinn for sine kunder.
Denne guiden går gjennom konsepter og modeller som er relevante for integrasjon mellom en Altinn Studio app og sluttbrukersystemer.
Ved integrasjon av sluttbrukersystem mot en Altinn Studio app så brukes maskin-til-maskin kommunikasjon mellom
leverandørens system og appen. Det er i hovedsak 2 måter å lage denne intregrasjonen på

* ID-porten klient med innveksling av token
  * Leverandør av system lager en ID-porten klient og legger til de scopes som kreves i appen (f. eks. `altinn:instances.read` og `altinn:instances.write`)
  * Ved integrasjon mot Altinn apper så vil systemet veksle inn token til Altinn token
  * Fra appens perspektiv er det vanlig flyt (det er autentiserte sluttbrukere)
  * Egner seg godt for systemer der kontakt med sluttbruker er viktig, det er liten grad av automasjon og flyten i integrasjonen er fullstendig brukerstyrt.
* Systembruker
  * Leverandør lager Maskinporten klient
  * Leverandør lager system i systemregisteret til Altinn Autentisering (i systemdefinisjonen uttrykker man behov for `altinn:instances.read` og `altinn:instances.write`)
  * Kunde registrerer systembruker i systemregisteret. Dermed blir rettighetene delegert
  * Leverandør autentiserer med Maskinporten klient
  * Ved integrasjon mot Altinn apper så vil systemet autentisere mot Maskinporten også bruke dette tokenet ved innsending til Altinn
  * For mer informasjon, se [Altinn Autentisering brukerguide for systembrukere](/nb/authentication/guides/systemauthentication-for-systemproviders/)
  * Egner seg godt for systemer der det er større grad av automasjon (og mindre behov for kontakt/kobling til sluttbruker), og det er snakk om innsendinger på vegne av organisasjoner.

## Integrasjon med ID-porten

Ved ingrasjon fra sluttbrukersystem basert på ID-porten klient har man alltid direkte kontakt med sluttbruker.
Når sluttbruker logger inn i sluttbrukersystem via ID-porten vil sluttbruker måtte godta at systemet gjør 
`altinn:instances.read` og `altinn:instances.write` på vegne av brukeren (gitt at disse scopene er registrert i ID-porten klienten).
Tokenet må deretter [veksles i Altinn Autentisering](/nb/api/authentication/spec/).
Dette Altinn-tokenet kan deretter brukes til å sende inn skjema in en Altinn app på vegne a brukeren.

{{% notice info %}}
Scopene `altinn:instances.read` og `altinn:instances.write` er ikke tjenesteeier- eller app-spesifikke.
Ved godkjenning gir brukeren systemet lov til å sende inn i alle Altinn apper hvor brukeren er autorisert til det (via XACML og annen config).
{{% /notice %}}

### Bedre scope

Gitt at `altinn:instances.read` og `altinn:instances.write` gir tilgang til alle apper i Altinn (der brukeren har tilgang),
er det ofte behov for større grad av isolasjon slik at et mer spesifikt scope kreves, som er laget spesielt for en app.
Det er foreløpig ikke noe innebygd støtte for dette, men det er mulig å få til på egenhånd ved å utvikle et middleware i appen.

Tjenesteeier må lage et scope hos ID-porten via samarbeidsportalen som er app-spesifkt, og delegere dette til organisasjoner
som har tenkt til å lage sluttbrukersystem for tjenesteeiers app. Deretter må sluttbrukersystemet legge til dette scopet på sin ID-porten klient
_i tillegg_ til `altinn:instances.read` og `altinn:instances.write` (disse kreves fortsatt av Altinn plattformen).

Tjenesteeier kan deretter lage et middleware e.l. som gjør ekstra autorisasjon basert på den autentiserte brukeren. Eksempel:

```csharp
WebApplication app = builder.Build();

app.Use(
    async (context, next) =>
    {
        var authenticationContext = context.RequestServices.GetRequiredService<IAuthenticationContext>();
        var authenticated = authenticationContext.Current;
        if (authenticated is Authenticated.User user)
        {
            // Here we are expressing that for any API request for the authenticated party is a user, the user either has to
            // * Be logged in through Altinn portal
            // * Have consented to the custom app scope `myappscope` (it has consent required registered on the scope in ID-porten)
            if (!user.InAltinnPortal && !user.Scopes.HasScope("myappscope"))
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Forbidden");
                return;
            }
        }

        await next(context);
    }
);
```


## Integrasjon med systembruker

Systembruker-konseptet fra Altinn Autentisering/Autorisasjon er laget for å støtte
mer automatiserte integrasjoner mellom sluttbrukersystemer og Altinn apper der innsending gjøres
på vegne av en organisasjon. I Systembruker-konseptet sitter følgende komponenter

* Maskinporten - autentiseringsmekanismen for alt som har med systembrukere å gjøre, inkl
  * Registrering system i systemregisteret (API hos Altinn Autentisering)
  * Registrere systembruker i systemregisteret (API hos Altinn Autentisering)
  * Innsending fra systemet (leverandørens system/sluttbrukersystemet)
* Systemregisteret
  * En komponent i Altinn Autentisering hvor alle systemdefinisjoner tilhørende sluttbrukersystemer ligger
* System
  * Definisjonen for sluttbrukersystemet. Denne definisjonen inneholder bl. a. hvilke rettigheter systemet trenger fra systembrukeren, og hvilke Maskinporten klient (klient ID) systemet har tenkt til å bruke ved autentisering i Maskinporten.
  * Systemet registreres og eies av sluttbrukersystem-leverandøren i systemregisteret
* Systembruker
  * En virtuell bruker som eies av kunden til leverandøren/sluttbrukersystemet
  * Når systembrukeren registreres (også i systemregisteret, da den registreres mot et eksisterende system), vil rettighetene systemet ber om måtte delegeres til systembrukeren. I praksis må den personen som oppretter systembrukeren (hos kunden) ha disse rettighetene som systemet ber om.

Dette konseptet lar dermed systemet impersonere systembrukeren i integrasjonen mot en Altinn app.
Dermed _kan_ systemet gjøre kall mot Altinns APIer uten at en sluttbruker hos organisasjonen er tilstede.
Dette er ikke mulig med ID-porten integrasjon, da man til enhver tid er avhengig av et gyldig token fra sluttbrukeren som jobber hos kunden (med tilstrekkelig tilganger).

### Eksempel

La oss gå gjennom et konkret eksempel for SBS basert på systembruker-integrasjon.

{{% notice info %}}
Dette er et fiktivt eksempel, men vi bruker et kjent system, tjenesteeier og skjema for å gjøre eksempelet mer relaterbart.
Merk at det er få steg for tjenesteeier å utføre her, men det er likevel viktig at tjenesteeier har kjennskap til prossessen.
{{% /notice %}}

* Systemet: **Fiken AS (913312465)**
* Tjenesteier: **Brønnøysundregisteret (brg)**
* App: **aarsregnskap**
* Kunden: **Sindig Oriental Tiger AS (313725138)**
* Miljø: **tt02**

I dette eksempelet vil Fiken automatiske sende inn årsregnskap på slutten av året basert på det regnskapet som er oppført i Fiken av kunden.
Denne innsendingen skjer helt automatisk, men sluttbruker hos kunden må fortsatt inn og signere årsregnskapet etter at det er ferdig fyllt inn i `årsregnskap`.
Nå skal vi sette opp integrasjonen fra scratch.

Vi har mer dokumentasjon rundt [systembruker-flyt for SBS her](/nb/authentication/guides/systemauthentication-for-systemproviders/).
Denne guiden er ment som et Altinn Studio app-spesifikt eksempel på det samme konseptet.

#### Forutsetninger

* Brønnøysundregisteret trenger tilgang til Altinn Studio og tt02-miljøet
* Fiken trenger avtale med Maskinporten for miljøet (tilgang til [Samarbeidsportalen for test](https://sjolvbetjening.test.samarbeid.digdir.no/))
* Fiken trenger tilgang til Maskinporten/ID-porten scopene 
  * `altinn:authentication/systemregister.write`, 
  * `altinn:authentication/systemuser.request.read`, `altinn:authentication/systemuser.request.write`
  * `altinn:instances.read`, `altinn:instances.write`

#### 1. Tjenesteeier lager app

Utvikler hos Brønnøysundregisteret med lager app i Altinn Studio, kaller den `aarsregnskap`.
For å støtte systembruker-basert integrasjon med SBS kreves ingen spesiell støtte i enn app, så den utvikles som normalt,
bl. a. med en XACML policy som lar DAGL fylle inn skjema og signere.

#### 2. Fiken lager Maskinporten-klient

Man trenger en Maskinporten-klient for å bruke systemregisteret og for å ta i bruk systembruker-integrasjonen mot `aarsregnskap`.

* Gå til [Samarbeidsportalen for test](https://sjolvbetjening.test.samarbeid.digdir.no/) -> "Administrasjon av tjenester" -> "Integrasjoner" -> "Ny integrasjon"
* Fyll ut skjema og opprett klienten med scopes 
  * `altinn:authentication/systemregister.write` - for å opprette systemet i systemregisteret
  * `altinn:authentication/systemuser.request.read`, `altinn:authentication/systemuser.request.write` - for å forespørre systembruker for systemet
  * `altinn:instances.read`, `altinn:instances.write` - for å sende inn på vegne av systembrukeren
* Noter ned klient ID (`a2ed712d-4144-4471-839f-80ae4a68146b` f. eks.)
* Lag og registrer JWKS på klienten (ta vare på privat og public JWK)

Se dokumentasjon for [registrering av Maskinporten-klient her](/technology/solutions/cli/configuration/maskinporten-setup/).

#### 3. Fiken registrerer system i systemregisteret

Med access token fra autentisering med den nyopprettede Maskinporten-klient kan vi registrere Fiken som system i systemregisteret til Altinn Autentisering.
I JSON-definisjonen nedenfor registeres systemet med klient IDen fra steget over og med `Rights` som gir tilgang til Brønnøysundregisterets aarsregnskaps-app.

```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemregister/vendor/
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "Id": "913312465_Fiken",
  "Vendor": {
    "ID": "0192:913312465"
  },
  "Name": {
    "en": "Fiken",
    "nb": "Fiken",
    "nn": "Fiken"
  },
  "Description": {
    "en": "Fiken Accounting",
    "nb": "Fiken Regnskap",
    "nn": "Fiken Regnskap"
  },
  "Rights": [
    {
      "Resource": [
        {
          "value": "app_brg_aarsregnskap",
          "id": "urn:altinn:resource"
        }
      ]
    }
  ],
  "AllowedRedirectUrls": [ "https://fiken.no/receipt" ],
  "ClientId": [ "a2ed712d-4144-4471-839f-80ae4a68146b" ]
}
```

#### 4. Fiken forespør systembruker for kunden

```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor/
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "externalRef": "313725138_Fikenbruker",
  "systemId": "913312465_Fiken",
  "partyOrgNo": "313725138",
  "rights": [
    {
      "resource": [
        {
          "value": "app_brg_aarsregnskap",
          "id": "urn:altinn:resource"
        }
      ]
    }
  ],
  "redirectUrl": "https://fiken.no/receipt"
}
```


#### 5. Kunden godkjenner forespørsel om systembruker

Person hos kunden, f. eks. daglig leder, godkjenner forespørsel om systembruker.

#### 6. Fiken kan autentisere mot Maskinporten med systembrukeren

Nå kan Fiken autentisere systembrukeren med Maskinporten.
Dette gjøres ved å legge til `authorization_details` claim i assertion med `/token` requestet til Maskinporten.
Her bruker vi bare scopene `altinn:instances.read` og `altinn:instances.write` som lar oss sende inn i en Altinn app.

```http
POST https://test.maskinporten.no/token

{
  "aud": "https://test.maskinporten.no/",
  "sub": "a2ed712d-4144-4471-839f-80ae4a68146b",
  "authorization_details": [
    {
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:313725138"
      },
      "type": "urn:altinn:systemuser"
    }
  ],
  "scope": "altinn:instances.read altinn:instances.write",
  "iss": "a2ed712d-4144-4471-839f-80ae4a68146b",
  "exp": 1718124835,
  "iat": 1718124715,
  "jti": "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}
```

#### 7. Fiken kan instansiere i appen

Vi bruker `access_token` fra responsen i forrige steg til å lage en tom instans i `aarsregnskap`-appen.

```http
POST https://brg.apps.tt02.altinn.no/brg/aarsregnskap/instances/create
Content-Type: application/json
Authorization: Bearer <access-token>

{
  "instanceOwner": {
    "organisationNumber": "313725138"
  }
}
```

#### 8. Tjenesteeier kan bruke informasjon om autentisert part om nødvendig

Som eksemplifisert lenger opp, så kan man bruke `IAuthenticationContext` for å gjøre custom logikk basert på om det er systembruker som er innlogget i requestet:

```csharp
WebApplication app = builder.Build();

app.Use(
    async (context, next) =>
    {
        var authenticationContext = context.RequestServices.GetRequiredService<IAuthenticationContext>();
        var authenticated = authenticationContext.Current;
        if (authenticated is Authenticated.SystemUser systemUser)
        {
            ...
        }

        await next(context);
    }
);
```

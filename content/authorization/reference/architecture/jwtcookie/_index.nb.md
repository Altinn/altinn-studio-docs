---
title: JWTCookieAuthentication
linktitle: JWT Cookie
description: Beskrivelse av JWTCookieAuthentication.
tags: [architecture, security, needstranslation]
toc: true
---

JWTCookieAuthentication er en [ASP.NET Core-autentiseringstjeneste](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/)
laget for å støtte [JSON Web Tokens](https://jwt.io/) (JWT) både som [bearer-tokens](https://oauth.net/2/bearer-tokens/) og som JWT i informasjonskapsler. Løsningen bygger på
[JWTBearer](https://github.com/aspnet/Security/tree/master/src/Microsoft.AspNetCore.Authentication.JwtBearer).

Tjenesten er laget for scenarier der API-er må være tilgjengelige både fra systemer som bruker bearer-token og fra
enkelt-sides applikasjoner (SPA), hvor man ønsker å beskytte JWT mot tilgang fra selve SPA-en ([XSS-angrep](<https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)>)). Når JWT lagres i en [HTTP-only-informasjonskapsel](https://www.owasp.org/index.php/HttpOnly), er den ikke tilgjengelig fra SPA-en og kan ikke stjeles av ondsinnet JavaScript i nettleseren.

Løsningen er laget som et [separat C#-prosjekt](https://github.com/Altinn/altinn-authentication/tree/main/src/jwtcookie/Authentication) og publisert som
NuGet-pakken [JWTCookieAuthentication](https://www.nuget.org/packages/JWTCookieAuthentication/).

## Funksjoner for konsument

- Støtte for verifisering av JWT som bearer-token
- Støtte for verifisering av JWT fra informasjonskapsel
- Konfigurerbart navn på informasjonskapselen
- Automatisk deteksjon av om forespørselen inneholder Authorization-bearer eller JWT i informasjonskapsel
- Bruker [Microsoft.IdentityModel.Tokens](https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet) til verifisering og generering
- Bruker [OpenID Connect](https://openid.net/connect/) well-known-endepunkt for å hente JSON Web Key (JWK) fra [JSON Web Key Set](https://auth0.com/docs/jwks)
- Støtte for flere konfigurerte OIDC-leverandører
- Støtte for rotering av JWK (TODO)

## Funksjoner for ID-leverandør

- Støtte for generering av JWT som bearer-token
- Støtte for generering av JWT i informasjonskapsler
- Konfigurerbart navn på informasjonskapselen
- Konfigurerbart signeringssertifikat
- Bruker standard JWT-bibliotek for verifisering og generering
- Bruker OpenID Connect well-known-endepunkt for å hente JSON Web Key (JWK) fra [JSON Web Key Set](https://auth0.com/docs/jwks)
- Støtte for rotering av JWK (TODO)

## Konfigurering av JWTCookieAuthentication

### Konfigurasjon for konsumenter

```C#
// Configure Authentication
// Use [Authorize] to require login on MVC Controller Actions
services.AddAuthentication(JwtCookieDefaults.AuthenticationScheme)
    .AddJwtCookie(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            RequireExpirationTime = true,
            ValidateLifetime = true
        };
        options.Cookie.Domain = Configuration["GeneralSettings:HostName"];
        options.Cookie.Name = Services.Constants.General.RuntimeCookieName;
        options.MetadataAddress = Configuration["AppSettings:OpenIdWellKnownEndpoint"];
        if (_env.IsDevelopment())
        {
            options.RequireHttpsMetadata = false;
        }
    });
```

### Konfigurasjon for identitetsleverandør

Konfigurasjonen under er relevant for applikasjonen som fungerer som ID-leverandør.

```C#
// Use [Authorize] to require login on MVC Controller Actions
services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddJwtCookie(JwtCookieDefaults.AuthenticationScheme, options =>
    {
        options.ExpireTimeSpan = new TimeSpan(0, 30, 0);
        options.Cookie.Name = Common.Constants.General.RuntimeCookieName;
    })
```

## Hvordan hente brukerinformasjon

Når en applikasjon er konfigurert med JWTCookie-autentisering, er brukerinformasjonen tilgjengelig i `HttpContext`.

```C#
 public static int GetUserId(HttpContext context)
{
    int userId = 0;

    if (context.User != null)
    {
        foreach (Claim claim in context.User.Claims)
        {
            if (claim.Type.Equals(AltinnCoreClaimTypes.UserId))
            {
                userId = Convert.ToInt32(claim.Value);
            }
        }
    }

    return userId;
}
```

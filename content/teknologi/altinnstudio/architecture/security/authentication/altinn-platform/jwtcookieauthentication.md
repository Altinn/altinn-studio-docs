---
title: JWTCookieAuthentication
description: Description of the JWTCookieAuthentication created for Altinn
tags: [architecture, security]
weight: 100
linktitle: JWTCookieAuthentication
alwaysopen: false
---

JWTCookieAuthentication is a asp.net core authentication mechanismen created for supporting JWTTokens as bearer tokens and JWTTokens
in Cookies. It is based on [JWTBearer](https://github.com/aspnet/Security/tree/master/src/Microsoft.AspNetCore.Authentication.JwtBearer) 

This is created for scenarios where you have need for APIs that will be accessed from system with help of bearer tokens and from
Single Page Applications (SPA) where you want to protect the JWT from this SPA. (Xss attacks)

This is created as a seperate C# Project and published as a Nuget Package [here](https://www.nuget.org/packages/JWTCookieAuthentication/)

## Features Consumer

- Support Verification of JWT Tokens as bearer tokens
- Support Verification of JWT Tokens from cookie
- Configureble name of cookie used
- Automatic detection if request contains Authorization bearer token or JWT in cookie
- Uses standard JWT Library for verification and generation. 
- Uses OpenID connect well known endpoint to retrieve the JSON Web Key (JWK) used to sign JWT from the [JSON Web Key Set](https://auth0.com/docs/jwks)
- Support rotating of JWK (TODO)

## Features IP Provider 
- Support Generation of JWT Tokens as bearer tokens
- Support Generation of JWT Tokens inside Cookies
- Configureble name of cookie used
- Configurable Signing Ceritcate
- Uses standard JWT Library for verification and generation. 
- Uses OpenID connect well known endpoint to retrieve the JSON Web Key (JWK) used to sign JWT from the [JSON Web Key Set](https://auth0.com/docs/jwks)
- Support rotating of JWK (TODO)


## How To Configure JWTCookieAuthentication


### Configuration for consumers

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


### Configuration for the identity provider
The below configuration is relevant for the Identity Provider application.




```c#
            // Use [Authorize] to require login on MVC Controller Actions
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddJwtCookie(JwtCookieDefaults.AuthenticationScheme, options =>
                {
                    options.ExpireTimeSpan = new TimeSpan(0, 30, 0);
                    options.Cookie.Name = Common.Constants.General.RuntimeCookieName;
                })
```

## How to get access to user information
When a application is configured with JWTCookie authentication the information is available in httpContext about the user


```c#
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



## Known Issues












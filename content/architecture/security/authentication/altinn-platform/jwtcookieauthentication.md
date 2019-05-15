---
title: JWTCookieAuthentication
description: Description of the JWTCookieAuthentication created for Altinn
tags: ["architecture", "security"]
weight: 100
linktitle: JWTCookieAuthentication
alwaysopen: false
---


JWTCookieAuthentication is a asp.net core authentication mechanismen created for supporting JWTTokens as bearer tokens and JWTTokens.

This is created for scenarios where you have need for API that will be accessed from system with 

This is created as a seperate C# Project and published as a Nuget Package [here](https://www.nuget.org/packages/JWTCookieAuthentication/)

## Features

- Support Generation of JWT Tokens as bearer tokens
- Support Generation of JWT Tokens inside Cookies
- Support Verification of JWT Tokens as bearer tokens
- Support Verification of 
- Configureble name of cookie used
- Configurable Signing Ceritcate
- Configurale Verification certificate
- Automatic detection if request contains 
- Uses standard JWT Library for verification and generation. 


## How To Configure JWTCookieAuthentication


### Configuration for consumers

```C#

            // Configure Authentication
            // Use [Authorize] to require login on MVC Controller Actions
            X509Certificate2 cert = new X509Certificate2("JWTValidationCert.cer");
            SecurityKey key = new X509SecurityKey(cert);

            services.AddAuthentication(JwtCookieDefaults.AuthenticationScheme)
                .AddJwtCookie(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        RequireExpirationTime = true,
                        ValidateLifetime = true
                    };
                    options.ExpireTimeSpan = new TimeSpan(0, 30, 0);
                    options.Cookie.Name = Common.Constants.General.RuntimeCookieName;
                });


```




### Configuration for the identity provider

,


## Known Issues












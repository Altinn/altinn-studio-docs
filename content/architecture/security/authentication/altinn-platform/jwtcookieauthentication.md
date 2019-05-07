---
title: JWTCookieAuthentication
description: Description of the JWTCookieAuthentication created for Altinn
tags: ["architecture", "security"]
weight: 100
linktitle: JWT Format
alwaysopen: false
---


JWTCookieAuthentication is a asp.net core authentication mechanismen created for supporting JWTTokens as bearer tokens and JWTTokens.

This is created as a seperate C# Project and published as a Nuget Package here (todo add link when published)

## Features

- Support Generation of JWT Tokens as bearer tokens
- Support Generation of JWT Tokens inside Cookies
- Configureble name of cookie used
- Configurable Signing Ceritcate
- Configurale Verification certificate
- Automatic detection if request contains 
- Uses standard JWT Library for verification and generation. 










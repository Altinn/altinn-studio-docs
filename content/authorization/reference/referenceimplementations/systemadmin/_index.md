---
title: System Admin - Reference Implementations
linktitle: System Admin
description: The System Admin application demonstrates how a system vendor can register and update a system in the Altinn System Register.
weight: 5
---



To add and update systems, the scope **altinn:authentication/systemregister.write** is required.

The application uses a Maskinporten token exchanged for an Altinn token.

The call is made from the [System Register Service](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemAdmin/Services/SystemRegister.cs) in this application.

See the .NET project [here](https://github.com/TheTechArch/altinn-systemuser/tree/main/src/SystemAdmin).

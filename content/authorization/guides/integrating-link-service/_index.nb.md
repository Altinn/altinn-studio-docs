---
title: Sette opp integrasjon mot Altinn Autorisasjon fra eksterne tjenester
linktitle:  Integrasjon med eksterne tjenester
description:  Denne guiden beskriver hvordan man fra en ekstern tjeneste kan integrere seg mot Altinn Autorisasjon
toc: false
weight: 4
---


## Sette opp integrasjon med ID-porten 

For at man skal kunne autorisere sluttbrukere i en digital tjeneste er det nødvendig å kunne autentisere brukeren.

Dette gjøres typisk ved hjelp av ID-porten


## Få tilgang til Altinns API

For å få tilgang til Altinns API trenger tjenesteier følgende

- API Subscription for produktene Access Management. 
- Scope for avgiverliste for tjenesteeierbruker "altinn:accessmanagement/authorizedparties.resourceowner"
- Scope for PDP "altinn:authorization/authorize"

Dette kan bestilles hos Altinn tjenester@altinn.no

## Sette opp tilgangs håndtering i egen applikasjon

I applikasjonen som tilbyr tjenesten må tjenesteeier sette opp tilgangshåndtering for når brukere aksesserer funksjonalitet
som krever autorisasjon.  I Altinn kaller vi slik kode "Policy Enforcment Point". 

Policy Enforcement Point sin oppgave er å kalle Policy Decision Point


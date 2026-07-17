---
title: Beslutningsmodellen i XACML
linktitle: XACML-beslutningsmodell
description: Sammenhengen mellom PDP, PAP, PRP, PIP, konteksthåndtereren og PEP i Altinn Autorisasjon.
weight: 10
toc: true
---

Altinn Autorisasjon bygger beslutningsmodellen på ansvarsdelingen i XACML. Modellen skiller mellom å administrere regler, hente beslutningsgrunnlag, ta en beslutning og håndheve den.

## Komponentene i en autorisasjonsbeslutning

| Rolle | Ansvar i beslutningen | Detaljert referanse |
|---|---|---|
| **PDP (Policy Decision Point)** | Evaluerer forespørselen og returnerer en beslutning. | [Slik er PDP bygget.](/nb/authorization/reference/architecture/accesscontrol/) |
| **PAP (Policy Administration Point)** | Oppretter og administrerer autorisasjonspolicyer. | [Slik administreres policyer.](/nb/authorization/reference/architecture/accessmanagment/pap/) |
| **PRP (Policy Retrieval Point)** | Finner policyen som gjelder for ressursen. | [Slik henter PRP policyer.](/nb/authorization/reference/architecture/accesscontrol/prp/) |
| **PIP (Policy Information Point)** | Leverer informasjon om subjektet, ressursen og konteksten. | [Slik leverer PIP beslutningsgrunnlag.](/nb/authorization/reference/architecture/accesscontrol/pip/) |
| **Konteksthåndterer** | Samler og normaliserer informasjonen som PDP trenger. | [Slik behandler konteksthåndtereren forespørselen.](/nb/authorization/reference/architecture/accesscontrol/contexthandler/) |
| **PEP (Policy Enforcement Point)** | Håndhever beslutningen ved den beskyttede tjenesten. | [Slik håndhever PEP beslutningen.](/nb/authorization/reference/architecture/accesscontrol/pep/) |

## Plassering i systemdokumentasjonen

[Systemarkitekturen](../../architecture/) viser ansvarsgrensene på systemnivå. [Applikasjonsarkitekturen for Authorization](../../application-architecture/authorization/) beskriver applikasjonen som utfører PDP-funksjonen. Sidene i tabellen over er den detaljerte referansen for XACML-rollene og er beholdt på sine tidligere adresser.

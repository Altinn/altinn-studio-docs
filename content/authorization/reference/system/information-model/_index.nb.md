---
title: Informasjonsmodell
linktitle: Informasjonsmodell
description: Begreper og sammenhenger i domenet til Altinn Autorisasjon.
weight: 2
toc: true
---

Informasjonsmodellen viser hvilken informasjon Altinn Autorisasjon bruker, og hvordan begrepene henger sammen. Modellen beskriver domenet på tvers av komponenter og API-er. Den er ikke en databasemodell.

## Overordnet modell

{{< mermaid >}}
classDiagram
    class Identitet
    class Autentiseringskontekst
    class Part
    class Representasjon
    class Ressurs
    class Handling
    class Tilgang
    class Autorisasjonsbeslutning
    class Hendelse

    Identitet "1" --> "0..*" Autentiseringskontekst : inngår i
    Identitet "1" --> "0..*" Representasjon : handler gjennom
    Representasjon "*" --> "1" Part : gjelder
    Part "1" --> "0..*" Tilgang : gir eller mottar
    Tilgang "*" --> "1" Ressurs : gjelder
    Ressurs "1" --> "1..*" Handling : tilbyr
    Autentiseringskontekst --> Autorisasjonsbeslutning : inngår i
    Representasjon --> Autorisasjonsbeslutning : inngår i
    Tilgang --> Autorisasjonsbeslutning : inngår i
    Handling --> Autorisasjonsbeslutning : vurderes
    Autorisasjonsbeslutning --> Hendelse : kan registreres som
{{< /mermaid >}}

En autorisasjonsbeslutning gjelder en identitet som vil utføre en handling på en ressurs. Beslutningen bygger også på hvilken part identiteten handler på vegne av, og hvilke tilganger som gjelder i den aktuelle konteksten.

## Autentisering

{{< mermaid >}}
classDiagram
    class Identitet
    class Identitetsleverandor
    class Autentiseringshendelse
    class Sesjon
    class Token
    class Autentiseringskontekst

    Identitetsleverandor --> Identitet : bekrefter
    Identitet --> Autentiseringshendelse : gjelder
    Autentiseringshendelse --> Autentiseringskontekst : etablerer
    Autentiseringskontekst --> Sesjon : kan knyttes til
    Autentiseringskontekst --> Token : kan uttrykkes i
{{< /mermaid >}}

Authentication kontrollerer bevis fra en identitetsleverandør og etablerer en autentiseringskontekst. Et token uttrykker denne konteksten, men er ikke i seg selv en autorisasjonsbeslutning.

## Part og representasjon

{{< mermaid >}}
classDiagram
    class Part
    class Person
    class Virksomhet
    class Systembruker
    class EksternRolle
    class Rolletildeling

    Part <|-- Person
    Part <|-- Virksomhet
    Part <|-- Systembruker
    Rolletildeling "*" --> "1" EksternRolle : gjelder
    Rolletildeling "*" --> "1" Part : fra
    Rolletildeling "*" --> "1" Part : til
    Systembruker "*" --> "1" Virksomhet : eies av
{{< /mermaid >}}

Register er den autoritative kilden i Altinn for parter og representasjonsforhold. En part kan blant annet være en person, en virksomhet eller en systembruker. En rolletildeling beskriver at en part har en ekstern rolle overfor en annen part.

## Ressurs og handling

{{< mermaid >}}
classDiagram
    class Ressurs
    class Ressurseier
    class Ressurstype
    class Handling
    class Autorisasjonsregel
    class Tilgangspakke

    Ressurs "*" --> "1" Ressurseier : forvaltes av
    Ressurs "*" --> "1" Ressurstype : har
    Ressurs "1" --> "1..*" Handling : tilbyr
    Autorisasjonsregel "*" --> "1" Ressurs : beskytter
    Autorisasjonsregel "*" --> "1..*" Handling : gjelder
    Tilgangspakke "*" --> "1..*" Ressurs : grupperer
{{< /mermaid >}}

Resource Registry beskriver hva en part kan be om tilgang til. Ressursen har en stabil identifikator, en eier og metadata. Autorisasjonsreglene beskriver hvilke handlinger som kan utføres og på hvilke vilkår.

## Tilgang og delegering

{{< mermaid >}}
classDiagram
    class Part
    class Rolle
    class Rolletildeling
    class Delegering
    class Tilgangspakke
    class Ressurs

    Rolletildeling "*" --> "1" Part : fra
    Rolletildeling "*" --> "1" Part : til
    Rolletildeling "*" --> "1" Rolle : gjelder
    Delegering "*" --> "1" Rolletildeling : bygger på
    Delegering "*" --> "1" Part : gis til
    Delegering "*" --> "0..*" Tilgangspakke : omfatter
    Delegering "*" --> "0..*" Ressurs : kan omfatte
{{< /mermaid >}}

Access Management beskriver hvem som kan opptre overfor hvem, og hva tilgangen omfatter. En tilgang kan følge av en rolle eller av en delegering. Tilgangspakker grupperer tilganger som hører sammen.

## System og systembruker

{{< mermaid >}}
classDiagram
    class Systemleverandor
    class RegistrertSystem
    class Systembrukerforesporsel
    class Kundevirksomhet
    class Systembruker
    class Tilgang

    Systemleverandor "1" --> "1..*" RegistrertSystem : tilbyr
    RegistrertSystem "1" --> "0..*" Systembrukerforesporsel : brukes i
    Systembrukerforesporsel "*" --> "1" Kundevirksomhet : sendes til
    Systembrukerforesporsel "1" --> "0..1" Systembruker : oppretter
    Systembruker "*" --> "1" RegistrertSystem : bygger på
    Systembruker "*" --> "1" Kundevirksomhet : handler for
    Systembruker "1" --> "1..*" Tilgang : avgrenses av
{{< /mermaid >}}

Et registrert system beskriver et produkt som en systemleverandør tilbyr. En systembruker knytter systemet til en kundevirksomhet og avgrenser hvilke tilganger systemet kan bruke på vegne av kunden.

## Samtykke

{{< mermaid >}}
classDiagram
    class Samtykke
    class Part
    class Samtykkerettighet
    class Ressurs
    class Handling
    class Samtykkehendelse

    Samtykke "*" --> "1" Part : gis av
    Samtykke "*" --> "1" Part : gis til
    Samtykke "1" --> "1..*" Samtykkerettighet : inneholder
    Samtykkerettighet "*" --> "1" Ressurs : gjelder
    Samtykkerettighet "*" --> "1..*" Handling : tillater
    Samtykke "1" --> "1..*" Samtykkehendelse : har historikk
{{< /mermaid >}}

Et samtykke gir mottakeren en formålsbestemt og tidsavgrenset fullmakt fra personen eller virksomheten som gir samtykket. Samtykket viser hvilke ressurser og handlinger fullmakten omfatter.

## Sporbarhet

{{< mermaid >}}
classDiagram
    class Autentiseringshendelse
    class Autorisasjonshendelse
    class Identitet
    class Part
    class Ressurs
    class Handling
    class Beslutning

    Autentiseringshendelse --> Identitet : gjelder
    Autorisasjonshendelse --> Identitet : gjelder
    Autorisasjonshendelse --> Part : gjelder representasjon av
    Autorisasjonshendelse --> Ressurs : gjelder
    Autorisasjonshendelse --> Handling : gjelder
    Autorisasjonshendelse --> Beslutning : registrerer
{{< /mermaid >}}

Audit Log lagrer autentiserings- og autorisasjonshendelser. Hendelsene gjør det mulig å undersøke hvem som handlet, på vegne av hvilken part, hvilken ressurs og handling forespørselen gjaldt, og hvilken beslutning systemet returnerte.

## Kilder og avgrensning

Modellen bygger på domenemodeller og kontrakter i repositoriene `altinn-authentication`, `altinn-register`, `altinn-resource-registry`, `altinn-authorization-tmp` og `altinn-auth-audit-log`. Modellen viser stabile domenebegreper og utelater DTO-er, databasefelter og tekniske transportformater.

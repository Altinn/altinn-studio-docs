---
draft: true
title: Lag en bruker i Altinn Studio
linktitle: Lag en bruker
description: Slik lager du deg en bruker i Altinn Studio
toc: true
weight: 1
tags: [needsReview]
marp: true
headingDivider: 4
style: |
  section {
    color: #393b51
  }
header: 'Lag en bruker'
footer: 'Altinn Studio - kom i gang'
---
Alle som ønsker å teste og/eller bruke Altinn Studio må først lage en bruker. Dette er selvbetjent.
Din Altinn Studio-bruker er personlig for deg og kan knyttes til en eller flere organisasjoner for å samarbeide med andre og få tilgang til eksisterende apper.
Om du skal ha tilgang til å lage tjenester for en organisasjon må du kontakte den som administrerer Altinn Studio
for din organisasjon.

### Lag en bruker med Ansattporten
{.floating-bullet-numbers-sibling-ol}

1. Gå til [altinn.studio](https://altinn.studio) og klikk på "Logg inn.
   ![Innlogging](./velkommen.png "Velkommen")

2. Registrer/Logg inn gjennom Ansattporten.
   - Du registrerer deg ved å logge inn via Ansattporten.
   - Velg BankID eller en av de andre innloggingsmetodene.
   - *Av sikkerhetsmessige årsaker kan du kun bruke Ansattporten for innlogging/registrering. Det er ikke et krav om knytning
      til en virksomhet i offentlig sektor.*

   ![Ansattporten innlogging](./ansattporten.png "Ansattporten innlogging")

3. Lag en Altinn Studio-bruker ved å fylle ut brukernavn, e-post, passord og en bekreftelse på at du er et menneske. Klikk deretter på **Fullfør**.
   Brukeren i Altinn Studio vil bli koblet til din Ansattporten-bruker.
   ![Registrer ditt brukernavn i Altinn Studio](./register-new-gitea-user.png "Registrer ditt brukernavn i Altinn Studio")

4. Aktiver kontoen din ved å bekrefte e-postadressen du registrerte med.
   - *En e-post er sendt til den e-postadressen du oppga med en lenke. Kopier ut lenken og lim den inn i nettleservinduet.*

   {{% notice warning%}}
   Hvis du får en feilmelding om at lenken er utløpt, prøv å logge inn på nytt (via Ansattporten). Kontoen skal være aktivert.
   {{% /notice %}}

5. Gi Altinn Studio-applikasjonen tilgang til din brukerkonto.
   ![Gi Altinn Studio-applikasjonen tilgang til din brukerkonto](./authorize-application.png "Gi Altinn Studio-applikasjonen tilgang til din brukerkonto")

Etter at kontoen er aktivert, klikk på logoen øverst til venstre på siden for å gå til ditt tjeneste-dashboard.
Du er nå klar til å lage din første tjeneste.

![Tjeneste-dashboard ved første innlogging](./empty-dashboard.png?width=500 "Tjeneste-dashboard ved første innlogging")

## Bli del av en organisasjon

Organisasjoner i Altinn Studio eier applikasjonene og gjør det mulig for flere innen samme organisasjon å samarbeide.

For å bli del av en organisasjon må en administrator for din organisasjon gi deg tilgang.
Hvis du er usikker på hvem som er administrator eller du ikke vet om organisasjonen din er satt opp i Altinn Studio
kan du spørre [Altinn Servicedesk](mailto:tjenesteeier@altinn.no) om hjelp.

_Er du administrator for din organisasjon og skal legge inn brukere? Se veiledning for hvordan det gjøres [her](/nb/altinn-studio/v8/guides/administration/access-management/studio/)._

## Opprette en organisasjon

Det er Digdir som oppretter organisasjoner i Altinn Studio.

For å kunne få en organisasjon i Altinn Studio må din virksomhet

- være tjenesteeier og ha inngått en avtale med Altinn, eller
- tilby tjenesteutvikling i Altinn Studio på vegne av offentlige virksomheter

Organisasjoner som ikke er tjenesteeiere vil ikke få tilgang til eget test- eller produksjonsmiljø. 

For å opprette en ny organisasjon, send en e-post til [Altinn Servicedesk](mailto:tjenesteeier@altinn.no) med navn på organisasjonen og hvem som skal være administrator.
Det kan ta noen dager, og du får svar på e-post så snart det er gjort.

---
title: Demoklient
description: For å vise hvordan leverandørstyrt opprettelse kan se ut, har vi utviklet demoklienten Smartcloud
linktitle: Demoklient
hidden: false
weight: 10
---

## Demoklient

For en demo av hvordan leverandørstyrt opprettelse kan se ut, se vår demoklient [SmartCloud](http://smartcloudaltinn.azurewebsites.net).

Se kode med dokumentasjon [her](https://github.com/TheTechArch/altinn-systemuser).

For opprettelse av systembrukere kan testbrukere/organisasjoner fra Tenor benyttes.

## Testing av systembruker i TT02

For å teste systembruker i TT02, kreves følgende:

- Systemtilbyder registrert i Maskinporten. Dette gjøres via servicedesk@digdir.no.
- Systemtilbyder registrert i Altinn. Dette gjøres via API for systemleverandør.
- Systemintegrasjon registrert i Maskinporten test.

## Oppsett av referanseimplementasjon med egen konfigurasjon

En referanseimplementasjon er utviklet for å demonstrere bruk av systembruker. Den er utviklet i C# og kan kjøres som en konsollapplikasjon.

Den gjør følgende:

Oppretter et token basert på konfigurert JSON Web Key, klient-ID, scope og organisasjonsnummeret til systembrukeroppretteren.

Basert på mottatt token, gjør den kall mot referanse-API-er som krever systembruker.

Se kode med dokumentasjon [her](https://github.com/TheTechArch/altinn-systemuser).

## Oppsett av referanseimplementasjon med egen konfigurasjon

Repositoryet inneholder nødvendig testsertifikat for å kjøre applikasjonen. Følgende må gjøres for å sette opp en egen integrasjon som systemtilbyder:
{.floating-bullet-numbers-sibling-ol}

1. Logg inn på [onboarding Maskinporten](https://onboarding.test.maskinporten.no/). Her kan du bruke en testidentitet som er daglig leder i en testvirksomhet.

   ![Onboarding](onboarding1.png "Forenklet onboarding")

   ![Onboarding](onboarding2.png "Velg virksomhet")

   ![Onboarding](onboarding3.png "Oversikt over integrasjoner i Maskinporten. Her kan du legge til nye")

   ![Onboarding](onboarding4.png "Opprett integrasjon, søk etter nødvendig scope")

   ![Onboarding](onboarding5.png "Legg til eventuelle ekstra scope og beskriv integrasjonen")

   ![Onboarding](onboarding6.png "Last ned genererte nøkler")

   ![Onboarding](onboarding7.png "Integrasjon opprettet")

2. Få systemet registrert i Systemregisteret med korrekt klient-ID og kobling til nødvendige ressurser/tilgangspakker.

3. Logg inn med en testbruker på tt02.altinn.no. Brukeren må ha tilgangsstyringsrollen i Altinn for en testorganisasjon og gå til siden [https://authn.ui.tt02.altinn.no/authfront/ui/auth/creation](https://authn.ui.tt02.altinn.no/authfront/ui/auth/creation).
   ![Onboarding](delegering1.png "Velg et system")

   ![Onboarding](delegering2.png "Godkjenn opprettelse av systembruker med spesifisert rettighet")

   ![Onboarding](delegering3.png "Systembruker oversikt for test organisasjon")

4. Konfigurer nøkkel, sertifikat, klient-ID og scope i testapplikasjonen.

   ```csharp
   string clientID = "7ee41fce-9f6e-4c32-8195-0fe2c1517f43";
   string scope = "altinn:systembruker.demo";
   string systemUserOrg = "210493352";
   string pemCertificatePath = @".\mp-key.pem";
   ```

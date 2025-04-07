---
title: Kom i gang med Systembruker
linktitle: Systembruker
description: Her finner informasjon om hvordan komme i gang med Systembruker
toc: false
weight: 3
---

1. Ressurseier lager tjenste</br>
   Ressurseier lager ressurs med behov for tilgangsstyring. Dette kan være en app i Altinn Studio eller API ressurseiers egen plattform
Tjenesten kan kreve egne scopes som ressurseier selv styrer tilgang til.
2. Maskinportenklient</br>
   Sluttbrukersystemleverandør må ta i bruk 
   [Maskonporten som konsument](https://samarbeid.digdir.no/maskinporten/konsument/119).
   <!-- Bør vi si noe om orgnr for test -->
3. Avtale systembruker
   Sluttbrukersystemleverandør kontakter Digdir for å få tilgang til systembruker scopes
   <!-- Anbefale å bruke reelt orgnr for piloter. Si noe om at orgnr må være samme som for scope man har oss ressurseier-->
4. Registrere sluttbrukersystem i Systemregister
   Sluttbrukersystemleverandør registrerer sluttbreukersystemet i Digdirs systemregister. Under registerring angir man bland annet nødvendige fullmaketer 
5. Systembruker</br>
   Systembrukere kan opprettes på to måter</br>
   * Sluttbrukerstyrt opprettelse: I denne flyten velger sluttbruker sluttbrukersystem fra liste på altinn.no</br>
   * Leverandørdstyrt opprettelse: I denne flyten initierer sluttbrukersystemet opprettelsen når kunen er i sluttbrukersystemet, sender sluttbruker inn i altinn for godkjennelse. Etter godkjenning sendes sluttbruker tilbake til sluttbrukersystem</br>
6. Test og Produksjonssetting </br>
   For å få tilgang til systembruker-scopes i produksjonsmiljø kreves det at det er gjennomført test av sluttbrukersystemleverandør i Digdirs testmlijø, samt at leverandør underskriver avtale om bruk av systembruker


Se [Samarbeisportalen](https://samarbeid.digdir.no/altinn/systembruker/2542) for illustrert og webinar.

### Systembruker for sluttbrukersystemleveran
Detaljert teknisk beskrivelse av steg for sluttbrukersysetmleverandør finnes [her](../../guides/systemauthentication-for-systemproviders).

### Systembruker for ressurseier
Detaljert teknisk beskrivelse av steg for ressurseier finnes [her](../../guides/systemauthentication-for-apiproviders).

### Demoklient
For en demo av hvordan leverandørstyrt opprettelsee kan se ut, så vår demolklient [SmartCloud](http://smartcloudaltinn.azurewebsites.net).</br>
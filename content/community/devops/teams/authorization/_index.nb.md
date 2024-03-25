---
title: Autorisasjon
description: Autorisasjon DevOps team har hovedsaklig ansvar for løsninger som leverer Autentisering og Autorisasjonsfunksjonalitet i Altinn 2 og Altinn 3 løsningen
---

## Ansvar i Altinn 3:
Autorisasjonsteamet har ansvar for følgende tjenester på Altinn 3 plattformen.
Dette inkluderer oppgaver som utvikling av ny funksjonalitet, feilretting, drift og support. 

### Autentisering
Autentiseringskomponenten sørger for å autentisere brukere og systemer som får tilgang til Altinn Apps og Altinn-plattformen.

[Repository for Authentication](https://github.com/Altinn/altinn-authentication)

### Auditlogg

[Repository for Auth-audit-log](https://github.com/Altinn/altinn-auth-audit-log)

### Resource Registry
- [Repository for resource registry](https://github.com/Altinn/altinn-resource-registry)
- [Studio for Resource Registry](https://github.com/Altinn/altinn-studio), kun det som gjelder ressursadministrasjonsfunskjonalitet

### Autorisasjon
Autorisasjonskomponentene gir tilgangsstyring og tilgangskontroll for tjenester til offentlige tjenester. Dette gjelder tjenester på og utenfor Altinn-plattformen.
Løsningen er dokumentert [her](/authorization/).

- [Repository for authorization](https://github.com/Altinn/altinn-authorization)
- [Repository for access policies](https://github.com/Altinn/altinn-access-policies)
- [Repository for access groups](https://github.com/Altinn/altinn-access-groups)

- [Repository for access management](https://github.com/Altinn/altinn-access-management)
- [Repository for access management frontend](https://github.com/Altinn/altinn-access-management-frontend)
- [Repository for Design system used in access management frontend](https://github.com/Altinn/altinn-design-system)

### Tools
- [Repository for Altinn-tools](https://github.com/Altinn/altinn-tools)
- [Repository for Altinn2-test-apiclient](https://github.com/Altinn/altinn2-test-apiclient)
- [Repository for Postman examples in Altinn 2 API](https://github.com/Altinn/postman-examples)
- [Repository for MaskinportAPI postman in Altinn 2 API](https://github.com/Altinn/MaskinportenApiPostman)

### Documentation
Documentation related to Authentication and Authorization
- [Altinn 2 docs](https://github.com/Altinn/docs)
- [Altinn 3 docs](https://github.com/Altinn/altinn-studio-docs)
- [Altinnpedia](https://github.com/Altinn/altinnpedia)
- [Postmortems](https://github.com/Altinn/altinn-devops-postmortem)
- [Roadmap for Authorization/Authentication](https://github.com/orgs/digdir/projects/8/views/5)
## Ansvar i Altinn 2: 
Autorisasjonsteamet har ansvar for følgende tjenester på Altinn 2 plattformen.
Dette inkluderer support, feilretting og nødvendig videreutvikling for å sikre migering av tjenester fra Altinn 2 til Altinn 3. 
Hendelser av kritisk karakter (support saker eller feilretting) håndteres ikke av Autorisasjonsteamet på Altinn 2. 

### Samtykketjenesten
Med samtykke/fullmakt kan du be om lov til å hente/dele data det offentlige har om en innbygger eller virksomhet, eller utføre noe på vegne av dem. 
Du får da midlertidig innsyns- eller handlingsrett på et spesifikt sett med opplysninger eller tjenester fra brukeren. Dette kan for eksempel være ligningsdata fra Skatteetaten.
[Les mer her](https://altinn.github.io/docs/utviklingsguider/samtykke/)

### Styring av tilgang
Altinn kan benyttes til autorisasjon og tilgangskontroll for eksterne tjenester, altså tjenester på andre nettsteder enn i Altinn-plattformen.
Altinn Autorisasjon kan benyttes av tjenesteeiere som ønsker å tilgjengeliggjøre informasjon og tjenester på egen plattform og nettsted, men ikke kan utføre en full autorisasjon av brukers tilganger.
[Les mer her](https://altinn.github.io/docs/utviklingsguider/styring-av-tilgang/for-tjenesteeier/)

### Styring av tilgang til API
Maskinporten er delen av den felles nasjonale innloggingsløsningen som Digdir tilbyr for sikring av API-tilganger via maskin-til-maskin-autentisering og en OAuth2-scope basert autorisasjonsmekanisme.
I Altinn er det utvklet en løsning som gjør det mulig for virksomheter som er gitt tilgang til et API gjennom Maskinporten å gi denne videre til for eksempel en leverandør som skal utføre den tekniske implementasjonen på deres vegne.
[Les mer her](https://altinn.github.io/docs/utviklingsguider/api-delegering/)

### Brukere og autentisering av disse
Altinn 2 tilbyr følgende brukertyper: personer (pnr/dnr), organisasjoner (orgnr), virksomhetsbrukere, selvidentfiserte brukere, datasystem (systemID)
Autentisering via Portal og i API inkl integrasjon mot IDporten, Maskinporten og Altinn-spesifikke autentiseringsløsninger

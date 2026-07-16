---
title: Arkitekturmønstre i Access Management
linktitle: Arkitekturmønstre
description: Mønstre som brukes til å dele API-er, modellere tilgangsforhold, berike attributter og håndtere sideeffekter i Access Management.
weight: 1
toc: true
---

Access Management har vokst gjennom flere generasjoner av tilgangsstyring. Koden kombinerer derfor nye mønstre med eldre tjenester som fortsatt er i bruk. Denne siden beskriver dagens kode, ikke en anbefaling om at andre komponenter skal kopiere alle løsningene.

## Konsumentspesifikke API-flater over felles kjerne

Access Management har egne API-prosjekter for sluttbrukere, tjenesteeiere, virksomheter, Maskinporten, metadata og interne konsumenter. Hver flate eier sine controllere, kontrakter og sikkerhetsgrenser, mens domenetjenester, integrasjoner og persistens deles.

Dette er en modulær vert med flere API-fasader. Oppdelingen er fysisk i prosjektstrukturen, men flere API-er kan settes sammen i samme kjørbare vert.

**Fordeler**

- Hver konsument får et avgrenset API og et tydeligere sikkerhetsområde.
- Interne modeller trenger ikke bli offentlige kontrakter.
- API-flatene kan utvikles og prøves uten å kopiere domenelogikken.

**Ulemper**

- Felles oppstart og avhengighetsregistrering kan bli omfattende.
- Lik OpenAPI-, autentiserings- og valideringskode kan bli duplisert mellom prosjektene.
- Prosjektgrensene garanterer ikke kjøretidsisolasjon når flere flater deler vert.

**Eksempler i koden**

- [`AccessManagementHost` setter sammen kjerne, persistens, integrasjoner og API-moduler](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement/AccessManagementHost.cs).
- [`AccessManagementEnduserHost` registrerer sluttbrukerflatens tjenester](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Api.Enduser/AccessManagementEnduserHost.cs).
- [`AccessManagementServiceOwnerHost` konfigurerer tjenesteeierens API](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Api.ServiceOwner/AccessManagementServiceOwnerHost.cs).

## Gradvis erstatning av eldre arkitektur

Kodebasen inneholder både `Altinn.AccessManagement.Core` og den nyere `Altinn.AccessMgmt.Core`, samt to persistensområder. Den kjørbare verten registrerer begge. Nye API-er og tjenester kan dermed innføres ved siden av eldre flyter og slås på med funksjonsbrytere.

Dette ligner innkapslingsmønsteret, ofte kalt «strangler pattern»: ny funksjonalitet legges rundt eller ved siden av den gamle, og trafikk flyttes gradvis. Det er en overgangsarkitektur, ikke et ønsket permanent skille.

**Fordeler**

- Teamet kan flytte én flyt om gangen uten en risikofylt totalomskriving.
- Funksjonsbrytere gir kontrollert innføring og raskere tilbakerulling.
- Gamle kontrakter kan fortsette å virke mens nye modeller etableres.

**Ulemper**

- To kjerner og persistensmodeller gjør det vanskeligere å vite hvor ny kode hører hjemme.
- Avhengigheter kan krysse de gamle og nye grensene og gjøre senere opprydding dyrere.
- Begreper og regler kan få to implementasjoner som utvikler seg ulikt.
- Funksjonsbrytere som blir stående, øker antallet kombinasjoner som må prøves og driftes.

**Eksempler i koden**

- [`AccessManagementHost` registrerer både eldre og nyere komponenter](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement/AccessManagementHost.cs).
- [`AccessMgmtFeatureFlags` samler brytere for nyere flyter og bakgrunnstjenester](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.Core/AccessMgmtFeatureFlags.cs).
- [`AssignmentService` bruker den nyere EF-baserte tilgangsmodellen sammen med eldre kontrakter](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.Core/Services/AssignmentService.cs).

## Resolvergraf for attributtberikelse

Autorisasjons- og valideringsflyter kan starte med noen få attributter, for eksempel en URN eller partsidentifikator, og trenge flere. Resolverne danner et tre med interne noder og bladfunksjoner. Hver bladfunksjon beskriver hvilke attributter den trenger og hvilke den kan finne. Treet kjøres til ingen nye attributter blir lagt til.

Mønsteret kombinerer en resolverkjede med en avhengighetsgraf og fastpunktberegning. Kalleren ber om ønskede attributter uten å kjenne alle mellomstegene.

**Fordeler**

- Oppslag og avhengigheter mellom attributter blir gjenbrukbare.
- Bare resolvere som kan bidra til ønsket resultat, trenger å kjøre.
- Uavhengige grener kan kjøres parallelt.

**Ulemper**

- Den faktiske kallkjeden bestemmes under kjøring og kan være vanskelig å følge.
- Feil avhengighetsbeskrivelse kan gi manglende attributter eller unødvendige oppslag.
- Parallelle resolvere krever at resultatsamlingen og eksterne klienter tåler samtidighet.
- En graf som vokser, trenger beskyttelse mot sykluser og uventet kostbare oppslag.

**Eksempler i koden**

- [`AttributeResolver` går gjennom treet til resultatet ikke lenger endres](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Core/Resolvers/AttributeResolver.cs).
- [`UrnResolver` er roten for Altinn-resolverne](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Core/Resolvers/UrnResolver.cs).
- [`AltinnOrganizationResolverTests` kontrollerer en konkret gren](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/test/AccessMgmt.Tests/Unit/Resolvers/Altinn/AltinnOrganizationResolverTests.cs).

## Sette sammen valideringsregler

Valideringsregler uttrykkes som små funksjoner som skriver strukturerte feil. `Asserter<T>` kan kombinere dem med `All`, `Any` og `Single`. Domeneutvidelser beskriver konkrete regler for blant annet attributtkombinasjoner og delegerbarhet.

Dette er specification- og composite-lignende mønstre: små predikater settes sammen til større regler, men resultatet er `ValidationProblemDetails` fremfor bare sann eller usann.

**Fordeler**

- Små regler kan gjenbrukes og kombineres.
- Flere feil kan returneres i samme svar.
- Kombinasjonsreglene blir eksplisitte og kan prøves isolert.

**Ulemper**

- Egen kombinatorlogikk kan være uvant og må ha presise tester.
- Navn som `Any` og `Single` kan misforstås uten kjennskap til feilsemantikken.
- Regler fordelt mellom generiske kombinatorer og utvidelsesmetoder kan være vanskelige å finne.

**Eksempler i koden**

- [`Asserter<T>` kombinerer regler og bygger valideringsfeil](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Core/Asserters/Asserter.cs).
- [`AttributeMatchAsserter` definerer domenereglene](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Core/Asserters/AttributeMatchAsserter.cs).
- [`AsserterTests` kontrollerer kombinatorenes semantikk](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/test/AccessMgmt.Tests/Unit/Asserters/AsserterTests.cs).

## Grafmodell for tilgangsforhold

Den nyere datamodellen representerer aktører som `Entity` og forbindelser som `Assignment` eller `Delegation`. Roller beskriver typen forbindelse. Tilgangspakker, ressurser og instanser kobles til forbindelsen gjennom egne koblingstabeller. Dermed kan samme grunnmodell uttrykke flere typer tilgangsforhold.

Dette er en relasjonell grafmodell: noder og kanter lagres i PostgreSQL-tabeller, ikke i en egen grafdatabase. `ConnectionQuery` samler traversering og projeksjon til resultatmodeller.

**Fordeler**

- Felles begreper kan uttrykke roller, pakker, ressurser og delegeringskjeder.
- Nye koblingstyper kan ofte legges til uten et eget toppnivådomene.
- Relasjonsdatabasen beholder transaksjoner, fremmednøkler og kjent driftsmodell.

**Ulemper**

- Spørringene får mange sammenføyninger og kan være vanskelige å optimalisere.
- Generelle navn som `Entity` og `Assignment` skjuler domenebetydningen uten god dokumentasjon.
- Dype eller rekursive forbindelser kan bli kostbare i en relasjonsdatabase.
- En svært fleksibel modell trenger sterke regler for å hindre ugyldige kombinasjoner.

**Eksempler i koden**

- [`Assignment` modellerer en rettet forbindelse med en rolle](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Models/Assignment.cs).
- [`Delegation` representerer videreføring av en tildeling](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Models/Delegation.cs).
- [`ConnectionQuery` finner forbindelser på tvers av tildelinger, delegeringer og hierarki](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Queries/Connection/ConnectionQuery.cs).
- [`ConnectionQueryTests` kontrollerer grafspørringene mot PostgreSQL](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/test/AccessMgmt.Tests/Integration/Services/ConnectionQueryTests.cs).

## Spørringsobjekter over Entity Framework

Komplekse leseflyter er samlet i egne spørringsklasser og filterobjekter. De bygger EF-spørringer, velger retning og datakilder og projiserer til egne resultatmodeller. Dette skiller krevende leselogikk fra skrivende domenetjenester.

**Fordeler**

- Kompleks spørringslogikk kan prøves og optimaliseres samlet.
- Filterobjektet gjør valgmulighetene eksplisitte.
- `AsNoTracking` og projeksjon kan redusere kostnaden for rene lesinger.

**Ulemper**

- Abstraksjonen kan skjule hvilken SQL og hvor mange kall EF faktisk lager.
- Mange valg i ett spørringsobjekt kan utvikle seg til en ny monolitt.
- Ytelsesgrep som avhenger av PostgreSQLs spørringsplan, krever databasebaserte tester og målinger.

**Eksempler i koden**

- [`ConnectionQuery` kapsler inn den komplekse leselogikken](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Queries/Connection/ConnectionQuery.cs).
- [`ConnectionQueryFilter` beskriver avgrensningene](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Queries/Connection/ConnectionQueryFilter.cs).
- [`ConnectionQueryFilterTest` kontrollerer filterkombinasjonene](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/test/AccessMgmt.Tests/Unit/Queries/ConnectionQueryFilterTest.cs).

## Revisjonsspor og transaksjonell utboks

EF-modellen har revisjonsfelter og egne revisjonsmodeller. Kalleren sender `AuditValues` til en utvidet `SaveChangesAsync`, slik at hvem eller hvilket system som endret dataene, følger databaseendringen. For sideeffekter som varsling lagres en utboksmelding (outbox) sammen med domenedataene. En bakgrunnsjobb henter meldingen, finner riktig handler og registrerer utfallet.

Utboksmønsteret løser dobbelskrivingsproblemet mellom database og ekstern tjeneste: committen inneholder både domenetilstanden og bestillingen av sideeffekten. Selve sideeffekten skjer senere og er ikke del av databasetransaksjonen.

**Fordeler**

- Revisjonsinformasjon blir en del av den vanlige lagringsflyten.
- En vellykket commit mister ikke bestillingen av varslingen.
- Eksterne feil kan prøves på nytt uten å rulle tilbake domenedataene.
- Handlerlogg og status gir grunnlag for feilsøking.

**Ulemper**

- Sideeffekten er etter hvert konsistent og kan komme forsinket.
- Meldinger kan behandles flere ganger; handleren og mottakeren må bruke idempotens.
- Utbokstabeller trenger opprydding, overvåking og håndtering av meldinger som alltid feiler.
- Revisjonsdata er bare pålitelige dersom alle skrivende kall sender korrekt `AuditValues`.

**Eksempler i koden**

- [`AuditExtensions` utvider lagringen med revisjonsverdier](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Extensions/AuditExtensions.cs).
- [`OutboxMessage` er den lagrede bestillingen av sideeffekten](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Models/OutboxMessage.cs).
- [`OutboxHandlerJob` låser, behandler og oppdaterer utboksmeldinger](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.Core/HostedServices/Outbox/OutboxHandlerJob.cs).
- [`RightholderAddedNotificationHandler` lager en idempotensnøkkel for varslingen](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.Core/Outbox/RightholderAddedNotificationHandler.cs).
- [`OutboxHandlerJobTest` kontrollerer behandlingsløpet](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/test/Altinn.AccessMgmt.Core.Tests/Integration/HostedServices/Outbox/OutboxHandlerJobTest.cs).

## Når mønstrene bør gjenbrukes

Mønstrene løser ulike problemer og bør ikke innføres som én samlet standard. Før et mønster gjenbrukes, bør teamet avklare om komponenten har samme behov for flere API-flater, gradvis migrering, grafspørringer, attributtberikelse eller pålitelige sideeffekter. Teamet må også kunne prøve feiltilstander, forklare den indirekte flyten og drifte tilhørende bakgrunnsprosesser.
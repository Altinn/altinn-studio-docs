---
title: Arkitekturmønstre i Register
linktitle: Arkitekturmønstre
description: Mønstre som brukes til å strukturere forespørsler, transaksjoner, datastrømmer og bakgrunnsarbeid i Altinn Register.
weight: 1
toc: true
---

Register bruker flere mønstre som ikke finnes, eller ikke brukes på samme måte, i de andre applikasjonene i Altinn Autorisasjon. Denne siden forklarer hensikten med de viktigste mønstrene og peker til representative kodeeksempler.

Dette er beskrivelser av dagens kode, ikke krav om at andre komponenter skal bruke de samme løsningene. Teamet bør vurdere kompleksiteten, kompetansen og driftsbehovet før et mønster gjenbrukes.

## Forespørsel og handler med valgfri datakilde

Register skiller en operasjon fra koden som utfører den. En forespørsel er en typet verdi som beskriver hva som skal gjøres. En handler utfører operasjonen og returnerer et typet resultat. En egen mediator sender forespørselen til riktig handler.

Mønsteret ligner mediator- og request/handler-mønstrene. Det er ikke en fullstendig CQRS-arkitektur: koden bruker skillet til å organisere operasjoner og velge implementasjon, ikke til å etablere egne lese- og skrivemodeller for hele applikasjonen.

Register har ofte to handlere for samme forespørsel. Den ene henter data fra Altinn 2-broen, mens den andre bruker Register-databasen. Mediatoren velger handler fra konfigurasjonen for hvert endepunkt. Dette er også strategimønsteret: implementasjonen kan byttes uten at controlleren eller forespørselen endres.

**Fordeler**

- Controllerne kobles til operasjonen, ikke til en bestemt datakilde.
- Teamet kan flytte ett endepunkt om gangen fra Altinn 2 til den nye databasen.
- Handlerne kan prøves hver for seg med tydelige inn- og uttyper.
- Valget av datakilde er samlet og kan endres gjennom konfigurasjon.

**Ulemper**

- Flyten blir indirekte: utvikleren må følge forespørselen gjennom mediatoren til valgt handler.
- Den egenutviklede mediatoren krever lokal kunnskap og vedlikehold.
- To handlere kan gi duplisert logikk eller ulik oppførsel dersom testene ikke dekker begge.
- Mediatoren henter handlere fra avhengighetsbeholderen. Det gjør de faktiske avhengighetene mindre synlige enn ved direkte konstruktørinjeksjon.

**Eksempler i koden**

- [`RegisterMediator` velger A2- eller databasehandler](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/Mediator/RegisterMediator.cs).
- [`ApiSourceSwitchProvider` leser og mellomlagrer valget per endepunkt](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/Mediator/ApiSourceSwitchProvider.cs).
- [`GetV1PartyIdentifiers` har to handlere for samme forespørsel](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/Operations/GetV1PartyIdentifiers.cs).

## Unit of Work og lagringspunkter

Unit of Work samler operasjoner som skal lykkes eller rulles tilbake som én enhet. I Register oppretter `IUnitOfWorkManager` et avgrenset tjenesteområde med deltakere. PostgreSQL-deltakeren eier databasetilkoblingen og en transaksjon med isolasjonsnivået `RepeatableRead`. Koden kan også opprette lagringspunkter og rulle tilbake deler av transaksjonen uten å forkaste hele arbeidet.

**Fordeler**

- Flere persistensoperasjoner kan dele én transaksjon og ett konsistent øyeblikksbilde av dataene.
- Commit og rollback styres eksplisitt.
- Ressurser ryddes automatisk med `await using` når enheten avsluttes.
- Lagringspunkter gjør det mulig å håndtere en avgrenset feil innenfor en større transaksjon.

**Ulemper**

- En transaksjon som lever lenge, kan holde låser og databaseforbindelser lenger enn ønskelig.
- Utvikleren må forstå levetiden til både Unit of Work og tjenestene den eksponerer.
- Høyere isolasjonsnivå kan gi flere konflikter eller omstarter ved samtidig skriving.
- Lagringspunkter øker kontrollen, men også antallet mulige tilstander i feilbehandlingen.

**Eksempler i koden**

- [`IUnitOfWork` definerer commit, rollback og levetid](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/UnitOfWork/IUnitOfWork.cs).
- [`NpgsqlUnitOfWorkParticipant` oppretter PostgreSQL-transaksjonen](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/UnitOfWork/NpgsqlUnitOfWorkParticipant.cs).
- [`SavePointManager` oppretter, frigir og ruller tilbake lagringspunkter](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/UnitOfWork/SavePointManager.cs).
- [`NpgsqlUnitOfWorkTests` kontrollerer transaksjonsgrensen](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/test/Altinn.Register.Persistence.Tests/NpgsqlUnitOfWorkTests.cs).

## Asynkrone datastrømmer med ressurseierskap

Flere leseoperasjoner returnerer `IAsyncEnumerable<T>` i stedet for å laste hele resultatet i minnet. Konsumenten behandler elementene etter hvert som databasen leverer dem. Register knytter databasetilkoblingen og andre asynkrone ressurser til strømmen, slik at de ryddes når opplistingen avsluttes.

Dette er en kombinasjon av strømming og eksplisitt ressurseierskap. Det siste er viktig fordi selve databasespørringen fortsetter etter at metoden som opprettet strømmen, har returnert.

**Fordeler**

- Store resultater trenger ikke mellomlagres i minnet.
- Konsumenten kan begynne å behandle data før hele spørringen er ferdig.
- Avbrytelsessignalet kan følge opplistingen.
- Ressurseierskapet reduserer faren for at en tilkobling ryddes før strømmen er lest.

**Ulemper**

- Feil kan oppstå under opplistingen, ikke når metoden returnerer.
- Databasetilkoblingen og eventuelt transaksjonen holdes åpne mens konsumenten leser.
- Konsumenten må avslutte opplistingen korrekt, også ved avbrudd og tidlig retur.
- Feilsøking og testing er mer krevende enn for en ferdig materialisert liste.

**Eksempler i koden**

- [`GetV1PartyIdentifiers` strømmer resultatet fra en Unit of Work](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/Operations/GetV1PartyIdentifiers.cs).
- [`ResourceOwningEnumerable` knytter ressurser til strømmen](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/AsyncEnumerables/ResourceOwningEnumerable.cs).
- [`RegisterPersistenceAsyncEnumerableExtensions` overfører ressurseierskap](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/AsyncEnumerables/RegisterPersistenceAsyncEnumerableExtensions.cs).

## Gjentakende jobber med distribuerte låser

Register kjører import- og vedlikeholdsjobber i bakgrunnen. Alle replikaene kan ha den samme jobbregistreringen, men en distribuert, tidsbegrenset lås (lease) avgjør hvilken replika som får kjøre jobben. Låsen har begrenset levetid og fornyes mens jobben kjører. Hvis prosessen mister låsen, avbrytes jobbens avbrytelsessignal.

Låsen gir gjensidig utelukkelse mellom replikaer. Den garanterer ikke at en jobb utføres nøyaktig én gang. Prosesskrasj, tidsavbrudd og nettverksfeil kan føre til at arbeidet startes på nytt. Jobbene bør derfor være idempotente eller kunne fortsette trygt etter delvis arbeid.

**Fordeler**

- Samme containerbilde kan kjøre med flere replikaer uten at alle starter samme importjobb.
- Tidsbegrensede låser gjør at en annen replika kan overta etter feil.
- Jobbrammeverket samler planlegging, livssyklus, avbrudd, logging og målinger.
- `TimeProvider` og egne grensesnitt gjør tidsavhengig oppførsel lettere å prøve.

**Ulemper**

- Korrektheten avhenger av låsens varighet og fornyelse og en felles tidsforståelse.
- En lang stopp eller nettverksfeil kan føre til mistet lås mens arbeidet fortsatt pågår.
- Mønsteret gir ikke «exactly once» og erstatter ikke idempotens.
- Det egenutviklede jobbrammeverket er omfattende og krever særskilt kompetanse.

**Eksempler i koden**

- [`RecurringJobHostedService` planlegger jobber og tar en lås før kjøring](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/ServiceDefaults.Jobs/RecurringJobHostedService.cs).
- [`ILeaseProvider` beskriver anskaffelse, fornyelse og frigivelse](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/ServiceDefaults.Leases/ILeaseProvider.cs).
- [`RegisterHost` registrerer importjobber med egne låser](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register/RegisterHost.cs).
- [`RecurringJobHostedServiceTests` prøver planlegging og låseoppførsel](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/test/Altinn.Register.Tests/Jobs/RecurringJobHostedServiceTests.cs).

## Meldingsbaserte kommandoer og sagaer

Importflytene bruker MassTransit til å sende kommandoer til køer og behandle dem asynkront. `ICommandSender` skjuler transportdetaljene for domenekoden. Lengre importforløp bruker en saga til å bevare tilstand mellom flere meldinger og koordinere neste steg.

En saga er en måte å koordinere en forretningsflyt som går over flere meldinger eller transaksjoner. Den erstatter én stor distribuert databasetransaksjon med flere lokale steg og lagret fremdrift.

**Fordeler**

- Produsent og konsument trenger ikke kjøre samtidig.
- Lange importer kan deles i mindre steg og fortsette etter omstart.
- Køen kan jevne ut belastningstopper.
- Transporten kan byttes eller erstattes i tester bak `ICommandSender`.

**Ulemper**

- Resultatet blir etter hvert konsistent, ikke atomisk på tvers av hele flyten.
- Meldinger kan bli levert flere ganger eller i uventet rekkefølge; konsumentene må håndtere dette.
- Feilsøking krever korrelasjon på tvers av meldinger, konsumenter og sagatilstand.
- Endringer i meldingskontrakter og sagatilstand krever kompatibilitetsplanlegging.

**Eksempler i koden**

- [`ICommandSender` er grensen mellom domenekode og meldingstransport](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/ServiceDefaults.MassTransit.Abstractions/ICommandSender.cs).
- [`CommandSender` slår opp kø og sender kommandoen med MassTransit](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/ServiceDefaults.MassTransit/Commands/CommandSender.cs).
- [`SagaContext` kombinerer melding, sagatilstand og neste kommando](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/ImportJobs/SagaContext.cs).
- [`SagaManager` koordinerer A2-importflyten](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register/PartyImport/A2/SagaManager.cs).

## Sammensatte og mellomlagrede SQL-spørringer

Persistenslaget bygger SQL-spørringer ut fra hvilke felter og filtre operasjonen trenger. Hver kombinasjon blir mellomlagret og gjenbrukt. Øyeblikksbildetester kontrollerer den genererte SQL-en for alle støttede varianter.

Dette ligner query object-mønsteret: oppbyggingen av en spørring kapsles inn i et objekt i stedet for å spres mellom kallestedene. Register kombinerer mønsteret med mellomlagring fordi variantene er avgrensede og brukes ofte.

**Fordeler**

- API-et kan hente bare feltene som operasjonen trenger.
- Spørringsoppbyggingen ligger samlet og kan optimaliseres uavhengig av kallestedet.
- Mellomlagring reduserer gjentatt arbeid for samme variant.
- Øyeblikksbildetestene gjør endringer i generert SQL synlige i kodegjennomgangen.

**Ulemper**

- Antallet kombinasjoner øker når nye felt og filtre legges til.
- Dynamisk generert SQL er vanskeligere å lese enn en enkelt, statisk spørring.
- Mellomlageret forutsetter at spørringsobjektene er uforanderlige og trygge å dele.
- Øyeblikksbildetester kan bekrefte at SQL-en er stabil uten å bevise at den er effektiv med produksjonsdata.

**Eksempler i koden**

- [`PartyQuery` bygger og mellomlagrer spørringsvariantene](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/PostgreSqlPartyPersistence.PartyQuery.cs).
- [`PostgreSqlPartyPersistence` velger spørring fra felt og filtre](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/PostgreSqlPartyPersistence.cs).
- [`PartyQueryTests` kontrollerer SQL-varianter med snapshots og tester mellomlageret](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/test/Altinn.Register.Persistence.Tests/PartyQueryTests.cs).

## Når mønstrene bør gjenbrukes

Et mønster bør løse et konkret problem, ikke innføres bare for å gjøre kodebasene like. Før et annet team gjenbruker et Register-mønster, bør teamet spørre:

- Har vi samme problem med datamengde, migrering, transaksjoner eller flere replikaer?
- Finnes det et standardbibliotek eller en enklere løsning som dekker behovet?
- Har teamet kompetanse og kapasitet til å drifte og videreutvikle mønsteret?
- Kan vi kontrollere feiltilstander, avbrudd og samtidighet med automatiserte tester?
- Hvordan påvirker mønsteret observabilitet og feilsøking i produksjon?

Kompleksiteten er berettiget når den beskytter en viktig egenskap ved systemet. Hvis egenskapen ikke er relevant for den aktuelle komponenten, er en enklere løsning vanligvis et tryggere valg.
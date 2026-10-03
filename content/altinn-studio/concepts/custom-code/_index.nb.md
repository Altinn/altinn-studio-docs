---
title: Egendefinert kode
description: Når og hvorfor du kan trenge å legge til egendefinert kode i appen din
weight: 40
---

Selv om Altinn Studio gir deg mulighet til å bygge mange apper uten å måtte skrive kode, finnes det situasjoner hvor 
egendefinert kode er nødvendig for å dekke dine spesifikke behov. Denne artikkelen beskriver de vanligste scenarioene hvor 
du kan trenge å legge til egendefinert kode i appen din.

## Når trenger du egendefinert kode?

### Ved oppstart av tjenesten (instansiering)

Når en bruker starter en ny instans av appen din, kan du ha behov for å:

- **Validere om brukeren har lov til å starte tjenesten** - for eksempel basert på tidspunkt, brukertype eller andre forretningsregler utover tilgangsreglene som er satt i appen.
- **Forhåndsutfylle skjemaet med data** - hente informasjon fra eksterne kilder eller basert på brukerens profil.
- **Sette opp spesifikke konfigurasjoner** - tilpasse appen basert på f.eks. hvem som starter den.

**Eksempel:** En søknadstjeneste som bare kan startes av organisasjoner innenfor bestemte næringer, eller som må forhåndsutfylles med informasjon fra egne systemer.

### Ved innlasting og/eller endring av data

Under utfylling av skjemaet kan det være nødvendig å:

- **Beregne verdier automatisk** - for eksempel summere opp tall, beregne prosentsatser eller kalkulere avgifter basert på det brukeren fyller inn.
- **Overføre verdier mellom felter** - kopiere eller transformere data fra ett felt til et annet.
- **Hente data fra eksterne kilder** - slå opp informasjon basert på det brukeren fyller inn.
- **Validere komplekse forretningsregler** - sjekke sammenhenger mellom flere felter eller mot eksterne systemer.

**Eksempel:** Et regnskapsskjema som automatisk beregner moms og sum når brukeren fyller inn beløp, eller et personfelt som henter utvidet data fra folkeregisteret.

### Når arbeidsflyten flyttes til neste steg

Ved overgang mellom steg i prosessen kan du trenge å:

- **Utføre kompleks validering** - sjekke at alle nødvendige data er fylt ut korrekt og konsistent
- **Kalle eksterne tjenester** - sende data videre til andre systemer eller hente tilleggsopplysninger
- **Oppdatere datamodellen** - legge til metadata eller status som ikke er synlig for brukeren
- **Kontrollere tilganger** - sjekke om brukeren har lov til å gå videre basert på forretningslogikk

**Eksempel:** Et godkjenningsflow hvor systemet må sjekke mot et eksternt register før saken kan sendes videre til behandling.

### Når brukeren trykker på egendefinerte handlingsknapper

For å gi brukeren tilgang til spesialiserte funksjoner kan du lage egendefinerte knapper som:

- **Henter og viser tilleggsdata** - for eksempel en "Hent saldo"-knapp som viser oppdatert kontoinformasjon
- **Starter eksterne prosesser** - utfører handlinger i andre systemer uten å forlate appen
- **Beregner komplekse verdier** - kjører avanserte kalkulasjoner basert på brukerens input
- **Validerer spesifikk informasjon** - sjekker gyldigheten av ID-nummer, kontonummer eller lignende

**Eksempel:** En "Valider organisasjonsnummer"-knapp som slår opp i Brønnøysundregistrene og viser informasjon om organisasjonen.

### Når appen laster dynamiske kodelister

For å tilby brukerne relevante valg kan du trenge å:

- **Filtrere valg basert på tidligere input** - vise kun kommuner i det valgte fylket
- **Hente oppdaterte data fra eksterne kilder** - sikre at kodelister alltid er ajour
- **Tilpasse valg basert på brukerens kontekst** - vise forskjellige alternativer for privatpersoner og bedrifter
- **Sikre sensitive kodelister** - kontrollere at brukeren har tilgang til å se spesifikke valg

**Eksempel:** En dropdown for "velg lege" som bare viser leger tilknyttet den valgte legesenteret, eller en kodeliste over tilgjengelige tjenester som oppdateres i sanntid.

## Hva kan du oppnå med egendefinert kode?

Egendefinert kode gir deg mulighet til å:

- **Integrere med eksterne systemer** - hente og sende data til andre offentlige registre eller private systemer
- **Implementere komplekse forretningsregler** - håndtere logikk som går utover standard validering
- **Optimalisere brukeropplevelsen** - automatisere oppgaver og redusere manuell utfylling
- **Sikre datakvalitet** - validere og korrigere data underveis i prosessen
- **Tilpasse funksjonalitet** - lage spesialiserte løsninger for ditt bruksområde

## Videre lesning

For å lære hvordan du implementerer egendefinert kode, se følgende dokumentasjon for eksempler:

- [Instansiering](/nb/altinn-studio/reference/logic/instantiation/) - valideringer og preutfylling ved oppstart
- [Dataprosessering](/nb/altinn-studio/reference/logic/dataprocessing/) - kalkuleringer og datamanipulering
- [Validering](/nb/altinn-studio/reference/logic/validation/) - egendefinerte valideringsregler
- [Prosesshandlinger](/nb/altinn-studio/reference/process/actions/) - egendefinerte knapper og handlinger
- [Dynamiske kodelister](/nb/altinn-studio/guides/development/options/sources/dynamic/) - kodelister generert ved kjøring


Se også [oversikt over alle tilgjengelige grensesnitt som kan implementeres](/nb/altinn-studio/reference/custom-development).

## Vurderinger før du starter

Før du begynner med egendefinert kode, bør du vurdere:

- **Er det virkelig nødvendig?** - kan behovet løses med eksisterende funksjonalitet i Altinn Studio?
- **Kompleksitet vs. nytte** - vil koden gjøre løsningen betydelig mer kompleks enn nødvendig?
- **Vedlikehold** - hvem skal vedlikeholde koden over tid?
- **Testing** - hvordan vil du sikre at koden fungerer som forventet?
- **Ytelse** - vil koden påvirke appens responsivitet negativt?

Med riktig planlegging og implementering kan egendefinert kode gjøre appen din mer kraftfull og brukervennlig, samtidig som den håndterer de spesifikke kravene til ditt bruksområde.
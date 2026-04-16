---
title: "Veiledning for oppsett av systembrukere"
linktitle: "Veiledning for oppsett"
description: "Praktiske anbefalinger for oppsett av systembrukere, tilgangspakker og tilgangskontroll i ulike scenarioer"
weight: 9
---

Denne siden gir konkrete anbefalinger for hvordan du setter opp systembrukere for ulike typer virksomheter.
Veiledningen dekker hvor mange systembrukere du trenger, hvordan du fordeler tilgangspakker, og hvordan du håndterer tilgangskontroll.

Bruk tabellen under for å finne scenarioet som passer situasjonen din, og følg de detaljerte anbefalingene lenger ned.

Se også [wizard](https://systemuserwizard.azurewebsites.net/) som dekker noe av dette.

## Hurtigoversikt

| Scenario | Antall systembrukere | Type systembruker | Tilgangspakker per bruker |
|----------|---------------------|-------------------|---------------------------|
| [A. Virksomheten rapporterer egne data](#a-virksomheten-rapporterer-egne-data) | 1 | Standard | Alle pakkene virksomheten trenger |
| [B. Tjenesteyter med én type klientforhold](#b-tjenesteyter-med-én-type-klientforhold) | 1 | Klientforhold | En eller flere relaterte pakker |
| [C. Tjenesteyter med flere typer klientforhold](#c-tjenesteyter-med-flere-typer-klientforhold) | 1 per relasjonstype | Klientforhold | Pakker som passer hver relasjonstype |
| [D. Tjenesteyter med teambasert tilgang](#d-tjenesteyter-med-teambasert-tilgang) | 1 per team/funksjon | Klientforhold | Pakker som passer hvert team |
| [E. Lokalt installert eller egenutviklet system](#e-lokalt-installert-eller-egenutviklet-system) | 1 | Standard | Alle pakkene virksomheten trenger |
| [F. Regnskapskunder med ulike tjenestebehov](#f-regnskapskunder-med-ulike-tjenestebehov) | 2 | Klientforhold | Grunnpakke + utvidet pakke for utvalgte klienter |
| [G. Kompleks virksomhetsstruktur med organisasjonsledd](#g-kompleks-virksomhetsstruktur-med-organisasjonsledd) | 1 (eller flere ved ulike behov) | Klientforhold | Pakker delegert av hvert organisasjonsledd |
| [H. Kombinere egen rapportering med delegerte klientforhold](#h-kombinere-egen-rapportering-med-delegerte-klientforhold) | 2 (forenkles senere til 1) | Standard + klientforhold | Egne pakker på standard, delegerte pakker på klientforhold |

---

## A. Virksomheten rapporterer egne data

**Typisk eksempel:** En bedrift bruker et sluttbrukersystem til å rapportere mva., aksjonærregister eller andre data på vegne av seg selv.

### Anbefalt oppsett

- **1 systembruker** knyttet til sluttbrukersystemet.
- Systembrukeren får **alle tilgangspakkene** virksomheten trenger for rapportering.
- Systemleverandøren sender en forespørsel om å opprette systembrukeren. Virksomheten godkjenner.

### Slik fungerer det

```text
Virksomheten
  └── Systembruker (standard)
        └── Tilgangspakker: f.eks. "urn:altinn:accesspackage:skatt-naering", "urn:altinn:accesspackage:merverdiavgift"
```

### Viktig å huske

- Systemleverandøren har ansvar for å registrere de riktige tilgangspakkene i systemregisteret.
- Virksomheten trenger bare å godkjenne forespørselen — tilgangspakkene tildeles automatisk.
- Hvis virksomheten trenger flere tjenester senere, oppdaterer systemleverandøren systemregisteret og sender en ny forespørsel.

---

## B. Tjenesteyter med én type klientforhold

**Typisk eksempel:** En registrert regnskapsfører rapporterer [Skattekort til arbeidsgiver – innsending fra system (RF-1211)](https://tjenesteoversikten.no/resource/ske-skattekort-til-arbeidsgiver). for flere klienter. 
Alle klientene har samme type relasjonsforhold (f.eks. registrert regnskapsfører i Enhetsregisteret).

### Anbefalt oppsett

- **1 systembruker for klientforhold** knyttet til sluttbrukersystemet.
- Systembrukeren får **tilgangspakkene som passer klientforholdet** (f.eks. `regnskapsforer-med-signeringsrettighet`).
- En klientadministrator hos tjenesteyteren knytter hver klient til systembrukeren.

### Slik fungerer det

```text
Tjenesteyter (f.eks. regnskapsbyrå)
  └── Systembruker for klientforhold
        ├── Tilgangspakke: regnskapsforer-med-signeringsrettighet
        ├── Klient A
        ├── Klient B
        └── Klient C
```

### Viktig å huske

- Når en klient knyttes til systembrukeren, blir tilgangspakkene **automatisk delegert** til systembrukeren for den klienten.
- Nye klienter legges til av klientadministratoren — det trengs ingen nye systembrukere.
- Systemleverandøren må ha **tilgangskontroll i sluttbrukersystemet** slik at bare autoriserte ansatte kan handle på vegne av hver klient.

---

## C. Tjenesteyter med flere typer klientforhold

**Typisk eksempel:** Et revisjons- og regnskapsbyrå (f.eks. «Rett Revisjon») som har noen klienter som registrert regnskapsfører, noen som revisor 
og noen med organisasjonsdelegerte tilgangspakker. De skal rapportere "Innrapportering A-melding" for alle sine kundetyper

### Anbefalt oppsett

- **1 systembruker per type klientforhold**, hver med tilgangspakkene som passer den relasjonstypen.
- Klientadministratoren fordeler klientene til riktig systembruker basert på relasjonstypen.

### Slik fungerer det

```text
Tjenesteyter (f.eks. Rett Revisjon)
  ├── Systembruker 1 (klientforhold)
  │     ├── Tilgangspakke: regnskapsforer-med-signeringsrettighet
  │     ├── Klient A (registrert regnskapsfører)
  │     └── Klient B (registrert regnskapsfører)
  │
  ├── Systembruker 2 (klientforhold)
  │     ├── Tilgangspakke: ansvarlig-revisor
  │     ├── Klient C (registrert revisor)
  │     └── Klient D (registrert revisor)
  │
  └── Systembruker 3 (klientforhold)
        ├── Tilgangspakke: a-ordning
        ├── Klient E (delegert i Altinn)
        └── Klient F (delegert i Altinn)
```

### Hvorfor separate systembrukere?

Hver tilgangspakke representerer et **ulikt rettslig grunnlag** for å handle på vegne av klienten.
En registrert regnskapsfører har andre rettigheter enn en revisor eller en virksomhet med delegert tilgang.
Ved å skille dem sikrer du at:

- Hver systembruker bare har rettighetene som svarer til det faktiske forholdet.
- Sluttbrukersystemet kan velge riktig systembruker (og token) ved rapportering for en bestemt klient. Dette gjøres ved hjelp av external ref.
- Det finnes et tydelig revisjonsspor for hvilket grunnlag som ble brukt.

### Viktig å huske

- Systemleverandøren må vite **hvilken type relasjonsforhold** tjenesteyteren har med hver klient. Denne informasjonen må deles av tjenesteyteren.
- Ved rapportering må sluttbrukersystemet velge riktig systembrukertoken basert på klientens relasjonstype.
- Nye klienter legges til den **eksisterende systembrukeren** som passer relasjonstypen — det trengs ingen nye systembrukere med mindre en ny relasjonstype kommer til.

---

## D. Tjenesteyter med teambasert tilgang

**Typisk eksempel:** En forretningsfører eller et stort regnskapsbyrå som vil begrense tilgangen til bestemte team eller avdelinger.

### Anbefalt oppsett

- **1 systembruker per team eller funksjon**, hver med tilgangspakkene som er relevante for teamets ansvarsområde.
- Systemleverandøren har brukerstyring slik at bare ansatte i det aktuelle teamet kan bruke hver systembruker.

### Slik fungerer det

```text
Tjenesteyter
  ├── Systembruker 1 (klientforhold) — Forretningsførerteamet
  │     ├── Tilgangspakke: forretningsforer-eiendom
  │     ├── Borettslag A
  │     └── Borettslag B
  │
  └── Systembruker 2 (klientforhold) — Regnskapsteamet
        ├── Tilgangspakke: regnskapsforer-med-signeringsrettighet
        ├── Klient C
        └── Klient D
```

### Viktig å huske

- Systemleverandøren **må ha tilgangskontroll** i sluttbrukersystemet. Altinn vet ikke hvem den enkelte brukeren bak systembrukeren er.
- Definer hvilke ansatte som tilhører hvert team, og hvilken systembruker de kan bruke.
- Dette oppsettet fungerer også i kombinasjon med scenario C (flere relasjonstyper) og teambasert tilgang.

---

## E. Lokalt installert eller egenutviklet system

**Typisk eksempel:** En virksomhet har utviklet sitt eget rapporteringssystem, eller har kjøpt programvare (f.eks. SAP) som er installert på egne servere.

### Anbefalt oppsett

- Virksomheten (kunden som har kjøpt SAP) registrerer seg som **både systemleverandør og systemkunde** i systemregisteret.
- **1 systembruker** knyttet til det lokalt installerte systemet.
- Virksomheten oppretter sin egen Maskinporten-klient og installerer nøkkelen på serveren.

### Slik fungerer det

```text
Virksomheten (= systemleverandør + systemkunde)
  └── Systembruker (standard)
        └── Tilgangspakker: etter behov
```

### Viktig å huske

- Det er **kunden av programvaren** (altså virksomheten som har kjøpt f.eks. SAP) som må få tilgang til Maskinporten — ikke programvareleverandøren.
- Virksomheten må ha en avtale med DigDir for tilgang til systemregisteret.
- Virksomheten må opprette sin egen Maskinporten-klient. Sertifikatet/nøkkelen må **aldri deles** med programvareleverandøren.
- Hvis programvareleverandøren deler nøkkelen sin med virksomheten, kan det føre til misbruk og tilgang til data på tvers av alle leverandørens kunder.

---

## F. Regnskapskunder med ulike tjenestebehov

**Typisk eksempel:** Et regnskapsbyrå utfører regnskapstjenester for alle kundene sine, men noen kunder ønsker i tillegg at byrået håndterer sykmelding og andre NAV-relaterte oppgaver. Disse kundene har delegert ekstra tilgangspakker til regnskapsbyrået.

### Utgangspunkt

- Alle kunder har regnskapsbyrået registrert som regnskapsfører i Enhetsregisteret.
- Noen kunder har i tillegg delegert tilgangspakken for sykmelding (f.eks. `sykmelding`) til regnskapsbyrået via Altinn.
- Regnskapsbyrået trenger å skille mellom kunder som bare har regnskapstjenester og kunder som også har sykmeldingstjenester.

Det finnes to måter å løse dette på. Velg den som passer best for virksomheten din.

### Alternativ 1: Skille kunder etter tjenesteavtale

Her oppretter du separate systembrukere der hver systembruker har alle tilgangspakkene som trengs for den kundegruppen.

**Oppsett:**

- **Systembruker 1** — for rene regnskapskunder. Denne har bare tilgangspakken `regnskapsforer-med-signeringsrettighet`.
- **Systembruker 2** — for kunder som også ønsker sykmeldingstjenester. Denne har tilgangspakkene `regnskapsforer-med-signeringsrettighet` **og** `sykmelding`.
- Klientadministratoren fordeler kundene til riktig systembruker basert på tjenesteavtalen.

```text
Regnskapsbyrå
  ├── Systembruker 1 (klientforhold) — Kun regnskap
  │     ├── Tilgangspakke: regnskapsforer-med-signeringsrettighet
  │     ├── Kunde A (kun regnskap)
  │     ├── Kunde B (kun regnskap)
  │     └── Kunde C (kun regnskap)
  │
  └── Systembruker 2 (klientforhold) — Regnskap + sykmelding
        ├── Tilgangspakke: regnskapsforer-med-signeringsrettighet
        ├── Tilgangspakke: sykmelding (delegert av kunden)
        ├── Kunde D (regnskap + sykmelding)
        └── Kunde E (regnskap + sykmelding)
```

**Fordeler:**

- Enklere å tilordne kunder til riktig systembruker — hver systembruker dekker én tydelig kundegruppe.
- Oversiktlig for klientadministratoren: kundene er sortert etter hva de har avtale om.

**Ulemper:**

- Når en kunde utvider tjenesteavtalen, må kunden **flyttes** fra én systembruker til en annen.
- Hvis det kommer en ny tilleggstjeneste som ikke passer inn i en eksisterende kombinasjon, må du opprette en ny systembruker med den nye kombinasjonen av tilgangspakker. Antall systembrukere vokser med antall **kombinasjoner**, ikke bare antall tjenestetyper.

**Når en kunde utvider tjenesteavtalen:**

1. Kunde B delegerer tilgangspakken `sykmelding` til regnskapsbyrået i Altinn.
2. Klientadministratoren fjerner Kunde B fra Systembruker 1 og legger kunden til Systembruker 2.
3. Sluttbrukersystemet oppdateres slik at Kunde B knyttes til riktig systembruker.

### Alternativ 2: Én felles systembruker for regnskap + egne systembrukere per tilleggstjeneste

Her har alle kunder én felles systembruker for regnskapsarbeidet, mens tilleggstjenester håndteres av egne, spesialiserte systembrukere. Kunder som trenger tilleggstjenester knyttes til **både** den felles regnskapssystembrukeren og den aktuelle tilleggssystembrukeren.

**Oppsett:**

- **Systembruker 1** — felles for alle regnskapskunder. Denne har tilgangspakken `regnskapsforer-med-signeringsrettighet`. Alle kunder knyttes hit.
- **Systembruker 2** — kun for sykmelding. Denne har tilgangspakken `sykmelding`. Bare kunder som har delegert sykmeldingspakken knyttes hit.
- Hvis det kommer nye tilleggstjenester (f.eks. inntektsmelding), oppretter du en **ny systembruker** for den tjenesten uten å endre oppsettet for de andre.

```text
Regnskapsbyrå
  ├── Systembruker 1 (klientforhold) — Regnskap (alle kunder)
  │     ├── Tilgangspakke: regnskapsforer-med-signeringsrettighet
  │     ├── Kunde A
  │     ├── Kunde B
  │     ├── Kunde C
  │     ├── Kunde D
  │     └── Kunde E
  │
  ├── Systembruker 2 (klientforhold) — Sykmelding
  │     ├── Tilgangspakke: sykmelding (delegert av kunden)
  │     ├── Kunde D
  │     └── Kunde E
  │
  └── Systembruker 3 (klientforhold) — Inntektsmelding (eksempel)
        ├── Tilgangspakke: inntektsmelding (delegert av kunden)
        └── Kunde E
```

**Fordeler:**

- Regnskapskunder trenger **aldri flyttes** — de ligger alltid på Systembruker 1.
- Når det kommer en ny tilleggstjeneste, oppretter du bare en **ny systembruker** for den tjenesten og knytter de aktuelle kundene til den. Du trenger ikke slette eller endre eksisterende systembrukere.
- Skalerer godt — antall systembrukere vokser med antall **tjenestetyper**, ikke med antall kombinasjoner av tjenester.
- Sluttbrukersystemet velger systembruker basert på **hvilken tjeneste som utføres**, ikke hvilken kundegruppe kunden tilhører.

**Ulemper:**

- Kunder med tilleggstjenester er knyttet til flere systembrukere. Sluttbrukersystemet må holde oversikt over hvilken systembruker som brukes for hvilken tjeneste.
- Klientadministratoren må vedlikeholde klientkoblinger på flere systembrukere.

**Når en kunde utvider tjenesteavtalen:**

1. Kunde B delegerer tilgangspakken `sykmelding` til regnskapsbyrået i Altinn.
2. Klientadministratoren legger Kunde B til Systembruker 2 (sykmelding). Kunde B forblir på Systembruker 1 (regnskap) som før.
3. Ingen endringer trengs for de andre kundene.

### Hvilket alternativ bør du velge?

| | Alternativ 1: Skille etter tjenesteavtale | Alternativ 2: Felles regnskap + egne tilleggssystembrukere |
|---|---|---|
| **Passer best for** | Få og stabile kombinasjoner av tjenester | Mange eller voksende kombinasjoner av tilleggstjenester |
| **Når kunder utvider** | Kunden flyttes mellom systembrukere | Kunden legges til en ekstra systembruker |
| **Antall systembrukere** | Én per kombinasjon av tilgangspakker | Én for regnskap + én per tilleggstjeneste |
| **Kompleksitet i sluttbrukersystemet** | Velg riktig systembruker per kunde | Velg riktig systembruker per tjeneste |

### Viktig å huske (begge alternativer)

- De ekstra tilgangspakkene (f.eks. `sykmelding`) må **delegeres av kunden selv** — de følger ikke automatisk av regnskapsførerforholdet i Enhetsregisteret.
- Systemleverandøren må registrere systemet med **alle** relevante tilgangspakker i systemregisteret.
- Sluttbrukersystemet må holde oversikt over hvilken systembruker som brukes for hvilken kunde og tjeneste, slik at riktig token velges ved rapportering.

---

## G. Kompleks virksomhetsstruktur med organisasjonsledd

**Typisk eksempel:** Oslo kommune har flere organisasjonsledd (f.eks. Utdanningsetaten og Bydel Grünerløkka) som er egne juridiske enheter med eget organisasjonsnummer. Hvert organisasjonsledd har igjen underenheter — skoler, barnehager, helsestasjoner og andre virksomheter som utfører den daglige driften. Kommunen vil rapportere sentralt for hele strukturen gjennom ett felles sluttbrukersystem.

### Utgangspunkt

- Hovedenheten (Oslo kommune) har flere organisasjonsledd registrert i Enhetsregisteret. Hvert organisasjonsledd er en selvstendig juridisk enhet som eier sine egne rettigheter i Altinn.
- Under hvert organisasjonsledd ligger det underenheter (f.eks. en konkret skole eller helsestasjon). En virksomhet eller bruker som har rettighet for en hovedenhet arver automatisk samme tilganger til underhetene.
- Kommunen vil sentralisere rapporteringen gjennom én systembruker i stedet for å sette opp én systembruker per organisasjonsledd.

### Anbefalt oppsett

- **1 systembruker for klientforhold** knyttet til sluttbrukersystemet som hovedenheten bruker sentralt.
- Hvert organisasjonsledd **delegerer nødvendige tilgangspakker** til hovedenheten i Altinn.
- Klientadministrator hos hovedenheten knytter hvert organisasjonsledd til systembrukeren som klient.
- Rapportering for en underenhet fungerer automatisk så lenge organisasjonsleddet underenheten tilhører, er lagt til som klient. (systembrukeren får da samme tilgang for underenhetene til organisasjonsleddene som han har for organisasjonsleddet selv)

### Slik fungerer det

```text
Oslo kommune (hovedenhet)
  └── Systembruker for klientforhold
        ├── Tilgangspakker: delegert av hvert organisasjonsledd
        │
        ├── Klient: Utdanningsetaten (organisasjonsledd)
        │     ├── Underenhet: Grünerløkka skole
        │     ├── Underenhet: Sagene skole
        │     └── Underenhet: Bjølsen barnehage
        │
        └── Klient: Bydel Grünerløkka (organisasjonsledd)
              ├── Underenhet: Helsestasjon Grünerløkka
              └── Underenhet: Sykehjem Sofienberg
```

### Hvorfor dette oppsettet?

Selv om organisasjonsleddene er en del av samme kommune, er hvert ledd en selvstendig juridisk enhet i Enhetsregisteret og eier sine egne rettigheter i Altinn. Det betyr at hovedenheten ikke automatisk kan handle på vegne av et organisasjonsledd — organisasjonsleddet må aktivt delegere tilgangspakkene til hovedenheten.

Underenhetene (skoler, helsestasjoner og liknende) er et unntak:  De trenger ikke delegere egne rettigheter til kommunen siden systembrukeren arver rettighetene fra organisasjonsleddet. Når organisasjonsleddet er lagt til som klient, kan sluttbrukersystemet dermed rapportere for alle underenhetene under leddet uten ekstra oppsett.

### Viktig å huske

- **Delegering må gjøres av hvert enkelt organisasjonsledd.** Tilgangspakker følger ikke automatisk av tilknytningen i Enhetsregisteret. Hovedenheten kan ikke delegere på vegne av organisasjonsleddene.
- Hvis et organisasjonsledd trenger andre tilgangspakker enn de andre (f.eks. bare Utdanningsetaten skal rapportere a-melding, mens Bydel Grünerløkka skal rapportere mva.), kan du kombinere dette oppsettet med scenario C og opprette én systembruker per pakkekombinasjon.
- Når et nytt organisasjonsledd opprettes, må det delegere tilgangspakker på nytt, og klientadministratoren må knytte det til systembrukeren.
- Nye underenheter krever ingen ekstra handling — de arver automatisk rettighetene fra organisasjonsleddet de tilhører.
- Sluttbrukersystemet må ha tilgangskontroll slik at bare autoriserte ansatte kan handle på vegne av hvert organisasjonsledd og hver underenhet.

![Systembruker for hovedenhet med organisasjonsledd og underenheter som klienter](./organisasjonsledd.drawio.svg "Kompleks virksomhetsstruktur med organisasjonsledd og underenheter")

---

## H. Kombinere egen rapportering med delegerte klientforhold

**Typisk eksempel:** Oslo kommune vil rapportere sykmelding både for kommunen selv (med tilhørende underenheter) **og** for kommunens organisasjonsledd (f.eks. Utdanningsetaten og Bydel Grünerløkka, som igjen har egne underenheter). Et annet eksempel er et morselskap som rapporterer egne data og i tillegg for datterselskaper som har delegert tilgangspakker.

### Utgangspunkt

- Virksomheten vil rapportere egne data (som i scenario A) **og** rapportere på vegne av andre juridiske enheter som har delegert tilgangspakker (som i scenario G).
- En standardsystembruker dekker virksomheten selv og tilhørende underenheter, men kan ikke brukes for delegerte klientforhold.
- En systembruker for klientforhold håndterer delegerte tilgangspakker fra andre juridiske enheter, men dekker ikke virksomheten selv.
- Derfor må de to typene systembrukere kombineres i dag.

### Anbefalt oppsett i dag

Du trenger **to systembrukere** for å dekke begge behovene:

- **Systembruker 1 (standard)** — for virksomhetens egen rapportering. Systembrukeren får tilgangspakkene virksomheten trenger for seg selv og underenhetene sine.
- **Systembruker 2 (klientforhold)** — for rapportering på vegne av organisasjonsledd, datterselskaper eller andre juridiske enheter som har delegert tilgangspakker. Klientadministratoren knytter hver juridisk enhet som klient.

```text
Oslo kommune
  ├── Systembruker 1 (standard) — Egen rapportering
  │     ├── Tilgangspakke: f.eks. sykmelding
  │     └── Dekker: Oslo kommune + underenheter (arves automatisk)
  │
  └── Systembruker 2 (klientforhold) — Organisasjonsledd
        ├── Tilgangspakker: delegert av hvert organisasjonsledd
        ├── Klient: Utdanningsetaten
        │     └── Underenheter: skoler og barnehager (arver rettighetene)
        └── Klient: Bydel Grünerløkka
              └── Underenheter: helsestasjoner og sykehjem (arver rettighetene)
```

Sluttbrukersystemet må velge riktig systembruker basert på hvem det skal rapporteres for:

- Rapportering for kommunen selv eller en underenhet av kommunen → Systembruker 1.
- Rapportering for et organisasjonsledd eller en underenhet av organisasjonsleddet → Systembruker 2.

### Flere relasjonstyper i tillegg

Hvis virksomheten i tillegg har klientforhold som kommer fra Enhetsregisteret — registrert regnskapsfører, ansvarlig revisor eller forretningsfører — trenger du **én ekstra systembruker per relasjonstype**. Disse relasjonene kan ikke kombineres med de delegerte klientforholdene på samme systembruker, fordi hver relasjonstype representerer et eget rettslig grunnlag for å handle på vegne av klienten. Se [scenario C](#c-tjenesteyter-med-flere-typer-klientforhold) for utfyllende begrunnelse.

**Eksempel:** Et konsern som rapporterer egne data, har delegerte klientforhold fra datterselskaper og i tillegg fungerer som registrert regnskapsfører for noen kunder, trenger tre systembrukere:

```text
Konsernet
  ├── Systembruker 1 (standard) — Egen rapportering
  │     ├── Tilgangspakke: f.eks. sykmelding
  │     └── Dekker: konsernet + underenheter
  │
  ├── Systembruker 2 (klientforhold) — Delegerte forhold
  │     ├── Tilgangspakker: delegert av hvert datterselskap
  │     ├── Klient: Datterselskap A
  │     └── Klient: Datterselskap B
  │
  └── Systembruker 3 (klientforhold) — Registrert regnskapsfører
        ├── Tilgangspakke: regnskapsforer-med-signeringsrettighet
        ├── Klient: Kunde X
        └── Klient: Kunde Y
```

Antallet systembrukere vokser med én per ekstra relasjonstype fra Enhetsregisteret (regnskapsfører, revisor, forretningsfører). Forenklingen som er beskrevet nedenfor endrer ikke dette — ER-baserte forhold krever alltid egen systembruker.

### Kommende forenkling

Altinn kommer snart til å støtte **begge behovene på én systembruker for klientforhold**. Når funksjonen er på plass, kan virksomheten selv og underenhetene dekkes sammen med de delegerte klientforholdene — uten en egen standardsystembruker ved siden av.
Du kan følge arbeidet i
[issue #1546 i altinn-authentication](https://github.com/Altinn/altinn-authentication/issues/1546).

Forenklingen gjelder **kun klientforhold som er delegert i Altinn**. Klientforhold som kommer fra Enhetsregisteret — altså registrert regnskapsfører, ansvarlig revisor eller forretningsfører — er ikke omfattet. For disse må du fortsatt bruke en egen systembruker for klientforholdet i tillegg til en standardsystembruker for egen rapportering.

Inntil funksjonen er tilgjengelig, bør du planlegge med to systembrukere slik det er beskrevet ovenfor. Når forenklingen kommer, kan du enten beholde oppsettet eller samle alt på én systembruker for klientforhold.

### Viktig å huske

- Dette oppsettet kombinerer scenario A (egen rapportering) og scenario G (delegerte klientforhold). Les også disse for detaljer om hver del.
- Sluttbrukersystemet må vite hvilken systembruker som skal brukes for hvilken juridisk enhet. Bruk `external ref` for å velge riktig token ved rapportering.
- Samme delegeringskrav gjelder som i scenario G: hvert organisasjonsledd (eller datterselskap) må aktivt delegere tilgangspakkene til hovedenheten. Underenhetene arver automatisk fra organisasjonsleddet.
- Hvis ulike organisasjonsledd trenger ulike tilgangspakker, kan oppsettet kombineres med scenario C og få én systembruker for klientforhold per pakkekombinasjon.

---

## Hvor mange systembrukere trenger jeg?

Bruk dette beslutningstreet for å finne riktig antall:

1. **Rapporterer virksomheten bare for seg selv?**
   Ja → **1 systembruker** (scenario A eller E).

2. **Har tjenesteyteren bare én type klientforhold?**
   Ja → **1 systembruker for klientforhold** (scenario B).

3. **Har tjenesteyteren flere typer klientforhold?**
   Ja → **1 systembruker per relasjonstype** (scenario C).

4. **Har noen kunder delegert ekstra tilgangspakker utover det som følger av klientforholdet?**
   Ja → **1 systembruker per kombinasjon av tilgangspakker** (scenario F).

5. **Trenger tjenesteyteren å begrense tilgangen etter team eller avdeling?**
   Ja → Vurder **1 systembruker per team** i tillegg til per relasjonstype (scenario D).

6. **Er virksomheten en hovedenhet med flere organisasjonsledd som skal rapportere sentralt?**
   Ja → **1 systembruker** der hvert organisasjonsledd delegerer tilgangspakker og knyttes som klient (scenario G).

7. **Skal virksomheten rapportere både for seg selv (og egne underenheter) og for organisasjonsledd eller andre juridiske enheter med delegerte tilgangspakker?**
   Ja → **2 systembrukere**: én standardsystembruker for egen rapportering og én systembruker for klientforhold for de delegerte enhetene (scenario H). Forenkles til én systembruker når Altinn støtter begge behovene i samme systembruker for klientforhold.

### Når du IKKE bør opprette flere systembrukere

- **Ikke** opprett en egen systembruker per klient. Bruk klientkobling på én enkelt systembruker i stedet.
- **Ikke** opprett separate systembrukere for ulike tjenester hvis de deler samme tilgangspakke og relasjonstype. Én systembruker kan ha flere tilgangspakker.

---

## Tilgangskontroll i sluttbrukersystemet

Når du bruker en systembruker, vet ikke den offentlige tjenesten hvem personen bak API-kallet er.
Systemleverandøren har derfor ansvar for at bare autoriserte brukere får tilgang.

### Minimumskrav

- **Autentiser** alle brukere som logger inn i sluttbrukersystemet.
- **Autoriser** brukere slik at de bare har tilgang til klienter og funksjoner som er relevante for rollen deres.
- **Logg** hvilken bruker som utførte hvilken handling, og for hvilken klient.

### Anbefalt tilnærming for større virksomheter

- Definer **roller eller team** i sluttbrukersystemet (f.eks. «forretningsførsel», «regnskap», «revisjon»).
- Knytt hver rolle til én eller flere systembrukere.
- Sørg for at en ansatt med rollen «forretningsførsel» ikke kan bruke systembrukeren for «revisjon», selv om sluttbrukersystemet teknisk sett har tilgang til begge.

---

## Sjekkliste før produksjon

- [ ] Systemleverandøren har registrert systemet med de riktige tilgangspakkene i systemregisteret.
- [ ] Systemleverandøren har sendt forespørsler for riktig antall systembrukere.
- [ ] Tjenesteyteren/virksomheten har godkjent alle forespørsler om systembrukere.
- [ ] Klientene er knyttet til de riktige systembrukerne (for scenarioer med klientforhold).
- [ ] Tilgangskontroll er på plass i sluttbrukersystemet (for scenarioer med flere ansatte eller team).
- [ ] Sluttbrukersystemet kan velge riktig systembrukertoken ved rapportering for ulike klienttyper.
- [ ] Oppsettet er testet med et representativt utvalg klienter før produksjon.

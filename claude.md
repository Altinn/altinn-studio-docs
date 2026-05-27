# Claude Code - Altinn Studio Dokumentasjon

## Prosjektoversikt

Dette er en Hugo-basert dokumentasjonsside for Altinn-produkter som Altinn Studio, Altinn Authorization osv.

### Utviklingsserver

**For brukeren**: Start Hugo-server i terminal ved øktstart:
```bash
cd <repo-root> && hugo server
```
Åpne nettleser på http://localhost:1313/

### Prosjektstruktur

- `content/` - Dokumentasjonsinnhold i Markdown
- `static/` - Statiske ressurser
- `layouts/` - Hugo-maler
- `themes/` - Hugo-tema
- `config.toml` - Hugo-konfigurasjon
- `public/` - Generert nettsted

### Nøkkelfunksjoner

- Flerspråkstøtte (norsk bokmål og engelsk)
- Mermaid-diagrammer aktivert
- GitHub-integrasjon for redigering
- Auto-deploy via GitHub Actions

---

## Arbeidsflyt

### Før du starter en oppgave

**For brukeren**: Be Claude hente fra master og lage ny branch ved øktstart.

**For Claude**: Ved øktstart, hent oppdatert master og lag ny branch:

1. **Hent og bytt til master:**
   ```bash
   git checkout master
   git pull origin master
   ```

2. **Verifiser at du er på master:**
   ```bash
   git branch --show-current
   ```
   Skal vise `master` - hvis ikke, start på nytt.

3. **Lag ny branch med beskrivende navn:**
   ```bash
   git checkout -b branchnavn
   ```
   Bruk format: `klarsprak-emnavn` eller `fix/beskrivelse`

4. **Verifiser at branch er basert på oppdatert master:**
   ```bash
   git log --oneline -1
   ```

5. **Sjekk for duplikater/flyttede filer:**

   Før du jobber med et emne, søk etter liknende filer:
   ```bash
   find content/altinn-studio/v10 -name "*emnord*" -type d
   ```

   Hvis du finner flere versjoner:
   - Sammenlign med `diff`
   - Sjekk `git log --follow filnavn`
   - Spør brukeren hvilken som skal brukes

### Under arbeidet

- Sjekk at sider vises korrekt i Hugo-serveren (http://localhost:1313/)
- Test lenker underveis
- **ALDRI commit genererte filer** (`public/`, `.html`-filer)

### Før commit

Verifiser kun `.md`-filer (og evt. bilder) committes:
```bash
git status
git diff --name-only
```
Hvis `.html` eller `public/` vises: `git reset` og rens opp.

### Før PR

1. **Verifiser antall filer** (~20-50 for typisk språkvask):
   ```bash
   git diff --name-only master..branchnavn | wc -l
   ```

2. **Test Hugo-bygg** (sjekk for REF_NOT_FOUND-feil):
   ```bash
   hugo
   ```

3. **Push og lag PR:**
   ```bash
   git push -u origin branchnavn
   ```

### Etter CodeRabbit-review

Rett småfeil (ofte grammatikk) raskt - tar vanligvis 5-10 min.

---

## Dokumentasjonsrammeverk

**Bruk [Diátaxis](https://diataxis.fr/) for veiledning om dokumentasjonsstruktur:**

- **Tutorials** (læringsorientert)
- **How-to guides** (oppgaveorientert)
- **Reference** (informasjonsorientert)
- **Explanation** (forståelsesorientert)

---

## Målgruppe

**Ikke-tekniske tjenesteeiere**: Skriv for tjenesteeiere i offentlige virksomheter som har eller planlegger tjenester i Altinn.

**De har fag- og virksomhetsansvar, ikke teknisk ansvar.** De:

- samarbeider med utviklere/leverandører og Digdir/Altinn
- vil forstå konsekvenser for brukere, ansvar, kvalitet, risiko, kostnad og lovkrav (særlig universell utforming/tilgjengelighet)

**Anta begrenset teknisk kompetanse:**

- Unngå teknisk sjargong
- Når tekniske begreper må brukes (f.eks. data→signing, Camunda, process.bpmn, custom frontend, eFormidling, Fiks arkiv), forklar dem kort i dagligspråk og knytt dem til hva det betyr for tjenesteeier og brukerne

**Vinkle på:**

- Hva Altinn-plattformen tilbyr "out of the box"
- Hva tjenesteeier selv har ansvar for (innhold, prosessvalg, vedlegg/PDF, testing, tilgjengelighet)
- Hvilke valg som er trygge standardvalg og hvilke som krever ekstra oppfølging/testing
- Gi heller eksempler på spørsmål tjenesteeier kan stille til utviklerne, enn teknisk detalj

---

## Språk og stil (norsk)

- Bruk konservativ bokmål ("listen", "hentet" - ikke "lista", "henta")
- Unngå passive konstruksjoner
- Unngå "av + -ing" konstruksjoner
- **Unngå substantiveringer** - bruk verb i stedet for substantiverte verb
  - ❌ Feil: "Verifisering av signatur", "Lagring av data", "Behandling av personopplysninger"
  - ✅ Riktig: "Slik verifiserer du signaturen", "Slik lagres data", "Slik behandles personopplysninger"
- **Bruk etterstilte pronomen** på norsk
  - ❌ Feil: "ditt system", "din tjeneste", "dine data"
  - ✅ Riktig: "systemet ditt", "tjenesten din", "dataene dine"
- **Bruk bestemt form** når du snakker om spesifikke ting
  - ❌ Feil: "flyt", "prosess", "kode", "applikasjon"
  - ✅ Riktig: "flyten", "prosessen", "koden", "applikasjonen"
- **ALLTID erstatt anglisismer og unødvendige fremmedord** med norske alternativer
  - ❌ Feil: "interfacet", "aksessere", "definere egendefinert"
  - ✅ Riktig: "grensesnittet", "få tilgang til", "skrive egen kode"
  - Vanlige anglisismer å se etter: implementere (gjennomføre), validere (godkjenne/kontrollere), initialisere (klargjøre/sette opp)
- **Sammensetninger skrives uten bindestreker** (med mindre det er nødvendig for forståelse)
  - ❌ Feil: "meldings-visning", "kvitterings-siden", "data-steg"
  - ✅ Riktig: "meldingsvisning", "kvitteringssiden", "datasteg"
  - Unntak: Når det er nødvendig for å unngå misforståelser eller når det er tre eller flere ord
- **Bruk korrekte produktnavn**
  - ❌ Feil: "UI-editoren", "skjema-editoren", "form editoren"
  - ✅ Riktig: "Altinn Studio Designer" (eller bare "Designer" hvis konteksten er klar)
- **Tekniske termer som skal skrives i ett ord**
  - ❌ Feil: "layout set", "layout-sett", "form layout-filer"
  - ✅ Riktig: "layoutsett", "layoutfiler"
  - Forklaring: "layout" er innarbeidet i norsk teknisk språk, så vi skriver sammensatte ord i ett ord
- Lenker skal helst være fullstendige setninger
- Tall under 12: Skriv med bokstaver i løpende tekst ("fire filer", "tre alternativer")
  - Unntak: Statistikk, tabeller, eller når tallet er spesielt viktig ("maks 10 filer tillatt")

### Frontmatter

- **description**:
  - Veiledninger/how-to: Start med "Slik..." (f.eks. "Slik kjører og tester du appen på egen maskin")
  - Reference/konsepter: Beskrivende (f.eks. "Oversikt over tilgjengelige API-endepunkter")

### Formatering

- GUI-elementer: Bold (**Klikk på **Lagre****)
- Mushandlinger: "klikk"
- Tastaturhandlinger: "trykk"
- Valg fra lister: "velg"
- URLs: Soft line break før URL

---

## Overskriftsregler

### Imperativ vs. infinitiv

- **Imperativ** (befalingsform): Brukes når overskriften kommer **rett før en prosedyre** (nummerert liste)
  - Eksempel: "Lag en ny type" (følges direkte av punktene 1, 2, 3...)
  - Eksempel: "Åpne datamodelleringsverktøyet" (følges direkte av punktene 1, 2, 3...)

- **Infinitiv** (grunnform): Brukes når overskriften er på et høyere nivå, eller når det er **innledende tekst/avsnitt før prosedyren**
  - Eksempel: "Laste opp en datamodell" (innledende tekst: "Hvis du allerede har en datamodell...")
  - Eksempel: "Generere og laste ned modellfiler" (innledende tekst: "Når datamodellen er klar:")

**Artikkeloverskrifter** bruker alltid infinitiv (f.eks. "Lage en datamodell").

**Beskrivende overskrifter** bruker "Slik..." (f.eks. "Slik lager og redigerer du datamodeller").

### Unngå substantiveringer i overskrifter

**VIKTIG:** Overskrifter skal ALDRI bruke substantiverte verb med "av":
- ❌ Feil: "Testing av app-API-er lokalt", "Debugging av app", "Validering av data"
- ✅ Riktig: "Teste app-API-er lokalt", "Feilsøke i appen", "Kontrollere data"

**VIKTIG:** Erstatt alltid engelske/tekniske termer med norske alternativer:
- ❌ Feil: "Debugging av app"
- ✅ Riktig: "Feilsøke i appen"

---

## Listeregler

**ALLTID SJEKK LISTER NÅR DU SPRÅKVASKER - Dette er en vanlig feilkilde!**

### Slik avgjør du Type 1 vs Type 2

Les innledningen + første punkt høyt:
- Hvis det gir mening som én sammenhengende setning → **Type 1**
- Hvis punktet står alene som egen setning → **Type 2**

### Type 1: Punktene fortsetter setningen grammatisk

**Kjennetegn:**
- Punktene fullfører setningen som innledningen starter
- **INGEN kolon** etter innledningen
- **Liten forbokstav** i hvert punkt
- **IKKE punktum** på slutten av punktene

**Eksempel:**
```
Du trenger en datamodell til å

- samle inn data fra brukere
- lagre data fra tjenesten
- validere informasjon
```

### Type 2: Punktene er selvstendige setninger

**Kjennetegn:**
- Hvert punkt er en komplett, uavhengig setning
- **Kolon** (eller punktum) etter innledningen
- **Stor forbokstav** i hvert punkt
- **Punktum** på slutten av hvert punkt

**Eksempel:**
```
Slik gjør du det:

- Gi brukeren en tydelig inngang til tjenesten.
- Unngå mellomliggende sider.
- Gjør det klart at brukeren kommer inn i Altinn-tjenesten.
```

### Nummererte lister vs. kulepunkter

- **Nummererte lister**: Kun for prosedyrer/steg som må følges i rekkefølge
- **Kulepunkter**: For alternativer, valg, eller punkter uten bestemt rekkefølge

---

## Retningslinjer for engelsk oversettelse

- Bruk British English (organisation, authorise, whilst, etc.)
- **Stilguider**: Følg Oxford Style Guide og Guardian Style Guide
- **Overskrifter på engelsk**: Bruk sentence case - kun stor forbokstav på første ord og egennavn
  - ✅ Riktig: "Understand what a multi-app solution is"
  - ❌ Feil: "Understand What a Multi-App Solution Is"
- **Viktig**: Siden produktet (Altinn Studio) ikke er tilgjengelig på engelsk, behold alle GUI-elementreferanser på norsk ved oversettelse
- Bruk "end user" (ikke "end-user") gjennomgående
- **Kulepunkter på engelsk** (Oxford/Guardian-stil):
  - Bruk liten forbokstav etter kulepunkt med mindre det starter med egennavn eller er en fullstendig setning
  - Ingen punktum på slutten av kulepunkter med mindre de er fullstendige setninger
  - Vær konsekvent innen hver liste

---

## Hugo Page Bundles og bilder

Hugo har to typer:
- **Branch bundle**: `_index.md` (kan ha undersider og bilder i samme mappe)
- **Leaf bundle**: `index.md` (ingen undersider, men kan ha bilder)

**Viktig**: Filer som IKKE heter `_index.md` MÅ ligge i egen mappe som `index.md` for at bilder skal fungere.

### Flytte bilder til riktig struktur

1. **Hvis filen heter `_index.nb.md`**: Bilder kan ligge i samme mappe

2. **Hvis filen heter noe annet** (f.eks. `vedlegg.nb.md`):
   ```bash
   # Fra:
   datamodell/
     vedlegg.nb.md
     bilde.png

   # Til:
   datamodell/
     vedlegg/
       index.nb.md
       bilde.png
   ```

3. **Bildereferanser**: Bruk alltid `./` (f.eks. `![Alt tekst](./bilde.png "Tittel")`)

4. **Test**: Sjekk i nettleser og konsoll (F12) for 404-feil

---

## Kvalitetssjekkliste

### Ved migrering v8 → v10

- Legg til `tags: [needsReview]` i frontmatter

### Alltid sjekk

- **Lenker**:
  - Interne: `{{< relref "path/to/file" >}}`
  - Beskrivende lenketekst
- **Bilder**:
  - Stier med `./`
  - Riktig page bundle-struktur
  - Beskrivende alt-tekst
  - Test i nettleser
- **Struktur**: Alfabetiser emner i mapper

---

## Kilder

- Klarspråk: https://språkrådet.no/
- Tegnsetting og språkbruk: https://korrekturavdelingen.no/
- Dokumentasjonsrammeverk: https://diataxis.fr/
- Designsystemet (skjemadesign og UX): https://designsystemet.no/

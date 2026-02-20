# Claude Code - Altinn Studio Dokumentasjon

## Prosjektoversikt

Dette er en Hugo-basert dokumentasjonsside for Altinn-produkter som Altinn Studio, Altinn Authorization osv.

### Utviklingskommandoer

**VIKTIG: Start Hugo fra brukerens terminal i starten av hver økt**
- Bruker må åpne terminal og kjøre: `cd <repo-root> && hugo server -D`
- La Hugo-serveren kjøre i terminalen
- Åpne nettleser på: http://localhost:1313/

Andre kommandoer:
- **Start utviklingsserver**: `hugo server --navigateToChanged -D` (`-D` viser draft-innhold)
- **Bygg nettstedet**: `hugo --minify`
- **Ren bygging**: `rm -rf public && hugo --minify`

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

## Språkvask-sjekkliste (OBLIGATORISK)

**Før du sier at en språkvask er ferdig, SKAL du systematisk gjennomføre alle disse punktene:**

1. **Grep etter passive konstruksjoner** og endre til aktiv stemme:
   - `gjøres`, `settes`, `brukes`, `legges`, `hentes`, `opprettes`
   - `kan være`, `vil være`, `blir`, `vil bli`, `er tilgjengelig`
   - Eksempel: "Konfigurasjon gjøres i" → "Du konfigurerer i"

2. **Grep etter anglisismer** og erstatt med norske alternativer:
   - `implementer` → `skriver`/`bruker`/`gjennomfører`
   - `interface` → `grensesnitt`
   - `aksessere` → `få tilgang til`
   - `validere` → `godkjenne`/`kontrollere`
   - `initialisere` → `starte`
   - `definere egendefinert` → `skrive egen kode`

3. **Grep etter "task"/"tasker"** og erstatt med "oppgave"/"oppgaver"

4. **Grep etter lenker med "her"** og endre til fullstendige setninger:
   - ❌ "Les mer [her](url)"
   - ✅ "[Les mer om egendefinert forhåndsutfylling](url)"

5. **Grep etter v8-lenker** og sjekk at de har `/nb/`:
   - ❌ `/altinn-studio/v8/reference/`
   - ✅ `/nb/altinn-studio/v8/reference/`

6. **Grep etter substantiveringer** ("av + -ing"):
   - `Konfigurasjon av` → `Konfigurere`
   - `Validering av` → `Validere`
   - `Ekskludering av` → `Ekskludere`

7. **Sjekk alle overskrifter** for riktig form:
   - Artikkeloverskrifter (title): infinitiv ("Konfigurere autentisering")
   - Underoverskrifter rett før prosedyre: imperativ ("Lag en ny kopi")
   - Underoverskrifter med innledende tekst: infinitiv ("Lage ny kopi")

8. **Sjekk alle lister** for Type 1 vs Type 2:
   - Type 1: Liten forbokstav, ingen punktum, ingen kolon
   - Type 2: Stor forbokstav, punktum, kolon etter innledning

9. **Grep etter sammensetninger** med unødvendige bindestreker:
   - `layout-sett` → `layoutsett`
   - `meldings-visning` → `meldingsvisning`
   - `kvitterings-siden` → `kvitteringssiden`

10. **Sjekk manglende artikler/bestemt form**:
    - `for app` → `for en app` eller `for appen`
    - `i prosess` → `i prosessen`
    - `flyt` → `flyten`

**VIKTIG:** Bruk Grep-verktøyet for hvert av disse punktene. Ikke stol på manuell gjennomgang alene.

---

## Arbeidsflyt

**VIKTIG: Følg alltid denne arbeidsflyten:**

### Før du starter en oppgave

**🚨 OBLIGATORISK: Spør ALLTID brukeren før du starter arbeid:**

> "Skal jeg først oppdatere master og lage ny branch?"

**Vent på bekreftelse. Gjør DERETTER følgende:**

1. **Start ALLTID fra oppdatert master:**
   ```bash
   git checkout master
   git pull origin master
   ```
   ⚠️ **KRITISK**: Verifiser at du faktisk er på master!

2. **Verifiser at du er på riktig branch:**
   ```bash
   git branch --show-current
   ```
   **Skal vise: `master`** (IKKE noen annen branch!)
   
   Hvis du ikke er på master, start på nytt fra steg 1.

3. **Sjekk om branchnavn finnes fra før:**
   ```bash
   git branch -a | grep branchnavn
   ```
   - Hvis den finnes lokalt: `git branch -D branchnavn`
   - Hvis den finnes på remote: `git push origin --delete branchnavn`

4. **Lag NY branch:**
   ```bash
   git checkout -b branchnavn
   ```
   - Bruk beskrivende branchnavn (f.eks. `klarsprak-svaralternativer`, `fix/broken-links`)

5. **DOBBELTSJEKK at ny branch er basert på master:**
   ```bash
   git log --oneline -1
   ```
   Skal matche siste commit i master!
   
   Hvis ikke - STOPP og start på nytt fra steg 1.

### Under arbeidet

1. **Test Hugo-bygget kontinuerlig:**
   - Bruker starter Hugo i separat terminal: `hugo server -D`
   - Sjekk at sider vises korrekt i nettleseren
   - Sjekk lenker mens du vasker

2. **ALDRI commit genererte filer:**
   - Ikke commit `public/`-mappen
   - Ikke commit `.html`-filer i `content/`
   - Sjekk `.gitignore` inneholder `/public/`

### Før hver commit

1. **Sjekk hva som skal committes:**
   ```bash
   git status
   git diff --name-only
   ```
   - Hvis du ser `.html` eller `public/`: `git reset` og rens opp
   - Skal kun se `.md`-filer (og evt. bilder/kode)

2. **Commit med klar melding:**
   ```bash
   git add -A
   git commit -m "Beskrivende melding"
   ```

### Før PR

1. **Verifiser antall endrede filer:**
   ```bash
   git diff --name-only master..branchnavn | wc -l
   ```
   - Skal være ~20-50 filer for en typisk språkvask
   - IKKE tusener av filer!

2. **Test at Hugo bygger uten feil:**
   ```bash
   hugo
   ```
   - Sjekk at det ikke er REF_NOT_FOUND-feil

3. **Push og lag PR:**
   ```bash
   git push -u origin branchnavn
   ```

### Etter CodeRabbit-review

- Rett småfeil med én gang (tar vanligvis bare 5-10 min)
- De er ofte grammatikkfeil som er lette å fikse
- Commit og push rettelsene

### Draft-innhold

- Mange artikler i v10 er merket med `draft: true` i frontmatter
- `-D`-flagget i utviklingsserveren sørger for at draft-innhold vises under utvikling
- Draft-innhold publiseres ikke i produksjonsbygg


- Mange artikler i v10 er merket med `draft: true` i frontmatter
- `-D`-flagget i utviklingsserveren sørger for at draft-innhold vises under utvikling
- Draft-innhold publiseres ikke i produksjonsbygg

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
- Lenker skal helst være fullstendige setninger
- Tall under 12: Skriv med bokstaver i løpende tekst ("fire filer", "tre alternativer")
  - Unntak: Statistikk, tabeller, eller når tallet er spesielt viktig ("maks 10 filer tillatt")

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

## Hugo Page Bundles

**KRITISK FORSTÅELSE for bilder:**

Hugo har to typer content-organisering:
- **Branch bundle**: En mappe med `_index.md` (kan ha undersider)
- **Leaf bundle**: En mappe med `index.md` (ingen undersider, men kan ha ressurser som bilder)

**Hvis filen heter noe annet enn `_index.md`, MÅ den ligge i sin egen mappe som `index.md` for at bilder skal fungere!**

### Prosedyre for å flytte bilder fra v8 til v10

1. **Sjekk filnavnet:**
   - Hvis filen heter `_index.nb.md` → bilder kan ligge i samme mappe
   - Hvis filen heter noe annet (f.eks. `vedlegg.nb.md`) → SE TRINN 2

2. **Lag page bundle-struktur for ikke-_index filer:**
   ```bash
   # I stedet for:
   datamodell/
     vedlegg.nb.md
     bilde1.png

   # Må du ha:
   datamodell/
     vedlegg/
       index.nb.md    # (innholdet fra vedlegg.nb.md)
       bilde1.png
   ```

3. **Flytt filer:**
   ```bash
   mkdir vedlegg
   mv vedlegg.nb.md vedlegg/index.nb.md
   mv bilde1.png vedlegg/
   ```

4. **Oppdater bildereferanser:**
   - Bruk `./` foran bildefilnavnet
   - Format: `![Alt tekst](./filnavn.png "Tittel")`
   - Ikke `../` eller bare `filnavn.png`

5. **Test at bildene vises:**
   - Hugo rebuilder automatisk når filer flyttes
   - Sjekk i nettleseren (evt. hard refresh med Cmd+Shift+R)
   - Sjekk nettleserkonsollen (F12) for eventuelle 404-feil

---

## Kvalitetssjekkliste

### Alltid legg til needsReview-tag

Når du vasker/migrerer filer fra v8 til v10:
- Legg ALLTID til `tags: [needsReview]` i frontmatter
- Dette er kritisk for å holde oversikt over hva som er klart til gjennomgang

### Alltid sjekk lenker og bilder

- **Sjekk alle lenker**: Kontroller at lenker fungerer og peker til riktig sted
  - Interne lenker skal bruke relref-shortcode: `{{< relref "path/to/file" >}}`
  - Eksterne lenker skal være komplette og fungerende
  - Sjekk at lenketeksten er meningsfull og beskrivende
- **Sjekk alle bilder**: Kontroller at bilder finnes og vises riktig
  - Bildestier skal bruke `./` for bilder i samme page bundle
  - Verifiser at page bundle-strukturen er korrekt
  - Test at bildene faktisk vises i nettleseren
  - Sjekk at alt-tekst er beskrivende
- **Test lokalt**: Bruk Hugo Server for å verifisere før du committer

### Struktur

- Alfabetiser emnene i hver mappe

---

## Kilder

- Klarspråk: https://språkrådet.no/
- Tegnsetting og språkbruk: https://korrekturavdelingen.no/
- Dokumentasjonsrammeverk: https://diataxis.fr/
- Designsystemet (skjemadesign og UX): https://designsystemet.no/

# Instrukser for dokumentasjonsarbeid - Altinn Studio Dokumentasjon

## Gjelder for innholdet i Altinn Studio docs

### PROSEDYRE: Flytte bilder fra v8 til v10

**KRITISK FORSTÅELSE: Hugo Page Bundles**

Hugo har to typer content-organisering:
- **Branch bundle**: En mappe med `_index.md` (kan ha undersider)
- **Leaf bundle**: En mappe med `index.md` (ingen undersider, men kan ha ressurser som bilder)

**Hvis filen heter noe annet enn `_index.md`, MÅ den ligge i sin egen mappe som `index.md` for at bilder skal fungere!**

**Når du migrerer en artikkel fra v8 til v10 som inneholder bilder:**

1. **Sjekk filnavnet:**
   - Hvis filen heter `_index.nb.md` → bilder kan ligge i samme mappe
   - Hvis filen heter noe annet (f.eks. `vedlegg.nb.md`) → SE TRINN 2

2. **Lag page bundle-struktur for ikke-_index filer:**
   ```bash
   # I stedet for:
   datamodell/
     vedlegg.nb.md
     bilde1.png
     bilde2.png
   
   # Må du ha:
   datamodell/
     vedlegg/
       index.nb.md    # (innholdet fra vedlegg.nb.md)
       bilde1.png
       bilde2.png
   ```

3. **Flytt filer:**
   ```bash
   mkdir vedlegg
   mv vedlegg.nb.md vedlegg/index.nb.md
   mv bilde1.png bilde2.png vedlegg/
   ```

4. **Oppdater bildereferanser:**
   - Bruk `./` foran bildefilnavnet
   - Format: `![Alt tekst](./filnavn.png "Tittel")`
   - Ikke `../` eller bare `filnavn.png`

5. **Eksempel på riktig referanse:**
   ```markdown
   ![Oversikt over datamodell-repo](./datamodels-dashboard.png "Oversikt over datamodell-repo")
   ```

6. **Test at bildene vises:**
   - Hugo rebuilder automatisk når filer flyttes
   - Sjekk i nettleseren (evt. hard refresh med Cmd+Shift+R)
   - Sjekk nettleserkonsollen (F12) for eventuelle 404-feil

**HVORFOR dette er viktig:** 
- Hugo kan bare finne ressurser (bilder) som er del av et "page bundle"
- `_index.md` filer danner automatisk en branch bundle med mappen de er i
- Vanlige markdown-filer MÅ være `index.md` i sin egen mappe for å danne en leaf bundle
- Uten korrekt bundle-struktur finner ikke Hugo bildene, selv med riktig `./` referanse

### VIKTIG: Alltid legg til needsReview-tag

**Når du vasker/migrerer filer fra v8 til v10:**
- Legg ALLTID til `tags: [needsReview]` i frontmatter
- Dette er kritisk for å holde oversikt over hva som er klart til gjennomgang
- Gjelder alle nye eller språkvaskede filer

### VIKTIG: Alltid sjekk lenker og bilder

**Når du vasker/migrerer/redigerer filer:**
- **Sjekk alle lenker**: Kontroller at lenker fungerer og peker til riktig sted
  - Interne lenker skal bruke relref-shortcode: `{{< relref "path/to/file" >}}`
  - Eksterne lenker skal være komplette og fungerende
  - Sjekk at lenketeksten er meningsfull og beskrivende
- **Sjekk alle bilder**: Kontroller at bilder finnes og vises riktig
  - Bildestier skal bruke `./` for bilder i samme page bundle
  - Verifiser at page bundle-strukturen er korrekt (se PROSEDYRE øverst)
  - Test at bildene faktisk vises i nettleseren
  - Sjekk at alt-tekst er beskrivende
- **Test lokalt**: Bruk Hugo Server for å verifisere før du committer

### Språkregler for overskrifter

**Regel for imperative vs. infinitive overskrifter:**

- **Imperativ** (befalingsform): Brukes når overskriften kommer **rett før en prosedyre** (nummerert liste).
  - Eksempel: "Lag en ny type" (følges direkte av punktene 1, 2, 3...)
  - Eksempel: "Rediger en type" (følges direkte av punktene 1, 2, 3...)
  - Eksempel: "Åpne datamodelleringsverktøyet" (følges direkte av punktene 1, 2, 3...)

- **Infinitiv** (grunnform): Brukes når overskriften er på et høyere nivå, eller når det er **innledende tekst/avsnitt før prosedyren**.
  - Eksempel: "Laste opp en datamodell" (innledende tekst: "Hvis du allerede har en datamodell...")
  - Eksempel: "Generere og laste ned modellfiler" (innledende tekst: "Når datamodellen er klar:")
  - Eksempel: "Velge modell fra nedtrekkslisten" (forklarende tekst: "Nedtrekkslisten viser...")

**Artikkeloverskrifte** bruker alltid infinitiv (f.eks. "Lage en datamodell").

**Beskrivende overskrifter** bruker "Slik..." (f.eks. "Slik lager og redigerer du datamodeller").

### Viktige retningslinjer

#### Målgruppe
**Ikke-tekniske tjenesteeiere**: Skriv for tjenesteeiere i offentlige virksomheter som har eller planlegger tjenester i Altinn (for eksempel prosesser som data, data->signing, data->signing->payment eller mer komplekse løp).

**De har fag- og virksomhetsansvar, ikke teknisk ansvar**. De:
- samarbeider med utviklere/leverandører og Digdir/Altinn
- vil forstå konsekvenser for brukere, ansvar, kvalitet, risiko, kostnad og lovkrav (særlig universell utforming/tilgjengelighet)

**Anta begrenset teknisk kompetanse**:
- Unngå teknisk sjargong
- Når tekniske begreper må brukes (f.eks. data->signing, Camunda, process.bpmn, custom frontend, eFormidling, Fiks arkiv), forklar dem kort i dagligspråk og knytt dem til hva det betyr for tjenesteeier og brukerne

**Vinkle på**:
- Hva Altinn plattformen tilbyr "out of the box"
- Hva tjenesteeier selv har ansvar for (innhold, prosessvalg, vedlegg/PDF, testing, tilgjengelighet)
- Hvilke valg som er trygge standardvalg og hvilke som krever ekstra oppfølging/testing (komplekse prosesser, Camunda, egen frontend)
- Gi heller eksempler på spørsmål tjenesteeier kan stille til utviklerne, enn teknisk detalj

#### Språk og stil
- Bruk konservativ bokmål ("listen", "hentet" - ikke "lista", "henta")
- Hovedoverskrifter: Infinitiv ("Opprette tjenesten")
- Steg-for-steg underoverskrifter: Imperativ ("Opprett ny tjeneste")
- Unngå passive konstruksjoner
- Unngå "av + -ing" konstruksjoner
- Lenker skal være fullstendige setninger helst
- Tall under 12: Skriv med bokstaver i løpende tekst ("fire filer", "tre alternativer")
  - Unntak: Statistikk, tabeller, eller når tallet er spesielt viktig ("maks 10 filer tillatt")

#### Formatering
- GUI-elementer: Bold formatting ("Klikk på **Lagre**")
- Mushandlinger: "klikk"
- Tastaturhandlinger: "trykk"
- Valg fra lister: "velg"
- URLs: Soft line break før URL

#### Listeregler (punktlister)

**⚠️ ALLTID SJEKK LISTER NÅR DU SPRÅKVASKER - Dette er en vanlig feilkilde!**

**HVORDAN AVGJØRE TYPE 1 vs TYPE 2:**
- Les innledningen + første punkt høyt
- Hvis det gir mening som én sammenhengende setning → **Type 1**
- Hvis punktet står alene som egen setning → **Type 2**

---

**Type 1: Punktene er grammatisk fortsettelse av innledningen**

**Kjennetegn:**
- Punktene fullfører setningen som innledningen starter
- Du kan lese innledning + punkt som én sammenhengende setning
- **INGEN kolon** etter innledningen
- **Liten forbokstav** i hvert punkt
- **IKKE punktum** på slutten av punktene

**Test:** Les "innledning + punkt" høyt - gir det mening som én setning?

Eksempler:
```
✓ RIKTIG:
Du trenger en datamodell til å

- samle inn data fra brukere
- lagre data fra tjenesten
- validere informasjon

✓ RIKTIG:
Bruk minimum lagringstid når

- du må behandle eller kontrollere innsendte data
- du har juridiske krav om oppbevaring
- du trenger tid til å arkivere data

✗ FEIL (har kolon og store bokstaver):
Du trenger en datamodell til å:

- Samle inn data fra brukere.
- Lagre data fra tjenesten.
```

---

**Type 2: Punktene er selvstendige setninger**

**Kjennetegn:**
- Hvert punkt er en komplett, uavhengig setning
- Punktene kan ikke leses som fortsettelse av innledningen
- **Kolon** (eller punktum) etter innledningen
- **Stor forbokstav** i hvert punkt
- **Punktum** på slutten av hvert punkt

**Test:** Kan punktet stå alene som en egen setning?

Eksempler:
```
✓ RIKTIG:
Slik gjør du det:

- Gi brukeren en tydelig inngang til tjenesten.
- Unngå mellomliggende sider.
- Gjør det klart at brukeren kommer inn i Altinn-tjenesten.

✓ RIKTIG:
**I lagringsperioden:**

- Brukere kan **ikke** slette sine egne innsendte data.
- Tjenesteeier kan **ikke** slette data.
- Data er beskyttet mot utilsiktet sletting.

✗ FEIL (mangler kolon, store bokstaver og punktum):
Slik gjør du det

- gi brukeren en tydelig inngang til tjenesten
- unngå mellomliggende sider
```

---

**Nummererte lister vs kulepunkter:**
- **Nummererte lister**: Kun for prosedyrer/steg som må følges i rekkefølge
- **Kulepunkter**: For alternativer, valg, eller punkter uten bestemt rekkefølge

Eksempel nummerert liste (prosedyre):
```
Slik logger du inn:

1. Åpne Altinn Studio.
2. Klikk på **Logg inn**.
3. Skriv inn brukernavn og passord.
```

Eksempel kulepunktliste (alternativer):
```
Du kan lage datamodeller på to måter:

- I Altinn Studio
- Last opp en XSD-fil
```

#### Struktur
- Alfabetiser emnene i hver mappe

#### Metadata
- Alltid legg til `tags: [needsReview]` i frontmatter

#### Kilder
- Klarspråk: https://språkrådet.no/
- Tegnsetting og språkbruk: https://korrekturavdelingen.no/
- Dokumentasjonsstruktur: https://diataxis.fr/

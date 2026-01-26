# Veiledning for oppsett av tilpassede maler

Denne veiledningen forklarer hvordan du manuelt setter opp tilpassede maler i et Altinn Studio innholdsrepo.

## Oversikt

Tilpassede maler lar organisasjoner lage gjenbrukbare applikasjonsmaler.
Maler lagres i et dedikert innholdsrepo i Gitea med navnekonvensjonen `{org}-content` (f.eks. `digdir-content`).

## Repostruktur

Innholdsrepoet ditt må følge denne strukturen:

```text
{org}-content/
└── Templates/
    ├── templatemanifest.json   # Liste over alle tilgjengelige maler
    ├── {template-id-1}/
    │   ├── template.json       # Mal-konfigurasjon
    │   └── content/           # Filer som kopieres fra malen
    │       ├── App/
    │       ├── config/
    │       └── ... (alle app-filer)
    └── {template-id-2}/
        ├── template.json
        └── content/
            ├── App/
            ├── config/
            └── ... (alle app-filer)
```

## Filkrav

### 1. templatemanifest.json

Ligger i `Templates/templatemanifest.json` og lister alle tilgjengelige maler i repoet.
Hver oppføring gir et sammendrag av en mal, og inneholder kun et utvalg av egenskapene
(som `id`, `owner`, `name` og `description`), ikke hele konfigurasjonen.
Dette manifestet brukes for å vise malvalg til sluttbrukere når de skal velge en mal å basere applikasjonen på.
Fullstendige detaljer og valideringsregler for hver mal defineres i tilhørende `template.json`-fil.

**Format:**

```json
[
    {
        "id": "min-mal",
        "owner": "digdir",
        "name": {
            "nb": "Min første mal"
        },
        "description": {
            "nb": "Dette er en detaljert beskrivelse av hva malen gjør og hva den inneholder"
        }
    }
]
```

**Krav:**
- Må være et gyldig JSON-array
- Hver maloppføring må inkludere: `id`, `owner`, `name` og `description`
- `name` og `description` må ha oppføringer for `nb` (norsk bokmål)

### 2. template.json

Ligger i `Templates/{template-id}/template.json` for hver mal.
Denne filen inneholder komplett konfigurasjon for én mal.

**Format:**

```json
{
    "id": "min-mal",
    "owner": "digdir",
    "name": {
         "nb": "Min første mal",
         "en": "My first template"
    },
    "description": {
        "nb": "Dette er en detaljert beskrivelse av hva malen gjør og hva den inneholder",
        "en": "This is a detailed description of what the template does and contains"
    },
    "remove": [
        "App/TestDummy.cs",
        ".editorconfig"
    ]
}
```

**Krav:**

Alle `template.json`-filer må være i samsvar med [`customtemplate.schema.json`](https://raw.githubusercontent.com/Altinn/altinn-studio/refs/heads/main/src/Designer/backend/src/Designer/Schemas/customtemplate.schema.json).

Se skjemaet for påkrevde felt, typer og valideringsregler, eller lim inn malen din under
for rask bekreftelse på om den er gyldig.

{{< jsonschema-validator label="Din mal:" schemaUrl="https://raw.githubusercontent.com/Altinn/altinn-studio/refs/heads/main/src/Designer/backend/src/Designer/Schemas/customtemplate.schema.json" >}}

### 3. content/-mappe

Ligger i `Templates/{template-id}/content/`,
denne mappen inneholder alle filer som kopieres til mål-applikasjonsrepoet når malen brukes.

**Struktureksempel:**

```text
Templates/min-mal/content/
├── App/
│   ├── models/
│   ├── ui/
│   │   ├── layouts/
│   │   └── Settings.json
│   ├── logic/  
│   └── config/  
│   │   └── applicationmetadata.json  
└── README.md
```

Alle filer og mapper i `content/` kopieres rekursivt til roten av mål-applikasjonsrepoet.

## Sjekkliste for oppsett

1. **Opprett `Templates/`-mappe** i roten av {org}-content-repoet
2. **Lag `templatemanifest.json`** med alle maloppføringer
3. **For hver mal:**
   - Opprett `Templates/{template-id}/`-mappe
   - Lag `template.json` med komplett konfigurasjon
   - Opprett `content/`-undermappe
   - Legg til alle malfiler i `content/`-mappen
4. **Valider** at alle JSON-filer er i samsvar med skjemaet
5. **Commit og push** til hovedbranchen


## Anbefalinger

- **Bruk beskrivende mal-IDer** som tydelig viser malens formål
- **Test bruk av mal** før den gjøres tilgjengelig for brukere
- **Dokumenter malinnhold** i beskrivelsesfeltet
- **Bruk `remove`-array** for å rydde bort ubrukte filer fra standard appmaler
- **Hold content-mappen organisert** etter Altinn-appstruktur

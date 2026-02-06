---
title: Tilpassede maler
description: Hvordan sette opp tilpassede maler i Altinn Studio for enklere opprettelse av apper
weight: 20
aliases:
- /altinn-studio/guides/custom-templates/
---


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
        "id": "my-template",
        "owner": "digdir",
        "name": "Min første mal",
        "description": "Dette er en detaljert beskrivelse av hva malen gjør og hva den inneholder"
    }
]
```

**Krav:**
- Må være et gyldig JSON-array
- Hver maloppføring må inkludere: `id`, `owner`, `name` og `description`

### 2. template.json

Ligger i `Templates/{template-id}/template.json` for hver mal.

Denne filen inneholder komplett konfigurasjon for én mal.

#### Felter i `template.json`

| Felt               | Type     | Påkrevd | Beskrivelse                                                                        |
|--------------------|----------|---------|------------------------------------------------------------------------------------|
| schemaVersion      | string   | Ja      | Hvilken JSON Schema-versjon malen følger. For øyeblikket støttes kun `0.1`.       |
| id                 | string   | Ja      | Unik ID for malen.                                                                 |
| owner              | string   | Ja      | Eier av malen (kortnavn på organisasjon).                                          |
| name               | string   | Ja      | Navn på malen.                                                                     |
| description        | string   | Ja      | Beskrivelse av malen.                                                              |
| remove             | array    | Nei     | Liste over relative filbaner eller globs som skal fjernes fra applikasjonsrepoet.  |
| packageReferences  | array    | Nei     | Liste over NuGet-pakker som skal legges til i angitte prosjektfiler (.csproj).     |
| nextSteps          | array    | Nei     | Liste over neste steg for å veilede brukere etter at malen er anvendt.             |

**Format:**

```json
{
    "schemaVersion": "0.1",
    "id": "min-mal",
    "owner": "digdir",
    "name": "Min første mal",
    "description": "Dette er en detaljert beskrivelse av hva malen gjør og hva den inneholder",
    "remove": [
        "App/TestDummy.cs",
        ".editorconfig"
    ],
    "packageReferences": [
        {
            "project": "App/*.csproj",
            "include": "Altinn.App.Clients.Fiks",
            "version": "8.10.0"
        }
    ],
    "nextSteps": [
        {
            "title": "Konfigurer Fiks-integrasjon",
            "description": "Følg veiledningen for å konfigurere Fiks Arkiv-integrasjonsinnstillingene i applicationmetadata.json",
            "type": "konfigurasjon",
            "links": [
                {
                    "label": "Fiks integrasjonsveiledning",
                    "ref": "https://docs.altinn.studio/nb/fiks/"
                }
            ]
        }
    ]
}
```

**Krav:**

Alle `template.json`-filer må være i samsvar med [`customtemplate.schema.json`](https://raw.githubusercontent.com/Altinn/altinn-studio/refs/heads/main/src/Designer/backend/src/Designer/Schemas/customtemplate.schema.json).

Se schemaet for påkrevde felt, typer og valideringsregler, eller lim inn malen din under
for rask bekreftelse på om den er gyldig.

{{< jsonschema-validator label="Din mal:" schemaUrl="https://raw.githubusercontent.com/Altinn/altinn-studio/refs/heads/main/src/Designer/backend/src/Designer/Schemas/customtemplate.schema.json" >}}

#### Feltdetaljer

##### packageReferences

`packageReferences`-arrayet lar deg spesifisere NuGet-pakker som skal legges til eller oppdateres i prosjektfiler når malen anvendes.

**Felter:**

| Felt     | Type   | Påkrevd | Beskrivelse                                                                             |
|----------|--------|---------|-----------------------------------------------------------------------------------------|
| project  | string | Ja      | Relativ bane eller glob-mønster til .csproj-fil(er). Absolutte baner er ikke tillatt.   |
| include  | string | Ja      | NuGet-pakkenavn (f.eks. "Newtonsoft.Json").                                             |
| version  | string | Ja      | Pakkeversjon (f.eks. "1.2.3", "1.2.3-preview", "[1.2.3]", "1.2.*").                     |

**Eksempel:**

```json
"packageReferences": [
    {
        "project": "App/*.csproj",
        "include": "Altinn.App.Clients.Fiks",
        "version": "8.10.0"
    },
    {
        "project": "App/App.csproj",
        "include": "Newtonsoft.Json",
        "version": "13.0.1"
    }
]
```

**Oppførsel:**
- Hvis pakken allerede eksisterer i prosjektfilen, vil versjonen bli oppdatert.
- Hvis pakken ikke eksisterer, vil den bli lagt til i en eksisterende `<ItemGroup>` med andre pakkereferanser, eller en ny `<ItemGroup>` vil bli opprettet.
- Prosjektmønsteret må matche nøyaktig én .csproj-fil.

##### nextSteps

`nextSteps`-arrayet gir veiledning til brukere etter at malen er anvendt, og hjelper dem med å forstå hvilke konfigurasjons- eller kodeendringer som trengs videre.

**Felter:**

| Felt        | Type   | Påkrevd | Beskrivelse                                                          |
|-------------|--------|---------|----------------------------------------------------------------------|
| title       | string | Ja      | Tittel på neste steg (minimum 5 tegn).                               |
| description | string | Ja      | Detaljert beskrivelse av steget (minimum 20 tegn).                   |
| type        | string | Nei     | Type steg: `konfigurasjon`, `kodeendring`, eller `dokumentasjon`.    |
| links       | array  | Nei     | Array av relaterte lenker med `label` og `ref` felter.               |

**Eksempel:**

```json
"nextSteps": [
    {
        "title": "Konfigurer Fiks-integrasjon",
        "description": "Følg veiledningen for å konfigurere Fiks-integrasjonsinnstillingene i applicationmetadata.json",
        "type": "konfigurasjon",
        "links": [
            {
                "label": "Fiks integrasjonsveiledning",
                "ref": "https://docs.altinn.studio/nb/fiks/"
            }
        ]
    },
    {
        "title": "Implementer tilpasset valideringslogikk",
        "description": "Legg til din tilpassede valideringslogikk i ValidationHandler.cs-filen for å validere skjemadata i henhold til dine forretningsregler.",
        "type": "kodeendring",
        "links": [
            {
                "label": "Valideringsdokumentasjon",
                "ref": "https://docs.altinn.studio/nb/app/development/logic/validation/"
            }
        ]
    }
]
```

**Støttede verdier for type:**
- `configuration` / `konfigurasjon` - Konfigureringsrelaterte steg
- `codeChange` / `code-change` / `kodeEndring` / `kodeendring` / `kode-endring` - Kodeendringsrelaterte steg
- `documentation` / `dokumentasjon` - Dokumentasjonsrelaterte steg

(Både engelske og norske varianter aksepteres og vil bli normalisert)

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
│       └── applicationmetadata.json  
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

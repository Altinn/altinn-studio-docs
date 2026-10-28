---
draft: true
title: Lage egne maler for nye apper
linktitle: Egne maler
description: Slik lager organisasjonen din maler som andre kan bruke når de lager en ny app i Altinn Studio
weight: 210
toc: true
tags: [needsReview]
---

En mal er et ferdig utgangspunkt for nye apper i organisasjonen din. Den kan for eksempel ha sidene, datamodellen og NuGet-pakkene som alle appene deres av en bestemt type trenger. Når noen lager en ny app i Altinn Studio, kan de velge malen. Da får appen innholdet i malen fra starten.

Malene ligger i Gitea, i repoet `{org}-content` til organisasjonen. For å lage eller endre en mal må du ha skrivetilgang til det repoet.

## Slik bruker andre malen

1. Gå til **Opprett ny app** i Altinn Studio.
2. Fyll ut **Eier** og **Navn**.
3. Velg en mal i **Velg mal fra listen**. Malene er gruppert etter organisasjonen som eier dem. Når du velger en mal, ser du navnet og beskrivelsen av den.
4. Klikk **Opprett app**.

Velger du ingen mal, får du standardappen, **Ingen mal valgt (standard tom mal brukes)**. Du kan bare velge én mal for hver app.

Listen viser malene fra alle organisasjonene du er medlem av, og de felles malene til Altinn, som ligger i organisasjonen `als`. Du kan bruke en mal fra én organisasjon til en app som en annen organisasjon eier. Har ingen organisasjon maler, viser ikke Altinn Studio valget i det hele tatt.

## Dette gjør Altinn Studio med malen

Når noen lager en app med malen, gjør Altinn Studio dette i rekkefølge:

1. Lager standardappen.
2. Sletter filene og mappene som står i `remove`.
3. Kopierer alt i mappen `content/` i malen til appen. Filer med samme navn i appen blir overskrevet. Andre filer i appen blir stående.
4. Legger til eller oppdaterer NuGet-pakkene i `packageReferences`.
5. Setter navnet, eieren og ID-en til den nye appen i `applicationmetadata.json` og i tekstene.

Malen blir lagt oppå standardappen, men den vet ikke hvilken versjon av appen den blir lagt oppå. Lag derfor malen for den appversjonen den skal brukes med. En v9-app har sidene i `App/ui/{taskId}/layouts/` og ingen `layout-sets.json`.

Endrer du malen senere, påvirker det bare apper som blir laget etterpå. Apper som allerede finnes, endrer seg ikke.

## Slik ser repoet ut

```text
{org}-content/
└── Templates/
    ├── templatemanifest.json
    ├── {mal-id-1}/
    │   ├── template.json
    │   └── content/
    │       ├── App/
    │       └── ...
    └── {mal-id-2}/
        ├── template.json
        └── content/
            └── ...
```

- `templatemanifest.json` er listen over malene i repoet. Det er denne listen Altinn Studio viser i **Velg mal fra listen**.
- `template.json` beskriver én mal: hva den heter, og hva Altinn Studio skal fjerne og legge til.
- `content/` har filene som Altinn Studio kopierer til appen. Mappen må finnes og ha minst én fil. Mangler den, kan ikke Altinn Studio lage appen.

Navnet på mappen til malen må være det samme som `id` i manifestet.

Altinn Studio henter malene fra standardgrenen i repoet. Du må altså pushe endringene dine før andre kan bruke dem.

## Lage en mal

1. Lag mappen `Templates/` i roten av `{org}-content`, hvis den ikke finnes.
2. Lag eller oppdater `Templates/templatemanifest.json`, se [templatemanifest.json](#templatemanifestjson).
3. Lag mappen `Templates/{mal-id}/`.
4. Lag `Templates/{mal-id}/template.json`, se [template.json](#templatejson).
5. Lag mappen `Templates/{mal-id}/content/`, og legg inn filene appen skal få.
6. Kontroller `template.json` mot schemaet, se [Kontrollere malen](#kontrollere-malen).
7. Commit og push endringene til standardgrenen.
8. Lag en app med malen, og kontroller at appen blir som du forventer.

## templatemanifest.json

Manifestet er en liste med én oppføring for hver mal:

{{< code-title >}}
{org}-content/Templates/templatemanifest.json
{{< /code-title >}}

```json
[
  {
    "id": "fiks-arkiv",
    "owner": "digdir",
    "name": "Skjema med arkivering",
    "description": "Et enkelt skjema som sender innsendingen til Fiks Arkiv."
  }
]
```

| Felt | Beskrivelse |
|---|---|
| `id` | ID-en til malen. Må være lik navnet på mappen til malen. |
| `owner` | Kortnavnet til organisasjonen som eier `{org}-content`. Altinn Studio henter malen fra repoet til denne organisasjonen. |
| `name` | Navnet brukerne ser i listen. |
| `description` | Beskrivelsen brukerne ser når de har valgt malen. |

Mangler `id`, `owner` eller `name`, viser ikke Altinn Studio malen. Er manifestet ikke gyldig JSON, viser Altinn Studio ingen av malene til organisasjonen, og brukerne får ingen feilmelding.

## template.json

{{< code-title >}}
{org}-content/Templates/{mal-id}/template.json
{{< /code-title >}}

```json
{
  "schemaVersion": "0.1",
  "id": "fiks-arkiv",
  "owner": "digdir",
  "name": "Skjema med arkivering",
  "description": "Et enkelt skjema som sender innsendingen til Fiks Arkiv.",
  "remove": [
    "App/TestDummy.cs",
    "App/ui/Task_1/layouts/Side1.json"
  ],
  "packageReferences": [
    {
      "project": "App/*.csproj",
      "include": "Newtonsoft.Json",
      "version": "13.0.3"
    }
  ],
  "nextSteps": [
    {
      "title": "Sett opp Fiks Arkiv",
      "description": "Legg inn innstillingene for Fiks Arkiv i appsettings.json før du publiserer appen.",
      "type": "konfigurasjon",
      "links": [
        {
          "label": "Fiks Arkiv",
          "ref": "https://docs.altinn.studio/nb/altinn-studio/v9/receive-data/fiks-arkiv/"
        }
      ]
    }
  ]
}
```

I eksempelet fjerner malen siden `Side1.json` fra standardappen. Da må `content/` ha sine egne sider og en `App/ui/Task_1/Settings.json` med sidene i riktig rekkefølge.

| Felt | Påkrevd | Beskrivelse |
|---|---|---|
| `schemaVersion` | Ja | Versjonen av schemaet. Den eneste gyldige verdien er `"0.1"`. |
| `id` | Ja | ID-en til malen, minst 3 tegn. |
| `owner` | Ja | Kortnavnet til organisasjonen som eier malen, minst 2 tegn. |
| `name` | Ja | Navnet på malen, minst 5 tegn. |
| `description` | Ja | Beskrivelsen av malen, minst 20 tegn. |
| `remove` | Nei | Filer og mapper Altinn Studio skal slette fra standardappen, se [remove](#remove). |
| `packageReferences` | Nei | NuGet-pakker Altinn Studio skal legge til eller oppdatere, se [packageReferences](#packagereferences). |
| `nextSteps` | Nei | Neste steg for den som har laget appen, se [nextSteps](#nextsteps). |

`template.json` kan ikke ha andre felt enn disse.

### remove

`remove` er en liste med stier fra roten av appen. En sti kan peke på en fil eller en mappe. Altinn Studio sletter mapper med alt innholdet. Finnes ikke stien, går Altinn Studio videre uten feil.

Skriv hele stien til hver fil eller mappe. Schemaet godtar tegn som `*` og `?`, men Altinn Studio tolker dem ikke som mønstre. `App/*.cs` sletter altså ingenting.

Stiene kan ikke begynne med `/`, ha `..` eller bruke `\`.

### packageReferences

Hver oppføring legger til eller oppdaterer én NuGet-pakke i en prosjektfil:

| Felt | Påkrevd | Beskrivelse |
|---|---|---|
| `project` | Ja | Stien til prosjektfilen, for eksempel `App/App.csproj`. Her kan du bruke mønstre som `App/*.csproj`. Stien må slutte på `.csproj`. |
| `include` | Ja | Navnet på pakken, for eksempel `Newtonsoft.Json`. |
| `version` | Ja | Versjonen av pakken, for eksempel `1.2.3`, `1.2.3-preview`, `[1.2.3]` eller `1.2.*`. |

`project` må treffe nøyaktig én prosjektfil. Treffer den ingen eller flere, kan ikke Altinn Studio lage appen.

Har prosjektfilen pakken fra før, oppdaterer Altinn Studio versjonen. Ellers legger Altinn Studio til pakken. Altinn Studio legger til pakkene etter at filene i `content/` er kopiert, så det virker også på en prosjektfil som kommer fra malen.

### nextSteps

`nextSteps` er en liste med steg den som har laget appen, bør gjøre etterpå:

| Felt | Påkrevd | Beskrivelse |
|---|---|---|
| `title` | Ja | Tittelen på steget, minst 5 tegn. |
| `description` | Ja | Beskrivelsen av steget, minst 20 tegn. |
| `type` | Nei | Hva slags steg det er. Gyldige verdier er `configuration` og `konfigurasjon`, `codechange`, `code-change` og `kodeendring`, og `documentation` og `dokumentasjon`. Andre verdier, for eksempel `kode-endring`, gjør malen ugyldig. |
| `links` | Nei | Lenker med `label` og `ref`. |

{{% notice info %}}
Altinn Studio viser ikke `nextSteps` noe sted ennå. Feltet gjør ingen skade, men brukerne ser det ikke. Vil du at de skal vite om neste steg, kan du skrive dem i en `README.md` i `content/`.
{{% /notice %}}

## Kontrollere malen

Altinn Studio kontrollerer `template.json` mot schemaet først når noen lager en app med malen. Er malen ugyldig, lager ikke Altinn Studio appen. Brukeren ser meldingen **Feil med malen** og **Kunne ikke opprette en app med denne malen. Sjekk at malen er gyldig og prøv igjen. Hvis feilen vedvarer, kontakt eieren av malen.** Meldingen sier ikke hva som er feil.

Kontroller derfor malen før du pusher den. Lim inn `template.json` her, eller kontroller den mot [`customtemplate.schema.json`](https://raw.githubusercontent.com/Altinn/altinn-studio/refs/heads/main/src/Designer/backend/src/Designer/Schemas/customtemplate.schema.json):

{{< jsonschema-validator label="Malen din:" schemaUrl="https://raw.githubusercontent.com/Altinn/altinn-studio/refs/heads/main/src/Designer/backend/src/Designer/Schemas/customtemplate.schema.json" >}}

Schemaet kontrollerer ikke alt. Lag alltid en app med malen og kontroller resultatet før du sier fra til andre at malen er klar. Det gjelder særlig `remove`, som ikke gir feil når en sti ikke finnes, og `project`, som må treffe nøyaktig én fil.

## Spørsmål du kan stille utviklerne

- Hvilke apper i organisasjonen ligner så mye på hverandre at en mal kan spare tid?
- Hvem har ansvar for å holde malen oppdatert når Altinn Studio eller appene endrer seg?
- Er malen laget for v9-apper?
- Har dere laget en testapp med malen etter den siste endringen?

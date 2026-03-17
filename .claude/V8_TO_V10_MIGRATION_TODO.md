# Migreringslogg: v8 til v10


Dette dokumentet holder oversikt over innhold som må migreres fra v8 til v10.

## Status-symboler
- 🔴 Ikke startet
- 🟡 Pågående
- 🟢 Ferdig

## Referansesider som må migreres

### Høy prioritet (brukes av mange emner)

#### 🔴 Datamodellering
**v8-sti:** `/nb/altinn-studio/v8/reference/data/data-modeling/`
**Foreslått v10-sti:** `/nb/altinn-studio/v10/develop-a-service/reference/data/data-modeling/`
**Brukes av:**
- Underskjema (subform)
- Sannsynligvis mange andre steder

#### 🔴 Pages/Settings.json (Layout-innstillinger)
**v8-sti:** `/nb/altinn-studio/v8/reference/ux/pages/`
**Foreslått v10-sti:** `/nb/altinn-studio/v10/develop-a-service/reference/ux/pages/` eller `/nb/altinn-studio/v10/develop-a-service/reference/configuration/pages/`
**Brukes av:**
- Underskjema (subform) - lenke til #innstillinger-delen
- Sannsynligvis mange andre steder

#### 🔴 CustomButton-komponent
**v8-sti:** `/nb/altinn-studio/v8/reference/ux/components/custombutton/`
**Foreslått v10-sti:** `/nb/altinn-studio/v10/develop-a-service/reference/ux/components/custombutton/`
**Brukes av:**
- Underskjema (subform) - for closeSubform-handling
- Sannsynligvis mange andre steder

### Bilder og ressurser

#### 🔴 Underskjema-bilder
**v8-sti:**
- `/nb/altinn-studio/v8/guides/development/subform/studio/create-subform-studio.png`
- `/nb/altinn-studio/v8/guides/development/subform/studio/add-subform-column-studio.png`

**Foreslått v10-sti:**
- `/nb/altinn-studio/v10/develop-a-service/subform/studio/create-subform-studio.png`
- `/nb/altinn-studio/v10/develop-a-service/subform/studio/add-subform-column-studio.png`

**Status:** Bildene må kopieres til v10-strukturen

## Fullførte migreringer

### 🟢 Underskjema konfigurasjon
**v8-sti:** `/nb/altinn-studio/v8/guides/development/subform/config-options/`
**v10-sti:** `/nb/altinn-studio/v10/develop-a-service/subform/config-options/`
**Status:** Allerede migrert og oppdatert i backend-manual/_index.nb.md

## Notater

### Strukturforskjeller v8 vs v10
- v8: `/reference/ux/` for UI-komponenter
- v10: `/develop-a-service/reference/` for det meste av referansematerialet
- v8: `/guides/development/` for veiledninger
- v10: `/develop-a-service/` for det meste av innholdet

### Anbefalinger for videre arbeid
1. Start med referansesider som brukes mest på tvers (datamodellering, komponenter)
2. Når en referanseside migreres, søk gjennom hele v10 for å oppdatere alle lenker
3. Bruk denne filen til å dokumentere hvert migreringsarbeid

## Hvordan bruke denne filen
Når du migrerer innhold:
1. Endre status-symbolet til 🟡 når du starter
2. Oppdater stier og notater underveis
3. Endre til 🟢 når ferdig
4. Søk og erstatt alle lenker til den gamle v8-stien med nye v10-stier

## Søk etter v8-lenker
For å finne alle v8-lenker i et emne:
```bash
grep -r "/nb/altinn-studio/v8/" /path/to/v10/content/
```

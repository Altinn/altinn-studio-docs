# Gjennomgang: v8 vs. v9 – innhold som må vurderes

**Dato:** 2026-08-17  
**Formål:** Kartlegge hvilke v8-sider som er endret etter at v9-innholdet ble fryst (ca. slutten av mai 2026), og om tilsvarende innhold i v9 er oppdatert eller mangler.

---

## Sammendrag

| Status | Antall temaer |
|--------|--------------|
| 🔴 Mangler i v9 (kandidater for migrering) | 6 |
| 🟠 v9 er utdatert – v8 nyere (alle felles emner gjennomgått) | 14 |
| 🟢 v9 er nyere enn v8 (OK) | 103 |
| ⚫ Synkronisert (samme dato) | 2 |
| ⚠️ Bør fjernes fra v9 | 1 |

> **Metode:** Systematisk sammenligning av alle felles emner (mappenavn) i v8 og v9 via git-dato. Totalt 119 felles emner av 331 i v8 og 149 i v9. Merk: sammenligningen bruker mappenavn som nøkkel, noe som kan gi enkelte falske treff der samme mappenavn finnes i ulike kontekster.

---

## 1. Mangler i v9 – må vurderes for migrering

Disse temaene finnes ikke i v9. Listen kombinerer funn fra to analyser: endringer etter juni 2026 og utviklerendringer i v8 i perioden januar–mai 2026.

### Nyere endringer (etter juni 2026)

| Tema | v8-sti | Sist endret i v8 | Merknad |
|------|--------|-----------------|---------|
| **AI-assistent i Studio** | `guides/development/assistant/` | 2026-08-14 | Bør migreres – veldig ny |
| **Integrasjon: SBS-oppsett** | `guides/integration/sbs/setup/` | 2026-08-17 | Bør migreres – oppdatert i dag |
| **Integrasjon: Correspondence** | `guides/integration/correspondence/` | 2026-06-19 | Vurder migrering |
| **Databehandling: Kalkulasjon** | `reference/logic/dataprocessing/calculation/` | 2026-06-18 | 6 nye filer – vurder migrering |
| **Grupperinger: non-repeating** | `reference/ux/fields/grouping/non-repeating/` | 2026-06-25 | v9 har kun Group.md/RepeatingGroup.md |
| **Autorisasjon: Roller i ER** | `reference/configuration/authorization/.../roles_ER/` | 2026-07-17 | v9 har `authorization/rules/` – sjekk om dekket |

### Utviklerendringer i v8 under migrasjonsperioden (jan–mai 2026) – ikke med i v9

Disse ble endret av utviklere i v8 i perioden januar–mai 2026, men er ikke tatt med i v9. **Viktig:** Timingen var god – v9-filene som finnes ble opprettet *etter* disse v8-endringene, så det er ikke snakk om tapte oppdateringer for eksisterende v9-sider. Disse temaene ble rett og slett ikke migrert, og må vurderes av produkteier.

| Tema | v8-sti | Sist endret i v8 |
|------|--------|-----------------|
| **Fiks Arkiv-integrasjon** | `guides/development/fiks-arkiv/` | 2026-05-21 |
| **Maskinporten: legg til scopes** | `guides/integration/maskinporten/add-scopes/` | 2026-05-21 |
| **Events / Subscribing** | `reference/logic/events/` | 2026-05-21 |
| **Eksternt API** | `reference/data/external-api/` | 2026-05-21 |
| **SigningDocumentList-komponent** | `reference/ux/components/SigningDocumentList/` | 2026-05-18 |
| **Grupperinger: repeating (tabell/redigering)** | `reference/ux/fields/grouping/repeating/` | 2026-05-13 |
| **Styling** | `reference/ux/styling/` | 2026-04-07 |
| **Sider (pages)** | `reference/ux/pages/` | 2026-04-07 |
| **SBS-integrasjon** | `guides/integration/sbs/` | 2026-03-24 |
| **Egendefinerte maler** | `guides/development/custom-templates/` | 2026-03-17 |
| **Datapersistering** | `reference/data/persistence/` | 2026-03-12 |
| **SigningActions-komponent** | `reference/ux/components/SigningActions/` | 2026-02-19 |
| **PersonLookup-komponent** | `reference/ux/components/PersonLookup/` | 2026-01-27 |
| **Map-komponent** | `reference/ux/components/Map/` | 2026-03-26 |

---

## 2. v9 er utdatert – v8 er nyere

Disse temaene finnes i begge versjoner, og v8 er nyere. Basert på fullstendig gjennomgang av alle 119 felles emner.

| Tema (mappenavn) | v8 sist endret | v9 sist endret | v8-sti |
|------|---------------|---------------|--------|
| **integration** | 2026-08-17 | 2026-06-16 | `guides/integration/` |
| **maskinporten** | 2026-08-17 | 2026-06-16 | `guides/integration/maskinporten/` |
| **development** | 2026-08-14 | 2026-08-07 | `guides/development/` |
| **configuration** | 2026-08-12 | 2026-06-16 | `reference/configuration/` |
| **authorization** | 2026-07-17 | 2026-06-16 | `reference/configuration/authorization/` |
| **data-model** | 2026-07-17 | 2026-06-16 | `concepts/data-model/` |
| **restricted-data** | 2026-07-17 | 2026-06-16 | `concepts/data-model/restricted-data/` |
| **components** | 2026-07-10 | 2026-06-16 | `reference/ux/components/` |
| **api-signing** | 2026-06-18 | 2026-06-16 | `guides/development/signing/api-signing/` |
| **backend-manual** | 2026-06-18 | 2026-06-16 | `reference/logic/dataprocessing/calculation/backend-manual/` |
| **dataprocessing** | 2026-06-18 | 2026-06-16 | `reference/logic/dataprocessing/` |
| **expression-validation** | 2026-06-18 | 2026-06-16 | `reference/logic/validation/expression-validation/` |
| **role-based-signing** | 2026-06-18 | 2026-06-16 | `guides/development/signing/role-based-signing/` |
| **studio** *(beregningssteg)* | 2026-06-18 | 2026-06-16 | `reference/logic/dataprocessing/calculation/studio/` |

---

## 3. v9 er nyere – sannsynligvis OK

103 emner har nyere dato i v9 enn i v8. Disse er trolig oppdatert som en del av migreringen eller etter at ny versjon ble klar. De krever ikke umiddelbar handling, men er inkludert for fullstendighetens skyld.

De 10 nyeste i v9 (sortert etter v9-dato):

| Tema | v8-dato | v9-dato | v9-sti |
|------|---------|---------|--------|
| **auto-delete** | 2025-09-29 | 2026-08-10 | `reference/configuration/process/auto-delete/` |
| **data** | 2026-05-21 | 2026-08-10 | `develop-a-service/data/` |
| **eFormidling** | 2026-02-05 | 2026-08-10 | `receive-data/eFormidling/` |
| **files** (validering) | 2025-09-29 | 2026-08-10 | `develop-a-service/data/validation/files/` |
| **pdf** | 2026-06-15 | 2026-08-10 | `develop-a-service/process/pdf/` |
| **signing** (referanse) | 2026-06-18 | 2026-08-10 | `develop-a-service/reference/process/tasks/signing/` |
| **validation** | 2026-06-18 | 2026-08-10 | `develop-a-service/data/validation/` |
| **basic-form** | 2025-09-29 | 2026-08-07 | `getting-started/development/basic-form/` |
| **getting-started** | 2026-05-05 | 2026-08-07 | `getting-started/` |
| **expressions** | 2026-06-18 | 2026-06-30 | `develop-a-service/expressions/` |

---

## 4. Synkronisert

| Tema | Dato | v8-sti | v9-sti |
|------|------|--------|--------|
| **messagebox** | 2026-08-12 | `reference/configuration/messagebox/` | `reference/configuration/messagebox/` |
| **reference** | 2026-08-12 | `reference/` | `develop-a-service/reference/` |

---

## 5. Bør fjernes fra v9

Disse temaene finnes i v9, men er bekreftet (via Slack) at ikke skal være med i ny versjon.

| Tema | v9-sti | Status i v9 | Merknad |
|------|--------|-------------|---------|
| **Dynamikk** | `develop-a-service/look-and-feel/dynamics/` | `draft: true`, `tags: [needsReview]` | Innholdet finnes ikke i oppdatert v8. Siden er en stub som peker til uttrykk. Anbefaling: **slett fra v9** |

---

## 6. Øvrige temaer – sjekk, men trolig OK

Disse ble endret i v8 etter migreringen, men har tilsvarende i v9 og dato-differansen er liten.

| Tema | v8 sist endret | v9 sist endret | Merknad |
|------|---------------|---------------|---------|
| **Databehandling (dataprocessing)** | 2026-06-18 | 2026-06-16 | v9 har dessuten en kopi i `parkinglot/` – bør avklares |
| **Uttrykkvalidering** | 2026-06-18 | 2026-06-16 | Liten differanse |
| **OrganisationLookup** | 2026-06-18 | 2026-06-16 | Annet filformat i v9 (ikke `.nb.md`) |

---

## Vedlegg: Temaer som ble slettet fra v8 etter migrering

| Tema | Merknad |
|------|---------|
| `reference/ux/fields/grouping/panel/` | Slettet i commit «Fix outdated Group component grouping docs». v9 har `Panel.md` i components – sjekk om v9-siden er oppdatert i tråd med dette. |

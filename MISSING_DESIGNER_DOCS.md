# Manglende Designer-dokumentasjon

Denne filen holder oversikt over artikler som mangler dokumentasjon for hvordan oppgaver gjøres i Altinn Studio Designer.

Filer som er merket med taggen `missingDesignerDocs` trenger nye veiledninger for Designer-funksjonalitet.

## Signering

### Rolle- og tilgangspakkebasert signering
**Fil:** `content/altinn-studio/v10/develop-a-service/signing/role-based-signing/_index.nb.md`

**Manglende Designer-dokumentasjon:**
- Punkt 1: Legg til en signeringsoppgave i appens prosess
- Punkt 2: Legg til layout-set for signering

**Status:** Designer-funksjonalitet er nå tilgjengelig, dokumentasjon må skrives

**Studio-filer som må oppdateres:**
- `content/altinn-studio/v10/develop-a-service/signing/role-based-signing/studio/add-process-task.nb.md`
- `content/altinn-studio/v10/develop-a-service/signing/role-based-signing/studio/configure-layouts.nb.md`

---

## Slik bruker du denne filen

1. **Finne filer som mangler Designer-docs:**
   ```bash
   grep -r "missingDesignerDocs" content/ --include="*.md"
   ```

2. **Når du skriver ny Designer-dokumentasjon:**
   - Erstatt placeholder-filen (som peker til `placeholder-manual-task.nb.md`) med faktisk dokumentasjon
   - Fjern `missingDesignerDocs`-taggen fra hovedfilen
   - Slett eller kommenter ut linjen i denne oversiktsfilen

3. **Placeholder-fil:**
   - `content/altinn-studio/v10/develop-a-service/signing/placeholder-manual-task.nb.md`
   - Denne brukes i studio-filer som ennå ikke har egen dokumentasjon
   - Den viser meldingen: "Dette steget må du gjøre manuelt. Støtte for konfigurasjon i Altinn Studio kommer senere. Se fanen **Manuelt oppsett** for veiledning."

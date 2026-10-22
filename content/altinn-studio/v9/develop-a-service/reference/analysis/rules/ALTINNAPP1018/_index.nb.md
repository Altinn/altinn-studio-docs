---
draft: true
title: "ALTINNAPP1018: prosessen navngir en datatype appen hopper over"
description: "En oppgave i process.bpmn navngir en datatype som appen hopper over i stedet for å feile"
weight: 118
---

Denne diagnostikken meldes når en oppgave i `config/process/process.bpmn` navngir en datatype i
en innstilling der appen hopper over en id den ikke kan bruke, i stedet for å feile. Ingenting
feiler, men innstillingen gjør ikke det den sier. Meldingen navngir oppgaven, datatypen og
elementet som navngir den, og sier hva appen hopper over.

Regelen melder:

- en oppføring i `uniqueFromSignaturesInDataTypes` som ikke navngir noen datatype. Appen hopper
  over den når den kontrollerer at signataren ikke har signert fra før.
- en oppføring i `dataTypesToSign` som ikke navngir noen datatype, mens andre oppføringer gjør det.
  Signeringshandlingen tar den ikke med i det brukeren signerer.
- en oppføring i `dataTypesToSign` som bare skiller seg fra id-en til en datatype i store og små
  bokstaver. Signeringshandlingen ser bort fra store og små bokstaver og signerer dataene, men
  visningen av dokumentene som skal signeres, krever nøyaktig samme id og viser dem ikke.
- `subformDataTypeId` i `<altinn:subformPdfConfig>` på en oppgave som ikke er en
  `subformPdf`-oppgave, når den ikke navngir noen datatype. Oppgaven lager ingen PDF-er for den og
  fullføres likevel.

En tom oppføring teller som en oppføring som ikke navngir noen datatype. Navngir ingen av
oppføringene i `dataTypesToSign` en datatype, meldes det av ALTINNAPP1013 i stedet.

Regelen kontrollerer bare oppgaver en instans kan nå, og oppføringene for signering bare når
oppgaven har handlingen `sign` i `<altinn:actions>`.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Rett id-en slik at den stemmer nøyaktig med datatypen, eller legg til datatypen.

Se [hvordan du setter opp en signeringsoppgave]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}}).

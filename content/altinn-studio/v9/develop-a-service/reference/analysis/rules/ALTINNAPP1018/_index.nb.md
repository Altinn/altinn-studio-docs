---
title: "ALTINNAPP1018: prosessen peker på en datatype appen hopper over"
description: "En oppgave med handlingen sign navngir en datatype appen ikke finner, og appen hopper over den i stedet for å feile"
weight: 118
---

Denne diagnostikken melder fra når en oppgave i `config/process/process.bpmn` navngir en
datatype appen ikke finner, men appen hopper over id-en i stedet for å feile. Det gjelder i
oppgaver som en instans kan nå, og som har handlingen `sign`:

- En oppføring i `<altinn:uniqueFromSignaturesInDataTypes>` har en id som ingen datatype har.
  Appen hopper over den når den sjekker at den som signerer, ikke har signert fra før.
- En oppføring i `<altinn:dataTypesToSign>` har en id som ingen datatype har, mens andre
  oppføringer i listen finnes. Handlingen `sign` tar ikke med den datatypen i det brukeren
  signerer.
- En oppføring i `<altinn:dataTypesToSign>` stemmer med en datatype bare hvis du ser bort fra
  store og små bokstaver. Handlingen `sign` signerer den, men signeringsvisningen krever
  nøyaktig samme id og viser ikke dokumentene.

Meldingen navngir oppgaven, oppføringen, hva appen hopper over og hvordan du retter det.

Kategori `Process`, alvorlighetsgrad **advarsel**. Det er en advarsel fordi ingenting feiler.

Rett id-en slik at den stemmer nøyaktig med en datatype, eller legg til datatypen i
`applicationmetadata.json`.

Finnes ingen av datatypene i `<altinn:dataTypesToSign>`, melder bygget
[ALTINNAPP1013]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1013" >}})
i stedet.

Se [referansen for signeringsoppgaven]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}}).

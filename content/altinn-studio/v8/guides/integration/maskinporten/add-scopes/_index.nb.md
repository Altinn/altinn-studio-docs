---
title: Legg til Maskinporten-scopes i en app
linktitle: Legg til scopes
description: Steg-for-steg-veiledning for å legge Maskinporten-scopes til en app i Altinn Studio.
weight: 10
toc: true
---

Denne veiledningen viser hvordan du legger Maskinporten-scopes til en app i Altinn Studio.

Før du starter må du være logget inn med Ansattporten på vegne av virksomheten som eier appen. Appen må også ha en tjenesteeierregel i `App/config/authorization/policy.xml` som gir `[org]` rettighetene `read` og `write`.

{{% notice info %}}
Hvis appen bare trenger standardscopene for tjenesteeier, `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write`, kan apper som bruker Altinn App v8.3 eller nyere bruke knappen **Legg til standard-scopes** når den vises. Apper som bruker Altinn App v9 får disse scopene automatisk hvis de mangler.
{{% /notice %}}

## Steg

1. Åpne appen i Altinn Studio. Gå til **Innstillinger**, åpne fanen **Maskinporten**, og velg **Legg til**.

   ![Maskinporten-fanen i appinnstillingene med knappen Legg til](maskinporten-scopes-overview.nb.png "Maskinporten-fanen i appinnstillingene.")

2. I dialogen **Legg til nytt scope** kan du søke etter scopes som virksomheten har tilgang til.

   ![Dialogen Legg til nytt scope](maskinporten-scopes-dialog.nb.png "Dialogen Legg til nytt scope.")

3. Søk etter scopene appen trenger, og marker ett eller flere scopes i listen.

   ![To Maskinporten-scopes er valgt i dialogen](maskinporten-scopes-selected-in-dialog.nb.png "Velg scopes i dialogen.")

4. Velg **Fullfør** for å lagre scopene i appinnstillingene.

   ![Valgte Maskinporten-scopes vises i appinnstillingene](maskinporten-scopes-selected.nb.png "Valgte scopes vises i appinnstillingene.")

5. Bygg og publiser appen på nytt. Scope-endringer trer i kraft neste gang appen bygges og publiseres.
{.floating-bullet-numbers}

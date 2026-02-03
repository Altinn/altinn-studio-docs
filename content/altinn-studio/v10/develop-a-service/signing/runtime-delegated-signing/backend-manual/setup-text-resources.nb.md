---
draft: true
headless: true
hidden: true
tags: [needsReview, translate]
---

Dersom du ønsker å overstyre standardtekstene:

Legg til en [teksressurs-fil](/nb/altinn-studio/v10/reference/ux/texts/) under ´App/config/texts´ for hvert språk du vil støtte.

Med `CommunicationConfig`-oppsettet for en oppgitt person som skal signere (signatar) i implementasjonen din av `ISigneeProvider`-grensesnittet kan du knytte opp tekstressurser for å **overstyre** innholdet i melding til innboksen i Altinn, samt sms og e-post som sendes for å varsle den som skal signere om en signeringsoppgave.
Disse kan du kalle hva du vil, og koble dem opp til `CommunicationConfig` i neste punkt (punkt 4.).

Eksempel på tekstressurser for varsling med egne tekster for e-post, samt kvittering:

{{% notice warning %}}
Legg merke til at tekstressursene for innhold i Altinn innboksen har en `$instanceUrl$` plassholder (placeholder).
Altinn erstatter den automatisk med en lenke til skjemaet. Hvis du overstyrer dette uten å bruke denne plassholderen, vil IKKE mottakeren kunne finne frem til skjemaet med signeringsoppgaven!
{{% /notice %}}

{{% insert "content/altinn-studio/v10/develop-a-service/signing/runtime-delegated-signing/backend-manual/setup-text-resources-code-01.en.md" %}}

Du kan ikke overstyre kvitteringen per person som skal signere, bare generelt for alle. Her må tekstressursene ha følgende nøkler for at overstyringen skal fungere:
tekstressursene være de følgende nøklene for at overstyringen skal skje:

`signing.correspondence_receipt_title` - tittel på kvitteringsmelding
`signing.correspondence_receipt_summary` - undertittel på kvitteringsmelding
`signing.correspondence_receipt_body` - innhold i kvitteringsmelding

{{% insert "content/altinn-studio/v10/develop-a-service/signing/runtime-delegated-signing/backend-manual/setup-text-resources-code-02.en.md" %}}

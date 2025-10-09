---
headless: true
hidden: true
---

Dersom du ønsker å overstyre standardtekstene:

Legg til en [teksressurs-fil](/nb/altinn-studio/v8/reference/ux/texts/) under ´App/config/texts´ for hvert språk du vil støtte.

Med `CommunicationConfig` oppsettet for en oppgitt signatar i implementasjonen din av `ISigneeProvider` interfacet, kan
du knytte opp tekstressurser for å **overstyre** innholdet i melding til innboksen i Altinn, samt sms og e-post som sendes
for å varsle signatar om en signeringsoppgave.
Disse kan du kalle hva du vil, og koble dem opp til `CommunicationConfig` i neste punkt (punkt 4.).

Eksempel på tekstressurser for varsling med egne tekster for e-post, samt kvittering:

{{% notice warning %}}
Legg merke til at tekstressursene for innhold i Altinn innboksen har en `$instanceUrl$` plassholder (placeholder). 
Det vil erstattes med en lenke til skjemaet. Hvis dette overstyres uten å bruke denne plassholderen, så vil IKKE mottaker
kunne finne frem til skjemaet med signeringsoppgaven!
{{% /notice %}}

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/setup-text-resources-code-01.en.md" %}}

Overstyring av kvittering er ikke mulig å gjøre per signatar, det gjøres generelt for alle signatarer. Her må navnet på
tekstressursene være de følgende nøklene for at overstyringen skal skje:

`signing.correspondence_receipt_title` - tittel på kvitteringsmelding
`signing.correspondence_receipt_summary` - undertittel på kvitteringsmelding
`signing.correspondence_receipt_body` - innhold i kvitteringsmelding

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/setup-text-resources-code-02.en.md" %}}
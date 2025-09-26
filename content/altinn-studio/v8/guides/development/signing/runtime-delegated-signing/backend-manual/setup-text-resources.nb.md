---
hidden: true
---

Dersom du ønsker å overstyre standardtekstene:

Legg til en [teksressurs-fil]({{< relref "/altinn-studio/v8/reference/ux/texts/" >}}) under ´App/config/texts´ for hvert språk du vil støtte.

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

```
    {
      "id": "signing.correspondence_title_common",
      "value": "Oppgave - Signer stiftelsesdokumenter"
    },
    {
      "id": "signing.correspondence_summary_stifter_person",
      "value": "Du har blitt lagt til som signatar."
    },
    {
      "id": "signing.correspondence_summary_stifter_organisasjon",
      "value": "Organisjonen har blitt lagt til som signatar."
    },
    {
      "id": "signing.correspondence_body_stifter_person",
      "value": "Du har blitt lagt til som signatar for stiftelsesdokumenter. <br /> $instanceUrl$ <br /><br />Hvis du lurer på noe, ta kontakt med Brønnøysundregistrene på telefon 75 00 75 00."
    },
    {
      "id": "signing.correspondence_body_stifter_organisasjon",
      "value": "Organisjonen har blitt lagt til som signatar for stiftelsesdokumenter. <br /> $instanceUrl$ <br /><br />Ved spørsmål, ta kontakt med Brønnøysundregistrene på telefon 75 00 75 00."
    },
    {
      "id": "signing.notification_content",
      "value": "Hei $correspondenceRecipientName$,\n\nDu har mottatt stiftelsesdokumenter for signering i Altinn. Logg inn på Altinn for å signere dokumentene.\n\nMed vennlig hilsen\nBrønnøysundregistrene"
    },
    {
      "id": "signing.email_subject",
      "value": "Stiftelsesdokumenter mottatt for signering i Altinn. Gå til Altinn-innboks for å signere."
    },
```

Overstyring av kvittering er ikke mulig å gjøre per signatar, det gjøres generelt for alle signatarer. Her må navnet på
tekstressursene være de følgende nøklene for at overstyringen skal skje:

`signing.correspondence_receipt_title` - tittel på kvitteringsmelding
`signing.correspondence_receipt_summary` - undertittel på kvitteringsmelding
`signing.correspondence_receipt_body` - innhold i kvitteringsmelding

Eksempel:

```
{
  "id": "signing.correspondence_receipt_title",
  "value": "Receipt: Signing of founding documents"
},
{
  "id": "signing.correspondence_receipt_summary",
  "value": "You have signed the founding documents"
},
{
  "id": "signing.correspondence_receipt_body",
  "value": "The documents you have signed are attached. These can be downloaded if desired. <br /><br />If you have any questions, contact the Brønnøysund Register Centre at phone 75 00 75 00."
},
```

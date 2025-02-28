---
hidden: true
---

Legg til en [teksressurs-fil](/nb/altinn-studio/reference/ux/texts/) under ´App/config/texts´ for hvert språk du vil støtte.

Her definerer du tekstressurser som skal brukes i kommunikasjon med bruker.

Tekstressurs-id'er for signeringsflyten settes opp for å **overstyre** innholdet i meldinger som blir sendt til altinn-innboksen.

`signing.correspondence_cta_title` - tittel på varselmelding til signatar </br>
`signing.correspondence_cta_summary` - undertittel på varselmelding signatar </br>
`signing.correspondence_cta_body` - innhold i varselmelding signatar

`signing.correspondence_receipt_title` - tittel på kvitteringsmelding
`signing.correspondence_receipt_summary` - undertittel på kvitteringsmelding
`signing.correspondence_receipt_body` - innhold i kvitteringsmelding

Du kan også sette opp tekstressurser for å **overstyre** innholdet i sms og e-post som sendes for å varsle signatar og signeringsoppgave.
Disse kan du kalle hva du vil, og koble dem opp til notification implementasjonen i neste punkt (punkt 4.).

Eksempel på tekstressurser for varsling med egne tekster for e-post, samt kvittering:

```

    {
      "id": "signing.correspondence_receipt_title",
      "value": "Kvittering: Signering av stiftelsesdokumenter"
    },
    {
      "id": "signing.correspondence_receipt_summary",
      "value": "Du har signert stiftelsesdokumentene"
    },
    {
      "id": "signing.correspondence_receipt_body",
      "value": "Dokumentene du har signert er vedlagt. Disse kan lastes ned om ønskelig. <br /><br />Hvis du lurer på noe, ta kontakt med Brønnøysundregistrene på telefon 75 00 75 00."
    },
    {
      "id": "signing.correspondence_cta_title",
      "value": "Oppgave - Signer stiftelsesdokumenter"
    },
    {
      "id": "signing.correspondence_cta_summary",
      "value": "Du har blitt lagt til som signatar."
    },
    {
      "id": "signing.correspondence_cta_body",
      "value": "Du har blitt lagt til som signatar for stiftelsesdokumenter. <br /> $InstanceUrl <br /><br />"
    },
    {
      "id": "signing.notification_content",
      "value": "Hei {0},\n\nDu har mottatt stiftelsesdokumenter for signering i Altinn. Logg inn på Altinn for å signere dokumentene.\n\nMed vennlig hilsen\nBrønnøysundregistrene"
    },
    {
      "id": "signing.email_subject",
      "value": "Stiftelsesdokumenter mottatt for signering i Altinn. Gå til Altinn-innboks for å signere."
    },
```

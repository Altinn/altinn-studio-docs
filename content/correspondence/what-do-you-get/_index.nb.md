---
title: Hva får du?
linktitle: Hva får du?
description: Overordnet oversikt og beskrivelse av nøkkelfunksjonalitetene og egenskapene til Altinn Melding.
tags: []
toc: true
weight: 20
---

### Sikkerhet
Bruk av sikkerhetsmekanismer som beskytter innholdet, finn mer informasjon i denne artikkelen [Azure Storage-tjenestekryptering](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption)

### Logging 
Altinn Melding sørger for at alle hendelser og prosesser blir nøye loggført, slik at det er enkelt å etterprøve hvem som har gjort hva og når.

### Varsling
- Automatisk varsling via e-post eller SMS til brukere når de mottar nye meldinger.
- Re-varsling etter 7 dager dersom meldingen ikke blir åpnet. 
- Tilpassede varslingsinnstillinger basert på brukerpreferanser. Dette innebærer varslingsmaler og egendefinerte varslingsadresser.

### Events (hendelsesabonnementer)
Du kan motta varsler om hendelser knyttet til sendte meldingstjenester, ved å sette opp et abonnement for den aktuelle tjenesten. Du kan for eksempel se om filen er kommet frem til mottaker og om den er åpnet.

### Tilgangsstyring
- Avansert tilgangsstyring sikrer at du kan være trygg på at kun autoriserte brukere får tilgang til bestemte filoverføringer.
- Altinn Melding støtter ulike sikkerhetsnivåer (0–4) for å imøtekomme avsenders krav til meldingssikkerhet. 

### Støtte for ulike meldingsformater
- Mulighet for å sende meldinger med Markdown eller ren tekst.
- Støtte for [numeriske tegnreferanser i HTML.](https://en.wikipedia.org/wiki/Numeric_character_reference)
- Støtte for opptil 100 vedlegg per melding.
- Støtte for mange filtyper: .doc, .xls, .docx, .xlsx, .ppt, .pps, .zip, .pdf, .html, .txt, .xml, .jpg, .gif, .bmp, .png og .json.
- Støtte for vedlegg opptil 2 GB.

### Avansert støtte for lenking til innhold og vedlegg
- Som alternativ til å sende meldingsinnhold og vedlegg direkte i meldingene,
  kan avsender velge å sende lenker til innhold og vedlegg.
- Altinn Melding har funksjonalitet for å laste opp filer med meldingsinnhold og vedlegg, 
  for sikker lagring og gjenbruk på tvers av flere meldinger.
  Løsningen har en begrensning på max. 100 vedlegg pr. melding. 
- Det er også mulig å lenke til innhold og vedlegg som er lagret andre steder, 
  f.eks. on-premise hos avsender eller i avsenders prefererte skyløsning.

### Arkivering og oppbevaring
- Alle meldinger lagres i brukerens meldingsboks i Altinn.
- Oppbevaringsregler som sikrer at meldinger er tilgjengelige så lenge det er nødvendig i henhold til lovgivning og retningslinjer.

### API-tilgang
- API-er som tillater integrasjon med andre systemer for sending og mottak av meldinger.
- Mulighet for automatisert meldingshåndtering via integrerte systemer.

### Integrasjon med Dialogporten og Arbeidsflate
- En Altinn 3 Melding oppretter automatisk en dialog i Dialogporten.
- Meldinger med en eksisterende dialog som ekstern referanse vil opprette en transmission som gir en logisk fremstilling av relaterte meldinger.
- Løsningen gir et enhetlig brukergrensesnitt på tvers gjennom Altinn 3 Arbeidsflate og Dialogporten.

## Oppsummering av fordelene med Altinn Melding?
Altinn Melding tilbyr flere unike fordeler som gjør den til et foretrukket valg for digital kommunikasjon 
med offentlige etater i Norge:

* Sentralisert kommunikasjon: Altinn Melding fungerer som en sentral hub hvor alle kommunikasjoner med offentlige myndigheter kan administreres fra én konto. Dette eliminerer behovet for å håndtere flere kontoer eller plattformer.
* Sikkerhet og konfidensialitet: Vanlig e-post betraktes i mange sammenhenger ikke som sikkert nok. Altinn Melding kan brukes for overføring av sensitiv informasjon. Plattformen benytter sterke autentiserings- og krypteringsteknikker for å beskytte brukernes data.
* Automatisering av innsendinger: Systemet tillater automatisering av innsendinger som skattemeldinger og årsregnskap, noe som sparer tid og reduserer feil.
* Tilgjengelighet: Altinn er tilgjengelig hele døgnet, slik at brukere kan sende inn og motta dokumenter når som helst, noe som gir stor fleksibilitet sammenlignet med tradisjonelle posttjenester som har begrensede åpningstider.
* Integrering med andre systemer: Altinn er designet for å integrere lett med andre systemer både i privat og offentlig sektor, noe som muliggjør en sømløs dataflyt og effektivitet.
* Miljøvennlig: Ved å redusere behovet for papirbasert kommunikasjon, bidrar Altinn til en mer miljøvennlig administrasjon.

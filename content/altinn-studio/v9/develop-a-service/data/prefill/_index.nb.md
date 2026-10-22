---
draft: true
title: Forhåndsutfylling
linktitle: Forhåndsutfylling
description: Oversikt over måtene du kan forhåndsutfylle data i appen på.
tags: [Reviewed]

aliases:
- /nb/altinn-studio/guides/prefill/
---

Altinn-appen din kan automatisk fylle ut deler av skjemaet før brukeren begynner. Det finnes flere forskjellige metoder
for å gjøre dette, og du kan bruke dem sammen eller hver for seg.

## Konfigurasjonsbasert oppsett
### Hva gjør denne funksjonen?
Altinn-appen din kan automatisk fylle ut deler av skjemaet før brukeren begynner. Du kan hente dataene fra
- Enhetsregisteret (for bedriftsinformasjon)
- Folkeregisteret (for personinformasjon)
- brukerens Altinn-profil

Når noen starter skjemaet, fyller appen automatisk ut feltene du velger med riktige data.

Du kan sette det opp på siden **Datamodell** i Altinn Studio, under **Forhåndsutfylling** i egenskapene til et felt, eller i en konfigurasjonsfil.

### Når bør du bruke dette?
Når du skal forhåndsutfylle data fra en av kildene over. Du kan bare bruke et begrenset sett med felt.
Se [fullstendig liste over tilgjengelige datafelt for alle kildene]({{< relref "/altinn-studio/v9/develop-a-service/data/prefill/reference/sources" >}}).

Se [veiledningen for konfigurasjonsbasert oppsett]({{< relref "/altinn-studio/v9/develop-a-service/data/prefill/how-to/config" >}}).

## Egendefinert kode
### Hva gjør denne funksjonen?

Du kan lage din egen kode for å fylle ut deler av skjemaet automatisk før brukeren begynner. Dette gir deg mer fleksibilitet enn den vanlige konfigurasjonsfilen. Du kan for eksempel
- hente data fra et API
- gjøre beregninger
- bruke annen logikk du selv bestemmer

### Når bør du bruke dette?
Hvis du har behov for kilder utover de som er tilgjengelige via konfigurasjonsbasert oppsett, eller har behov for annen logikk som del av forhåndsutfyllingen.

Se [veiledningen for egendefinert kode]({{< relref "/altinn-studio/v9/develop-a-service/data/prefill/how-to/custom" >}}).

## HTTP POST
### Hva gjør denne funksjonen?

Du kan starte en instans med ferdig utfylte data, for eksempel fra et eget fagsystem. Du sender dataene som multipart
i HTTP POST-forespørselen til appen.

### Når bør du bruke dette?
Når du skal starte en instans på vegne av en bruker, for eksempel hvis du bare sender ut skjemaet til en bestemt liste med
mottakere og har noen av dataene i egne systemer.

Se [veiledningen for HTTP POST]({{< relref "/altinn-studio/v9/develop-a-service/data/prefill/how-to/instantiation" >}}).

## Spørringsparametere
### Hva gjør denne funksjonen?
Du kan sende med én eller flere spørringsparametere i lenken til tjenesten. Når brukeren starter tjenesten med en lenke som
har spørringsparametere, kan appen forhåndsutfylle data fra spørringsparameterne i skjemaet.

#### Eksempel
Dette gjør det mulig for brukere å klikke på en lenke som
https://ttd.apps.tt02.altinn.no/ttd/stateless-app/set-query-params?jobTitle=designer,
og få ordet "designer" forhåndsutfylt i et datamodellfelt.

Du kan teste det selv ved å klikke på lenken til test-appen vår over og logge inn med TestID. Bytt gjerne ut `designer`
i URL-en og se resultatet.

### Når bør du bruke dette?
Når brukeren selv starter skjemaet ved å klikke på en lenke. Funksjonen kan være særlig nyttig hvis du vil forhåndsutfylle
forskjellige verdier ut fra hvor brukeren startet tjenesten fra, for eksempel fra forskjellige nettsider.

Se [veiledningen for spørringsparametere]({{< relref "/altinn-studio/v9/develop-a-service/data/prefill/how-to/query-params" >}}).

### Forbehold
Det er imidlertid noen viktige forbehold knyttet til sikkerhet når du bruker denne tilnærmingen.

1. Du kan bare bruke forhåndsutfylling med spørringsparametere i en stateless-oppgave, det vil si _før_ appen oppretter instansen (og før den lagrer noen data). Da kan brukeren se dataene før appen oppretter instansen, og brukeren har fortsatt kontroll over hvilke data appen lagrer.
    > Uten dette kravet, ville det vært mulig for en angriper å endre verdien i parameteren og få den 
    > verdien til å dukke opp direkte i mottakerens Altinn-innboks.

2. Vi anbefaler på det sterkeste at du kontrollerer verdien av spørringsparameterne i appen din. På denne måten
   sikrer du at appen bare forhåndsutfyller gyldige data. Du kan da stoppe en angriper fra å bruke en lenke som
    
    `altinn.no/ttd/stateless-app/set-query-params?jobTitle=Im a scammer`
    
    som kan få teksten "Im a scammer" til å dukke opp i appen din.


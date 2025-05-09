---
title: Sluttbruker veiledning for agent systembruker
linktitle: Sluttbruker for agent 
description: Finn omfattende informasjon om hva en sluttbruker må være oppmerksom på, samt hvilke trinn som må følges for å etablere en systembrukerintegrasjon.
toc: false
weight: 4
---

{{<notice warning>}}
 Denne funksjonaliteten er i test og kan endres
{{</notice>}}

#### Veiledning for sluttbruker (DRESs MINST, klientadministratør i TILBAKEHOLDEN USYMMETRISK TIGER AS )
   1. Anskaffelse av regnskapssystemet
      - DRESs MINST, klientadministratør i TILBAKEHOLDEN USYMMETRISK TIGER AS, anskaffer SmartCloud for å håndtere ulike tjenester for kundene.
      - For eksempel, programvaren tilbyr en funksjon for å vise kundeselskapets totale skatte- og avgiftskrav.
   2. Godkjenning av forespørsel om systembruker
      - Som en del av programvareoppsettet må DRESs MINST godkjenne forespørselen om systembruker fra SmartCloud.
      - I dette eksemplet mottar DRESs MINST en forespørsel om agentsystembruker og må godkjenne den i Altinn-portalen. Der oppretter DRESs MINST en systembruker, legger til sine kunder til systembrukeren, og gir dermed SmartCloud de nødvendige tilgangspakkene.

      Godkjenn agent systembruker forespørsel

      ![godkjenn agent systembruker](../../systemvendor/systemtilgang-agent-approve.png)

      Etter at forespørselen er behandlet, blir sluttbrukeren sendt til leverandørens kvitteringsside.
      ![system leverandør kvitteringsside](../../systemvendor/systemtilgang-receipt-vendor.png)

      Sluttbruker logger inn i Altinn-portalen for å administrere Systembrukerne.
      ![list av systembrukerne](../../systemvendor/systemtilgang-overview-clientdelegation.png)

      Klikker på den aktuelle Systembrukeren for å administrere eller se. Klikker på 'Legg til klient' for å legge til klienter.
      ![systembruker detalje](../../systemvendor/systemuser-agent.png)

      Legger til klientene
      ![Legg kunder til systembruker](../../systemvendor/clientdelegation-addclient.png)
      
      Klientene er lagt til
      ![kunder er lagt til systembruker](../../systemvendor/addclient-added.png)
      
      Oversikt over Systembrukeren og klientene
      ![systembruker med kunder](../../systemvendor/systemuser-withclients.png)

   3. Tildel nødvendige tillatelser
      - Etter godkjenning fra DRESs MINST og registrering av kunder, gir Systemtilgangen (Systembrukeren) rettigheter til å vise skatte- og avgiftskrav for kundene til TILBAKEHOLDEN USYMMETRISK TIGER AS. DRESs MINST har gitt SmartCloud autorisasjon for denne spesifikke tilgangspakken og kan når som helst fjerne tilgangen via Altinn.

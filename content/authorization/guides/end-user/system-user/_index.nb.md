---
title: Sluttbrukerveiledning for systembruker
linktitle: Systembruker
description: Finn omfattende informasjon om hva en sluttbruker må være oppmerksom på, samt hvilke trinn som må følges for å etablere en systembrukerintegrasjon.
toc: false
---

### Veiledning for sluttbruker (STADIG KONSERT, Dagligleder til TILFELDIG SUBTIL APE)

1. Anskaffelse av regnskapssystemet
   - STADIG KONSERT, dagligleder til TILFELDIG SUBTIL APE, anskaffer SmartCloud for å håndtere selskapets skatte- og avgiftskrav
   - Programvaren tilbyr en funksjon for å vise totale skatte- og avgiftskrav.
2. Godkjenning av forespørsel om systembruker

   - Som en del av programvareoppsettet, kan STADIG KONSERT enten opprette en systembruker i Altinn-portalen via sluttbrukerdrevet systembrukeropprettelse, eller godkjenne en forespørsel om systembruker sendt av SmartCloud.
   - I dette eksemplet mottar STADIG KONSERT en forespørsel om systembruker og må godkjenne den i Altinn-portalen, der STADIG KONSERT tildeler de nødvendige tilganger til SmartCloud for tjenesten "Krav og betalinger"

     Velg system
     ![Velg et system](systemtilgang-1.png)
     Opprett systembruker
     ![Godkjenn opprettelse av valgt systemtilgang som sluttbruker.](systemtilgang-2.png)
     Se listen over systembrukere
     ![list systembrukere](systemtilgang-4.png)

     - I dette eksempelet, TILFELDIG SUBTIL APE får en systembrukerforespørsel fra SmartCloud og må godkjenne denne i Altinn-portalen, der TILFELDIG SUBTIL APE gir SmartCloud nødvendige tilgangene for til tjenesten 'Krav og betalinger'.
       ![godkjenn systembruker forespørsel](systemtilgang-approve-1.png)

     Når forespørselen er godkjent, sendes brukeren videre til den redirecturl som ble angitt i systembrukerforespørselen
     ![leverandør sitt kvittering side](systemtilgang-receipt-vendor.png)

     STADIG KONSERT kan logge inn i Altinn igjen og representere TILFELDIG SUBTIL APE for å se at systembrukeren som ble godkjent, er oppført.
     ![systembruker detalje](systemtilgang-overview.png)

   1. Tildele nødvendige tillatelser
      - Etter at STADIG KONSERT har godkjent forespørselen, omfatter systemtilgangen rettighetene til å vise skatte- og avgiftskravene for TILFELDIG SUBTIL APE. STADIG KONSERT har gitt SmartCloud nødvendige autorisasjoner for denne spesifikke tjenesten og har mulighet til å fjerne tilgangene når som helst via Altinn.

#### Veiledning for sluttbruker (DRESs MINST, klientadministratør i TILBAKEHOLDEN USYMMETRISK TIGER AS )

1.  Anskaffelse av regnskapssystemet
    - DRESs MINST, klientadministratør i TILBAKEHOLDEN USYMMETRISK TIGER AS, anskaffer SmartCloud for å håndtere ulike tjenester for kundene.
    - For eksempel, programvaren tilbyr en funksjon for å vise kundeselskapets totale skatte- og avgiftskrav.
2.  Godkjenning av forespørsel om systembruker

    - Som en del av programvareoppsettet må DRESs MINST godkjenne forespørselen om systembruker fra SmartCloud.
    - I dette eksemplet mottar DRESs MINST en forespørsel om systembruker for klientforhold og må godkjenne den i Altinn-portalen. Der oppretter DRESs MINST en systembruker, legger til sine kunder til systembrukeren, og gir dermed SmartCloud de nødvendige tilgangspakkene.

    Godkjenn systembruker for klientforhold forespørsel

    ![godkjenn systembruker for klientforhold](systemtilgang-agent-approve.png)

    Etter at forespørselen er behandlet, blir sluttbrukeren sendt til leverandørens kvitteringsside.
    ![system leverandør kvitteringsside](systemtilgang-receipt-vendor.png)

    Sluttbruker logger inn i Altinn-portalen for å administrere Systembrukerne.
    ![list av systembrukerne](systemtilgang-overview-clientdelegation.png)

    Klikker på den aktuelle Systembrukeren for å administrere eller se. Klikker på 'Legg til klient' for å legge til klienter.
    ![systembruker detalje](systemuser-agent.png)

    Legger til klientene
    ![Legg kunder til systembruker](clientdelegation-addclient.png)

    Klientene er lagt til
    ![kunder er lagt til systembruker](addclient-added.png)

    Oversikt over Systembrukeren og klientene
    ![systembruker med kunder](systemuser-withclients.png)

3.  Tildel nødvendige tillatelser
    - Etter godkjenning fra DRESs MINST og registrering av kunder, gir Systemtilgangen (Systembrukeren) rettigheter til å vise skatte- og avgiftskrav for kundene til TILBAKEHOLDEN USYMMETRISK TIGER AS. DRESs MINST har gitt SmartCloud autorisasjon for denne spesifikke tilgangspakken og kan når som helst fjerne tilgangen via Altinn.

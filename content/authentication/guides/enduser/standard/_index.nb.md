---
title: Sluttbruker veiledning for systembruker
linktitle: Sluttbruker for standard
description: Finn omfattende informasjon om hva en sluttbruker må være oppmerksom på, samt hvilke trinn som må følges for å etablere en systembrukerintegrasjon.
toc: false
weight: 3
---

### Veiledning for sluttbruker (STADIG KONSERT, Dagligleder til TILFELDIG SUBTIL APE)
1. Anskaffelse av regnskapssystemet
   - STADIG KONSERT,  dagligleder til TILFELDIG SUBTIL APE, anskaffer SmartCloud for å håndtere selskapets skatte- og avgiftskrav
   - Programvaren tilbyr en funksjon for å vise totale skatte- og avgiftskrav.
2. Godkjenning av forespørsel om systembruker
   - Som en del av programvareoppsettet, kan STADIG KONSERT enten opprette en systembruker i Altinn-portalen via sluttbrukerdrevet systembrukeropprettelse, eller godkjenne en forespørsel om systembruker sendt av SmartCloud.
   - I dette eksemplet mottar STADIG KONSERT en forespørsel om systembruker og må godkjenne den i Altinn-portalen, der STADIG KONSERT tildeler de nødvendige tilganger til SmartCloud for tjenesten "Krav og betalinger

      Velg system
      ![Velg et system](../../systemvendor/systemtilgang-1.png)
      Opprett systembruker
      ![Godkjenn opprettelse av valgt systemtilgang som sluttbruker.](../../systemvendor/systemtilgang-2.png)
      Se listen over systembrukere
      ![list systembrukere](../../systemvendor/systemtilgang-4.png)
      
      - I dette eksempelet, TILFELDIG SUBTIL APE får en systembrukerforespørsel fra SmartCloud og må godkjenne denne i Altinn-portalen, der TILFELDIG SUBTIL APE gir SmartCloud nødvendige tilgangene for til tjenesten 'Krav og betalinger'.
      ![godkjenn systembruker forespørsel](../../systemvendor/systemtilgang-approve-1.png)

      Når forespørselen er godkjent, sendes brukeren videre til den redirecturl som ble angitt i systembrukerforespørselen
      ![leverandør sitt kvittering side](../../systemvendor/systemtilgang-receipt-vendor.png)

      STADIG KONSERT kan logge inn i Altinn igjen og representere TILFELDIG SUBTIL APE for å se at systembrukeren som ble godkjent, er oppført.
      ![systembruker detalje](../../systemvendor/systemtilgang-overview.png)

   3. Tildele nødvendige tillatelser
      - Etter at STADIG KONSERT har godkjent forespørselen, omfatter systemtilgangen rettighetene til å vise skatte- og avgiftskravene for TILFELDIG SUBTIL APE. STADIG KONSERT har gitt SmartCloud nødvendige autorisasjoner for denne spesifikke tjenesten og har mulighet til å fjerne tilgangene når som helst via Altinn.

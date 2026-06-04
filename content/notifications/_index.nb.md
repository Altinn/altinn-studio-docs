---
title: Varslinger
description: Altinn Varslinger tilbyr funksjonalitet for enveis kommunikasjon med innbyggere og virksomheter i Norge.
toc: false
weight: 20
aliases:
  - /notifications/ 
  - /altinn-notifications/
cascade:
  params:
    product: product_notifications
---

 <div class="row adocs-featuredBlocks">
    <div class="col-12 col-lg-6 mb-5">
        <div style="text-align: center;">
            <h2 class="a-h3">Finn ut mer</h2>
            <p class="a-js-truncate-2">Les mer om Altinn Varslinger</p>
            <div class="a-illustration-icon">
                <img src="./Notifications-1.svg">
                <div class="a-illustration-overlay">
                    <span class="sr-only">Finn ut mer</span>
                </div>
            </div>
        </div>
        <div class="a-list-container mb-2 mx-auto mx-lg-6">
            <ul class="a-list a-list-noIcon">
             <li class="a-dotted a-clickable a-list-hasRowLink">
                    <a href="about" class="a-list-rowLink">
                        <div class="row">
                            <div class="col">
                                Om Varslinger
                            </div>
                        </div>
                    </a>
                </li>
                <li class="a-dotted a-clickable a-list-hasRowLink">
                    <a href="reference/api" class="a-list-rowLink">
                        <div class="row">
                            <div class="col">
                                API-referanse
                            </div>
                        </div>
                    </a>
                </li> 
            </ul>
        </div>
    </div>
    <div class="col-12 col-lg-6 mb-5">
        <div style="text-align: center;">
            <h2 class="a-h3">Kom i gang</h2>
            <p class="a-js-truncate-2">Send din første varsling</p>
            <div class="a-illustration-icon">
                <img src="./Notifications-2.svg">
                <div class="a-illustration-overlay">
                    <span class="sr-only">Send din første varsling</span>
                </div>
            </div>
        </div>
        <div class="a-list-container mb-2 mx-auto mx-lg-6">
    <ul class="a-list a-list-noIcon">
             <li class="a-dotted a-clickable a-list-hasRowLink">
                    <a href="getting-started/altinn-app" class="a-list-rowLink">
                        <div class="row">
                            <div class="col">
                                Altinn App-integrasjon
                            </div>
                        </div>
                    </a>
                </li>
                <li class="a-dotted a-clickable a-list-hasRowLink">
                    <a href="getting-started/altinn-service" class="a-list-rowLink">
                        <div class="row">
                            <div class="col">
                                Altinn Tjeneste-integrasjon
                            </div>
                        </div>
                    </a>
                </li>                
                <li class="a-dotted a-clickable a-list-hasRowLink">
                    <a href="getting-started/service-owner-system" class="a-list-rowLink">
                        <div class="row">
                            <div class="col">
                                Tjenesteeiersystem-integrasjon
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>

## Testing
For å motta en faktisk SMS på din mobiltelefon i TT02 testmiljøet, vennligst send en forespørsel til [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no) for å legge nummeret ditt til tillatelseslisten. Nummer som ikke er på listen behandles som reelle, men sendes til en simulator i stedet for en ekte nettverksleverandør (dvs. hvis validering bestås, aksepteres de av API-et og vises som vellykket levert til mobiltelefonen).

Test-e-poster sendes som normalt. Vær oppmerksom på at i noen tilfeller identifiserer mottakeren dette som spam, så vennligst sjekk de aktuelle mappene hvis ordren har en suksess-tilstand.

**NB1**: Hvis du konfigurerer en Tenor testbruker for SMS (i deres kapasitet som enkeltperson), vær oppmerksom på at det er en egen SMS-tillatelsesprosess som kreves (for å få KRR auth-koden som bekrefter oppdateringen). Se [KRR testbrukere | KRR](https://docs.digdir.no/docs/Kontaktregisteret/krr_testbrukere#bruk-av-reelle-mobilnummer)

**NB2**: Det er en forsinkelse på opptil 10 minutter før endringer i kontaktinformasjon for en person eller organisasjon trer i kraft i Varslinger.

## SMS til utlandet
På grunn av regulatoriske forhold kan SMS sendt til finske (+358), thailandske (+66) og spanske (+34) mobilnummer feile. Vi jobber med å håndtere dette bedre. I mellomtiden bør tjenesteeiere med målgrupper hjemhørende i disse landene foretrekke epost-kanalen og være ekstra oppmerksom på brukere som forventer SMS på sine utenlandske abonnement.

Utfordringen gjelder kun abonnement fra lokale operatører. Norske nummer som roamer med operatørene (f.eks ved ferie/opphold i nevnte land) skal ikke være berørt.

SMS-status vil som i dag være "SMS_Delivered" når meldingen er bekreftet levert, og "SMS_Failed*" (ulike varianter) når SMS ikke kan bekreftes levert, slik at dette kan plukkes opp av eksisterende prosesser på tjenesteeier-siden. Se også [statusverdier for ordre og varsler]({{< relref "/notifications/reference/notification-status#smsnotificationresulttype-sms-resultat" >}}).

__Finland__: En SenderID som ikke er registrert blir endret til "tuntematon" (ukjent). Leveranse forøvrig skal gå som normalt. --> Vi jobber med å innregistrere alle kjente og legitime ID-er*

__Spania__: En SenderID som ikke er registrert via lokal advokat kan/vil feile (p.t. planlagt innført fra 7. juni 2026).  --> Anbefalingen fra vår leverandør er å *ikke* starte prosess med nøkkelord, men benytte en numerisk avsender. Vi jobber med en praktisk løsning på dette.

__Thailand__: En SenderID som ikke er registrert og/eller bruk av URL(er) i meldingsinnhold kan/vil feile. --> Vi jobber med å innregistrere alle kjente og legitime ID-er*

*: Så langt det lar seg gjøre – prosessen kan kreve ytterligere juridisk oppfølging rundt eierskap/ansvar til nøkkelord og meldingsinnhold.


## Kildekode
Kildekoden er på [Github](https://github.com/Altinn/altinn-notifications)

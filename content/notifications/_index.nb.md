---
title: Varslinger
linktitle: Varslinger
description: Altinn Varslinger tilbyr funksjonalitet for enveis kommunikasjon med innbyggere og virksomheter i Norge.
toc: false
weight: 20
aliases:
  - /altinn-notifications/
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
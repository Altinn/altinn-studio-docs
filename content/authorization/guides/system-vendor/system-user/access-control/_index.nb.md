---
title: Tilgangskontroll for delte løsninger
description: Slik hindrer du at systembrukere i en delt SaaS-installasjon kan misbrukes av feil personer eller på tvers av kundeforhold.
linktitle: Tilgangskontroll
weight: 15
---

Når et sluttbrukersystem leveres som en delt SaaS-løsning, deler flere kunder samme installasjon. Det gir effektiv drift, men stiller også strenge krav til hvordan systemleverandøren håndterer tilgangen til systembrukerne. En systembruker representerer en virksomhet utad, og kallene som gjøres med systembruker-token, kan ikke knyttes til en navngitt person. Dersom feil ansatt får tilgang til feil systembruker, kan det utføres handlinger på vegne av en virksomhet uten at verken Altinn eller tjenesteeieren oppdager det.

## Hvorfor tilgangskontroll er kritisk i delte installasjoner

Altinn autorisasjon kontrollerer bare at systembrukeren har de rettighetene den trenger. Det er sluttbrukersystemet selv som må sørge for at kun autoriserte ansatte kan utløse kall med en gitt systembruker. Dette ansvaret ligger hos systemleverandøren og gjelder spesielt når:

- Flere kunder deler samme installasjon av programvaren.
- En kunde har flere typer klientforhold, for eksempel både regnskapsfører og revisor for den samme sluttkunden.
- Ansatte hos én kunde kan teoretisk sett nå data eller funksjoner som tilhører en annen kunde.
- Systemet støtter både brukerutløste og automatiserte prosesser mot Altinn-API-er.

Uten god tilgangskontroll i selve sluttbrukersystemet kan delegeringer og rettigheter i Altinn bli omgått ved at feil ansatt bruker feil systembruker.

## Altinn kan ikke brukes til tilgangskontroll for ansatte

Et viktig utgangspunkt for vurderingen er at systemleverandøren ikke kan bruke Altinn til å styre hvilke ansatte som får bruke en systembruker. Altinn har ingen mekanismer eller API-er som lar et sluttbrukersystem kontrollere tilgangen på ansattnivå. Delegeringer, roller og tilgangspakker i Altinn sier bare noe om hva systembrukeren har lov til å gjøre på vegne av en virksomhet, ikke hvem i sluttbrukersystemet som har lov til å utløse handlinger med den systembrukeren.

Det betyr at all tilgangskontroll mellom ansatte og systembrukere må bygges og driftes i selve sluttbrukersystemet. Systemleverandøren må selv:

- Autentisere den ansatte i sluttbrukersystemet.
- Bestemme hvilke systembrukere og klienter den ansatte har lov til å bruke.
- Kontrollere dette ved hvert kall som utløser bruk av en systembruker.
- Holde en egen logg over hvilken ansatt som sto bak kallet.

Systemleverandøren må derfor planlegge for denne funksjonaliteten fra start når systemet skal brukes av systemkunder som har behov for å skille tilgangene mellom ansatte.

## Systembrukeren skal opprettes på systemkunden, ikke på sluttkunden

En vanlig misforståelse er at systembrukeren skal opprettes på sluttkunden når systemkunden er regnskapsfører eller revisor for den sluttkunden. Dette er feil. Systembrukeren skal opprettes på systemkunden, altså på regnskapsføreren eller revisoren som faktisk har anskaffet og tatt i bruk sluttbrukersystemet.

Dersom systembrukeren opprettes på sluttkunden, oppstår det flere problemer:

- Ansatte hos én systemkunde kan få tilgang til systembrukere som tilhører en annen systemkunde, siden systembrukeren ligger på den felles sluttkunden.
- Tilgangskontrollen blir uoversiktlig når flere systemkunder, for eksempel både en regnskapsfører og en revisor, har roller for den samme sluttkunden.
- Sluttkunden må holde oversikt over hvilke systemer regnskapsføreren og revisoren har gjort innkjøp av, noe som ikke er sluttkundens ansvar.
- Det blir vanskelig å håndtere at en systemkunde bytter sluttbrukersystem eller avslutter kundeforholdet.

Dette blir da en _systembruker for klientforhold_. Systembrukeren ligger på systemkunden, og sluttkundene knyttes til systembrukeren gjennom klientdelegering. Systemkunden beholder kontrollen over egne systembrukere, og sluttkunden trenger kun å forholde seg til selve kundeforholdet med regnskapsføreren eller revisoren. Se [systembruker for klientsystem](../#systembruker-for-klientsystem) for hvordan dette er ment å fungere.

## Vurder om tilganger skal separeres på flere systembrukere

Når systemkunden har flere roller overfor den samme sluttkunden, bør systemleverandøren vurdere om tilgangene skal fordeles på flere systembrukere, og om det trengs tilgangskontroll i sluttbrukersystemet som hindrer at en ansatt bruker feil systembruker. Et regnskapsbyrå og et revisjonsselskap kan for eksempel være samme juridiske enhet, men de to tjenestene har forskjellig ansvar, forskjellige kundeforhold og forskjellige tilgangspakker. En ansatt som jobber med revisjon for en sluttkunde, skal normalt ikke kunne sende inn handlinger som regnskapsfører for den samme sluttkunden.

Dette er en vurdering systemleverandøren må gjøre ut fra behovene til systemkunden. Noen systemkunder har tydelig adskilte team og ønsker streng separasjon, mens andre har ansatte som naturlig jobber på tvers av roller og foretrekker en enklere modell. Vurderingen bør ta hensyn til:

- Hvilke roller systemkunden har overfor sluttkundene sine, og om rollene krever ulike tilgangspakker.
- Om de samme ansatte jobber med flere roller, eller om rollene håndteres av ulike team eller avdelinger.
- Hvor stor risikoen er for at en ansatt utfører handlinger på feil grunnlag, og hvilke konsekvenser en slik feil kan få for sluttkunden.
- Hvilke krav systemkunden selv stiller til sporing, ansvarsdeling og intern kontroll.

Når vurderingen tilsier at tilgangene skal separeres, bør systemleverandøren legge til rette for at:

- Hver systembruker knyttes til tilgangspakken som samsvarer med rollen, for eksempel `regnskapsforer-med-signeringsrettighet` eller `ansvarlig-revisor`.
- Klientadministratoren hos systemkunden fordeler klientene på riktig systembruker.
- Valget av systembruker skjer ut fra kundeforholdet og rollen, ikke ut fra hvilken ansatt som er innlogget.

Se [brukerscenariet med Rett Revisjon](../userscenarios/#10-rett-revisjon-er-regnskapsfører-og-revisor-rapporterer-aksjonærregisteroppgaven-for-kunder) for et konkret eksempel på hvordan to separate systembrukere håndteres for samme sluttkunde.

## Hindre at ansatte bruker feil systembruker

Sluttbrukersystemet må ha egen autentisering og autorisering som kobler den innloggede ansatte til et begrenset sett av systembrukere og klienter. Dette er spesielt viktig i større virksomheter som regnskapsbyråer med mange ansatte og kunder.

Anbefalte prinsipper:

- Koble hver ansatt til et team, en avdeling eller en kundeportefølje i sluttbrukersystemet.
- Kontroller ved hvert kall at den ansatte har lov til å bruke den valgte systembrukeren for den valgte klienten.
- Logg hvilken ansatt som utløste kallet, selv om kallet utad identifiseres som systembrukeren. Loggen er avgjørende for sporing og hendelseshåndtering.
- Begrens hvilke ansatte som kan hente systembruker-token og kalle Altinn-API-er til de som faktisk trenger det i arbeidet sitt.
- Skill mellom ansatte som jobber med registrerte og uregistrerte kundeforhold, siden disse bruker ulike tilgangspakker og systembrukere.

Se [brukerscenariet der Rett Revisjon differensierer tilgangen](../userscenarios/#3-regnskapsfører-med-behov-for-å-differensiere-tilgang-til-systembruker) for et eksempel på hvordan en uregistrert regnskapsfører kan få tilgang til noen kunder, men ikke alle.

## Beskytt nøkler og token i en delt installasjon

I en delt SaaS-løsning bruker systemleverandøren som regel ett felles sertifikat eller nøkkelpar for å hente token fra Maskinporten. Dette gjør det ekstra viktig å beskytte nøkkelmaterialet og de utstedte systembruker-tokenene:

- Oppbevar nøkler i et nøkkelhvelv eller HSM som kun systemet selv har tilgang til.
- Del aldri nøkler eller token med kundene eller med andre installasjoner.
- Hent token per kall eller per kort tidsrom, og unngå å gjenbruke token på tvers av kunder.
- Begrens tilgangen til token i minnet og i logger slik at de ikke kan misbrukes av ansatte i supportrollen eller av andre kunder som deler installasjonen.

For lokale installasjoner, der kunden selv driftet programvaren, gjelder [eget scenario for SAP-installasjon](../userscenarios/#9-virksomhet-har-kjøpt-inn-sap-for-lokal-installasjon). Nøkkelen der skal ligge hos kunden, ikke hos leverandøren.

## Sjekkliste for systemleverandører

Før du tar en delt SaaS-løsning i bruk mot Altinn, bør du kunne svare ja på følgende:

- Har systemet separate systembrukere per rolle og kundeforhold?
- Blir ansatte tildelt tilgang til systembrukere og klienter ut fra arbeidsoppgavene sine?
- Kontrollerer systemet hvilken systembruker som skal brukes for hvert enkelt kall mot Altinn?
- Logges den ansatte som utløste kallet, selv om kallet gjøres som systembruker?
- Er nøkler og token beskyttet slik at de ikke kan misbrukes på tvers av kunder i den delte installasjonen?

Se også [brukerscenariene for systembruker](../userscenarios/) for en bredere gjennomgang av hvordan tilgangskontroll skal håndteres i praksis.

---
title: Lage et enkelt skjema
description: I denne veiledningen lærer du hvordan du lager og publiserer en app i Altinn Studio, for eksempel et enkelt skjema.
weight: 10
aliases:
- /nb/altinn-studio/guides/basic-form/
---

{{% expandlarge id="create-service" header="Opprett en ny app" %}}
Logg inn i Altinn Studio. Hvis du ikke har en bruker, kan du opprette en fra forsiden. 

1. Klikk på __Opprett ny app__ øverst til høyre i skjermbildet.
2. I feltet __Eier__ velger du hvem som skal eie appen. Hva du kan velge her, avhenger av om du har rett til å opprette en app for organisasjonen din, eller om appen blir registrert privat, på din bruker.
   - Hvis du oppretter appen på din egen bruker, kan du teste all funksjonalitet i Altinn Studio, men du har ikke tilgang til 
     testmiljøet.
   - Hvis du har rettigheter til å opprette appen på en organisasjon, kan du også publisere tjenesten til
     organisasjonens testmiljø.
3. I feltet __Navn__ følger du reglene for appnavn og lager et kort og beskrivende navn på appen din.
   _Navnet må ha minst to tegn og kan kun inneholde små bokstaver, tall og bindestrek. Navnet identifiserer appen din, og kan 
   ikke endres etter at du har satt det. Du kan lage et eget visningsnavn etter at du har opprettet appen._
4. Klikk på __Opprett app__.

Når appen er opprettet, ser du den på oversiktssiden.
{{%/expandlarge%}}

{{% expandlarge id="set-service-name" header="Legg inn det navnet som skal vises for appen" %}}
Gi appen en eget visningsnavn, Dette navnet vises som overskrift på skjemaet og i brukerens innboks i Altinn.

1. Klikk på Innstillinger i menylinjen øverst til venstre.
2.  I feltet __Navn på appen__ skriver du det navnet du vil at skjemaet dit skal ha, for eksempel "Innrapportering av sjeldne arter i bydel Sagene".

Navnet blir lagret når du klikker utenfor feltet, og det blir oppdatert på oversiktssiden.
{{%/expandlarge%}}

{{% expandlarge id="create-datamodel" header="Lag en datamodell for skjemaet ditt" %}}
En datamodell er en slags innholdsfortegnelse for skjemaet. 
Datamodellen brukes til å bestemme _hva_ du vil  hente inn av data og _hvordan_ dataene
skal se ut.

For et enkelt skjema er det ofte en direkte knytning mellom et felt i datamodellen og et felt i skjemaet. For mer avanserte
skjemaer kan datamodellen og skjemaet være ganske forskjellige.

Når du oppretter en app, følger det med en enkel datamodell med noen eksempelfelter. Du kan redigere feltnavnene
for å tydelig vise hva de representerer, og du kan legge til egne felter. 

1. Gå til  __Datamodell__ i toppmenyen.
2. Velg ett av property-feltene for å vise panelet __Egenskaper__. Her kan du blant annet endre navn og sette format.
3. Klikk på __Legg til__ og velg type. Vanlige typer for et enkelt skjema kan være
   - Tekst 
   - Heltall
   - Desimaltall
4. Legg eventuelt til flere felt. 
Hvis du vil gruppere flere felt, kan velge __Objekt__ fra Legg til-menyen, og så legge til felter i dette objektet.
5. Klikk på  __Generer modeller__. Du får en melding om at datamodellen din er opprettet.
{{%/expandlarge%}}

{{% expandlarge id="create-form" header="Dra inn skjemakomponenter i skjemaet og velg egenskaper for dem" %}}
Du lager selve skjemaet på __Utforming__-siden i Altinn Studio. Her kan du dra inn de skjemakomponentene du vil ha med på hver side i skjemaet. 

### Legge til felter i skjemaet
Komponentene du kan bruke i skjemaet er delt i tre kategorier:
- **Standard**: Her finner du alle enkle skjemakomponenter, for eksempel lite og stort tekstfelt, nedtrekksliste (ett eller flere svar),
  avmerkingsbokser, radioknapper og innsendingsknapp.
- **Tekst**: I denne kategorien finner du komponenter du kan bruke til å informere de som fyller ut skjemaet ditt, for eksempel overskrift, avsnitt, advarsel og informasjonspanel.
- **Avansert**: Her ligger blant annet gruppe, repeterende gruppe, kart og liste.

1. Klikk på den siden du ønsker å redigere. Det er alltid en Side 1 med i appen, men du kan enkelt legge til en ny.
2. Velg en komponent fra panelet til venstre, og dra den inn på siden. Til høyre får du opp panelet med egenskaper for komponenten.
3. Hvis du skal bruke komponenten til å samle inn data, må du knytte den til det feltet det tilhører i datamodellen. 
   - I panelet med egenskaper åpner du __Datamodellknytninger__.
   - Klikk på knytningen for komponenten (for eksempel Stort tekstfelt). I feltet Datamodellknytning velger du det datamodellfeltet du vil knytte til komponenten. Du kan søke i listen.
   - Klikk på X for å lukke Datamodellknytninger.
4. Åpne __Tekst__ for å sette egenskaper for tekster.
   - Klikk på __Ledetekst__ for å angi en ledetekst for komponenten. Du må legge til en ledetekst på alle komponenter som skal samle inn data.
   - __Beskrivelse__ er valgfritt, den vises under ledeteksten og er nyttig hvis du må forklare mer om hva brukeren skal fylle ut i feltet.
   - __Hjelpetekst__ er også valgfritt, og vises når brukerne klikker på et spørsmålstegn ved siden av ledeteksten. Vi anbefaler at du bruker __Beskrivelse__ heller enn __Hjelpetekst__. Da passer du på at all informasjon om feltet er synlig for alle brukere hele tiden.
   - Hvis du vil endre eksisterende tekster, klikker du på den teksten du vil endre.
5. I panelet med egenskaper, åpne __Innhold__. Her kan du sette andre egenskaper for komponentene, og de kan variere
   fra komponent til komponent. På de fleste komponentene kan du bestemme om du vil
   - justere bredden til komponenten
   - sette at den skal være skrivebeskyttet

### Nyttig informasjon
- Du må legge til en Send inn-knapp i skjemaet. Bruk komponenten __Send inn__.
- Du legger til nye sider med knappen __Legg til ny side__ som vises under eksisterende sider.
- Hvis du vil endre ID-en til en side, velger du siden og klikker på __Side-ID__.
  - Under __Tekst__ kan du endre navnet som skal vises på siden, i feltet __Visningsnavn for side__.
- Når du legger til sider, blir det blir automatisk lagt til navigasjonsknapper med navnene Neste og Forrige for å kunne gå frem og tilbake i skjemaet.
{{%/expandlarge%}}


{{% expandlarge id="configure-access-rules" header="Sette opp tilgangsregler" %}}

{{% notice warning %}}
Du _må_ ikke gjennomføre dette steget for å få en fungerende tjeneste ut i testmiljøet, men du må bestemme hvem som skal ha ha tilgang til tjenesten før du legger den ut i produksjon.
{{% /notice %}}

Når du oppretter en ny app, følger det med et sett med tilgangsregler. Tilgangsreglene styrer hvem som skal ha tilgang til 
de forskjellige delene av appen. Det oppsettet som følger med, er et oppsett som vil fungere for de aller
fleste enkle apper. _Det er likevel viktig at du tar stilling til hva slags roller en sluttbruker må ha for å kunne
ta i bruk tjenesten_. 

{{% notice info %}}
Vi jobber med å forenkle dette oppsettet. Det er mange regler å forholde seg til i malen for appen, så vi anbefaler deg å følge
oppskriften under enn så lenge. Vi oppdaterer denne beskrivelsen når vi gjør endringer.
{{% /notice %}}

Dagens mal tillater alle brukere med Altinn-rollene:
-  **Daglig leder (DAGL)** - denne rollen kan du ha for en _bedrift_.
-  **Privatperson (PRIV)** - denne rollen har alle for _seg selv_.
  
Dette gjelder for hele appen. I tillegg tillater de at tjenesteeier kan starte opp, hente data 
fra og skrive data til tjenesten, samt å bekrefte at data er mottatt i egne systemer.

Hvis du bare skal teste et enkelt skjema i testmiljøet, trenger du  ikke å gjøre noen endringer her. Vi anbefaler likevel at du gjør 
et bevisst valg her før du eventuelt skal produksjonssette appen, og at du eventuelt fjerner den rollen som ikke gjelder for din app. 
Hvis skjemaet for eksempel skal brukes av privatpersoner, kan du ta bort rollen "Daglig leder". Hvis det skal sendes inn på vegne av en bedrift, kan
du fjerne rollen "Privatperson".

Hvis det er andre roller som er relevante, kan du legge dem inn.  
[Du kan se alle tilgjengelige roller i Altinn her](https://info.altinn.no/hjelp/profil/alle-altinn-roller/).

Regelsettet for tilgangsregler kommer med to regler:
- Den første regelen gjelder sluttbrukere, og hvilke tilganger du ønsker å gi til sluttbrukere som har bestemte roller.
- Den andre regelen gjelder tjenesteeiere, og hvilke tilganger du ønsker å gi til dem.

I dette tilfellet vil det som oftest være regelen for sluttbrukere det er relevant å endre på.

Slik kan du for eksempel fjerne rollen "Daglig leder":

1. Klikk på __Innstillinger__ i menylinjen øverst til venstre i appen.
2. Velg __Tilganger__ i __Innstillinger__-vinduet.
3. Finn __Regel 1__.
4. Gå til feltet __Hvem skal ha disse rettighetene?__ og klikk på krysset ved __Daglig leder__. Du har nå tatt bort daglig leder.
   Hvis du trenger det, kan du legge til andre roller fra nedtrekkslisten her.
6. Endringen dine blir lagret med en gang og du kan lukke __Innstillinger__-vinduet.
{{%/expandlarge%}}

{{% expandlarge id="push-changes" header="Lagre endringer" %}}
Når du arbeider med appen din, jobber du på en _kopi_ av den. Alle endringer du gjør blir 
lagret automatisk underveis. De ligger på _din brukers filområde i Altinn Studio_. For at de endringen du gjør skal bli tilgjengelige for 
andre, må du dele endringene dine til _det sentrale filområdet_. 

1. Øverst til høyre i appen klikker du på "Del dine endringer".
2. Skriv en kort beskrivelse av hva du har endret. Da er det lettere å gå tilbake i logger for å se hva som er gjort.
   Du kan også se på filene som det er gjort endringer i, før du deler dem. Klikk på __Se siste endringer__.
3. Klikk på __Del endringer__. Endringene dine blir sammenlignet med det som ligger på det sentrale filområdet, og blir deretter delt.

Hvis noen har gjort endringer direkte i filene eller utenfor Altinn Studio, så kan du hente disse endringene til ditt eget filområde.
Klikk på __Hent endringer__ ved siden av __Del dine endringer__. 

{{% notice warning %}}
**Merk!** Hvis du gjør endringer både i Altinn Studio _og_ direkte i filene til appen, kan det oppstå
konflikter. Det er fordi verktøyet da ikke vet hvilke av endringene som skal gjelde. 

<br/>
Du bør derfor laste opp endringer fra Altinn Studio ofte. Hvis du vet at det blir gjort endringer i filene direkte, bør du alltid
hente endringer før du jobber videre på tjenesten i Altinn Studio. Da unngår du konflikter mellom lokal og sentral versjon av appen.
{{% /notice %}}

### Slette lokale endringer
Hvis  det oppstår en konflikt, eller du har gjort endringer du likevel ikke vil ha med, kan du slette dine lokale endringer. 
Da blir appen tilbakestilt til den versjonen som er på det sentrale filområdet.

1. Klikk på de tre vertikale prikkene helt til høyre i menylinjen.
2. Velg __Lokale endringer__.
3. Hvis du har gjort noen endringer du vil ta vare på, kan du enten velge å laste ned hele repoet, eller bare de filene som er endret.
4. Klikk på __Slett lokale endringer__ for å slette de lokale endringene dine.
5. Skriv inn navnet på appen din og klikk på __Slett mine endringer__ for å slette, eller velg __Avbryt__ for å avbryte og gå tilbake til appen.
{{% /expandlarge %}}

{{% expandlarge id="publish-service" header="Publisere appen" %}}
{{% notice info %}}
Denne delen gjelder bare hvis du har lagd en tjeneste for en _organisasjon_. 
{{% /notice %}}

Du publiserer appen til test- og produksjonsmiljøene fra __Publiser__ i toppmenyen. Dette menyvalget vises bare hvis du har lagd en app for en organisasjon.

På publiseringssiden får du en oversikt over alle tilgjengelige miljøer, og kan se status for appen i hvert enkelt miljø.

Når du skal publisere, må du først bygge en versjon, så publisere den:
1. **Bygg versjon**: I denne prosessen blir alle filer og innstillinger samlet og knyttet til appen. Det blir til en pakke med et _versjonsnavn_.
2. **Publiser versjon**: Her henter du ut den versjonen du vil ha fra pakkene du har bygget, og publiserer den ut til miljøet.

### Bygge en versjon
1. I panelet til høyre skriver du inn det versjonsnavnet/-nummeret du vil ha. Versjonsnavnet må starte med tall eller bokstav, og kan inneholde:
- tall
- små bokstaver
- punktum `.` og bindestrek `-`

Du kan også beskrive versjonen.

2. Trykk på __Bygg versjon__ for å sette i gang bygget, og vent til dette er fullført. Det kan ta litt tid.

<video autoplay loop controls muted src="./build-version.mp4">Nettleseren din støtter ikke videoavspilling.</video>

### Publisere en versjon
Når versjonen er ferdig bygget kan du publisere den ti ldet miljøet der du vil ha den. 
1. Velg ønsket versjon fra nedtrekkslisten som er tilknyttet miljøet. 
2. Klikk på __Publiser ny versjon__ og bekreft at du vil publisere tjenesten til miljøet.

Nå settes publiseringen i gang. Det kan ta litt tid. Du ser oppdatert status for publiseringen så snart tjenesten er tilgjengelig i miljøet.

<video autoplay loop controls muted src="./publish-version.mp4">Nettleseren din støtter ikke videoavspilling.</video>
{{%/expandlarge%}}

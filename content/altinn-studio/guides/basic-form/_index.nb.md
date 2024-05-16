---
title: Lag et enkelt skjema
description: Guide for å lage et enkelt skjema i Altinn Studio
weight: 10
---
Punktene under dekker et minimum av hva som må til for å lage og publisere et skjema på Altinn Studio.

{{% expandlarge id="create-service" header="Opprette tjenesten som skal inneholde skjemaet" %}}
Nye tjenester opprettes fra ditt tjeneste-dashboard. 

1. Trykk på knappen "Opprett ny applikasjon" oppe til høyre på skjermen.
2. Velg _eier_ av tjensten fra nedtrekkslisten.
   - Velger du sin egen bruker, vil du kunne teste all funksjonalitet i Altinn Studio, men vil ikke få tilgang til 
     testmiljø.
   - Velger du en _organisasjon_ som du har rettiheter for vil du også ha mulighet til å publisere tjenesten til
     organisasjonens test-miljø.
3. Skriv inn navnet på tjenesten.
   _Navnet kan kun inneholde små bokstaver, tall og bindestrek. Dette navnet brukes for å identifisere tjenesten, og kan 
   ikke endres etter at det er satt. Visningsnavn kan settes og endres når tjenesten er opprettet._
4. Trykk på knappen "Opprett applikasjon".

Når tjenesten er opprettet kommer du til tjenestens oversiktsside.

<video autoplay loop controls muted src="./create-service.mp4">Nettleseren din støtter ikke videoavspilling.</video>
{{%/expandlarge%}}


{{% expandlarge id="set-service-name" header="Legge inn visningsnavn for tjenesten" %}}
Tjenesten trenger et visningsnavn som vises som overskrift på skjema og i brukerens innboks i Altinn.

Legg inn visningsnavn ved å:

1. Trykk på "Innstillinger"-knappen i meny-linjen øverst til venstre
2. Endre på feltet "Applikasjonsnavn" til ønsket visningsnavn

Endringen lagres i det man forlater feltet. Når visningsnavnet er endret kan du se at det også er oppdatert på 
oversiktssiden.

<video autoplay loop controls muted src="./set-service-name.mp4">Nettleseren din støtter ikke videoavspilling.</video>
{{%/expandlarge%}}


{{% expandlarge id="create-datamodel" header="Lage en datamodell for skjema" %}}
Datamodellen definerer hvilke data man forventer å samle inn, og hvilket format disse skal være på. 
> _**Man kan se på en datamodell som en innholdsfortegnelse for skjemaet.**_

For et enkelt skjema er det ofte en 1-1 knytning fra felter i datamodellen til felter i skjemaet, mens for mer avanserte
skjemaer kan datamodellen og skjemaet være ganske forskjellige.

En helt enkel datamodell med noen eksempel-felter følger med når man oppretter en tjeneste. Man kan redigere feltnavnene
for å gjøre det tydelig hva de representerer, og legge til egne felter. 

Datamodellen brukes til å bestemme _hva_ som skal hentes inn av data. Den brukes også til å bestemme _hvordan_ dataene
skal se ut/være, ved at man setter på begrensninger som valideres.

1. Naviger til "Datamodell"-siden ved å trykke på "Datamodell" i meny-linjen øverst på siden.
2. Klikk på et felt for å få opp redigeringsmuligheter, f.eks. for å endre navn på feltet.
3. Klikk på "Legg til ny" og velg type. Relevante typer for enkle skjemaer er bl.a.
   - Tekst - tekstinnhold, kan brukes for stort sett alle felter.
   - Heltall
   - Desimaltall
4. Når du er ferdig med å legge til felter, trykk på knappen "Generer modeller"
    
Dersom man ønsker å gruppere felter, kan man legge til "Objekt", og så legge til felter under den gruppen.

<video autoplay loop controls muted src="./create-datamodel.mp4">Nettleseren din støtter ikke videoavspilling.</video>
{{%/expandlarge%}}


{{% expandlarge id="create-form" header="Dra inn skjemakomponenter i skjema og konfigurere disse" %}}
Skjema lages i Altinn Studio ved å navigere til "Lage"-siden. På denne siden 

Skjema lages ved å dra inn ønskede skjemakomponenter inn i hver enkelt skjemaside. 

{{% insert "content/app/getting-started/create-app/ui-editor/_index.nb.md" %}}

### Legge til felter i skjema
Komponentene som kan brukes i skjema er fordelt på 3 kategorier:
- **Standard**: Inneholder alle enkle skjemakomponenter som f.eks. teksfelter (langt og kort), nedtrekksliste (ett eller flere svar),
  avkrysningsbokser, radioknapper, innsendingsknapp, og lignende.
- **Tekst**: Inneholder tekst-komponenter som brukes for å informere brukeren. F.eks. overskrift, avsnitt, advarsel, informasjonspanel.
- **Avansert**: Inneholder mer avanserte komponenter som gruppe, repeterende gruppe, kart, liste, og lignende.

1. Klikk på siden du ønsker å redigere. Når man lager en tjeneste kommer det automatisk med en side som heter "Side1".
2. Velg en komponent fra panelet til venstre, og dra den inn på siden. Komponenten er nå aktiv i konfigurasjonspanelet og 
   kan konfigureres.
3. Dersom komponenten i skjemaet skal brukes til å samle inn data, må den knyttes til tilhørende felt i datamodellen. 
   - Åpne seksjonen i konfigurasjons-kolonnen som heter "Datamodellknytninger"
   - Klikk på tilgjengelig knytning (f.eks. "kort svar") og velg ønsket felt i datamodellen fra listen. Listen er søkbar.
   - Lukk oppsettet ved å trykke på X-ikonet, eller fjern knytningen ved å trykke på søppelbøtte-ikonet.
4. Legg til tekster for komponenten ved å åpne "Tekst"-seksjonen i konfigurasjons-kolonnen.
   - Ledetekst er påkrevd for alle komponenter som skal samle inn data. Klikk på "Ledetekst" for å legge til.
   - Beskrivelse er valgfritt, og vises under ledeteksten. Klikk på "Beskrivelse" for å legge til.
   - Hjelpetekst er valgfritt, og vises i et ?-ikon ved siden av ledeteksten. Klikk på "Hjelpetekst" for å legge til".
   - Klikk på X-ikonet for å lukke redigeringsvisningen for teksten.
   - For å redigere eksisterende tekster, klikk på den aktuelle teksten for å åpne redigeringsvisning.
5. Åpne "Innhold"-seksjonen i konfigurasjons-kolonnen for å sette opp øvrig konfigurasjon. Tilgjegelig konfigurasjon varierer
   fra komponent til komponent, men felles for de fleste er:
   - Om bredden til komponenten på skjermen skal justeres
   - Om komponenten skal være skrivebeskyttet

<video autoplay loop controls muted src="./create-form.mp4">Nettleseren din støtter ikke videoavspilling.</video>

### Nyttig informasjon
- Knappen for å sende inn skjemaet må legges til manuelt. Bruk komponenten som heter "Knapp".
- Legg til ny side ved å klikke på "Legg til ny side"-knappen nederst i side-kolonnen.
- Rediger sidenavn ved å velge siden, klikk så på feltet ID for å redigere.
  - Legg til visningsnavn for siden ved å åpne tekst-seksjonen og legg til "Visningsnavn for side".
- Knapper for å navigere frem/tilbake mellom sider legges til automatisk når man legger til en side.
{{%/expandlarge%}}


{{% expandlarge id="configure-access-rules" header="Konfigurere tilgangsregler" %}}

{{% notice warning %}}
Dette steget _må_ ikke gjennomføres for å få en fungerende tjeneste ut til test-miljø, men man må ta stilling til 
hvem som skal ha tilgang til tjenesten før den produksjonssettes.
{{% /notice %}}

Når man oppretter en ny tjeneste, kommer denne med et sett med tilgangsregler. Disse styrer hvem som skal ha tilgang til 
de forskjellige delene av tjenesten. Det oppsettet som kommer med tjenesten er et oppsett som vil fungere for de aller
fleste enkle tjenester. _Det er likevel viktig at man tar stilling til hva slags roller en sluttbruker må ha for å kunne
ta i bruk tjenesten_. 

{{% notice info %}}
Vi jobber med å forenkle dette oppsettet, da det mange regler å forholde seg til i tjeneste-malen. Vi anbefaler at man følger
oppskriften under enn så lenge. Beskrivelsene i denne seksjonen vil bli oppdatert fortløpende når vi gjør endringer.
{{% /notice %}}

Dagens mal tillater alle brukere med Altinn-rollene:
-  **Daglig leder (DAGL)** - dette er en rolle man kan ha for en _bedrift_.
-  **Privatperson (PRIV)** - dette er en rolle alle har for _seg selv_.
  
å bruke tjenesten. Dette gjelder for hele tjenesten. I tillegg tillater de at tjenesteeier kan starte opp, hente data 
fra og skrive data til tjenesten, samt å bekrefte at data er mottatt i egne systemer.

For å bare teste et enkelt skjema i testmiljø trenger man ikke å gjøre endringer her. Vi anbefaler likevel at man gjør 
et bevisst valg her før tjenesten ev. produksjonssettes, og ev. fjerner den rollen som ikke er gjeldende for din tjeneste. 
F.eks. om tjenesten
skal brukes av privatpersoner, kan rollen "Daglig leder" fjernes. Om tjenesten skal sendes inn på vegne av en bedrift, kan
rollen "Privatperson" fjernes.

Dersom andre roller også er relevante kan disse også legges inn. Full oversikt over tilgjengelige roller i Altinn 
[ligger her](https://info.altinn.no/hjelp/profil/alle-altinn-roller/).

Regelsettet for tilgangsregler kommer med 2 regler:
- Den første regelen omfatter sluttbruker, og hvilke tilganger man ønsker å gi til sluttbrukere med bestemte roller.
- Den andre regelen omfatter tjenesteeier, og hvilke tilganger man ønsker å gi tjenesteeier.

Det vil i størst grad være regelen som omfatter sluttbruker som det vil være relevant å endre på her.

F.eks. for å fjerne rollen "Daglig leder":

1. Klikk på "Innstillinger"-knappen i menylinjen øverst på siden inne på tjenestens arbeidsflate.
2. Velg Fanen "Tilgangsregler" fra venstre-menyen i "Innstillinger".
3. Scroll ned til innholdet i "Regel 1"
   - Finn feltet "Hvem skal ha disse rettighetene?"
4. I feltet "Hvem skal ha disse rettighetene?", kryss ut "Daglig leder" slik at den fjernes.
5. Legg eventuelt til andre roller fra nedtrekkslisten om det er behov for det.
6. Endringen lagres automatisk i det den gjøres. "Innstillinger"-vinduet kan lukkes.

<video autoplay loop controls muted src="./policy-rules.mp4">Nettleseren din støtter ikke videoavspilling.</video>

{{%/expandlarge%}}


{{% expandlarge id="push-changes" header="Lagre endringer" %}}
Når man er inne på arbeidsområdet til tjenesten, jobber man med en _kopi_ av tjenesten for sin bruker. Alle endringer man
gjør lagres automatisk underveis til _brukerens filområde i Altinn Studio_, men for å tilgjengeliggjøre endringene for 
andre og publisere dem, må man laste opp endringene til _tjenestens sentrale filområde_.

Dette gjøres ved å trykke på "Last opp dine endringer" til høyre i menylinjen øverst på siden.

1. Trykk på "Last opp dine endringer".
2. Skriv en kort beskrivelse av endringene.
3. Trykk på "Valider endringer".

Endringene sammenlignes nå med det som ligger på det sentrale filområdet til tjenesten, og lastes deretter opp.

<video autoplay loop controls muted src="./save-changes.mp4">Nettleseren din støtter ikke videoavspilling.</video>

Dersom det er gjort endringer direkte i filene, eller utenfor Altinn Studio, kan disse hentes inn til _brukerens filområde_
ved å trykke på "Hent endringer" til høyre i menylinjen. 

{{% notice warning %}}
**OBS!** Dersom en gjør endringer både i Altinn Studio, men også direkte i filene til tjenesten, vil det kunne oppstå
konflikter, da verktøyet ikke vet hvilke av endringene som er gjeldende. 

<br/>
Det er derfor veldig lurt å laste opp endringer fra Altinn Studio hyppig, og dersom det gjøres endringer i filene direkte
bør man alltid trykke på "Hent endringer" før man jobber videre på tjenesten i Altinn Studio for å unngå konflikter.
{{% /notice %}}

### Slette "lokale" endringer
Dersom det oppstår en konflikt, eller man har gjort endringer som man ønsker å forkaste, kan man slette alle endringer
som er gjort på _brukerens filområde_. Tjenesten vil da tilbakestilles til sånn den er på _tjenestens sentrale filområde_.

1. Trykk på menyknappen markert med 3 prikker helt til høyre på menylinjen.
2. Velg "Lokale endringer".
3. Dersom en har noen endringer som en ønsker å spare på kan disse lastes ned her, enten ved å laste ned alle filer 
  for hele tjenesten, eller ved å laste ned kun de filene som er endret.
4. For å slette alle endringer på _brukerens filområde_, velg "Slett lokale endringer"
5. I dialogen som åpnes opp må en skrive inn navnet på tjenesten for å bekrefte slettingen. Skriv inn navnet og klikk på
  "Slett mine endringer" for å slette, eller "Avbryt" for å avbryte.

<video autoplay loop controls muted src="./reset-local-changes.mp4">Nettleseren din støtter ikke videoavspilling.</video>
{{% /expandlarge %}}


{{% expandlarge id="publish-service" header="Publisere tjenesten" %}}
{{% notice info %}}
Dene seksjonen er kun relevant om man har lagd en tjeneste for en _organisasjon_. Har man lagd en test-tjeneste for sin
egen bruker har man ikke tilgang til noe testmiljø, og "Publiser"-knappen vises ikke.
{{% /notice %}}

Publisering av tjenesten til test- og produksjonsmiljø gjøres via "Publiser"-siden. Denne når du ved å trykke på
"Publiser"-knappen øverst til høyre. 

På publiseringssiden får du en oversikt over alle tilgjengelige miljøer, samt status for tjenesten i hvert enkelt miljø.

Publisering foregår i 2 steg:
1. **Bygg versjon**: Her samles alle filer og innstillinger knyttet til tjenesten sammen til en pakke som får en _versjon_.
2. **Publiser versjon**: Her henter man ut ønsket _versjon_ fra pakkene du har bygget, og publiserer den ut til miljøet.

### Bygge en versjon
I kolonnen til høyre skriver du inn ønsket versjonsnavn/-nummer. Versjonsnavn må starte med tall eller bokstav, og kan inneholde:
- tall
- små bokstaver
- punktum `.` og bindestrek `-`

Du kan også oppgi en beskrivelse av versjonen.

Trykk på "Bygg versjon" for å sette i gang bygget, og vent til dette er fullført. Dette kan ta litt tid.

<video autoplay loop controls muted src="./build-version.mp4">Nettleseren din støtter ikke videoavspilling.</video>


### Publisere en versjon
Når en versjon er ferdig bygget kan den publiseres til ønsket miljø. Dette gjøres ved å velge ønsket versjon fra
nedtrekkslisten tilknyttet det miljøet. Man trykker så på "Publiser ny versjon", og bekrefter at man ønsker å publisere
tjenesten til miljøet.

Publiseringen settes så i gang, dette kan ta litt tid. Status vil oppdateres så fort tjenesten er tilgjengelig i miljøet.

<video autoplay loop controls muted src="./publish-version.mp4">Nettleseren din støtter ikke videoavspilling.</video>

{{%/expandlarge%}}

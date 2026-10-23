---
title: Lag et enkelt skjema
linktitle: Lag et enkelt skjema
description: Du skal lage et enkelt skjema i Altinn Studio. 
weight: 1
draft: true

# Marp settings - used for generating a HTML/PDF presentation that can be used in live training sessions.
marp: true
headingDivider: 4
style: |
  section {
    color: #393b51
  }
header: 'Lag et enkelt skjema'
footer: 'Altinn Studio - kom i gang'
# End of Marp settings
---

### Opprette ny tjeneste

1. Klikk på knappen "Opprett ny app" for å lage en ny app som skal inneholde skjemaet.
2. Velg din organisasjon som eier av appen om du er tilknyttet en organisasjon
3. Skriv inn identifiserende navn på appen
   >*Navnet må være unikt innenfor din organisasjon. Det brukes også i URL til tjenesten når den er publisert.*
4. Klikk på knappen "Opprett app" og vent på at appen er opprettet.

---

![Opprett ny app](./Kurs-skjermbilder-Oppgave-Lag-ny-app.jpg)

### Redigere informasjon om tjenesten

Når appen er opprettet og lastet, kommer du til en oversiktsside for appen. Her kan du se:
- Menylinje:  Hvor du kan navigere til ulike verktøy, og åpne siden for innstillinger.
- Appens tittel: Denne vises til sluttbrukeren når de er inne i appen, og i innboksen i Altinn.
- Tilgjengelige miljøer: Viser hvilke miljøer din organisasjon har tilgjengelig for å publisere en app. Vanligvis et testmiljø (TT02) og et produksjonsmiljø.
  >*Hvis du har lagd appen på din egen bruker, og ikke på noen organisasjon, har du ingen miljøer tilgjengelig.*
- Lenke til dokumentasjonen
- Nyheter: Her publiserer vi informasjon om ny funksjonalitet fortløpende.

---

![Oversiktssiden](./Kurs-skjermbilder-Konsept-Oversikt-i-appen.jpg)


#### Endre informasjon om appen
1. Klikk på "Innstillinger" i menylinjen.
2. Skriv inn appens tittel - en beskrivende overskrift.
3. Skriv inn en beskrivelse om appen - hvem skal bruke den, og hva brukes den til?
4. Klikk på "Lagre"-knappen for å lagre endringene.
5. Naviger tilbake til oversikten ved å klikke på "Til hjem" i menylinjen.

---

![Endre tittel på appen](./Kurs-skjermbilder-Oppgave-Endre-tittel-på-appen.jpg)

---

Appens tittel bør legges inn på bokmål og nynorsk

Når du kommer tilbake til oversiktssiden vil du se at appens tittel har oppdatert seg der og.

![bg right:60% contain](./Kurs-skjermbilder-Konsept-Oversikt-i-appen-med-tittel.jpg)

### Lagre og dele endringer

Når du jobber med en app i Altinn Studio er det to hovedområder:
- Din brukers område: Alle endringer du gjør i en app lagres hit automatisk. Andre kan ikke se disse endringene.
- Appens sentrale område: Dette området er tilgjengelig for alle. Når du publiserer tjenesten, brukes dette området som 
  utgangspunkt. 

Endringer fra brukerens område må deles til appens sentrale område for at endringene skal bli tilgjengelig for publisering.

---

![Lagre og dele endringer](./Kurs-skjermbilder-Konsept-Endringer-og-lagring.jpg)

---

Nå som du har gjort en endring i appens overskrift, kan du dele den endringen til appens sentrale område.
1. Klikk på "Del dine endringer" i menylinjen.
2. Klikk på "Se siste endringer" for å se en oversikt over endringer som er gjort.
3. Se på endringene, og klikk på "X" for å lukke vinduet og komme tilbake til vindu for å dele endringer.
4. Beskriv endringene i tekstboksen og klikk på "Del endringer". 

---
![Dele endringer](./Kurs-skjermbilder-Oppgave-Del-endringer.jpg)

### Informasjonsside
Vi skal starte med å lage en informasjonsside, som skal inneholde bilde og tekst.

#### Naviger til utforming
1. Klikk på "Utforming" i toppmenyen.
2. Klikk på "Utform" på kortet for oppgaven "Task_1" for å utforme første del av skjemaet.

#### Om Utforming-siden
Utforming er satt opp med fire kolonner:
- Komponentlisten, der du finner komponentene du kan legge til. Du kan lukke denne kolonnen.
- Selve skjema-oppsettet, der du legger inn sider og komponenter.
- Konfigurasjonskolonnen, der du kan konfigurere valgt side/komponent.
- Forhåndsvisningen, der du ser det du har satt opp.

---

![Utforming-siden](./Kurs-skjermbilder-Konsept-Utforming.jpg)

#### Legg til komponenter på infosiden
1. Åpne siden "Side1" ved å klikke på den og klikk på "Legg til komponent".
2. Klikk på "Vis alle", søk etter "Bilde" og klikk på "Bilde"-komponenten under "Informasjon". Klikk på "Legg til" i 
  høyrepanelet for å legge til bildekomponenten på siden.
4. Under "Valg for bilde" i konfigurasjonskolonnen, klikk på "Lim inn en URL" og lim inn https://docs.altinn.studio/nb/altinn-studio/v8/getting-started/app-dev-course/resources/kommune-logo.png
5. Legg til ny komponent på siden: "Avsnitt".
6. Under "Ledetekst", legg inn en tekst. F.eks. "Vi har registrert at du har meldt flytting til Sogndal kommune - velkommen til oss!".

---

![Legg til bildekomponent](./Kurs-skjermbilder-Oppgave-infoside-bilde-leggtil.jpg)

---

![Legg til avsnitt](./Kurs-skjermbilder-Oppgave-infoside-avsnitt-leggtil.jpg)

---

![Infoside - resultat](./Kurs-skjermbilder-Oppgave-infoside-resultat.jpg)

### Datamodell
En datamodell er en slags innholdsfortegnelse for skjemaet. 
Datamodellen brukes til å bestemme _hva_ du vil hente inn av data og _hvordan_ dataene
skal se ut.

For et enkelt skjema er det ofte en direkte knytning mellom et felt i datamodellen og et felt i skjemaet. For mer avanserte
skjemaer kan datamodellen og skjemaet være ganske forskjellige.

Når du oppretter en app, følger det med en enkel datamodell med noen eksempelfelter. Du kan redigere feltnavnene
for å tydelig vise hva de representerer, og du kan legge til egne felter. 

Naviger til "Datamodell" i toppmenyen for å komme i gang.

[Les mer om datamodeller.](../../../../v8/concepts/data-model/)

---

![Datamodell-siden h:620px](./Kurs-skjermbilder-Konsept-Datamodell.jpg)


#### Krav fra kommunen
Kommunen ønsker i første omgang å samle inn følgende data om innflyttere:
- **Personinformasjon**
  - Fullt navn
  - Alder
- **Adresse**
  - Gateadresse
  - Postnummer
  - Poststed
- **Kontaktinformasjon**
  - E-postadresse
  - Telefon

#### Lage datamodellen
1. Påse at det er modellen `model` som er valgt. Slett de eksisterende feltene i modellen ved å klikke på 🗑️-ikonet ved siden av feltet.
2. Klikk på "Legg til" øverst på siden og velg "Objekt".
3. Endre navn på den nye gruppen til "person".
4. I person-gruppen, klikk på "Legg til felt" og velg "Tekst".
5. Endre navn på feltet til `fullt_navn`.

---

![Lage datamodellen](./Kurs-skjermbilder%20-%20Oppgave-Datamodell.jpg)

---

Fortsett å legge til felter i datamodellen. Du skal ha 3 grupper (`object`) med tilhørende felter.
Bruk feltene beskrevet i krav fra kommunen som referanse. Alle feltene kan være av typen "Tekst", med unntak av feltet 
`alder` som kan være et heltall.

Når du er ferdig med datamodellen, klikk på "Generer modeller" for å lage alle nødvendige modellfiler som appen bruker.

![bg right:40% contain](./Kurs-skjermbilder%20-%20Oppgave-Datamodell-2-resultat.jpg?width=300 "Resultat")

---

![Generer modeller](./Kurs-skjermbilder%20-%20Oppgave-Datamodell-generer-modeller.jpg)

#### Husk å dele endringer!

![Husk å dele endringer](./Kurs-skjermbilder%20-%20Oppgave-Del-endringer-basic.jpg)

### Utforme skjema

Nå skal du bygge opp skjemaet. Dette er veldig likt det du gjorde for infosiden.

Gå til "Utforming" i toppmenyen, og klikk på "Utform" på kortet for oppgaven "Task_1".

#### Lag en ny side
1. Klikk på "Legg til ny side". Altinn Studio legger til en ny side med navnet "Side2".
2. Klikk på "Side-ID" i konfigurasjonskolonnen og endre navnet på siden til "om-innflytter". Klikk på ✓ for å lagre.
3. Klikk på "Visningsnavn" og legg inn en visningstekst for siden, for eksempel "Om innflytter". Klikk på "Lagre".

Altinn Studio legger automatisk til komponenten "Navigasjonsknapper" på sidene, slik at brukeren kan bla mellom sidene med
knappene "Neste" og "Forrige".

---

![Lag en ny side](./Kurs-skjermbilder-Oppgave-Ny-side.jpg)

#### Legge til den første skjemakomponenten
Den første komponenten skal samle inn navnet til innflytteren. Til det bruker du komponenten "Lite tekstfelt", som lar
brukeren skrive inn en kort tekst på én linje.

1. Sjekk at du er på siden "Om innflytter". Klikk på "Legg til komponent" inne på siden.
2. Velg "Lite tekstfelt" fra komponentlisten.

Komponenten er nå lagt til på siden. Den mangler foreløpig en ledetekst og en kobling til datamodellen, og
forhåndsvisningen viser en feilmelding inntil du har valgt et datamodellfelt for komponenten.

---

![Legg til komponent](./Kurs-skjermbilder-Oppgave-Legg-til-komponent.jpg)

#### Legge inn ledetekst
Ledeteksten er teksten som står over feltet og forteller brukeren hva de skal fylle inn.

Altinn Studio lagrer alle tekstene i appen i en egen tekstfil, og hver tekst får en unik ID. Komponenten peker på tekstens
ID, ikke på selve teksten. Det gjør at du kan bruke samme tekst flere steder, endre teksten uten å endre komponenten og
oversette teksten til nynorsk og engelsk under "Språk" i toppmenyen.

1. Sjekk at komponenten "Lite tekstfelt" er valgt. Klikk på "Ledetekst" i konfigurasjonskolonnen.
2. Skriv "Fullt navn" i tekstfeltet under "Skriv tekst". Altinn Studio lager en ID for teksten automatisk.
3. Klikk på "Lagre".

Vil du bruke en tekst som allerede finnes i appen, kan du klikke på "Søk" og velge teksten fra listen i stedet for å
skrive en ny.

---

![Legg inn ledetekst](./Kurs-skjermbilder-Oppgave-Ledetekst.jpg)

#### Knytte feltet til datamodellen
Når brukeren fyller ut skjemaet, må appen lagre svaret et sted. Det er datamodellen som bestemmer hvor. Du knytter hvert
skjemafelt til et felt i datamodellen, slik at svaret brukeren skriver inn havner i riktig felt. Navnet til innflytteren
skal havne i feltet `fullt_navn` i gruppen `person`.

1. Klikk på "Velg datamodellfelt for Lite tekstfelt" i konfigurasjonskolonnen.
2. Under "Datamodell" er datamodellen `model` allerede valgt. Under "Datamodellfelt" velger du `person.fullt_navn`.
3. Klikk på "Lagre".

Feilmeldingen i forhåndsvisningen forsvinner, og du ser feltet med ledeteksten "Fullt navn".

---

![Knytt feltet til datamodellen](./Kurs-skjermbilder-Oppgave-Datamodellfelt.jpg)

---

{{% expandlarge id="name-field-code" header="Slik ser navnefeltet ut i filene til appen" %}}
Altinn Studio lagrer oppsettet du har laget i filer i appen. Komponenten står i layoutfilen for siden. `textResourceBindings`
viser hvilken tekst komponenten bruker som ledetekst (`title`), og `dataModelBindings` viser hvilket felt i datamodellen
appen lagrer svaret i.

{{< code-title >}}
App/ui/{taskId}/layouts/om-innflytter.json
{{< /code-title >}}

```json
{
  "id": "Input-ECYekc",
  "type": "Input",
  "textResourceBindings": {
    "title": "om-innflytter.Input-ECYekc.title.wu6n"
  },
  "dataModelBindings": {
    "simpleBinding": {
      "field": "person.fullt_navn",
      "dataType": "model"
    }
  }
}
```

Selve teksten ligger i tekstfilen for bokmål, med samme ID som komponenten peker på:

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}

```json
{
  "id": "om-innflytter.Input-ECYekc.title.wu6n",
  "value": "Fullt navn"
}
```

ID-ene slutter med tilfeldige tegn, så ID-ene i appen din blir annerledes.
{{% /expandlarge %}}

#### Legge til resten av skjemakomponentene
Du legger til resten av komponentene på samme måte som navnefeltet:

1. Hold musepekeren over komponenten som skal stå foran den nye komponenten, og klikk på "+"-tegnet som dukker opp under den.
2. Velg komponenttype fra komponentlisten.
3. Legg inn ledetekst og velg datamodellfelt.

Finner du ikke komponenten du leter etter, klikker du på "Vis alle" og søker etter den.

Legg til disse komponentene på siden "Om innflytter", i denne rekkefølgen:

| Ledetekst     | Komponent      | Datamodellfelt          |
|---------------|----------------|-------------------------|
| Alder         | Lite tekstfelt | `person.alder`          |
| Gateadresse   | Lite tekstfelt | `adresse.gateadresse`   |
| Postnummer    | Lite tekstfelt | `adresse.postnummer`    |
| Poststed      | Lite tekstfelt | `adresse.poststed`      |
| E-postadresse | Lite tekstfelt | `kontaktinfo.epost`     |
| Telefon       | Lite tekstfelt | `kontaktinfo.telefon`   |
| Send inn      | Knapp          | Ingen                   |

Komponenten "Knapp" sender inn skjemaet når brukeren klikker på den. Den trenger derfor ingen kobling til datamodellen.

---

![Legg til resten av skjemakomponentene](./Kurs-skjermbilder-Oppgave-Resten-av-skjemaet.jpg)

#### Forhåndsvise skjemaet
Nå kan du se hvordan skjemaet ser ut for brukeren.

1. Klikk på "Forhåndsvis" i menylinjen.
2. Forhåndsvisningen starter på infosiden. Klikk på "Neste" for å gå til siden "Om innflytter".

Du kan fylle ut feltene i forhåndsvisningen, men du kan ikke sende inn skjemaet herfra. For å teste hele flyten må du
publisere appen til et testmiljø.

Klikk på "Til Utforming" for å gå tilbake til utformingen.

---

![Ferdig skjema i forhåndsvisningen](./Kurs-skjermbilder-Oppgave-Forhandsvis-skjema.jpg)

#### Husk å dele endringer!

Del endringene dine til appens sentrale område på samme måte som tidligere. Klikk på "Del dine endringer" i menylinjen,
beskriv endringene og klikk på "Del endringer".

[Les mer om komponentene du kan bruke i Altinn Studio.]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components" >}})

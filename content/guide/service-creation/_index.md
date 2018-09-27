---
title: Lag en utgave
description: Dokumentasjon av funksjonalitet tilgjengelig for å lage en utgave
tags: ["guide"]
weight: 100
---

Oversikt over eksisterende utgaver finner man ved å gå inn på tjenesten, f.eks. fra startsiden. 

Ny utgave lages fra tjenestesiden:

{{<figure src="create-edition.gif?width=1000" title="Lage ny utgave">}}

### Last opp datamodell
Datamodellen definerer hva slags data som skal knyttes til tjenesten. Per nå støttes datamodell i form av XSD (Seres eller OR). 

Datamodellen lastes opp på utgaven. Dersom datamodell ikke er lastet oopp før vil det stå en melding om dette på hovedsiden til utgaven. Datamodell 
kan også lastes opp/sees fra **Modellering**-siden til utgaven.
{{<figure src="add-datamodel.gif?width=1000" title="Legg til datamodell">}}

### Lag skjema med UI editor

UI editor ligger under **UX** i toppmenyen for utgaven, under **Designer**
{{<figure src="go-to-designer.gif?width=1000" title="UI editor">}}

Skjemaelementer legges til ved å velge type element fra oversikten til venstre. Visning av skjema ligger på høyre side.

{{<figure src="ui-editor-overview.png?width=1000" title="UI editor - oversikt">}}

#### Redigere egenskaper til skjemaelement
Skjemaelementene har forskjellige egenskaper som kan redigeres. For å få opp redigeringsvindu kan man velge eksisterende elementer
i visningen av skjema på høyre side. Vindu med egenskaper kommer automatisk opp når nytt skjemaelement legges til.

##### Visningstekst
Alle skjemaelementer har en tekst knyttet til seg som beskriver forventet innhold i elementet. Tekst velges fra nedtrekksliste over tilgjengelige 
tekster, se avsnitt om tekster under.

{{<figure src="field-props-text.png?width=1000" title="Visningstekst">}}

##### Feltegenskaper
- _Required_: Er det påkrevd med verdi i feltet?
- _Disabled_: Skal feltet være skrivebeskyttet?

_OBS! Feltegenskapene over er per nå kun tilgjengelige på Input-elementer._

{{<figure src="field-props-reqDis.png?width=400" title="Feltegenskaper">}}

##### Forhåndsdefinerte valg
For skjemaelementer som har forhåndsdefinerte valg (f.eks. _nedtrekksliste_ og _radioknapper_) kan disse valgene konfigureres. Merk at feltene
for å konfigurere dette ikke er tilgjengelige for skjemaelementer som ikke har forhåndsdefinerte valg.

{{<figure src="field-props-options.png?width=1000" title="Forhåndsdefinerte valg">}}

##### Knytning mot datamodell
Skjemaelementer som skal ta input fra sluttbruker kan knyttes mot felt i datamodell. Det som sluttbruker skriver inn i skjemaelementet vil da
mappes til det definerte feltet i datamodellen. Knytning mot felt i datamodell gjøres via nedtrekksliste som viser tilgjengelige felt i datamodell.

{{<figure src="field-props-datamodel.png?width=1000" title="Knytning mot datamodell">}}

{{<figure src="ui-editor-component-properties.png?width=1000" title="UI editor - redigere egenskaper for skjemaelement">}}

### <a name="add-texts"></a> Legg til tekster
Tekster hentes inn både fra et fellesbibliotek tilgjengelig for alle, og evt. også fra fellesbibliotek for den enkelte tjenesteeier. 
Det er også mulig å legge inn egne tekster knyttet til en utgave, eller å overstyre tekster fra fellesbibliotek for en utgave.

#### Legge til, redigere eller overstyre tekster for en utgave
I toppmenyen, under **UX** velges menyvalget **Tekster** for å komme til tekstredigeringsverktøyet. Dette kan også nås ved å velge fanen **Tekster** 
dersom en allerede er inne i UI editoren. 

Tekster er definert med en nøkkel (unik for hver enkelt tekst) og en visningstekst. Tekster kan legges inn på flere språk.

{{<figure src="ui-editor-texts.png?width=1000" title="UI editor - redigere tekster">}}

### Legg til kodeliste
En kodeliste er en forhåndsdefinert liste med nøkler (_koder_) og visningstekster. En kode i kodelisten kan knyttes til opp til 3 visningstekster. 
Når kodeliste knyttes til en skjemakomponent velger man hvilken visningsverdi som skal brukes. Kodelister knyttes typisk mot en nedtrekksliste.

Kodelister hentes både fra felles bibliotek tilgjengelig for alle, evt. felles kodelister for den enkelte tjenesteeier, og kodelister som 
er definert på en utgave. 

#### Redigere eller endre kodeliste for en utgave
I toppmenyen, under **Modellering** velges menyvalget kodelister. 

For å redigere eksisterende kodeliste, velg ønsket kodeliste fra listen.

For å lage ny kodeliste, velg _Lag ny kodeliste_. 

{{<figure src="ui-editor-codelist.png?width=1000" title="UI editor - redigere kodelister">}}

#### Knytte en kodeliste mot skjemakomponent
1. Legg til ønsket skjemakomponent (f.eks. nedtrekksliste) i UI-editor, pass på å knytte denne mot felt i datamodellen.
2. Velg **Add connection** under Api connections på venstre side
3. Velg **Code list**
4. Velg ønsket kodeliste fra listen med tilgjengelige kodelister.
5. Velg **Add new mapping**
6. Velg hvilken av de 3 tekstene knyttet til koden (value1/value2/value3) som skal vises
7. Velg samme felt i datamodellen som skjemaelementet ble knyttet til
8. Lagre, da lukker vinduet for konfigurering av kodelister seg. 
9. Lagre skjema

Når utgaven testes vil de faktiske verdiene fra kodelisten populeres inn i nedtrekkslisten.

{{<figure src="ui-editor-codelist-config.gif?width=1000" title="UI editor - konfigurere knytning til kodeliste">}}

{{% notice info %}}
MERK: Per nå er det ingen språkstøtte for kodelister. Denne dokumentasjonen oppdateres når dette er tilgjengelig.
{{% /notice %}}

### Legg til kall til eksterne API
Kall til eksterne API kan brukes til å hente inn informasjon fra kilder utenfor "tjenesten". Tilgjengelige API hentes inn fra felles bibliotek.


Det er implementert støtte for 2 typer API. Under beskrives hva som må settes opp for de forskjellige typene.

#### API som tar inn input fra skjema, og som returnerer verdi som populeres i felt i skjema.
1. Legg til ønskede skjemakomponenter (f.eks input), en som input til API og en til å vise resultat, i UI-editor. Pass på å knytte til datamodell.
2. Velg **Add connection** under API connections på venstre side.
3. Velg **External API**
4. Velg ønsket API fra listen.
5. Legg til klientparametre (_ClientParam_) -  dette er input fra skjema som sendes til API.
	- Legg til eksempelverdi for å teste API-kallet
	- Legg til felt i datamodell, dette må være det samme feltet som komponent for input er knyttet mot i skjema.
6. Legg til ev. tilleggsparametre (_MetaParam_) - dette er input som sendes til API som *ikke* kommer fra skjema.
7. Test henting av data fra API ved å velge **Fetch from API using parameters**.
	- Respons vises i tekstfeltet under knappen
8. Velg **Add new mapping**
9. Velg hvilket av objektene fra resultatet som skal brukes.
10. Velg knytning til datamodell, dette må være likt som for den skjemakomponenten som skal vise resultatet.
11. Lagre
12. Lagre hele skjema
12. Test at det fungerer ved å skrive inn gyldig verdi i skjemakomponenten med input til API'et, og se at resultatet vises i riktig skjemakomponent.

{{<figure src="ui-editor-api-config.gif?width=1000" title="UI editor - konfigurere knytning til ekstern API">}}

#### API som returnerer liste, tilsvarende kodeliste.
1. Legg til ønskede skjemakomponenter (f.eks input), en som input til API og en til å vise resultat, i UI-editor. Pass på å knytte til datamodell.
2. Velg **Add connection** under API connections på venstre side.
3. Velg **External API**
4. Velg ønsket API fra listen.
5. Legg til ev. tilleggsparametre (_MetaParam_) - dette er input som sendes til API som *ikke* kommer fra skjema.
6. Test henting av data fra API ved å velge **Fetch from API using parameters**.
	- Respons vises i tekstfeltet under knappen
7. Velg **Add new mapping**
8. Velg hvilket av objektene fra resultatet som skal brukes.
9. Velg knytning til datamodell, dette må være likt som for den skjemakomponenten som skal vise resultatet.
10. Lagre.
11. Lagre hele skjema.

Verdiene lastes inn når skjemaet testes.

### Regler

#### Legge til nye/redigere regler
Tilgjengelige regler ligger i en javascript-fil og er tilgjengelige via **Modellering** -> **Kode** i toppmenyen. Velg filen `RuleHandler.js`.
Regler legges under objektet `ruleHandlerObject`. Alle parametere som forventes som input må defineres i objektet `ruleHandlerHelper`. 

I eksempelet under er det definert to regler, en som tar inn 3 verdier og returnerer summen av disse (`sum`), og en som tar inn 
et fornavn og et etternavn og returnerer fullt navn (`fullName`).
```
var ruleHandlerObject = {
  sum: (obj) => {
    obj.a = +obj.a;
    obj.b = +obj.b;
    obj.c = +obj.c;
    return obj.a + obj.b + obj.c;
  },

  fullName: (obj) => {
    return obj.first + ' ' + obj.last;
  }
}
var ruleHandlerHelper = {
  fullName: () => {
    return {
      first: "first name",
      last: "last name"
    };
  },

  sum: () => {
    return {
      a: "a",
      b: "b",
      c: "c"
    }
  }
}
```

#### Knytte regler mot felt i skjema
1. Legg til nødvendige komponenter i skjema. F.eks. for eksempelet `sum` trengs her 3 felter som input, i tillegg til ett felt som viser resultatet.
2. Velg **Add connection** under _Rule Connections_.
3. Velg ønsket regel (f.eks. `sum` i eksempelet).
4. Oppgi knytning til datamodell for alle input-verdiene (disse må da matche med de knytningene som er satt opp på skjemakomponentene).
5. Oppgi knytning til datamodell for resultatet (må matche med knytning som er satt opp på skjemakomponent).
6. Lagre.
7. Test at det fungerer ved å legge inn verdier i alle input-feltene og se at resultatet dukker opp i ønsket felt.
8. Lagre skjema.

### Dynamikk

Vi definerer dynamikk som hendelser i skjemavisningen basert på brukers input. For eksempel ved at visse felter kun vises dersom
bruker har oppgitt en gitt verdi et annet sted i skjema. Det er lagt opp til at man kan sette opp betingelser for når/hvordan slike hendelser skal
skje.

#### Legge til/redigere betingelser for dynamikk

Tilgjengelige betingelser ligger i en javascript-fil og er tilgjengelige via **Modellering** -> **Kode** i toppmenyen. Velg filen `RuleHandler.js`.
Regler legges under objektet `conditionalRuleHandlerObject`. Alle parametere som forventes som input må defineres i objektet 
`conditionalRuleHandlerHelper`. 

I eksempelet under er det definert tre betingelser:

- `biggerThan10`: sjekker om oppgitt verdi er større enn 10.
- `smallerThan10`: sjekker om oppgit verdi er mindre enn 10.
- `lengthBiggerThan4`: sjekker om lengden til en tekst er lengre enn 4.

```
var conditionalRuleHandlerObject = {
  biggerThan10: (obj) => {
    obj.number = +obj.number;
    return obj.number > 10;
  },

  smallerThan10: (obj) => {
    obj.number = +obj.number;
    return obj.number > 10;
  },

  lengthBiggerThan4: (obj) => {
    if (obj.value == null) return false;
    return obj.value.length >= 4;
  }
}
var conditionalRuleHandlerHelper = {
  biggerThan10: () => {
    return {
      number: "number"
    };
  },

  smallerThan10: () => {
    return {
      number: "number"
    }
  },

  lengthBiggerThan4: () => {
    return {
      value: "value"
    }
  }
}
```

#### Knytte betingelser for dynamikk mot felt i skjema
1. Legg til ønsket komponent som dynamikk skal knyttes mot.
2. Velg **Add connection** under **Conditional Rendering connections** i venstre menyen i UI editor.
3. Velg ønsket betingelse.
4. Velg felt i datamodell som skal sjekkes.
5. Velg hva du ønsker at skal skje med elementet dersom valgt metode returnerer `true`. Per nå støttes følgende operasjoner:
	- Show
	- Hide
6. Velg felt i skjema som dynamikken skal knyttes mot.
7. Lagre.
8. Lagre skjema.

Dynamikken kan testes under testing av skjema, f.eks. gjennom [Preview-funksjonaliteten](../service-testing).

{{<figure src="ui-editor-conditional-rendering.png?width=1000" title="UI editor - konfigurere betingelser for dynamikk">}}


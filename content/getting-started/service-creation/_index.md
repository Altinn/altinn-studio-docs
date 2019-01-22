---
title: Create a service
description: Information on how to create a service in Altinn Studio
tags: ["guide"]
weight: 100
---

An overview of existing services is available on the dashboard. This is also where new services can be created from. 

### Create a new service

A new service is created from the dashboard.

{{<figure src="dashboard-overview.png?width=1000" title="Dashboard - overview">}}

1. Click on the "ny tjeneste" button in the top right corner of the dashboard. 
2. Select the service owner to create the service for
3. Enter the display name for the service
    - This is the name that will be shown to the end user, and can be changed later
4. The identifier name of the service will automatically be populated based on the display name. _This can not be changed once the service has been created._ This name is only used to identify the service in the solution. The identifier must start with a letter, and can only contain alphanumeric characters or underscore.
5. Create the service by clicking "Opprett"

{{<figure src="dashboard-new-service.png?width=1000" title="Dashboard - create a new service">}}

Once the service is created you will be redirected to the service. 

### Upload data model
The data model defines the data that can be submitted in the service. Currently the data model format must be XSD (Seres or OR).

The data model needs to be uploaded for each service. 

1. Open the service from the dashboard
2. Choose _Modellering -> Datamodell from the top navigation menu
3. Click on _Velg XSD_ and choose an XSD in the file explorer
4. Click _Last opp_

The data model XSD is then parsed, and all necessary files are generated. These files can be viewed by selecting the different tabs displayed on the data model page. There is also a visual representation (tree view) of the data model available on this page. 

{{<figure src="add-datamodel.gif?width=1000" title="Legg til datamodell">}}

### Create a form using the GUI editor

The GUI editor is available via the "Lage" option in the navigation menu. 

{{<figure src="ui-editor-empty.png?width=1000" title="GUI editor">}}

#### Form components
Form components can be dragged into the working surface in the middle from the menu on the left-hand side. The form components can be rearranged by dragging/dropping them on the working surface.

When hovering over a component, or after selecting a component by clicking on it, two icons are visible - a _trash_-icon for deleting the component and a _pencil_-icon for editing properties on the component. 

{{<figure src="ui-editor-add-components.gif?width=1000" title="GUI editor - add components">}}

See the [overview of form components](components) for more details on the different components that are available.

#### Editing the properties on a component
Each component has a set of properties that can be edited, for example texts, connection to data model, etc. In order to edit the properties on a component, hover over or click on the component. A _pencil_-icon will then be visible to the right of the component. Click on this icon to open the properties editor for the component. 

Save any changes by clicking the _checkmark_-icon to the right of the properties editor. Discard any changes by clicking the _X_-icon to the right of the properties editor.

{{<figure src="ui-editor-edit-properties.png?width=1000" title="GUI editor - edit properties on a component">}}

{{%notice info%}}
NOTE: The form components are currently being developed. As such, not all form components have a complete/updated properties editor.
{{% /notice%}}

See the [overview of form components](components) for information on which properties are available to edit.

### <a name="add-texts"></a> Texts
Texts are stored in resource files for the service. Texts can come from common libraries, from the data model, and be added manually. These texts are available for example when editing a form components properties, and selected texts will be shown to the end user.

#### Add/edit texts for the service
In the top navigation menu, select _UX_ -> _Tekster_ to go to the text editing page. 
An overview of the texts that are already available for the service is shown.

On this page, existing texts can be changed and new texts can be added. Add a new text by clicking _Ny tekst_, and enter the text and a unique identifier for the text. 

Save any changes by clicking _Lagre tekster_.

{{<figure src="ui-editor-texts.png?width=1000" title="UI editor - redigere tekster">}}

### Code lists
A code list is a pre-defined list of _codes_ and display texts that can be connected to a form component. Code lists can come from common libraries, and can be defined for each service.

#### Add/edit code list
In the top navigation meny, select _Modellering_ -> _Kodelister_. An overview of existing code lists will be shown. To edit an existing code list, select it from the overview. To add a new code list, click _Lag ny kodeliste_. 

{{<figure src="ui-editor-codelist.png?width=1000" title="UI editor - redigere kodelister">}}

#### Connect a code list to a form component
{{%notice info%}}
NOTE: Currently, the only form components that support code lists are _Radio buttons_ and _Checkboxes_.
{{% /notice%}}

1. Add a form component that supports code lists, and open the properties editor for the component. 
2. Select _Code list_ as option to add radio buttons.
3. Select a code list from the available options for the service.
    - Note that this must be a code list that is either defined for the service, or in a common library that the service has access to.
4. Save the changes by clicking the _checkmark_ icon to the right of the properties editor. 

When testing the service, the actual values from the code list will be loaded into the component. 

{{<figure src="ui-editor-add-codelist.png?width=1000" title="UI editor - add a code list to a form component">}}

{{% notice info %}}
NOTE: There is currently no language support for code lists.
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


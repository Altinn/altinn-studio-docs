---
title: Tjenester 3.0 - Runtime - Arkitektur
linktitle: React App
description: Beskrivelse av arkitektur for React App i Runtime
tags: ["tjenester 3.0"]
weight: 100
---

## Arkitektur Tjeneste React App 
React App vil i runtime være en React applikasjon som bygges/pakkes basert på valgene som
ble gjort av tjenesteutvikler. 

Arkitekturen vil i utgangspunktet være lik på tvers av sluttbrukertjenester, 
men det kan være forskjeller på hvilke versjoner av rammeverk som det er bygget på.

En viktig føring for denne appen er at oppdateringer i rammeverk ikke automatisk skal påvirke
React App for den aktuelle tjenesten. Derfor vil den bygges designtime og legges med selve tjenesten
sammen med nødvendige rammeverk/referanser til rammeverk med en gitt versjon.

TODO: 
Det er foreløpig ikke laget bygg av dette. 

Figuren nedenfor viser den overordnede arkitekturen som er valgt for React App.

{{%excerpt%}}
<object data="/products/tjenester/3.0/solutions/runtime/architecture/react-app/ReactAppArchitecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

### Overordnet konsept
Det overordnede konseptet er at man har en konfigurasjonsfil som definerer hvilke komponenter
et skjema skal bestå av og rekkefølgen på disse. Denne konfigurasjonsfilen blir generert av UX Designern i Altinn Studio når
tjenesteutvikleren designer tjenesten og blir en del av ressursfilene som inkluderes i tjenestepakken.

FormLayout.json lastes inn av React Appen sammen med selve dataene og annen
konfigurasjon til en tjeneste når applikasjonen starter.

Applikasjonen rendrer komponentene som er definert i designer FormLayout..
Dette skjer ved at Preview komponenten løper gjennom design filen og kaller FormComponent
for hver enkelt element i listen. FormComponent rendrer deretter komponenter som tekstbokser eller nedtrekkliste
avhengig av hvilken type komponent.

### React komponentene
React komponentene som kan velges i UX-designer er alle React komponenter som vil
rendes basert input til FormComponenten. 

Disse er for øyeblikket 

* HeaderComponent
* InputComponent
* CheckboxContainerComponent
* TextAreaComponent
* RadioButtonContainerComponent
* DropdownComponent
* FileUploadComponent

Disse er alle basert på Reactstrap rammeverket. 
TODO: Her skal vi skrive ut Reactstrap

Hver enkel komponent har definert et sett med input data (props) som den forventer som input. Det er opp til den overliggende komponenten å skaffe tilveie
disse. Dette kan være verdier fra state eller egne input data.  

React legger opp til React komponetene har en metode for å mappe verdier fra state til props for de komponentene som krever.

Når sluttbruker gjør endringer i skjema (f.eks fyller inn noe i en tekstboks) vil den trigge en event som igjen trigger 
Actions som håndteres av forskjellige dispatchers

```
 /**
   * This is the event handler that triggers the Redux Actions
   * that is sendt to the different Action dispatcher.
   * This event handler is used for all form components rendered from this
   */
  public handleComponentDataUpdate = (callbackValue: any): void => {
    if (!this.props.component.dataModelBinding) {
      return;
    }

    FormFillerActionDispatchers.updateFormData(
      this.props.id,
      callbackValue,
      this.props.dataModelElement,
    );
    ExternalApiActionDispatchers.checkIfApiShouldFetch(this.props.id, this.props.dataModelElement, callbackValue);
    RuleConnectionActionDispatchers.checkIfRuleShouldRun(this.props.id, this.props.dataModelElement, callbackValue);
  }

```

### Redux 
Redux benyttes for å lagre state i applikasjonen. I tjenester 3.0 finnes det flere data store.

For runtime er det følgende Redux store som benyttes

#### AppConfigState
Inneholder informasjon om hvilken modus applikasjonen har.

```
export interface IAppConfigState {
  designMode: boolean;
}
```

#### DataModelState
Inneholder informasjon om alle elementene i datamodellen. Basert på JSON generert fra XSD

```
export interface IDataModelState {
  model: IDataModelFieldElement[];
  fetching: boolean;
  fetched: boolean;
  error: Error;
}
```

#### RuleModelState
Inneholder definerte regler

```
export interface IRuleModelState {
    model: IRuleModelFieldElement[];
    fetching: boolean;
    fetched: boolean;
    error: Error;
  }
```

#### TextResourceState
Inneholder alle tekstressurser.

```
export interface ITextResourcesState {
  resources: ITextResource[];
  language: string;
  fetching: boolean;
  fetched: boolean;
  error: Error;
}
```

#### FormFillerState
Inneholder all skjemadata og eventuelle valideringsfeil. 

```
export interface IFormFillerState {
  formData: any;
  validationErrors: any;
}
```

### Reducer
Redux reducers har til oppgave å oppdatere de forskjellige stores. Det er en reducer for hver enkel store.
Følgende er definert 

* formFillerReducer - Ansvarlig for å oppdatere FormFillerState
* errorReducer - Ansvarlig for å oppdatere 
*

Reducerne lytter etter Actions som blir dispatchet 

### Action Types
Action Types er type definisjoner på hendelser

Eksempler:

```
// All update form data actions
export const UPDATE_FORM_DATA: string = `${moduleName}.UPDATE_FORM_DATA`;
export const UPDATE_FORM_DATA_FULFILLED: string = `${moduleName}.UPDATE_FORM_DATA_FULFILLED`;
export const UPDATE_FORM_DATA_REJECTED: string = `${moduleName}.UPDATE_FORM_DATA_REJECTED`;

```

### Action
Actions er hendelser som kan bli trigget av de forskjellige komponentene. 
En Action inneholder minimum typen av en Action, men kan også inneholde andre metadata rundt hendelsen.

Eksempel:

```
export interface IUpdateFormDataAction extends Action {
  formData: any;
  componentID: string;
  dataModelElement: IDataModelFieldElement;
}
```

### Action Creators
Action Creators lager actions


Eksempel:

```
export function updateFormDataAction(
  componentID: string,
  formData: any,
  dataModelElement: IDataModelFieldElement,

): IUpdateFormDataAction {
  return {
    type: ActionTypes.UPDATE_FORM_DATA,
    formData,
    componentID,
    dataModelElement
  };
}
```


### Action Dispatcher
Action dispatcher 




### Redux-Saga
Redux-Saga er Middleware rammeverk som benyttes for å gjøre asynkrone kall mot API i løsningen.
Dette er f.eks uthenting av skjemdata og lagring av skjemadata. 

Hver enkel Saga som defineres definerer metoder som utfører forskjellige typer oppgaver.
Dette kan f.eks være lagring av skjemdata eller uthenting av skjemadata. 

Det er definert forskjellige Saga for de forskjellige funksjonelle områdene. Sagaene er

* appData - Ansvarlig for å hente ut regler, tekstressurser og datamodell
* externalApiSaga - Funksjonalitet rundt externe APi
* formFillerSagas - funksjonalitet knyttet til uthenting og lagring av skjemadata

For hver Saga metode knyttes det lytttere som lytter til Actions. Det er dette som trigger 
at de nødvendige kallene skjer.

```
/**
 * Define a listener for the UPDATE_FORM_DATA event
 */
export function* watchUpdateFormDataSaga(): SagaIterator {
  yield takeLatest(FormFillerActionTypes.UPDATE_FORM_DATA, updateFormDataSaga);
}
```

### Formlayout file

Layouten på skjemaet er definiert i en json-fil som ligger i Gitea repoet.  
Denne filen har vært veldig uoversiktlig med tanke på manuell endring, siden det er normalisert for frontend utvikling.
Nå som denne har blitt endret, vil UI-edtioren ha samme interne layout, men når det lagres vil det skje en konvertering til et format som er enklere å lese og endre manuelt.  

Dette nye formatet vil se slik ut:

```json
{
  "data": {
    "layout": [
      {
        "id": "7693ca6a-a4d5-4b78-a7b9-1a499419e256",
        "type": "Checkboxes",
        "textResourceBindings": {
          "title": "25795.OppgavegiverNavnPreutfyltdatadef25795.Label",
          "description": "25796.OppgavegiverAdressePreutfyltdatadef25796.Label"
        },
        "dataModelBindings": {
          "simpleBinding": "skattyterinforgrp5801.infogrp5802.oppgavegiverNavnPreutfyltdatadef25795.value"
        },
        "options": [
          {
            "label": "Navn1",
            "value": "Verdi1"
          }
        ],
        "required": true,
        "readOnly": false
      },
      {
        "id": "dbe9155a-9dce-425e-a9f3-1d51c05f42c3",
        "type": "Datepicker",
        "textResourceBindings": {
          "title": "25795.OppgavegiverNavnPreutfyltdatadef25795.Label",
          "description": "25796.OppgavegiverAdressePreutfyltdatadef25796.Label"
        },
        "dataModelBindings": {
          "simpleBinding": "skattyterinforgrp5801.infogrp5802.oppgavegiverPostnummerPreutfyltdatadef25797.value"
        },
        "readOnly": false,
        "required": true
      },
      {
        "id": "cba318a0-4158-488e-8a47-29a72fb526e0",
        "type": "Input",
        "textResourceBindings": {
          "title": "25796.OppgavegiverAdressePreutfyltdatadef25796.Label",
          "description": "25797.OppgavegiverPostnummerPreutfyltdatadef25797.Label"
        },
        "dataModelBindings": {
          "simpleBinding": "skattyterinforgrp5801.klagefristgrp5804.klagemeldingSendtInnenKlagefristdatadef25454.value"
        },
        "required": true,
        "readOnly": false
      }
    ]
  }
}
```

Arrayen i dette eksempelet representerer også rekefølgen komponentene vil bli vist i SBL.
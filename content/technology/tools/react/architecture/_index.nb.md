---
title: Kodearkitektur
description: Kodearkitektur for React og tilhørende teknologi
tags: [tech, frontend, react]
---

## Bruk av Redux Store i Containere og Components.

### Kort oppsummert (TL;DR)

Send "ID" eller andre identifikatorer via Props til komponenten og la komponenten hente data fra Redux Store.

### Utfordring (Why?)

Hvis en del av Redux Store sendes som Props så vil komponenten re-rendres ved endringer av denne Prop/Store. Det er ønskelig at komponenter ikke rendrer unødvendig.

### Re-rendring trigges av…

* Endring av Props.
* Endring av State som endrer Props.

#### Kilder

* [Redux best practices](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e)
* [Common pitfalls](https://itnext.io/redux-ruins-you-react-app-performance-you-are-doing-something-wrong-82e28ec96cf5)

## Filtrering av Redux Store i mapStateToProps() ved help av Selector

### Kort oppsummert (TL;DR)

Bruk Memoized Selector for å filtrere Redux Store til Props når Redux Store er stor.

### Utfordring (Why?)

Hver gang (en del av) Redux Store endrer seg vil funksjoner som filtrerer ut deler av Redux Store kjøres. Hvis Redux Store (state tree) er stor (mange endringer) eller funksjonen er krevende kan det føre til ytelsesproblemer.

### Løsningen

En Selector funksjon, med bruk av "reduxjs/reselect" vil kun kjøres når en definert del av Redux Store endres (eks "state.del.underdel").

#### Kilder

* [Reselect](https://github.com/reduxjs/reselect)
* [Comparing shouldComponentUpdate() and Reselect](https://blog.rangle.io/react-and-redux-performance-with-reselect/)

### Eksempel

#### Selector

Dette er en enkel Selector uten mye logikk og filtrering. Jo større logikk i "filtreringen" jo mer "sparer" man i ytelse.

```javascript
import { createSelector } from 'reselect';

/**
 * Reselect version
 */
const formDataSelector = (state: any, providedProps: any) => {
  console.log('formdata selector', providedProps.id);
  return state.formFiller.formData;
};

const dataModelBindingSelector = (state: any, providedProps: any) => {
  console.log('datamodelBindingSelector');
  return state.formDesigner.layout.components[providedProps.id].dataModelBinding;
};

const getFormData = () => {
  console.log('getFormData() is trigggered, selector is created');
  return createSelector(
    [formDataSelector, dataModelBindingSelector],
    (formData: any, dataModelBinding: any) => {
      console.log('ouput selector running', formData);
      if (!formData) return '';
      if (!formData[dataModelBinding]) return '';
      return formData[dataModelBinding];
    },
  );
};

export const makeGetFormDataSelector = getFormData;

// Alternativt en enda enklere variant, som er implementert p.t.

import { createSelector } from 'reselect';

const formDataSelector = (state: any, providedProps: any) => {
  return state.formFiller.formData[state.formDesigner.layout.components[providedProps.id].dataModelBinding];
};

const getFormData = () => {
  return createSelector(
    [formDataSelector],
    (formData: any) => {
      if (!formData) return '';
      return formData;
    },
  );
};

export const makeGetFormDataSelector = getFormData;

```

#### Implementasjon i mapStateToProps

```javascript
const makeMapStateToProps = () => {
  const GetFormDataSelector = makeGetFormDataSelector();
  const mapStateToProps = (state: IAppState, props: IProvidedProps): IFormElementProps => ({
    id: props.id,
    formData: GetFormDataSelector(state, props),
  });
  return mapStateToProps;
};

export const FormComponentWrapper = connect(makeMapStateToProps)(FormComponent);
```

makeMapStateToProps implementeres slik at Selectoren kan gjenbrukes på tvers av flere komponenter.

## Higher-Order Components

Higher-Order component er en funksjon som tar imot en component og returnerer et nytt komponent med ekstra funksjoner, eller ekstra data.
Et eksempel på dette er *connect*-funksjonen fra "redux", som tar imot en funksjon som velger redux-state data, og en komponent som disse dataene skal sendes til.

### Hvorfor?

Ved å wrappe induviduelle komponenter i en higher-order component, vil vi få enklere kode mtp. at en funksjon håndterer endringer i skjemaet på kun en komponent, i motsetning til å ha en funksjon som håndterer alle endringer i skjemaet.
Dette vil også gi tredjeparts-utviklere en enklere måte å skrive egne funksjoner for håndtering av endringer i deres komponenter.

#### Eksempel på bruk i Altinn Studio

Når bruker lager en tjeneste med 3. parts komponenter vil vi wrappe disse komponentene i en
Higher Order Component som gir den en callback funksjon som tar imot data som komponenten har,
og kjøre en redux-action som oppdaterer data i redux-state. Uten at utvikleren av 3. parts komponenten må sette seg inn i hvilke actions som skal kjøres. 
Dette gir også bedre mulighet for å gjennbruke 3. parts komponenter.

#### Eksempel på Higher Order Component

```javascript
const FormComponentWrapper = (WrappedComponent, ...) => {
	// Feel free to do anything that will enhance the components properties

	// Return a react component
	return class extends React.Component {
		// Add functions for handling changing of data
		handleDataChange = (dataModelBinding, data) => {
			// fire off an action for adding the changed data to redux state
		}

		render() {
			return(
				<WrappedComponent onFormDataChange={this.handleDataChange} {...props}/>
			);
		}
	}
}
```

#### Kilder

* [Higher-Order component](https://reactjs.org/docs/higher-order-components.html)

## Normalized Redux Store

### Kort oppsummert (TL;DR)

* Hver datatype får sin egen "tabell" i State.
* Hver "tabell" skal lagre individuelle "data" som objekter, med IDer som nøkler og "dataen" som verdi.
* Referansene til de individuelle "dataene" lagres ved å lagre IDene.
* Array med IDene brukes for å indikere sortering.

### Utfordring (Why?)

* Kompliserte reducers for å oppdatere nøstet state struktur.
* Unødvendig re-rendering grunnet oppdatering av nøstede objekter.

### Eksempel

```javascript
{
    posts : {
        byId : {
            "post1" : {
                id : "post1",
                author : "user1",
                body : "......",
                comments : ["comment1", "comment2"]    
            },
            "post2" : {
                id : "post2",
                author : "user2",
                body : "......",
                comments : ["comment3", "comment4", "comment5"]    
            }
        },
        allIds : ["post1", "post2"]
    },
    comments : {
        byId : {
            "comment1" : {
                id : "comment1",
                author : "user2",
                comment : ".....",
            },
            "comment2" : {
                id : "comment2",
                author : "user3",
                comment : ".....",
            },
            "comment3" : {
                id : "comment3",
                author : "user3",
                comment : ".....",
            },
            "comment4" : {
                id : "comment4",
                author : "user1",
                comment : ".....",
            },
            "comment5" : {
                id : "comment5",
                author : "user3",
                comment : ".....",
            },
        },
        allIds : ["comment1", "comment2", "comment3", "commment4", "comment5"]
    },
    users : {
        byId : {
            "user1" : {
                username : "user1",
                name : "User 1",
            },
            "user2" : {
                username : "user2",
                name : "User 2",
            },
            "user3" : {
                username : "user3",
                name : "User 3",
            }
        },
        allIds : ["user1", "user2", "user3"]
    }
}
```

#### Kilder

* [Normalizing State Shape](https://redux.js.org/recipes/structuringreducers/normalizingstateshape)


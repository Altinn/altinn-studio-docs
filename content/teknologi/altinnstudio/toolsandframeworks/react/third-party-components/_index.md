---
title: Tredjeparts komponenter
description: Tredjeparts komponenter
tags: [tech, react]
---

Det er ønskelig at tredjeparter skal kunne utvikle komponenter som en
tjenesteeier skal kunne bruke i sine løsninger.

## Hvordan utvikle 3. parts komponenter

Når du som en bruker ønsker å utvikle tredjeparts-komponenter så er det anbefalt å bruke [rollup.js](https://rollupjs.org) som kompilerer til cjs (CommonJS).

Eksempel på et komponent som i et fiktivt git repo (basert på Gitea Repo) ligger i `src/components/BalloonCounter/index.js` :

```jsx
import React from 'react';

export class BalloonCounter extends React.Component {
	constructor(_props, _state) {
		super(_props, _state);

		this.state = {
			count: 0,
		}
	}

	handleIncrement = () => {
		let {count} = this.state;
		count += 1;
		this.setState({
			count,
		}, () => {
			this.handleSubmitData();
		});
	}

	handleDecrement = () => {
		if(this.state.count !== 0) {
			let {count} = this.state;
			count -= 1;
			this.setState({
				count,
			}, () => {
				this.handleSubmitData();
			})
		}
	}

	handleSubmitData = () => {
		this.props.onHandleDataUpdate(this.state.count);
	}
	

	render() {
		return (
			<div>
				Number of ballons you want {this.state.count}
				<button onClick={this.handleIncrement}> + </button>
				<button onClick={this.handleDecrement}> - </button>
			</div>
		);
	}
}
```

Viktig: Komponentens `this.props.onHandleDataUpdate(...)` er en funksjon som returnerer dataene komponenten har til skjema-appen, som håndterer lagring i datamodell.

Husk å  exportere denne classen i `src/components/index.js` slik:

```javascript
export * from './BallonCounter.js';
```

Når `npm run build` blir kjørt vil dette lage en mappe med navn `dist`, med en fil som heter `index.js`.
Denne filen må være med i git push for at altinn.studio skal kunne hente komponentene.

### Hvordan bruke 3. parts komponenter

I tjenester du ønsker å bruke 3. parts komponenter må det ligge en `ThirdPartyComponents.json`-fil.
Plasseringen av denne er viktig, den må ligge under `[Tjeneste navn]/editions/[utgave]/Resources`.
Innholdet av denne filen er som følger:

```json
{
  "packages": [{
    "packageName": "[navn på pakken]",
    "location": "[Link til raw format av index.js i git-repoet]"
  }]
}
```

Eksempel på en slik json-fil finner du [her.](https://altinn.studio/Jesper/TestRepo/src/branch/master/editions/2018/Resources/ThirdPartyComponents.json)

Hvis alt ble satt opp riktig, vil pakkene med prefiksen til pakkenavnet komme opp i toolbaren på venstre side av Skjema designeren. F.eks. `SuperCoolPackage.SuperCoolComponent`.

## Alternative løsninger

- Webpack med treeshaking
    - Positivt:
        - Webpack er allerede brukt i applikasjonen
    - Negativt:
        - Slik webpack er konfigurert idag vil det bli bygget en react-applikasjonsfil med alle komponenter, dette vil kreve en separering av react-skjemadesigner og react-runtime.
            - Runtime bygget må skje med formLayout, som vi henter i oppstarts-fasen av applikasjonen. Slik at alle kompoenter (brukte og ubrukte komponenter) blir med i bygget.
        - Bygget må skje fra kommando-linje/scripts som kjører i filstrukturen
- Next.js SSR (server side rendering)
    - Positivt:
        - Gjøre initiell rendering på server, la klienten slippe å hente data som tekstressurser, datamodell, formLayout
        - Dynamisk henting av komponenter som ikke er standard i react-applikasjonen
    - Negativt:
        - Introdusere flere tjenester og mye endring av allerede eksisterende react-kode
- HTTP API som starter webpack-build
    - Ved å ha et api som f.eks. Express.js, som håndterer kompilering av applikasjon (bruker allerede kompilerte filer hvis de finnes) og blir kun brukt til å fetche javascript filen som inneholder react. Eller kun bygge da tjenesteeier klikker på "Migrer tjeneste".
    - Positivt:
        - Dynamisk kompilering av kun nødvending react applikasjon og 3. parts komponenter (kan både kompileres da tjenesten migreres, eller hver gang et en bruker starter å fylle ut et skjema (antar at første alternativ er mest gunstig))
    - Negativt:
        - Introdusere ny tjeneste (med mindre endringer av eksisterende kode enn "Next.js SSR"-alternativet)

#### Ressurser

- Webpack tree-shaking
  - [Webpack tree-shaking](https://webpack.js.org/guides/tree-shaking/)
  - [Webpack module concatenation plugin](https://webpack.js.org/plugins/module-concatenation-plugin/)
- Next.js
  - [Offisiell nettside](https://nextjs.org/)
  - [Github Docs](https://github.com/zeit/next.js)
- Express
  - [Offisiell nettside](https://expressjs.com/)
  - [Github side](https://github.com/expressjs/express)
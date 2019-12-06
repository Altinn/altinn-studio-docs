---
title: Frontend retningslinjer
description: For å få en felles forståelse av "best practice" for frontend-utvikling i Altinn har vi samlet noen regler for Javascript og CSS, samt utilities-klassene vi opererer med
toc: true
weight: 2
---

## CSS-regler

- Skriv all CSS ved hjelp av SASS/SCSS
- Alle variabler skal inn i "variables.scss". Prosjekter med eget theme kan overstyre variablene i sin egen variables-fil.
- Bruk kun klasser til stilsetting, ikke ID'er.
- Kun engelske klassenavn, id-navn og kommentarer

### Prefikser

For å kunne skille mellom klasser som kommer fra Bootstrap, Patternlab og klasser som er ment for å stilsette Altinns UI-komponenter, bruker vi prefikser som start på egendefinerte klasser.

- .a-... Spesifiserer stilsetting for Altinns UI-komponenter
- .a-sg-... Stilsetting lagt til for å utvide Pattern Lab's design
- .a-js-... For JavaScript og dens funksjoner
- .a-st-... Spesifiserer stilsetting for presentasjon av designsystemet ( [storefront](https://github.com/Altinn/designsystem-styleguide))
<br><br>
Dersom en løsning skal ha et eget theme, kan Altinns styling overstyres ved å neste css'en inni en klasse som blir lagt på body, f.eks ```.project-altinnett```.

Dersom nye klasser introduseres for et prosjekt, bruk egen prefix, f.eks;
- .br- ... Spesifiserer stilsetting for Brønnøysundregistrenes UI-komponenter
- .an- ... Spesifiserer stilsetting for Altinnetts UI-komponenter

### CSS Konvensjon

For å sikre konsistens i CSS-koden, skiller vi modul, komponent og state med bindestrek. Hver del av navnet skrives i lowerCamelCase.

.< moduleName > [ - < componentName > ][ - < state > ] {}

**Eksempler**

- Modul (container/root) <br> .searchResults {}

- Komponen av en modul<br>.searchResults-heading {}

- State: (f.eks AJAX-loading)<br> .searchResults-isLoading {}

### Sass-lint med custom policies

Der det er sammenfallende regler med linting av javascript er disse like. Dette gjelder i hovedsak innrykk som settes som 2xspace. Alle regler for linting av sass ligger i filen ```.sass-lint.yml```. Her ligger det også lenker til dokumentasjonen for de spesifikke reglene. Om en regel er satt til 0 er den skrudd av, 1 vil gi en warning og 2 vil gi en feil.

Man kan sette opp automatisk linting av scss i Visual Studio Code, installer extension «vscode-sass-lint»: [https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint) .

For å linte sass fra kommandolinjen kjør ```npm run sass``` eller ```./node_modules/.bin/sass-lint –v -q``` fra roten av git-repoet. Om man bruker «npm run sass» vil kommandoen gi en feilmelding til slutt om man har noen feil eller warnings. Derfor kan det være ryddigere å bruke den andre kommandoen.

For å linte en spesifikk sass fil, bruk kommandoen ```./node_modules/.bin/sass-lint –v –q source/css/scss/<mappenavn>/<filnavn>```

Sortering av element properties er satt til å ta utgangspunktet i bootstrap sin PropertySortOrder [https://github.com/twbs/bootstrap/blob/v4-dev/scss/.scss-lint.yml](https://github.com/twbs/bootstrap/blob/v4-dev/scss/.scss-lint.yml).

## JavaScript
For linting av javascript bruker vi airbnb sine regler, med noen custom overrides som finnes i ```.eslintrc.js```.

Man vil *ikke* kunne committe til github dersom det er linting-feil i koden. Dette gjelder også for css-linting.


## Kodekvalitet

- HTML skal validere som HTML5
- CSS skal validere med unntak av CSS3-attributter og IE-filtre.
- Klasse- og ID-navn skal ha meningsfulle navn som fungerer til gjenbruk andre steder.
- Bruk av !important skal begrenses i stilarket. Sjekk først om stilsettingen kan utføres ved omstrukturering av klasser/containere.
- Stilarket skal ikke inneholde duplisering og ingen ubrukte klasse- eller ID-selektorer (i den grad det kan kontrolleres).
- Semantisk korrekt oppbygging. Eks. Overskrifter (h1 > h2 osv), legends i fieldsets, caption på tabeller.
- Lister skal være være lister. Også oppramsinger av ting kan ofte markeres som lister.

## Valideringsverktøy
- Bootlint - Validerer Bootstrap prosjekter
- CSS Validator - Validerer CSS
- Total Validator - Validerer tilgjengelighet, rettskriving, og ødelagte lenker
- Easy Checks - Nyttige verktøy for UU
- Tanaguru Contrast Finder - Sjekker fargekontraster og foreslår gyldige alternativer
- Colour Contrast Analyser - Validerer fargekontraster etter WCAG2.0 krav (ikke prøvd)

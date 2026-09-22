---
draft: true
title: Innstillinger for sider og oppgaver
description: Felles innstillinger, overstyringer per oppgave og automatisk lagring.
weight: 50
toc: true
---

Bruk `App/ui/Settings.json` til innstillinger som skal gjelde på tvers av oppgaver. Egenskapene ligger direkte i objektet:

```json
{
  "showLanguageSelector": true,
  "showProgress": true,
  "autoSaveBehavior": "onChangeFormData"
}
```

## Overstyr innstillinger for en oppgave

I `App/ui/<TaskId>/Settings.json` ligger sideinnstillingene under `pages`. `defaultDataType` ligger på toppnivå og viser til ID-en til datatypen i appens metadata:

```json
{
  "defaultDataType": "model",
  "pages": {
    "order": ["Side1", "Side2"],
    "showLanguageSelector": false,
    "autoSaveBehavior": "onChangePage"
  }
}
```

`order` angir sidenavnene fra `layouts` uten `.json`. Bruk enten `order` eller `groups` for å ordne sidene, ikke begge.

En verdi du setter for oppgaven, overstyrer den felles innstillingen. Dette gjelder også `false`. Lister erstatter den felles listen, de legges ikke til den.

## Visning og navigasjon

Du kan vise [språkvelgeren](/nb/altinn-studio/v9/develop-a-service/look-and-feel/tekster/oversettelse/) med `showLanguageSelector`, fremdriften med `showProgress` og knappen for å utvide skjemaet med `showExpandWidthButton`. `expandedWidth` åpner skjemaet i utvidet bredde. Disse innstillingene er som standard `false`.

`hideCloseButton` skjuler lukkeknappen og er som standard `false`. `navigationTitle` kan være en tekstressursnøkkel eller et uttrykk. `taskNavigation` styrer hvilke oppgaver som vises i oppgavenavigasjonen.

Se også [validering](/nb/altinn-studio/v9/develop-a-service/data/validation/) for validering ved navigasjon og [PDF-generering](/nb/altinn-studio/v9/develop-a-service/process/pdf/) for PDF-oppsettet.

## Automatisk lagring

Standardverdien for `autoSaveBehavior` er `onChangeFormData`. Appen lagrer da når skjemadataene endres. For tekstfelt kan oppdateringen være forsinket mens brukeren skriver. Se [feltinnstillinger](/nb/altinn-studio/v9/develop-a-service/look-and-feel/felt-innstillinger/).

Sett `autoSaveBehavior` til `onChangePage` for å lagre ved sideskifte i stedet. Da kjører serverens dataprosessering først når dataene lagres. Beregnede verdier fra serveren oppdateres dermed ikke for hver endring brukeren gjør på siden. Ta hensyn til dette hvis skjemaet bruker slike verdier i dynamikk eller validering.

`saveWhileTyping` på et felt styrer forsinkelsen før feltet oppdaterer skjemadataene. En kortere forsinkelse endrer ikke `onChangePage` til lagring for hver feltendring.

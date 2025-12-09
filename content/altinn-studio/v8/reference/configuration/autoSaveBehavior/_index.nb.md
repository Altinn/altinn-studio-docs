---
title: Automatisk lagring
description: Konfigurering av hvor ofte klienten lagrer skjemadata
---

{{%notice warning%}}
Denne funksjonen støtter ikke validering av enkeltfelt.
{{%/notice%}}

Å endre denne atferden kan påvirke hvor ofte appen lagrer data til backend.
Konfigurasjonen kan gjøres både i layout-sets.json og Settings.json.

```json
// layout-sets.json
{
  "sets": [...],
  "uiSettings": {
    "autoSaveBehavior": "onChangePage"
  }
}
```

```json
// Settings.json
{
  "pages": {
    "autoSaveBehavior": "onChangePage"
  }
}
```

## onChangeFormData (Default)

Lagrer data til backend ved hver interaksjon med et skjema-komponent.
Dette er standardoppførselen.

## onChangePage

Lagrer data til backend ved navigering mellom sider.
Dette inkluderer navigering med NavigationBar-komponenten, NavigationButtons-komponenten og bakknappikonet.

### Forbedrer serverytelse ved høy etterspørsel

OnChangePage-atferd kan forbedre serverytelsen i Azure hvis appen din har mange brukere på kort tid.
Du må imidlertid vurdere at appen ikke vil lagre skjemaet hvis brukeren ikke har navigert mellom sider eller sendt det inn.
En sideoppdatering vil da miste dataene.

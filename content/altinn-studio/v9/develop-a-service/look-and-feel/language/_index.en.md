---
draft: true
title: Language selection
description: How the app selects a language and displays the language selector.
weight: 80
toc: true
---

The app supports the languages you provide text resources for in `App/config/texts`. For example, you can have `resource.nb.json`, `resource.nn.json` and `resource.en.json`. The `language` value in each file must match the language code in its filename.

## Display the language selector

Set `showLanguageSelector` to `true` in `App/ui/Settings.json`:

```json
{
  "showLanguageSelector": true
}
```

You can override this setting for each task. See [page and task settings](/en/altinn-studio/v9/develop-a-service/look-and-feel/ui-settings/).

## How the app selects a language

The app selects the first language in this order for which it has text resources:

1. The language in the `lang` URL parameter.
2. The user's previous selection, stored in a cookie.
3. The language in the user's profile.
4. Norwegian Bokmål (`nb`), Norwegian Nynorsk (`nn`), then English (`en`).
5. The first available language in the app.

You can share a link with `?lang=en` to open the app in English. If the URL already has parameters, use `&lang=en`. The app skips languages it does not support.

The URL parameter overrides the language for this visit and does not save a new language preference. When the user selects a language in the selector, the app stores the selection in a cookie and removes `lang` from the URL.

This order determines the app's language. It does not mean that missing text keys are automatically retrieved from another language. Include the texts the app uses in each language's resources.

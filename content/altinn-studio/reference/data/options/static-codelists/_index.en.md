---
title: Static code lists from the application repository
linktitle: Static code lists
description: How to configure static code lists from the application repository.
toc: false
weight: 50
---

By adding json based option files in the application repository, the application will automatically read the file and expose it through the options api. For this to work, the files must be placed in the `App/options/` folder and be named according to the following conventions `{optionId}.json` for the application to recognize them.

For example if you have a list of countries in a file named `countries.json`, the optionId would be `countries`, and would be exposed through the api at `{org}/{app}/api/options/countries`. The static code lists should be in a special format as shown below:

```json
[
    {
        "value": "norway",
        "label": "Norge"
    },
    {
        "value": "denmark",
        "label": "Danmark"
    },
    {
        "value": "sweden",
        "label": "country.label.sweden"
    }
]
```

Note that the `label` field can be a key to a text resource (as shown above for sweden) or plain text.
---
draft: true
title: Prefilling data based on query parameters
linktitle: Query parameters
description: How to configure prefill for an app based on query parameters.
toc: false
weight: 400
---

Altinn apps support prefill based on query parameters.

Note: Requires minimum version v4.18.0 of frontend, v8.6.0 of backend to work. 

This allows users to click a link like https://ttd.apps.tt02.altinn.no/ttd/stateless-app/set-query-params?jobTitle=designer, 
and have the word 'designer' be prefilled into a datamodel field.

However, there are a few important caveats regarding security when using this approach.

Firstly, query parameter prefill can only be used in a stateless task. 
If we did not have this requirement, it would be possible to for an attacker to change the value in the parameter and have that value show up directly in the receivers altinn inbox.

By going via a stateless task, we ensure that the data is displayed to the user before instantiating, so that the user is still in control of what data is saved.

Second we highly recommend inspecting the value of the query parameters in your application. This way you ensure that only valid data can be prefilled, so that an attacker can't send someone a link like: 

```altinn.no/ttd/stateless-app/set-query-params?jobTitle=Im a scammer```


and have the text "Im a scammer" show up in your application.

## How to configure query parameter prefill

### 1. configure <stateless_datamodel>.prefill.json

In your models folder, create a file called <stateless_datamodel>.prefill.json (if the name of your model is tax_return, the file should be called tax_return.prefill.json).

Example:

```json 
{
  "$schema": "https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json",
  "QueryParameters": {
    "jobTitle": "JobTitle"
  }
}
```

This requires you to have a field called ```JobTitle``` in your datamodel, and allows you to prefill this field with a link like:

https://ttd.apps.tt02.altinn.no/ttd/stateless-app/set-query-params?jobTitle=designer

Important note: the link to prefill only works on the path ```:org/:app/set-query-params```, like in the example above.

Also note that only query parameters defined in ```<stateless_datamodel>.prefill.json``` will work. If you try to link to https://ttd.apps.tt02.altinn.no/ttd/stateless-app/set-query-params?somethingelse=designer,
you will get an error.

### 2. Configure InstantiationProcessor and InstantiationButton

Follow the steps here: [Starting an instance from a stateless form](/en/altinn-studio/v8/reference/configuration/stateless#starting-an-instance-from-a-stateless-form)


### 3. (Optional but highly recommended) validate query parameter values

To validate query parameter values, implement in your /logic folder.
Here is barebones example:

```c# 
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;

namespace Altinn.App.AppLogic.DataProcessing
{
    public class ValidateQueryParamPrefill : IValidateQueryParamPrefill
    {
        public async Task PrefillFromQueryParamsIsValid(Dictionary<string, string> prefill)
        {
            // For example, only "Developer", "Manager", or "Tester" are allowed for JobTitle
            if (prefill.TryGetValue("JobTitle", out var jobTitle))
            {
                var allowedJobTitles = new HashSet<string> { "Developer", "Manager", "Tester" };
                if (!allowedJobTitles.Contains(jobTitle))
                {
                    throw new Exception($"Invalid JobTitle '{jobTitle}'.");
                }
            }

            // No issues found
            await Task.CompletedTask;
        }
    }
}
```

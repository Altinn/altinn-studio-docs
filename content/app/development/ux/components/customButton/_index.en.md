---
title: CustomButton
linktitle: CustomButton
description: Overview over the CustomButton component
tags: [actions, translate-to-english]
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---

{{% panel theme="warning" %}}
⚠️ Custom actions is under active development. This functionality is not configurable directly in Altinn Studio
yet, and must be configured manually in the JSON files.
{{% /panel %}}

## Introduction

The `CustomButton` component provides a way to define custom behaviour tied to the clicking of a button.
The component lets you define a list of actions that will be executed when the button is clicked. These actions
are separated into two types: `ClientActions` and `ServerActions`. The `ClientActions` are executed on the client-side,
and have predefined functionality such as navigating to a new page. The `ServerActions` are executed on the server-side,
and have entirely custom functionality that you define yourself. The `ServerActions` can also return a list of `ClientActions`
which execute after the server-side action has finished.

## ClientActions

Client actions are predefined functionality that can be executed on the client-side. They are called by adding
an action to the `actions` propertiy of the `CustomButton` component. It is important to specify that the action
is a `ClientAction` by setting the `type` property to `ClientAction`.
This is how you do that:

```json
{
  "id": "custom-button",
  "type": "CustomButton",
  "textResourceBindings": {
    "title": "custom-button-title"
  },
  "dataModelBindings": {},
  "actions": [
    {
      "id": "nextPage",
      "type": "ClientAction"
    }
  ]
}
```

Client actions can also receive parameters. You can pass a parameter to a client action by using the `metadata` property.
The object `metadata` will be passed to the function as an argument. This is how you do that:

```json
{
  "id": "custom-button",
  "type": "CustomButton",
  "textResourceBindings": {
    "title": "custom-button-title"
  },
  "dataModelBindings": {},
  "actions": [
    {
      "id": "navigateToPage",
      "type": "ClientAction",
      "metadata": {
        "page": "page-2"
      }
    }
  ]
}
```

These are the available `ClientActions`:

| Function name    | Parameters         | Behavior                                         |
| ---------------- | ------------------ | ------------------------------------------------ |
| `nextPage`       | -                  | Will navigate to the next page, if it exists     |
| `previousPage`   | -                  | Will navigate to the previous page, if it exists |
| `navigateToPage` | `{ page: string }` | Navigates to the specified page if it exists     |

## ServerActions

Server actions are entirely custom, and can be configured to do whatever you want. This is how you define
a `ServerAction`:

1. Define a custom ServerAction that implements the `IUserAction` interface:

   ```C#
   using System.Collections.Generic;
   using System.Threading.Tasks;
   using Altinn.App.Core.Features;
   using Altinn.App.Core.Models.UserAction;

   namespace Altinn.App.Actions;

   public class FillAction : IUserAction
   {
      public string Id => "fill";

      public async Task<UserActionResult> HandleAction(UserActionContext context)
      {
          // Do whatever you want here

          // Return a UserActionResult:
          var userActionResult = UserActionResult.SuccessResult(new List<ClientAction>());

          // Return an updated datamodel if any fields have changed:
          userActionResult.AddUpdatedDataModel(dataId, data);
          return userActionResult;
      }
   }
   ```

2. Register your custom server action in the _Program.cs_ class
   ```C#
   services.AddTransient<IUserAction, FillAction>();
   ```
3. Add the server action to the `actions` property of the `CustomButton` component:
   ```json
   {
     "id": "custom-button",
     "type": "CustomButton",
     "textResourceBindings": {
       "title": "custom-button-title"
     },
     "dataModelBindings": {},
     "actions": [
       {
         "id": "fill",
         "type": "ServerAction"
       }
     ]
   }
   ```

### Returning client actions

A `ServerAction` can also return a list of `ClientAction`s that will be executed on the client-side
after the server-side action has finished. This is useful if you want to navigate to a new page after
the server-side action has finished. This is how you do that:

```C#
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.UserAction;

namespace Altinn.App.Actions;

public class FillAction : IUserAction
{
   public string Id => "fill";

   public async Task<UserActionResult> HandleAction(UserActionContext context)
   {
       var userActionResult = UserActionResult.SuccessResult(new List<ClientAction> { ClientAction.NextPage });

       return userActionResult;
   }
}
```

## Order of execution:

The actions are executed in the order they are defined in the `actions` property of the `CustomButton` component.
If a `ServerAction` returns a list of `ClientAction`s, these will be executed after the server-side action has finished,
and before the next action in the list is executed. You can chain as many actions as you want together.

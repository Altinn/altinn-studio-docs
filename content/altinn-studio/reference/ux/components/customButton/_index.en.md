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

A client action exists for the purpose of closing a subform. You can add the option to validate before exiting. A standard
use case would be to have two buttons in the subform, e.g. **Exit** and **Done**, where **Exit** would not validate. This
will allow the user to return to the main form without having to fill out the subform. Here is how you would add a button
with this action:

```json
{
  "id": "close-subform-done",
  "type": "CustomButton",
  "textResourceBindings": {
    "title": "custom-button-title"
  },
  "actions": [
    {
      "type": "ClientAction",
      "id": "closeSubform",
      // Validation is optional
      "validation": {
        "page": "all",
        "show": ["All"]
      }
    }
  ]
}
```

These are the available `ClientActions`:

| Function name    | Parameters          | Behavior                                         |
| ---------------- | ------------------- | ------------------------------------------------ |
| `nextPage`       | -                   | Will navigate to the next page, if it exists     |
| `previousPage`   | -                   | Will navigate to the previous page, if it exists |
| `navigateToPage` | `{ page: string }`  | Navigates to the specified page if it exists     |
| `closeSubform`   | optional validation | Closes the subform and returns to the main form  |

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

## Instructions for Adding serverAction to Desired Process Step

1. Adding serverAction to "Task_1" in the process.bpmn file:
   Open the process.bpmn file and add serverAction to the desired process step, such as "Task_1":

   ```xml
    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:incoming>SequenceFlow_1n56yn5</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1oot28q</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>data</altinn:taskType>
          <altinn:actions>
            <altinn:action type="serverAction">fill</altinn:action>
          </altinn:actions>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>
   ```

2. Adding serverAction id to desired step in the policy.xml file:
   Navigate to the policy.xml file to add the serverAction id to the desired step, such as "Task_1":

   ```xml
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">fill</xacml:AttributeValue>
            <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
          </xacml:Match>
        </xacml:AllOf>
   ```

---
draft: true
title: Confirm receipt when the process has ended
linktitle: Automatic confirmation
description: How to let the app confirm receipt on behalf of the service owner when the process has ended.
toc: true
---

An instance is not finished for Altinn until the service owner has confirmed that the data has been received. Usually the service owner confirms, by calling the `complete` endpoint. When the app delivers the data to the service owner during the process, for example with eFormidling or Fiks Arkiv, the app can confirm instead. See [Bekrefte at dataene er mottatt](/nb/altinn-studio/v9/receive-data/#bekrefte-mottak) (documentation available in Norwegian only) for what the confirmation means.

## Turn on the confirmation

You turn on the confirmation with `confirm` under `onProcessEnd` in `applicationmetadata.json`. The setting is off by default.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "onProcessEnd": {
    "confirm": true
  }
}
```

The app then confirms every instance when the process has reached an end event (`endEvent`), whichever path the process took to get there. The service tasks for eFormidling and Fiks Arkiv do not confirm by themselves.

The confirmation comes after `IOnProcessEndedHandler` has run, and after the app has deleted the data types with `autoDeleteOnProcessEnd`. When `autoDeleteOnProcessEnd` is turned on for the whole app, the app confirms before it deletes the instance. Altinn removes a deleted instance from the database only once it has been confirmed, so with both settings the service owner does not need to confirm.

{{% notice warning %}}
Turn on the setting only when the process cannot end without the service owner having received the data. After the confirmation, Altinn regards the data as received. A system that queries Storage with `excludeConfirmedBy` no longer gets the instance, and Altinn can remove an instance that has been deleted.
{{% /notice %}}

## Grant the service owner the `complete` action

The app confirms as the service owner. The organisation that owns the app must therefore have the `complete` action in `App/config/authorization/policy.xml`. The `policy.xml` from the app template grants the organisation this action.

Storage checks the action after the process has ended. The instance is then at an end event, not in a task:

- A rule that grants `complete` without limiting the action to a task or an end event works. That is how the rule in the app template is written.
- A rule that grants `complete` only in a specific task does not work.
- A rule that limits `complete` to an end event works only for that end event. It must therefore name the end event the process ends at.

The [rule library](/nb/altinn-studio/v9/develop-a-service/reference/configuration/authorization/rules/) (documentation available in Norwegian only) has an example of a rule that lets the organisation complete an instance whose process has ended.

When you build the app, [the rule ALTINNAPP0800]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0800" >}}) checks that the organisation has `complete`, and fails the build if the action is missing. You get [the warning ALTINNAPP0801]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0801" >}}) instead when the build cannot settle it, for example because the rule applies to one task only. If the process has more than one end event, the build accepts a rule that applies to one of them. Storage checks the end event the instance actually ends at.

## When Storage refuses the confirmation

If the organisation lacks `complete` for the end event, Storage refuses the confirmation. The platform retries the step, by default for up to a day. If it gives up, the process has still ended, but the instance stays in the `processing` state:

- If `autoDeleteOnProcessEnd` is turned on for the whole app, the app does not delete the instance.
- If the app sends events, `app.instance.process.completed` does not arrive.
- Neither the end user nor a system that reads the process sees the failure. The app reports that the process has ended, with no trace of the failure.

The instance stays that way until you have corrected `policy.xml` and restarted the workflow. The app's `process/resume` endpoint refuses a process that has ended, so neither the end user nor a system can restart the workflow from there.

So test the confirmation in a test environment before you publish to production. Submit an instance, and check that it has a confirmation in `completeConfirmations` with your organisation in `stakeholderId`.

### Restart the workflow

You restart the workflow yourself, in the administration area of Altinn Studio. You must be a member of the team for the environment in your organisation, **Admin-TT02** or **Admin-Production**. See [Standardteam i Altinn Studio](/nb/altinn-studio/v9/develop-a-service/reference/administration/access-management/studio/#admin-tt02-og-admin-production) (documentation available in Norwegian only) for what the two teams give access to.

The page **Instanser med problemer** in the administration area lists the instances where a workflow has failed. Once you have corrected `policy.xml`, do this:

1. Open the instance in the administration area.
2. Click **Prøv på nytt** on the workflow that failed.
3. Click **Prøv arbeidsflyten på nytt** to confirm.

The workflow continues from the step that failed, so the app tries to confirm once more.

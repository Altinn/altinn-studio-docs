---
title: Add Maskinporten scopes to an app
linktitle: Add scopes
description: Step-by-step guide for adding Maskinporten scopes to an app in Altinn Studio.
weight: 10
toc: true
---

This guide shows how to add Maskinporten scopes to an app in Altinn Studio.

Before you start, sign in with Ansattporten on behalf of the organisation that owns the app. The app must also have a service owner rule in `App/config/authorization/policy.xml` that grants `[org]` the `read` and `write` rights.

{{% notice info %}}
If the app only needs the default service owner scopes, `altinn:serviceowner/instances.read` and `altinn:serviceowner/instances.write`, apps using Altinn App v8.3 or newer can use the **Add default scopes** button when it is shown. Apps using Altinn App v9 get these scopes automatically if they are missing.
{{% /notice %}}

The screenshots show the Norwegian Altinn Studio UI. The flow and placement are the same in English.

## If You Do Not Have Access

If Studio shows **You do not have access on behalf of the organisation**, Studio cannot fetch Maskinporten scopes for the app owner organisation with the Ansattporten access you are already signed in with.

![The Maskinporten tab shows a message about missing access on behalf of the organisation](maskinporten-scopes-no-access.nb.png "Message about missing access on behalf of the organisation.")

To resolve it:

1. Check that the app is owned by the correct organisation in Altinn Studio.
2. Ask a director/manager in the organisation, or someone with the Altinn **Hovedadministrator** role, to give your user access to self-service for clients in ID-porten/Maskinporten in Altinn. If the organisation also administers API scopes itself, the user also needs access to self-service for APIs. See [Digdir's guide for access in test and production environments](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web.html#tilgang-i-test-og-produksjonsmilj%C3%B8).
3. Alternatively, ask a user who already has this access to add the scopes to the app.
4. Try again in Altinn Studio after the access has been granted.
5. Contact Altinn servicedesk if the access should be correct but the message is still shown.
{.floating-bullet-numbers}

## Steps

1. Open the app in Altinn Studio. Go to **Settings**, open the **Maskinporten** tab, and select **Add**.

   ![The Maskinporten tab in app settings with the Add button](maskinporten-scopes-overview.nb.png "The Maskinporten tab in app settings.")

2. In the **Add new scope** dialog, you can search for scopes that the organisation has access to.

   ![The Add new scope dialog](maskinporten-scopes-dialog.nb.png "The Add new scope dialog.")

3. Search for the scopes the app needs, and select one or more scopes in the list.

   ![Two Maskinporten scopes selected in the dialog](maskinporten-scopes-selected-in-dialog.nb.png "Select scopes in the dialog.")

4. Select **Complete** to save the scopes in the app settings.

   ![Selected Maskinporten scopes shown in app settings](maskinporten-scopes-selected.nb.png "Selected scopes shown in app settings.")

5. Build and deploy the app again. Scope changes take effect the next time the app is built and deployed.
{.floating-bullet-numbers}

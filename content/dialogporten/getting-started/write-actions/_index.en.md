---
title: 'Write actions'
description: 'Learn how write actions are used to provide a more integrated user experience'
weight: 50
---

## Introduction
Write actions are a way to allow GUI actions to perform a state changing operation directly from browser based end-user systems without the need for a full page navigation, allowing for a more cohesive user experience. 

## Background
All [actions]({{<relref "../dialogs#actions">}}) defined on a dialog are effectively URLs pointing to the service provider system that must be requested in some way by the end-user system when the user indicates that action is to be performed. While custom end-user systems implementing [API-actions]({{<relref "../dialogs#api-actions">}}) can invoke both read and write operations using all available HTTP methods and input/output models, browser based end-user systems implementing [GUI-actions]({{<relref "../dialogs#api-actions">}}) are by default constrained to read operations (ie. navigate to a page, or download a file) using HTTP GET methods.

Cross-origin full page navigation is perhaps the most central feature of the web, and is, unlike "state changing" operations such as HTTP POSTs, not constrained by web browsers due to security reasons. This is what makes it possible to implement [single-sign-on](https://docs.digdir.no/docs/idporten/oidc/oidc_func_sso) mechanisms in ID-porten and session initialization (all of which involves several browser redirects) at the remote service provider system. This allows for seamless deep-linking between browser based end-user systems (eg. Arbeidsflate) and the user-facing GUI parts of the service provider systems. 

However, performing a cross-origin POST, ie. submitting a form to an endpoint on a different server, while relying on the same SSO and session intialization mechanisms is (both in modern web browsers as well as in ID-porten) not possible. This is by design, and to avoid security issues stemming from [cross-site request forgery (CSRF)](https://owasp.org/www-community/attacks/csrf). 

{{<notice info>}}
Custom end user systems utilizing the API actions and Maskinporten/system user authentication are not constrained by this, as these are security measures put in place by web browsers, and not inherently constraints of the HTTP protocol.
{{</notice>}}

This is usually not a problem, as most GUI-actions in Dialogporten are meant to be full page navigations, such as "Go to form fill-out", where all the state changing operations are implemented.  But some actions does not require any particular input, nor does it produce any particularly interesting output. Actions such as "Confirm message read" or "Cancel process", would with a normal GUI action require the user to 1) perform a full page navigation to the remote system, 2) perform the actual state changing operation there, and wait for a confirmation before 3) navigating back to the (now presumably updated) dialog.

While this works, it is not a very cohesive user experience as it involves intermediate steps and navigations, which from a user point of might seem unnecessary.

## The solution

As with [front channel embeds]({{<relref "../front-channel-embeds">}}), write actions leverage the [dialog token]({{<relref "../authorization/dialog-tokens">}}) mechanism to allow browser based enduser system to directly invoke the URL associated with the action in the background, ie. without performing a full page navigation. While the request is undergoing, the end user system might show a spinner or similar progress indicator. Upon completion, end-users will be presented with the updated dialog view. In case of errors (either technical or business logic-related), an error message can be displayed.

Dialogporten does not know the semantics associated with an action, so for actions that involve complex mutations of the dialog, the service owner must perform the change, update the dialog in the background, and then return a successful response in the request made by the end-user system. This will trigger the end-user to reload the (now updated) dialog from Dialogporten, and display the new state to the user. There are also mechanisms to allow the for the dialog change to occur asynchronously (delayed) and independent on the request made by the end-user system, transparent to the end-user. See the reference section for technical details.

**Read more**
* [Technical reference for front-channel embeds]({{<relref "../../reference/front-end/front-channel-embeds">}})

{{<children />}}
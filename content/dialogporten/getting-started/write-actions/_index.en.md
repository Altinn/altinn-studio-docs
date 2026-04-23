---
title: 'Write actions'
description: 'Learn how write actions are used to provide a more integrated user experience'
weight: 50
---

## Introduction
Write actions allow GUI actions to perform state-changing operations directly from browser-based end-user systems without the need for a full-page navigation, enabling a more cohesive user experience.

## Background
All [actions](/en/dialogporten/getting-started/write-actions/../dialogs#actions) defined on a dialog are effectively URLs pointing to the service provider system, and must be requested in some way by the end-user system when the user indicates that an action is to be performed. While custom end-user systems implementing [API actions](/en/dialogporten/getting-started/write-actions/../dialogs#api-actions) can invoke both read and write operations using all available HTTP methods and input/output models, browser-based end-user systems implementing [GUI actions](/en/dialogporten/getting-started/write-actions/../dialogs#api-actions) are by default constrained to read operations, i.e., navigating to a page or downloading a file, using HTTP GET methods.

Cross-origin full-page navigation is perhaps the most central feature of the web, and is, unlike state-changing operations such as HTTP POST requests, not constrained by web browsers for security reasons. This is what makes it possible to implement [single-sign-on](https://docs.digdir.no/docs/idporten/oidc/oidc_func_sso) mechanisms in ID-porten and session initialization, all of which involve several browser redirects, at the remote service provider system. This allows seamless deep-linking between browser-based end-user systems, e.g., Arbeidsflate, and the user-facing GUI parts of the service provider systems.

However, performing a cross-origin POST, i.e., submitting a form to an endpoint on a different server, while relying on the same SSO and session initialization mechanisms is not possible, either in modern web browsers or in ID-porten. This is by design, in order to avoid security issues stemming from [cross-site request forgery (CSRF)](https://owasp.org/www-community/attacks/csrf).

{{<notice info>}}
Custom end-user systems using API actions and Maskinporten or system-user authentication are not constrained by this, as these are security measures put in place by web browsers and not inherent constraints of the HTTP protocol.
{{</notice>}}

This is usually not a problem, as most GUI actions in Dialogporten are meant to be full-page navigations, such as "Go to form fill-out", where all state-changing operations are implemented. But some actions do not require any particular input, nor do they produce any particularly interesting output. Actions such as "Confirm message read" or "Cancel process" would, with a normal GUI action, require the user to 1) perform a full-page navigation to the remote system, 2) perform the actual state-changing operation there and wait for a confirmation, and then 3) navigate back to the now presumably updated dialog.

While this works, it is not a very cohesive user experience, as it involves intermediate steps and navigations that may seem unnecessary from the user's point of view.

## The solution

As with [front channel embeds](/en/dialogporten/getting-started/write-actions/../front-channel-embeds/), write actions use the [dialog token](/en/dialogporten/getting-started/write-actions/../authorization/dialog-tokens/) mechanism to allow browser-based end-user systems to invoke the URL associated with the action directly in the background, i.e., without performing a full-page navigation. While the request is in progress, the end-user system might show a spinner or a similar progress indicator. Upon completion, end users will be presented with the updated dialog view. In case of errors, either technical or business-logic-related, an error message can be displayed.

Dialogporten does not know the semantics associated with an action, so for actions that involve complex mutations of the dialog, the service owner must perform the change, update the dialog in the background, and then return a successful response to the request made by the end-user system. This will trigger the end user to reload the updated dialog from Dialogporten and display the new state to the user. There are also mechanisms that allow the dialog change to occur asynchronously, i.e., delayed and independent of the request made by the end-user system, in a way that is transparent to the end user. See the reference section for technical details.

**Read more**
* [Technical reference for front-channel embeds](/en/dialogporten/getting-started/write-actions/../../reference/front-end/front-channel-embeds/)

{{<children />}}

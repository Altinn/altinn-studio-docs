---
title: 'Write actions'
description: 'Learn how write actions are used to provide a more integrated user experience'
weight: 50
---

## Introduction
Write actions are a way to allow GUI actions to perform a state changing operation directly from the end-user system without the need for a full page navigation, allowing for a more cohesive user experience. 

## Background
All [actions]({{<relref "../dialogs#actions">}}) defined on a dialog are effectively URLs pointing to the service provider system that must be requested in some way by the end-user system when the user indicates that action is to be invoked. While [API-actions]({{<relref "../dialogs#api-actions">}}) can define both read and write operations using various HTTP methods and input/output models, [GUI-actions]({{<relref "../dialogs#api-actions">}}) are by default constrained to read operations (ie. navigate to a page, or download a file) using HTTP GET methods.

Cross-origin full page navigation is perhaps the most central feature of the web, and is, unlike "state changing" operations such as HTTP POSTs, not constrained by web browsers due to security reasons. This is what makes it possible to implement [single-sign-on](https://docs.digdir.no/docs/idporten/oidc/oidc_func_sso) mechanisms in ID-porten and session initialization (all of which involves several browser redirects) at the remote service provider system. This allows for seamless deep-linking between the end-user system (eg. Arbeidsflate) and the user-facing GUI parts of the service provider systems. 

Performing a cross-origin POST, ie. submitting a form to an endpoint on a different server, while relying on the same SSO and session intialization mechanisms is (both in modern web browsers as well as in ID-porten) not possible. This is by design, and to avoid security issues stemming from [cross-site request forgery (CSRF)](https://owasp.org/www-community/attacks/csrf). 

{{<notice info>}}
Custom end user systems utilizing the API actions and Maskinporten/system user authentication are not constrained by this, as these are security measures put in place by web browsers, and not inherently constraints of the HTTP protocol.
{{</notice>}}

This is usually not a problem, as most GUI-actions in Dialogporten are meant to be full page navigations, such as "Go to form fill-out", where all the state changing operations are implemented.  But some actions does not require any particular input, nor does it produce any particularly interesting output. Actions such as "Confirm message read" or "Cancel process", would with a normal GUI action require the user to 1) perform a full page navigation to the remote system, 2) perform the actual state changing operation there, and wait for a confirmation before 3) navigating back to the (now presumably updated) dialog. 

{{<children />}}


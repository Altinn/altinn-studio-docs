---
title: Customisations in custom code
linktitle: Custom code
description: Customise your app with custom code
draft: true
weight: 40
---

## About using custom code in an Altinn app

An Altinn app is a complete web application, so you can add custom code when you need to support more than the standard configuration supports.

### Example use cases

This list is not exhaustive. In practice, you can implement whatever the app needs.

- Validate at startup, for example with advanced validation logic, lookups or similar logic.
- Prefill dynamically from your own systems.
- Run calculations and other logic while the user fills in the app.
- Look up data from external sources while the user fills in the app or during submission.
- Add logic or advanced validation during submission or when the process moves to a new task.
- Create or fetch dynamic code lists.
- Configure functionality that is not yet supported through configuration alone, such as payment.
- Add concepts that are not supported out of the box in an Altinn app today.

## Local development with studioctl

{{% insert "content/altinn-studio/shared/studioctl/local-development-intro.en.md" %}}

{{% notice warning %}}
{{% insert "content/altinn-studio/shared/studioctl/preview-warning.en.md" %}}
{{% /notice %}}

{{% insert "content/altinn-studio/shared/studioctl/install-clone.en.md" %}}

When the app has been cloned, you can open the repository in your preferred development tool and change C# code, configuration, data models, layouts and other files.
Remember to synchronise changes with Git when you switch between Altinn Studio Designer and your local development environment.

## Run and test the app locally

Start the local test platform and run the app:

```bash
studioctl env up
studioctl run
```

When the app is running, you can test it at [http://local.altinn.cloud:8000](http://local.altinn.cloud:8000) with a [test user](/en/altinn-studio/v10/test-a-service/testing/local/testusers/).

Run `studioctl doctor` if something does not start as expected.
The command checks tools such as the .NET SDK, container runtime and local configuration.

Useful commands:

| Command | Description |
| ------- | ----------- |
| `studioctl env up --open` | Starts the local test platform and opens local.altinn.cloud on port `8000`. |
| `studioctl env status` | Shows local test platform status. |
| `studioctl env logs` | Shows logs from the LocalTest containers. |
| `studioctl run --detach` | Runs the app in the background. |
| `studioctl app logs` | Shows logs from an app running in the background. Use `--follow` for live logs. |
| `studioctl stop` | Stops apps started with `studioctl run --detach`. |
| `studioctl env down` | Stops the local test platform. |
| `studioctl doctor` | Diagnoses missing tools and local environment issues. |

If you change JSON files, reloading the page is usually enough.
If you change C# code, stop the app with `ctrl+C` and start it again with `studioctl run`.

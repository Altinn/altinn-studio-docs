---
headless: true
hidden: true
---

You can preview the changes you make when working locally.
`studioctl` starts the local test platform, runs the app and connects the app to local.altinn.cloud on port `8000`.
You need a container runtime, such as Docker, Podman or Colima, and the .NET SDK to run the app as a local process.
Run `studioctl doctor` to check that your machine has the required tools.

<div class="notices info"><strong>NOTE</strong>
To run the app in LocalTest, the application must have an associated <a href="{0}">data model</a>.</div>

<div class="notices warning"><strong>WARNING</strong>
If you have an existing <code>app-localtest</code> Docker Compose stack, stop and remove it completely before running <code>studioctl env up</code>. Go to the <code>app-localtest</code> folder and run <code>docker compose down</code>, or use the equivalent command for your container runtime.</div>

1. **Start the local test platform**: Go to the app repository in a terminal and run `studioctl env up`.
2. **Run your application within LocalTest**: Run `studioctl run` from the app repository. The command detects the app directory and starts the app with the correct local settings.
3. **Preview and test the application**: Go to [http://local.altinn.cloud:8000](http://local.altinn.cloud:8000) and log in with a [test user]({1}).

You can also open the browser when the test platform starts:

```bash
studioctl env up --open
studioctl run
```

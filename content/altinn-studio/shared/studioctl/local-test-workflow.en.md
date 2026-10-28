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
If you have an existing <code>app-localtest</code> stack, stop and remove it completely before running <code>studioctl env up</code>. Use the command that matches your container runtime, such as <code>docker compose down -v</code> or the Podman equivalent.</div>

1. **Start the local test platform**: Go to the app repository in a terminal and run `studioctl env up`.
    * If you encounter the error message `env up: start environment: resource exists but is not managed by this graph: container:localtest-<name>`, you have leftover containers from a previous setup that studioctl doesn't own. Remove the stale `localtest` containers and re-run `studioctl env up`.
    * If `env up` then fails on a `network:` resource, list it with `docker network ls --filter name=localtest` (or `podman network ls ...`) and remove it with `docker network rm <name>`.
2. **Run your application within LocalTest**: Run `studioctl run` from the app repository. The command detects the app directory and starts the app with the correct local settings.
3. **Preview and test the application**: Go to [http://local.altinn.cloud:8000](http://local.altinn.cloud:8000) and log in with a [test user]({1}).

You can also open the browser when the test platform starts:

```bash
studioctl env up --open
studioctl run
```

---
headless: true
hidden: true
---

### Supported platforms

`studioctl` can be used on Windows, Linux and macOS.
To run the local test platform, you need a container runtime.
Use Docker, Podman or Colima.

Install `studioctl`:

```bash
curl -sSL https://altinn.studio/designer/api/v1/studioctl/install.sh | sh
```

On Windows, install from PowerShell:

```powershell
iwr https://altinn.studio/designer/api/v1/studioctl/install.ps1 -useb | iex
```

Log in and clone the app:

```bash
studioctl auth login
studioctl app clone <org>/<app-name>
cd <app-name>
```

For automation and CI, pass an existing Studio/Designer API key through standard input from an environment variable:

```bash
printf '%s' "$STUDIO_DESIGNER_API_KEY" | studioctl auth login --with-token
```

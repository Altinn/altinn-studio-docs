---
headless: true
hidden: true
---

### Støttede plattformer

`studioctl` kan brukes på Windows, Linux og macOS.
For å kjøre lokal testplattform trenger du en container runtime.
Bruk Docker, Podman eller Colima.

Installer `studioctl`:

```bash
curl -sSL https://altinn.studio/designer/api/v1/studioctl/install.sh | sh
```

På Windows kan du installere fra PowerShell:

```powershell
iwr https://altinn.studio/designer/api/v1/studioctl/install.ps1 -useb | iex
```

Logg inn og klon appen:

```bash
studioctl auth login
studioctl app clone <org>/<app-name>
cd <app-name>
```

For automatisering og CI kan du sende inn en eksisterende Studio/Designer API-nøkkel via standard input fra en miljøvariabel:

```bash
printf '%s' "$STUDIO_DESIGNER_API_KEY" | studioctl auth login --with-token
```

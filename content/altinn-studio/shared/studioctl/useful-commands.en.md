---
headless: true
hidden: true
---

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

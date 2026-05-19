---
headless: true
hidden: true
---

Nyttige kommandoer:

| Kommando | Beskrivelse |
| -------- | ----------- |
| `studioctl env up --open` | Starter lokal testplattform og åpner local.altinn.cloud på port `8000`. |
| `studioctl env status` | Viser status for lokal testplattform. |
| `studioctl env logs` | Viser logger fra LocalTest-containerne. |
| `studioctl run --detach` | Kjører appen i bakgrunnen. |
| `studioctl app logs` | Viser logger fra en app som kjører i bakgrunnen. Bruk `--follow` for løpende logg. |
| `studioctl stop` | Stopper apper som er startet med `studioctl run --detach`. |
| `studioctl env down` | Stopper lokal testplattform. |
| `studioctl doctor` | Diagnostiserer manglende verktøy og lokale miljøproblemer. |

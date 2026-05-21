---
headless: true
hidden: true
---

Du kan forhåndsvise endringene du gjør når du jobber lokalt.
`studioctl` starter lokal testplattform, kjører appen og kobler appen til local.altinn.cloud på port `8000`.
Du trenger en container runtime, for eksempel Docker, Podman eller Colima, og .NET SDK for å kjøre appen som en lokal prosess.
Kjør `studioctl doctor` for å sjekke at maskinen din har verktøyene som trengs.

<div class="notices info"><strong>MERK</strong>
For å kunne kjøre appen i LocalTest må applikasjonen ha en tilknyttet <a href="{0}">datamodell</a>.</div>

<div class="notices warning"><strong>ADVARSEL</strong>
Hvis du har en eksisterende Docker Compose-stack fra <code>app-localtest</code>, må den stoppes og fjernes helt før du kjører <code>studioctl env up</code>. Gå til <code>app-localtest</code>-mappen og kjør <code>docker compose down</code>, eller bruk tilsvarende kommando for din container runtime.</div>

1. **Start lokal testplattform**: Gå til app-repoet i terminalen og kjør `studioctl env up`.
2. **Kjør applikasjonen i LocalTest**: Kjør `studioctl run` fra app-repoet. Kommandoen finner appmappen automatisk og starter appen med riktige lokale innstillinger.
3. **Forhåndsvis og test applikasjonen**: Gå til [http://local.altinn.cloud:8000](http://local.altinn.cloud:8000) og logg inn med en [testbruker]({1}).

Du kan også åpne nettleseren direkte når testplattformen starter:

```bash
studioctl env up --open
studioctl run
```

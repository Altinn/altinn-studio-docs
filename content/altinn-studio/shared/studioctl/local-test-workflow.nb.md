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
Hvis du har en eksisterende <code>app-localtest</code>-stack, må den stoppes og fjernes helt før du kjører <code>studioctl env up</code>. Bruk kommandoen som passer til din container runtime, for eksempel <code>docker compose down -v</code> eller tilsvarende for Podman.</div>

1. **Start lokal testplattform**: Gå til app-repoet i terminalen og kjør `studioctl env up`.
    * Hvis du får feilmeldingen `env up: start environment: resource exists but is not managed by this graph: container:localtest-<name>`, har du containere igjen fra et tidligere oppsett som studioctl ikke eier. Fjern de gamle `localtest`-containerne og kjør `studioctl env up` på nytt.
    * Hvis `env up` deretter feiler på en `network:`-ressurs, list den opp med `docker network ls --filter name=localtest` (eller `podman network ls ...`) og fjern den med `docker network rm <name>`.
2. **Kjør applikasjonen i LocalTest**: Kjør `studioctl run` fra app-repoet. Kommandoen finner appmappen automatisk og starter appen med riktige lokale innstillinger.
3. **Forhåndsvis og test applikasjonen**: Gå til [http://local.altinn.cloud:8000](http://local.altinn.cloud:8000) og logg inn med en [testbruker]({1}).

Du kan også åpne nettleseren direkte når testplattformen starter:

```bash
studioctl env up --open
studioctl run
```

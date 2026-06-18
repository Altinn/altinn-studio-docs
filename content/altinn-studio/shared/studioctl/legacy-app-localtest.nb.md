---
headless: true
hidden: true
---

Den gamle arbeidsflyten bruker `app-localtest`-repoet direkte.
Denne metoden kan fortsatt være nyttig ved feilsøking av et gammelt oppsett, men den anbefalte lokale arbeidsflyten er `studioctl`.

1. **Last ned og start LocalTest** ved å følge stegene [beskrevet på GitHub](https://github.com/Altinn/app-localtest/blob/master/README.md) (inkluderer start av appen, som også er forklart under).
2. **Kjør applikasjonen i LocalTest**: Åpne et nytt terminalvindu og gå til undermappen *App* i applikasjonen din (`<app-name>/App`). Start appen med kommandoen `dotnet run` og vent på bekreftelse i terminalen.
3. **Forhåndsvis og test applikasjonen**: Gå til [http://local.altinn.cloud:8000](http://local.altinn.cloud:8000) og logg inn med en [testbruker]({0}).

Stopp applikasjonen ved å trykke `ctrl+C` i terminalvinduet der du startet den.
Stopp LocalTest ved å gå til mappen `app-localtest` i terminalen og kjøre kommandoen `docker compose down`.

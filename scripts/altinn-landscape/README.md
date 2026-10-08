# Tegningene i Altinn-landskapet

`generate.js` lager arkitekturtegningene på siden [Altinn-landskapet](https://docs.altinn.studio/nb/technology/architecture/altinn-landscape/). Skriptet leser kildekoden i Altinn-repoene og skriver draw.io-SVG-er der hver boks lenker til filen eller mappen den beskriver på GitHub.

Tegningene havner i `content/technology/architecture/altinn-landscape/`:

| Fil | Innhold |
|---|---|
| `altinn_overview.drawio.svg` | Oversikten: én boks per applikasjon, gruppert per produkt |
| `altinn_authorization_detailed.drawio.svg` | Autorisasjon |
| `altinn_dialogporten_detailed.drawio.svg` | Dialogporten |
| `altinn_apps_detailed.drawio.svg` | Apps |
| `altinn_events_notifications_detailed.drawio.svg` | Events og Notifications |
| `altinn_correspondence_broker_detailed.drawio.svg` | Melding og formidling |
| `altinn_profile_detailed.drawio.svg` | Profile |
| `altinn_studio_detailed.drawio.svg` | Altinn Studio |
| `altinn_super_detailed.drawio.svg` | Alle produktene i én detaljert tegning (ligger i mappen, men vises ikke på siden) |

## Dette trenger du

- Node.js 18 eller nyere. Skriptet bruker bare innebygde moduler, så du trenger ikke `npm install`.
- Git.
- Disse repoene klonet ved siden av hverandre i samme mappe, for eksempel `C:\repos`:

```bash
for r in altinn-auth altinn-access-management-frontend altinn-authentication altinn-register altinn-storage altinn-studio app-frontend-react dialogporten dialogporten-frontend altinn-dialogporten-adapter altinn-events altinn-notifications altinn-correspondence altinn-broker altinn-profile; do git clone https://github.com/Altinn/$r.git; done
```

Skriptet leser filene fra `origin/main` med `git ls-tree`. Det bryr seg ikke om hvilken gren du står på lokalt, og det endrer ingenting i repoene.

## Lage tegningene på nytt

Kjør fra roten av dette repoet:

```bash
node scripts/altinn-landscape/generate.js --repos C:/repos --fetch
```

- `--repos` er mappen der repoene ligger. Du kan også sette miljøvariabelen `ALTINN_REPOS`. Uten noen av dem bruker skriptet mappen over dette repoet.
- `--fetch` henter siste `main` fra GitHub i hvert repo før skriptet leser dem. Uten `--fetch` bruker skriptet det som allerede er hentet.

Skriptet bruker noen sekunder. Etterpå ser du endringene i tegningene med `git diff --stat`.

## Når skriptet feiler på stier

Skriptet sjekker at hver lenke peker til en fil eller mappe som finnes på `main`. Hvis noe er flyttet, gitt nytt navn eller slettet, skriver skriptet tegningene likevel, men avslutter med feilkode 1 og en liste som dette:

```
Unresolved paths (not on main any more?):
  app backend: src/App/backend/src/Altinn.App.Core/Internal/InstanceLocking/InstanceLocker.cs
```

Da må du oppdatere boksen i `generate.js`. Finn ut hva som skjedde med filen, for eksempel med:

```bash
git -C C:/repos/altinn-studio log origin/main -1 --diff-filter=D -- src/App/backend/src/Altinn.App.Core/Internal/InstanceLocking/InstanceLocker.cs
```

Hvis koden er erstattet av noe annet, bytter du boksen til den nye klassen. Hvis funksjonen er fjernet, sletter du boksen.

## Slik er skriptet bygd opp

Skriptet tegner produktene ovenfra og ned i samme rekkefølge som i helhetstegningen. Hvert produkt har sin egen seksjon i `generate.js`, merket med en kommentar som `// ================= Product: Apps`.

Hver ramme er en liste med kolonner. Hver kolonne er en delmodul med bokser i lagene:

```js
{ name: 'Process engine', home: AC('Internal/Process'),
  api:  [['ProcessController', AA('ProcessController.cs')]],
  app:  [['ProcessEngine', AC('Internal/Process/ProcessEngine.cs')]],
  data: [['ProcessClient', SC('ProcessClient.cs')]] },
```

- `name` er kolonneoverskriften, og `home` er lenken på overskriften.
- `api`, `app` og `data` er lagene: API, tjenester og lagring. Hver boks er `[tekst, lenke]`.
- En boks med `null` som lenke blir en stiplet merknad uten lenke.
- Hjelpefunksjonene (`AC`, `AA`, `SC` og lignende) setter sammen stien i riktig repo.

Under kolonnene har hver ramme felt for integrasjonsklienter, bakgrunnsjobber, tverrgående funksjoner og datalagre. De ligger i listene som slutter på `_BARS`.

Skriptet lager oversiktstegningen til slutt. Den bruker kolonnenavnene fra de detaljerte rammene som punktliste i hver applikasjonsboks, så oversikten og detaljtegningene holder seg like.

## Endringer i draw.io

Du kan åpne og redigere tegningene i [draw.io](https://app.diagrams.net/). Neste gang noen kjører skriptet, skriver det filene på nytt, og endringer du har gjort for hånd forsvinner. Legg derfor varige endringer inn i `generate.js`.

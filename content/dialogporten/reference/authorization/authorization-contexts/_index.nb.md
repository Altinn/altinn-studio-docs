---
title: 'Autorisasjonskontekster'
description: 'Referanseinformasjon om autorisasjonskontekster'
weight: 15
toc: true
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

{{<notice warning>}}
Autorisasjonskontekster er en eksperimentell funksjon og kan endres eller fjernes uten en større versjonsoppdatering. Se [sak #3978](https://github.com/Altinn/dialogporten/issues/3978) for detaljer.
{{</notice>}}

## Introduksjon

Se [komme i gang med autorisasjonskontekster]({{< relref "/dialogporten/getting-started/authorization/authorization-contexts" >}}) for en funksjonell oversikt over autorisasjonskontekster og hva de kan brukes til. Denne siden dekker hele skrivekontrakten, valideringsreglene og den nøyaktige effekten på sluttbruker-API-et.

{{<notice info>}}
Autorisasjonskontekster vurderes bare i single dialog-endepunktene og i endepunktene for enkeltstående forsendelser, altså når du ber om en dialog eller en forsendelse direkte etter ID. For dialogsøk/lister blir ikke autorisasjonskontekstene vurdert.
{{</notice>}}

## Hvor autorisasjonskontekster kan settes

En `authorizationContext` kan oppgis på tjenesteeierens endepunkter for opprettelse og oppdatering, på disse feltene:

| Del | Felt |
|---|---|
| API-handlinger | `apiActions[].authorizationContext` |
| GUI-handlinger | `guiActions[].authorizationContext` |
| Forsendelser | `transmissions[].authorizationContext` |
| Vedlegg på dialogen | `attachments[].authorizationContext` |
| Vedlegg på forsendelser | `transmissions[].attachments[].authorizationContext` |
| Navigasjonshandlinger på forsendelser | `transmissions[].navigationalActions[].authorizationContext` |

Alle seks delene deler nøyaktig samme `authorizationContext`-form - et vedlegg eller en navigasjonshandling kan navngi en `action` på samme måte som en API- eller GUI-handling kan, selv om det i praksis nesten alltid vil stå usatt (se feltet `action` under).

Dette gjelder både endepunktene for opprettelse og oppdatering av dialoger, og de egne endepunktene for opprettelse og oppdatering av forsendelser.

**Selve konteksten kan bare leses tilbake av tjenesteeieren.** `authorizationContext` er med i tjenesteeierens lese-DTO-er (svaret fra dialog-GET-et og tjenesteeierens forsendelsesendepunkter), men finnes ikke på noen sluttbruker-DTO. Dette er en bevisst konfidensialitetsegenskap: en autorisasjonskontekst kan navngi bestemte parter, og å publisere den listen til en sluttbruker ville avslørt hvilke andre parter som kan ha tilgang til en gitt del av dialogen. Sluttbrukere ser bare *effekten* av en kontekst: `isAuthorized`, feltene som maskeres eller det at entiteten utelukkes (beskrevet nedenfor), og `contextToken`.

GraphQL følger samme mønster: det eksponerer `contextToken` og `excluded*`-listene på sluttbrukerentitetene, men ikke selve autorisasjonskonteksten.

## Felt

### `serviceResource`

Type `string`, valgfritt.

Overstyrer dialogens egen tjenesteressurs for denne ene sjekken, slik at evalueringen rettes mot en annen ressurs' policy. Når feltet settes, evalueres konteksten som en forespørsel mot bare den ressursen - dialogens egen instansreferanse følger ikke med, på samme måte som ressursoverstyringen i det gamle autorisasjonsattributtet.

Må starte med `urn:altinn:resource:` og ellers følge det vanlige formatet for Altinn-ressursidentifikatorer. Maks 255 tegn.

Den autentiserte tjenesteeieren må eie ressursen det refereres til. Å referere til en ressurs som den som kaller ikke eier, feiler hele opprettelsen eller oppdateringen med `403 Forbidden`.

### `additionalResourceAttribute`

Type `string`, valgfritt.

Et underressurs- eller oppgaveattributt som matches innenfor den *effektive* ressursens policy - for eksempel `urn:altinn:task:Task_1` eller `urn:altinn:subresource:mycustomresource`. I motsetning til et gammelt autorisasjonsattributt overstyrer dette aldri ressursen alene; det legges oppå den ressursen som gjelder (dialogens egen, eller den som er satt med `serviceResource`).

Et bart navn uten et gjenkjent navnerom-prefiks behandles som `urn:altinn:subresource:<navn>`.

Må ikke starte med `urn:altinn:resource:` - bruk `serviceResource` til det. Det kan heller ikke referere til en app (navnerommet `urn:altinn:app:`, eller en verdi som utvides til en `app_{org}_{appId}`-identifikator) eller til en organisasjon (`urn:altinn:org:`): appen bæres allerede av oppføringen i Ressursregisteret som `serviceResource` navngir, og organisasjonen som eier den effektive ressursen, utledes fra ressursen selv. Samme format- og lengderegler som `serviceResource`.

### `parties`

Type liste av `string`, valgfritt.

Partene sjekken evalueres på vegne av, i tillegg til (eller i stedet for) dialogens egen part - se `includeDialogParty` nedenfor. Tilgang gis hvis PDP-en tillater **minst én** av de oppgitte partene (ELLER-semantikk), ikke alle sammen.

- Maks 3 oppføringer. Med `includeDialogParty: true` er det effektive maksimale antallet parter som evalueres per entitet, 4.
- Oppføringene må være unike.
- Må inneholde minst én oppføring med mindre `includeDialogParty` er `true`.
- Hver oppføring må være en gyldig partsidentifikator: `urn:altinn:organization:identifier-no:{orgnr}`, `urn:altinn:person:identifier-no:{fnr/dnr}`, `urn:altinn:party-identifier:username:{username}`, eller en ID-porten-e-postidentifikator.

En autorisasjonssjekk uten parter å evaluere kan aldri bli autorisert - den feiler lukket i stedet for å gi tilgang implisitt.

### `includeDialogParty`

Type `boolean`, standardverdi `false`.

Når feltet er `true`, legges dialogens egen part til i settet med parter som evalueres, i tillegg til eventuelle parter i `parties`.

`includeDialogParty: true` kombinert med `additionalResourceAttribute` er den direkte erstatningen for et gammelt underressursattributt - samme part, avgrenset til en underressurs. `includeDialogParty: false` kombinert med en eksplisitt `parties`-liste er den nye muligheten: å gi tilgang til en del av dialogen for en annen part enn dialogens egen.

### `action`

Type `string`, valgfritt, på alle delene - det finnes ingen del der feltet er påkrevd eller utilgjengelig.

XACML-handlingen som skal evalueres. Hvis feltet utelates, brukes `read` som standard.

{{<notice warning>}}
Ingenting på API-nivå hindrer deg fra å la `action` stå usatt på en API- eller GUI-handling - den evalueres da bare som `read`. Siden disse to delene nesten alltid finnes for å beskytte noe annet enn en ren lesehandling (`write`, `sign` og liknende), er en usatt `action` her mer sannsynlig en feil enn et bevisst valg - dobbeltsjekk at feltet faktisk er satt når du gir en API- eller GUI-handling en kontekst.
{{</notice>}}

I motsetning til det gamle autorisasjonsattributtet utledes `action` aldri fra `serviceResource` eller `additionalResourceAttribute`. Å avgrense hvilken ressurs sjekken gjelder, avgrenser ikke hvilken handling den gjelder. En kontekst som setter `additionalResourceAttribute` og lar `action` stå usatt, evaluerer likevel et rent `read` på den avgrensede ressursen, og hvis det allerede finnes en bredere `read`-regel på hovedressursen, kan den fortsatt matche - XACML-målmatching kontrollerer bare at attributtene en regel krever er til stede, ikke at ingen andre attributter er det, så det ekstra ressursattributtet utelukker ikke i seg selv den bredere regelen. For å faktisk avgrense tilgangen, gi konteksten en egen `action` - for eksempel `elementread` - og skriv (eller gjenbruk) en policyregel som matcher på den handlingen sammen med den avgrensede ressursen.

Maks 255 tegn.

I sluttbruker-API-et rapporterer `action`-feltet på entiteten alltid handlingen som faktisk ble evaluert: kontekstens `action` når den navngir en, og `read` når den ikke gjør det. I tjenesteeier-API-et holdes de to fra hverandre - det gamle `action`-feltet på øverste nivå leses tilbake som en tom streng for en entitet som bruker en kontekst, og den evaluerte handlingen finner du i `authorizationContext.action`.

### `unauthorizedPresentation`

Type `string`-enum, verdiene `Disabled` eller `Excluded`. **Påkrevd.**

Selv om feltet ikke er markert som påkrevd i OpenAPI-schemaet, blir det avvist ved validering å utelate det - det finnes ingen standardverdi. Det må settes eksplisitt til en av de to verdiene under.

- **`Disabled`** (sperret) lar entiteten bli liggende i listen den hører til, men maskerer URL-ene og de innebygde innholdsreferansene. Dette tilsvarer måten det gamle autorisasjonsattributtet alltid har oppført seg på, og er den anbefalte verdien når du migrerer en eksisterende dialog uten å ønske å endre hva sluttbrukere ser.
- **`Excluded`** (utelukket) fjerner entiteten helt fra den listen, og lar bare `id` og `createdAt` stå igjen i en `excluded*`-liste ved siden av. Se de to neste avsnittene for den nøyaktige effekten.

## Hva en uautorisert sluttbruker ser

### `Disabled`: blir liggende, URL-ene maskeres

Entiteten blir liggende der den er i listen sin, `isAuthorized` er `false`, og `contextToken` er `null`. Alt entiteten forteller om seg selv, er fortsatt lesbart; bare det som ville latt sluttbrukeren handle på den, erstattes.

URL-er erstattes med én av to plassholderverdier: `urn:dialogporten:unauthorized` ved nektet tilgang, og `urn:dialogporten:expired` for en utløpt URL på et vedlegg eller en navigasjonshandling - men plassholderen for utløpt brukes bare når den som spør er autorisert; en URL som både er uautorisert og utløpt, viser plassholderen for uautorisert.

| Del | Effekt |
|---|---|
| GUI-handling | `url` erstattes med plassholderen. `title`, `prompt`, `priority`, `httpMethod`, `isDeleteDialogAction`, `action` og `id` beholdes alle. |
| API-handling | Hver endepunkt-`url` erstattes med plassholderen; de andre endepunktfeltene (`version`, `httpMethod`, `documentationUrl`, `requestSchema`, `responseSchema`, `deprecated`, `sunsetAt`) beholdes, det samme gjør `name` og `id`. |
| Forsendelse | Innholdsreferansen (brukt til [front channel embed]({{< relref "/dialogporten/reference/front-end/front-channel-embeds" >}})) erstattes med plassholderen. `content.title` og `content.summary` forblir lesbare. `sender`, `type`, `extendedType`, `externalReference`, `relatedTransmissionId`, `attachments` og `navigationalActions` består alle, og hver underliggende del vurderes på egne premisser, slik radene under viser. |
| Vedlegg på dialogen | Hver URL erstattes med plassholderen. `displayName`, `name` og `expiresAt` beholdes. |
| Vedlegg på forsendelse | Hver URL erstattes med plassholderen. `displayName`, `name` og `expiresAt` beholdes. |
| Navigasjonshandling på forsendelse | `url` erstattes med plassholderen. `title` og `expiresAt` beholdes. |

### `Excluded`: fjernet fra listen sin

Entiteten er ikke med i svaret i det hele tatt. Det finnes ingen oppføring med `isAuthorized: false` å finne, og ikke noe `contextToken`. Det eneste som står igjen, er en stubb i en liste ved siden av, med to felt og ikke noe mer:

```json
{
  "id": "0194a1b2-3c4d-7e5f-8a9b-0c1d2e3f4a5b",
  "createdAt": "2026-01-15T09:12:44.512Z"
}
```

`createdAt` er det som lar et sluttbrukersystem plassere hullet: systemet kan vise at noe det ikke får se, ligger mellom to forsendelser det får se, i stedet for å vise en liste som stille er blitt kortere.

Hver liste som kan ha en autorisasjonskontekst, har sin egen skyggeliste, oppkalt etter den og plassert rett ved siden av:

| Liste | Skyggeliste |
|---|---|
| `apiActions` | `excludedApiActions` |
| `guiActions` | `excludedGuiActions` |
| `attachments` | `excludedAttachments` |
| `transmissions` | `excludedTransmissions` |
| `transmissions[].attachments` | `transmissions[].excludedAttachments` |
| `transmissions[].navigationalActions` | `transmissions[].excludedNavigationalActions` |

Alle seks kan være `null` og utelates helt fra JSON-en når ingenting er utelukket, noe som er det normale - behandle en liste som mangler, på nøyaktig samme måte som en tom liste. GraphQL eksponerer de samme seks feltene, med typen `[ExcludedElement!]`.

```jsonc
{
  "transmissions": [
    {
      "id": "...",
      "attachments": [ /* ... */ ],
      "navigationalActions": [ /* ... */ ],
      "excludedAttachments": [ { "id": "...", "createdAt": "..." } ],
      "excludedNavigationalActions": [ { "id": "...", "createdAt": "..." } ]
    }
  ],
  "guiActions": [ /* ... */ ],
  "apiActions": [ /* ... */ ],
  "attachments": [ /* ... */ ],
  "excludedTransmissions": [ { "id": "...", "createdAt": "..." } ],
  "excludedGuiActions": [ /* ... */ ],
  "excludedApiActions": [ /* ... */ ],
  "excludedAttachments": [ /* ... */ ]
}
```

{{<notice warning>}}
Det finnes seks skyggelister, og ingen av dem samler alt som holdes tilbake fra en dialog. En klient som skal svare på «hva har endret seg som jeg ikke får se?», må hente alle seks og slå dem sammen på `createdAt` - leser den bare én av dem, rapporterer den for lite, stille og uten noen feil å fange opp.
{{</notice>}}

Fire ting som er verdt å ha i bakhodet:

1. **`isAuthorized: false` betyr nøyaktig én ting.** Det markerer en entitet som finnes, er beskrevet og ikke kan brukes - aldri en entitet som holdes tilbake. En utelukket entitet er rett og slett borte.
2. **En utelukket forsendelse tar med seg de underliggende delene sine.** Bare forsendelsens egen stubb dukker opp; vedleggene og navigasjonshandlingene rapporteres ikke separat, verken i skyggelistene til den forsendelsen eller andre steder. Et vedlegg eller en navigasjonshandling med sin egen `Excluded`-kontekst inni en forsendelse som bare er `Disabled` (og nektet), utelukkes derimot individuelt, til skyggelisten på den forsendelsen.
3. **En utelukket navigasjonshandling avslører en `id` den ellers ikke har.** Navigasjonshandlinger har ingen `id` i sluttbruker-API-et, men stubbene deres har det. Det er en identifikator og ikke noe mer - den avslører ingenting om selve handlingen.
4. Innhold på dialognivå (`content.mainContentReference`) styres **ikke** av noen autorisasjonskontekst i det hele tatt - dialoginnhold har ingen egen kontekst. Synligheten avhenger utelukkende av om den som spør har lesetilgang til dialogens hovedressurs.

## Slik oppfører endepunktene seg for utelukkede forsendelser

| Endepunkt | Oppførsel |
|---|---|
| `GET /dialogs/{id}` | Utelukkede forsendelser forsvinner ut av `transmissions` og dukker opp som stubber i `excludedTransmissions`. |
| `GET /dialogs/{id}/transmissions/{transmissionId}` | `403 Forbidden` for en utelukket forsendelse - ikke `404`. Dialogsvaret publiserer allerede at forsendelsen finnes, så det ville motsagt dialogsvaret å nekte for at den finnes her. Sjekken på dialognivå foran denne svarer derimot `404` for en dialog den som spør ikke får se; der er det dialogens eksistens som holdes tilbake. |
| `GET /dialogs/{id}/transmissions` | Utelukkede forsendelser utelates fra listen, uten noen stubb. Svaret er en ren JSON-liste uten noe sted å henge en `excludedTransmissions` på øverste nivå, så bruk dialogendepunktet når du trenger å vite at noe er holdt tilbake. Utelukkelser *inni* en forsendelse som returneres, rapporteres som vanlig, på selve forsendelsen. |

## Foreldre-først-avgrensing

En underordnet autorisasjonskontekst kan bare avgrense tilgang, aldri utvide den. Tilgang til forelderen er alltid en forutsetning:

- For en forsendelses vedlegg og navigasjonshandlinger er forsendelsens egen autorisasjon forutsetningen - en tillatende underordnet kontekst inni en nektet forsendelse gir ingenting, og `contextToken` er `null` uansett hva den underordnede konteksten alene ellers ville tillatt.
- For vedlegg på dialogen er forutsetningen lesetilgang til dialogens hovedressurs. Et vedlegg på dialogen uten egen kontekst begrenses aldri individuelt - det arver dialogens egen tilgang.

Hvis den som spør ikke kan lese dialogens hovedressurs i det hele tatt, feiler `GET /dialogs/{id}` med `403 Forbidden` før noen vurdering per entitet kjøres, med mindre listeautorisasjon gir en snevrere form for tilgang - i så fall returneres dialogen med handlingene sine markert som uautoriserte i stedet for at forespørselen avvises helt. De frittstående forsendelsesendepunktene har ingen slik reserveløsning: uten tilgang til hovedressursen svarer de `404 Not Found`, som om dialogen ikke fantes.

## Evaluering med flere parter

- Tilgang til en sjekk gis hvis **minst én** av de tillatte partene er gitt tilgang - ELLER-semantikk på tvers av parter, samme som innad i `parties`.
- Hver sjekk evalueres én gang per part den er knyttet til. Like kombinasjoner av ressurs og handling på tvers av parter slås sammen til én evaluering, men partsgrensen (3, eller 4 med `includeDialogParty`) er likevel en reell kostnadskontroll: hver distinkte kombinasjon av ressurs, handling og part er én evaluering mot Altinn Authorization, og en dialog med mange autorisasjonskontekster øker dette raskt.
- Hvis samsvaret mellom forespurte sjekker og returnerte beslutninger av en eller annen grunn ikke stemmer, nektes alle sjekker for den berørte forespørselen - systemet feiler lukket i stedet for å gjette.
- En systembrukers *egen* part evalueres med systembrukerens egen identitet; parter som er navngitt direkte i en konteksts `parties`-liste evalueres som seg selv og vil rett og slett bli nektet hvis PDP-en ikke anerkjenner dem som delegerbare til den som kaller - en systembruker kan ikke representere en vilkårlig part ved å navngi den i en kontekst.

## Gjensidig utelukkelse med `authorizationAttribute`

En entitet kan ikke kombinere `authorizationContext` med det gamle feltet `authorizationAttribute`:

- På API-handlinger og GUI-handlinger må `authorizationAttribute` være fraværende når `authorizationContext` er satt, og det øverste `action`-feltet må også være fraværende eller tomt - bruk `authorizationContext.action` i stedet. Motsatt er `action` påkrevd når det ikke finnes noen kontekst. I tjenesteeier-API-et leses en slik entitet tilbake med `action` som en tom streng, slik at et `GET`-svar kan sendes rett tilbake til `PUT` uendret.
- På forsendelser må `authorizationAttribute` være fraværende når `authorizationContext` er satt. Det finnes ikke noe øverste `action`-felt på forsendelser.
- Vedlegg og navigasjonshandlinger på forsendelser har aldri hatt `authorizationAttribute` - bare `authorizationContext`.

De samme reglene gjelder på oppdateringsendepunktene og på de egne endepunktene for opprettelse og oppdatering av forsendelser.

## Migrere fra `authorizationAttribute`

| Gammelt `authorizationAttribute` | Gammel utledet handling | Tilsvarende `authorizationContext` |
|---|---|---|
| `urn:altinn:subresource:foo` (forsendelse) | `read` | `{ "action": "elementread", "additionalResourceAttribute": "urn:altinn:subresource:foo", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` |
| `urn:altinn:task:Task_1` (forsendelse) | `read` | `{ "action": "elementread", "additionalResourceAttribute": "urn:altinn:task:Task_1", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` |
| `urn:altinn:resource:other` (forsendelse) | `read` | `{ "serviceResource": "urn:altinn:resource:other", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` |
| `foo` (bart, forsendelse) | `read` | `{ "action": "elementread", "additionalResourceAttribute": "urn:altinn:subresource:foo", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` |
| Handling `sign` + attributt `urn:altinn:task:Task_1` (GUI-/API-handling) | `sign` på det attributtet | `{ "action": "sign", "additionalResourceAttribute": "urn:altinn:task:Task_1", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` - fjern det øverste `action`-feltet |
| Handling `write`, uten attributt (GUI-/API-handling) | `write` på hovedressursen | `{ "action": "write", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` |

`action: "elementread"` på rad én, to og fire er et eksempel på et selvvalgt navn, ikke et fast navn - se neste punkt.

Fem ting du bør være klar over ved migrering:

1. **Gamle autorisasjonsattributter utleder ikke lenger en egen handling for avgrensing til underressurs eller oppgave.** De utledet tidligere `transmissionread` i det tilfellet, nettopp for at forespørselen ikke skulle treffe en bredere `read`-regel på hovedressursen ved et uhell; den utledningen er borte, og hvert gammelt attributt utleder nå et rent `read`, uansett hva det refererer til. En underressurs eller oppgave navngitt i et gammelt attributt kan derfor bare utvide tilgang gjennom en egen policyregel, aldri avgrense den - se [bruke autorisasjonsattributter på forsendelser]({{< relref "/dialogporten/reference/authorization/attributes" >}}#bruke-autorisasjonsattributter-på-forsendelser). Hvis du var avhengig av `transmissionread` for å avgrense en forsendelses synlighet, og vil fortsette med det etter migrering, gi autorisasjonskonteksten en egen, distinkt `action` (`elementread` i tabellen ovenfor er bare et eksempelnavn) og oppdater policyen din til å matche på den handlingen i stedet for `transmissionread` - `authorizationContext.action` er det eneste stedet en avgrensende handling fortsatt kan navngis.
2. **En relatert oppførselsendring gjelder gamle entiteter uansett om du migrerer dem eller ikke.** Autorisasjon for en gammel handling uten `authorizationAttribute` krever nå at handlingen er tillatt på nøyaktig den ressursen entiteten refererer til. Tidligere kunne dette også oppfylles av at *en annen entitet i samme dialog* hadde den handlingen tillatt på en eller annen ressurs, inkludert dialogens hovedressurs - noe som blant annet betydde at en `write`-GUI-handling uten autorisasjonsattributt kunne bli tillatt bare fordi en urelatert entitet i dialogen også hadde et tillatt `write`. Den trenger nå `write` spesifikt på hovedressursen. Dette er en feilretting snarere enn en levende migreringsrisiko i dag, men en fremtidig policy utformet på den gamle måten ville blitt påvirket - hvis tjenesten din bruker flere ulike handlinger på tvers av entiteter i samme dialog, kan det være verdt å dobbeltsjekke policyene dine.
3. **`unauthorizedPresentation` har ingen tilsvarende gammel verdi og må velges eksplisitt.** Den gamle oppførselen (maskere URL-er, beholde innhold) tilsvarer `Disabled`. Å migrere med `Excluded` i stedet er en synlig endring for sluttbrukere, og en systemene deres må være forberedt på: entiteten forsvinner ut av listen den lå i.
4. **`contextToken` erstatter dialogtokenet for migrerte entiteter.** Så snart en entitet får en autorisasjonskontekst, forsvinner rettigheten fra listen over autoriserte handlinger i dialogtokenet - en mottakende tjeneste som autoriserer utelukkende ut fra dialogtokenet, vil begynne å nekte forespørsler for den entiteten. Sørg for at mottakersiden bruker entitetens [konteksttoken]({{< relref "/dialogporten/reference/authorization/context-tokens" >}}) før du migrerer.
5. **En forskjell på trådnivå i ressursattributtet er lett å overse.** For `authorizationAttribute` har Dialogporten alltid sendt et underressursattributt i den underliggende autorisasjonsforespørselen - en sentinelverdi, `main`, når det ikke ble oppgitt noe attributt i det hele tatt. En autorisasjonskontekst som verken setter `serviceResource` eller `additionalResourceAttribute` (ren avgrensing til part), sender ikke noe underressursattributt i det hele tatt. En policyregel som matcher spesifikt på at underressursattributtet er `main`, vil slutte å matche etter at du migrerer til en ren partsavgrenset kontekst. Policyer som ikke refererer til attributtet, påvirkes ikke.

## Valideringsfeil

| Problem med forespørselen | Melding |
|---|---|
| Mer enn 3 oppføringer i `parties` | `'Parties' cannot contain more than 3 parties.` |
| Samme part oppført to ganger i `parties` | `Can not contain duplicate items: [...].` |
| `parties: []` med `includeDialogParty: false` | `'Parties' must contain at least one party when 'IncludeDialogParty' is false.` |
| `additionalResourceAttribute` som starter med `urn:altinn:resource:` | `'AdditionalResourceAttribute' cannot contain a service resource reference ('urn:altinn:resource:...'); use 'ServiceResource' instead.` |
| `additionalResourceAttribute` som refererer til en app | `'AdditionalResourceAttribute' cannot reference an app (the 'urn:altinn:app:' namespace, or a value expanding into an 'app_{org}_{appId}' identifier); 'ServiceResource' already carries the resource-registry entry for an app, and there is no equivalent per-app override for this field.` |
| `additionalResourceAttribute` som refererer til en organisasjon | `'AdditionalResourceAttribute' cannot reference an organization (the 'urn:altinn:org:' namespace); the organization owning the effective resource is derived from the resource itself.` |
| `serviceResource` som ikke starter med `urn:altinn:resource:` | `'ServiceResource' must start with 'urn:altinn:resource:'.` |
| `unauthorizedPresentation` utelatt | `'UnauthorizedPresentation' is required and must be either 'Disabled' or 'Excluded'.` |
| Øverste `action`-felt kombinert med `authorizationContext` på en GUI- eller API-handling | `'Action' cannot be combined with 'AuthorizationContext'; use 'AuthorizationContext.Action' instead.` |
| Øverste `action`-felt utelatt på en GUI- eller API-handling uten `authorizationContext` | `'Action' must not be empty when 'AuthorizationContext' is not supplied.` |
| `authorizationAttribute` kombinert med `authorizationContext` | `'AuthorizationAttribute' cannot be combined with 'AuthorizationContext'.` |
| `serviceResource` som refererer til en ressurs den som kaller ikke eier | `403 Forbidden`, `Not allowed to reference the following unowned resources: [...]` |
| `additionalResourceAttribute` som refererer til en app den som kaller ikke eier | `403 Forbidden`, `Not allowed to reference the following unowned apps: [...]` |

## Kontraktreferanse

{{<swaggerdisplayentity "V1CommonAuthorizationContexts_AuthorizationContext">}}

Stubben som brukes i de seks `excluded*`-listene i sluttbruker-API-et:

{{<swaggerdisplayentity "V1EndUserCommon_ExcludedElement">}}

**Les mer**

- {{<link "../../../getting-started/authorization/authorization-contexts">}}
- {{<link "../context-tokens">}}
- {{<link "../attributes">}}

{{<children />}}

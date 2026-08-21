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

**Selve konteksten kan bare leses tilbake av tjenesteeieren.** `authorizationContext` er med i tjenesteeierens lese-DTO-er (svaret fra dialog-GET-et og tjenesteeierens forsendelsesendepunkter), men finnes ikke på noen sluttbruker-DTO. Dette er en bevisst konfidensialitetsegenskap: en autorisasjonskontekst kan navngi bestemte parter, og å publisere den listen til en sluttbruker ville avslørt hvilke andre parter som kan ha tilgang til en gitt del av dialogen. Sluttbrukere ser bare *effekten* av en kontekst: `isAuthorized`, feltene som maskeres eller fjernes (beskrevet nedenfor), og `contextToken`.

GraphQL følger samme mønster: det eksponerer `contextToken` på sluttbrukerentitetene, men ikke selve autorisasjonskonteksten.

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

Må ikke starte med `urn:altinn:resource:` - bruk `serviceResource` til det. Samme format- og lengderegler som `serviceResource`.

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

### `unauthorizedPresentation`

Type `string`-enum, verdiene `Disabled` eller `Redacted`. **Påkrevd.**

Selv om feltet ikke er markert som påkrevd i OpenAPI-schemaet, blir det avvist ved validering å utelate det - det finnes ingen standardverdi. Det må settes eksplisitt til en av de to verdiene under.

- **`Disabled`** maskerer URL-ene på entiteten, men beholder resten av innholdet synlig. Dette tilsvarer måten det gamle autorisasjonsattributtet alltid oppførte seg på, og er den anbefalte verdien når du migrerer en eksisterende dialog uten å ønske å endre hva sluttbrukere ser.
- **`Redacted`** fjerner i tillegg innholdet på entiteten, og etterlater en «gravstein»: entiteten er fortsatt til stede i sin posisjon med et minimum av felt, uten at noe om det faktiske innholdet avsløres. Se neste avsnitt for den nøyaktige effekten per del.

## Hva en uautorisert sluttbruker ser

Felles for begge visningsvalgene, på alle deler: `isAuthorized` er `false`, `contextToken` er `null`, og entiteten **forblir til stede** i listen sin - autorisasjonskontekster fører aldri til at Dialogporten fjerner en entitet fra et svar.

Begge visningsvalgene erstatter URL-er med én av to plassholderverdier: `urn:dialogporten:unauthorized` ved nektet tilgang, og `urn:dialogporten:expired` for et utløpt vedlegg-URL - men bare når brukeren er autorisert; et vedlegg som er både uautorisert *og* utløpt, viser plassholderen for uautorisert, ikke den for utløpt.

| Del | `Disabled` | `Redacted` (i tillegg) |
|---|---|---|
| GUI-handling | `url` erstattes med plassholderen. `title`, `prompt`, `priority`, `httpMethod`, `isDeleteDialogAction` og `action` beholdes alle. | `title` tømmes og `prompt` fjernes. `url` forblir plassholderen; `id`, `action`, `priority`, `httpMethod` og `isDeleteDialogAction` består. |
| API-handling | Hver endepunkt-`url` erstattes med plassholderen; andre endepunktfelt (`version`, `httpMethod`, `documentationUrl`, `requestSchema`, `responseSchema`, `deprecated`, `sunsetAt`) beholdes. `name` beholdes. | `name` fjernes og `endpoints` tømmes helt - ingen endepunktmetadata i det hele tatt. `id` og `action` består. |
| Forsendelse | Innholdsreferansen (brukt til [front channel embed]({{< relref "/dialogporten/reference/front-end/front-channel-embeds" >}})) erstattes med plassholderen. `content.title` og `content.summary` forblir lesbare. `sender`, `type`, `extendedType`, `externalReference`, `relatedTransmissionId`, `attachments` og `navigationalActions` består alle, med underliggende deler maskert individuelt - se under. | `sender`, `content`, `extendedType`, `externalReference`, `authorizationAttribute` og `relatedTransmissionId` fjernes, og `attachments` og `navigationalActions` tømmes. Består: `id`, `createdAt`, `type`, `isOpened`, `isAuthorized`. |
| Vedlegg på dialogen | Hver URL erstattes med plassholderen. `displayName`, `name` og `expiresAt` beholdes. | `displayName` tømmes, `name` fjernes, og `urls` tømmes. Består: `id`, `expiresAt`. |
| Vedlegg på forsendelse | Hver URL erstattes med plassholderen. | `displayName` tømmes, `name` fjernes, og `urls` tømmes. Består: `id`, `expiresAt`. |
| Navigasjonshandling på forsendelse | `url` erstattes med plassholderen. `title` og `expiresAt` beholdes. | `title` tømmes og `url` forblir plassholderen. Består: `expiresAt`. Denne entiteten har ingen `id` i det hele tatt, uansett visningsvalg. |

Tre ting som er verdt å ha i bakhodet:

1. **`Redacted` er en gravstein, ikke en fjerning.** Entiteten beholder posisjonen sin og, unntatt for navigasjonshandlinger, `id`-en og tidsstemplene sine, slik at et sluttbrukersystem kan vise «det finnes noe her du ikke har tilgang til» i stedet for ingenting.
2. **Barna til en `Redacted`-forsendelse behandles ikke individuelt - de forsvinner sammen med den.** Hvis selve forsendelsen er «redacted», tømmes vedleggene og navigasjonshandlingene dens fullstendig i stedet for at hver av dem vurderes og eventuelt maskeres på egne premisser. Et barn med sin egen `Redacted`-kontekst inni en forsendelse som bare er `Disabled` (og nektet), blir derimot maskert individuelt ut fra sin egen kontekst.
3. Innhold på dialognivå (`content.mainContentReference`) styres **ikke** av noen autorisasjonskontekst i det hele tatt - dialoginnhold har ingen egen kontekst. Synligheten avhenger utelukkende av om den som spør har lesetilgang til dialogens hovedressurs.

## Foreldre-først-avgrensing

En underordnet autorisasjonskontekst kan bare avgrense tilgang, aldri utvide den. Tilgang til forelderen er alltid en forutsetning:

- For en forsendelses vedlegg og navigasjonshandlinger er forsendelsens egen autorisasjon forutsetningen - en tillatende underordnet kontekst inni en nektet forsendelse gir ingenting, og `contextToken` er `null` uansett hva den underordnede konteksten alene ellers ville tillatt.
- For vedlegg på dialogen er forutsetningen lesetilgang til dialogens hovedressurs. Et vedlegg på dialogen uten egen kontekst begrenses aldri individuelt - det arver dialogens egen tilgang.

Hvis den som spør ikke kan lese dialogens hovedressurs i det hele tatt, feiler forespørselen med `403 Forbidden` før noen vurdering per entitet kjøres, med mindre listeautorisasjon gir en snevrere form for tilgang - i så fall returneres dialogen med handlingene sine markert som uautoriserte i stedet for at forespørselen avvises helt.

## Evaluering med flere parter

- Tilgang til en sjekk gis hvis **minst én** av de tillatte partene er gitt tilgang - ELLER-semantikk på tvers av parter, samme som innad i `parties`.
- Hver sjekk evalueres én gang per part den er knyttet til. Like kombinasjoner av ressurs og handling på tvers av parter slås sammen til én evaluering, men partsgrensen (3, eller 4 med `includeDialogParty`) er likevel en reell kostnadskontroll: hver distinkte kombinasjon av ressurs, handling og part er én evaluering mot Altinn Authorization, og en dialog med mange autorisasjonskontekster øker dette raskt.
- Hvis samsvaret mellom forespurte sjekker og returnerte beslutninger av en eller annen grunn ikke stemmer, nektes alle sjekker for den berørte forespørselen - systemet feiler lukket i stedet for å gjette.
- En systembrukers *egen* part evalueres med systembrukerens egen identitet; parter som er navngitt direkte i en konteksts `parties`-liste evalueres som seg selv og vil rett og slett bli nektet hvis PDP-en ikke anerkjenner dem som delegerbare til den som kaller - en systembruker kan ikke representere en vilkårlig part ved å navngi den i en kontekst.

## Gjensidig utelukkelse med `authorizationAttribute`

En entitet kan ikke kombinere `authorizationContext` med det gamle feltet `authorizationAttribute`:

- På API-handlinger og GUI-handlinger må `authorizationAttribute` være fraværende når `authorizationContext` er satt, og det øverste `action`-feltet må også være fraværende - bruk `authorizationContext.action` i stedet. Motsatt er `action` påkrevd når det ikke finnes noen kontekst.
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
3. **`unauthorizedPresentation` har ingen tilsvarende gammel verdi og må velges eksplisitt.** Den gamle oppførselen (maskere URL-er, beholde innhold) tilsvarer `Disabled`. Å migrere med `Redacted` i stedet er en synlig endring for sluttbrukere.
4. **`contextToken` erstatter dialogtokenet for migrerte entiteter.** Så snart en entitet får en autorisasjonskontekst, forsvinner rettigheten fra listen over autoriserte handlinger i dialogtokenet - en mottakende tjeneste som autoriserer utelukkende ut fra dialogtokenet, vil begynne å nekte forespørsler for den entiteten. Sørg for at mottakersiden bruker entitetens [konteksttoken]({{< relref "/dialogporten/reference/authorization/context-tokens" >}}) før du migrerer.
5. **En forskjell på trådnivå i ressursattributtet er lett å overse.** For `authorizationAttribute` har Dialogporten alltid sendt et underressursattributt i den underliggende autorisasjonsforespørselen - en sentinelverdi, `main`, når det ikke ble oppgitt noe attributt i det hele tatt. En autorisasjonskontekst som verken setter `serviceResource` eller `additionalResourceAttribute` (ren avgrensing til part), sender ikke noe underressursattributt i det hele tatt. En policyregel som matcher spesifikt på at underressursattributtet er `main`, vil slutte å matche etter at du migrerer til en ren partsavgrenset kontekst. Policyer som ikke refererer til attributtet, påvirkes ikke.

## Valideringsfeil

| Problem med forespørselen | Melding |
|---|---|
| Mer enn 3 oppføringer i `parties` | `'Parties' cannot contain more than 3 parties.` |
| `parties: []` med `includeDialogParty: false` | `'Parties' must contain at least one party when 'IncludeDialogParty' is false.` |
| `additionalResourceAttribute` som starter med `urn:altinn:resource:` | `'AdditionalResourceAttribute' cannot contain a service resource reference ('urn:altinn:resource:...'); use 'ServiceResource' instead.` |
| `serviceResource` som ikke starter med `urn:altinn:resource:` | `'ServiceResource' must start with 'urn:altinn:resource:'.` |
| `unauthorizedPresentation` utelatt | `'UnauthorizedPresentation' is required and must be either 'Disabled' or 'Redacted'.` |
| Øverste `action`-felt kombinert med `authorizationContext` på en GUI- eller API-handling | `'Action' cannot be combined with 'AuthorizationContext'; use 'AuthorizationContext.Action' instead.` |
| `authorizationAttribute` kombinert med `authorizationContext` | `'AuthorizationAttribute' cannot be combined with 'AuthorizationContext'.` |
| `serviceResource` som refererer til en ressurs den som kaller ikke eier | `403 Forbidden`, `Not allowed to reference the following unowned resources: [...]` |

## Kontraktreferanse

{{<swaggerdisplayentity "V1CommonAuthorizationContexts_AuthorizationContext">}}

**Les mer**

- {{<link "../../../getting-started/authorization/authorization-contexts">}}
- {{<link "../context-tokens">}}
- {{<link "../attributes">}}

{{<children />}}

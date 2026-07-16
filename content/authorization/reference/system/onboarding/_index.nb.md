---
title: Ny utvikler i Altinn Autorisasjon
linktitle: Ny i teamet
description: Slik blir du kjent med systemet, kodebasene og utviklingsarbeidet den første uken.
weight: 1
toc: true
---

Målet med denne veiledningen er at du skal forstå ansvarsgrensene, kunne bygge relevant kode og følge en autorisasjonsbeslutning gjennom systemet. Be fadderen din bekrefte hvilke miljøer og komponenter du skal arbeide med.

## Når du er ferdig

Du skal kunne

- forklare identitet, part, representasjon, ressurs, rettighet, PDP og PEP
- finne komponenten og repoet som eier en endring
- bygge og teste minst ett relevant repo
- følge en `Permit` og en forventet `Deny`
- finne logger, spor og riktig eier

## Første dag

Avklar tilgang til GitHub-repoene, teamets arbeidsflater, relevant Azure-konto og testmiljø, observabilitetsverktøy og godkjent hemmelighetshåndtering. Du trenger ikke produksjonstilgang for å begynne.

Les i denne rekkefølgen:

1. [Systemarkitekturen](../architecture/).
2. [Informasjonsmodellen](../information-model/).
3. [Komponentoversikten](../components/).
4. [Den kjørbare autorisasjonsflyten](../flows/authorization-decision/).
5. [Sikkerhet og tillit](../security/).

Bruk kontrollspørsmålene: Hvem handler, hvilken part representeres, hvilken ressurs og handling gjelder det, hvor kommer rettigheten fra, hvem håndhever beslutningen, og hvor kan hendelsen spores?

## Finn riktig repo

| Område | Repo |
|---|---|
| Innlogging, sesjon og token | `altinn-authentication` |
| Part og representasjon | `altinn-register` |
| Ressursmetadata og policy | `altinn-resource-registry` |
| Tilgang, delegering og PDP | `altinn-authorization-tmp` |
| Brukerflate og BFF | `altinn-access-management-frontend` |
| Audit-hendelser | `altinn-auth-audit-log` |

Resource Registry skal flyttes til monorepoet. Bekreft alltid hvilken kopi som er autoritativ.

## Bygg før du endrer

Repoets README er fasiten. For monorepoet er en kort grunnkontroll:

```powershell
dotnet build Altinn.Authorization.sln
dotnet test -- --filter-trait "Category=Unit"
```

Integrasjonstester krever en containermotor. Et grønt enhetstestsett dekker ikke hele integrasjonen.

## Første hovedøvelse

Følg [én autorisasjonsbeslutning ende til ende](../flows/authorization-decision/). Gjør øvelsen sammen med en fadder første gang dersom du trenger testmiljø, abonnementnøkkel eller testdata.

Ikke kopier tokens, nøkler eller personopplysninger til dokumentasjon, terminalhistorikk, skjermbilder eller pull requester.

## Første kodeendring

Velg en liten endring innenfor én komponentgrense med en tydelig test og trygg tilbakerulling. Før pull requesten skal du kjøre relevante tester, beskrive endret oppførsel, oppgi eventuell leveranserekkefølge og kontrollere at artefaktene ikke inneholder hemmeligheter.

## Første uke

- følg en `Permit` og en `Deny`
- se hvordan en ressurs og policy registreres
- finn en delegering i Access Management-modellen
- følg en hendelse til Audit Log
- finn komponentens dashbord og viktigste signaler
- les komponentens mønstre og persistensmodell
- delta i en reell kodegjennomgang

## Forslag til femdagers onboardingløp

Planen er et utgangspunkt. Bytt rekkefølge dersom den første arbeidsoppgaven din krever en annen komponent.

### Dag én: Systemet og språket

**Mål:** Forklar hva Altinn Autorisasjon gjør uten å begynne med repo- eller klassenavn.

1. Les systemarkitekturen, informasjonsmodellen og komponentoversikten.
2. Tegn tillitskjeden med egne ord: identitet, representasjon, ressurs, rettighet, beslutning og sporbarhet.
3. Velg én brukerhistorie, for eksempel at en systembruker leser en ressurs på vegne av en virksomhet.
4. Plasser PDP, PEP og de autoritative datakildene i historien.
5. Gå gjennom modellen med fadderen.

**Leveranse:** En kort muntlig forklaring og en liste over begreper du fortsatt er usikker på.

**Kontrollpunkt:** Du skiller identiteten som handler fra parten den handler på vegne av, og du vet at PDP beslutter mens PEP håndhever.

### Dag to: Repoet og utviklingsmiljøet

**Mål:** Bygg den relevante koden og forstå repoets grenser.

1. Klon eller oppdater repoet du skal arbeide i.
2. Les `README.md`, løsningsstrukturen og relevante `AGENTS.md`-filer.
3. Finn applikasjonsprosjektet, domenekjernen, integrasjonene, persistenslaget og testene.
4. Kjør bygging og det korteste enhetstestsettet.
5. Finn pull request-arbeidsflyten og se hvilke kontroller som kjøres.
6. Noter hvilke avhengigheter som krever containere, Azure eller et delt miljø.

For monorepoet kan du begynne med:

```powershell
dotnet build Altinn.Authorization.sln
dotnet test -- --filter-trait "Category=Unit"
```

**Leveranse:** Et vellykket lokalt bygg og en enkel skisse av mappene du forventer å endre.

**Kontrollpunkt:** Du vet hvilken kode som er autoritativ, og hvilke tester som ikke ble kjørt av den korte kontrollen.

### Dag tre: Beslutningen i praksis

**Mål:** Kjør og forklar både en tillatt og en avslått beslutning.

1. Gjennomfør [den kjørbare autorisasjonsflyten](../flows/authorization-decision/).
2. Undersøk forespørselens subjekt, ressurs, handling og ressursparti.
3. Følg `DecisionController`, Context Handler, PRP og PDP.
4. Finn hvor rollebeslutningen går videre til delegeringer.
5. Finn hvor en tilgangsliste kan endre et foreløpig `Permit` til `Deny`.
6. Kjør en eksisterende negativ Bruno-test eller avtal et trygt negativt scenario med fadderen.
7. Sammenlign resultat og statuskode.

**Leveranse:** En tabell med inngangsdata, datakilder, beslutning og begrunnelse for de to testene.

**Kontrollpunkt:** Du kan skille en domenebeslutning fra manglende API-tilgang og fra teknisk evalueringsfeil.

### Dag fire: Data, integrasjoner og observabilitet

**Mål:** Finn hvor beslutningsgrunnlaget kommer fra, og følg det gjennom driftsflatene.

1. Åpne persistensmodellen til komponenten du arbeider med.
2. Finn tabellen, blobben, køen eller det eksterne API-et som leverer hvert viktig datapunkt.
3. Velg én integrasjon og dokumenter eier, kontrakt, autentisering, timeout og feiloppførsel.
4. Kjør golden path på nytt med en trace- eller korrelasjons-ID.
5. Finn relevante logger, spor og målinger.
6. Følg audit-hendelsen så langt tilgangen din tillater.
7. Kontroller at observabilitetsdataene ikke eksponerer hele tokens eller unødvendige personopplysninger.

**Leveranse:** En kort feilsøkingslogg som viser hvor du lette, hvilke signaler du fant og hvor eierskapet skiftet.

**Kontrollpunkt:** Du vet forskjellen mellom komponentens autoritative data, hurtigbuffer og data som leses fra en annen tjeneste.

### Dag fem: Første trygge endring

**Mål:** Levere en liten, reell forbedring gjennom den vanlige arbeidsflyten.

Velg sammen med fadderen en endring som kan være

- en test som tydeliggjør eksisterende oppførsel
- bedre feilhåndtering eller observabilitet
- en avgrenset dokumentasjonsrettelse nær koden
- en liten feil med kjent forventet resultat

Gjør deretter følgende:

1. Beskriv forventet oppførsel før du endrer koden.
2. Lag eller identifiser testen som beskytter oppførselen.
3. Gjør den minste nødvendige endringen.
4. Kjør relevante enhets- og integrasjonstester.
5. Kontroller om kontrakter, migreringer eller leveranserekkefølge påvirkes.
6. Åpne en pull request med testbevis og tilbakerullingsvurdering.
7. Gå gjennom tilbakemeldingene sammen med fadderen.

**Leveranse:** En liten pull request som følger teamets kvalitetskrav.

**Kontrollpunkt:** En annen utvikler kan forstå hvorfor endringen er trygg, hvordan den ble prøvd og hvilke komponenter den påvirker.

## Oppsummering med fadderen

Avslutt uken med å vurdere disse punktene:

| Område | Jeg kan selv | Jeg trenger mer øvelse |
|---|---|---|
| Forklare domenebegrepene |  |  |
| Finne riktig komponent og repo |  |  |
| Bygge og kjøre relevante tester |  |  |
| Følge en `Permit` og en `Deny` |  |  |
| Finne beslutningsgrunnlaget |  |  |
| Bruke logger, spor og målinger |  |  |
| Gjøre en trygg liten endring |  |  |

Avtal ett fagområde du skal fordype deg i den neste måneden, og én konkret oppgave der du kan bruke kunnskapen.
## Når du står fast

| Symptom | Første kontroll |
|---|---|
| `401` eller `403` før PDP-svar | token, scope, abonnementnøkkel og API-grense |
| `Deny` | subjekt, representert part, ressurs, handling og tilgangsliste |
| `NotApplicable` | ingen policyregel passer |
| `Indeterminate` | ugyldig kontekst, manglende policy eller evalueringsfeil |
| ulikt resultat mellom miljøer | testdata, policyversjon, delegeringer, funksjonsflagg og konfigurasjon |
| manglende audit-hendelse | funksjonsflagg, kø, prosessor og korrelasjon |

Ikke endre en delt database direkte for å få testen til å virke. Bruk det støttede API-et eller testdataflyten.
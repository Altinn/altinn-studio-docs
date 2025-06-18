---
title: 'Opprette dialoger'
description: 'Hvordan opprette en dialog i Dialogporten'
weight: 20
---

## Introduksjon

Denne veiledningen viser hvordan du kan bruke tjenesteeier-API-et til å opprette dialoger for dine digitale tjenesteinstanser og/eller meldinger.

{{<notice info>}}
Når du bruker Altinn Studio, vil dialoger automatisk opprettes for deg. En app kan velge å ikke bruke dette, se [veiledningen for integrering av Altinn Apps]({{<relref "../integrating-altinn-apps">}}) for mer informasjon.
{{</notice>}}

## Grunnleggende trinn

1. Autentiser som en [tjenesteeier]({{<relref "../../authenticating/#bruk-for-tjenesteeiersystemer">}})
2. Utfør en POST-forespørsel og oppgi [create dialog DTO]({{<relref "../../../reference/entities/dialog#opprett-post">}})

## Velge en tjenesteressurs
Tjenesteressursen som leveres kan være hvilken som helst ressurs i [Altinn Resource Registry]({{<relref "../../../../authorization/what-do-you-get/resourceregistry">}}) med en `hasCompetentAuthority`-egenskap som samsvarer med det autentiserte organisasjonsnummeret.

{{<notice info>}}
Å legge til støtte for ytterligere begrensninger (dvs. ekstra scope-krav) til tjenesteressurser spores i [denne saken](https://github.com/Altinn/dialogporten/issues/40).
{{</notice>}}

Ressurser med type `CorrespondenceService` kan ikke refereres til, da disse er reservert for bruk med [Altinn Correspondence]({{<relref "../../../../correspondence">}}).

Som med [søk]({{<relref "../../searching-for-dialogs">}}), vil `serviceResource`-feltet referere til en ressurs i Resource Registry og bruke formatet `urn:altinn:resource:<identifier>`.

## Datoer

Alle datofelt er valgfrie, men kan leveres for å holde tidsstempler synkronisert mellom Dialogporten og tjenesteplattformen, kontrollere dialogsynlighet og angi en forfallsdato.

### Opprettede og oppdaterte datoer

Som standard vil begge disse settes til gjeldende tidsstempel når du oppretter en dialog. Hver av disse kan leveres, men oppdatert dato må ikke være tidligere enn opprettet dato.

### Synlighetsdatoer

Det er to valgfrie datoer som kan settes på en dialog som styrer synlighet for sluttbrukere.

* `expiresAt` definerer et fremtidig tidsstempel som, når det er nådd, gjør dialogen utilgjengelig i sluttbruker-API-et. Sluttbrukersystemer bør gjøre en innsats for å advare brukere om at innholdet er i ferd med å bli utilgjengelig. Utilgjengelige dialoger er fortsatt synlige i tjenesteeier-API-ene, unntatt når du [impersonerer en bruker]({{<relref "../impersonating-users">}}), og `expiresAt`-feltet kan når som helst settes til `null` eller en fremtidig verdi som vil gjøre det synlig for sluttbrukeren igjen (og en `dialogporten.dialog.updated`-hendelse vil bli sendt).

{{<notice warning>}}
Utilgjengelige dialoger vil for øyeblikket _ikke_ bli slettet fra databasen, men dette kan endre seg i fremtiden der Dialogporten fjerner for lengst utløpte dialoger av hensyn til personvern og systemeffektivitet.
{{</notice>}}

* `visibleAt` definerer et fremtidig tidsstempel som, når det er nådd, gjør dialogen tilgjengelig i sluttbruker-API-et. Før dette tidspunktet vil dialogen ikke være tilgjengelig.

{{<notice warning>}}
På grunn av en [kjent begrensning](https://github.com/Altinn/dialogporten/issues/110), vil hendelser knyttet til oppretting/oppdatering av dialoger _ikke_ vurdere `visibleAt`. Dette betyr at når en dialog opprettes med en fremtidig `visibleAt`-dato, vil hendelsen bli produsert umiddelbart, men vil ikke tillate sluttbrukeren å få tilgang til dialogen.
{{</notice>}}

### Oppgi en forfallsdato

Tidsstempelet `dueAt` er et hint til sluttbrukersystemer for å indikere for brukerne at en forfallsdato er knyttet til dialogen. Å passere forfallsdatoen har ingen effekt på dialogtilgjengeligheten.

## Setter innhold

Dialogporten støtter flere innholdsfelt som brukes til forskjellige formål. Disse kan settes på både dialog og overføringer. For teknisk informasjon om feltnavn, tillatte formater osv., se [innholdstypereferansen]({{<relref "../../../reference/content-types">}}).

### Tittel

Tittelen er hovedoverskriften for dialogen. For dialoger som refererer til ressurser som krever det høyeste autentiseringsnivået (sikkerhetsnivå), kan en alternativ ikke-sensitiv tittel i tillegg leveres, som vil bli brukt som tittel hvis den nåværende brukeren har autentisert med en metode med et sikkerhetsnivå lavere enn ressurspolicyen krever.

### Sammendrag

Sammendraget skal gi brukeren en rask oversikt over gjeldende tilstand i dialogen. Dette er tilgjengelig i søke-/liste-API-et, og vises vanligvis umiddelbart etter tittelen. For dialoger som refererer til ressurser som krever det høyeste autentiseringsnivået (sikkerhetsnivå), kan et alternativt ikke-sensitivt sammendrag i tillegg leveres, som vil bli brukt som sammendrag hvis den nåværende brukeren har autentisert med en metode med et sikkerhetsnivå lavere enn ressurspolicyen krever.

### Ytterligere informasjon

Tilleggsinformasjonsfeltet skal ikke brukes til personlig innholdsdata, men vise ytterligere ikke-personlig informasjon som er relevant for dialogen og/eller gjeldende prosessstatus. Eksempler er kontaktinformasjon og lenker til ytterligere dokumentasjon eller støttesider. Dette feltet støtter rik formatering via [CommonMark](https://commonmark.org/) markdown.

### Avsendernavn

Vanligvis bruker sluttbrukersystemer `org`-feltet for å indikere for sluttbrukeren hvem den andre parten i dialogen er. Dette kan utvides/overstyres ved å oppgi `senderName`-feltet, som sluttbrukersystemer bør bruke i stedet for (eller i tillegg til) `org` for å indikere for sluttbrukeren hvem den andre parten i dialogen er.

### Utvidet status

`extendedStatus` er et strukturert felt som tjenesteeiere kan sette på dialogen, og som gir mulighet for tjeneste-/domenespesifikke statuser utover de generiske statusene som er definert av `status`. Innholdstypen for utvidet status er den menneskelig lesbare motparten, og bør leveres av tjenesteeieren når en strukturert `extendedStatus` er satt.

### Innholdsreferanse

Dette er innholdstypen for [front channel embeds]({{<relref "../../../getting-started/front-channel-embeds">}}), og kan settes på både dialoger og overføringer i dialoger.

**Les mer**
* {{<link "../../../reference/content-types">}}
* {{<link "../../../reference/front-end/front-channel-embeds">}}

## Leverer søketagger

Siden Dialogporten ikke inneholder noen innholdsdata, er fritekstsøk i utgangspunktet begrenset til innholdsfelt. Ikke alle relevante søketermer er egnet for tittel-/sammendragsfelt, så i stedet kan tjenesteeieren levere en rekke søketagger som også vil bli vurdert ved bruk av fritekstsøk. Søketaggene er ikke synlige på noen sluttbruker-API-er.

## Setter en status

Dialogporten støtter flere generiske dialogstatuser, som indikerer forskjellige typiske tilstander i prosessen dialogen representerer. Disse statusene bør brukes av sluttbrukersystemer for å organisere og prioritere dialoglisten. Statusene er:

| Status              | Beskrivelse                                                                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `New`               | Dialogen anses som ny. Vanligvis brukt for enkle meldinger som ikke krever noen interaksjon. Dette er standard.                                                                                          |
| `Draft`             | Brukes til å indikere brukerinitierte dialoger som ennå ikke er sendt og som kan kanselleres når som helst.                                                                                             |
| `InProgress`        | Indikerer at dialogen er startet, er under arbeid av parten og/eller tjenesteeieren. I en seriell prosess kan dette indikere at for eksempel et skjemautfylling pågår på et forhåndsutfylt skjema. |
| `Sent`              | Sendt av parten til tjenesteeieren. I en seriell prosess brukes dette etter at en innsending er gjort.                                                                                                |
| `RequiresAttention` | Brukes til å indikere at dialogen er i gang/under arbeid, men er i en tilstand der brukeren må gjøre noe - for eksempel korrigere en feil, eller andre forhold som hindrer videre behandling.           |
| `Completed`         | Dialogen ble fullført. Dette betyr vanligvis at dialogen har nådd en sluttilstand der ingen ytterligere oppdateringer vil bli gjort.                                                                  |


### Hvilke statuser skal brukes når
Når du oppretter dialoger, bør tjenesteplattformen vurdere både tilstanden og omstendighetene til dialogen som opprettes. Det er ingen faste regler, men følgende retningslinjer kan hjelpe med å bestemme hvilken status som er passende.

* Representerer dialogen et søknadsskjema, som ble "kaldt" initiert av brukeren uten noen åpenbar interaksjon med tjenesteeieren? **Draft**
* Er dialogen initiert av tjenesteeieren (valgfritt forhåndsutfylt med data) for et rapporteringsskjema? **InProgress**
* Er dialogen i en tilstand der brukeren har gjort en innsending, og venter på en form for tilbakemelding fra tjenesteeieren, dvs. "ballen er på tjenesteeierens banehalvdel"? **Sent**
* Var dialogen tidligere i en **Draft**-tilstand, men var det på et tidspunkt åpenbar interaksjon med tjenesteeieren, dvs. innledende tilbakemelding/validering ble forespurt og gitt, og plasserte "ballen tilbake på partens banehalvdel"? **InProgress**
* Var det en form for avvik, feiltilstand, viktig forfallsdato nærmer seg eller lignende som krever at brukeren foretar seg noe for at prosessen skal fortsette? **RequiresAttention**
* Har dialogen nådd en logisk konklusjon, dvs. at det ble tatt en offisiell avgjørelse som under normale omstendigheter (dvs. ikke inkludert ankeprosesser) representerer slutten av dialogen? **Completed**

En bestemt dialog kan kreve en høyere oppløsning av statuser, dvs. å ha flere distinkte tilstander av "InProgress" som er meningsfulle å formidle til sluttbrukeren. For disse formålene, se egenskapen `extendedStatus` og innholdstypen.

## Definere handlinger

Handlinger er ikke obligatoriske, men de fleste dialoger bør indikere hvordan brukeren forventes å samhandle for at, så med mindre det er spesielle grunner til ikke å gjøre det, bør du vurdere å legge til minst én GUI-handling.

### Autoriserer handlinger

Handlinger har selv en `action`-egenskap som tilsvarer en [XACML-handling]({{<relref "../../../../authorization/guides/xacml/#action">}}) definert i den refererte tjenesteressursens [policy]({{<relref "../../../../authorization/guides/xacml/#xacml-policy">}}). Dialogporten vil sjekke om den autentiserte brukeren har lov til å utføre den spesifiserte handlingen på den refererte tjenesteressursen for dialogens part, og hvis ikke, vil den flagge handlingen som `isAuthorized: false` og fjerne den medfølgende URL-en. Sluttbrukersystemer bør indikere for sluttbrukeren at handlingen eksisterer, men at tilgang mangler - og om mulig gi informasjon om hvordan du ber om tilgang (som er utenfor omfanget for Dialogporten).

{{<notice warning>}}Selv om Dialogporten vil sjekke autorisasjon for handlingen og fjerne URL-en hvis sjekken mislykkes, MÅ tjenesteeiersystemet utføre sin egen autorisasjon basert på den samme policyen{{</notice>}}

For ekstra kontroll kan et [autorisasjonsattributt]({{<relref "../../../getting-started/authorization/attributes">}}) leveres, som lar tjenesteeiere referere til spesifikke regler i policyen eller andre tjenesteressurser (som tjenesteeieren kontrollerer) fullstendig.

### Definere GUI-handlinger

For mange dialoger vil en enkelt GUI-handling med en tittel med noe som "Start skjemautfylling" og en enkel URL som forårsaker en GET-navigasjon til tjenesteimplementeringen være tilstrekkelig. Tjenesteeiersystemet bør sørge for å inkludere tilstrekkelig informasjon i URL-en for å initiere, autentisere og autorisere forespørselen. Siden Dialogporten-sluttbruker-API-et krever ID-porten-autentisering, kan tjenesteeiersystemet vanligvis stole på at en SSO-økt (single-sign-on) er aktiv i ID-porten, og dermed gi en sømløs brukeropplevelse (med unntak av noen få nettleseromdirigeringer).

#### Skrivehandlinger

Hvis `httpMethod` som leveres for en GUI-handling er noe annet enn `GET`, anses det som en [skrivehandling]({{<relref "../../../getting-started/write-actions">}}), og det nettleserbaserte sluttbrukersystemet må bruke [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) eller lignende for å konstruere forespørselen ved hjelp av nettleserens skriptevner. Siden dette gjør GET-basert omdirigert SSO med ID-porten umulig, for at tjenesteeieren skal kunne starte en økt, vil sluttbrukersystemet inkludere [dialogtokenet]({{<relref "../../../getting-started/authorization/dialog-tokens">}}) som en Authorization-header. Tjenesteeiersystemet på URL-en må også fullt ut støtte [CORS-protokollen](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

#### Slettehandlinger

Avhengig av dialogens tilstand og art, bør også en slettehandling leveres. Slettehandlinger er en spesiell skrivehandling som bør flagges med `isDeleteAction`-flagget, som vil gi et viktig hint til sluttbrukersystemet for å gi passende GUI.

### Definere API-handlinger

For å støtte automatiseringer via tilpassede sluttbrukersystemer som ikke er begrenset av nettlesersemantikk og sikkerhetstiltak, bør tjenesteeiersystemer vurdere å legge til API-handlinger. Disse ignoreres vanligvis av generiske nettleserbaserte portalsystemer rettet mot menneskelige brukere, men kan gi nyttig informasjon til tilpassede sluttbrukersystemer om formen på tjenesteeiersystemets API-er, og hvilke endepunkter/ressurser/handlinger som er relevante for den gitte tilstanden til dialogen - dvs. en form for dynamisk dokumentasjon. F.eks. en skjemautfyllingstjeneste kan gi et POST-endepunkt som forventer en bestemt datamodell som representerer all skjemainformasjonen, og speiler den menneskefokuserte GUI-handlingen "Gå til skjemautfylling".

Merk at Dialogporten ikke vil vurdere gyldigheten eller semantikken til API-handlinger, men vil - som med GUI-handlinger - utføre autorisasjon og flagge `isAuthorized` tilsvarende.

**Les mer**
* [Lær mer om handlinger i dialoger]({{<relref "../../../getting-started/dialogs#handlinger">}})
* {{<link "../../../reference/entities/action">}}
* {{<link "../../../getting-started/write-actions">}}
* {{<link "../../../getting-started/authorization/dialog-tokens">}}

## Definere vedlegg

Et logisk vedlegg kan ha flere representasjoner rettet mot både menneskelige brukere (vanligvis ustrukturerte data som PDF-er, medieinnhold osv.) og for systemer/maskiner (vanligvis strukturerte data som JSON eller XML). F.eks. et gitt vedlegg kan gjøres tilgjengelig i PDF-, DOCX-, XML- og JSON-formater, som alle inneholder det samme logiske innholdet, men i forskjellige formater. Et vedlegg kan også angis som en HTML (mediaType `text/html`), som skal forårsake en normal nettlesernavigasjon. Sluttbrukersystemer kan gi innebygde opplevelser for støttede medietyper, f.eks. gi visningsprogrammer/spillere for bilde- og videovedlegg.

Vedlegg kan defineres både på dialogen og på individuelle overføringer.

**Les mer**
* [Lær mer om vedlegg i dialoger]({{<relref "../../../getting-started/dialogs#vedlegg">}})

## Definere overføringer

Overføringer kan inneholde et ekstra nivå av innhold og vedlegg som representerer en enkelt forekomst av kommunikasjon i en dialog, som kan være underlagt forskjellige autorisasjonsregler enn innholdet på dialognivå. Overføringen inneholder dermed

* informasjon om hvem som sendte den; enten en representant for parten eller tjenesteeieren
* typen overføring, som skal gi sluttbrukersystemer en ide om hvordan de skal vise den på riktig måte til sluttbrukere. En tjenestespesifikk, strukturert utvidet type kan også leveres som tilpassede sluttbrukersystemer kan bruke.
* eventuelt en annen relatert overføring

Som med innhold på dialognivå, kan overføringer inneholde en tittel, et sammendrag og en innholdsreferanse (front channel embed). Tjenesteeiere kan bruke front channel embeds for å spore om en bestemt overføring er åpnet eller ikke, noe som igjen f.eks. kan utløse en `transmissionOpened`-aktivitet som legges til.

{{<notyetwritten>}}

**Les mer**
* [Lær mer om overføringer i dialoger]({{<relref "../../../getting-started/dialogs#forsendelser">}})
* {{<link "../../../reference/entities/transmission">}}
* {{<link "../../../reference/content-types">}}

## Definere aktiviteter

Når du oppretter en dialog, bør tjenesteeiersystemet vurdere tilstanden til tjenesteinstansen som dialogen reflekterer og hvor "langt" i prosessen brukeren har kommet. Et typisk utgangspunkt er å legge til en `DialogCreated`-aktivitet.

{{<notyetwritten>}}

**Les mer**
* {{<link "../../../getting-started/activity-log">}}
* {{<link "../../../reference/entities/activity">}}


## Sikre idempotens

Dialogporten tilbyr to valgfrie mekanismer for å sikre at en gitt dialog bare opprettes én gang:

* Brukerleverte dialog-ID-er. Tjenesteeiersystemer kan definere sine egne UUIDv7-er (som kan være deterministisk avledet fra interne identifikatorer)
* En dedikert idempotensnøkkel

Det første alternativet er en enkel mekanisme som for de fleste tjenesteeiersystemer kan være tilstrekkelig, mens det andre lettere kan brukes til å implementere vilkårlige forretningsregler (f.eks. en gitt dialog skal bare være knyttet til en tuppel av rapporteringspart, rapporteringstjeneste og år/måned).


**Les mer**
* {{<link "../../../reference/openapi">}}
* {{<link "../api-client">}}

{{<children />}}
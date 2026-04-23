---
title: "Opprette dialoger"
description: "Hvordan opprette en dialog i Dialogporten"
weight: 20
---

## Introduksjon

Denne veiledningen viser hvordan du kan bruke tjenesteeier-API-et til å opprette dialoger for dine digitale tjenesteinstanser og/eller meldinger.

{{<notice info>}}
Når du bruker Altinn Studio, opprettes dialoger automatisk for deg. En app kan velge å reservere seg mot dette, se [veiledningen for integrasjon med Altinn Apps]({{< relref "../integrating-altinn-apps/" >}}) for mer informasjon.
{{</notice>}}

## Grunnleggende steg

1. Autentiser som [tjenesteeier]({{< relref "../../authenticating/" >}}#bruk-for-tjenesteeiersystemer)
2. Utfør en POST-forespørsel og oppgi [DTO-en for opprettelse av dialog]({{< relref "../../../reference/entities/dialog/" >}}#opprett-post)

## Valg av tjenesteressurs

Tjenesteressursen som oppgis kan være en hvilken som helst ressurs i [Altinn Resource Registry]({{< relref "../../../../authorization/what-do-you-get/resourceadministration/" >}}) der egenskapen `hasCompententAuthority` samsvarer med organisasjonsnummeret til den autentiserte organisasjonen.

{{<notice info>}}
Støtte for flere begrensninger, f.eks. ekstra scope-krav, på tjenesteressurser spores i [denne saken](https://github.com/Altinn/dialogporten/issues/40).
{{</notice>}}

Ressurser med typen `CorrespondenceService` kan ikke refereres, siden disse er reservert for bruk med [Altinn Melding]({{< relref "../../../../correspondence/" >}}).

Som ved [søk]({{< relref "../../searching-for-dialogs/" >}}), må feltet `serviceResource` referere til en ressurs i Resource Registry og bruke formatet `urn:altinn:resource:<identifier>`.

## Datoer

Alle datofelter er valgfrie, men kan oppgis for å holde tidsstempler synkronisert mellom Dialogporten og tjenesteplattformen, kontrollere dialogsynlighet og angi en frist.

### Opprettet- og oppdatertdato

Som standard settes begge til gjeldende tidsstempel når en dialog opprettes. Begge kan oppgis, men oppdatertdato kan ikke være tidligere enn opprettetdato.

### Synlighetsdatoer

Det finnes to valgfrie datoer som kan settes på en dialog og som styrer synlighet for sluttbrukere.

- `expiresAt` definerer et fremtidig tidspunkt som, når det nås, gjør dialogen utilgjengelig i sluttbruker-API-et. Sluttbrukersystemer bør forsøke å varsle brukere om at innholdet snart blir utilgjengelig. Utilgjengelige dialoger er fortsatt synlige i tjenesteeier-API-ene, unntatt ved [etterligning av bruker]({{< relref "../impersonating-users/" >}}), og feltet `expiresAt` kan når som helst settes til `null` eller til en fremtidig verdi, noe som gjør dialogen synlig igjen for sluttbruker, og en `dialogporten.dialog.updated`-hendelse blir sendt.

{{<notice warning>}}
Utilgjengelige dialoger blir foreløpig _ikke_ sanert fra databasen, men dette kan endre seg i fremtiden dersom Dialogporten fjerner lenge utløpte dialoger av hensyn til personvern og systemeffektivitet.
{{</notice>}}

- `visibleFrom` definerer et fremtidig tidspunkt som, når det nås, gjør dialogen tilgjengelig i sluttbruker-API-et. Før dette tidspunktet vil dialogen ikke være tilgjengelig.

{{<notice warning>}}
På grunn av en [kjent begrensning](https://github.com/Altinn/dialogporten/issues/110) tar hendelser knyttet til oppretting og oppdatering av dialoger foreløpig _ikke_ hensyn til `visibleFrom`. Dette betyr at når en dialog opprettes med en fremtidig `visibleFrom`-dato, vil hendelsen produseres umiddelbart, men uten at sluttbrukeren kan få tilgang til dialogen.
{{</notice>}}

### Angi en frist

Tidsstempelet `dueAt` er et hint til sluttbrukersystemer om å vise brukerne at dialogen har en frist. Å oppgi fristen påvirker ikke tilgjengeligheten til dialogen.

## Sette innhold

Dialogporten støtter flere innholdsfelter som brukes til ulike formål. Disse kan settes både på dialoger og forsendelser. For teknisk informasjon om feltnavn, tillatte formater osv., se [referansen for innholdstyper]({{< relref "../../../reference/content-types/" >}}).

### Tittel

Tittelen er hovedoverskriften for dialogen. For dialoger som refererer til ressurser som krever høyeste autentiseringsnivå, kan det i tillegg oppgis en alternativ ikke-sensitiv tittel, som brukes som tittel dersom den nåværende brukeren har autentisert seg med en metode med lavere sikkerhetsnivå enn det ressursens policy krever.

### Sammendrag

Sammendraget bør gi brukeren en rask oversikt over den nåværende tilstanden til dialogen. Dette er tilgjengelig i søke- og liste-API-et og vises vanligvis rett etter tittelen. For dialoger som refererer til ressurser som krever høyeste autentiseringsnivå, kan det i tillegg oppgis et alternativt ikke-sensitivt sammendrag, som brukes dersom den nåværende brukeren har autentisert seg med en metode med lavere sikkerhetsnivå enn ressursens policy krever.

### Ytterligere informasjon

Feltet for ytterligere informasjon bør ikke brukes til personalisert innhold, men til å vise ytterligere ikke-personlig informasjon som er relevant for dialogen og/eller gjeldende prosesstilstand. Eksempler er kontaktinformasjon og lenker til ytterligere dokumentasjon eller støttesider. Dette feltet støtter rik formattering via [CommonMark](https://commonmark.org/) markdown.

### Avsendernavn

Vanligvis bruker sluttbrukersystemer feltet `org` for å indikere for sluttbrukeren hvem den andre parten i dialogen er. Dette kan utvides eller overstyres ved å oppgi feltet `senderName`, som sluttbrukersystemer bør bruke i stedet for, eller i tillegg til, `org` for å indikere hvem den andre parten i dialogen er.

### Utvidet status

`extendedStatus` er et strukturert felt som tjenesteeiere kan sette på dialogen, og som gjør det mulig å angi tjeneste- eller domenespesifikke statuser utover de generiske tilstandene definert av `status`. Innholdstypen for utvidet status er den menneskelesbare motparten, og bør oppgis av tjenesteeieren hver gang en strukturert `extendedStatus` settes.

### Innholdsreferanse

Dette er innholdstypen for [front channel embed]({{< relref "../../../getting-started/front-channel-embeds/" >}}), og kan settes både på dialoger og på forsendelser i dialoger.

**Les mer**

- {{<link "../../../reference/content-types">}}
- {{<link "../../../reference/front-end/front-channel-embeds">}}

## Oppgi søketagger

Siden Dialogporten ikke inneholder innholdsdata, er fritekstsøk i utgangspunktet begrenset til innholdsfelter. Ikke alle relevante søketermer passer i tittel- eller sammendragsfelt, så tjenesteeieren kan i stedet oppgi en liste med søketagger som også tas med ved fritekstsøk. Søketaggene er ikke synlige i noen sluttbruker-API-er.

## Sette tjenesteeieretiketter

Tjenesteeiere kan sette interne etiketter på en dialog gjennom `serviceOwnerContext.serviceOwnerLabels`.

Disse etikettene:

- er ikke synlige i sluttbruker-API-er
- må være unike uten hensyn til store og små bokstaver
- må være mellom 3 og 255 tegn lange
- er begrenset til 20 etiketter per dialog

Tjenesteeieretiketter kan også administreres senere gjennom de dedikerte endepunktene for etiketter i tjenesteeierkontekst og brukes som filtre i søk for tjenesteeier.

**Les mer**

- {{<link "../../../reference/entities/serviceownerlabel">}}

## Sette en status

Dialogporten støtter flere generiske dialogstatuser som angir ulike typiske tilstander i prosessen dialogen representerer. Disse statusene bør brukes av sluttbrukersystemer til å organisere og prioritere dialoglisten. Statusene er:

| Status              | Beskrivelse                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NotApplicable`     | Dialogen har ingen meningsfull status. Brukes typisk for enkle meldinger som ikke krever noen interaksjon. Dette er standard.                                                                        |
| `Draft`             | Brukes for å indikere brukerinitierte dialoger som ennå ikke er sendt, og som kan avbrytes når som helst.                                                                                             |
| `InProgress`        | Indikerer at dialogen er startet og at det arbeides med den av parten og/eller tjenesteeieren. I en seriell prosess kan dette f.eks. bety at utfylling av et forhåndsutfylt skjema pågår.           |
| `Awaiting`          | Venter på handling fra tjenesteeier. I denne tilstanden har partsrepresentanten ingen flere oppgaver, og ansvaret ligger hos tjenesteeieren.                                                         |
| `RequiresAttention` | Brukes for å indikere at dialogen er i fremdrift eller under arbeid, men i en tilstand der brukeren må gjøre noe, f.eks. rette en feil eller håndtere andre forhold som hindrer videre behandling. |
| `Completed`         | Dialogen er fullført. Dette betyr vanligvis at dialogen har nådd en sluttilstand der det ikke vil bli gjort flere oppdateringer.                                                                    |

### Hvilke statuser som bør brukes når

Når dialoger opprettes, bør tjenesteplattformen vurdere både tilstanden og omstendighetene rundt dialogen som opprettes. Det finnes ingen faste regler, men følgende retningslinjer kan hjelpe med å avgjøre hvilken status som er passende.

- Representerer dialogen et søknadsskjema som ble "kaldstartet" av brukeren uten noen åpenbar interaksjon med tjenesteeieren? **Draft**
- Er dialogen initiert av tjenesteeieren, eventuelt forhåndsutfylt med data, for et rapporteringsskjema? **InProgress**
- Er dialogen i en tilstand der brukeren har sendt inn noe og venter på en form for tilbakemelding fra tjenesteeieren, dvs. "ballen er hos tjenesteeieren"? **Awaiting**
- Var dialogen tidligere i tilstanden **Draft**, men har det på et tidspunkt vært åpenbar interaksjon med tjenesteeieren, dvs. at innledende tilbakemelding eller validering ble etterspurt og gitt, slik at "ballen er tilbake hos parten"? **InProgress**
- Var det en form for avvik, feiltilstand, viktig frist som nærmer seg eller lignende som krever at brukeren gjør noe for at prosessen skal kunne fortsette? **RequiresAttention**
- Nådde dialogen en logisk avslutning, dvs. at det ble fattet en formell beslutning som under normale omstendigheter, altså uten å regne med klageprosesser, representerer slutten på dialogen? **Completed**

En gitt dialog kan kreve en høyere oppløsning i statusene, dvs. flere distinkte tilstander av typen `InProgress` som er meningsfulle å formidle til sluttbrukeren. For dette formålet, se egenskapen `extendedStatus` og den tilhørende innholdstypen.

## Definere handlinger

Handlinger er ikke obligatoriske, men de fleste dialoger bør angi hvordan brukeren forventes å samhandle, så med mindre det finnes særlige grunner til noe annet, bør du vurdere å legge til minst én GUI-handling.

### Autorisere handlinger

Handlinger har selv en `action`-egenskap som tilsvarer en [XACML action]({{< relref "../../../../authorization/reference/xacml/" >}}#action) definert i [policyen]({{< relref "../../../../authorization/reference/xacml/" >}}#xacml-policy) for den refererte tjenesteressursen. Dialogporten sjekker om den autentiserte brukeren har lov til å utføre den angitte handlingen på den refererte tjenesteressursen for dialogens part, og hvis ikke vil handlingen markeres med `isAuthorized: false` og den oppgitte URL-en fjernes. Sluttbrukersystemer bør indikere for sluttbrukeren at handlingen finnes, men at tilgang mangler, og om mulig gi informasjon om hvordan tilgang kan bestilles. Dette er utenfor omfanget til Dialogporten.

{{<notice warning>}}Selv om Dialogporten vil sjekke autorisasjon for handlingen og fjerne URL-en dersom sjekken feiler, MÅ tjenesteeiersystemet utføre sin egen autorisasjon basert på den samme policyen{{</notice>}}

For ytterligere kontroll kan et [autorisasjonsattributt]({{< relref "../../../getting-started/authorization/attributes/" >}}) oppgis, som gjør det mulig for tjenesteeiere å referere til spesifikke regler i policyen eller til andre tjenesteressurser som tjenesteeieren kontrollerer.

### Definere GUI-handlinger

For mange dialoger vil én GUI-handling med en tittel som "Start skjemautfylling" og en enkel URL som forårsaker en GET-navigasjon til tjenesteimplementasjonen være tilstrekkelig. Tjenesteeiersystemet bør sørge for å inkludere nok informasjon i URL-en til å initiere, autentisere og autorisere forespørselen. Siden Dialogportens sluttbruker-API krever autentisering med ID-porten, kan tjenesteeiersystemet vanligvis stole på at en SSO-sesjon er aktiv i ID-porten, og dermed gi en sømløs brukeropplevelse, bortsett fra noen få videresendinger i nettleseren.

#### Skrivehandlinger

Hvis `httpMethod` som oppgis for en GUI-handling er noe annet enn `GET`, regnes den som en [skrivehandling]({{< relref "../../../getting-started/write-actions/" >}}), og det nettleserbaserte sluttbrukersystemet må bruke [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) eller lignende for å konstruere forespørselen ved hjelp av nettleserens skripting. Siden dette gjør GET-basert videresendt SSO med ID-porten umulig, vil sluttbrukersystemet inkludere [dialogtokenet]({{< relref "../../../getting-started/authorization/dialog-tokens/" >}}) som en `Authorization`-header, slik at tjenesteeieren kan initiere en sesjon. Tjenesteeiersystemet på URL-en må også fullt ut støtte [CORS-protokollen](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

#### Slettehandlinger

Avhengig av dialogens tilstand og natur bør det også oppgis en slettehandling. Slettehandlinger er en spesiell skrivehandling som bør flagges med `isDeleteAction`, noe som gir et viktig hint til sluttbrukersystemet for å kunne tilby riktig GUI.

### Definere API-handlinger

For å støtte automatisering via tilpassede sluttbrukersystemer som ikke er begrenset av nettlesersemantikk og sikkerhetsmekanismer, bør tjenesteeiersystemer vurdere å legge til API-handlinger. Disse ignoreres vanligvis av generiske nettleserbaserte portalsystemer rettet mot mennesker, men kan gi nyttig informasjon til tilpassede sluttbrukersystemer om hvordan tjenesteeiersystemets API-er ser ut, og hvilke endepunkter, ressurser og handlinger som er relevante for den gitte tilstanden til dialogen, altså en form for dynamisk dokumentasjon. Et skjemautfyllingssystem kan for eksempel tilby et POST-endepunkt som forventer en bestemt datamodell som representerer all informasjon i skjemaet, som speiler den menneskeorienterte GUI-handlingen "Gå til skjemautfylling".

Merk at Dialogporten ikke vurderer gyldigheten eller semantikken til API-handlinger, men vil, på samme måte som for GUI-handlinger, utføre autorisasjon og flagge `isAuthorized` tilsvarende.

**Les mer**

- [Lær mer om handlinger i dialoger]({{< relref "../../../getting-started/dialogs/" >}}#handlinger)
- {{<link "../../../reference/entities/action">}}
- {{<link "../../../getting-started/write-actions">}}
- {{<link "../../../getting-started/authorization/dialog-tokens">}}

## Definere vedlegg

Et logisk vedlegg kan ha flere representasjoner rettet både mot mennesker, typisk ustrukturert data som PDF-er og medieinnhold, og mot systemer eller maskiner, typisk strukturert data som JSON eller XML. Et gitt vedlegg kan for eksempel gjøres tilgjengelig i PDF-, DOCX-, XML- og JSON-format, som alle inneholder det samme logiske innholdet, men i ulike formater. Et vedlegg kan også angis som HTML, `mediaType` `text/html`, noe som bør føre til vanlig nettlesernavigasjon. Sluttbrukersystemer kan tilby innebygde opplevelser for støttede medietyper, f.eks. visere eller avspillere for bilde- og videovedlegg.

Vedlegg kan defineres både på dialognivå og på individuelle forsendelser.

**Les mer**

- [Lær mer om vedlegg i dialoger]({{< relref "../../../getting-started/dialogs/" >}}#vedlegg)

## Definere forsendelser

Forsendelser kan inneholde et ekstra nivå av innhold og vedlegg som representerer en enkelt kommunikasjonsinstans i en dialog, og som kan være underlagt andre autorisasjonsregler enn innhold på dialognivå. Forsendelsen inneholder dermed:

- informasjon om hvem som sendte den, enten en representant for parten eller tjenesteeieren
- typen forsendelse, som bør gi sluttbrukersystemer en idé om hvordan den bør vises for sluttbrukere. En tjenestespesifikk, strukturert utvidet type kan også oppgis for bruk i tilpassede sluttbrukersystemer.
- eventuelt en annen relatert forsendelse

Som med innhold på dialognivå kan forsendelser inneholde tittel, sammendrag og en innholdsreferanse, altså front channel embed. Tjenesteeiere kan bruke front channel embed for å spore om en bestemt forsendelse er åpnet, noe som igjen f.eks. kan utløse at en `transmissionOpened`-aktivitet legges til.

### Navigasjonshandlinger på forsendelser

For å tilby kontekstuelle lenker direkte på en forsendelse støtter Dialogporten navigasjonshandlinger, som er permanente, GET-baserte lenker som aldri endrer servertilstand og som er trygge å prefetche.

Navigasjonshandlinger har følgende egenskaper:

- `title` — en flerspråklig tittel som vises til sluttbrukeren
- `url` — URL-en det skal navigeres til; må alltid være et GET-endepunkt over HTTPS
- `expiresAt` (valgfri) — når dette tidspunktet nås, omskriver Dialogporten URL-en til `urn:dialogporten:expired`, og sluttbrukersystemer bør skjule eller deaktivere handlingen

Hvis forsendelsen har et `authorizationAttribute` som gjør sluttbrukeren uautorisert, skrives URL-en om til `urn:dialogporten:unauthorized`.

Når navigasjonshandlinger defineres, krever den nåværende implementasjonen:

- en ikke-tom lokalisert `title`
- en HTTPS-`url`
- en valgfri `expiresAt` i fremtiden

Disse handlingene er knyttet til en forsendelse, ikke til dialogroten, og er ment for kontekstuell navigasjon fra den forsendelsen. De er kun navigasjonsmål; hvis du trenger å utløse tilstandsendringer, bruk dialoghandlinger i stedet.

Sluttbruker-API-ene returnerer navigasjons-URL-en med følgende adferd:

- Hvis brukeren ikke er autorisert til å få tilgang til forsendelsen, skrives URL-en om til `urn:dialogporten:unauthorized`
- Hvis handlingen er utløpt, skrives URL-en om til `urn:dialogporten:expired`

Tjenesteeier-API-ene returnerer de konfigurerte verdiene, noe som gjør dem egnet til diagnostikk og administrasjon.

**Les mer**

- [Lær mer om forsendelser i dialoger]({{< relref "../../../getting-started/dialogs/" >}}#forsendelser)
- {{<link "../../../reference/entities/transmission">}}
- {{<link "../../../reference/content-types">}}

## Definere aktiviteter

Når en dialog opprettes, bør tjenesteeiersystemet vurdere tilstanden til tjenesteinstansen som dialogen gjenspeiler, og hvor langt brukeren har kommet i prosessen. Et typisk startpunkt er å legge til en `DialogCreated`-aktivitet.

Aktiviteter er uforanderlige loggoppføringer. De kompletterer listen over forsendelser i stedet for å erstatte den:

- forsendelser beskriver de faktiske kommunikasjonsenhetene i en dialog
- aktiviteter beskriver tilstandsendringer eller viktige hendelser relatert til dialogen

Hver aktivitet kan valgfritt referere til en forsendelse gjennom `transmissionId`. Dette er nyttig når hendelsen du vil loggføre gjelder en bestemt forsendelse, for eksempel at en forsendelse er åpnet.

De implementerte aktivitetstypene er:

- `DialogCreated`
- `DialogClosed`
- `Information`
- `TransmissionOpened`
- `PaymentMade`
- `SignatureProvided`
- `DialogOpened`
- `DialogDeleted`
- `DialogRestored`
- `SentToSigning`
- `SentToFormFill`
- `SentToSendIn`
- `SentToPayment`
- `FormSubmitted`
- `FormSaved`
- `CorrespondenceOpened`
- `CorrespondenceConfirmed`

Bruk `Information` når du trenger en menneskelesbar aktivitetsbeskrivelse som ikke i seg selv er en forsendelse. Feltet `description` brukes bare for denne aktivitetstypen.

For hendelser som allerede representeres av en forsendelse, bør du fortsatt bruke forsendelser som primær historikk. Legg til en aktivitet når du trenger å fange opp en ekstra hendelse rundt den forsendelsen eller dialogtilstanden, som åpnet, sendt inn, bekreftet, signert eller betalt.

**Les mer**

- {{<link "../../../getting-started/activity-log">}}
- {{<link "../../../reference/entities/activity">}}

## Sikre idempotens

Dialogporten tilbyr to valgfrie mekanismer for å sikre at både dialoger og forsendelser bare opprettes én gang:

- Brukerdefinerte dialog- og forsendelses-ID-er. Tjenesteeiersystemer kan definere egne UUIDv7-er, som eventuelt kan avledes deterministisk fra interne identifikatorer
- En dedikert idempotensnøkkel

Det første alternativet er en enkel mekanisme som for de fleste tjenesteeiersystemer kan være tilstrekkelig, mens det andre lettere kan brukes til å implementere vilkårlige forretningsregler, f.eks. at en gitt dialog bare skal være knyttet til én tuple av rapporterende part, rapporteringstjeneste og år/måned.

{{<notice info>}}
For informasjon om hvordan du bruker HTTP-basert samtidighetskontroll via `ETag`- og `If-Match`-headere, se veiledningen for [oppdatering av dialoger]({{< relref "../updating-dialogs/" >}}).
{{</notice>}}

## Stille opprettelse av dialog

I noen tilfeller, typisk ved migrering av historiske data, er det ønskelig å utføre en oppdatering av en dialog som ikke er relatert til den faktiske forretningsprosessen. Disse oppdateringene fungerer nøyaktig som vanlige oppdateringer, men:

- Øker ikke `updatedAt` eller `contentUpdatedAt`
- Fører ikke til at Altinn Events produseres

Denne adferden kan aktiveres ved å legge til query-parameteren `?isSilentUpdate=true` i URL-en for POST-, PUT- eller PATCH-forespørselen.

**Les mer**

- {{<link "../updating-dialogs">}}
- {{<link "../../../reference/openapi">}}
- {{<link "../api-client">}}

{{<children />}}

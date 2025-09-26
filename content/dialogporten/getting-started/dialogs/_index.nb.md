---
title: "Dialoger"
description: "Lær om hvordan Dialogporten bruker en felles modell for å uttrykke tilstanden til en digital dialog"
weight: 10
toc: true
---

## Introduksjon

Denne seksjonen forklarer dialogmodellen og dens komponenter fra et funksjonelt synspunkt. For teknisk informasjon om de ulike enhetene, se lenker i hver seksjon på denne siden.

For trinnvise veiledninger om hvordan du bruker Dialogporten som sluttbruker eller tjenesteeier, se [brukerhåndbøkene]({{< relref "/dialogporten/user-guides" >}}).

## Dialogen

Dialogen er en abstrakt og felles modell for all pågående eller fullført kommunikasjon med en tjenesteeier, og inneholder beskrivende metadata, f.eks. hvem som er mottaker, adresser (URL), tekstlig innhold (tittel, sammendrag osv.), dato, status, en liste over relevante _handlinger_ som brukeren kan utføre, og en valgfri liste over [forsendelser](#forsendelser). Handlinger kan defineres vilkårlig av tjenesteleverandøren, og all interaksjon med dialogen foregår i tjenesteleverandørens brukergrensesnitt eller mot tjenesteleverandørens API-endepunkter (bortsett fra GUI-handlinger som beskriver skrivehandlinger, se mer om dette i seksjonen [Handlinger](#handlinger)).

En viktig forskjell fra [Altinn Melding]({{< relref "/correspondence" >}}) er at dialoger i Dialogporten er _foranderlige_. Tjenesteleverandøren kan oppdatere metadataene og tilgjengelige handlinger i dialogen når som helst (med noen bemerkelsesverdige unntak). Enhver endring genererer _hendelser_, som autoriserte parter kan handle på, f.eks. sende et varsel eller få et SBS til å utføre en handling.

Dialoger bruker [UUIDv7](https://uuid7.com/) som sin identifikator. Tjenesteeieren kan spesifisere ønsket UUIDv7 ved opprettelse for å muliggjøre bruk av samme identifikator på tvers av systemer og sikre idempotens. Datodelen av UUIDv7 kan ikke settes til en fremtidig dato.

**Les mer**

- {{<link "../../reference/entities/dialog">}}

## Innhold

Mens dialogen hovedsakelig inneholder metadata, er det noe innhold, nemlig en tittel, et kort sammendrag og et felt for "tilleggsinformasjon", brukt for å gi ikke-personlig tekstlig informasjon, f.eks. tjenesteeiers kontaktinformasjon eller lenker til dokumentasjon.

I tillegg kan en dialog inneholde en innholdsreferanse kalt en [front channel embed]({{< relref "/dialogporten/getting-started/front-channel-embeds" >}}), som er en URL til et spesielt endepunkt levert av tjenesteeieren som returnerer en "full" personlig tilpasset nyttelast.

## Forsendelser

En forsendelse brukes til å beskrive en enkelt "kommunikasjon" mellom tjenesteeieren og parten i en dialog. Forsendelser kan typisk være meldinger, forhåndsutfylte skjemaer og kvitteringer fra tjenesteleverandøren, eller innsendte skjemaer/meldinger fra parten knyttet til dialogen. Dialogen kan inneholde null eller flere forsendelser representert i en kronologisk sortert liste. Hver forsendelse og listen over forsendelser er uforanderlige; det er bare mulig å legge til nye forsendelser i listen, ikke endre eller slette forsendelser.

En forsendelse inneholder noen tekstlige metadata (tittel, sammendrag) som forklarer hva forsendelsen er, inkludert [front channel embed]({{< relref "/dialogporten/getting-started/front-channel-embeds" >}}). I tillegg kan en forsendelse inneholde ett eller flere [vedlegg](#vedlegg).

Forsendelser vil som standard arve autorisasjonspolicyen for selve dialogen, men dette kan overstyres slik at individuelle forsendelser indikeres som utilgjengelige dersom sluttbruker mangler rettigheter, i så fall er bare metadataene tilgjengelige, men ikke noen front-channel embeds eller vedlegg.

API-handlinger og aktivitetsloggoppføringer kan referere til enkelte forsendelser.

**Les mer**

- {{<link "../../reference/entities/transmission">}}

## Vedlegg

Vedlegg er filer referert av en eller flere URL-er, som støtter ulike representasjoner av den samme logiske ressursen (dvs. ulike formater, som PDF, XML, JSON osv.), for enten GUI-konsumenter (dvs. sluttbruker i nettleser) eller API-konsumenter (strukturerte formater for tilpassede sluttbrukersystemer). I tillegg til URL-ene er det noen beskrivende metadata som kan brukes til å identifisere hva vedlegget er.

Vedlegg kan brukes både på forsendelse- og dialognivå.

**Les mer**

- {{<link "../../reference/entities/attachment">}}

## Handlinger

En _handling_ beskriver en interaksjon som brukere kan utføre med eller relatert til en dialog. Eksempler på handlinger er "Åpne", "Start signering", "Betal", "Bekreft", "Lær mer", "Avbryt" osv. Listen over relevante handlinger er en del av den strukturerte beskrivelsen av en dialog og kan endres når som helst av tjenesteleverandøren gjennom API-et.

En handling er enten en _"GUI"-handling_ eller en _"API"-handling_. Alle handlinger - både GUI og API - har en identifikator som kartlegger til en _handling_ (og eventuelt et [autorisasjonsattributt]({{< relref "/dialogporten/getting-started/authorization/attributes" >}})) i autorisasjonspolicyen ([XACML](../../../../authorization/reference/xacml/)) knyttet til en [tjenesteressurs]({{< relref "/dialogporten/getting-started/authorization/service-resource" >}}).

### GUI-handlinger

GUI-handlinger er ment å brukes med nettleserbaserte sluttbrukersystemer (portaler), som vanligvis gjøres synlige for brukeren i form av knapper, lenker eller lignende interaktive elementer. Tjenesteleverandøren spesifiserer om en gitt handling skal betraktes som en primær, sekundær eller tertiær handling, noe som påvirker hvordan den presenteres for brukeren. En primær handling vil typisk bli presentert som en uthevet knapp ("call to action") og brukes for det logiske neste steget. En sekundær handling (f.eks. "Avbryt") kan være en mer dempet knapp eller tekstlenke, mens en tertiær handling (f.eks. "Lær mer om denne tjenesten") kan skjules bak en nedtrekksmeny eller lignende. Alt dette er opp til den spesielle GUI som brukes til å evaluere, og forskjellige evalueringer kan gjøres avhengig av "visningen" - dvs. kontekst, tiltenkt brukergruppe osv.

Alle GUI-handlinger har en URL. Disse URL-ene brukes i front channel (dvs. nettleseren) når brukeren aktiverer handlingen, og innebærer at brukeren blir omdirigert til tjenesteleverandørens eget brukergrensesnitt der handlingen utføres, enten automatisk eller som et resultat av ytterligere brukerinteraksjon. Denne omdirigeringen skjer alltid med en GET-forespørsel, noe som sikrer at eventuelle eksisterende økter med tjenesteleverandøren brukes (dvs. at nettlesere vil sende sesjonsinformasjonskapsler), og at omdirigering via SSO-pålogging i ID-porten fungerer. Disse URL-ene må derfor returnere enten omdirigeringer eller HTML, og siden det er en GET-forespørsel, anbefales det ikke at disse handlingene direkte resulterer i tilstands-endringer.

GUI-handlinger kan imidlertid merkes som [skrivehandlinger]({{< relref "/dialogporten/getting-started/write-actions" >}}) og kan da også brukes til å gjøre tilstands-endringer.

**Les mer**

- {{<link "../write-actions">}}
- [Referanseinformasjon for GUI-handlingsenheten]({{< relref "/dialogporten/reference/entities/action#gui-handlinger" >}})

### API-handlinger

En API-handling er ment for SBS-er og portaler som bruker Dialogporten gjennom sin egen integrasjon, og tillater definering av handlinger som resulterer i direkte tilstands-endringer og tar komplekse inndata som ikke kan utføres direkte med en nettleser på grunn av sikkerhetsmekanismer. API-handlinger er versjonsstyrt og inneholder en liste over endepunkter som kan kalles, muligens med informasjon om hvorvidt et endepunkt fases ut og når dette vil skje. Hver handling inneholder også en identifikator som indikerer hva slags handling det er, og hvert endepunkt indikerer hvilken URL som må kalles for å utføre handlingen. Endepunktet inneholder også informasjon om hvilken HTTP-operasjon som skal brukes (vanligvis GET eller POST), og eventuelt en lenke til en strukturert beskrivelse (f.eks. JSON Schema) av datamodellen som enten returneres eller forventes som inndata, som kan brukes til dokumentasjonsformål.

{{<notice info>}}
Dialogporten validerer ingen data og ser ikke hvilke data som flyter mellom SBS og tjenesteleverandørens API.
{{</notice>}}

**Les mer**

- [Referanseinformasjon for API-handlingsenheten]({{< relref "/dialogporten/reference/entities/action#api-handlinger" >}})

## Aktiviteter

En _aktivitet_ beskriver en handling eller hendelse som har skjedd i forbindelse med dialogen. Hver aktivitet er en del av aktivitetshistorikken, som er en kronologisk liste over aktiviteter. Tjenesteleverandøren fyller ut aktivitetshistorikken etter hvert som ulike tilstands-endringer oppstår.

**Les mer**

- {{<link "../activity-log">}}
- {{<link "../../reference/entities/activity">}}

## Dialogetiketter

Dialoger kan tildeles ulike etiketter som brukere kan bruke for å organisere dialogene sine for å gjøre det lettere å holde oversikt og samarbeide med hverandre.

{{<notice info>}}
Etiketter påvirker ikke tilstanden til selve dialogen; dvs. dens status, innhold eller fremdrift, og kan ikke brukes til å fremme eller på annen måte påvirke dialogprosessen som definert av tjenesteeieren. Det er bare en mekanisme for å muliggjøre dialogorganisering ved å tillate brukergrensesnittet å lage visninger basert på dialogetiketter.
{{</notice>}}

Det er to hovedkategorier av etiketter; brukerdefinerte etiketter og systemetiketter.

### Brukerdefinerte etiketter

Brukerdefinerte etiketter administreres av brukerne, og kan deles med andre brukere. Noen brukerdefinerte etiketter har global effekt (dvs. synlig for alle med tilgang til dialogen), mens andre er personlige (dvs. bare synlig for brukeren som eier etikettene).

{{<notice warning>}}
Brukerdefinert etikettfunksjonalitet er under design, og vil bli gjort tilgjengelig på et senere tidspunkt. Se [nyheter]({{< relref "/dialogporten/news" >}}) -seksjonen for oppdatert informasjon.
{{</notice>}}

### Systemetiketter

Systemetiketter er forhåndsdefinerte, globale etiketter definert av Dialogporten. Disse kan tildeles til hvilken som helst dialog av enhver bruker med skrivetilgang til den aktuelle dialogen. For øyeblikket er det definert tre systemetiketter; `Archive` og `Bin` og `Default`. Å tildele `Archive`- eller `Bin`-etiketter vil vanligvis skjule dialogen fra de vanlige innboksvisningene, og vil gjøre dem tilgjengelige i andre visninger. Disse systemetikettene er gjensidig utelukkende (dvs. det kan bare ha en av disse etikettene når som helst). Som standard vil alle dialoger ha etiketten `Default`, som indikerer at standardvisning/håndtering av dialogen skal brukes.

Felles for disse to systemetikettene er at enhver endring som gjøres i dialogen av tjenesteeieren, vil tilbakestille dem til `Default`. Dvs. hvis en bruker bestemmer seg for å plassere en dialog i søppelkassen, og tjenesteeieren deretter oppdaterer den med mer informasjon, vil dialogen igjen være synlig i de vanlige visningene som om `Bin`-etiketten aldri ble tildelt.

### Etikettlogg

Dialogporten holder oversikt over etiketter, og logger hvem som utførte dem og når de ble utført. Dette inkluderer tilbakestilling av systemetiketter på grunn av dialogoppdateringer.

**Les mer**

- {{<link "../../reference/entities/systemlabel">}}

{{<children />}}

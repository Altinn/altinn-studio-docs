---
title: 'Dialoger'
description: 'Lær om hvordan Dialogporten bruker en felles modell for å uttrykke tilstanden til en digital dialog'
weight: 10
toc: true
---

## Introduksjon

Denne seksjonen forklarer dialogmodellen og dens komponenter fra et funksjonelt synspunkt. For teknisk informasjon om de forskjellige entitetene, se lenker i hver seksjon på denne siden.

For trinnvise veiledninger om hvordan du bruker Dialogporten som en sluttbruker eller tjenesteeier, se [brukerhåndbøkene]({{<relref "../../user-guides">}}).

## Dialogen

Dialogen er en abstrakt og felles modell for all pågående eller fullført kommunikasjon med en tjenesteeier, og inneholder beskrivende metadata, f.eks. hvem som er mottaker, adresser (URL), tekstlig innhold (tittel, sammendrag osv.), dato, status, en liste over relevante _handlinger_ som brukeren kan utføre, og en valgfri liste over [overføringer](#transmissions). Handlinger kan defineres vilkårlig av tjenestetilbyderen, og all interaksjon med dialogen skjer i tjenestetilbyderens brukergrensesnitt eller mot tjenestetilbyderens API-endepunkter (bortsett fra GUI-handlinger som beskriver skriveoperasjoner, se mer om dette i seksjonen [Handlinger](#actions)).

En viktig forskjell fra [Altinn Correspondence]({{<relref "/correspondence">}}) er at dialoger i Dialogporten er _mutable_. Tjenestetilbyderen kan oppdatere metadata og tilgjengelige handlinger i dialogen når som helst (med noen bemerkelsesverdige unntak). Enhver endring genererer _hendelser_, som autoriserte parter kan handle på, f.eks. sende et varsel eller få en EUS til å utføre en handling.

Dialoger bruker [UUIDv7](https://uuid7.com/) som sin identifikator. Tjenesteeier kan spesifisere ønsket UUIDv7 ved opprettelse for å muliggjøre bruk av samme identifikator på tvers av systemer og sikre idempotens. Datodelen av UUIDv7 kan ikke settes til en fremtidig dato.

**Les mer**
* {{<link "../../reference/entities/dialog">}}

## Innhold

Mens dialogen hovedsakelig inneholder metadata, er det noe innhold, nemlig en tittel, et kort sammendrag og et felt for "ytterligere informasjon", som brukes til å gi ikke-personlig tekstlig informasjon, f.eks. tjenesteeiers kontaktinformasjon eller lenker til dokumentasjon.

I tillegg kan en dialog inneholde en innholdsreferanse kalt en [front channel embeds]({{<relref "../front-channel-embeds">}}), som er en URL til et spesielt endepunkt levert av tjenesteeier som returnerer en "full" personlig tilpasset innholdspayload.

## Overføringer

En overføring brukes til å beskrive en enkelt "kommunikasjon" mellom tjenesteeier og parten i en dialog. Overføringer kan typisk være meldinger, forhåndsutfylte skjemaer og kvitteringer fra tjenestetilbyderen, eller innsendte skjemaer/meldinger fra parten relatert til dialogen. Dialogen kan inneholde null eller flere overføringer representert i en kronologisk sortert liste. Hver overføring og listen over overføringer er immutable; det er bare mulig å legge til nye overføringer i listen, ikke endre eller slette overføringer.

En overføring inneholder noen tekstlige metadata (tittel, sammendrag) som forklarer hva overføringen er, inkludert [front channel embeds]({{<relref "../front-channel-embeds">}}). I tillegg kan en overføring inneholde en eller flere [vedlegg](#attachments).

Overføringer vil som standard arve autorisasjonspolicyen for selve dialogen, men dette kan overstyres slik at individuelle overføringer indikeres som utilgjengelige hvis sluttbruker mangler privilegier, i så fall er bare metadataene tilgjengelige, men ikke noen front-channel embeds eller vedlegg.

API-handlinger og aktivitetsloggoppføringer kan referere til enkeltoverføringer.

**Les mer**
* {{<link "../../reference/entities/transmission">}}

## Vedlegg

Vedlegg er filer som det refereres til av en eller flere URL-er, og støtter forskjellige representasjoner av den samme logiske ressursen (dvs. forskjellige formater, for eksempel PDF, XML, JSON osv.), for enten GUI-konsumenter (dvs. sluttbruker i nettleser) eller API-konsumenter (strukturerte formater for tilpassede sluttbrukersystemer). I tillegg til URL-ene er det noen beskrivende metadata som kan brukes til å identifisere hva vedlegget er.

Vedlegg kan brukes på både overførings- og dialognivå.

**Les mer**
* {{<link "../../reference/entities/attachment">}}

## Handlinger

En _handling_ beskriver en interaksjon som brukere kan utføre med eller relatert til en dialog. Eksempler på handlinger er "Åpne", "Start signering", "Betal", "Bekreft", "Lær mer", "Avbryt" osv. Listen over relevante handlinger er en del av den strukturerte beskrivelsen av en dialog og kan endres når som helst av tjenestetilbyderen via API-et.

En handling er enten en _"GUI"-handling_ eller en _"API"-handling_. Alle handlinger - både GUI og API - har en identifikator som kartlegger til en _handling_ (og eventuelt et [autorisasjonsattributt]({{<relref "../authorization/attributes">}})) i autorisasjonspolicyen ([XACML]({{<relref "../../../../authorization/guides/xacml/">}})) knyttet til en [tjenesteressurs]({{<relref "../authorization/service-resource">}}).

### GUI-handlinger

GUI-handlinger er ment å brukes med nettleserbaserte sluttbrukersystemer (portaler), som vanligvis gjøres synlige for brukeren i form av knapper, lenker eller lignende interaktive elementer. Tjenestetilbyderen spesifiserer om en gitt handling skal betraktes som en primær, sekundær eller tertiær handling, noe som påvirker hvordan den presenteres for brukeren. En primær handling vil typisk presenteres som en uthevet knapp ("call to action") og brukes for det logiske neste trinnet. En sekundær handling (f.eks. "Avbryt") kan være en mer dempet knapp eller tekstlenke, mens en tertiær handling (f.eks. "Lær mer om denne tjenesten") kan skjules bak en nedtrekksmeny eller lignende. Alt dette er opp til den spesifikke GUI-en som brukes til å evaluere, og forskjellige evalueringer kan gjøres avhengig av "visningen" - dvs. kontekst, tiltenkt brukergruppe osv.

Alle GUI-handlinger har en URL. Disse URL-ene brukes i front channel (dvs. nettleseren) når brukeren aktiverer handlingen, og innebærer at brukeren blir omdirigert til tjenestetilbyderens eget brukergrensesnitt der handlingen utføres, enten automatisk eller som et resultat av ytterligere brukerinteraksjon. Denne omdirigeringen skjer alltid med en GET-forespørsel, noe som sikrer at eventuelle eksisterende økter med tjenestetilbyderen brukes (dvs. at nettlesere vil sende øktinformasjonskapsler), og at omdirigering via SSO-pålogging i ID-porten fungerer. Disse URL-ene må derfor returnere enten omdirigeringer eller HTML, og siden det er en GET-forespørsel, anbefales det ikke at disse handlingene direkte resulterer i tilstandsendringer.

GUI-handlinger kan imidlertid merkes som [skriveoperasjoner]({{<relref "../write-actions">}}) og kan da også brukes til å gjøre tilstandsendringer.

**Les mer**
* {{<link "../write-actions">}}
* [Referanseinformasjon for GUI-handlingsenheten]({{<relref "../../reference/entities/action#gui-actions">}})

### API-handlinger

En API-handling er ment for EUS-er og portaler som bruker Dialogporten gjennom sin egen integrasjon og tillater definering av handlinger som resulterer i direkte tilstandsendringer og tar komplekse inndata som ikke kan utføres direkte med en nettleser på grunn av sikkerhetsmekanismer. API-handlinger er versjonskontrollert og inneholder en liste over endepunkter som kan kalles, muligens med informasjon om hvorvidt et endepunkt fases ut og når dette vil skje. Hver handling inneholder også en identifikator som indikerer hvilken type handling det er, og hvert endepunkt indikerer hvilken URL som må kalles for å utføre handlingen. Endepunktet inneholder også informasjon om hvilken HTTP-operasjon som skal brukes (vanligvis GET eller POST), og eventuelt en lenke til en strukturert beskrivelse (f.eks. JSON Schema) av datamodellen som enten returneres eller forventes som inndata, som kan brukes til dokumentasjonsformål.

{{<notice info>}}
Dialogporten validerer ingen data og ser ikke hvilke data som flyter mellom EUS og tjenestetilbyderens API.
{{</notice>}}

**Les mer**
* [Referanseinformasjon for API-handlingsenheten]({{<relref "../../reference/entities/action#api-actions">}})

## Aktiviteter

En _aktivitet_ beskriver en handling eller hendelse som har skjedd i forbindelse med dialogen. Hver aktivitet er en del av aktivitetshistorikken, som er en kronologisk liste over aktiviteter. Tjenestetilbyderen fyller ut aktivitetshistorikken når forskjellige tilstandsendringer skjer.

**Les mer**
* {{<link "../activity-log">}}
* {{<link "../../reference/entities/activity">}}

## Dialogetiketter

Dialoger kan tilordnes forskjellige etiketter som brukere kan bruke for å organisere dialogene sine for å gjøre det lettere å holde oversikt og samarbeide med hverandre.

{{<notice info>}}
Etiketter påvirker ikke tilstanden til selve dialogen; dvs. dens status, innhold eller fremdrift, og kan ikke brukes til å fremme eller på annen måte påvirke dialogprosessen som definert av tjenesteeier. Det er bare en mekanisme for å muliggjøre dialogorganisering ved å tillate at brukergrensesnittet oppretter visninger basert på dialogetiketter.
{{</notice>}}

Det er to hovedkategorier av etiketter; brukerdefinerte etiketter og systemetiketter.

### Brukerdefinerte etiketter
Brukerdefinerte etiketter administreres av brukerne, og kan deles med andre brukere. Noen brukerdefinerte etiketter har global effekt (dvs. synlig for alle med tilgang til dialogen), mens andre er personlige (dvs. bare synlige for brukeren som eier etikettene.)

{{<notice warning>}}
Brukerdefinert etikettfunksjonalitet er under design, og vil bli gjort tilgjengelig på et senere tidspunkt. Se [nyheter]({{<relref "../../news">}}) seksjonen for oppdatert informasjon.
{{</notice>}}

### Systemetiketter
Systemetiketter er forhåndsdefinerte, globale etiketter definert av Dialogporten. Disse kan tilordnes enhver dialog av enhver bruker med skrivetilgang til den aktuelle dialogen. For øyeblikket er det definert tre systemetiketter; `Archive` og `Bin` og `Default`. Tilordning av `Archive` eller `Bin` etiketter vil vanligvis skjule dialogen fra de vanlige innboksvisningene, og vil gjøre dem tilgjengelige i andre visninger. Disse systemetikettene er gjensidig utelukkende (dvs. det kan bare ha en av disse etikettene når som helst). Som standard vil alle dialoger ha etiketten `Default`, som indikerer at standardvisning/håndtering av dialogen skal brukes.

Felles for disse to systemetikettene er at enhver endring gjort i dialogen av tjenesteeier vil tilbakestille dem til `Default`. Dvs. hvis en bruker bestemmer seg for å plassere en dialog i papirkurven, og tjenesteeier deretter oppdaterer den med mer informasjon, vil dialogen igjen være synlig i de vanlige visningene som om `Bin` -etiketten aldri ble tilordnet.

### Etikettlogg
Dialogporten holder oversikt over etiketter, logger hvem som utførte dem og når det ble utført. Dette inkluderer tilbakestilling av systemetiketter på grunn av dialogoppdateringer.

**Les mer**
* {{<link "../../reference/entities/systemlabel">}}


{{<children />}}
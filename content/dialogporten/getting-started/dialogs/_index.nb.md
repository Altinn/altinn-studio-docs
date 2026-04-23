---
title: "Dialoger"
description: "Lær hvordan Dialogporten bruker en felles modell for å uttrykke tilstanden til en digital dialog"
weight: 10
toc: true
---

## Introduksjon

Denne seksjonen forklarer dialogmodellen og komponentene dens fra et funksjonelt perspektiv. For teknisk informasjon om de ulike entitetene, se lenkene i hver seksjon på denne siden.

For steg-for-steg-veiledninger om hvordan du bruker Dialogporten som sluttbruker eller tjenesteeier, se [brukerveiledningene](/nb/dialogporten/user-guides/).

## Dialogen

Dialogen er en abstrakt og felles modell for all pågående eller fullført kommunikasjon med en tjenesteeier, og inneholder beskrivende metadata, f.eks. hvem som er mottakende part, adresser (URL-er), tekstlig innhold (tittel, sammendrag osv.), dato, status, en liste over relevante _handlinger_ som brukeren kan utføre, og en valgfri liste over [forsendelser](#forsendelser). Handlinger kan defineres fritt av tjenesteleverandøren, og all interaksjon med dialogen skjer i tjenesteleverandørens brukergrensesnitt eller mot tjenesteleverandørens API-endepunkter (med unntak av GUI-handlinger som beskriver skrivehandlinger, se mer om dette i seksjonen [Handlinger](#handlinger)).

En viktig forskjell fra [Altinn Melding](/nb/correspondence/) er at dialoger i Dialogporten er _foranderlige_. Tjenesteleverandøren kan oppdatere metadataene og tilgjengelige handlinger i dialogen når som helst, med noen få viktige unntak. Enhver endring genererer _hendelser_ som autoriserte parter kan reagere på, f.eks. ved å sende et varsel eller la et SBS utføre en handling.

Dialoger bruker [UUIDv7](https://uuid7.com/) som identifikator. Tjenesteeieren kan angi ønsket UUIDv7 ved opprettelse for å muliggjøre bruk av samme identifikator på tvers av systemer og sikre idempotens. Datodelen i UUIDv7 kan ikke settes til en fremtidig dato.

**Les mer**

- {{<link "../../reference/entities/dialog">}}

## Innhold

Selv om dialogen hovedsakelig inneholder metadata, har den også noe innhold, nemlig en tittel, et kort sammendrag og et felt for "ytterligere informasjon", som brukes til å vise ikke-personlig tekstlig informasjon, f.eks. kontaktinformasjon til tjenesteeier eller lenker til dokumentasjon.

I tillegg kan en dialog inneholde en innholdsreferanse kalt [front channel embed](/nb/dialogporten/getting-started/front-channel-embeds/), som er en URL til et spesielt endepunkt levert av tjenesteeieren og som returnerer en "full" personalisert innholdspayload.

## Forsendelser

En forsendelse brukes til å beskrive én enkelt "kommunikasjon" mellom tjenesteeieren og parten innenfor en dialog. Forsendelser kan typisk være meldinger, forhåndsutfylte skjemaer og kvitteringer fra tjenesteleverandøren, eller innsendinger/meldinger fra parten knyttet til dialogen. Dialogen kan inneholde null eller flere forsendelser representert i en kronologisk sortert liste. Hver forsendelse og listen over forsendelser er uforanderlige; det er bare mulig å legge nye forsendelser til listen, ikke å endre eller slette eksisterende forsendelser.

En forsendelse inneholder noe tekstlig metadata, som tittel og sammendrag, som forklarer hva forsendelsen er, inkludert [front channel embed](/nb/dialogporten/getting-started/front-channel-embeds/). I tillegg kan en forsendelse inneholde ett eller flere [vedlegg](#vedlegg).

Forsendelser arver som standard autorisasjonspolicyen til selve dialogen, men dette kan overstyres slik at individuelle forsendelser markeres som utilgjengelige hvis sluttbrukeren mangler rettigheter. I så fall er bare metadataene tilgjengelige, ikke front-channel-embed eller vedlegg.

API-handlinger og aktivitetsloggoppføringer kan referere til enkeltforsendelser.

**Les mer**

- {{<link "../../reference/entities/transmission">}}

## Vedlegg

Vedlegg er filer som refereres av én eller flere URL-er, og støtter ulike representasjoner av samme logiske ressurs, f.eks. ulike formater som PDF, XML og JSON, enten for GUI-konsumenter (sluttbruker i nettleser) eller API-konsumenter (strukturerte formater for tilpassede sluttbrukersystemer). I tillegg til URL-ene finnes det beskrivende metadata som kan brukes til å identifisere hva vedlegget er.

Vedlegg kan brukes både på forsendelsesnivå og dialognivå.

**Les mer**

- {{<link "../../reference/entities/attachment">}}

## Handlinger

En _handling_ beskriver en interaksjon som brukere kan utføre med eller relatert til en dialog. Eksempler på handlinger er "Åpne", "Start signering", "Betal", "Bekreft", "Les mer", "Avbryt" osv. Listen over relevante handlinger er en del av den strukturerte beskrivelsen av en dialog og kan endres når som helst av tjenesteleverandøren gjennom API-et.

En handling er enten en _"GUI-handling"_ eller en _"API-handling"_. Alle handlinger, både GUI og API, har en identifikator som kobles til en _action_ i autorisasjonspolicyen ([XACML](/nb/authorization/reference/xacml/)) knyttet til en [tjenesteressurs](/nb/dialogporten/getting-started/authorization/service-resource/). I tillegg kan den valgfritt knyttes til et [autorisasjonsattributt](/nb/dialogporten/getting-started/authorization/attributes/).

### GUI-handlinger

GUI-handlinger er ment å brukes i nettleserbaserte sluttbrukersystemer, altså portaler, der de vanligvis vises til brukeren som knapper, lenker eller lignende interaktive elementer. Tjenesteleverandøren angir om en gitt handling skal regnes som en primær, sekundær eller tertiær handling, noe som påvirker hvordan den presenteres for brukeren. En primær handling vil typisk presenteres som en fremhevet knapp ("call to action") og brukes for det logiske neste steget. En sekundær handling, f.eks. "Avbryt", kan være en mer nedtonet knapp eller tekstlenke, mens en tertiær handling, f.eks. "Les mer om denne tjenesten", kan være skjult bak en nedtrekksmeny eller lignende. Alt dette er opp til det konkrete GUI-et som brukes, og ulike vurderinger kan gjøres avhengig av "visningen", dvs. kontekst, målgruppe osv.

Alle GUI-handlinger har en URL. Disse URL-ene brukes i front channel, dvs. i nettleseren, når brukeren aktiverer handlingen, og innebærer at brukeren videresendes til tjenesteleverandørens eget brukergrensesnitt der handlingen utføres, enten automatisk eller som resultat av videre brukerinteraksjon. Denne videresendingen skjer alltid med en GET-forespørsel, slik at eksisterende sesjoner hos tjenesteleverandøren brukes, dvs. at nettleseren sender sesjonscookies, og at videresending via SSO-innlogging i ID-porten fungerer. Disse URL-ene må derfor returnere enten redirects eller HTML, og siden det er en GET-forespørsel anbefales det ikke at disse handlingene direkte fører til tilstandsendringer.

GUI-handlinger kan imidlertid merkes som [skrivehandlinger](/nb/dialogporten/getting-started/write-actions/) og kan da også brukes til å gjøre tilstandsendringer.

**Les mer**

- {{<link "../write-actions">}}
- [Referanseinformasjon for GUI-handlingsentiteten](/nb/dialogporten/reference/entities/action#gui-handlinger)

### API-handlinger

En API-handling er ment for SBS-er og portaler som bruker Dialogporten gjennom egen integrasjon, og gjør det mulig å definere handlinger som fører til direkte tilstandsendringer og tar kompleks input som ikke kan utføres direkte med en nettleser på grunn av sikkerhetsmekanismer. API-handlinger er versjonerte og inneholder en liste over endepunkter som kan kalles, eventuelt med informasjon om hvorvidt et endepunkt fases ut og når dette vil skje. Hver handling inneholder også en identifikator som angir hva slags handling det er, og hvert endepunkt angir hvilken URL som må kalles for å utføre handlingen. Endepunktet inneholder også informasjon om hvilken HTTP-operasjon som skal brukes, vanligvis GET eller POST, og eventuelt en lenke til en strukturert beskrivelse, f.eks. JSON Schema, av datamodellen som enten returneres eller forventes som input, som kan brukes til dokumentasjonsformål.

{{<notice info>}}
Dialogporten validerer ikke data og ser ikke hvilke data som flyter mellom SBS-et og tjenesteleverandørens API.
{{</notice>}}

**Les mer**

- [Referanseinformasjon for API-handlingsentiteten](/nb/dialogporten/reference/entities/action#api-handlinger)

## Aktiviteter

En _aktivitet_ beskriver en handling eller hendelse som har oppstått i forbindelse med dialogen. Hver aktivitet er en del av aktivitetshistorikken, som er en kronologisk liste over aktiviteter. Tjenesteleverandøren fyller aktivitetshistorikken etter hvert som ulike tilstandsendringer skjer.

**Les mer**

- {{<link "../activity-log">}}
- {{<link "../../reference/entities/activity">}}

## Dialogetiketter

Dialoger kan tildeles ulike etiketter som brukere kan benytte for å organisere dialogene sine, slik at det blir enklere å holde oversikt og samarbeide med hverandre.

{{<notice info>}}
Etiketter påvirker ikke tilstanden til den faktiske dialogen, dvs. status, innhold eller fremdrift, og kan ikke brukes til å drive frem eller på annen måte påvirke dialogprosessen slik den er definert av tjenesteeieren. Det er kun en mekanisme for å muliggjøre organisering av dialoger ved at brukergrensesnittet kan lage visninger basert på dialogetiketter.
{{</notice>}}

Det finnes to hovedkategorier etiketter: brukerdefinerte etiketter og systemetiketter.

### Brukerdefinerte etiketter

Brukerdefinerte etiketter administreres av brukerne, og kan deles med andre brukere. Noen brukerdefinerte etiketter har global effekt, dvs. er synlige for alle som har tilgang til dialogen, mens andre er personlige, dvs. bare synlige for brukeren som eier etikettene.

{{<notice warning>}}
Funksjonalitet for brukerdefinerte etiketter er fortsatt under utforming og vil bli gjort tilgjengelig på et senere tidspunkt. Se [nyheter](/nb/dialogporten/news/) for oppdatert informasjon.
{{</notice>}}

### Systemetiketter

Systemetiketter er forhåndsdefinerte, globale etiketter definert av Dialogporten.

De implementerte etikettene er:

- `Default`
- `Bin`
- `Archive`
- `MarkedAsUnopened`
- `Sent`

`Default`, `Bin` og `Archive` utgjør en gjensidig utelukkende gruppe. En dialog vil alltid ha én av disse etikettene, og når en av dem tildeles, erstatter den de to andre.

`MarkedAsUnopened` brukes for å tvinge dialoginnhold til å bli behandlet som usett.

`Sent` legges til automatisk når dialogen inneholder en forsendelse av typen `Submission` eller `Correction`. Den kan ikke legges til eller fjernes manuelt.

Felles for `Bin` og `Archive` er at enhver endring som tjenesteeieren gjør i dialogen, vil tilbakestille dem til `Default`. Dvs. hvis en bruker velger å legge en dialog i papirkurven, og tjenesteeieren deretter oppdaterer den med mer informasjon, vil dialogen igjen bli synlig i ordinære visninger som om `Bin` aldri var satt.

### Etikettlogg

Dialogporten holder oversikt over endringer i ikke-standard systemetiketter, og logger hvem som utførte dem og når de ble utført. Dette inkluderer også fjerninger som skjer når en dialog tilbakestilles fra `Bin` eller `Archive` tilbake til `Default`.

**Les mer**

- {{<link "../../reference/entities/systemlabel">}}

{{<children />}}

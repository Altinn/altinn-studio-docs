---
title: 'Front channel embeds'
description: 'Referanseinformasjon om front channel embeds'
weight: 1
toc: true
---

## Introduksjon

Se [komme i gang med front channel embeds]({{<relref "../../../getting-started/front-channel-embeds">}}) for en introduksjon.

Nedenfor er begrepene som brukes på denne siden.

Sluttbrukersystem (SBS)
: SBS brukes til å beskrive systemet som sluttbrukeren bruker - vanligvis klientsiden av en nettleserapplikasjon, som kjører JavaScript eller WebAssembly-kode.

Innholdsleverandørs system (ILS)
: Innholdsleverandørs system er systemet som svarer på endepunktene (URLer) som FCE refererer til. Dette er vanligvis tjenesteleverandørplattformen (som Altinn 3).

## Grunnleggende trinn

1. Sluttbrukersystemet (SBS) identifiserer et bestemt innhold som en front channel embed
2. Sluttbrukersystemet utfører (uten brukerinteraksjon) en forespørsel til det spesifiserte endepunktet med dialogtoken
3. Innholdsleverandørs system (ILS) svarer med data i samsvar med den definerte innholdsmedietypen
4. Sluttbrukersystemet håndterer svaret, gjengir dataene i samsvar med den definerte innholdsmedietypen, og bygger inn dataene i brukergrensesnittet

### Trinn 1: identifisere en front-channel embed

Se [innholdstyper]({{<relref "../../content-types">}}) for en liste over innholdsfelt der en FCE kan brukes som en medietype. Denne listen kan endres, så SBS-implementatorer anbefales å håndtere FCE-medietyper på alle innholdsfelt.

FCE-medietypene kan identifiseres ved prefikset `application/vnd.dialogporten.frontchannelembed-url`. Alle FCE-er gir imidlertid også et eksternt innholdstypesuffiks, som indikerer hvilken type data endepunktet hos ILS kan forventes å returnere. For øyeblikket er to formater tillatt (for Markdown og HTML), noe som gir oss disse gyldige medietypene:

* `application/vnd.dialogporten.frontchannelembed-url;type=text/markdown`
* `application/vnd.dialogporten.frontchannelembed-url;type=text/html`

#### Eksempel

```jsonc
{
  // Content on dialog level (defining only a "nb" translation)
  "content": {
    // ...
    "mainContentReference": {
      "value": [
        {
          "value": "https://example.com/fce?lang=nb",
          "languageCode": "nb"
        }
      ],
      "mediaType": "application/vnd.dialogporten.frontchannelembed-url;type=text/markdown"
    }
  },
  // Content on transmission level (defining only a "nb" translation)
  "transmissions": [{
    // ...
    "content": {
      "contentReference": {
        "value": [
          {
            "value": "https://example.com/fce?lang=nb",
            "languageCode": "nb"
          }
        ],
        "mediaType": "application/vnd.dialogporten.frontchannelembed-url;type=text/markdown"
      }
    }
  }]
}
```


### Trinn 2: Utføre forespørselen (ved hjelp av CORS-protokollen)

Når den er identifisert, MÅ SBS utføre en GET-forespørsel til det spesifiserte endepunktet ved hjelp av en HTTP-klientmekanisme som støtter enten HTTP 1.1 eller 2.0. Forespørselen MÅ inneholde en `Authorization: Bearer <dialog token>` header, ved hjelp av dialogtoken som følger med dialogen. SBS MÅ sørge for at dialogtoken ikke er eldre enn 10 minutter. Et nytt dialogtoken utstedes med hver forespørsel til dialogdetaljer-endepunktet i Dialgporten sluttbruker-API (enten REST eller GraphQL).

SBS KAN levere en `Origin`-header i samsvar med CORS-protokollen. SBS BØR IKKE levere noen informasjonskapsler som tilhører domenet til ILS-endepunktet.

### Trinn 3: Håndtere forespørselen ved ILS-endepunktet

ILS MÅ validere det mottatte token ved å sjekke tokensignaturen mot de Dialogporten publiserte JWKs, og sjekke at tokenet ikke er utløpt. Ytterligere valideringer KAN utføres (dvs. sjekke "actions"-kravet). ILS KAN validere `Origin`-headeren, men MÅ IKKE stole på denne headeren alene for autorisasjonsformål, da dette lett kan forfalskes.

Gitt en vellykket autorisasjon og ingen andre feiltilstander, MÅ ILS svare med en `200 OK` og en `Content-Type`-header som samsvarer med den eksterne innholdsdelen av medietypen for FCE (for øyeblikket enten `text/markdown` eller `text/html`) og en kropp som inneholder innholdet for FCE. Kroppen KAN være tom, i så fall KAN ILS bruke svarkoden `204 No Content`.

I tilfelle feil oppstår, se [feilhåndtering](#feilhåndtering) nedenfor.

### Trinn 4. Håndtere svaret

SBS MÅ følge omdirigeringer (3xx) svar, men MÅ også håndtere uendelige omdirigeringer ved å begrense antall omdirigeringer til et tall som ikke er mindre enn 5. SBS MÅ sørge for at den returnerte `Content-Type`-headeren samsvarer med den for FCE-medietypen. FCE MÅ håndtere en tom responskropp, der ingen UI-endringer skal skje, slik at ILS kan bruke FCE-er som en måte å utløse eksterne prosesser på.

Gitt et vellykket svar (200) og en ikke-tom kropp, bør SBS gjengi innholdet og injisere det i brukergrensesnittet etter eget skjønn.

I tilfelle feil oppstår, se [feilhåndtering](#feilhåndtering) nedenfor.

## Feilhåndtering

Eventuelle feil som oppstår på ILS-siden MÅ resultere i at en 4xx eller 5xx HTTP-statuskode returneres til SBS. Dette bør følge standard HTTP-semantikk (dvs. 4xx er feil på klientsiden og 5xx er feil på serversiden).

{{% notice info %}}
Merk at sluttbrukeren svært sjelden har "skylden" for at FCE-feil oppstår, og vil ha få, om noen, måter å rette opp situasjonen på. Feilmeldinger bør derfor være av generisk art, og bare vise spesifikke detaljer om feilen til brukeren når det er handlingsrettet informasjon tilgjengelig.
{{% /notice %}}

ILS KAN levere en RFC9457 Problem Details-responskropp, og legge til ytterligere detaljer om feiltilstanden som oppsto, inkludert et "details"-felt med menneskelig lesbar informasjon som SBS KAN vise til sluttbrukeren for støtteformål. Feildetaljene MÅ lokaliseres til språket som er angitt av innholdsfeltet.

SBS MÅ håndtere 5xx og 4xx ved å vise en generisk, lokalisert feilmelding, og KAN inkludere ILS-leverte detaljer, hvis tilgjengelig. SBS BØR ta grep for å gjøre det klart for sluttbrukeren hvilken informasjon som ble gitt av ILS. Både SBS og ILS BØR logge feilen som oppsto for videre diagnose.

## Begrensninger

Her er begrensningene for FCE eksterne innholdstyper som både ILS og SBS må overholde:

### Generisk (HTTP osv)

* Responskropper MÅ IKKE overstige 100 KB
* SBS-klienter BØR avslutte forespørselen hvis ingen respons er mottatt etter 10 sekunder, og vise en generisk feilmelding

### Markdown og HTML

* ILS-implementatorer MÅ sørge for at den returnerte markdown overholder gjeldende [CommonMark specification](https://commonmark.org/) (0.31.2).
* SBS-implementatorer BØR bruke et velkjent bibliotek for gjengivelse, i samsvar med begrensningene som er oppført nedenfor.
* Den resulterende HTML-en som gjengis til sluttbrukeren MÅ kun bestå av taggene som er spesifisert nedenfor. Både ILS og SBS MÅ ta grep for å sikre dette.
* Alle attributter som forårsaker skriptutførelse er ikke tillatt MÅ IKKE produseres av ILS og MÅ strippes av SBS
* SBS BØR tydelig indikere at eventuelle lenker som peker til eksterne URLer faktisk er eksterne, og legge til [rel="noreferrer"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noreferrer) attributter til ankertaggene


### Tillatte tagger
| HTML Tag         | Hensikt              | Markdown Ekvivalent                     |
| ------------------------ | --------------------------------- | ----------------------------------------------------------- |
| `<p>`          | Avsnitt            | Vanlig tekst atskilt med en blank linje            |
| `<em>`          | Kursiv / vektlegging         | `*kursiv*` eller `_kursiv_`                  |
| `<strong>`        | Fet / sterk vektlegging      | `**fet**` eller `__fet__`                  |
| `<ul>` / `<ol>` / `<li>` | Lister               | `- element`, `1. element`                     |
| `<a>`          | Lenker               | `[lenke](https://example.com)`                |
| `<code>`         | Innebygd kode            | `` `innebygd kode` ``                     |
| `<pre><code>`      | Kodeblokker            | <pre><code>\`\`\`js<br>const x = 1;<br>\`\`\`</code></pre> |
| `<blockquote>`      | Sitater            | `> sitert tekst`                       |
| `<hr>`          | Horisontal linje/separator     | `---` eller `***`                       |
| `<h1>`–`<h6>`      | Overskrifter             | `# H1`, `## H2`, ..., `###### H6`              |
| `<br>`          | Linjeskift            | Linje slutter med 2+ mellomrom + Enter              |

{{<children />}}
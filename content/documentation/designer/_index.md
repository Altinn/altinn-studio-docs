---
title: Tjenester 3.0 - Designer
linktitle: Designer
description: Løsning for å komponenere tjenestens brukergrensesnitt, definere arbeidsflyt, endre instillinger, deploye, etc.
tags: ["tjenester 3.0"]
weight: 100
---


{{<figure src="t3-designer.png?width=1000" title="Definering av layout for tjenesten \"Starte Enkeltpersonforetak\"">}}

**Altinn Designer** vil være en brukervennlig løsning, som fagpersoner og andre kan benytte for å **lage** tjenester basert på gjenbruk
og konfigurering av allerede ferdig utviklede "byggeklosser".

Eksempler på ulike typer slike byggeklosser er layouts, tema, web-komponenter, oversatte tekster, API-kall, kodelister og steg i arbeidsflyt.

I bakgrunnen så vil den brukervennlige designeren benytte Git mot [Repositories](../repositories/) for å lagre det som lages,
på samme måte som en teknisk utvikler bruker f.eks. Visual Studio Code til det samme.

{{% panel theme="info" header="Kildekoden for Designer ligger i VSTS" %}}https://altinn.visualstudio.com/tjenester3.0/_git/AltinnCore{{% /panel %}}

{{% notice info %}}
Bildene som benyttes for Designer er hentet fra en [teknisk proof-of-concept](../../toc-mtp-mvp). Endelig produkt vil nok se litt annerledes ut.
{{% /notice %}}

## Funksjonalitet i "Designer"

Designer kan sees på som en samling av brukervennlige editorer, eller applikasjoner, som hver spesialiserer på å definere et gitt aspekt
av en [3.0-tjeneste](../repositories/#3-0-tjeneste) på en så rask og effektiv måte som mulig. Flyten mellom de ulike applikasjonene skal oppleves
som naturlig og effektiv for tjenesteutvikler.
Resultatet fra en applikasjon vil være én eller flere filer som versjonskontrolleres i [Repositories](../repositories/).

Dette gjør at hver editor i Designer kan ha fokus på sin oppgave, og man minimerer sjansen for at Designer blir en stor og
lite vedlikeholdbar monolitt.
Det gjør også at editorer over tid enklere kan byttes ut, eller erstattes av mer spesialiserte eller forbedrede alternativer, som enten er 
del av Designer eller som er kjørende helt utenfor.

Den samme "byggeklossmentaliteten" skal også gjelde for hvordan hver enkelt editor utvikles. Det skal gjøres enkelt for tjenesteeierene å selv
både utvide editorer med ny funksjonalitet (plugins) der det gir mening, samt konfigurere den enkelte editor slik at den i størst mulig grad
tilpasses både den enkelte tjenesteeiers- og tjenesteutviklers behov.

### Funksjonelle områder

Under vises en klikkbar archimate-figur med de viktigste funksjonelle områdene (eller prosessene) i Designer.

<div style="text-align: center;">
<object data="t3-designer-archimate.svg" type="image/svg+xml" style="width: 100%;"></object>
</div>

### Bygge brukergrensesnitt

Det å raskt og effektivt kunne bygge brukervennlige brukergrensesnitt for en tjeneste er en sentral egenskap med tjenester 3.0.  
Implementering av editorer som skal understøtte dette vil også være en av de største tekniske utfordringene.

I praksis så er dette et "live" designsystem, med følgende funksjonalitet:

- Velge eller endre [overordnet layout](#overordnet-layout) / look & feel
- Definere én eller flere **visninger** for tjenesten
  - Definere **navigasjon** mellom visninger, må være bedre enn [dagens sporvalg]
- Definere **detaljert layout** pr. side (responsivt design)
- Legge til gjenbrukbare [webkomponenter](#web-komponent) i den detaljerte layouten
  - Konfiguering av den enkelte webkomponent
- Kobling mot **datamodell** og **server-side API** (samme regler og valideringer skal fungere også uten brukergrensesnitt)
- Kobling mot **tekster/oversettinger**

[dagens sporvalg]: https://altinn.github.io/docs/guides/tul/tjenestetyper/innsending/#sporvalg

Det vil mao. være behov for flere ulike editorer for å realisere all funksjonaliteten.  
Et viktig prinsipp er at de ulike editorene i størst mulig grad skal være løst koblet i forhold til hverandre,
og konsekvensen av eventuelle avhengigheter skal vurderes *nøye* før de innføres.

{{<figure src="ux-editor.gif?width=1000" title="Drag'n drop av web komponenter">}}

### Eksporter skjema som JSON
- Trykk på knappen på toppen av skjemaet og det blir lastet ned en "form.json"-fil.
- Datastukturen i json dokumentet er likt det i felles redux-state:
```
{
  containers: [
    {
      rows: [
        {
          cols: [
            {
              formElements: ["..."]
            }
          ]
        }
      ]
    }
  ]
}
```
- Her har vi da containers som inneholder rader, som inneholder kolonner, som igjen inneholder alle elementene.
- Denne strukturen er veldig nøstet og det jobbes med å få en flatere modell.

### Bygge APIer

På samme måte som at tjenester kan ha brukergrensesnitt (UX), så skal også en tjeneste kunne ha ett eller flere API, altså tekniske grensesnitt.
Derfor må det være mulig å bygge og teste API'er, og det skal også være mulig å lage tjenester helt uten UX.

En potensiell fordel ved å kunne ha egne API'er pr. tjeneste er at dokumentasjon og definisjon av API'ene kan spisses og gjøres bedre og enklere
å ta i bruk. Dette i kontrast til de [generelle API'ene](https://altinn.github.io/docs/guides/integrasjon/sluttbrukere/api/),
der payload bare er en tekststreng som vil variere basert på hvilken TUL-tjeneste som benyttes.

:warning: Pga. ønske om bakoverkompatibilitet, så er det en ambisjon at dagens generelle API'er også skal fungere med 3.0-tjenester.

Her er vi litt i tenkeboksen i forhold til hva som er mulig å få til, og hvordan dette kan fungere.


### Skape gjenbrukbare ressurser

Et viktig poeng med tjenester 3.0 er at det skal legges til rette for at utviklere skal kunne utvikle ressurser som så kan 
gjenbrukes av både andre utviklere og fagpersoner som benytter Designer.

Gjenbrukbare ressurser lages typisk av tekniske utviklere ved bruk av kodeeditor.

{{<figure src="react-code-example.png?width=1000" title="Utvikling av en ny React web component">}}

#### Web komponent

Når man [bygger brukergrensesnitt](#bygge-brukergrensesnitt), så vil man benytte og konfigurere ferdiglagde webkomponenter.
Komponentene vil være basert på [React](../../teknologi/react/), og vil variere i størrelse og kompleksitet. Webkomponenter uvikles i kodeeditor.

Noen grunnleggende krav:

- Komponentene skal være fleksible og kunne konfigureres (istedenfor at vi skal måtte utvikle mange like komponenter)
- Komponentene skal kunne kobles mot datamodell, og bruke tilgjengelige metadata i modellen
- Komponentene skal kunne kobles mot tekster
- Komponentene skal understøtte responsivt design og WCAG 2 AA
- Det skal være enkelt for tjenesteeier å legge til flere komponenter

![React logo](react-icon.svg?width=100)

#### Overordnet layout

Når man [bygger brukergrensesnitt](#bygge-brukergrensesnitt) så skal det være mulig å velge en overordnet layout (aka "look&feel").  
F.eks. tjenestens kompleksitet ("informasjons-tetthet") eller ønske om egen branding kan være grunner til at det er behov for å kunne velge
blandt flere layouts.

- Create reuasable artifacts

  - Look&feel
  - Texts and translations
  - Code lists
  - Logic (C#? TypeScript? WebAssembly?)
  - Data models (Seres?)
  - API calls
- Reuse these artifacts

F.eks. det å lage nye web componenter og layouts vil typisk være noe som tekniske utviklere gjør i kode-editorer.  
Det å sette disse sammen og konfigurere dem, er noe alle skal kunne gjøre.


### Bruke APIer

For å kunne understøtte "once-only", så er det essensielt at det er enkelt å gjøre kall mot andre systemers API'er fra en 3.0-tjeneste.
For å forenkle dette kan en mulig løsning være å støtte en type gjenbrukbar asset av type "API-plugins", som gjør det enkelt å gjøre kall.  
En ukjent faktor er den kommende "API-katalogen", og hvilke egenskaper den vil tilby.

- Enkel bruk av API'er.
- Se på det som gjøres i NADOBE.
- Må bort fra dagens mappere

Dette er et område som ikke ble sett på i PoC.

### Definere logikk

Logikk som kjører i tjenesten. Er _ekstremt_ viktig å få dette riktig, brukervennlig og fungerende på tvers av kanaler og på tvers av front-end
og back-end.

### Definere arbeidsflyt

Definere arbeidsflyt for en tjeneste. Må være **MYE** kraftigere og mer fleksibel enn det som finnes i dagens løsning.
Målsettingen er å muliggjøre at vi kan **fjerne** de ulike [tjenestetypene i dagens løsning](https://altinn.github.io/docs/guides/tul/tjenestetyper/).

Tanken er at hvis man både kan gjøre henting av data (innsyn) og ta i mot meldinger, og gjøre en eller flere arkivering, så faller behovet for
tjenestetyper bort. Behovet for samhandlingstjenesten forsvinner også.

En annen veldig spennende tanke er at dette også åpner opp for å "koble sammen" dialogen for brukeren, siden det da per. def ikke er noe å koble sammen.
Hele dialogen er bare ulike steg i den samme tjenesten, og siden man også kan legge til API'er på en 3.0-tjeneste, så åpner det opp
for at tjenesteeier modellerer flyten istedenfor at den må passe inn i et mønster som er bestemt av Altinn.

Stegene i en arbeidsflyt skal også være del av selve tjenesten som deployes, og ikke kjøre i plattformen slik som i dag.
Dette åpner opp for stor grad av tilpasninger, gjør at hele flyten kan enhetstestes, og gjør at tjenesten i større grad blir immun
mot påvirkning fra endringer i plattformen. En naturlig vei å gå vil være å benytte de samme mekanismene for å kunne gjenbruke og (re)definere
arbeidsflyt og GUI per steg, som for GUI for tjenestene. Og da er vi veldig nærme det at arbeidsflyt ikke er noe eget, det er det samme som 
flyten internt i et skjema.

Eksempler på steg: 

- Signering
- Hente prefill, gjøre oppslag mot eksterne data
- Gjøre eksterne valideringer via API
- Motta melding via API
- Gjøre ekstern signering
- Egendefinerte steg, med UX

{{<figure src="workflow.png?width=1000" title="Banalt enkel implementasjon av arbeidsflyt">}}

### Modellere data

Tanken er at det å ha en modell for tjenestedataene vil gi en del fordeler, som f.eks. enhetlig validering på tvers av kanaler, 
enklere å automatisere testing, enklere å avdekke feil i regler, formell definisjon av dataformat for eksterne systemer, etc.

- Enkel modellering av data
- Innebygd erstatning for SERES ifbm. tjenesteutvikling
- Må støtte flere formater, sannsynligvis et JSON-format som default, og som kan konverteres til XML for de eksterne som foretrekker det
- For å forenkle konvertering av dagens XSD-baserte InfoPath-skjema, så må konvertering til/fra disse formatene støttes i runtime

{{<figure src="data-modelling.png?width=1000" title="Editor for enkel datamodellering">}}

### Tekstredigering og oversettelse

Enkel of effektiv behandling av tekster og oversettinger er utrolig viktig i en tjenesteuviklingsløsning, og ikke minst enkel gjenbruk
av tekster på tvers av flere tjenester.

Editoren for tekster skal lagre hvert språk som enkel JSON-fil som effektivt kan jobbes direkte på i kodeeditorer
eller konverteres til formater som eksterne oversettelsesverktøy benytter. Dette gjør også at 3.0 kan støtte vilkårlige språk,
selv språk som ikke er støtte av Altinn-portalen.

- Definering av tekster med hierarkiske og lesbare nøkler
- Gjenbruk av tekster, internt på tvers av sider og i valideringer, og fra nivåene over tjenesten
- Oversetting
- Kunne legge til vilkårlige språk

{{<figure src="oversetting.png?width=1000" title="Editor for oversetting av tekster">}}


### Automatisk testing

Automatisert testing av alle 3.0-tjenester som utvikles vil gi en veldig positiv effekt, både på kvalitet og redusert tidsbruk
over tid. Det å ha en [datamodell](#modellere-data) gjør at det blir enklere å f.eks. automatisk generere opp initielle tester, og
detektere tester som er blitt ugyldige.

- Legge opp til automatisert testing av alle tjenester
- Selenium / API ?

Dette er et område som ikke ble sett på i PoC.

{{<figure src="testing.png?width=1000" title="Editor for automatisert testing">}}

### Konfigurering

TODO
### Deployment

3.0-tjenester skal når som helst kunne deployes til produksjon, uten å måtte involvere Altinn-organisasjonen eller dens leverandører.
Designer vil typisk gjøre API-kall mot Repositories for å få tilbake en liste over [releaser](../repositories/#release-management),
og så gjøre et API-kall mot [Runtime](../runtime/) for å initiere deploy.

- Selvbetjent deploy til testmiljøer og prod

### Manuell testing

Samme [Runtime](../runtime/) som vil kjøre i altinn.no vil også benyttes for testing av tjenester i Designer.
Dette betyr at enhetstesting av UX og API'er vil gi stor grad av sikkerhet,
siden det er samme runtime-koden som vil kjøre både i prod og under utvikling.
En annen positiv effekt er at mer tekniske utviklere faktisk kan gjøre realistisk lokal debugging og stepping i runtime-koden.
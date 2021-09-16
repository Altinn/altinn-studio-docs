---
title: WCAG
description: God tilgjengelighet hjelper mennesker med funksjonshemninger å oppfatte innholdet vårt på en meningsfull måte. Ved å bruke Altinn 3 får du mye på kjøpet, men noen ting må du fortsatt huske på selv. 
weight: 7
weight: 30
---

Forskrift om universell utforming av IKT-løsninger stiller krav om at nettsider må oppfylle 35 av 61 suksesskriterier i standarden [Retningslinjer for tilgjengelig webinnhold (WCAG) 2.0](https://www.w3.org/Translations/WCAG20-no/). Sjekk ut [minimumskravene](https://www.uutilsynet.no/wcag-standarden/wcag-20-standarden/86) på UU-tilsynet som er omfattet av forskriften.




## Sjekkliste

- **Innholdsstruktur** <br>
Sjekk at du har en logisk struktur på overskrifter (H1 - H4), og at du ikke har noen tomme overskriftselementer. Det er fort gjort å glemme et nivå. For å oppdage feil i innholdstrukturen kan det være nyttig å benytte “Wave” som er et utvidelsesverktøy til chrome. [Last ned Wave til Chrome], installer og ikonet vil dukke opp øverst til høyre i nettleseren.

[Last ned Wave til Chrome]: https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh

- **Forklarende tekster og hjelpetekst** <br>
Sjekk at lenker, label og knapper har forklarende tekster. Ta en vurdering på om ekstra beskrivelser og hjelpetekster må kobles til input elementet.

- **Knapp vs lenke** <br>
Det er viktig at man er bevisst på om det blir brukt knapper eller lenker, da skjermlesere kan få problemer med å tolke funksjonaliteten. 

- **Feilmeldinger** <br>
Du er selv ansvarlig for at [korrekte feilmeldinger](/planlegging-og-design/guidelines/innhold/#formulering-av-feilmeldinger) blir lagt inn på hvert av skjemafeltene. 

<br>


{{% panel theme="warning" %}}
**NB:** Skal du lage tjenester i egen løsning, der Altinns grensesnitt er usynlig for brukeren, må du selv huske på å ta hensyn til øvrige [WCAG-krav](https://www.uutilsynet.no/wcag-standarden/nettsteder/711). 
{{% /panel %}}

## Hvordan teste
Det er viktig at dere tester at tjenesten deres er tilgjengelig for alle. Dette vil ikke bare hjelpe deres tjeneste, men det kan også belyse feil som har oppstått eller blitt oversett hos oss. Her er noen verktøy som kan brukes til å gjøre enkle tester.

**Tastaturnavigasjon**
<br>Sjekk at alle knapper og inputfelter kan nåes ved tastaturnavigasjon.

**Skjermleser**
<br>Gå gjennom flyten med en skjermleser som hjelpemiddel. Her kan du forsikre deg om at alt blir lest opp riktig og at tekstene er beskrivende nok. 

Mac
<br>VoiceOver er forhåndsinstallert på Apples mobiler og PCer. [VoiceOver Brukerveiledning](https://support.apple.com/no-no/guide/voiceover/welcome/mac)

Windows
<br>NVDA Screenreader er et gratis skjermleser verktøy laget av NV Access 
[Om NVDA Screenreader](https://www.nvaccess.org/about-nvda/)

## Kontrast

Følgende fargekombinasjoner som er brukt på Altinn oppfyller kravene til kontrast i liten tekst. AA er minstekravet, mens AAA er anbefalt, særlig for løpende tekst.

<div>
<div class="ap-swatch" style="background: #022F51;">
<div class="ap-colorCircle" style="border: 1px solid #1EAEF7; color: #1EAEF7; font-size: 20px; line-height: 36px;">AA</div>
<div class="ap-colorCircle" style="border: 1px solid #CFF0FF; color: #CFF0FF; font-size: 20px; line-height: 36px;">AAA</div>
<div class="ap-colorCircle" style="border: 1px solid #fff; color: #fff; font-size: 20px; line-height: 36px;">AAA</div>
</div>
<div class="ap-swatch" style="background: #0062ba;">
<div class="ap-colorCircle" style="border: 1px solid #CFF0FF; color: #CFF0FF; font-size: 20px; line-height: 36px;">AA</div>
<div class="ap-colorCircle" style="border: 1px solid #fff; color: #fff; font-size: 20px; line-height: 36px;">AA</div>
</div>
<div class="ap-swatch" style="background: #1eaef7;">
<div class="ap-colorCircle" style="border: 1px solid #000; color: #000; font-size: 20px; line-height: 36px;">AAA</div>
</div>
<div class="ap-swatch" style="background: #cff0ff;">
<div class="ap-colorCircle" style="border: 1px solid #0062BA; color: #0062BA; font-size: 20px; line-height: 36px;">AA</div>
<div class="ap-colorCircle" style="border: 1px solid #022f51; color: #022f51; font-size: 20px; line-height: 36px;">AAA</div>
<div class="ap-colorCircle" style="border: 1px solid #000; color: #000; font-size: 20px; line-height: 36px;">AAA</div>
</div>
<div class="ap-swatch" style="background: #17c96b;">
<div class="ap-colorCircle" style="border: 1px solid #000; color: #000; font-size: 20px; line-height: 36px;">AAA</div>
</div>
<div class="ap-swatch" style="background: #e23b53;">
<div class="ap-colorCircle" style="border: 1px solid #000; color: #000; font-size: 20px; line-height: 36px;">AA</div>
</div>
<div class="ap-swatch" style="background: #efefef;">
<div class="ap-colorCircle" style="border: 1px solid #6a6a6a; color: #6a6a6a; font-size: 20px; line-height: 36px;">AA</div>
<div class="ap-colorCircle" style="border: 1px solid #000; color: #000; font-size: 20px; line-height: 36px;">AAA</div>
</div>
<div class="ap-swatch" style="background: #ffffff;">
<div class="ap-colorCircle" style="border: 1px solid #6a6a6a; color: #6a6a6a; font-size: 20px; line-height: 36px;">AA</div>
<div class="ap-colorCircle" style="border: 1px solid #0062BA; color: #0062BA; font-size: 20px; line-height: 36px;">AA</div>
<div class="ap-colorCircle" style="border: 1px solid #022f51; color: #022f51; font-size: 20px; line-height: 36px;">AAA</div>
<div class="ap-colorCircle" style="border: 1px solid #000; color: #000; font-size: 20px; line-height: 36px;">AAA</div>
</div></div>
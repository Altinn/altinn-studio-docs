---
title: Grid og layout
description: Altinn’s responsive brukergrensesnitt er basert på en 12-kolonners grid layout, samt et sett definerte avstander som tar utgangspunkt i 12px som base.
toc: true
weight: 5
---

## Bootstrap grid
Vi har brukt Bootstrap's responsive gridsystem (fra aplha v4) for å bygge malene. Systemet baserer seg på **flexbox**. Les mer om grid-systemet hos [Bootstrap](http://v4-alpha.getbootstrap.com/layout/grid/)

### Hvordan grid-systemet skal brukes

Dette står også i Bootstraps dokumentasjon, men kort oppsummert består grid-systemet av tre hovedkomponenter: "containers", "rows", og "columns".

1. **"Containers"** sentrerer innholdet på siden.
<code>.container</code> for fast bredde eller <code>.container-fluid</code> for full bredde.
3. **"Rows"** er horisontale grupper av kolonner som sikrer at kolonnene blir stilt opp riktig.
4. **"Columns"** er barn av "rows" og det er i der inneholdet skal bli plassert.

- En rad (row) må tilsammen utgjøre 12 kolonner. Man kan for eksempel kobinere 4+4+4=12, 3+3+3+3=12, osv..
- Klassenavn på "Columns" indikerer antall kolonner man vil bruke ut av 12 mulige innengfor en "row". Så hvis du vil ha tre like brede kolonner, vil du bruke klassen <code>.col-sm-4</code>. (4 + 4 + 4 = 12)
- Kolonnenes bredde blir satt i prosent, så de er alltid fluid og relative til deres forelder.
- Kolonnene har horisontal padding to for å lage avstand mellom hver individuelle kolonne.
- Det er fem grid-nivåer, en for hver responsive breakpoint: : xs, s, m, l, og xl.


## Breakpoints

```
$grid-breakpoints: (
  // Extra small screen / phone
  xs: 0,
  // Small screen / phone
  sm: 544px,
  // Medium screen / tablet
  md: 768px,
  // Large screen / desktop
  lg: 992px,
  // Extra large screen / wide desktop
  xl: 1200px
) !default;
```

## CSS3 Media queries
@media blir brukt for å definere ulik stilsetting for ulike medietyper, skjermstørrelser og enheter. CSS-kode som skal være forskjellig på forskjellige skjermstørrelser lages for mobil først - deretter utvider vi for større skjermer. Eksempel:

```
.a-navbar {
  width: 100%;

  @include media-breakpoint-up(md) {
    width: 300px;
  }
}
```

Les mer på [Bootstraps nettsider](http://v4-alpha.getbootstrap.com/layout/overview/#responsive-breakpoints)


## Avstander

```css
// SPACE

$spacer : 12px;	// 12px

$spacer/2;			// 6px
$spacer*1.5;		// 18px
$spacer*2;			// 24px
$spacer*3;			// 36px
$spacer*4;			// 48px
$spacer*5; 			// 60px
$spacer*6;			// 72px
```

### Gjenbrukbare klasser for avstander

Klassene refereres til med {property}-{sides}-{size}

F.eks "pr-1" vil sette padding right til 12px. "mt-2" vil sette margin top til 24px. Her kan man også bruke mediaquery-klasser, f.eks ved å sette "pl-md-3" så vil man få en padding left på 36 px for skjermer større enn md (768px).

Les mer på [Bootstraps nettsider](http://v4-alpha.getbootstrap.com/components/utilities/#spacing)

## Vertikal midtstilling

Når tekst skal sentreres innenfor en ramme, slik som for eksempel på en knapp, skal teksten sentreres basert på høyden til versalene i fonten (de store bokstavene). Slik figuren viser vil dermed avstanden fra toppen av k-en til toppen av knappen være større enn avstanden fra bunnen av p-en til bunnen av knappen.

!["Viser ekstra høyde på knapp"](midtstilling_eksempel.png)


## Interaktive elementer

Av hensyn til ulike brukeres fingerstørrelse og førlighet skal alle interaktive elementer ha touch-target på minimum 48px. Det vil si at selv om en knapp kan se ut som den er 36px høy vil ethvert trykk innenfor 48px utløse knappen.

!["Viser ekstra høyde på knapp"](clickable_eksempel.png)

Dette løses ved å legge til et pseudo-element med en høyde på 48px og sentrere det, se kodeutsnittet under.

```
&:after {
  content: "";
  width: 100%;
  height: 48px;
  position: absolute;
  left: 0;
  top: -6px;
}
```

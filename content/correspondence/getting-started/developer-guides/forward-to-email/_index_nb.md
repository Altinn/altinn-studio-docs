---
title: Videresende melding til e-post
linktitle: Videresende melding til e-post
description: Hvordan tillate sluttbrukere å videresende meldinger til en e-postadresse
tags: [Correspondence, videresending, epost, guide]
toc: true
weight: 40
---

{{<children />}}

## Videresending av en Altinn-melding på e-post

Tjenesteeiere kan bestemme, per melding, om sluttbrukere skal kunne videresende den til en e-postadresse de selv velger.

{{% notice note %}}
Denne funksjonaliteten er under utvikling og er foreløpig ikke tilgjengelig for sluttbrukere. Tjenesteeiere kan allerede nå merke nye meldinger som tillatt for videresending, slik at de er klare når funksjonen lanseres.
{{% /notice %}}

### Kom i gang

Når du initialiserer en melding kan du legge til feltet `allowForwarding`,for å markere meldingen som trygg å videresende på e-post.
For å aktivere videresending på epost setter du `allowForwarding` til `true`:

```json
{
  "correspondence": {
    ...,
    "allowForwarding": true
  }
}
```

Feltet er valgfritt og har standardverdien `false`. Videresending er derfor bare mulig når du eksplisitt har aktivert det.

### Begrensninger

- Meldinger kan videresendes på e-post både med og uten vedlegg. Den samlede størrelsen på alle vedlegg kan likevel ikke overstige 10 MB. Hvis grensen overskrides, kan brukeren fortsatt videresende selve meldingen, men vedleggene blir ikke med på grunn av begrensninger i e-posttjenesten.
- Meldinger som sendes på tjenester som bruker tilgangspakken *post-til-virksomhet-med-taushetsbelagt-innhold*, kan ikke videresendes på e-post.

### Sikkerhetsmessige konsekvenser

{{% notice warning %}}
Når en melding videresendes på e-post, gjelder ikke lenger sikkerhetsnivået som Altinn normalt håndhever.
Tjenesteeiere som aktiverer videresending, er selv ansvarlige for å sikre at innholdet i meldingen ikke er konfidensielt og er trygt å sende på e-post.
{{% /notice %}}
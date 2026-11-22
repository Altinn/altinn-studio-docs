---
title: Videresende melding på e-post
linktitle: Videresende melding på e-post
description: Hvordan tillate sluttbrukere å videresende meldinger til en e-postadresse
tags: [Correspondence, videresending, e-post, guide]
toc: true
weight: 40
---

{{<children />}}

## Videresending av en Altinn-melding på e-post

Tjenesteeiere kan bestemme, per melding, om sluttbrukere skal kunne videresende den til en e-postadresse de selv velger.


### Kom i gang

Når du oppretter en melding, kan du legge til feltet `allowForwarding` for å markere meldingen som trygg å videresende på e-post.
For å aktivere videresending på e-post setter du `allowForwarding` til `true`:

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

- Meldinger som sendes på tjenester som bruker tilgangspakken *post-til-virksomheten-med-taushetsbelagt-innhold*, kan ikke videresendes på e-post.
- Brukeren kan videresende den samme meldingen til den samme e-post mottakeren to ganger: en gang med vedlegg og en gang uten.
- For videresending av en melding med vedlegg gjelder alt-eller-ingenting, enten blir alle vedleggene med, eller ingen av dem. Brukeren kan bare videresende selve meldingen, uten vedlegg, hvis
  - brukeren ikke har tilgang til et eller flere av vedleggene
  - et eller flere av vedleggene har en utløpstid (`expirationTime`)
  - den totale størrelsen til vedleggene er større enn 10 MB

### Sikkerhetsmessige konsekvenser

{{% notice warning %}}
Når en melding videresendes på e-post, gjelder ikke lenger sikkerhetsnivået som Altinn normalt håndhever.
Tjenesteeiere som aktiverer videresending, er selv ansvarlige for å sikre at innholdet i meldingen ikke er konfidensielt og er trygt å sende på e-post.
{{% /notice %}}

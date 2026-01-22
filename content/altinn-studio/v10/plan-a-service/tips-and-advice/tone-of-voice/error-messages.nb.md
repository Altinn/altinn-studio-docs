---
draft: true
title: Feilmeldinger i tjenesten
description: Feilmeldinger skal hjelpe brukeren videre når noe går galt.
weight: 6
tags: [needsReview, translate-to-english]
---

Feilmeldinger vises når brukeren gjør noe som ikke fungerer, eller når systemet støter på et problem. En god feilmelding forklarer hva som er galt og hvordan brukeren kan løse problemet.

## Krav til gode feilmeldinger

En god feilmelding skal

- komme på riktig tid og sted
- ikke skape tvil
- trygge brukeren
- foreslå en løsning

## Vis feilen på riktig sted og til riktig tid

Feilmeldinger skal vises så nært det aktuelle feltet som mulig, og så snart som mulig etter at feilen oppstår.

**Inline-validering** (validering mens brukeren fyller ut) gir raskest tilbakemelding. Plasser feilmeldingen rett under det aktuelle feltet, med tydelig merking av feltet som har feil.

Vanligvis bruker vi rød farge og gjerne et symbol for å vise feil. Bruk
https://designsystemet.no/no/patterns/errors for å få oppdatert informasjon om hvordan vi merker feil.

## Ikke skap tvil

Feilmeldinger må fortelle hva som er galt og hva brukeren kan gjøre – på et språk brukeren forstår.

Unngå:
- Teknisk sjargong og fagtermer
- Feilkoder uten forklaring
- Vage meldinger som «noe gikk galt»

❌ «Validering feilet for felt organisasjonsnummer»

✅ «Organisasjonsnummeret må være 9 siffer.»

## Trygg brukeren

Når noe går galt, kan brukeren bli usikker på om de har gjort noe feil, eller om de kan miste data. Feilmeldingen skal være tydelig og forståelig, uten å være anklagende.

Unngå «du har gjort feil» – fokuser på hva som må rettes.

❌ «Du har skrevet feil fødselsnummer.»

✅ «Fødselsnummeret må være 11 siffer.»

## Foreslå en løsning

En god feilmelding forklarer ikke bare hva som er galt, men også hvordan brukeren kan løse problemet.

### Når feilen skyldes utfyllingen

Forklar hva som er feil og hva som er riktig format.

✅ «E-postadressen må inneholde @»

✅ «Datoen må være i formatet DD.MM.ÅÅÅÅ»

### Når feilen skyldes systemet

Forklar hva som har skjedd, trygg brukeren om at det ikke er deres feil, og si hva de kan gjøre.

✅ «Vi kunne ikke lagre endringene dine på grunn av en teknisk feil. Prøv igjen. Hvis problemet fortsetter, ta kontakt med kundesenteret vårt.»

Gi gjerne brukeren to valgmuligheter:
- En mulighet til å fikse det selv (for eksempel «Prøv igjen»)
- En utvei hvis det ikke fungerer (for eksempel lenke til kundesenteret)

## Oppsummerende feilmeldinger

Hvis et skjema har flere feil, vis en oppsummering med lenker til hvert felt som har feil. Dette gjør det lettere for brukeren å se hva som må rettes.

### Plassering av oppsummeringen

Plasser oppsummeringen nær **Neste**- eller **Send inn**-knappen, slik at brukeren forstår sammenhengen mellom feilene og hvorfor de ikke kommer videre.

Vis oppsummeringen øverst på siden hvis
- den tekniske løsningen laster siden på nytt når brukeren velger **Neste**
- brukeren har gått ut av og inn i skjemaet igjen
- løsningen ikke hindrer brukeren i å gå videre til neste side selv om det er feil

### Innhold i oppsummeringen

Oppsummeringen skal
- vise alle feilmeldinger som gjelder siden eller steget
- ha klikkbare lenker som fører brukeren direkte til feltet med feil
- fjerne feil fra listen etter hvert som brukeren retter dem
- bruke samme tekst i lenken som i feilmeldingen ved feltet

Inkluder stikkord fra feltnavnet i feilmeldingen, for eksempel «Postnummer må ha 4 siffer» eller «Postnummeret må ha fire siffer».

Les mer om hvordan du setter opp feilmeldinger teknisk på
https://designsystemet.no/no/patterns/errors

## Tips til arbeidet med feilmeldinger

- Kontroller tekst like grundig som design og kode.
- Ta med deg en feilmelding til vurdering i dailyen.
- Test meldingen på noen utenfor teamet ditt.

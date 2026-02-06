---
title: Klientadministrasjon API
description: Denne veiledningen forklarer hvordan du bruker klientadministrasjons-API-et.
linktitle: Klientadministrasjon
toc: false
---

Altinn tilbyr nå et klientadministrasjons-API for å håndtere klienter og brukere for tjenestetilbydere.

## Hva er en tjenestetilbyder?

I denne sammenhengen er en tjenestetilbyder en virksomhet som:

- Er registrert som regnskapsfører for andre virksomheter i Enhetsregisteret (ER).
- Er registrert som revisor for andre virksomheter i Enhetsregisteret.
- Er registrert som forretningsfører for andre virksomheter i Enhetsregisteret.
- Har blitt delegert en eller flere tilgangspakker for virksomheter og personer i Altinn.

## Hva er en klient?

- Virksomhet som har registrert din virksomhet i Enhetsregisteret som regnskapsfører.
- Virksomhet som har registrert din virksomhet i Enhetsregisteret som revisor.
- Virksomhet som har registrert din virksomhet i Enhetsregisteret som forretningsfører.
- Virksomhet som i Altinn har delegert tilgangspakker til din virksomhet.

## Hva består klientrettigheter av?

Klientrettigheter består av tilgangspakker som tjenestetilbyder kan videredelegere til brukere i Altinn som er registrert som agenter for tjenestetilbyderen.

For tilganger gitt via Altinn tilgangsstyring kan dette omfatte alle tilgangspakker for virksomheter og personer. 

For klientrelasjoner registrert i Enhetsregisteret gir disse relasjonene følgende:

### Regnskapsfører

Rollen regnskapsfører i Enhetsregisteret gir [følgende tilgangspakker](https://platform.altinn.no/accessmanagement/api/v1/meta/info/roles/46e27685-b3ba-423e-8b42-faab54de5817/packages?variant=AS) som kan videredelegeres.

Klikk på pakkenavnet for å se hvilke konkrete rettigheter disse pakkene gir til tjenester.

- Tilgangspakken [Regnskapsfører lønn](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/43becc6a-8c6c-4e9e-bb2f-08fe588ada21)
- Tilgangspakken [Regnskapsfører med signeringsrettighet](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/955d5779-3e2b-4098-b11d-0431dc41ddbe)
- Tilgangspakken [Regnskapsfører uten signeringsrettighet](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/a5f7f72a-9b89-445d-85bb-06f678a3d4d1)

### Revisor

Rollen revisor i Enhetsregisteret gir [følgende tilgangspakker](https://platform.altinn.no/accessmanagement/api/v1/meta/info/roles/f76b997a-9bd8-4f7b-899f-fcd85d35669f/packages?variant=AS) som kan videredelegeres.

Klikk på pakkenavnet for å se hvilke konkrete rettigheter disse pakkene gir til tjenester.

- Tilgangspakken [Ansvarlig revisor](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/2f176732-b1e9-449b-9918-090d1fa986f6)
- Tilgangspakken [Revisormedarbeider](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/96120c32-389d-46eb-8212-0a6540540c25)

### Forretningsfører

Når du er registrert som forretningsfører for en virksomhet som enten er borettslag eller eierseksjonssameie, får du [følgende tilgangspakke](https://platform.altinn.no/accessmanagement/api/v1/meta/info/roles/348b2f47-47ee-4084-abf8-68aa54c2b27f/packages?variant=BRL).

- Tilgangspakken [Forretningsfører eiendom](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/0195efb8-7c80-7cf2-bcc8-720a3fb39d44)

## Hvem kan få videredelegerte klientrettigheter?

Alle personer med fødselsnummer/D-nummer i Altinn kan tildeles klientrettigheter.



## Beskrivelse av API

API-et lar deg:

- Legge til nye brukere i virksomheten
- Gi brukere klientrettigheter for en klient ved å videredelegere tilgangspakker.
- Liste brukere med rettigheter for en klient.




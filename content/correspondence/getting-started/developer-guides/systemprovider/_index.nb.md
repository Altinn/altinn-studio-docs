---
title: Kom i gang systemleverandør
linktitle: Systemleverandør
description: "Systemleverandør: tilbyr sluttbrukersystem som gjennom en maskin-til-maskin-integrasjon som (blant annet) kan motta motta Altinn Melding."
tags: []
toc: false
weight: 20
---

{{<children />}}

**Anbefalt mønster: System-til-system-integrasjon for meldingshåndtering

For virksomheter som håndterer større volum av meldinger eller meldinger med omfattende vedlegg, anbefales det å benytte system-til-system-integrasjon fremfor manuell oppfølging i Altinns brukergrensesnitt.
Altinn er designet med dette som et grunnleggende mønster. Innboksen i GUI er primært egnet for manuell behandling i mindre skala, mens effektiv håndtering av større mengder meldinger forutsetter integrasjon.
Ved å integrere sak-/arkivsystemet med Altinn via Dialogporten og tilhørende API-er kan virksomheten:

- Automatisk oppdage og hente nye meldinger
- Laste ned meldinger og alle vedlegg maskinelt
- Journalføre og arkivere direkte i eget system
- Redusere manuelle operasjoner og risiko for feil

Dette muliggjør en arbeidsflyt der saksbehandling skjer i eget fagsystem, med Altinn som transport- og distribusjonskanal.
Dette integrasjonsmønsteret er etablert praksis, og benyttes av virksomheter med behov for skalerbar, effektiv og robust meldingshåndtering.


{{% expandlarge id="onboarding-process" header="Onboarding prosess" %}}

Leverandører av sluttbrukersystemer som ønsker å få tilgang til funksjonalitet og tjenester i test- og produksjonsmiljø, må følge denne [onboarding-prosessen](https://samarbeid.digdir.no/altinn/kom-i-gang/2868).
{{% /expandlarge %}}


{{% expandlarge id="service-integration" header="Integrasjon mot tjenester" %}}

Se hvilke tjenester du kan sette opp integrasjon mot [her](https://samarbeid.digdir.no/altinn/integrasjon-mot-tjenester/2412).
{{% /expandlarge %}}


{{% expandlarge id="get-access-to-scopes" header="Tilgang til scopes" %}}

For å kunne autentisere og sikre at du kan utføre operasjoner via meldings-APIet, må Altinn gi deg tilgang på de scopes du trenger. Dette sikrer at kun autoriserte klienter kan sende og motta filer, og opprettholder dermed sikkerheten i tjenesten. 
- Oversikt over aktuelle scopes finner du [her](https://samarbeid.digdir.no/altinn/scopeoversikt-produkt-og-funksjonsomrade/3017).
- For å få tilgang til scopes, send en forespørsel til: [servicedesk@altinn.no](mailto:servicedesk@altinn.no). Forespørselen må inneholde de scopes du trenger for ditt system.
{{% /expandlarge %}}

{{% expandlarge id="test-end-user-system" header="Test sluttbrukersystem" %}}

Bare tjenesteeiere har tilgang til å sende meldinger med Correspondence API-et.
For å teste sluttbrukersystemet kan du sende en forespørsel til [servicedesk@altinn.no](mailto:servicedesk@altinn.no) og spørre om de kan sende meldinger til en bestemt mottaker i testmiljøet.
I forespørselen bør du oppgi hvilken mottaker servicedesk skal sende testmeldinger til, hvor mange testmeldinger og eventuelle føringer til meldingsinnholdet.

Meldinger sendt til testmiljøet kan leses på [af.tt02.altinn.no](https://af.tt02.altinn.no/).

Testmottakere kan hentes hos [Tenor testdata](https://www.skatteetaten.no/testdata/).
{{% /expandlarge %}}

### Kontakt oss:

Du når oss på vår Slack kanal Digdir samarbeid: [produkt-dialogporten](https://digdir-samarbeid.slack.com/archives/C069J6N7S00)

Eller ved å sende forespørsel til: [servicedesk@altinn.no](mailto:servicedesk@altinn.no)

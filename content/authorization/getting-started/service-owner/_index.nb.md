---
title: Kom i gang som tjenesteeier
linktitle: For tjenesteeiere
description: Finn riktig veiledning for å beskytte tjenester, gi tilgang og støtte systemer som bruker Altinn Autorisasjon
weight: 2
toc: true
---

Velg oppgaven som ligner mest på det du skal gjøre. Hvert løp forklarer hva du skal ende opp med, og hvilke veiledninger du bør følge.

Tjenesteeieren har ansvar for ressursen, reglene og den endelige tilgangskontrollen. En systemleverandør kan gjennomføre integrasjonen, men tjenesteeieren må bestemme hvem som skal få gjøre hva.

## Beskytte en ekstern tjeneste eller et API

**Passer når:** En tjeneste utenfor Altinn skal bruke Altinn Autorisasjon til å avgjøre om en person eller et system har tilgang.

**Du skal ende opp med:** En registrert ressurs og policy, et API som ber PDP om en beslutning, og en kontroll som bare gir tilgang ved et uttrykkelig Permit.

1. [Sett opp tilgangen til Ressursadministrasjon.](../resourceadministration/)
2. [Opprett og publiser ressursen og policyen.](../../guides/resource-owner/create-resource-resource-admin/)
3. [Integrer tjenesten med Authorized Parties og PDP.](../../guides/resource-owner/generic-access-resource/integrating-link-service/)
4. [Velg ID-porten eller Maskinporten for autentisering.](../authentication/)
5. [Kontroller status og begrensninger før produksjonssetting.](../../reference/status/)

API-et ditt er Policy Enforcement Point (PEP). Det må avvise Deny og NotApplicable, og behandle Indeterminate eller manglende svar som en teknisk feil. Tekniske feil skal aldri gi tilgang.

## Gjøre et API tilgjengelig for systembrukere

**Passer når:** Et system skal kalle API-et uten en innlogget person, og virksomheten skal godkjenne hvilke tilganger systemet får.

**Du skal ende opp med:** En ressurs som kan inngå i en systemregistrering, en policy som støtter systembruker og et API som kontrollerer systembrukertokenet.

1. [Les hva tjenesteeieren må legge til rette for ved bruk av systembruker.](../../guides/resource-owner/system-user/)
2. [Opprett eller oppdater ressursen.](../../guides/resource-owner/create-resource-resource-admin/)
3. Bestem om systemet skal handle for egen virksomhet eller for kunder.
4. Avtal tilgangspakker, handlinger og Maskinporten-scopes med systemleverandøren.
5. Test feil virksomhet, feil systembruker, feil klient og manglende tilgang.

Et gyldig Maskinporten-token gir ikke i seg selv tilgang til alle operasjoner. API-et må fortsatt kontrollere ressursen, handlingen og parten.

## La virksomheter delegere tilgang til tjenesten

**Passer når:** En virksomhet skal kunne gi en ansatt, en annen person eller en leverandør tilgang til tjenesten.

**Du skal ende opp med:** Tjenesten er lagt i en tilgangspakke som beskriver en forståelig arbeidsoppgave, og policyen bruker pakken for de aktuelle handlingene.

1. [Finn tilgangspakken som passer oppgaven.](../../what-do-you-get/accesspackages/business/)
2. [Se hvordan roller fra Enhetsregisteret kan gi pakker på forhånd.](../../what-do-you-get/accesspackages/register_er/)
3. Knytt handlingene i policyen til pakken.
4. Test direkte tildeling, forhåndstildeling og manglende tilgang.
5. Kontakt servicedesk hvis ingen eksisterende pakke dekker behovet.

Velg pakken ut fra oppgaven brukeren skal utføre, ikke ut fra navnet på stillingen eller systemet.

## Gi bare utvalgte virksomheter tilgang

**Passer når:** Tjenesten skal være begrenset til en bestemt gruppe virksomheter.

**Du skal ende opp med:** En tilgangsliste som tjenesteeieren forvalter, og en regel som krever at virksomheten står på listen.

- [Se når tilgangslister passer.](../../guides/resource-owner/accesslist/)
- [Administrer tilgangslister i Ressursadministrasjon.](../../guides/resource-owner/accesslist/manage-accesslists-resource-admin/)
- [Administrer tilgangslister gjennom API-et.](../../guides/resource-owner/accesslist/manage-accesslist-api/)

Tilgangslisten erstatter ikke autentisering eller øvrige regler. Test virksomheter både på og utenfor listen.

## Dele bestemte data etter samtykke

**Passer når:** En person eller virksomhet skal godkjenne at en bestemt mottaker får hente avgrensede data for et bestemt formål.

**Du skal ende opp med:** En samtykkeressurs, en samtykkeforespørsel og et API som kontrollerer samtykketokenet før data deles.

1. [Få oversikt over samtykke for tjenesteeiere.](../../guides/resource-owner/consent/)
2. [Opprett og publiser samtykkeressursen.](../../guides/resource-owner/consent/create-resource/)
3. Avtal formål, varighet og datamodell med datakonsumenten.
4. [Kontroller samtykketokenet før data deles.](../../guides/resource-owner/consent/validate-concent/)

Ikke bruk samtykke som en generell eller varig fullmakt.

## Støtte representasjon for en innlogget bruker

**Passer når:** Brukeren skal velge hvilken person eller virksomhet handlingen gjelder for, eller handle som verge eller annen representant.

**Du skal ende opp med:** Et forståelig aktørvalg og en endelig tilgangskontroll for den valgte parten, ressursen og handlingen.

- Bruk Authorized Parties til å finne aktuelle parter.
- Ikke bruk listen over parter som endelig tilgangskontroll.
- [Integrer med Authorized Parties og PDP.](../../guides/resource-owner/generic-access-resource/integrating-link-service/)
- [Les hva tjenesten må ta hensyn til ved vergemål.](../guardianship/)

## Før produksjonssetting

Kontroller at ressursen og policyen er publisert i riktig miljø, at forventet og avvist tilgang er testet, og at trukket tilbake tilgang får virkning. Logger skal støtte feilsøking uten komplette token eller unødvendige personopplysninger.

[Kontroller gjeldende status for Altinn Autorisasjon.](../../reference/status/)

---
title: Klientdelegering
description: Denne veiledningen viser deg hvordan du som sluttbruker kan legge til klienter på en systemtilgang for kunder.
linktitle: Klientdelegering
weight: 2
---

## Tildeling av klienter til systemtilgang

Dersom du oppretter en systembruker for klientforhold, kan klienter tildeles i Altinn-portalen. Dette steget gjelder ikke dersom du oppretter en systembruker for eget system. Om du utøver tjenester på vegne av en annen virksomhet og dette skal gjøres ved hjelp av Systembruker, må klient-virksomheten gi fullmakt til dette til din virksomhet.

### Automatiske klientforhold

Noen klientforhold opprettes automatisk basert på roller registrert i Enhetsregisteret. Disse forholdene gir deg tilgang til å bruke visse tilgangspakker når du oppretter en systembruker for klientforhold.

Tabellen under viser hvilke tilgangspakker som er tilgjengelige basert på din rolle i Enhetsregisteret:

| ER-rolle             | Tilgjengelige tilgangspakker                                                                                                                                                              | Organisasjonsform |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| **Revisor**          | `urn:altinn:accesspackage:ansvarlig-revisor`<br>`urn:altinn:accesspackage:revisormedarbeider`                                                                                             | Alle              |
| **Regnskapsfører**   | `urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet`<br>`urn:altinn:accesspackage:regnskapsforer-uten-signeringsrettighet`<br>`urn:altinn:accesspackage:regnskapsforer-lonn` | Alle              |
| **Forretningsfører** | `urn:altinn:accesspackage:forretningsforer-eiendom`                                                                                                                                       | ESEK, BRL         |

Når du oppretter en systembruker for klientforhold, må du spesifisere hvilke tilgangspakker systembrukeren skal ha tilgang til. Disse pakkene må være i tråd med rollene du har i Enhetsregisteret.

> **NB:** Tilgangspakker for klientforhold fungerer kun for "AND"-tilfeller. Dette betyr at hvis en systembruker for klientforhold har flere tilgangspakker, må klienten ha **enten direkte delegert eller fått delegering gjennom ER-rollen** for **alle** pakkene for at systembrukeren skal fungere. For eksempel: Hvis systembrukeren for klientforhold har både jordbrukspakken og regnskapsfører-pakken, må klienten ha delegert jordbrukspakken eksplisitt (direkte delegert) i tillegg til å ha fått delegering for regnskapsfører-pakken gjennom ER-rollen (som kommer automatisk).

### Forutsetninger

- Du må ha tilgang til Altinn som **Klientadministrator** eller **Daglig leder**.
- Det finnes en systemtilgang for kunder [som er godkjent](/nb/authorization/guides/end-user/system-user/accept-request/#godkjenne-systemtilgang-for-klienter).

### Prosess i Altinn-portalen

1. Gå til oversikten over systemtilganger [i testmiljøet](https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/overview). I dette eksempelet logger vi på som daglig leder i virksomheten "DISKRET NÆR TIGER AS" og velger å representere virksomheten "DISKRET NÆR TIGER AS".
   ![klientdelegering steg 1](klientdelegering1.png)
2. Velg en eksisterende systemtilgang for kunder. I dette eksempelet velger vi systemtilgangen "Revisor klientdelegering".
   ![klientdelegering steg 2](klientdelegering2.png)
3. Trykk **+ Legg til kunder**  
   ![klientdelegering steg 3](klientdelegering3.png)
4. Legg til klienter til systemtilgangen, en av gangen, ved å trykke **Legg til i systemtilgang**. I dette eksempelet legger vi til "Revisorkunde AS". Hvis du ikke ser noen klienter i denne modalen, er ikke klientforholdet satt opp. Se [egen guide for å sette opp dette](/nb/authorization/guides/end-user/system-user/setup-client-relationship/).
5. Trykk **Bekreft og lukk** etter klienter er lagt til.
   ![klientdelegering steg 4](klientdelegering4.png)

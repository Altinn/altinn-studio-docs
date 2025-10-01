---
title: Systembruker veiledning
linktitle: Systembruker
description: Veiledning for systemleverandører for å integrere mot og sette opp systembrukere i sitt sluttbrukersystem.
toc: false
aliases:
  - nb/authentication/guides/systemvendor/
---

## Opprettelse

Systembrukeren opprettes av virksomhet eller tjenestetilbyder som ønsker å bruke et sluttbrukersystem for integrasjon mot Altinn eller andre offentlige tjenester.
Opprettelse kan skje via sluttbrukerstyrt opprettelse eller leverandørstyrt opprettelse.

**Sluttbrukerstyrt opprettelse**
Ved sluttbrukerstyrt opprettelse er det kunden selv som går inn i Altinn og velger systemet han ønsker opprette systembruker for fra en nedtrekksliste.
Etter systemet er valgt blir det presentert hvilke rettigheter sluttbrukersystemet krever. Ved å akseptere dette blir systembrukeren opprettet.

**Leverandørstyrt opprettelse**
Ved leverandørstyrt opprettelse er det sluttbrukersystem-leverandøren som initierer opprettelsen. Dette skjer mens kunden er i sluttbrukersystemet. Leverandøren lager en forespørsel om opprettelse av systembruker, med tilhørende rettigheter, i Altinn. I retur får hen en URL kunden kan sendes til for å godkjenne opprettelsen. Etter opprettelsen er godkjent vil kunden sendes tilbake til sluttbrukersystemet.

## Bruksmønster

Systembruker kan kjøres under forskjellige bruksmønstre ut fra hvordan kundeforholdet er med sluttbrukersystemleverandør.

### Systembruker på vegne av seg selv - Eget system

> Tidligere omtalt som standard systembruker

I dette brukstilfelle jobber kunden i programvare innkjøpt fra leverandør (ev. egenutviklet) og opptrer på vegne av seg selv mot tjenestene som benyttes.
Systembrukeren kan opprettes både gjennom sluttbrukerstyrt og leverandørstyrt opprettelse.
Den som godkjenner opprettelsen må ha rollen tilgangsstyrer og selv ha fullmakten(e) som systembrukeren krever.

![Leverandørstyrt opprettelse av kundestyrt system](eget_system.png)
Bildet viser leverandørstyrt opprettelse

### Systembruker på vegne av kunder/klienter - Klientsystem

> Tidligere omtalt som agent systembruker

Klientsystem benyttes når kunden av systemet er en tjenesteleverandør som jobber på vegne av sine klienter/kunder i sluttbrukersystemet.
Et typisk eksempel på dette er regnskapsførere som fører regnskap for sine kunder i et regnskapssystem, uten at kunden har noe forhold til det underliggende systemet.
Tjenesteleverandøren kan få fullmakter for kunden på to måter:

1. Enhetsregisteret
   Her får tjenestetilbyder rettigheter ved at det er oppført et forhold i Enhetsregisteret. Dette gjelder forholdene Regnskapsfører (REGN), Revisor (REVI) og Forretningsfører (FFØR).
   Disse fullmaktene kan klientdelegeres til en systembruker med tilsvarende rettigheter.
2. Virksomhet til virksomhet delegering
   Tilgangsstyrer i en virksomhet gir fullmakt på organisasjonsnivå (delegerer til orgnr).
   Virksomhetsdelegering omfatter kunde-leverandørforhold som oppstår ved at kunde aktivt delegerer en eller flere tilgangspakker til sin leverandør.
   Når en tjenesteleverandør har mottatt en fullmakt kan klientadministrator hos tjenesteleverandør videredelegere denne til klientsystem med tilsvarende fullmakter.

Felles for begge er at kunden ikke trenger gjøre mer enn å delegere fullmakt på en av de ovennevnte måtene.
Dersom kundeforholdet fjernes/slettes fra Enhetsregisteret eller virksomhetsdelegeringen revokeres av kunden vil alle klientdelegeringer for den aktuelle fullmakten automatisk fjernes.
Klientdelegering til systembruker kan gjøres via brukergrensesnitt eller via API.

> Klientsystemer kan kun opprettes med leverandørstyrt opprettelse.

![Klientsystem](klient_system.png)

{{<children />}}

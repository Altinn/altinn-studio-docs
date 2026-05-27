---
title: 'Skrivehandlinger'
description: 'Referanseinformasjon om skrivehandlinger'
weight: 1
---

## Introduksjon

Se [komme i gang med skrivehandlinger]({{<relref "../../../getting-started/write-actions">}}) for en introduksjon.

Nedenfor er begrepene som brukes på denne siden.

Sluttbrukersystem (SBS)
: SBS brukes for å beskrive systemet sluttbrukeren benytter, vanligvis klientsiden av en nettleserapplikasjon som kjører JavaScript- eller WebAssembly-kode.

Innholdsleverandørs system (ILS)
: Innholdsleverandørsystemet er systemet som svarer på endepunktene, altså URL-ene som FCE-en refererer til. Dette er vanligvis tjenesteleverandørplattformen, som Altinn 3.
{.dpdl}

## Utføring av forespørsler

Skrivehandlinger MÅ implementeres i SBS-et med en HTTP-klient som sender [dialogtoken]({{<relref "../../authorization/dialog-tokens">}}) som autorisasjonsheader. En `Origin`-header KAN oppgis i samsvar med CORS-protokollen. HTTP-metoden som skal brukes finnes i `httpMethod`-egenskapen på GUI-handlingen. Request body bør være tom.

## Håndtering av forespørsler

Endepunktet i ILS-et MÅ verifisere det oppgitte [dialogtokenet]({{<relref "../../authorization/dialog-tokens">}}) for å autorisere forespørselen. ILS-et MÅ implementere CORS-protokollen for å støtte nettleserbaserte SBS-er.

Ved vellykket autorisasjon MÅ ILS-et enten:
* Utføre en synkron/blokkerende oppdatering av dialogen i Dialogporten. Ved vellykket respons returneres `204 No Content` til SBS-et, noe som indikerer at den oppdaterte dialogen er umiddelbart tilgjengelig for ny innlasting.
* Utføre en asynkron/ikke-blokkerende oppdatering av dialogen i Dialogporten, via intern kø-/meldingstjeneste eller lignende. Ved vellykket respons returneres `202 Accepted` til SBS-et, noe som indikerer at dialogen kanskje ikke er oppdatert ennå, men vil være det innen de neste 10 sekundene.
* Returnere en feilmelding. Se [feilhåndtering](#feilhåndtering) for mer informasjon.

## Håndtering av svar

Når forespørselen utføres, bør SBS-et indikere overfor sluttbrukeren at en handling pågår, f.eks. ved å vise en spinner eller lignende.

SBS-er BØR bruke [GQL-abonnementsmekanismen]({{<relref "../subscriptions/">}}), og reagere på hendelser som indikerer at dialogen er klar til å lastes inn på nytt. Dette vil da kunne håndtere både synkrone og asynkrone oppdateringer fra ILS-et, altså svar kodet som 204 og 202. Alternativt kan man behandle 204 som en umiddelbar indikasjon på ny innlasting og 202 som et hint om å begynne polling mot Dialogporten etter nye endringer. Dette MÅ IKKE forsøkes oftere enn én forespørsel per sekund.

Når indikasjon på at dialogen er oppdatert er mottatt, bør SBS-et laste hele dialogaggregatet på nytt. For best mulig brukeropplevelse BØR dette ikke innebære full sideoppdatering, men i stedet laste dialogen i bakgrunnen og oppdatere GUI-et tilsvarende, inkludert å fjerne spinneren. SBS-et KAN indikere for brukeren hvilke deler av dialogaggregatet som ble oppdatert ved å sammenligne forrige og ny versjon.

Hvis ingen indikasjon på å laste dialogen på nytt er mottatt innen 10 sekunder, bør en generisk feilmelding vises og spinneren fjernes. Forespørselen MÅ IKKE antas å være avbrutt; i stedet bør brukeren instrueres om å prøve igjen senere og laste siden på nytt, noe som kan gi brukeren den mest oppdaterte tilstanden.

## Sekvensdiagram

Dette viser happy path for hvordan skrivehandlinger bør implementeres i sluttbruker- og tjenesteleverandørsystemer.

{{<mermaid>}}
sequenceDiagram
    participant EU as Sluttbruker
    participant EUS as Sluttbrukersystem
    participant SP as Tjenesteleverandør
    participant DP as Dialogporten
    EU->>EUS: Bruker navigerer til dialogdetaljer
    EUS->>DP: Last dialogdetaljer
    DP->>EUS: Returner dialogdetaljer
    note over EUS,DP: Start GraphQL-abonnement umiddelbart når dialogen lastes
    EUS->>DP: Abonner på endringer i dialogen
    DP->>EUS: Abonnement akseptert
    EUS->>EU: Render dialogdetaljer
    EU->>EUS: Utfør GUI-skrivehandling (f.eks. klikk på knapp)
    EUS->>EU: Vis spinner/deaktiver knapp
    EUS->>SP: Utfør PUT/POST/DELETE mot URL for skrivehandling med dialogtoken
    alt Synkron/blokkerende
        SP->>DP: Utfør mutasjon på dialog
        DP->>SP: Returner OK
        SP->>EUS: Returner 204 No Content
    else Asynkron/ikke-blokkerende
        SP->>EUS: Returner 202 Accepted
        note over SP,DP: Lagt i kø og håndteres et annet sted
        SP-->>DP: Utfør mutasjon på dialog
        DP-->>SP: Returner OK
    end
    opt Var asynkron (fikk 202 Accepted)
        DP->>EUS: Vent på varsel om dialogoppdatering via abonnement
    end
    EUS->>DP: Last dialog på nytt
    DP->>EUS: Returner dialog
    EUS->>EU: Render oppdatert dialog/fjern spinner
{{</mermaid>}}

## Feilhåndtering

Se [feilhåndtering i FCE-er for mer informasjon]({{<relref "../front-channel-embeds/#feilhåndtering">}}).

{{<children />}}

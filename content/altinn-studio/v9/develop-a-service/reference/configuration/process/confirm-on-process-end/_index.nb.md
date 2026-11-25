---
title: Bekrefte mottak når prosessen er avsluttet
linktitle: Automatisk bekreftelse
description: Slik lar du appen bekrefte mottak for tjenesteeieren når prosessen er avsluttet.
toc: true
---

En instans er ikke ferdig for Altinn før tjenesteeieren har bekreftet at dataene er mottatt. Vanligvis bekrefter tjenesteeieren selv, med `complete`-endepunktet. Leverer appen dataene til tjenesteeieren i løpet av prosessen, for eksempel med eFormidling eller Fiks Arkiv, kan appen bekrefte i stedet. Se [Bekrefte at dataene er mottatt]({{< relref "/altinn-studio/v9/receive-data" >}}#bekrefte-mottak) for hva bekreftelsen betyr.

## Slå på bekreftelsen

Du slår på bekreftelsen med `confirm` under `onProcessEnd` i `applicationmetadata.json`. Innstillingen er slått av som standard.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "onProcessEnd": {
    "confirm": true
  }
}
```

Appen bekrefter da hver instans når prosessen har nådd en sluttilstand (`endEvent`), uansett hvilken vei prosessen tok dit. Systemoppgavene for eFormidling og Fiks Arkiv bekrefter ikke selv.

Bekreftelsen kommer etter at `IOnProcessEndedHandler` har kjørt, og etter at appen har slettet datatypene med `autoDeleteOnProcessEnd`. Er `autoDeleteOnProcessEnd` slått på for hele appen, bekrefter appen før den sletter instansen. Altinn fjerner en slettet instans fra databasen først når den er bekreftet, så med begge innstillingene trenger ikke tjenesteeieren å bekrefte selv.

{{% notice warning %}}
Slå bare på innstillingen når prosessen ikke kan ende uten at tjenesteeieren har fått dataene. Etter bekreftelsen regner Altinn dataene som mottatt. Et system som spør Storage med `excludeConfirmedBy`, får ikke lenger instansen, og Altinn kan fjerne en instans som er slettet.
{{% /notice %}}

## Gi tjenesteeieren handlingen `complete`

Appen bekrefter som tjenesteeier. Organisasjonen som eier appen, må derfor ha handlingen `complete` i `App/config/authorization/policy.xml`. Tilgangsfilen fra app-malen gir organisasjonen denne handlingen.

Storage kontrollerer handlingen etter at prosessen er avsluttet. Da står instansen i en sluttilstand, ikke i en oppgave:

- En regel som gir `complete` uten å avgrense handlingen til en oppgave eller en sluttilstand, virker. Slik er regelen i app-malen.
- En regel som bare gir `complete` i en bestemt oppgave, virker ikke.
- En regel som avgrenser `complete` til en sluttilstand, virker bare for den sluttilstanden. Den må altså gjelde sluttilstanden prosessen ender i.

[Regelbiblioteket]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/authorization/rules" >}}) har et eksempel på en regel som lar organisasjonen fullføre en instans med fullført prosess.

Når du bygger appen, kontrollerer [regelen ALTINNAPP0800]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0800" >}}) at organisasjonen har `complete`, og stopper bygget hvis handlingen mangler. Du får [advarselen ALTINNAPP0801]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0801" >}}) i stedet når bygget ikke kan avgjøre det, for eksempel fordi regelen bare gjelder én oppgave. Har prosessen flere sluttilstander, godtar bygget en regel som gjelder én av dem. Storage kontrollerer den sluttilstanden instansen faktisk ender i.

## Når Storage avviser bekreftelsen

Mangler organisasjonen `complete` for sluttilstanden, avviser Storage bekreftelsen. Plattformen prøver steget på nytt, som standard i opptil ett døgn. Gir den opp, er prosessen fortsatt avsluttet, men instansen blir stående under behandling (`processing`):

- Er `autoDeleteOnProcessEnd` slått på for hele appen, sletter ikke appen instansen.
- Sender appen hendelser, kommer ikke `app.instance.process.completed`.
- Verken brukeren eller et system som leser prosessen, ser feilen. Appen melder at prosessen er avsluttet, uten spor av feilen.

Instansen blir stående slik til du har rettet tilgangsfilen og startet arbeidsflyten på nytt. Endepunktet `process/resume` i appen avviser en prosess som er avsluttet, så verken brukeren eller et system kan starte arbeidsflyten på nytt derfra.

Test derfor bekreftelsen i et testmiljø før du publiserer til produksjon. Send inn en instans, og kontroller at den har fått en bekreftelse i `completeConfirmations` med organisasjonen din i `stakeholderId`.

### Starte arbeidsflyten på nytt

Du starter arbeidsflyten på nytt selv, i administrasjonen i Altinn Studio. Du må være med i teamet for miljøet i organisasjonen din, **Admin-TT02** eller **Admin-Production**. Se [hva teamene Admin-TT02 og Admin-Production gir tilgang til]({{< relref "/altinn-studio/v9/develop-a-service/reference/administration/access-management/studio" >}}#admin-tt02-og-admin-production).

Siden **Instanser med problemer** i administrasjonen viser instansene der en arbeidsflyt har feilet. Når du har rettet tilgangsfilen, gjør du slik:

1. Åpne instansen i administrasjonen.
2. Klikk på **Prøv på nytt** på arbeidsflyten som feilet.
3. Klikk på **Prøv arbeidsflyten på nytt** for å bekrefte.

Arbeidsflyten fortsetter fra steget som feilet, så appen prøver å bekrefte en gang til.

---
title: Vise et oppfølgingsspørsmål bare når det gjelder brukeren
linktitle: Oppfølgingsspørsmål
description: Slik viser du et spørsmål bare når brukeren har svart på en bestemt måte på et annet spørsmål
weight: 10
---

Noen spørsmål gjelder bare noen av brukerne. Du spør for eksempel om antall barn bare hvis brukeren har svart at de har barn. Da slipper de andre brukerne å se spørsmål som ikke gjelder dem.

## Slik setter du det opp

1. Legg til spørsmålet som styrer, for eksempel **Har du barn?** med svaralternativene **Ja** og **Nei**. Gi **Ja** verdien `true` og **Nei** verdien `false`. Regelen som skjuler oppfølgingsspørsmålet, sammenligner med verdien `false`.
2. Legg til oppfølgingsspørsmålet, for eksempel **Antall barn**.
3. Skjul oppfølgingsspørsmålet når svaret er **Nei**. Du setter det opp i **Valg for dynamikk**. Fremgangsmåten steg for steg står på siden [Dynamikk]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/dynamics" >}}).
4. Gjør oppfølgingsspørsmålet påkrevd hvis alle som ser det, må svare.

I layoutfilen ser oppfølgingsspørsmålet slik ut:

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json {hl_lines=["5-6"]}
{
  "id": "antall-barn",
  "type": "Input",
  "textResourceBindings": { "title": "tekst-antall-barn" },
  "required": true,
  "hidden": ["equals", ["component", "har-barn"], false],
  "dataModelBindings": { "simpleBinding": "Person.AntallBarn" }
}
```

## Dette skjer med skjulte felt

- Appen sjekker ikke om et skjult felt er fylt ut. Brukere som svarer **Nei**, kan derfor sende inn selv om **Antall barn** er påkrevd.
- Appen fjerner data fra skjulte felt før den avslutter oppgaven. Svarer brukeren først **Ja** og fyller ut antall barn, og endrer svaret til **Nei** etterpå, fjerner appen svaret på **Antall barn**.

## Spørsmål du kan stille utviklerne

- Trenger tjenesten data fra felt som er skjult for brukeren? I så fall må utviklerne slå av `RemoveHiddenData`.

## Se også

- [Dynamikk]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/dynamics" >}})
- [Påkrevde felt]({{< relref "/altinn-studio/v9/develop-a-service/data/validation/required" >}})
- [Innstillinger med nye standardverdier i v9]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/settings#innstillinger-med-nye-standardverdier-i-v9" >}})

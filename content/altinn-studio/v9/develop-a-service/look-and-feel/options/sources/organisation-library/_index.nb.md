---
title: Gjenbruke kodelister fra organisasjonsbiblioteket
linktitle: Organisasjonsbibliotek
description: Slik lager du en kodeliste i organisasjonsbiblioteket og henter en kopi av den inn i appen din
weight: 175
toc: true
---

Organisasjonsbiblioteket er et felles sted i Altinn Studio der organisasjonen din kan lage kodelister som flere apper skal bruke. Du lager kodelisten én gang i biblioteket. Deretter importerer du den i hver app som trenger den.

Når du importerer en kodeliste, får appen sin egen kopi.

{{% notice warning %}}
Endrer organisasjonen kodelisten i biblioteket senere, får ikke appen endringen. Altinn Studio oppdaterer aldri kopien i appen.
{{% /notice %}}

## To biblioteker med samme navn

Altinn Studio har to faner som heter **Bibliotek**. De åpner hvert sitt bibliotek:

| Fanen **Bibliotek** … | Åpner | Inneholder |
|---|---|---|
| på forsiden i Altinn Studio | **Organisasjonsbiblioteket** | Kodelistene som organisasjonen deler med alle appene sine. |
| inne i en app | **App-biblioteket** | Kodelistene som bare denne appen bruker, også kopiene du har importert. |

## Lag en kodeliste i organisasjonsbiblioteket

1. Klikk **Bibliotek** på forsiden i Altinn Studio.
2. Velg organisasjonen din i menyen øverst til høyre.
3. Velg **Kodelister**.
4. Klikk **Legg til kodeliste**, og velg **Lag ny** eller **Last opp**. **Last opp** tar imot en JSON-fil.
5. Fyll ut kodelisten og tekstene.
6. Klikk **Del dine endringer**.

Altinn Studio lagrer endringene dine med en gang, men bare for deg. Appene kan ikke importere kodelisten før du har delt endringene. Har du ikke skrivetilgang til organisasjonsbiblioteket, kan du ikke dele endringer der.

## Importer en kodeliste til appen

1. Åpne appen, og klikk **Bibliotek**.
2. Velg **Kodelister**.
3. Klikk **Legg til kodeliste**, og velg **Importer fra organisasjonsbiblioteket**. Du ser bare dette valget hvis organisasjonen har innhold i biblioteket.
4. Velg kodelisten i **Velg kodelisten du vil importere**.
5. Klikk **Importer**.
6. Klikk **Del dine endringer**, slik at kopien kommer med når du publiserer appen.

Appen får en kopi av kodelisten med samme navn som i biblioteket. Altinn Studio kopierer også tekstene kodelisten bruker, på alle språkene organisasjonen har. Finnes en tekst med samme ID i appen fra før, beholder appen sin egen tekst.

Har appen allerede en kodeliste med samme navn, stopper importen. Altinn Studio overskriver ikke kodelisten som finnes i appen.

## Bruke den importerte kodelisten i et skjema

Importen kobler ikke kodelisten til noen komponent. Det gjør du selv:

1. Åpne siden med komponenten i Altinn Studio Designer, og velg komponenten.
2. Gå til fanen **Velg kodeliste** under **Valg for alternativer**.
3. Klikk **Velg fra appbiblioteket**, og velg kodelisten.

Komponenten viser da til kodelisten med `optionsId`. Har kodelisten navnet `land`, ser komponenten slik ut:

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json {hl_lines=[10]}
{
  "id": "land-dropdown",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "land-dropdown.title"
  },
  "dataModelBindings": {
    "simpleBinding": "Person.Land"
  },
  "optionsId": "land"
}
```

Kopien ligger i app-repoet i `App/options/land.json`, sammen med de andre kodelistene i appen.

## Dette skjer når organisasjonen endrer kodelisten

- **Appen endrer seg ikke.** Kopien i appen er den samme som da du importerte den.
- **Du kan ikke importere den samme kodelisten på nytt.** Det går ikke så lenge appen har en kodeliste med samme navn.
- **Du kan endre kopien i appen.** Det påvirker verken organisasjonsbiblioteket eller andre apper.

Vil du ha med endringen fra biblioteket, må du endre kopien i appen selv.

## Spørsmål du kan stille utviklerne

- Hvilke kodelister i appen har vi importert fra organisasjonsbiblioteket?
- Har organisasjonen endret noen av disse kodelistene etter at vi importerte dem?
- Har vi endret noen av kopiene i appen, slik at de ikke lenger er like dem i biblioteket?

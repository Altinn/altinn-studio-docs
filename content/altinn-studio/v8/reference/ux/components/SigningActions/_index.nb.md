---
title: SigningActions
linktitle: SigningActions
description: En komponent som lar brukere utføre handlinger relatert til signeringsprosessen
schemaname: SigningActions
weight: 10
toc: true
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under arbeid.
{{% /notice %}}

---

## Bruk

**SigningActions**-komponenten tar hensyn til den påloggede brukeren og tilstanden til signeringstrinnet for å vise handlinger som brukeren kan utføre.
Komponenten kan kun brukes på et signeringssteg.

### Anatomi

![SigningActions anatomi](signing-actions.svg "De ulike visningene av SigningActions")

1. Brukeren er en signatar, og har ikke signert ennå. Siden avkrysningsboksen ikke er krysset av, er signeringsknappen grået ut.
2. Brukeren er en signatar, og har ikke signert ennå. Avkrysningsboksen er krysset av, så signeringsknappen er aktiv.
3. Brukeren er instanseieren. Ikke alle signatarer har signert, så innleveringsknappen er grået ut. Instanseieren kan avbryte signeringsprosessen med avbryt-knappen.
4. Brukeren er en signatar, og har ikke signert ennå. Noe har gått galt ved forsøk på signering, en feilmelding vises.
5. Brukeren er en signatar, og har signert. Komponenten viser en tittel og sammendrag som bekrefter dette, og en knapp for å navigere til innboksen vises.
6. Brukeren er instanseieren. Alle obligatoriske signaturer er fullført, så de kan nå sende inn skjemaet. De kan også avbryte.
7. Brukeren er instanseieren og har signert selv. Ikke alle obligatoriske signaturer er fullført, så de kan ikke sende inn skjemaet. De kan avbryte.
8. Brukeren er instanseieren og har sendt inn skjemaet. En knapp vises som lar dem navigere til innboksen.
9. Brukeren er instanseieren. En av signaturene er ikke gyldig. De må avbryte og fikse problemet for å fortsette.
10. Brukeren er en hvilken som helst bruker. Signeringsstatus kunne ikke hentes. Dette kan skyldes manglende internettforbindelse.

## Egenskaper

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}.

**Påkrevde egenskaper**: `id`, `type`

| **Egenskap**                                                             | **Type** | **Beskrivelse**                                                                                                      |
| ------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                     | streng   | Komponent-ID-en. Må være unik innenfor alle oppsett/sider i et oppsett-sett. Kan ikke slutte med <bindestrek><tall>. |
| `type`                                                                   | streng   | Må være `SigningActions`.                                                                                            |
| `textResourceBindings.awaitingSignaturePanelTitle`                       | streng   | Tittelen på panelet som vises når brukeren skal signere.                                                             |
| `textResourceBindings.checkboxLabel`                                     | streng   | Teksten som vises når brukeren blir bedt om å bekrefte hva de signerer på.                                           |
| `textResourceBindings.checkboxDescription`                               | streng   | En tekst som beskriver avkrysningsboksen mer detaljert om nødvendig.                                                 |
| `textResourceBindings.signingButton`                                     | streng   | Teksten som vises i knappen brukeren klikker for å signere.                                                          |
| `textResourceBindings.noActionRequiredPanelTitleHasSigned`               | streng   | Tittelen på panelet som vises når brukeren har signert og ingen ytterligere handling er nødvendig.                   |
| `textResourceBindings.noActionRequiredPanelTitleNotSigned`               | streng   | Tittelen på panelet som vises når brukeren ikke har signert og ingen ytterligere handling er nødvendig.              |
| `textResourceBindings.noActionRequiredPanelDescriptionHasSigned`         | streng   | Beskrivelsen av panelet som vises når brukeren har signert og ingen ytterligere handling er nødvendig.               |
| `textResourceBindings.noActionRequiredPanelDescriptionNotSigned`         | streng   | Beskrivelsen av panelet som vises når brukeren ikke har signert og ingen ytterligere handling er nødvendig.          |
| `textResourceBindings.noActionRequiredButton`                            | streng   | Teksten som vises i knappen brukeren klikker for å gå til innboksen når ingen ytterligere handling er nødvendig.     |
| `textResourceBindings.awaitingOtherSignaturesPanelTitle`                 | streng   | Tittelen på panelet når signeringsoppgaven ikke er klar for innsending.                                              |
| `textResourceBindings.awaitingOtherSignaturesPanelDescriptionNotSigning` | streng   | Beskrivelsen av panelet når den gjeldende brukeren ikke signerer.                                                    |
| `textResourceBindings.awaitingOtherSignaturesPanelDescriptionSigned`     | streng   | Beskrivelsen av panelet når den gjeldende brukeren har signert.                                                      |
| `textResourceBindings.submitPanelTitle`                                  | streng   | Tittelen på panelet når signeringsoppgaven er klar for innsending.                                                   |
| `textResourceBindings.submitPanelDescription`                            | streng   | Beskrivelsen av panelet når signeringsoppgaven er klar for innsending.                                               |
| `textResourceBindings.submitButton`                                      | streng   | Teksten som vises i knappen brukeren klikker for å sende inn signeringsoppgaven.                                     |
| `textResourceBindings.errorPanelTitle`                                   | streng   | Tittelen på panelet som vises når minst én signatar er ugyldig og ikke har fått tilgang til skjemaet.                |
| `textResourceBindings.errorPanelDescription`                             | streng   | Beskrivelsen av panelet som vises når minst én signatar er ugyldig og ikke har fått tilgang til skjemaet.            |
| `textResourceBindings.rejectModalTitle`                                  | streng   | Tittelen på modalen som vises når brukeren klikker på avbryt-knappen.                                                |
| `textResourceBindings.rejectModalDescription`                            | streng   | Beskrivelsen av modalen som vises når brukeren klikker på avbryt-knappen.                                            |
| `textResourceBindings.rejectModalButton`                                 | streng   | Teksten som vises i knappen brukeren klikker i modalen for å bekrefte avbryting av signeringsoppgaven.               |
| `textResourceBindings.rejectModalTriggerButton`                          | streng   | Teksten som vises i knappen som åpner avbryt-modalen.                                                                |

## Konfigurasjon

Legg til følgende i sidelayouten for å inkludere komponenten:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-9"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          "id": "mySigningActions",
          "type": "SigningActions"
        }
      ]
    }
  }
}
```

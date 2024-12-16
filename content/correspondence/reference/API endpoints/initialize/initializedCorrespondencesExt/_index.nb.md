---
title: InitializedCorrespondencesExt
linktitle: InitializedCorrespondencesExt
description: Beskrivelse av feltene i objektet

weight: 60
toc: true
---
Lenke til [InitializedCorrespondencesExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializedCorrespondencesExt.cs)

Representerer en melding som har blitt initialisert
#### correspondenceId

Type: _Guid_

ID-en til meldingen som har blitt initialisert

#### status

Type: [CorrespondenceStatusExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/Enums/CorrespondenceStatusExt.cs)

Viser statusen til den initialiserte meldingen

#### recipient

Type: _string_

Mottakeren av meldingen

#### notifications

Type: [List\<InitializedCorrespondencesNotificationsExt>](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializedCorrespondencesNotificationsExt.cs)

En liste over de genererte varslene med sendingsresultat. Hvert varsel vil inkludere følgende egenskaper:

- _orderId_: ID-en til ordren.
- _isReminder_: en boolsk verdi som indikerer om varselet er en påminnelse eller ikke.
- _status_: viser statusen til varselet i det tidspunktet meldingen(e) ble opprettet.

|     Status     |                                                Beskrivelse                                                 |
| :------------: | :--------------------------------------------------------------------------------------------------------: |
|    Success     | Varselordren ble opprettet vellykket med kontaktinformasjon til **minst en** av mottakerne til varslingen. |
| MissingContact |                Kontaktinformasjon ble **ikke funnet for noen** av mottakerne av varslingen.                |
|    Failure     |                         Opprettelse av varselordre mislyktes på grunn av en feil.                          |
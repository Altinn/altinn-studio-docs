---
draft: true
headless: true
hidden: true
---

{{%notice warning%}}
SMS varsler er ikke tilgjengelige i TT02 eller andre testmiljøer. Dersom brukt vil det lede til en "varsling mislyktes"
status i SigneeList komponenten. Signataren vil allikevel motta en melding i altinn innboksen.
{{%/notice%}}

Det er caching i autorisasjonslaget som gjør at det kan ta tid før en bruker som har fått delegert tilgang til et skjema via brukerstyrt signering ser skjemaet i sin Altinn innboks.

Men dette vil altså bare inntreffe for:

- De brukerne som er aktivt pålogget Altinn når instansdelegeringen skjer
- Ikke allerede har annen tilgang for InstanceOwner

For å unngå å oppleve dette under testing kan man delegere til en person man ikke har brukt i testing den siste timen.

---
draft: true
headless: true
hidden: true
tags: [needsReview, translate]
---

{{%notice warning%}}
SMS-varsler er ikke tilgjengelige i TT02 eller andre testmiljøer. Hvis du bruker SMS, vil det føre til en "varsling mislyktes"-status i SigneeList-komponenten. Den som skal signere vil likevel få en melding i Altinn-innboksen.
{{%/notice%}}

Det er caching i autorisasjonslaget som gjør at det kan ta tid før en bruker som har fått tilgang til et skjema via brukerstyrt signering ser skjemaet i Altinn-innboksen.

Dette gjelder bare for brukere som

- er aktivt pålogget Altinn når vi gir dem tilgang
- ikke allerede har annen tilgang for InstanceOwner

For å unngå dette under testing kan du gi tilgang til en person du ikke har brukt i testing den siste timen.

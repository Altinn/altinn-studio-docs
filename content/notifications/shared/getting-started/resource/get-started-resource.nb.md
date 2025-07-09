---
headless: true
hidden: true
---

{{<notice info>}} 
**Merk:** Alle tiltenkte mottakere _må_ ha `lese`-tilgang gjennom ressursens policy. 
{{</notice>}}


Tilknytning av et varsel til en ressurs resulterer i at policyen for denne ressursen brukes til å identifisere
de korrekte mottakerne av varselet. Alle tiltenkte mottakere _må_ ha `lese`-tilgang gjennom ressursens
policy.

En ressurs i dette tilfellet kan være både en Altinn App eller en ressurs (tjenesteeierressurs).

For Altinn Apps må du også sørge for at tilgangssubjektet har `lese`-tilgang for __alle__ relevante oppgaver og hendelser.

En ny Altinn-ressurs kan registreres i Altinn Studio eller via et API.
[Vennligst se Altinn Ressursregister for instruksjoner om hvordan du oppretter en ny ressurs.](/authorization/what-do-you-get/resourceregistry/)

Policyen for både Altinn Apps og andre Altinn-ressurser kan administreres i Altinn Studio.
[Vennligst se Altinn Studio-dokumentasjonen for hvordan du gjør dette.](/altinn-studio)
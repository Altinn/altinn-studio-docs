---
title: Forhåndsutfylling
description: Hva er forhåndsutfylling?
weight: 10
---

Forhåndsutfylling lar deg tilby sluttbrukeren et skjema med felter som er ferdig utfylt med relevant
informasjon som allerede er tilgjelig. 
For eksempel er skattemeldingen hvert år forhåndsutfylt med data fra Skatteetaten, slik at brukeren ikke trenger
å fylle ut informasjon som mottager allerede har. Formålet med å inkludere denne informasjonen i skjemaet blir da 
å be bruker bekrefte informasjonen, eller ev. endre den dersom den ikke stemmer. 

<!--Det er viktig å alltid gjøre en vurdering av hvilke data som skal innhentes i et skjema, og om man har hjemmel til
å hente inn disse dataene. All data som hentes inn skal ha et formål.
> TODO: Få en jurist til å skrive noen linjer om hva som gjelder her mtp forhåndsutfylling.-->

I Altinn Studio fins det flere måter å sette opp forhåndsutfylling av skjema. 
- For visse data fra Folkeregisteret, Enhetsregisteret, eller brukers Altinn-profil kan man sette opp 
  forhåndsutfylling via konfigurasjon.
- Data som er tilgjegelig via eksterne API-er kan hentes inn under oppstart av et eksemplar av appen, og legges inn
  i skjema via kode.    
- Dersom man starter et eksemplar av en app via API, kan man sende med (helt eller delvis) ferdig utfylt skjemadata 
  som utgangspunkt.
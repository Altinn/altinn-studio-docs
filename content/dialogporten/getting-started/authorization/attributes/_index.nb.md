---
title: 'Autorisasjonsattributter'
description: 'Lær hvordan dialoger i Dialogporten implementerer finkornet tilgangskontroll ved hjelp av Altinn Authorization'
weight: 20
---

## Introduksjon

Handlinger og andre deler (f.eks. referanser til transmisjoner) av dialogen kan også spesifisere et ekstra _autorisasjonsattributt_.

Dette gir mulighet for å ha ulike autorisasjonskrav for samme type handling som er tilgjengelig i forskjellige dialogtilstander. For eksempel kan det brukes til å gjøre en signeringshandling tilgjengelig kun for en ekstern revisor/regnskapsfører, mens en annen signeringshandling er tilgjengelig for administrerende direktør.

Tilgangsreglene kan defineres i samme policy som dialogens [service resource]({{<relref "../service-resource">}}) (kalt en "sub resource"), eller i sin egen separate service resource.

Autorisasjonsattributter kan også brukes på [transmissions]({{<relref "../../dialogs#transmissions">}}) for å definere spesifikke tilgangsregler som kontrollerer hvem som har lov til å lese en gitt transmisjon.

**Les mer**
* [Teknisk referanse for autorisasjonsattributter]({{<relref "../../../reference/authorization/attributes">}})

{{<children />}}
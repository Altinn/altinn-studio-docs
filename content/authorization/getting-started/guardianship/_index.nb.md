---
title: Vergemål
linktitle: Vergemål
description: Som tjenesteier vil du enkelt innføre støtte for vergemål ved 3 steg.
---

{{< stepcard step="1" title="Vergemål i tilgangsregler" >}}

Første skritt for å støtte vergemål på tjeneste er å legge opprette tilgangsregler som sier hva et gitt vergemål gir tilgang til på tjensten. Dette kan gjøres via API eller i policy editoren i Resursadministrasjon.

![Policy editor i Altinn Studio](vergemal_regler.png "Policy editor i Altinn Studio")

Beskrivelse av de forskjellige vergemålene finnes [her](/nb/authorization/what-do-you-get/accessgroups/accessgroups-citizens/verger/).

Detaljert gjennomgang av opprettelse og publisering av ressurs finnes [her](/nb/authorization/guides/resource-owner/create-resource-resource-admin/).

> Dersom tjensten som sakl støtte Vergemål er en Atlinn Studio app trenger du kun gjennomføre dette stegeg
> {{< /stepcard >}}

{{< stepcard step="2" title="Tilgjengeliggjør aktørvelger" >}}
For å kunne utføre tjenester på vegne av vergehaver må verge kunne velge hvem hen ønsker å representere i tjenesten. Authorized Parties

![Autoriserte parter fra vegvesen.no](authorizedparty.png "Autoriserter parter fra Altinn presentert på vegvesen.no")

APIet gir denne oversiktnen. Når du har hentet denne oversikten kan verge velge hvem hen skal representere.

Implementasjonsguide for Authorized Parties finnes [her](/nb/authorization/guides/resource-owner/generic-access-resource/integrating-link-service/#integrasjon-med-api-for-autoriserte-parter-avgivere/).
{{< /stepcard >}}

{{< stepcard step="3" title="Autorisasjonsoppslag" >}}
For å sikre at en beruker har lov til å gjøre en konkret handling på vegne av en annen må det gjøres autorisasjonsoppslag. Dokumentasjon for hvordan dette oppslaget gjøres finner du
[her](/nb/authorization/guides/resource-owner/generic-access-resource/integrating-link-service/#integrasjon-med-pdp).
{{< /stepcard >}}

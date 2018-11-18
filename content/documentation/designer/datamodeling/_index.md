---
title: Datamodeling
linktitle: Datamodeling
description: Defining the data model(s) for a service is important. Altinn studio will support importing existing data models and creating new datamodels.
tags: ["tjenester 3.0"]
weight: 100
---

### Modellere data

Tanken er at det å ha en modell for tjenestedataene vil gi en del fordeler, som f.eks. enhetlig validering på tvers av kanaler, 
enklere å automatisere testing, enklere å avdekke feil i regler, formell definisjon av dataformat for eksterne systemer, etc.

- Enkel modellering av data
- Innebygd erstatning for SERES ifbm. tjenesteutvikling
- Må støtte flere formater, sannsynligvis et JSON-format som default, og som kan konverteres til XML for de eksterne som foretrekker det
- For å forenkle konvertering av dagens XSD-baserte InfoPath-skjema, så må konvertering til/fra disse formatene støttes i runtime

{{<figure src="data-modelling.png?width=1000" title="Editor for enkel datamodellering">}}

See all issues related to Altinn Studio and data modeling on [Github](https://github.com/Altinn/altinn-studio/labels/data-modeling)

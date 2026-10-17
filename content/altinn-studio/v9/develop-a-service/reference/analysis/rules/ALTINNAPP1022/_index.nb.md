---
draft: true
title: "ALTINNAPP1022: oppgaven har et env-attributt appen ikke kan bruke"
description: "Et env-attributt i oppsettet av en oppgave i process.bpmn navngir ikke et miljø appen kjenner, eller appen leser det ikke"
weight: 122
---

Denne diagnostikken meldes når et `env`-attributt i oppsettet av en oppgave i
`config/process/process.bpmn` ikke virker slik det ser ut. Meldingen navngir oppgaven,
attributtet og elementet det står på, hva appen gjør med det, og hvordan du retter det.

For hvert miljø bruker appen oppføringen der `env` navngir miljøet, og ellers oppføringen uten
`env`. Regelen melder:

- et `env`-attributt med et navn appen ikke kjenner, slik at oppføringen ikke gjelder i noen av
  miljøene Development, Staging og Production (appen skiller ikke mellom store og små bokstaver,
  men mellomrom rundt navnet gjør det ukjent)
- et attributt appen ikke leser på grunn av store bokstaver eller et navneromsprefiks, for
  eksempel `Env` eller `altinn:env`, slik at oppføringen gjelder i alle miljøer
- et `env`-attributt, med hvilke som helst bokstaver eller prefiks, på et element som ikke tar
  imot `env`, slik at innstillingen gjelder i alle miljøer

Bare `<altinn:correspondenceResource>` i `<altinn:signatureConfig>` og elementene rett under
`<altinn:eFormidlingConfig>` tar imot `env`. Det gjelder også `<altinn:dataTypes>`, men ikke
`<altinn:dataType>`-oppføringene inni.

Appen kjenner disse miljønavnene:

| Miljø                    | Navn                                                      |
| ------------------------ | --------------------------------------------------------- |
| Development (utvikling)  | `development`, `dev`, `local`, `localtest`                |
| Staging (test)           | `staging`, `test`, `at22`, `at23`, `at24`, `tt02`, `yt01` |
| Production (produksjon)  | `production`, `prod`, `produksjon`                        |

Kategori `Process`, alvorlighetsgrad **advarsel**.

Bruk et av navnene i tabellen, i et attributt som heter `env`, med små bokstaver og uten
prefiks. Fjern `env` fra et element som ikke tar imot det. For en `<altinn:dataType>` flytter du
`env` til `<altinn:dataTypes>` rundt den, med én `<altinn:dataTypes>` per miljø.

Se [miljøspesifikke verdier i veiledningen for eFormidling]({{< relref "/altinn-studio/v9/receive-data/eFormidling#eFormidling-oppsett-env" >}}).

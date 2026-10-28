---
draft: true
title: Sette opp underskjema i en app
linktitle: Underskjema
description: Slik setter du opp underskjema i appen din
tags: [underskjema, needsReview]

aliases:
  - /nb/altinn-studio/guides/subform/
---

Et underskjema er et lite skjema inne i hovedskjemaet, som brukeren kan fylle ut flere ganger. Hver utfylling blir en egen oppføring. Hovedskjemaet viser oppføringene i en tabell, der brukeren kan legge til, endre og slette dem.

Eksempel: I en søknad skal brukeren oppgi alle kjøretøyene til virksomheten. For hvert kjøretøy klikker brukeren på en knapp i tabellen, fyller ut underskjemaet om kjøretøyet og klikker på **Ferdig** for å gå tilbake til hovedskjemaet. Tabellen viser da en ny rad med for eksempel registreringsnummer og merke.

## Velge mellom underskjema og repeterende gruppe

Både underskjema og [repeterende grupper]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/RepeatingGroup" >}}) lar brukeren legge inn flere oppføringer av samme type. Et underskjema passer best når

- hver oppføring har mange felter eller trenger flere sider
- du vil gi brukeren en ryddig oversikt i hovedskjemaet, og vise detaljene først når brukeren åpner en oppføring
- mottakeren trenger en egen PDF for hver oppføring

Har hver oppføring bare noen få felter, er en repeterende gruppe ofte enklere, både for deg og for brukeren.

## Slik fungerer underskjema

- Underskjemaet har sin egen datamodell, altså en egen beskrivelse av hvilke opplysninger det samler inn.
- Appen lagrer hver oppføring som et eget dataelement, det vil si en egen datafil i instansen.
- Underskjemaet har egne sider, som du utformer på samme måte som sidene i hovedskjemaet.
- Underskjemaet er ikke et eget steg i prosessen. Brukeren fyller det ut mens hovedskjemaet er åpent, og sender inn alt samlet fra hovedskjemaet.
- I hovedskjemaet bruker du komponenten **Tabell for underskjema** (`Subform`). Du velger selv hvilke opplysninger fra underskjemaet tabellen skal vise som kolonner.

## Dette får du fra plattformen

Når du har satt opp underskjemaet, gjør Altinn Studio dette uten ekstra arbeid:

- Tabellen får knapper for å legge til, endre og slette oppføringer.
- Designer legger automatisk inn en knapp for å lukke underskjemaet på alle sidene i underskjemaet.
- Appen lagrer opplysningene i underskjemaet og sørger for at alt er lagret før brukeren kommer tilbake til hovedskjemaet. Finnes det opplysninger som appen ikke kan lagre, blir brukeren stående i underskjemaet.
- Appen viser en feilmelding hvis brukeren legger inn færre eller flere oppføringer enn du har tillatt. Da må du ha satt både minste og største antall.
- Oppføringene kommer med i PDF-en for hovedskjemaet.

## Dette har du ansvar for

Som tjenesteeier må du bestemme

- hvilke opplysninger tabellen skal vise, slik at brukeren kjenner igjen hver oppføring
- hvor mange oppføringer brukeren må eller kan legge inn
- om appen skal kontrollere opplysningene i underskjemaet før brukeren kan lukke det
- om mottakeren trenger én PDF for hele innsendingen, eller én PDF for hver oppføring

Du har også ansvar for at tekstene på knapper og kolonnetitler er tydelige, slik at også brukere av skjermleser forstår tabellen. Test alltid med et realistisk antall oppføringer før du setter tjenesten i produksjon.

## Begrensninger

{{% notice warning %}}
Et underskjema kan ikke inneholde

- komponenten for filopplasting, så brukeren kan ikke legge ved filer
- et annet underskjema
- knapper som sender skjemaet videre i prosessen
- komponenten for betaling

Designer kan foreløpig ikke forhåndsvise underskjemaet. Du må teste det i appen.
{{% /notice %}}

Hovedskjemaet kan heller ikke koble felter direkte til datamodellen for underskjemaet. Vil du vise opplysninger fra underskjemaet i hovedskjemaet, bruker du kolonnene i tabellen eller en oppsummering.

## Legge til et underskjema

Du kan sette opp underskjemaet i Altinn Studio Designer eller manuelt i filene til appen. Designer er det trygge standardvalget. Det manuelle oppsettet trenger du bare hvis du vil bruke innstillinger som Designer ikke har ennå.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "altinn-studio/v9/develop-a-service/look-and-feel/subform/studio/_index.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "altinn-studio/v9/develop-a-service/look-and-feel/subform/backend-manual/_index.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}

## Vise underskjemaet i oppsummering og PDF

Du kan ta med underskjemaet i [oppsummeringen]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/summary2" >}}) for hovedskjemaet. I egenskapene til oppsummeringen legger du til en overstyring under **Overstyringer** og velger tabellen i **Velg komponent**. Under **Visningstype** velger du mellom

- **Tabell**, som viser de samme kolonnene som tabellen i hovedskjemaet
- **Fullstendig**, som viser alle opplysningene i hver oppføring

PDF-en som appen lager for hovedskjemaet, viser automatisk alle opplysningene i alle oppføringene. Har utviklerne laget en egen side for PDF-en, er det den siden som bestemmer hva PDF-en viser.

Trenger mottakeren en egen PDF for hver oppføring, må utviklerne legge inn et eget steg i prosessen. Les hvordan de gjør det i [PDF-generering for underskjema]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/subform/subform-pdf" >}}).

{{<children />}}

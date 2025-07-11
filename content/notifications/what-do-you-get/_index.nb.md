---
title: Hva får du?
description: "Tjenesteeiere og interne Altinn-systemer kan sende tilpassede varsler til enkeltpersoner i en personlig
eller profesjonell kapasitet gjennom roller de innehar i en organisasjon.
Mottakerens navn og kontaktdetaljer trenger ikke å være kjent på forhånd, da Altinn Varslings-API-et kan hente
denne informasjonen fra nasjonale registre ved hjelp av fødselsnummer eller organisasjonsnummer."
weight: 20
---

## Hovedfordeler
**Altinn Varslinger** tilbyr en robust og pålitelig tjeneste for kommunikasjon med sluttbrukere på tvers av flere kanaler. Viktige fordeler inkluderer:
1. **Navneoppslag**: Hent gjeldende navn fra nasjonale registre.
2. **Kontaktdetaljoppslag**: Hent gjeldende kontaktinformasjon fra nasjonale registre.
3. **Autorisasjonsbasert mottakeridentifikasjon**: Bruk Altinn-autorisasjon for å identifisere de korrekte mottakerne innenfor en organisasjon.
4. **Betingede varsler**: Aktiver varsler som avhenger av resultatet av en betingelsessjekk. MERK: Varsler vil be om betingelsesresultat fra eksternt system.
5. **API-tilgang**: Send varsler programmatisk og overvåk leveringsstatusen via Altinn Varslings-API-et.

## Varslingskanaler

Altinn Varslinger støtter følgende kommunikasjonskanaler:

- **E-post**: Sender tilpassede og formaterte e-poster direkte til brukernes innbokser.
- **SMS**: Leverer tilpassede, konsise, tidsriktige meldinger til brukernes mobiltelefoner, og støtter både nasjonale og internasjonale numre.
- **E-post foretrukket**: Prioriterer e-post som primærkanal, med SMS som reserve når e-postkontaktinformasjon ikke er tilgjengelig.
- **SMS foretrukket**: Prioriterer SMS som primærkanal, med e-post som reserve når SMS-kontaktinformasjon ikke er tilgjengelig.

### Fremtidige forbedringer

Altinn planlegger å utvide sine varslingskanaler til å inkludere et bredere spekter av kommunikasjonsplattformer, noe som gir enda større fleksibilitet og bekvemmelighet for organisasjoner og brukere.

## SMS-varsler

Altinn SMS-varsler sikrer rettidig levering av konsise meldinger til brukernes mobiltelefoner. Nedenfor er nøkkeldetaljene:

### Sendevindu

- SMS-varsler sendes daglig mellom **kl. 09.00 og 17.00 (norsk tid)**.
- Varsler planlagt utenfor dette tidsrommet sendes **kl. 09.00 neste dag**.
- Varslingsordrer kan legges inn når som helst.

### Støttede mottakernummer

- **Format**: Mobilnumre må inkludere landskode, helst med "+" eller "00" (f.eks. +47900XXXXX, 0047900XXXXX).
- **Restriksjoner**: SMS-varsler til 5-sifrede numre støttes ikke.
- **Norske numre**: Må begynne med "4" eller "9" etter landskoden "+47."
  - Gyldig: +47400XXXXX, +47900XXXXX, 0047400XXXXX, 0047900XXXXX.
  - Ugyldig: +47500XXXXX, +47600XXXXX, 0047500XXXXX, 0047600XXXXX.
- **Internasjonale numre**: Støttes, så lenge de inkluderer en gyldig landskode.

## E-postvarsler

Altinn E-postvarsler gir mulighet til å sende ren tekst eller HTML-innhold direkte til brukernes innbokser.

### Innholdstyper

- **Støttede formater**: Både ren tekst og HTML-formater støttes.

### Mottakerbegrensninger

- **Enkeltmottaker**: Hver e-postvarsel sendes til én mottaker.
- **Vedlegg**: Foreløpig støtter ikke e-postvarsler vedlegg.

## Mottakeroppslag

Altinn tilbyr funksjonalitet for mottakeroppslag for å bestemme navn, kontaktdetaljer og reservasjonsstatus ved hjelp av fødselsnummer eller organisasjonsnummer.

- **Tidspunkt**: Oppslag skjer ved bestilling og igjen på planlagt sendetidspunkt.
- **Ansvar**: Det er avsenderens ansvar å sjekke sendestatus. Oppslagsresultater gis i bestillingsresponsen og detaljeres i de ferdige varslene.

[Lær mer om mottakeroppslag i forklaringsdokumentasjonen.](/notifications/explanation/recipient-lookup)

## Sendebetingelse

Sendebetingelsesfunksjonen sikrer at varsler kun sendes når spesifikke kriterier er oppfylt. Disse betingelsene kan evalueres umiddelbart eller planlegges for fremtidig evaluering.

- **Bruksområde**: Ideelt for scenarier som påminnelser, der et varsel sendes kun hvis en påkrevd handling ikke er fullført.
- **Evaluering**: Betingelser sjekkes av applikasjonen ved hjelp av betingelsesendepunktet som er oppgitt i varslingsordren.

[Lær mer om sendebetingelser i forklaringsdokumentasjonen.](/notifications/explanation/send-condition)

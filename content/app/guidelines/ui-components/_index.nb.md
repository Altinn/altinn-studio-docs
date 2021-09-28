---
title: UI-komponenter
description: De ulike komponentene er laget for at de skal passe sammen i en større helhet. Det er derfor viktig å følge retningslinjene for hvordan disse brukes for å oppnå et konsistent og gjenkjennbart uttrykk. UI-komponenter som foreløpig inngår i Altinns bibliotek finner du her.
weight: 10
toc: true
---

{{% panel-contribute 
src1="https://github.com/Altinn/altinn-studio/issues/new/choose" title1="Opprett en sak i github" 
src2="https://altinn.slack.com/" title2="Skriv til oss på Slack" %}}

**Har du behov for en ny komponent?**


Vi ønsker at alle er med på å videreutvikle 
[biblioteket av komponenter]({{< ref "ui-components" >}}) med både design og kode. 
I praksis vil dette si at Altinn ønsker å ta imot forslag til nye komponenter etter hvert som tjenesteeierne ser 
behovet for det. 

Sjekk gjerne nedenunder at ikke komponenten du trenger allerede eksisterer.

{{% /panel-contribute %}}

## Tittel og avsnitt
Det bør som hovedregel alltid være en header (H2) og et avsnitt i starten på en skjamaside for å oppsummere brukerens oppgave.


**Retningslinjer:**
- Tekstlengde på avsnitt strekkes ikke ut 100% i modalboksen, ettersom lange linjer tekst forstyrrer flyten i lesingen. Avsnitt er derfor begrenset til maks 696px i bredden, selv om modalen fyller ut 1056px. 

- Teksten skal alltid være venstrestilt. 


**Eksempel på bruk:**

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2815%253A680" %}}

---

## Knapp og lenke
Hovedknapp (blå) brukes for å sende brukeren til neste steg. 

**Retningslinjer:**
- Det skal kun være en hovedknapp per side. Sekundærvalg kan legges til som knapper stylet som lenker.
- Teksten på knappen skal være tydelig. Som regel fungerer "Neste" bra, men knappen kan også formuleres som svar på et spørsmål (se eksempel under).
- På siste steg i skjemaet (innsending) skal hovedknappen være grønn.

**Eksempel på bruk:**
{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D3495%253A809" %}}

---

## Inputfelt
Inputfelt brukes når brukeren skal føre inn tekst eller tall. 

**Retningslinjer:**
- Et inputfelt skal alltid ha en tilhørende label med forklarende tekst.
- Ta en vurdering på om ekstra beskrivelser og hjelpetekster må kobles til input elementet.
- To inputfelt kan plasseres ved siden av hverandre dersom de på et eller annet vis hører sammen. Se eksempel under.
- Deaktivert felt bør unngås. Dersom et felt ikke kan redigeres bør informasjonen heller presenteres i tekst. 


**Eksempel på bruk:**
{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2816%253A1332" %}}

---

### Stort tekstfelt
Stort tekstfelt benyttes når brukeren skal fylle inn en lengre beskrivelse. De samme retningslinjene som inputfelt gjelder. 

**Eksempel på bruk:**

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D3495%253A656" %}}

---

### Adresse
For adresse finnes det et fast oppsett der postnr og poststed er sidestilt under datofeltet. Postfelt fylles ut automatisk basert på postnr-input. 

**Eksempel på bruk:**

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2911%253A652" %}}

---

### Datovelger
I forbindelse med planlegging, eller for datoer i nærliggende tid kan du bruke datovelgeren.

**Retningslinjer:**
-  Dersom du skal hente inn en fødselsdato eller andre datoer lengre tilbake i tid, er ikke datovelgeren et anbefalt alternativ, se studier fra [gov.uk](https://design-system.service.gov.uk/patterns/dates/#asking-for-memorable-dates) I disse tilfellene kan du heller bruke [datofeltet](/planlegging-og-design/guidelines/design/#-datofelt).
-  Legg til korrekt validering og gi brukeren informasjon om hva som er gyldige datoer å velge. Skal brukeren kunne velge datoer tilbake i tid? Innenfor en gitt periode?

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D4833%253A961" allowfullscreen></iframe>

---


## Avkrysningsbokser
Avkrysningsbokser brukes i tilfeller der brukeren kan huke av ett eller flere alternativer fra en liste. Dersom brukeren kun kan velge et av alternativene, bruk [radioknapper](/planlegging-og-design/guidelines/design/#-radioknapper) i stedet. 

**Retningslinjer:**
- Avkrysningsboksene skal stå foran tilhørende tekst, og skal aldri stå alene.
- Deaktiverte avkrysningsbokser bør unngås. Dersom et valg ikke er tilgjengelig bør det heller fjernes og forklares i tekst hvorfor det mangler. 


**Eksempel på bruk:**

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5295%253A1181" %}}

---

## Radioknapper
Radioknapper brukes i tilfeller der brukeren skal velge et alternativ blant flere. Det samme gjelder nedtrekksliste, så vær bevisst på når du bruker hvilken.  

Radioknapper velges når:
- Du ikke har for mange valgalternativer (Maks 7) 
- Det ikke er et tydelig anbefalt valg
- Når brukeren enkelt skal kunne sammenligne alternativene 
- Du ønsker at brukeren skal lese alle alternativene
- Valgalternativene er ukjent for brukeren

**Retningslinjer:**
- Radioknapper skal stå foran tilhørende tekst, og skal aldri stå alene.
- Deaktiverte radioknapper bør unngås. Dersom et valg ikke er tilgjengelig bør det heller fjernes og forklares i tekst hvorfor det mangler. 

**Eksempel på bruk:**

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5655%253A1419" %}}


---

## Nedtrekksliste
Nedtrekksliste brukes i tilfeller der brukeren skal velge et alternativ blant flere. Det samme gjelder radioknapper, så vær bevisst på når du bruker hvilken.  

Nedtrekksliste velges når:
- Du har mange alternativer (mer enn 5)
- Du har et anbefalt valg som vises som forhåndsvalgt
- Det ikke er så viktig for brukeren å kunne sammlenligne alternativene
- Du ønsker ikke at brukeren skal trenge å lese alle alternativene
- Valgalternativene er kjent for brukeren


**Eksempel på bruk:**

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5655%253A1605" %}}

---

## Hjelpetekst
Hjelpetekster er små tekstsnutter som kan benyttes for å gi brukeren ekstra veiledning i utfylling av skjemafelter. Man kan også benytte feltet til å forklare et regelverk, fremmede begreper, eller utdype hvorfor man ber om informasjonen.  


**Retningslinjer:**
- Hjelpetekst plasseres i sammenheng med en label eller tittel som skal utdypes.
- Dersom innholdet er avgjørende informasjon for at brukeren skal kunne fylle ut skjemaet riktig, bør det heller plasseres i en infotekst i grensesnittet (under labelen). 

**Eksempel på bruk:**
{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5711%253A1788" %}}

## Feilmeldinger
Vær kort og tydelig i formuleringen av feilmeldingene og sørg for at brukeren vet hva som må gjøres for å komme videre. Å skrive "Feltet er påkrevd" gir ikke brukeren en forklaring på hva som er feil. 

**Eksempel på forklarende feilmeldinger:** 
- "Postnummer må ha 4 siffer"
- "Du må velge minst ett leveringsalternativ"
- "For å sende inn skjemaet må du bekrefte at navnet er korrekt ved å huke av i avkrysningsboksen"

Les mer om å formidle feil i skjema på [UU-tilsynets nettsider](https://www.uutilsynet.no/wcag-standarden/skjema/38#formidle_feil_i_skjema).


**Retningslinjer:**

- Feilmeldingstekst bør gjenta nøkkelord fra label
- Kravene for å fylle ut skjemaet riktig skal tydelig fremgå av skjemaet uten at brukeren trenger å få noen feilmeldinger fra valideringen for å forstå dette.
- Dersom skjemaet har feil når brukeren forsøker å gå videre, skal feilmeldingsboksen i toppen vise alle feilene og lenke til de feltene feilen gjelder. Feilene skal forsvinne etterhvert som de blir utbedret. ⚠️ NB: Denne funksjonaliteten er ikke tilgjengelig i Altinn Studio enda.

**Eksempel på bruk:**

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5711%253A2073" %}}

---

## Filopplasting

---


### Liste over vedlegg
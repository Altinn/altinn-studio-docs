---
title: UI-komponenter
description: De ulike komponentene er laget for at de skal passe sammen i en større helhet. Det er derfor viktig å følge retningslinjene for hvordan disse brukes for å oppnå et konsistent og gjenkjennbart uttrykk. 
weight: 10
---

## Retningslinjer

UI-komponenter som foreløpig inngår i Altinns bibliotek:
- [Tittel og avsnitt](/nb/app/guidelines/ui-components/#-tittel-og-avsnitt)
- [Logo og kontaktinfo](/nb/app/guidelines/ui-components/#-logo-og-kontaktinfo) *(⚠️ Kommer snart til Altinn Studio)*
- [Knapp og lenke](/nb/app/guidelines/ui-components#-knapp-og-lenke)
- [Inputfelt](/nb/app/guidelines/ui-components/#-inputfelt)
- [Dato](/nb/app/guidelines/ui-components/#-datovelger)
- [Avkrysningsbokser](/nb/app/guidelines/ui-components/#-avkrysningsbokser)
- [Radioknapper](/nb/app/guidelines/ui-components/#-radioknapper)
- [Nedtrekksliste](/nb/app/guidelines/ui-components/#-nedtrekksliste)
- [Hjelpetekst](/nb/app/guidelines/ui-components/#-hjelpetekst)
- [Feilmeldinger](/nb/app/guidelines/ui-components/#-feilmeldinger)
- [Filopplasting](/nb/app/guidelines/ui-components/#-filopplasting)


<hr>

### ❖ Tittel og avsnitt
Det bør som hovedregel alltid være en header (H2) og et avsnitt i starten på en skjamaside for å oppsummere brukerens oppgave.


**Retningslinjer:**
- Tekstlengde på avsnitt strekkes ikke ut 100% i modalboksen, ettersom lange linjer tekst forstyrrer flyten i lesingen. Avsnitt er derfor begrenset til maks 696px i bredden, selv om modalen fyller ut 1056px. 

- Teksten skal alltid være venstrestilt. 

<br>

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2815%253A680" allowfullscreen></iframe>

<hr>

### ❖ Logo og kontaktinfo
Hensikten med komponenten er at brukeren tydelig skal kunne se hvem eieren av tjenesten er, og hvem som kan kontaktes dersom brukeren trenger hjelp med utfylling av skjemaet. Svært mange av henvendelsene til Altinn Brukerstøtte er knyttet til feil kontaktpunkt.


{{% panel theme="warning" %}} ⚠️ Denne komponenten er ikke tilgjengelig i Altinn Studio enda. 
{{% /panel %}}

**Retningslinjer:**
- Logoen bør lastes opp i breddeformat dersom mulig. 
- Bakgrunnsfarge kan tilpasses etatens logo og profil.

<br>

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2816%253A2290" allowfullscreen></iframe>

<hr>

### ❖ Knapp og lenke
Hovedknapp (blå) brukes for å sende brukeren til neste steg. 

**Retningslinjer:**
- Det skal kun være en hovedknapp per side. Sekundærvalg kan legges til som knapper stylet som lenker.
- Teksten på knappen skal være tydelig. Som regel fungerer "Neste" bra, men knappen kan også formuleres som svar på et spørsmål (se eksempel under).
- På siste steg i skjemaet (innsending) skal hovedknappen være grønn.

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D3495%253A809" allowfullscreen></iframe>

<hr>

### ❖ Inputfelt
Inputfelt brukes når brukeren skal føre inn tekst eller tall. 

**Retningslinjer:**
- Et inputfelt skal alltid ha en tilhørende label med forklarende tekst.
- Ta en vurdering på om ekstra beskrivelser og hjelpetekster må kobles til input elementet.
- To inputfelt kan plasseres ved siden av hverandre dersom de på et eller annet vis hører sammen. Se eksempel under.
- Deaktivert felt bør unngås. Dersom et felt ikke kan redigeres bør informasjonen heller presenteres i tekst. 

<br>

**Eksempel på bruk:**
<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2816%253A1332" allowfullscreen></iframe>
<br><br>

<hr>

#### ❖ Stort tekstfelt
Stort tekstfelt benyttes når brukeren skal fylle inn en lengre beskrivelse. De samme retningslinjene som inputfelt gjelder. 

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D3495%253A656" allowfullscreen></iframe>
<br><br>

<hr>

#### ❖ Adresse
For adresse finnes det et fast oppsett der postnr og poststed er sidestilt under datofeltet. Postfelt fylles ut automatisk basert på postnr-input. 

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2911%253A652" allowfullscreen></iframe>
<br><br>

<hr>

#### ❖ Datovelger
I forbindelse med planlegging, eller for datoer i nærliggende tid kan du bruke datovelgeren.

**Retningslinjer:**
-  Dersom du skal hente inn en fødselsdato eller andre datoer lengre tilbake i tid, er ikke datovelgeren et anbefalt alternativ, se studier fra [gov.uk](https://design-system.service.gov.uk/patterns/dates/#asking-for-memorable-dates) I disse tilfellene kan du heller bruke [datofeltet](/planlegging-og-design/guidelines/design/#-datofelt).
-  Legg til korrekt validering og gi brukeren informasjon om hva som er gyldige datoer å velge. Skal brukeren kunne velge datoer tilbake i tid? Innenfor en gitt periode?

<br>

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D4833%253A961" allowfullscreen></iframe>

<hr>

#### ❖ Datofelt
For datoer lengre tilbake i tid, eller datoer brukeren kjenner godt, bør datofelt benyttes. Tre tekstfelt er i disse tilfellene den enkleste måten for brukeren å fylle ut datoen. Dersom det er noe som skal planlegges eller tilfeller der en spesifikk dag er viktig, bruk [datovelgeren](/planlegging-og-design/guidelines/design/#-datovelger) i stedet. 
<br>

{{% panel theme="warning" %}} ⚠️ Denne komponenten er ikke tilgjengelig i Altinn Studio enda. 
{{% /panel %}}

**Retningslinjer:**
- Bruk alltid label på hver av de tre boksene (dag, måned, år), og ledetekst (legend) for hele input-gruppen. 
- Om datagrunnlaget finnes, kan en spesifikk dato være foreslått i feltet. Ellers kan eksempelinnholdet være dagen i dag. 

<br>

**Eksempel på bruk:**
<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5139%253A832" allowfullscreen></iframe>
<br><br>

<hr>

### ❖ Avkrysningsbokser
Avkrysningsbokser brukes i tilfeller der brukeren kan huke av ett eller flere alternativer fra en liste. Dersom brukeren kun kan velge et av alternativene, bruk [radioknapper](/planlegging-og-design/guidelines/design/#-radioknapper) i stedet. 

**Retningslinjer:**
- Avkrysningsboksene skal stå foran tilhørende tekst, og skal aldri stå alene.
- Deaktiverte avkrysningsbokser bør unngås. Dersom et valg ikke er tilgjengelig bør det heller fjernes og forklares i tekst hvorfor det mangler. 

<br>

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5295%253A1181" allowfullscreen></iframe>

<hr>

### ❖ Radioknapper
Radioknapper brukes i tilfeller der brukeren skal velge et alternativ blant flere. Det samme gjelder nedtrekksliste, så vær bevisst på når du bruker hvilken.  

Radioknapper velges når:
- Du ikke har for mange valgalternativer (Maks 7) 
- Det ikke er et tydelig anbefalt valg
- Når brukeren enkelt skal kunne sammenligne alternativene 
- Du ønsker at brukeren skal lese alle alternativene
- Valgalternativene er ukjent for brukeren

<br>

**Retningslinjer:**
- Radioknapper skal stå foran tilhørende tekst, og skal aldri stå alene.
- Deaktiverte radioknapper bør unngås. Dersom et valg ikke er tilgjengelig bør det heller fjernes og forklares i tekst hvorfor det mangler. 

<br>

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5655%253A1419" allowfullscreen></iframe>


<hr>

### ❖ Nedtrekksliste
Nedtrekksliste brukes i tilfeller der brukeren skal velge et alternativ blant flere. Det samme gjelder radioknapper, så vær bevisst på når du bruker hvilken.  

Nedtrekksliste velges når:
- Du har mange alternativer (mer enn 5)
- Du har et anbefalt valg som vises som forhåndsvalgt
- Det ikke er så viktig for brukeren å kunne sammlenligne alternativene
- Du ønsker ikke at brukeren skal trenge å lese alle alternativene
- Valgalternativene er kjent for brukeren

<br>

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5655%253A1605" allowfullscreen></iframe>

<br>
 
<hr>

### ❖ Hjelpetekst
Hjelpetekster er små tekstsnutter som kan benyttes for å gi brukeren ekstra veiledning i utfylling av skjemafelter. Man kan også benytte feltet til å forklare et regelverk, fremmede begreper, eller utdype hvorfor man ber om informasjonen.  

<br>

**Retningslinjer:**
- Hjelpetekst plasseres i sammenheng med en label eller tittel som skal utdypes.
- Dersom innholdet er avgjørende informasjon for at brukeren skal kunne fylle ut skjemaet riktig, bør det heller plasseres i en infotekst i grensesnittet (under labelen). 

<br>

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5711%253A1788" allowfullscreen></iframe>

### ❖ Feilmeldinger
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

<br>

**Eksempel på bruk:**

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5711%253A2073" allowfullscreen></iframe>


<hr>


### ❖ Filopplasting

<hr>


#### ❖ Liste over vedlegg
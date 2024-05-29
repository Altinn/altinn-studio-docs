---
title: Fullmakter fra Enhetsregisteret
linktitle: Fra Enhetsregisteret
description: Altinn bruker Enhetsregisteret som kilde for hvem som har fullmakter på vegne av en virksomhet fra Enhetsregistert
tags: [architecture, security, authorization]
toc: true
weight: 200
---

*Innhold på siden er under arbeid. Innholdet vil ikke være gjeldende før nye [tilgangspakker](/authorization/what-do-you-get/accessgroups/type-accessgroups/) trer i kraft. Dette må derfor ikke ansees som en fasit pr nå*

## Enhetsregisteret som fullmaktskilde
Alle virksomheter i Norge registeres i [Enhetsregisteret](https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/) og får et organisasjonsnummer som de identifiseres ved.
I den forbindelse registreres også personer eller virksomheter som har ulike roller og med det fullmakt til å opptre på vegene av virksomheten i ulike sammenhenger. 

Ulike organisasjonsformer kan registrere ulike roller og hvilke fullmakter disse har vil være avhengig av lovverket som regulerer de ulike organisasjonsformene. 

## Rolletyper fra Enhetsregisteret
Følgende rolletyper finnes i enhetsregisteret: 
|Kode   |Navn                           |
|-------|-------------------------------|
|ADOS|Administrativ enhet - offentlig sektor|
|BEST|Bestyrende reder|
|BOBE|Bostyrer|
|DAGL|Daglig leder|
|DTPR|Deltaker med proratarisk ansvar (delt ansvar)|
|DTSO|Deltaker med solidarisk ansvar (fullt ansvarlig)|
|EIKM|Eierkommune|
|FFØR|Forretningsfører|
|HFOR|Opplysninger om foretaket i hjemlandet|
|HLSE|Helseforetak|
|INNH|Innehaver|
|KDEB|Konkursdebitor|
|KENK|Den personlige konkursen angår|
|KIRK|Inngår i kirkelig fellesråd|
|KOMP|Komplementar (i kommandittselskap?)|
|KONT|Kontaktperson|
|KTRF|Inngår i kontorfellesskap|
|LEDE|Styrets leder|
|MEDL|Styremedlem|
|NEST|Nestleder|
|OBS|Observatør|
|OPMV|er særskilt oppdelt enhet til|
|ORGL|Organisasjonsledd i offentlig sektor|
|REGN|Regnskapsfører|
|REPR|Norsk representant for utenlandsk enhet|
|REVI|Revisor|
|VARA|Varamedlem|

# Organisasjonsformer og roller som Altinn leser inn fra Enhetsregisteret


## Organisasjonsformer for selskap med begrenset ansvar
|Navn (kode)|Beskrivelse|Roller med utvalgte fullmakter|Nøkkel-roller|Roller med knytning uten fullmakter|
|-----------|-----------|------------------------------|-------------|-----------------------------------|
|Aksjeselskap (AS)|En organisasjonsform med begrenset ansvar for eierne (aksjonærene).|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Allmennaksjeselskap (ASA)|Et aksjeselskap med begrenset ansvar for eierne. Denne organisasjonsformen kan brukes av selskaper som har mange aksjonærer, og/eller ønsker mulighet til å innhente kapital fra allmennheten|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Europeisk selskap (SE)|En transnasjonal europeisk selskapsform av allmennaksjeselskapstypen.|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Selskap med begrenset ansvar (BA)|Samvirkeforetak opprettet før 1.januar 2008|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Samvirkeforetak (SA)|Har som hovedformål å fremme medlemmenes økonomiske interesser ved at de deltar i foretakets aktiviteter, enten som forbrukere, leverandører eller på annen lignende måte. Det må være en form for utveksling av varer eller tjenester mellom foretaket og medlemmene. Medlemmene har begrenset økonomisk ansvar. Det vil si at de ikke har ansvar for foretakets gjeld utover den innskutte andelskapitalen. Foretakets overskudd blir enten stående i foretaket eller fordelt mellom medlemmene ut fra den enkeltes andel i omsetningen.|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
## Organisasjonsformer for selskap med ubegrenset ansvar 
|Navn (kode)|Beskrivelse|Roller med utvalgte fullmakter|Nøkkel-roller|Roller med knytning uten fullmakter|
|-----------|-----------|------------------------------|-------------|-----------------------------------|
|Enkeltpersonforetak (ENK)|I et enkeltpersonforetak er én person fullt økonomisk ansvarlig for den næringsaktiviteten som drives.|KONT, FFØR, REGN, REVI|DAGL, LEDE, *INNH|NEST, MEDL, VARA, OBS|
|Ansvarlig selskap med delt ansvar (DA)|Et ansvarlig selskap med delt ansvar er et selskap med to eller flere eiere (deltakere). Deltakerne har til sammen et personlig ansvar for hele gjelden, men hver enkelt deltaker er bare ansvarlig for sin ansvarsandel.|KONT, FFØR, REGN, REVI|DAGL, LEDE, **DTPR|NEST, MEDL, VARA, OBS, *DTPR|
|Ansvarlig selskap med solidarisk ansvar (ANS)|Ansvarlig selskap er et selskap med to eller flere eiere (deltakere). Deltakerne har et ubegrenset personlig ansvar for hele gjelden.|KONT, FFØR, REGN, REVI|DAGL, LEDE, **DTSO|NEST, MEDL, VARA, OBS, *DTSO|
|Kommandittselskap (KS)|Et kommandittselskap er et selskap hvor minst en deltaker hefter ubegrenset for selskapsforpliktelsene (komplementar), og minst en deltaker har begrenset sitt ansvar til et nærmere fastsatt innskudd (kommandittist)|KONT, FFØR, REGN, REVI|DAGL, LEDE, **KOMP|NEST, MEDL, VARA, OBS, *KOMP|

Roller merket * betyr at andre organisasjoner/personer som har en spesial rolle for denne organisasjonsformen. 

Roller merket ** betyr at bare når rolleinnehaver er en person så får denne nøkkelrolle for virksomheten. Hvis rolleinnehaver er en organisasjon så får man en knytning uten fullmakter til organisasjonen. 

|Navn (kode)|Beskrivelse|Roller med utvalgte fullmakter|Nøkkel-roller|Roller med knytning uten fullmakter|
|-----------|-----------|------------------------------|-------------|-----------------------------------|
|Tingsrettslig sameie (SAM)|Et tingsrettslig sameie er en måte to eller flere personer kan eie en eller flere formuesgjenstander på. Eksempel: når to eller flere eier en hytte, en vei, en russebuss eller lignende sammen. |KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Borettslag (BRL)|Et borettslag eies av de som bor der. Når du kjøper en bolig i et borettslag, blir du samtidig andelseier. Andelseierne i borettslaget eier bygninger og tomt i fellesskap, og tar beslutninger om oppussing, vedlikehold og påkostninger av bygninger og fellesarealer. Som andelseier er du ikke ansvarlig for lagets forpliktelser overfor kreditorer.|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Boligbyggelag (BBL)|Et boligbyggelag har til hovedformål å bygge, omsette og forvalte boliger for sine andelseiere. Et boligbyggelag kan gjerne bestå av flere borettslag.|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Eierseksjonssameie (ESEK)|Et eierseksjonssameie er en bebygd eiendom som er seksjonert og tinglyst på et gårds- og bruksnummer. Eiendommen eies i fellesskap, men eierne har enerett til å bruke sin seksjon. Et eierseksjonssameie kan ha både boligseksjoner og næringsseksjoner.|KONT, FFØR, REGN, REVI|LEDE|NEST, MEDL, VARA, OBS|
## Organisasjonsformer for spesielle bransjer
|Navn (kode)|Beskrivelse|Roller med utvalgte fullmakter|Nøkkel-roller|Roller med knytning uten fullmakter|
|-----------|-----------|------------------------------|-------------|-----------------------------------|
|Sparebank (SPA)|En sparebank er en bank som er organisert som en selveiende institusjon, det vil si uten eksterne eiere. Dette til forskjell fra en forretningsbank organisert som et aksjeselskap og altså med aksjonærene som eiere. |KONT, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Pensjonskasse (PK)|Pensjonskasse er en annen form for pensjonsforsikringshåndtering. Enkelte større selskaper velger å ha sin egen pensjonskasse i stedet for å tegne en kollektiv pensjonsavtale med et forsikringsselskap. Forvaltning av pensjonskasser gjøres av forsikringsselskaper, egne spesialiserte selskaper eller for noen av de større av seg selv. Eksempler på det siste er Statens pensjonskasse og Telenor Pensjonskasse.|KONT, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Gjensidig forsikringsselskap (GFS)|Gjensidig forsikringsselskap en offentlig selskaps-/organisasjonsform som ofte nyttes ved organisering av forsikringsselskap. Selskapsformen innebærer at forsikringstagerne danner og eier selskapet, dets eventuelle aktiva og også deler den risikoen selskapet har påtatt seg. Dette innebærer altså at kunde- og eiergruppen er sammenfallende.|KONT, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Partrederi (PRE)|Et partrederi er et selskap som har til formål å drive rederivirksomhet. I et partrederi med solidarisk ansvar har alle deltakerne et personlig ansvar for hele gjelden. Det en deltaker ikke kan betale, kan kreves helt og fullt fra de andre deltakerne. I et partrederi med delt ansvar har deltakerne et personlig ansvar for hele gjelden, men hver enkelt deltaker er bare ansvarlig for sin ansvarsdel.|KONT, FFØR, REGN, REVI|LEDE, *BEST|NEST, MEDL, VARA, OBS, *DTPR|
|Verdipapirfond (VPFO)|I et verdipapirfond går andelseiere sammen om å plassere sine midler i verdipapirmarkedet. Fondet forvaltes av et forvaltningsselskap med konsesjon fra Finanstilsynet.Verdipapirfond deles inn i fem hovedgrupper etter hvilke verdier de investerer i: aksjefond, obligasjonsfond, pengemarkedsfond, kombinasjonsfond og spesialfond.|KONT, FFØR, REGN, REVI|DAGL|(ingen)|
|Annen juridisk person (ANNA)|Annen juridisk person er en virksomhet som kan påta seg rettigheter og plikter. Denne organisasjonsformen skal brukes for en svært begrenset gruppe virksomheter, og bare når ingen av de andre organisasjonsformene er aktuelle. Eksempler på virksomheter som kan registreres som annen juridisk person er ambassader, bygdeallmenninger, fjellstyre, katolske menigheter, reinbeitedistrikt, statsallmenninger, stortingsgrupper, interkommunale politiske råd og kommunalt oppgavefellesskap.|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
## Organisasjoner for frivillig sektor
|Navn|Beskrivelse|Roller med utvalgte fullmakter|Nøkkel-roller|Roller med enkel knytning uten fullmakter|
|----|-----------|------------------------------|-------------|------------------------------------------|
|Forening/lag/innretning (FLI)|En forening er en selveiende sammenslutning med medlemmer, som skal fremme ett eller flere formål av ideelt, politisk eller annen art. Rettsforholdet i foreninger er ikke regulert i lov, men det har over tid utviklet seg foreningsrettslige prinsipper.|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Stiftelse (STI)|En stiftelse er en formuesverdi som ved testamente, gave eller annen rettslig disposisjon selvstendig er stilt til rådighet for et bestemt formål. Formålet kan være av ideell, humanitær, kulturell, sosial, utdanningsmessig, økonomisk eller annen art. Stiftelser må ha en grunnkapital. Kravet til minste grunnkapital er 100 000 kroner for alminnelige stiftelser og 200 000 kroner for stiftelser som driver næringsaktivitet.|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
## Organisasjonsformer for offentlig sektor
|Navn (kode)|Beskrivelse|Roller med utvalgte fullmakter|Nøkkel-roller|Roller med knytning uten fullmakter|
|-----------|-----------|------------------------------|-------------|-----------------------------------|
|Kommune (KOMM)|(mangler)|KONT, REGN, REVI, FFØR|DAGL|(ingen)|
|Staten (STAT)|(mangler)|KONT, REGN, REVI, FFØR|DAGL|(ingen)|
|Fylkeskommune (FYLK)|(mangler)|KONT, REGN, REVI, FFØR|DAGL|(ingen)|
|Organisasjonsledd (ORGL)|(mangler)|KONT, REGN, REVI, FFØR|DAGL, LEDE|NEST, MEDL, VARA, OBS, *ORGL|
|Administrativ enhet -offentlig sektor (ADOS)|(mangler)|KONT,REGN, REVI|LEDE|NEST, MEDL, VARA, OBS, *ADOS|
|Interkommunalt selskap (IKS)|Er en norsk organisasjonsform for selskaper innen offentlig sektor der flere kommuner og/eller fylkeskommuner er eiere. Selskapsdriften reguleres av Lov om interkommunale selskaper. Interkommunale vannverk, arkivdrift og regionmuseer er typiske funksjonsområder for interkommunale selskaper.|KONT, FFØR, REGN, REVI|DAGL,LEDE|*DTPR, NEST, MEDL, VARA, OBS, |
|Kommunalt foretak (KF)|er betegnelse for en selskapsform som brukes for virksomheter som er eid av norske kommuner.|KONT, FFØR, REGN, REVI,|DAGL, LEDE,|NEST, MEDL, VARA, OBS, *EIKM|
|Fylkeskommunalt foretak (FKF)|er betegnelse for en selskapsform som brukes for virksomheter som er eid av fylkeskommune .|KONT, FFØR, REGN, REVI,|DAGL, LEDE,|NEST, MEDL, VARA, OBS, *EIKM|
|Statsforetak (SF)|er en norsk selskapsform regulert av lov om statsforetak av 30. august 1991. Statsforetak stiftes av Kongen i statsråd og eies av den norske stat i sin helhet, representert ved et departement.|KONT, REGN, REVI,|DAGL, LEDE,|NEST, MEDL, VARA, OBS|

Roller merket * betyr at andre organisasjoner/personer som har en spesial rolle for denne organisasjonsformen. 
## Organisasjonsformer for utenlandske virksomheter
|Navn (kode)|Beskrivelse|Roller med utvalgte fullmakter|Nøkkel-roller|Roller med knytning uten fullmakter|
|-----------|-----------|------------------------------|-------------|-----------------------------------|
|Norskregistrert utenlandsk foretak (NUF)|Norskregistrert utenlandsk foretak er en norsk filial av et utenlandskregistrert selskap. I denne sammenheng må det skilles mellom «utenlandsk selskap» i selskapsrettslig og skatterettslig forstand. NUF er norske avdelinger av utenlandske selskap i en selskapsrettslig forstand, og kan derfor godt være skattemessig tilhørende til Norge. Ordningen blir anvendt av flere større selskaper som driver på tvers av landegrensene. Innføringen av selskapsformen NUF i norsk selskapsrett var et resultat av EØS-avtalen, ettersom fri etableringsrett på tvers av landegrenser er et prinsipp i EU-retten.|KONT, FFØR, REGN, REVI,|DAGL, LEDE, *REPR| NEST, MEDL, VARA, OBS|
|Europeisk selskap (SE)|Europeisk selskap er en transnasjonal europeisk selskapsform av allmennaksjeselskapstypen. Selskapsformen ble etablert fra og med 8. oktober 2004. Rettsgrunnlaget er EU-forordning 2157/2001.|KONT, FFØR, REGN, REVI,|DAGL,  LEDE| NEST, MEDL, VARA, OBS|
|Utenlandsk enhet (UTLA)|(mangler)|KONT, FFØR|DAGL|(ingen)|
|Europeisk økonomisk foretaksgruppe (EOFG)|(mangler)|KONT, FFØR, REGN, REVI,|DAGL, LEDE| NEST, MEDL, VARA, OBS|

Roller merket * betyr at andre organisasjoner/personer som har en spesial rolle for denne organisasjonsformen. 
## Andre særskilte organisasjonsformer 
|Navn (kode)|Beskrivelse|Roller med utvalgte fullmakter|Nøkkel-roller|Roller med knytning uten fullmakter|
|-----------|-----------|------------------------------|-------------|-----------------------------------|
|Kontorfellesskap (KTRF)|(mangler)|KONT, REGN, REVI|(ingen)|*KTRF|
|Særskilt oppdelt enhet jfr mval § 2-2 (OPMV)|(mangler)|KONT, FFØR, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS, *OPMV|
|Andre bo (BO)|Andre bo er en organisasjonsform som brukes ved registrering av dødsbo og felleseiebo.|KONT, REGN, REVI|DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Konkursbo (KBO)|(mangler)|REGN, REVI|BOBE| (ingen)|
|Tvangsregistrert for MVA (TVAM)|(mangler)|KONT, FFØR, REGN, REVI|INNH, DAGL, LEDE|NEST, MEDL, VARA, OBS|
|Andre enkeltpersoner som registreres i tilknyttet register (PERS)|(mangler)|KONT, REGN, REVI|(ingen)|(ingen)|
|Den norske kirke (KIRK)|Trossamfunnet Den norske kirke registreres i Enhetsregisteret med organisasjonsformen Den norske kirke. Dette gjelder både kirkelige fellesråd, soknene eller menighetene.|KONT, FFØR, REGN, REVI,|DAGL, LEDE,|NEST, MEDL, VARA, OBS, *KIRK|
|Annet foretak iflg. særskilt lov (SÆR)|Et særlovselskap skiller seg fra andre statlige aksjeselskap og statsforetak ved at hvert enkelt av selskapene er opprettet og drives med hjemmel i en egen lov,[1] eller en lov som gjelder flere selskaper av lignende karakter. Dette omfatter blant annet helseforetak (HF), regionalt helseforetak (RHF), studentsamskipnader og enkelte folkehøgskoler. Særlovselskapene er i hovedsak opprettet der hovedvirksomheten er et monopol eller brukes som et politisk instrument. Oppgavene varierer fra pengespillforvaltning, næringsvirksomhet, bankvirksomhet til disponering av budsjettpolitiske virkemidler.|KONT, FFØR, REGN, REVI,|DAGL, LEDE,|NEST, MEDL, VARA, OBS, *HLSE|

Roller merket * betyr at andre organisasjoner/personer som har en spesial rolle for denne organisasjonsformen. 
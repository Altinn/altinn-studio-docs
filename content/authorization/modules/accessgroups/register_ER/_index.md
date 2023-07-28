---
title: Fullmakter fra Enhetsregisteret
linktitle: Fra Enhetsregisteret
description: Altinn bruker Enhetsregisteret som kilde for hvem som har fullmakter på vegne av en virksomhet fra Enhetsregistert
tags: [architecture, security, authorization]
toc: true
weight: 200
---

*Innhold på siden er under arbeid. Dette må derfor ikke ansees som en fasit pr nå*

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



## Organisasjonsformer og roller som Altinn leser inn fra Enhetsregisteret
### Organisasjonsformer for selskap med begrenset ansvar
|Kode|Navn|Beskrivelse|Roller|
|----|----|-----------|------|
|AS|Aksjeselskap|Et aksjeselskap er en organisasjonsform med begrenset ansvar for eierne (aksjonærene). Aksjekapitalen må være minst 30 000 kroner.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|ASA|Allmennaksjeselskap|Et allmennaksjeselskap er et aksjeselskap med begrenset ansvar for eierne. Denne organisasjonsformen kan brukes av selskaper som har mange aksjonærer, og/eller ønsker mulighet til å innhente kapital fra allmennheten|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|SE|Europeisk selskap|Europeisk selskap er en transnasjonal europeisk selskapsform av allmennaksjeselskapstypen. Selskapsformen ble etablert fra og med 8. oktober 2004. Rettsgrunnlaget er EU-forordning 2157/2001.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|BA|Selskap med begrenset ansvar|Samvirkeforetak opprettet før 1.januar 2008|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|SA|Samvirkeforetak|Et samvirkeforetak har som hovedformål å fremme medlemmenes økonomiske interesser ved at de deltar i foretakets aktiviteter, enten som forbrukere, leverandører eller på annen lignende måte. Det må være en form for utveksling av varer eller tjenester mellom foretaket og medlemmene. Medlemmene har begrenset økonomisk ansvar. Det vil si at de ikke har ansvar for foretakets gjeld utover den innskutte andelskapitalen. Foretakets overskudd blir enten stående i foretaket eller fordelt mellom medlemmene ut fra den enkeltes andel i omsetningen.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
### Organisasjonsformer for selskap med ubegrenset ansvar 
|Kode|Navn|Beskrivelse|Roller|
|----|----|-----------|------|
|ENK|Enkeltpersonforetak|I et enkeltpersonforetak er én person fullt økonomisk ansvarlig for den næringsaktiviteten som drives. Ved vurdering av om enkeltpersonforetaket driver selvstendige næringsaktiviteter, legges det vekt på hvilke aktiviteter foretaket driver med og omfanget av disse hvor mye tid som går med til å drive foretaket innsats av arbeidskraft hvor stor den økonomiske omsetningen er. Hobbyer eller rene engangshendelser blir ikke definert som næringsaktiviteter."	|DAGL, KONT, FFØR, *INNH, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|DA|Ansvarlig selskap med delt ansvar|Et ansvarlig selskap med delt ansvar er et selskap med to eller flere eiere (deltakere). Deltakerne har til sammen et personlig ansvar for hele gjelden, men hver enkelt deltaker er bare ansvarlig for sin ansvarsandel.|DAGL, KONT, FFØR, *DTPR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|ANS|Ansvarlig selskap med solidarisk ansvar|Ansvarlig selskap er et selskap med to eller flere eiere (deltakere). Deltakerne har et ubegrenset personlig ansvar for hele gjelden.	|DAGL, KONT, FFØR, *DTSOR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|KS|Kommandittselskap|Et kommandittselskap er et selskap hvor minst en deltaker hefter ubegrenset for selskapsforpliktelsene (komplementar), og minst en deltaker har begrenset sitt ansvar til et nærmere fastsatt innskudd (kommandittist)	|DAGL, KONT, FFØR, *KOMP, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
### Organisasjonsformer for eierskap av bolig/eiendom/formuesgjenstander
|Kode|Navn|Beskrivelse|Roller|
|----|----|-----------|------|
|SAM|Tingsrettslig sameie|Et tingsrettslig sameie er en måte to eller flere personer kan eie en eller flere formuesgjenstander på. Eksempel på tingsrettslig sameie er når to eller flere eier en hytte, en vei, en russebuss eller lignende sammen, og det er felles eierskap til sameietingen som skal registreres.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|BRL|Borettslag|Et borettslag eies av de som bor der. Når du kjøper en bolig i et borettslag, blir du samtidig andelseier. Andelseierne i borettslaget eier bygninger og tomt i fellesskap, og tar beslutninger om oppussing, vedlikehold og påkostninger av bygninger og fellesarealer. Som andelseier er du ikke ansvarlig for lagets forpliktelser overfor kreditorer.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|BBL|Boligbyggelag|Et boligbyggelag har til hovedformål å bygge, omsette og forvalte boliger for sine andelseiere. Et boligbyggelag kan gjerne bestå av flere borettslag.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|ESEK|Eierseksjonssameie|Et eierseksjonssameie er en bebygd eiendom som er seksjonert og tinglyst på et gårds- og bruksnummer. Eiendommen eies i fellesskap, men eierne har enerett til å bruke sin seksjon. Et eierseksjonssameie kan ha både boligseksjoner og næringsseksjoner.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
### Organisasjonsformer for spesielle bransjer
|Kode|Navn|Beskrivelse|Roller|
|----|----|-----------|------|
|SPA|Sparebank|En sparebank er en bank som er organisert som en selveiende institusjon, det vil si uten eksterne eiere. Dette til forskjell fra en forretningsbank organisert som et aksjeselskap og altså med aksjonærene som eiere. |DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|PK|Pensjonskasse|Pensjonskasse er en annen form for pensjonsforsikringshåndtering. Enkelte større selskaper velger å ha sin egen pensjonskasse i stedet for å tegne en kollektiv pensjonsavtale med et forsikringsselskap. Forvaltning av pensjonskasser gjøres av forsikringsselskaper, egne spesialiserte selskaper eller for noen av de større av seg selv. Eksempler på det siste er Statens pensjonskasse og Telenor Pensjonskasse.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|GFS|Gjensidig forsikringsselskap|Gjensidig forsikringsselskap en offentlig selskaps-/organisasjonsform som ofte nyttes ved organisering av forsikringsselskap. Selskapsformen innebærer at forsikringstagerne danner og eier selskapet, dets eventuelle aktiva og også deler den risikoen selskapet har påtatt seg. Dette innebærer altså at kunde- og eiergruppen er sammenfallende.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|PRE|Partrederi|Et partrederi er et selskap som har til formål å drive rederivirksomhet. I et partrederi med solidarisk ansvar har alle deltakerne et personlig ansvar for hele gjelden. Det en deltaker ikke kan betale, kan kreves helt og fullt fra de andre deltakerne. I et partrederi med delt ansvar har deltakerne et personlig ansvar for hele gjelden, men hver enkelt deltaker er bare ansvarlig for sin ansvarsdel.|DAGL, KONT, FFØR, *BEST, *DTPR LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|VPFO|Verdipapirfond|I et verdipapirfond går andelseiere sammen om å plassere sine midler i verdipapirmarkedet. Fondet forvaltes av et forvaltningsselskap med konsesjon fra Finanstilsynet.Verdipapirfond deles inn i fem hovedgrupper etter hvilke verdier de investerer i: aksjefond, obligasjonsfond, pengemarkedsfond, kombinasjonsfond og spesialfond.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|ANNA|Annen juridisk person|Annen juridisk person er en virksomhet som kan påta seg rettigheter og plikter. Denne organisasjonsformen skal brukes for en svært begrenset gruppe virksomheter, og bare når ingen av de andre organisasjonsformene er aktuelle. Eksempler på virksomheter som kan registreres som annen juridisk person er ambassader, bygdeallmenninger, fjellstyre, katolske menigheter, reinbeitedistrikt, statsallmenninger, stortingsgrupper, interkommunale politiske råd og kommunalt oppgavefellesskap.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
### Organisasjoner for frivillig sektor
|Kode|Navn|Beskrivelse|Roller|
|----|----|-----------|------|
|FLI|Forening/lag/innretning|En forening er en selveiende sammenslutning med medlemmer, som skal fremme ett eller flere formål av ideelt, politisk eller annen art. Rettsforholdet i foreninger er ikke regulert i lov, men det har over tid utviklet seg foreningsrettslige prinsipper.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|STI|Stiftelse|En stiftelse er en formuesverdi som ved testamente, gave eller annen rettslig disposisjon selvstendig er stilt til rådighet for et bestemt formål. Formålet kan være av ideell, humanitær, kulturell, sosial, utdanningsmessig, økonomisk eller annen art. Stiftelser må ha en grunnkapital. Kravet til minste grunnkapital er 100 000 kroner for alminnelige stiftelser og 200 000 kroner for stiftelser som driver næringsaktivitet.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
### Organisasjonsformer for offentlig sektor
|Kode|Navn|Beskrivelse|Roller|
|----|----|-----------|------|
|KOMM|Kommune|(mangler)|DAGL, KONT|
|STAT|Staten|(mangler)|DAGL, KONT|
|FYLK|Fylkeskommune|(mangler)|DAGL, KONT|
|ORGL|Organisasjonsledd|(mangler)|DAGL, KONT, *ORGL|
|ADOS|Administrativ enhet -offentlig sektor|(mangler)|DAGL, KONT, *ADOS|
|IKS|Interkommunalt selskap|Er en norsk organisasjonsform for selskaper innen offentlig sektor der flere kommuner og/eller fylkeskommuner er eiere. Selskapsdriften reguleres av Lov om interkommunale selskaper. Interkommunale vannverk, arkivdrift og regionmuseer er typiske funksjonsområder for interkommunale selskaper.|DAGL, KONT, FFØR, *DTPR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|KF|Kommunalt foretak|er betegnelse for en selskapsform som brukes for virksomheter som er eid av norske kommuner.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI, *EIKM|
|FKF|Fylkeskommunalt foretak|er betegnelse for en selskapsform som brukes for virksomheter som er eid av fylkeskommune .|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI, *EIKM|
|SF|Statsforetak|er en norsk selskapsform regulert av lov om statsforetak av 30. august 1991. Statsforetak stiftes av Kongen i statsråd og eies av den norske stat i sin helhet, representert ved et departement.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|KIRK|Den norske kirke|Trossamfunnet Den norske kirke registreres i Enhetsregisteret med organisasjonsformen Den norske kirke. Dette gjelder både kirkelige fellesråd, soknene eller menighetene.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI, *KIRK|
|SÆR|Annet foretak iflg. særskilt lov|Et særlovselskap skiller seg fra andre statlige aksjeselskap og statsforetak ved at hvert enkelt av selskapene er opprettet og drives med hjemmel i en egen lov,[1] eller en lov som gjelder flere selskaper av lignende karakter. Dette omfatter blant annet helseforetak (HF), regionalt helseforetak (RHF), studentsamskipnader og enkelte folkehøgskoler. Særlovselskapene er i hovedsak opprettet der hovedvirksomheten er et monopol eller brukes som et politisk instrument. Oppgavene varierer fra pengespillforvaltning, næringsvirksomhet, bankvirksomhet til disponering av budsjettpolitiske virkemidler.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI, *HLSE|

### Organisasjonsformer for utenlandske virksomheter
|Kode|Navn|Beskrivelse|Roller|
|----|----|-----------|------|
|NUF|Norskregistrert utenlandsk foretak|Norskregistrert utenlandsk foretak er en norsk filial av et utenlandskregistrert selskap. I denne sammenheng må det skilles mellom «utenlandsk selskap» i selskapsrettslig og skatterettslig forstand. NUF er norske avdelinger av utenlandske selskap i en selskapsrettslig forstand, og kan derfor godt være skattemessig tilhørende til Norge. Ordningen blir anvendt av flere større selskaper som driver på tvers av landegrensene. Innføringen av selskapsformen NUF i norsk selskapsrett var et resultat av EØS-avtalen, ettersom fri etableringsrett på tvers av landegrenser er et prinsipp i EU-retten.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI, *REPR|
|SE|Europeisk selskap|Europeisk selskap er en transnasjonal europeisk selskapsform av allmennaksjeselskapstypen. Selskapsformen ble etablert fra og med 8. oktober 2004. Rettsgrunnlaget er EU-forordning 2157/2001.|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|
|UTLA|Utenlandsk enhet|(mangler)|ingen roller|
|EOFG|Europeisk økonomisk foretaksgruppe|(mangler)|DAGL, KONT, FFØR, LEDE, NEST, MEDL, VARA, OBS, REGN, REVI|

### Andre særskilte organisasjonsformer 
|Kode   |Navn                           |Beskrivelse|
|-------|-------------------------------|-------------------------------------------------------------
|KTRF|Kontorfellesskap|(mangler)|DAGL, KONT, FFØR, REGN, REVI, *KTRF|
|OPMV|Særskilt oppdelt enhet jfr mval § 2-2|(mangler)|DAGL, KONT, FFØR, REGN, REVI, *OPMV|
|BO|Andre bo|Andre bo er en organisasjonsform som brukes ved registrering av dødsbo og felleseiebo.|DAGL, KONT, FFØR, REGN, REVI|
|KBO|Konkursbo|(mangler)|BOBE, KDEB, KENK|
|TVAM|Tvangsregistrert for MVA|(mangler)|INNH, REGN, REVI|
|PERS|Andre enkeltpersoner som registreres i tilknyttet register|(mangler)|DAGL, KONT, FFØR, REGN, REVI|

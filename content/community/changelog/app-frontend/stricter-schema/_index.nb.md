---
title: Oppgradering av JsonSchema (2023)
linktitle: JsonSchema
description: Ofte stilte spørsmål om den nye strengere JsonSchemaen som ble introdusert i 2023
toc: true
---

# Hva?
I starten av september 2023 oppgraderte vi layout-JsonSchema som brukes av Altinn 3-apper for å verifisere layoutfilene.
Dette gjorde JsonSchemaen strengere og kan føre til at appen din viser flere valideringsfeil (vanligvis gule linjer)
når du utvikler lokalt i Visual Studio Code (eller lignende IDE-er).

Dette dokumentet beskriver hvordan du kan rette de vanligste feilene i appen din.

# Hvorfor?
Når vi legger til nye egenskaper og funksjoner i Altinn 3-apper, pleide vi å oppdatere JsonSchema-filen manuelt. Etter
hvert har dette ført til en JsonSchema som avvek litt fra den interne funksjonaliteten til appens frontend. Med denne
endringen vil vi gjøre JsonSchemaen strengere og genererere JsonSchema fra en felles konfigurasjon som vi også bruker
for våre interne typer i appens frontend. Filosofien bak endringen er å gjøre JsonSchemaen strengere, fordi et strengt
skjema vil gjøre det enklere å finne feil i layoutfilene - og forhåpentligvis føre til mindre forvirring og frustrasjon
for apputviklere i fremtiden.

# Vanlige feil og hvordan du kan fikse dem

## Feilmelding vises i egenskapen id for komponenten
Tidligere endringer i JsonSchemaen har gjort formatet for **id**-egenskapen strengere. Du bør sørge for å unngå å
navngi **id** som **mitt-felt-{nummer}**, siden en etterfølgende **{bindestrek}{nummer}** brukes internt i appens
frontend for å skille mellom flere forekomster av komponenter i repeterende grupper. Å navngi komponenten din på denne
måten kan føre til uventet oppførsel i appens frontend.

PS: Sørg også for at komponentens ID-er er unike blant komponentene på siden og alle andre sider i samme prosess-steg.
JsonSchema kan ikke validere dette for deg, men å gjenbruke komponent-ID-er vil føre til at alle komponentene som bruker
samme ID blir skjult når bare én av dem er skjult.

## En Gruppe-komponent viser merkelige valideringsfeil
**Group**-komponenten har blitt delt opp i 4 forskjellige under-typer, siden hver av dem har blitt mer komplekse over
tid. Komponenten din må matche en av disse under-typene, og JsonSchema-valideringen din kan bli forvirret om hvilken du
undertype du prøver å bruke hvis noen egenskaper er brukt som ikke fungerer på undertypen du ser ut til å bruke.

Grupper kan nå være en av følgende:
1. Repeterende grupper (med **maxCount** satt til et tall større enn 1)
2. Repeterende grupper brukt for å liste opp Likert-komponenter (med **maxCount** satt til et tall større enn 1, og **edit.mode** satt til **likert**)
3. Ikke-repeterende grupper (med **maxCount** satt til 1, 0 eller udefinert)
4. Ikke-repeterende grupper med en **panel**-egenskap

Det vanligste problemet her oppstår hvis **dataModelBindings** eller **triggers** er satt på en ikke-repeterende
gruppe-undertype. Ikke-repeterende grupper støtter ikke datamodellbindinger eller triggere, så du bør fjerne disse
egenskapene hvis du prøver å bruke en ikke-repeterende gruppe. For begge typer repeterende grupper kreves
**dataModelBindings**, og du må peke på en matrise-/listestruktur i datamodellen ved hjelp av **group**-egenskapen inne
i **dataModelBindings**. Uten en datamodellbinding vil den repeterende gruppen ikke kunne lagre data, og relasjonen til
komponentene inni den kan falle fra hverandre.

## En FileUpload- eller FileUploadWithTag-komponent advarer om manglende påkrevd egenskap i dataModelBindings
En **FileUpload**- eller **FileUploadWithTag** _kan_ ha en **dataModelBindings**-egenskap, og den _er_ påkrevd når den
konfigureres [inne i en repeterende gruppe](/nb/app/development/ux/fields/grouping/repeating/attachments/).
**dataModelBindings**-egenskapen kan imidlertid trygt utelates helt hvis komponenten ikke er plassert inne i en
repeterende gruppe.

## En komponent advarer om en ikke-støttet egenskap i textResourceBindings
**textResourceBindings**-egenskapen støtter nå bare et visst sett med egenskaper, og tekstressursbindinger som ikke er
implementert/håndteres noe sted i appens frontend vil føre til en valideringsfeil. De støttede egenskapene for hver
komponenttype bør nå være oppført i forslagene fra Visual Studio Code.

## En komponent advarer om dataModelBindings
Å binde en komponent til datamodellen gir bare mening for skjemakomponenter som kan lagre data. Hele egenskapen kan
trygt fjernes for komponenter som ikke lagrer data, som **Header**, **Paragraph**, **Button**, osv.

## En komponent advarer om readOnly/required-egenskapen
**readOnly**- og **required**-egenskapene støttes bare av skjemakomponenter. Disse egenskapene kan trygt fjernes for
komponenter som **Header**, **Paragraph**, **Button**, osv., siden de ikke vil ha noen effekt på komponenten.

## En Header-komponent advarer om manglende size-egenskap
Mange konfigurasjoner av **Header**-komponenten ser ut til å mangle **size**-egenskapen. Denne egenskapen er påkrevd.

## En komponent annet enn Header advarer om size-egenskapen
Mange konfigurasjoner ser også ut til å ha **size**-egenskapen satt på komponenter som ikke er **Header**-komponenten.
Dette skyldes mest sannsynlig kopiering av **Header**-komponenten og at man har glemt å fjerne **size**-egenskapen.
**size**-egenskapen støttes bare av **Header**-komponenten og har ingen effekt på andre komponenter
(vanligvis brukt på **Paragraph** eller **Panel**).

## Egenskapen componentType er ikke tillatt
Noen eksempler i dokumentasjonen brukte denne egenskapen, men den har ikke blitt brukt på en stund i koden vår. Den kan
trygt fjernes fra layoutfilen din.

## Å sette optionsId til null gir en advarsel
For komponenter som bruker kodelister (som **Checkboxes**, **RadioButtons**, **Dropdown**, osv.) bør du sette _enten_
**options**, **optionsId** _eller_ **source**. Å sette mer enn en av disse, eller å sette en av dem til **null**, kan
føre til uventet oppførsel i appens frontend eller backend. Fjerning av alternativet som er satt til **null** bør løse
eventuelle problemer.
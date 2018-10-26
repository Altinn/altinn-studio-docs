---
title: Tjenester 3.0 - Runtime - Arkitektur
linktitle: Arkitektur
description: Beskrivelse av arkitektur for Runtime
tags: ["tjenester 3.0"]
weight: 100
---
{{% notice warning %}}
MERK: En del av valgene som er gjort på arkitektur for runtime er ikke endelig landet
og det kan endres.
{{% /notice %}}

## Arkitektur runtime
Runtime delen av Altinn Tjenester 3.0 kjøres både som del av Altinn Studio, for å teste
sluttbrukertjenester under utvikling, og den kjøres som del av sluttbrukerløsningen.

### Frontend
For tjenester med GUI vil frontend være en REACT-App som er utviklet som del av 
tjenesteutviklingen. For de fleste vil dette være en app som er generert av Altinn 
Studio uten at man har måtte vært hands on på koden. 

Denne REACT applikasjonen benytter seg av API fra backend for å hente opp konfigurasjon om
tjenesten som skjemalayout som forteller hvilke skjemaelementer som skal vises (tekstbokser,
nedtrekslister osv). I tilegg bruker den API for å hente ut brukerdata og for å lagre/oppdatere brukerdata.

Se detaljer for [arkitekturen for REACT-App](react-app)

For tjenester med med større 
behov enn Altinn Studio tilbyr i sin UI designer vil man kunne kode denne for "hånd" og
i teorien også bruke andre rammverk enn REACT.

### Backend
Backend er basert på ASP.Net Core og er en MVC applikasjon som ved hjelp av 
definerte Interface kjører selve tjenestelogikken som er utviklet av Altinn Studio.

Sentralt i arkitekturen er at hver enkelt request mot runtime inneholder nok informasjon
til at plattformen klarer å identifisere hvilken tjeneste som etterspørres og eventuelt 
hvilken konkret instans av tjenesten man ønsker. 

Basert på dette lastes tjenesteimplementasjonen slik at forretningsregler 

All dette styres av en MVC kontroller som tar imot 

#### Tjenesteimplementasjon.
Tjenesteimplementasjonen er C# kode som er generert/utviklet av tjenesteutviklere.
Implementasjonen implementerer en Interface som gjør at alle tjenester får samme 
grensesnitt mot plattformen.

#### Events
For å gi tjenesteutvikler en konsistent og klar eventmodell kjører Tjenester 3.0 plattformen
en rekke events i gitt rekkefølge. 
Tjenesteimplementasjonen blir trigget for hvert av disse eventene slik at tjenesteutvikler
kan definere forretningslogikk som skal kjøres.

##### Instansiering
Events tilknyttet instansiering kan inneholde logikk for å forhåndsutfylle data
i datamodell samt gjøre valideringer på om man har rett til å instansiere 
tjenesten. Her vil tjenesteier stå langt friere enn dagens Altinn II plattform til
å kunne definere de instansieringskontrollene man ønsker. I dag er det begrenset til
at plattformen må ha definert en hook for den aktulle sjekken. Eksempel fra dagens plattform
er hook for å verifisere at avgiver er over 18 år, og hook for å sjekke at det finnes
abonnement for tjenesten på avgiver. 

{{%excerpt%}}
<object data="/products/tjenester/3.0/solutions/runtime/architecture/Events_Instansiation.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
{{% /excerpt%}}

##### Uthenting av skjemadata (GET)
Uthenting av skjemadata kan gjøres av frontend (REACT) eller av sluttbrukersystem
som har behov for å hente ut aktuell status på skjemadata. 

{{%excerpt%}}
<object data="/products/tjenester/3.0/solutions/runtime/architecture/Events_Get.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
{{% /excerpt%}}

#### Lagring av skjemadata (POST)
Lagrige av skjemadata kan skje når Frontend (REACT App) sender data til backend eller 
et sluttbrukersystem gjør det samme. Når oppdateringen skjer er det definert flere event slik at man
kan implementere forretningslogikk som kan håndtere valideringer, kalkuleringer, dataoppslag osv.

API for oppdateringer av data støtter flere modus
* Create - Data skal lagres som en ny instanse
* Complete - Data er komplett og skal sendes videre i arbeidsflyt
* Calculate - Kalkuleringsregler skal kjøres på data og de oppdaterte data returneres
* Validate - Kalkuleringer skal kjøres før man valideres data. Eventuelle valideringsfeil returneres.
* Update - Kalkuering kjøres før data lagres til database.

Rekkefølgen på Events er.

{{%excerpt%}}
<object data="/products/tjenester/3.0/solutions/runtime/architecture/Events_Post.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
{{% /excerpt%}}

#### Oppdatering av skjemadata (PUT)
Oppdatering av skjemadata skjer under når frontend eller eksternt sluttbrukersystem ønsker
å oppdatere data for instans. 

Rekkefølgen på events er:

{{%excerpt%}}
<object data="/products/tjenester/3.0/solutions/runtime/architecture/Event_PUT.svg" type="image/svg+xml" style="width: 100%; max-width: 300px;"></object>
{{% /excerpt%}}

### Datamodell
Datamodellen i tjenesten er generert fra XSD som er definert av tjenesteeier.

I runtime er modellen representert som en C# klasse. 
All data deserialiseres til denne modellen når runtime mottar de fra 
frontend eller andre eksterne løsninger som sluttbrukersystem. 

Alle forretningsregler kan kodes direkte mot denne klassen. 

Modellen kompileres runtime og lastes inn ved hjelp av reflection.

{{%excerpt%}}
<object data="/products/tjenester/3.0/solutions/runtime/architecture/RunTime_Application_Architecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}


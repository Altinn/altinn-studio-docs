---
title: Ordliste
description: Forklaring av fagtermer i teknisk referansedokumentasjon
weight: 1000
tags: [needsReview, translate-to-english]
---

## A

**AKS (Azure Kubernetes Service)**
Microsofts administrerte Kubernetes-tjeneste. Altinn 3-applikasjoner kjører i AKS.

**App**
Forkortelse for applikasjon. I Altinn 3 er en app en digital tjeneste som utvikles i Altinn Studio.

**Appinstans**
En kjørende kopi av en app. Som standard kjøres 2 instanser av hver app for å sikre tilgjengelighet.

## B

**Bekreftelsesoppgave**
Prosessoppgave der brukeren kan bekrefte data. Oppretter en bekreftelseslogg.

**BPMN (Business Process Model and Notation)**
Standard for å modellere forretningsprosesser. Brukes til å definere prosessflyten i Altinn 3-apper.

## C

**CLI (Command Line Interface)**
Kommandolinjeverktøy. Altinn CLI er kommandolinjeverktøyet for Altinn Studio.

**Cluster**
En samling av noder (virtuelle maskiner) som kjører Kubernetes. Hver tjenesteeier har egne clustere for test og produksjon.

**Container**
En Docker-container inneholder kjørende kode for en app. Kubernetes administrerer containere i pods.

## D

**Dataoppgave**
Prosessoppgave der brukeren kan lese, skrive og endre data i skjemaet.

**Datatype**
Definerer hvilken type data som kan lagres. Eksempler: skjemadata, vedlegg, PDF, signaturer.

**Deployment**
Distribusjon av en app til et miljø. Styrer levetiden til en app og antall instanser.

**Dual-stack**
Støtte for både IPv4 og IPv6 i samme system.

## G

**Gateway**
Punkt i prosessen der flyten kan gå ulike veier basert på betingelser eller brukervalg.

## H

**Helm Chart**
Konfigurasjonsfiler som styrer hvordan en app distribueres til Kubernetes. Inneholder innstillinger for CPU og minne.

## I

**IPv4 / IPv6**
Internett-protokoller for nettverkskommunikasjon. Altinn støtter begge.

## K

**Kodeanalyse**
Automatisk analyse av kode for å finne potensielle feil eller sikkerhetsproblemer.

**Kubernetes**
System for å administrere containere. Altinn 3 bruker Kubernetes til å kjøre apper.

## L

**Linkerd**
Sidecar-container som håndterer kryptering/dekryptering av trafikk mellom pods.

## N

**Node**
En virtuell maskin i et Kubernetes-cluster. Som standard har et cluster 3–6 noder.

## P

**Pod**
Den minste kjørbare enheten i Kubernetes. En pod kan inneholde én eller flere containere.

**Prosessoppgave**
Et steg i applikasjonsflyten. Typer: dataoppgave, bekreftelsesoppgave, signeringsoppgave, tilbakemeldingsoppgave.

## R

**Requests**
Minimum ressurser (CPU/minne) en app trenger. Kubernetes bruker dette til å allokere ressurser.

**Ressursfordeling**
Hvordan CPU og minne fordeles mellom apper i et cluster.

## S

**SHA256 hash**
Kryptografisk kontrollsum som brukes til å verifisere at data ikke er endret. Brukes i signaturer.

**Sidecar-container**
En container som kjører sammen med app-containeren i samme pod. Eksempel: Linkerd.

**Signaturobjekt**
Objekt som opprettes når en bruker signerer. Inneholder brukerinformasjon og hash av signerte data.

**Signeringsoppgave**
Prosessoppgave der brukeren kan signere data. Genererer et signaturobjekt.

## T

**Testbruker**
Fiktiv bruker som kan brukes til testing i testmiljøene TT02 og produksjon.

**Tilbakemeldingsoppgave**
Prosessoppgave som lar tjenesteeieren gi tilbakemeldinger til rapporterende enhet.

**Tillateliste**
Liste over IP-adresser som har tilgang til en ressurs. Tidligere kalt hviteliste.

**TT02**
Altinns testmiljø for testing av apper før produksjonssetting.

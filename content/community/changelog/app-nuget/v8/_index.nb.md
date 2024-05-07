---
title: v8
description: Oversikt over endringer introdusert i v8 av Altinn.App.*-pakkene og applikasjonsmalen.
weight: 94
---

## Hvorfor versjon 8?
V8 er en omskriving av prosessmotoren i apper for å støtte mer avanserte prosessflyter og signering.
For de fleste eksisterende apper er endringene i prosessmotoren bare synlige i filen `App/config/process/process.bpmn`.

Vi benyttet også anledningen til å flytte alle grensesnitt fra `Altinn.App.Core.Interfaces` til mer beskrivende navnerom under `Altinn.App.Core.Internal`.
Noen av disse grensesnittene har fått nye navn. For eksempel har `Altinn.App.Core.Interfaces.IData` blitt flyttet og omdøpt til `Altinn.App.Core.Internal.Data.IDataClient`.

## Betydelige endringer

### Endringer i process.bpmn

#### Altinn-namespace endret
Tidligere var navnerommet for Altinn `http://altinn.no`. Dette har nå blitt endret til `http://altinn.no/process`.

Dette finnes øverst i `process.bpmn`-filen.

Gammel `process.bpmn`:
```xml {hl_lines=[4]}
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions id="Altinn_SingleDataTask_Process_Definition"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:altinn="http://altinn.no"
xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
targetNamespace="http://bpmn.io/schema/bpmn" >
....
</bpmn:definitions>
```

Ny `process.bpmn`:
```xml {hl_lines=[4]}
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions id="Altinn_SingleDataTask_Process_Definition"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:altinn="http://altinn.no/process"
xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
targetNamespace="http://bpmn.io/schema/bpmn" >
....
</bpmn:definitions>
```

#### TaskType-definisjon flyttet til bpmn:extensionElements
Frem til versjon 8 av pakken, ble taskType definert direkte på `<bpmn:task>`-elementet.
For å følge BPMN-spesifikasjonen bedre, har dette blitt flyttet til `<bpmn:extensionElements>`-elementet.

```xml {hl_lines=[1]}
<bpmn:task id="Task_1" name="Utfylling" altinn:tasktype="data">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
</bpmn:task>
```

```xml {hl_lines=["4-8"]}
<bpm

<bpmn:task id="Task1" name="Utfylling">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>data</altinn:taskType>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

Dette ser kanskje mer omfattende ut, men ettersom vi trenger å spesifisere flere alternativer for signering, valgte vi å flytte all vår tilpassede konfigurasjon til samme seksjon.

#### Bekreftelsesoppgaver må definere handlingen "confirm"
Tidligere la bekreftelsesoppgaver implisitt til en bekreftelseshandling for brukeren (som gjorde at bekreft-knappen ble aktivert i brukergrensesnittet).
Med introduksjonen av handlinger på prosessoppgaver, må utvikleren nå definere handlingen "confirm" på bekreftelsesoppgaver.

Gammel bekreftelsesoppgave:
```xml
<bpmn:task id="Task_1" name="Utfylling" altinn:tasktype="confirmation">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
</bpmn:task>
```

Ny bekreftelsesoppgave:
```xml
<bpmn:task id="Task1" name="Utfylling">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>confirmation</altinn:taskType>
            <altinn:actions>
                <altinn:action>confirm</altinn:action>
            </altinn:actions>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

### Ny versjon av .NET
Løsningen har blitt oppdatert til å bruke den nyeste LTS-versjonen av .NET, 8.0.
Dette må oppdateres i prosjektfilen og i `Dockerfile`.

Gammel `Dockerfile`:
```Dockerfile {hl_lines=[1,11]}
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /App

COPY /App/App.csproj .
RUN dotnet restore App.csproj

COPY /App .

RUN dotnet publish App.csproj --configuration Release --output /app_output

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine AS final
EXPOSE 5005
WORKDIR /App
```

Ny `Dockerfile`:
```Dockerfile {hl_lines=[1,11]}
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /App

COPY /App/App.csproj .
RUN dotnet restore App.csproj

COPY /App .

RUN dotnet publish App.csproj --configuration Release --output /app_output

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final
EXPOSE 5005
WORKDIR /App
COPY --from=build /app_output .
ENV ASPNETCORE_URLS=
```

For en komplett oversikt over endringer i `Dockerfile`, [se
her](https://github.com/Altinn/app-template-dotnet/commit/d13946262286542564445779e87b75c4bbb2cdaf#diff-51767e9b1bad3f38294e90b0aaadd99ee89bb126f426b22bb8f5e199c6c69bc6).

### Endringer i grensesnitt for klienter og tjenester
Klienter og tjenester vi leverer for å kommunisere med kjernetjenestene våre, som lagring og hemmeligheter, har blitt flyttet og omdøpt for å tydeliggjøre hvilke de samhandler med.

#### Flyttede/omdøpte grensesnitt og deres nye plassering

| Gammelt navnerom          | Gammelt navn          | Nytt navnerom                       | Nytt navn             | Merknader |
| ------------------------- | ------------------    | ----------------------------------   | --------------------- | --------- |
| Altinn.App.Core.Interface | IAppEvents            | Altinn.App.Core.Internal.App         | IAppEvents            | |
| Altinn.App.Core.Interface | IApplicationClient    | Altinn.App.Core.Internal.App         | IApplicationClient    | |
| Altinn.App.Core.Interface | IAppResources         | Altinn.App.Core.Internal.App         | IAppResources         | |
| Altinn.App.Core.Interface | IAuthentication       | Altinn.App.Core.Internal.Auth        | IAuthenticationClient | |
| Altinn.App.Core.Interface | IAuthorization        | Altinn.App.Core.Internal.Auth        | IAuthorizationClient  | |
| Altinn.App.Core.Interface | IData                 | Altinn.App.Core.Internal.Data        | IDataClient           | |
| Altinn.App.Core.Interface | IDSF                  | Altinn.App.Core.Internal.Registers   | IPersonClient         | Dette grensesnittet er forskjellig da oppstrøms-API-en har endret seg og krever flere parametere |
| Altinn.App.Core.Interface | IER                   | Altinn.App.Core.Internal.Registers   | IOrganizationClient   | |
| Altinn.App.Core.Interface | IEvents               | Altinn.App.Core.Internal.Events      | IEventsClient         | |
| Altinn.App.Core.Interface | IInstance             | Altinn.App.Core.Internal.Instances   | IInstanceClient       | |
| Altinn.App.Core.Interface | IInstanceEvent        | Altinn.App.Core.Internal.Instances   | IInstanceEventClient  | |
| Altinn.App.Core.Interface | IPersonLookup         | Altinn.App.Core.Internal.Registers   | IPersonClient         | |
| Altinn.App.Core.Interface | IPersonRetriever      | Altinn.App.Core.Internal.Registers   | IPersonClient         | |
| Altinn.App.Core.Interface | IPrefill              | Altinn.App.Core.Internal.Prefill     | IPrefill              | |
| Altinn.App.Core.Interface | IProcess              | Altinn.App.Core.Internal.Process     | IProcessClient        | |
| Altinn.App.Core.Interface | IProfile              | Altinn.App.Core.Internal.Profile     | IProfileClient        | |
| Altinn.App.Core.Interface | IRegister             | Altinn.App.Core.Internal.Registers   | IAltinnPartyClient    | Hvis du tidligere brukte IRegister.ER for å utføre oppslag av organisasjoner, bør du direkte injisere IOrganizationClient for disse bruksområdene |
| Altinn.App.Core.Interface | ISecrets              | Altinn.App.Core.Internal.Secrets     | ISecretsClient        | |
| Altinn.App.Core.Interface | ITaskEvents           | Altinn.App.Core.Internal.Process     | ITaskEvents           | |
| Altinn.App.Core.Interface | IUserTokenProvider    | Altinn.App.Core.Internal.Auth        | IUserTokenProvider    | |

Alle de gamle grensesnittene er markert som utdaterte (Obsolete), og vil generere kompileringstidsfeil med henvisning til hvilke grensesnitt du bør bruke i stedet.

## Hva er nytt?

### Støtte for signering av oppgaver
V8 støtter definisjon av signering av oppgaver i prosessdefinisjonen.
v8.0.0 støtter sekvensielle signeringstrinn med muligheten til å definere at signering av oppgaver må fullføres av unike brukere.
For å se hvordan signering av oppgaver defineres, kan du se [signeringsdokumentasjonen under prosess]()

### Støtte for uttrykk i prosessdefinisjonen
Det er nå mulig å ta beslutninger om prosessflyt ved hjelp av uttrykk i prosessdefinisjonen.
For å se hvordan du kan bruke uttrykk for å diktere prosessflyt, se [bruk av uttrykk for å diktere prosessflyt]() 

### Egendefinerte handlinger i prosessoppgaver
Egendefinerte handlinger gjør det mulig å opprette egendefinerte handlinger som kan brukes til å flytte prosessen videre. Disse handlingene kan autoriseres separat, brukes i uttrykk inne i prosessdefinisjonen for å endre hvordan prosessen flyter, og utføre egendefinert kode før prosessen flyttes til neste oppgave.
For å se hvordan du kan bruke egendefinerte prosesshandlinger, se [definere egendefinerte handlinger i prosessoppgaver]()
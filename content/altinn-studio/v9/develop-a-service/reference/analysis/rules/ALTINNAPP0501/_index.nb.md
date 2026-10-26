---
draft: true
title: "ALTINNAPP0501: Storage-klient brukt i kode for prosessovergang"
description: "Prosesshooker og systemoppgaver bør bruke IInstanceDataMutator, ikke IDataClient, IInstanceClient eller IDataService"
weight: 51
---

Denne diagnostikken meldes når kode som kjører som en del av en prosessovergang, kaller
`IDataClient`, `IInstanceClient` eller `IDataService`. Regelen sjekker innholdet i medlemmet
som implementerer en av disse hookene, også lambdaer og lokale funksjoner i det:

- `IOnTaskStartingHandler.Execute`, `IOnTaskEndingHandler.Execute`,
  `IOnTaskAbandonHandler.Execute` og `IOnProcessEndedHandler.Execute`
- `IServiceTask.Execute` og `IPipelineServiceTask.Define`
- `IProcessTask.Start`, `IProcessTask.End` og `IProcessTask.Abandon`
- begge overlastene av `IInstantiationProcessor.DataCreation`

Regelen sjekker også en metode i en avledet klasse som overstyrer hook-medlemmet. Meldingen
navngir klientmetoden som blir kalt, og hooken den blir kalt fra.

Kategori `CodeSmells`, alvorlighetsgrad **advarsel**.

Mens prosessen er i en overgang, avviser Storage direkte skriving til instansen. Appen lagrer
endringene hookene gjør gjennom `IInstanceDataMutator`, sammen med prosessovergangen. Skriver
du gjennom en av klientene, feiler kallet. Leser du gjennom en av dem, får du det som er lagret,
uten endringene hookene har gjort så langt.

Bruk i stedet `IInstanceDataMutator`, som hooken får fra konteksten sin
(`context.InstanceDataMutator`). Den leser og endrer instansen gjennom `GetFormData`,
`GetFormDataCopy`, `ReplaceFormData`, `AddFormDataElement`, `AddBinaryDataElement`,
`UpdateBinaryDataElement`, `RemoveDataElement`, `UpdateDataElementMetadata`, `SetDataValue`,
`SetPresentationText`, `SetSubstatus` og `AddCompleteConfirmation`. I `IInstantiationProcessor`
flytter du koden til overlasten av `DataCreation` som tar imot en `IInstanceDataMutator`. Når
noen kopierer en instans, kaller appen bare overlasten som tar imot en `Instance`.

Regelen ser ikke på hvilken instans et kall gjelder. Den melder ikke
`IInstanceClient.GetInstances`, fordi den metoden leser andre instanser. Hvis en hook med vilje
leser eller endrer en annen instans, kan du skru av advarselen bare for det kallet: sett
`#pragma warning disable ALTINNAPP0501` foran kallet og `#pragma warning restore ALTINNAPP0501`
rett etter.

Regelen ser bare kall som står direkte i hook-medlemmet. Den sjekker ikke en hjelpemetode som
hooken kaller, et eget grensesnitt i appen som pakker inn en klient, eller kode i en pakke appen
refererer til.

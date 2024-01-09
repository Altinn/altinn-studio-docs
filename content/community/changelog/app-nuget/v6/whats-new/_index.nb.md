---
title: Hva er nytt?
description: Oversikt over endringer som ble introdusert i versjon 6.
toc: true
---

## 6.0.2 Dependency oppdatering og bugfix
Oppdatert eformidling avhengighet til 1.3.2 i [#13](https://github.com/Altinn/app-lib-dotnet/pull/13)

Fjernet autentisering på redirect endepunkt i [#15](https://github.com/Altinn/app-lib-dotnet/pull/15)

[Se release på github](https://github.com/Altinn/app-lib-dotnet/releases/tag/v6.0.2)

## 6.0.1 Feilretting for endringer i repeterende grupper

Denne versjonen fikser [en feil](https://github.com/Altinn/app-frontend-react/issues/319) hvor endringer som
legger til/fjerner rader i en repeterende gruppe via `ProcessDataWrite()` ville føre til en uventet verdi
i `changedFields`-egenskapen i API-responsen. Etter denne feilrettingen skal verdier i `changedFields`-egenskapen
vise *endringer* i rader i repeterende grupper, og rader som blir fjernet via `ProcessDataWrite()` får tidligere verdier
satt til `null`.

## 6.0.0 .Net 6 oppgradering 

Oppdaterer App til .Net 6. Se Breaking


Se [breaking changes](../breaking-changes) for hvordan oppdatere app til å bli kompatibel med denne versjonen.

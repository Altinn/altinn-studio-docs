---
draft: true
title: Oppdatere avhengigheter i app
linktitle: Avhengigheter
description: Hvordan oppdatere avhengigheter i en app.
toc: true
---

Appen er avhengig av flere ressurser som ligger utenfor selve appen.
Dette inkluderer støttebiblioteker med felles funksjonalitet for alle apper og Helm-diagrammet som brukes ved utrulling.

Disse avhengighetene er definert noen forskjellige steder i appen, og hver avhengighet refereres til med en spesifikk _versjon_.
Når ressursene oppdateres, publiseres de på nytt som en ny _versjon_. En ny versjon kommer ofte med ny funksjonalitet eller forbedringer.
For at appen skal kunne ta dette i bruk, må man oppdatere hvilken versjon av ressursene appen henter. 

## Nuget
_Nuget er .NET sin package manager, hvor vi publiserer kodebibliotek som brukes av alle appene._

Appen bruker flere støttebiblioteker, som oppdateres fortløpende med forbedringer og ny funksjonalitet. En app refererer til konkrete versjoner av de forskjellige
bibliotekene, og disse referansene må oppdateres for å hente inn siste versjon. 

### Oppgradere til nyeste versjon

{{%panel info%}}
**Tips:** Installer [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)-utvidelsen for Visual Studio Code.  
Da kan du automatisk se hva som er nyeste versjon av alle pakker når du åpner App.csproj. Støtter også npm.
{{% /panel%}}

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7.0.0 og nyere">}}

- Finn fram referansene til bibliotekene i appen. Referansene til biblioteker ligger i filen `App/App.csproj` i appens repo. 

F.eks.:

```xml
<ItemGroup>
  <PackageReference Include="Altinn.App.Api" Version="7.15.1" />
  <PackageReference Include="Altinn.App.Core" Version="7.15.1" />
</ItemGroup>
```

- Sjekk om det har kommet en oppdatert versjon av bibliotekene:
    - [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api)
    - [Altinn.App.Core](https://www.nuget.org/packages/Altinn.App.Core)
- Oppdater de aktuelle referansene til den siste versjonen og lagre filen.
- Sjekk om det er noen [breaking changes](/nb/community/changelog/app-nuget/) ifm endringer i bibliotekene,
  og gjør ev. endringer som beskrives for å løse ev. problemer. Dette gjelder når det er _major_-versjonen (det første 
  tallet i versjonen) som er oppdatert.
- Bygg og deploy appen på nytt.

{{</content-version-container>}}

{{<content-version-container version-label="v6.1.0 og eldre">}}

- Finn fram referansene til bibliotekene i appen. Referansene til biblioteker ligger i filen `App/App.csproj` i appens repo. 

F.eks.:

```xml
<ItemGroup>
  <PackageReference Include="Altinn.App.Api" Version="3.0.0" />
  <PackageReference Include="Altinn.App.Common" Version="3.0.0" />
  <PackageReference Include="Altinn.App.PlatformServices" Version="3.0.0" />
  <PackageReference Include="Microsoft.Extensions.Logging.Debug" Version="3.1.3" />
  <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="3.1.2" />
</ItemGroup>
```

- Sjekk om det har kommet en oppdatert versjon av bibliotekene:
    - [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api)
    - [Altinn.App.Common](https://www.nuget.org/packages/Altinn.App.Common)
    - [Altinn.App.PlatformServices](https://www.nuget.org/packages/Altinn.App.PlatformServices)
- Oppdater de aktuelle referansene til den siste versjonen og lagre filen.
- Sjekk om det er noen [breaking changes](/nb/community/changelog/app-nuget/) ifm endringer i bibliotekene,
  og gjør ev. endringer som beskrives for å løse ev. problemer.
- Bygg og deploy appen på nytt.

{{</content-version-container>}}
{{</content-version-selector>}}


## Deployment

Deployment utføres ved hjelp av helm charts. Standard deployment oppsett for apps hentes fra altinn-studio sitt helm repository.

Er du i tvil om du benytter siste deployment strategi kan du følge migreringsguiden [her](/nb/community/changelog/deployment/migration/)

For å finne siste versjon av helm-charten kan du enten sjekke releases av charten deployment [her](https://github.com/Altinn/altinn-studio-charts/releases)
eller legge inn [helm](https://helm.sh/) repoet lokalt og søke i dette på følgende måte:

```shell
# Legg til helm altinn-studio helm repo
helm repo add altinn-studio https://charts.altinn.studio

# Søk for versjoner av altinn-studio/deployment charten
helm search repo -l altinn-studio/deployment
```

Hvis det er ny versjon av helm charten sjekk [changelog](/nb/community/changelog/deployment/) for å se hva som er oppdatert i versjonen.

For å ta i bruk en ny versjon oppdater versjon under dependencies i `deployment/Chart.yaml`

```yaml {hl_lines=[9]}
apiVersion: v1
description: A Helm chart for Kubernetes
name: deployment
version: 1.1.0

dependencies:
- name: deployment
  repository: https://charts.altinn.studio/
  version: 2.8.0                                <--- Oppdater her
```

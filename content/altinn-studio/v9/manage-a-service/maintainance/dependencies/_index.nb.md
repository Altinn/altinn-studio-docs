---
title: Oppdatere avhengigheter i app
linktitle: Avhengigheter
description: Hvordan oppdatere avhengigheter i en app.
toc: true
---

Appen er avhengig av støttebiblioteker som ligger utenfor selve appen. Bibliotekene har funksjonalitet som er felles for alle apper.

Appen henter en bestemt _versjon_ av hvert bibliotek. Når Altinn forbedrer bibliotekene, kommer de i en ny versjon. En ny versjon kommer ofte med ny funksjonalitet eller forbedringer. For at appen skal kunne ta dette i bruk, må du oppdatere hvilken versjon appen henter.

Helm-chartet som Altinn bruker når du publiserer appen, trenger du ikke oppdatere selv. [Les mer om publisering og Helm-chartet lenger ned på siden](#publisering).

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

{{< code-title >}}
App/App.csproj
{{< /code-title >}}

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

{{< code-title >}}
App/App.csproj
{{< /code-title >}}

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


## Publisering

Altinn publiserer alle apper med et felles Helm-chart og velger selv hvilken versjon av chartet appen bruker. Publiseringen bruker ikke `deployment/Chart.yaml` i app-repoet, så denne avhengigheten trenger du ikke oppdatere. Innstillingene du kan endre, ligger i `deployment/values.yaml`. Se [innstillinger for publisering]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/deployment" >}}).

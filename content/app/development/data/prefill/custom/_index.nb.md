---
title: Preutfylling av data med egendefinert kode
linktitle: Egendefinert
description: Hvordan kode egendefinert preutfylling i applikasjonen.
toc: false
weight: 300
---

Altinn-apper muliggjør forhåndsutfylling av en instans med egne data,
enten det er resultatet av et API-kall, beregninger gjort under instansiering eller annen logikk.

{{% content-version-selector %}}

{{<content-version-container version-label="v4, v5, v6">}}

Altinn apps muliggjør prefill av en instans med egendefinert data,
det være seg resultet fra et API-kall, beregninger gjort under instansiering, eller annen logikk.
Dette implementeres i metoden _DataCreation_ i filen _InstansiationHandler.cs_ som finnes i applikasjonsrepoet under `App/logic`.

Eksempelet nedenfor populerer feltet _Bruker.FulltNavn_ i modellen _Datamodell_ med verdien "Test Testesen".  

```C# {hl_lines=[6]}
public async Task DataCreation(Instance instance, object data)
{
    if (data.GetType() == typeof(Datamodell))
    {
        Datamodell model = (Datamodell)data;
        model.Bruker.FulltNavn = "Test Testesen";
    }
}
```

Bytt ut _Datamodell_ med navnet på C# klassen som er blitt generert basert på xsd-en som
ble lastet opp i Altinn Studio. Dersom du bruker en egnet kodeeditor vil du kunne definere felter
som skal populeres ved bruk av intellisense.

Vær oppmerksom på at dersom du har komplekse typer i modellen din, må disse instansieres før man kan
tilegne en verdi til ett av typens underelementer. Se eksempel nedenfor der vi legger til grunn at 'Bruker'
og 'Name' er egne C# klasser.

```C#
public async Task DataCreation(Instance instance, object data)
{
    if (data.GetType() == typeof(Datamodell))
    {
        Datamodell model = (Datamodell)data;
        Bruker b = new Bruker();
        b.Navn = new Name();
        b.Navn.FulltNavn = "Test Testesen";
    }
}
```
{{</content-version-container>}}

{{<content-version-container version-label="v7">}}
I versjon 7 har vi endret måten preutfylling med egendefinert kode gjøres på. Vi benytter nå _dependency injection_ i stedet for overstyring av metoder. Hvis du tidligere plasserte koden din i _DataCreation_ metoden in _InstantiationHandler.cs_ klassen så vil du erfare at det er mer eller mindre det samme som nå gjøres.
1. Opprett en klasse som implementerer `IInstantiation` grensesnittet som ligger i `Altinn.App.Core.Features.Instantiation` navnerommet.  
    Du kan plasser filene i den mappestrukturen du selv ønsker i prosjektet ditt. Men vi anbefaler at du benytter meningsfulle navnerom som i et hvilket som helst annet .Net prosjekt.
    Eksempelet nedenfor populerer feltet _Bruker.FulltNavn_ i modellen _Datamodell_ med verdien "Test Testesen".  
    ```C# {hl_lines=[23]}
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Altinn.App.Core.Features.Instantiation;
    using Altinn.App.Core.Models.Validation;
    using Altinn.App.Models;
    using Altinn.Platform.Storage.Interface.Models;

    public class Instantiation: IInstantiation
    {
        public async Task<InstantiationValidationResult> Validation(Instance instance)
        {
            return await Task.FromResult((InstantiationValidationResult)null);
        }

        public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
        {
            if (data.GetType() == typeof(Datamodell))
            {
                Datamodell skjema = (Datamodell)data;
                
                Bruker b = new Bruker();
                b.Navn = new Name();
                b.FulltNavn = "Test Testesen";
                
                skjema.Bruker = b;
            }

            await Task.CompletedTask;
        }
    }
    ```
2. Registrer din implementering i _Program.cs_ klassen
    ```C#
    services.AddTransient<IInstantiation, Instantiation>();
    ```
    Dette sørger for at din kode er kjent for applikasjonen og at koden blir kjørt når den skal.

{{</content-version-container>}}

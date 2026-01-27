---
draft: false
headless: true
hidden: true
---

```csharp
#nullable enable
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Signing;
using Altinn.App.Models.Skjemadata;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.logic;

public class FounderSigneesProvider : ISigneeProvider
{
  public string Id { get; init; } = "founders";

  public async Task<SigneeProviderResult> GetSignees(GetSigneesParameters parameters)
  {
    DataElement dataElement = parameters.InstanceDataAccessor
      .GetDataElementsForType("Skjemadata")
      .Single();

    var formData = await parameters.InstanceDataAccessor.GetFormData<Skjemadata>(dataElement);

    List<ProvidedSignee> providedSignees = [];
    foreach (StifterPerson stifterPerson in formData.StifterPerson)
    {
      var personSignee = new ProvidedPerson
      {
        FullName = string.Join(
          " ",
          [stifterPerson.Fornavn, stifterPerson.Mellomnavn, stifterPerson.Etternavn]
        ),
        SocialSecurityNumber = stifterPerson.Foedselsnummer?.ToString() ?? string.Empty,

        // CommunicationConfig added here is optional, shown and described in section 6
      };

      providedSignees.Add(personSignee);
    }

    foreach (StifterVirksomhet stifterVirksomhet in formData.StifterVirksomhet)
    {
      var organisationSignee = new ProvidedOrganization
      {
        Name = stifterVirksomhet.Navn,
        OrganizationNumber =
          stifterVirksomhet.Organisasjonsnummer?.ToString() ?? string.Empty,

        // CommunicationConfig added here is optional, shown and described in section 6
      };

      providedSignees.Add(organisationSignee);
    }

    return new SigneeProviderResult { Signees = providedSignees };
  }
}
```

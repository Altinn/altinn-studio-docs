---
hidden: true
---

To allow the app to determine who should receive access to read and sign, the C# interface ```ISigneeProvider``` must be implemented.

The implementation must return a set of individuals and/or organizations that should receive rights. This can be based on the data model, as shown in the example below.

The Id property in this implementation must match the ID specified in <altinn:signeeProviderId>.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Altinn.App.Core.Features.Signing.Interfaces;
using Altinn.App.Core.Features.Signing.Models;
using Altinn.App.Core.Internal.Data;
using Altinn.App.Core.Models;
using Altinn.App.Models.Skjemadata;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.logic;

public class SigneesProvider : ISigneeProvider
{
    private readonly IDataClient _dataClient;

    public SigneesProvider(IDataClient dataClient)
    {
        _dataClient = dataClient;
    }

    public string Id { get; init; } = "signees";

    public async Task<SigneesResult> GetSigneesAsync(Instance instance)
    {
        Skjemadata formData = await GetFormData(instance);

        List<SigneeParty> signeeParties = [];
        foreach (StifterPerson stifterPerson in formData.StifterPerson)
        {
            var personSignee = new SigneeParty
            {
                FullName = string.Join(
                    " ",
                    [stifterPerson.Fornavn, stifterPerson.Mellomnavn, stifterPerson.Etternavn]
                ),
                SocialSecurityNumber = stifterPerson.Foedselsnummer?.ToString() ?? string.Empty,
                Notifications = new Notifications
                {
                    OnSignatureAccessRightsDelegated = new Notification
                    {
                        Email = new Email
                        {
                            EmailAddress = stifterPerson.Epost,
                            Subject = "Stiftelsesdokumenter mottatt for signering i Altinn",
                            Body =
                                "Hei "
                                + stifterPerson.Fornavn
                                + ",\n\nDu har mottatt stiftelsesdokumenter for signering i Altinn. Logg inn på Altinn for å signere dokumentene.\n\nMed vennlig hilsen\nBrønnøysundregistrene"
                        },
                        Sms = new Sms
                        {
                            MobileNumber = stifterPerson.Mobiltelefon,
                            Body =
                                "Hei "
                                + stifterPerson.Fornavn
                                + ",\n\nDu har mottatt stiftelsesdokumenter for signering i Altinn. Logg inn på Altinn for å signere dokumentene.\n\nMed vennlig hilsen\nBrønnøysundregistrene"
                        }
                    }
                }
            };

            signeeParties.Add(personSignee);
        }

        foreach (StifterVirksomhet stifterVirksomhet in formData.StifterVirksomhet)
        {
            var organisationSignee = new SigneeParty
            {
                OnBehalfOfOrganisation = new SigneePartyOrganisation
                {
                    Name = stifterVirksomhet.Navn,
                    OrganisationNumber =
                        stifterVirksomhet.Organisasjonsnummer?.ToString() ?? string.Empty
                },
                Notifications = new Notifications
                {
                    OnSignatureAccessRightsDelegated = new Notification
                    {
                        Email = new Email
                        {
                            EmailAddress = stifterVirksomhet.Epost,
                            Subject = "Stiftelsesdokumenter mottatt for signering i Altinn",
                            Body =
                                "Hei "
                                + stifterVirksomhet.Navn
                                + ",\n\nNye stiftelsesdokumenter for signering i Altinn. Logg inn på Altinn for å signere dokumentene.\n\nMed vennlig hilsen\nBrønnøysundregistrene"
                        },
                        Sms = new Sms
                        {
                            MobileNumber = stifterVirksomhet.Mobiltelefon,
                            Body =
                                "Hei "
                                + stifterVirksomhet.Navn
                                + ",\n\nDu har mottatt stiftelsesdokumenter for signering i Altinn. Logg inn på Altinn for å signere dokumentene.\n\nMed vennlig hilsen\nBrønnøysundregistrene"
                        }
                    }
                }
            };

            signeeParties.Add(organisationSignee);
        }

        return new SigneesResult { Signees = signeeParties };
    }

    private async Task<Skjemadata> GetFormData(Instance instance)
    {
        DataElement modelData = instance.Data.Single(x => x.DataType == "Skjemadata");
        InstanceIdentifier instanceIdentifier = new(instance);

        return (Skjemadata)
            await _dataClient.GetFormData(
                instanceIdentifier.InstanceGuid,
                typeof(Skjemadata),
                instance.Org,
                instance.AppId,
                instanceIdentifier.InstanceOwnerPartyId,
                new Guid(modelData.Id)
            );
    }
}
```
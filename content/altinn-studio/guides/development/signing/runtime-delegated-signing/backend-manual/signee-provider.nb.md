---
hidden: true
---

For at appen skal vite hvem som skal få tilganger for å lese og signere må C# interface-et `ISigneeProvider` implementeres.

Den må returnere et sett med personer og/eller virksomheter som skal få rettighetene. Det kan for eksempel være basert på datamodellen, som vist nedenfor.
`Id`-attributtet i denne implementasjonen må matche ID som ble angitt i `<altinn:signeeProviderId>`.

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

    public async Task<SigneeProviderResult> GetSigneesAsync(GetSigneesParameters parameters)
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
                CommunicationConfig = new CommunicationConfig
                {
                    InboxMessage = new InboxMessage
                    {
                        TitleTextResourceKey = "signing.correspondence_title_common",
                        SummaryTextResourceKey = "signing.correspondence_summary_stifter_person",
                        BodyTextResourceKey = "signing.correspondence_body_stifter_person"
                    },
                    Notification = new Notification
                    {
                        Email = new Email
                        {
                            EmailAddress = stifterPerson.Epost,
                            SubjectTextResourceKey = "signing.email_subject",
                            BodyTextResourceKey = "signing.notification_content"
                        },
                        Sms = new Sms
                        {
                            MobileNumber = stifterPerson.Mobiltelefon,
                            BodyTextResourceKey = "signing.notification_content"
                        }
                    }
                },
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
                CommunicationConfig = new CommunicationConfig
                {
                    InboxMessage = new InboxMessage
                    {
                        TitleTextResourceKey = "signing.correspondence_title_common",
                        SummaryTextResourceKey = "signing.correspondence_summary_stifter_organisasjon",
                        BodyTextResourceKey = "signing.correspondence_body_stifter_organisasjon"
                    },
                    Notification = new Notification
                    {
                        Email = new Email
                        {
                            EmailAddress = stifterVirksomhet.Epost,
                            SubjectTextResourceKey = "signing.email_subject",
                            BodyTextResourceKey = "signing.notification_content".Replace(
                                "{0}",
                                stifterVirksomhet.Navn
                            ),
                        },
                        Sms = new Sms
                        {
                            MobileNumber = stifterVirksomhet.Mobiltelefon,
                            BodyTextResourceKey = "signing.notification_content".Replace(
                                "{0}",
                                stifterVirksomhet.Navn
                            ),
                        }
                    }
                }
            };

            providedSignees.Add(organisationSignee);
        }

        return new SigneeProviderResult { Signees = providedSignees };
    }
}
```

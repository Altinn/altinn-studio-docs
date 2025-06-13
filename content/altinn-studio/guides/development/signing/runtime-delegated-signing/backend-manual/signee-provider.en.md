---
hidden: true
---

To allow the app to determine who should receive access to read and sign, the C# interface `ISigneeProvider` must be implemented.

The implementation must return a set of individuals and/or organizations that should receive rights to sign. This can be based on the data model, as shown in the example below.

When an organization is provided as a signee, any person with a [key role](/altinn-studio/reference/configuration/authorization/guidelines_authorization/roles_and_rights/roles_er) for the organization will be given access to `read` and `sign`.

The `Id` property in this implementation must match the ID specified in <altinn:signeeProviderId>.

Note that `CommunicationConfig` is optional. Here you may override the standard texts used in communication with the signees,
as explained in section 3. You may also override the email address and phone number for the signees. By default, a message 
will be sent to the signees altinn inbox with a link to the relevant application instance and a notification
will be sent via email. To turn on SMS notifications, set SMS = new Sms{ MobileNumber = ""}. 

If not overridden, the email addresses and the phone numbers used are populated as described in [Recipient lookup](/notifications/explanation/recipient-lookup/) 
and [Address lookup](/notifications/explanation/address-lookup/).

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
                // CommunicationConfig is optional
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
                // CommunicationConfig is optional
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

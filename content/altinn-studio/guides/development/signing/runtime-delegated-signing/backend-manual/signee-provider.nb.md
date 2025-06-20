---
hidden: true
---

For at appen skal vite hvem som skal få tilganger for å lese og signere må C# interface-et `ISigneeProvider` implementeres.

Den må returnere et sett med personer og/eller virksomheter som skal få rettighetene. Det kan for eksempel være basert på datamodellen, som vist nedenfor.
`Id`-attributtet i denne implementasjonen må matche ID som ble angitt i `<altinn:signeeProviderId>`.

Når en organisasjon er oppgitt som signatar så vil de som har en [nøkkelrolle](/nb/altinn-studio/reference/configuration/authorization/guidelines_authorization/roles_and_rights/roles_er/#nøkkelroller) i organisasjonen få `read` og `sign` rettigheter til instansen.

Legg merke til at `CommunicationConfig` er valgfritt. Her kan du overstyre standardtekster brukt i kommunikasjon med signatarene,
som beskrevet i punkt 3. Du kan også overstyre e-post adresse og telefonnummer for signatarene. Dersom ikke overstyrt, vil en
melding sendes til signatarenes altinn inboks med en lenke til den relevante applikasjonsintansen og en notifikasjon vil bli
sendt via e-post. For å skru på sms-notifikasjon, sett SMS = new SMS{ MobileNumber = ""}. 

Om ikke overstyrt, vil e-post adressene og telefonnummerene populeres som beskrevet i [Recipient lookup](/notifications/explanation/recipient-lookup/) og [Address lookup](/notifications/explanation/address-lookup/).

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
                // CommunicationConfig er valgfritt
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
                // CommunicationConfig er valgfritt
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

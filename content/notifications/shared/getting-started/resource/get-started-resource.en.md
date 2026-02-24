---
headless: true
hidden: true
---
Associating a notification with a resource, through the use of the `resourceId`-attribute, results in the policy of said resource being used to identify
the correct recipients of the notification. All intended recipients _must_ be granted `read` through the policy of the resource.

### About resources and who receives[^1] notifications:

* Notifications to private individuals (national identity number), explicit email address or phone number → `resourceId` has no effect
* Notifications to an organisation number:
  * The organisation’s statutory contact information (at enterprise level) is always used
  * Without a specified `resourceId` → only statutory contact information is used
  * With a `resourceId` → in addition to the statutory recipient, any person meeting *all* the below conditions is notified:
    * The person **must have** currently configured their “custom contact information” on the recipient-organsiation
    * The person **must have** `read` access to the resource through the resource’s policy [^2]
    * The person **must _not_ have** opted out of receiving notifications for this service [^3]

[^1]: See [Address Lookup](/en/notifications/explanation/address-lookup/) for additional details on how address lookup works.
[^2]: For Altinn Apps, you must also ensure that the access-subject has `read` granted for **all** relevant tasks and events.
[^3]: Users actively opt in to services, which means that services not opted into are considered opted out. This implies that if a user opted into an Altinn 2 service at some point, they have in practice opted out of all other services — including any re‑implementation in Altinn 3. All Altinn 2 resources (services) are carried over into Altinn 3, but the user has therefore often (without being aware of it) effectively chosen not to receive notifications for the new Altinn 3 resource.

### About resources and policies
A resource in this case can be both an Altinn App or a resource (tjenesteeierressurs).

A new Altinn Resources can be registered in Altinn Studio or through an API.
Please reference [Altinn Resource Administration](/en/authorization/what-do-you-get/resourceadministration/) for instructions on how to create a new resource.

The policy for both Altinn Apps and other Altinn Resources can be managed in Altinn Studio. 
Please reference the [Altinn Studio documentation](/en/altinn-studio) on how to do this.
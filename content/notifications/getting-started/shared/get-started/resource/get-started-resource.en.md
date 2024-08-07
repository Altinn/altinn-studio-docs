---
headless: true
hidden: true
---

Associating a notification with a resource results in the policy of said resource being used to identify 
the correct recipients of the notification. All intended recipients _must_ be granted `read` through the policy of the
resource. 

A resource in this case can be both an Altinn App or a resource (tjenesteeierressurs).

For Altinn Apps, you must also ensure that the access-subject has `read` granted for __all__  relevant tasks and events. 

A new Altinn Resources can be registered in Altinn Studio or through an API.
[Please reference Altinn Resource Registry for instructions on how to create a new resource.](authorization/what-do-you-get/resourceregistry/)

The policy for both Altinn Apps and other Altinn Resources can be managed in Altinn Studio. 
[Please reference the Altinn Studio documentation on how to do this.](altinn-studio)
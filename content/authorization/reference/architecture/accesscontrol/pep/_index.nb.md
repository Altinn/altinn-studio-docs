---
title: Policy Enforcement Point
linktitle: PEP
description: Altinn 3-plattformen tilbyr flere forskjellige policy enforcement point-løsninger.
tags: [architecture, security, needstranslation]
toc: false
---

Avsnittene under beskriver hvordan de innebygde PEP-ene er konstruert og hvordan du konfigurerer dem.

## Standard PEP-er

Utviklere bør konfigurere sikkerhet deklarativt der det er mulig.  
For å støtte dette prinsippet har vi utviklet flere standard policy enforcement point som API-utviklere kan knytte til endepunktene sine.

Den anbefalte måten å løse attributtbasert autorisasjon på i ASP.NET Core er å bruke [Policy-Based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies).

De standard PEP-ene er implementert som [Authorization Handlers](https://github.com/dotnet/aspnetcore/blob/main/src/Security/Authorization/Core/src/AuthorizationHandler.cs) i ASP.NET-applikasjonen.

Pakkene er publisert på NuGet som [Altinn.Common.PEP](https://www.nuget.org/packages/Altinn.Common.PEP).

### Policy Enforcement - AppAccess

`AppAccessHandler` sikrer API-endepunkter som håndterer data for en Altinn Studio-app.  
Konfigurasjon på endepunktet og oppgitte rute-/spørringsparametere brukes til å bygge forespørselen som sendes til PDP.

Se [AppAccessHandler](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/AppAccessHandler.cs)  
og [AppAccessRequirement](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/AppAccessRequirement.cs) for implementasjonsdetaljer.

I appen definerer utvikleren et sett `AppAccessRequirement` og knytter riktig krav til hver operasjon.

Eksempler på krav:

- **InstanceRead** – brukeren/systemet må ha rettighet til å lese en instans i gjeldende tilstand
- **InstanceWrite** – brukeren/systemet må ha rettighet til å endre instansen eller dataene i gjeldende tilstand
- **InstanceInstantiate** – brukeren/systemet må ha rettighet til å opprette en ny instans for appen

PEP-et bygger en beslutningsforespørsel ([eksempel](https://github.com/Altinn/altinn-authorization/blob/main/test/IntegrationTests/Data/Xacml/3.0/AltinnApps/AltinnApps0007Request.json)) basert på routedata (f.eks. `instanceId`) og den autentiserte identiteten, og kaller deretter PDP.

Responsen fra PDP ([eksempel](https://github.com/Altinn/altinn-authorization/blob/main/test/IntegrationTests/Data/Xacml/3.0/AltinnApps/AltinnApps0007Response.json)) avgjør om forespørselen godkjennes.  
Avslag returneres som HTTP 403.

PEP-et validerer også forpliktelser fra PDP, som for eksempel minimum autentiseringsnivå. Dersom forpliktelsen ikke oppfylles, blir forespørselen avslått med HTTP 403.

#### Konfigurasjon

Legg til nødvendige policyer i oppstart for å aktivere de standard PEP-ene:

```c#
services.AddAuthorization(options =>
{
    options.AddPolicy(AuthzConstants.POLICY_INSTANCE_READ, policy => policy.Requirements.Add(new AppAccessRequirement("read")));
    options.AddPolicy(AuthzConstants.POLICY_INSTANCE_WRITE, policy => policy.Requirements.Add(new AppAccessRequirement("write")));
    options.AddPolicy(AuthzConstants.POLICY_INSTANCE_DELETE, policy => policy.Requirements.Add(new AppAccessRequirement("delete")));
    options.AddPolicy(AuthzConstants.POLICY_INSTANCE_COMPLETE, policy => policy.Requirements.Add(new AppAccessRequirement("complete")));
});

```

Eksempel fra [Storage Program.cs](https://github.com/Altinn/altinn-storage/blob/main/src/Storage/Program.cs)

Bruk policyen på hver API-operasjon som skal beskyttes:

```c#
[Authorize(Policy = AuthzConstants.POLICY_INSTANCE_WRITE)]
[HttpDelete("data/{dataGuid:guid}")]
public async Task<ActionResult<DataElement>> Delete(int instanceOwnerPartyId, Guid instanceGuid, Guid dataGuid)

```

Eksempel fra [DataController](https://github.com/Altinn/altinn-storage/blob/main/src/Storage/Controllers/DataController.cs)


### Policy Enforcement ScopeAccessHandler

Bruk `ScopeAccessHandler` når bestemte OAuth-scopes kreves for å kalle et API.

Den støtter flere scopes.


Se [ScopeAccessHandler](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/ScopeAccessHandler.cs)  
og [ScopeAccessRequirement](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/ScopeAccessRequirement.cs) for detaljer.


#### Konfigurasjon

Registrer policy og handler ved oppstart:

```c#
    services.AddAuthorization(options =>
    {
        options.AddPolicy(AuthorizationConstants.POLICY_SCOPE_EVENTS_PUBLISH, policy => policy.Requirements.Add(new ScopeAccessRequirement("altinn:events.publish")));
    });    

    services.AddTransient<IAuthorizationHandler, ScopeAccessHandler>();
```

Eksempel fra [program.cs](https://github.com/Altinn/altinn-events/blob/main/src/Events/Program.cs) i Events-komponenten

Bruk policyen på det aktuelle endepunktet:

```c#
[Authorize(Policy = AuthorizationConstants.POLICY_SCOPE_EVENTS_PUBLISH)]
[Consumes("application/cloudevents+json")]
[HttpPost]
public async Task<ActionResult<string>> Post([FromBody] CloudEvent cloudEvent)

```

Eksempel fra [EventsController](https://github.com/Altinn/altinn-events/blob/main/src/Events/Controllers/EventsController.cs) i Events-komponenten

### Policy enforcement ResourceAccess

`ResourceAccessHandler` autoriserer forespørsler basert på policyen som er definert for en ressurs i Altinn Resource Registry.


Se [ResourceAccessHandler](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/ResourceAccessHandler.cs)  
og [ResourceAccessRequirement](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/ResourceAccessRequirement.cs) for implementasjonsdetaljer.

TODO: legg til eksempel på bruk.

### Policy enforcement - ClaimsAccess

`ClaimsAccessHandler` brukes når et bestemt claim må være til stede på den autentiserte identiteten.


#### Konfigurasjon

Registrer policyen i oppstart:

```c#
         services.AddAuthorization(options =>
            {
                options.AddPolicy(AuthzConstants.POLICY_STUDIO_DESIGNER, policy => policy.Requirements.Add(new ClaimAccessRequirement("urn:altinn:app", "studio.designer")));
            });

```



## Tilpasset PEP

I noen scenarier kan ikke nødvendig autorisasjonskontekst utledes direkte fra API-parametere.

Da må du implementere et egendefinert PEP som kjører i API-logikken.

Eksemplet under henter data fra databasen.  
Før resultatet returneres må hvert element sjekkes for autorisasjon, og bare godkjente instanser returneres til klienten.

```c#
       [Authorize]
        [HttpGet("{instanceOwnerPartyId:int}/{instanceGuid:guid}")]
        public async Task<ActionResult> GetMessageBoxInstance(
            int instanceOwnerPartyId,
            Guid instanceGuid,
            [FromQuery] string language)
        {
            string[] acceptedLanguages = { "en", "nb", "nn" };
            string languageId = "nb";

            if (language != null && acceptedLanguages.Contains(language.ToLower()))
            {
                languageId = language;
            }

            string instanceId = $"{instanceOwnerPartyId}/{instanceGuid}";

            Instance instance = await _instanceRepository.GetOne(instanceId, instanceOwnerPartyId);

            if (instance == null)
            {
                return NotFound($"Could not find instance {instanceId}");
            }

            List<MessageBoxInstance> authorizedInstanceList =
                await _authorizationHelper.AuthorizeMesseageBoxInstances(
                    HttpContext.User, new List<Instance> { instance });
            if (authorizedInstanceList.Count <= 0)
            {
                return Forbid();
            }

            MessageBoxInstance authorizedInstance = authorizedInstanceList.First();

            // get app texts and exchange all text keys.
            List<TextResource> texts = await _textRepository.Get(new List<string> { instance.AppId }, languageId);
            InstanceHelper.ReplaceTextKeys(new List<MessageBoxInstance> { authorizedInstance }, texts, languageId);

            return Ok(authorizedInstance);
        }
```

Eksempel fra [MessageboxInstancesController](https://github.com/Altinn/altinn-storage/blob/main/src/Storage/Controllers/MessageboxInstancesController.cs)

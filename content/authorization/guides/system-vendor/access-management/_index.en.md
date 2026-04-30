---
title: Access management API
description: How to use the access management API from an end user system
linktitle: Access management
toc: false
---

Altinn provides an access management API that lets end user systems administer access between parties.
The API makes it possible to view and manage who has access to what, delegate access packages and individual rights, and administer client relationships.

## What is an end user system?

An end user system is software or a website that calls Altinn's APIs on behalf of a user or an organisation. Examples include accounting systems, HR solutions and portals from a service owner with ID-porten login. There are two types:

- **Systems with ID-porten login:** Web solutions or applications where a person logs in with ID-porten. The system acts on behalf of the logged in user. This can be anything from an accounting system to a public portal that offers self-service functionality.
- **Systems with system user:** Background systems that use a [system user](../system-user/) to call the API without a person being logged in. The system acts on behalf of the organisation that has created the system user.

## When is this integration relevant?

The access management API is relevant for systems that want to automate administration of access in Altinn. Examples:

- **Large organisations** that want to automate which access employees have. Instead of logging in to Altinn and delegating access packages manually, the organisation can use the API to synchronise access from their own HR or identity systems.
- **Service providers** (accountants, auditors and similar) that administer access for many clients and want to do this efficiently through their own systems.
- **Administration solutions** that need to show the user which parties they can act on behalf of, and which rights they have.

## OpenAPI

- [EndUser](../../../../api/accessmanagement/enduser/)

## Who can use the API?

The API can be used by persons (via ID-porten) or by system users (via Maskinporten).

### Authentication with ID-porten

The person logs in via ID-porten. During login the end user must consent to the scopes that the system requests. These scopes limit what the system can do on behalf of the user.

See [authentication with ID-porten](../../../getting-started/authentication/id-porten/) for details about scopes and consent.

The ID-porten token must then be [exchanged for an Altinn token](../../../../api/).

### Relevant scopes

The system must request the scopes that are needed for the functionality it is going to use.

**Altinn access management**

| Scope | Description |
|---|---|
| `altinn:accessmanagement/authorizedparties` | Read which actors (persons and organisations) the logged in user can represent in Altinn |
| `altinn:accessmanagement/enduser:connections:fromothers.read` | View access received by you and others you are an access manager for |
| `altinn:accessmanagement/enduser:connections:fromothers.write` | Delete access received by you or other actors you are an access manager for |
| `altinn:accessmanagement/enduser:connections:toothers.read` | View access given to others, from you or other actors you are an access manager for |
| `altinn:accessmanagement/enduser:connections:toothers.write` | Create, update and delete access given to others from you or other actors you are an access manager for |
| `altinn:accessmanagement/enduser:requests.read` | View sent and received requests for access packages and resources for you or other actors you are an access manager for |
| `altinn:accessmanagement/enduser:requests.write` | Create, withdraw, approve and reject requests for access packages and resources for you or other actors you are an access manager for |

**Altinn client delegation**

| Scope | Description |
|---|---|
| `altinn:clientdelegations/myclients.read` | View which organisations have given you access to their clients, which clients you have received client delegated access to, and which access you have received for each client |
| `altinn:clientdelegations/myclients.write` | Delete received client delegated access for a given client, and delete your relationship with organisations that have given you access to their clients (including all client access) |

{{% notice info %}}
A test application that demonstrates how to use the API is available at [digitalportal.azurewebsites.net](https://digitalportal.azurewebsites.net/).
{{% /notice %}}

### Authentication with system user

The API can also be used with a [system user](../system-user/).
The system user token is retrieved from Maskinporten and must then be [exchanged for an Altinn token](../../../../api/).
See [using a system user](../system-user/usetoken/) for details about token exchange.

A system user token can, among other things, be used to call the [AuthorizedParties endpoint](#api-retrieve-authorised-parties) to find which parties the system user is authorised for. The Maskinporten token must then include the scope `altinn:accessmanagement/authorizedparties`.

### Access package requirement

To use most endpoints in the access management API, the logged in user or system user must have one of the following access packages for the relevant organisation:

- **Access management** (`urn:altinn:accesspackage:tilgangsstyring`)
- **Main administrator** (`urn:altinn:accesspackage:hovedadministrator`)

## Identifiers

The API uses `partyUuid` as the identifier for parties. Each person and organisation in Altinn has a unique UUID.

You can find `partyUuid` for the relevant parties via the AuthorizedParties endpoint described below.

---

## API: Retrieve authorised parties

Retrieves all parties (organisations and persons) that the logged in user or system user is authorised for.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/authorizedparties`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/authorizedparties`

{{% notice info %}}
The endpoint can be called both with an ID-porten token (exchanged for an Altinn token) and with a system user token (exchanged for an Altinn token). In both cases the token must include the scope `altinn:accessmanagement/authorizedparties`. When the call is made with a system user token, the parties the system user is authorised for are returned.
{{% /notice %}}

For a complete description of the endpoint, including all parameters and response fields, see [the OpenAPI documentation for the EndUser API](../../../../api/accessmanagement/enduser/).

#### Query parameters

| Parameter | Type | Default value | Description |
|---|---|---|---|
| `includeRoles` | boolean | false | Include roles in the response |
| `includeAccessPackages` | boolean | false | Include access packages in the response |
| `includeResources` | boolean | false | Include resources in the response |
| `includeInstances` | boolean | false | Include instances in the response |
| `includePartiesViaKeyRoles` | false/true/auto | auto | Include parties via key roles |
| `includeSubParties` | false/true/auto | auto | Include subordinate parties |
| `includeInactiveParties` | false/true/auto | auto | Include inactive parties |
| `partyFilter` | array (UUID) | null | Filter on specific parties |
| `anyOfResourceIds` | array (string) | null | Filter on resource IDs |

{{% notice tip %}}
If you want to find which parties the logged in user has access management rights for, you can use the `anyOfResourceIds` filter with the resource ID for access management:

`GET .../enduser/authorizedparties?anyOfResourceIds=urn:altinn:resource:accessmanagement/authorizedparties`

This returns only parties where the user has rights to manage access.
{{% /notice %}}

Example response

```json
{
  "links": {
    "next": null
  },
  "data": [
    [
      {
        "partyUuid": "4a06214d-b261-4695-b33a-0771a995b503",
        "name": "GEOMETRISK VOKSENDE TIGER AS",
        "organizationNumber": "310757632",
        "partyId": 51561408,
        "type": "Organization",
        "unitType": "AS",
        "isDeleted": false,
        "onlyHierarchyElementWithNoAccess": false,
        "authorizedAccessPackages": [
          "urn:altinn:accesspackage:skattegrunnlag"
        ],
        "authorizedRoles": [
          "urn:altinn:role:tilgangsstyrer"
        ],
        "subunits": []
      }
    ]
  ]
}
```

---

## API: Retrieve connections

Retrieves all connections (relationships) for a given party. A connection shows who has access to what, including roles, access packages and resources.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the person or organisation you are an access manager for |
| `from` | UUID | No | Filter on sender |
| `to` | UUID | No | Filter on receiver |
| `includeClientDelegations` | boolean | No (default: true) | Include client delegations |
| `includeAgentConnections` | boolean | No (default: true) | Include agent connections |

`party` must be equal to either `to` or `from`. The value indicates which party you manage access for. The combination determines the direction of the lookup:

- **`party` = `to`**: Retrieves rights given **to** this party (who has given the party access?).
- **`party` = `from`**: Retrieves rights given **from** this party (who has the party given access to?).

Pagination is controlled with `X-Page-Size` and `X-Page-Number` headers.


Example response

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "party": {
        "id": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960",
        "name": "KREATIV GRANITT",
        "type": "Person",
        "variant": "Person"
      },
      "roles": [
        {
          "id": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
          "code": "rettighetshaver",
          "urn": "urn:altinn:role:rettighetshaver"
        }
      ],
      "packages": [
        {
          "id": "4c859601-9b2b-4662-af39-846f4117ad7a",
          "urn": "urn:altinn:accesspackage:skattegrunnlag"
        }
      ],
      "resources": []
    }
  ]
}
```

## API: Create connection

Creates a new connection (delegation) to a person. Provide national identity number and last name.

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/connections`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `to` | UUID | No | partyUuid for the receiver (alternative to body) |

Example request (body)

```json
{
  "personIdentifier": "01038712345",
  "lastName": "Salt"
}
```

Example response

```json
{
  "id": "019c2e70-c577-7b20-a11c-245fecd5e564",
  "roleId": "ff4c33f5-03f7-4445-85ed-1e60b8aafb30",
  "fromId": "4a06214d-b261-4695-b33a-0771a995b503",
  "toId": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960"
}
```

## API: Delete connection

Deletes a connection between two parties.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections`
- **Production**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/connections`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `from` | UUID | Yes | partyUuid for the sender |
| `to` | UUID | Yes | partyUuid for the receiver |
| `cascade` | boolean | No | Also delete underlying delegations |

---

## API: Retrieve access packages for a connection

Retrieves access packages that have been delegated between two parties.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `from` | UUID | No | partyUuid for the sender |
| `to` | UUID | No | partyUuid for the receiver |

Pagination is controlled with `X-Page-Size` and `X-Page-Number` headers.

## API: Delegate access package

Delegates an access package to a person.

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `to` | UUID | No | partyUuid for the receiver (alternative to body) |
| `packageId` | UUID | No | ID of the access package |
| `package` | string | No | URN of the access package |

Example request (body)

```json
{
  "personIdentifier": "01038712345",
  "lastName": "Salt"
}
```

Example response

```json
{
  "id": "019c2e70-c577-7b20-a11c-245fecd5e564",
  "assignmentId": "ff4c33f5-03f7-4445-85ed-1e60b8aafb30",
  "packageId": "4c859601-9b2b-4662-af39-846f4117ad7a"
}
```

## API: Remove access package

Removes a delegated access package from a connection.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`
- **Production**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `from` | UUID | Yes | partyUuid for the sender |
| `to` | UUID | Yes | partyUuid for the receiver |
| `packageId` | UUID | No | ID of the access package |
| `package` | string | No | URN of the access package |

## API: Check delegation eligibility for access packages

Checks whether the logged in user can delegate a given access package on behalf of the party.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages/delegationcheck`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages/delegationcheck`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `packageIds` | array (UUID) | No | IDs of the access packages |
| `packages` | array (string) | No | URNs of the access packages |

Example response

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "package": {
        "id": "4c859601-9b2b-4662-af39-846f4117ad7a",
        "urn": "urn:altinn:accesspackage:skattegrunnlag"
      },
      "result": true,
      "reasons": []
    }
  ]
}
```

---

## API: Retrieve roles for a connection

Retrieves roles that a party has been delegated in a connection.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/roles`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/roles`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `from` | UUID | Yes | partyUuid for the sender |
| `to` | UUID | Yes | partyUuid for the receiver |

Pagination is controlled with `X-Page-Size` and `X-Page-Number` headers.

---

## API: Retrieve resources for a connection

Retrieves resources that have been delegated between two parties.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `from` | UUID | No | partyUuid for the sender |
| `to` | UUID | No | partyUuid for the receiver |
| `resource` | string | No | Resource ID |

## API: Remove resource delegation

Removes a delegated resource from a connection.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources`
- **Production**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `from` | UUID | Yes | partyUuid for the sender |
| `to` | UUID | Yes | partyUuid for the receiver |
| `resource` | string | No | Resource ID |

---

## API: Retrieve individual rights for a resource

Retrieves individual rights (read, write, sign and so on) that have been delegated for a specific resource between two parties.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `from` | UUID | Yes | partyUuid for the sender |
| `to` | UUID | Yes | partyUuid for the receiver |
| `resource` | string | No | Resource ID |

## API: Delegate individual rights for a resource

Delegates individual rights for a resource to a party.

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `to` | UUID | Yes | partyUuid for the receiver |
| `resource` | string | No | Resource ID |

Example request (body)

```json
{
  "directRightKeys": [
    "read",
    "write"
  ]
}
```

## API: Update individual rights for a resource

Updates (replaces) individual rights for a resource.

- **Test**: `PUT https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`
- **Production**: `PUT https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`

The query parameters and request body are the same as for delegation (POST).

## API: Check delegation eligibility for resource

Checks whether the logged in user can delegate rights for a given resource.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources/delegationcheck`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources/delegationcheck`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party |
| `resource` | string | No | Resource ID |

Example response

```json
{
  "resource": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Skattemelding",
    "refId": "skd-skattemelding"
  },
  "rights": [
    {
      "right": {
        "key": "read",
        "name": "Les",
        "action": {
          "type": "urn:oasis:names:tc:xacml:1.0:action:action-id",
          "value": "read"
        }
      },
      "result": true,
      "reasonCodes": []
    }
  ]
}
```

---

## Requesting access from another party

The endpoints below let a logged in user or system user request an access package or rights on a resource from another party. This is useful when the recipient cannot grant the access to themselves and needs to ask the owner of the party.

The flow is:

1. **The sender** creates a request for an access package or a resource.
2. **The recipient** sees the request in the list of received requests and can approve or reject it.
3. **The sender** can withdraw a request that has not yet been processed.

A request can have one of the following statuses: `Pending` (awaiting decision), `Approved`, `Rejected` or `Withdrawn`. The status `Draft` is also used for drafts created from the Altinn portal.

The endpoints require the scopes `altinn:accessmanagement/enduser:requests.read` (read) and `altinn:accessmanagement/enduser:requests.write` (write).

### API: Request an access package

Creates a request to another party for an access package.

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/request/package`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/request/package`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the sender (the party you act on behalf of) |
| `to` | UUID | Yes | partyUuid for the recipient (the party you are requesting access from) |
| `package` | string | Yes | URN for the requested access package |

Example response

```json
{
  "id": "019c2e70-c577-7b20-a11c-245fecd5e564",
  "status": "Pending",
  "type": "package",
  "lastUpdated": "2026-04-30T10:15:00Z",
  "package": {
    "id": "4c859601-9b2b-4662-af39-846f4117ad7a",
    "referenceId": "urn:altinn:accesspackage:skattegrunnlag"
  },
  "from": {
    "id": "4a06214d-b261-4695-b33a-0771a995b503"
  },
  "to": {
    "id": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960"
  }
}
```

### API: Request rights on a resource

Creates a request to another party for specific rights on a resource.

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/request/resource`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/request/resource`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the sender |
| `to` | UUID | Yes | partyUuid for the recipient |
| `resource` | string | Yes | Resource ID |


### API: Confirm a draft

Confirms a draft request so that it is sent to the recipient. Typically used from the Altinn portal after the sender has reviewed the draft created by the service owner.

- **Test**: `PUT https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/request/draft/confirm`
- **Production**: `PUT https://platform.altinn.no/accessmanagement/api/v1/enduser/request/draft/confirm`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the sender |
| `id` | UUID | Yes | id of the draft |

### API: Retrieve a request

Retrieves a single request by id.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/request`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/request`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the party you act on behalf of |
| `id` | UUID | Yes | id of the request |

### API: Retrieve sent requests

Retrieves all requests that the party has sent to others.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/request/sent`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/request/sent`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the sender |
| `to` | UUID | No | Filter by recipient |
| `status` | array | No | Filter by status (`Draft`, `Pending`, `Approved`, `Rejected`, `Withdrawn`) |
| `type` | string | No | Filter by type (`package` or `resource`) |

Pagination is controlled with the `X-Page-Size` and `X-Page-Number` headers.

To retrieve only the count of sent requests, use `GET /enduser/request/sent/count` with the same filter parameters.

### API: Withdraw a sent request

Withdraws a request that has not yet been approved or rejected.

- **Test**: `PUT https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/request/sent/withdraw`
- **Production**: `PUT https://platform.altinn.no/accessmanagement/api/v1/enduser/request/sent/withdraw`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the sender |
| `id` | UUID | Yes | id of the request |

### API: Retrieve received requests

Retrieves all requests that the party has received from others.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/request/received`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/request/received`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the recipient |
| `from` | UUID | No | Filter by sender |
| `status` | array | No | Filter by status (`Draft`, `Pending`, `Approved`, `Rejected`, `Withdrawn`) |
| `type` | string | No | Filter by type (`package` or `resource`) |

Pagination is controlled with the `X-Page-Size` and `X-Page-Number` headers.

To retrieve only the count of received requests, use `GET /enduser/request/received/count` with the same filter parameters.

### API: Approve a received request

Approves a received request and creates the underlying delegation.

- **Test**: `PUT https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/request/received/approve`
- **Production**: `PUT https://platform.altinn.no/accessmanagement/api/v1/enduser/request/received/approve`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the recipient |
| `id` | UUID | Yes | id of the request |

For resource requests, the body can specify which rights to approve. Leave the body empty to approve all the rights that were requested:

```json
[
  "read",
  "write"
]
```

### API: Reject a received request

Rejects a received request.

- **Test**: `PUT https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/request/received/reject`
- **Production**: `PUT https://platform.altinn.no/accessmanagement/api/v1/enduser/request/received/reject`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `party` | UUID | Yes | partyUuid for the recipient |
| `id` | UUID | Yes | id of the request |

---

## The end user's own client relationships

The endpoints below let a logged in person view and administer their own client relationships.
That is, clients that have been delegated to the user via a service provider.

### API: Retrieve my clients

Retrieves all clients that the logged in user has been delegated access to.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clients`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clients`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `provider` | array (UUID) | No | Filter on specific service providers |

Pagination is controlled with `X-Page-Size` and `X-Page-Number` headers.

Example response

```json
{
  "data": [
    {
      "provider": {
        "id": "3e1a0c01-dcaa-47f6-b76b-820d380bd639",
        "name": "LEGITIM RASK TIGER AS",
        "type": "Organisasjon",
        "variant": "AS",
        "parent": null,
        "children": null,
        "partyid": 51690650,
        "userId": null,
        "username": null,
        "organizationIdentifier": "313818713",
        "personIdentifier": null,
        "dateOfBirth": null,
        "dateOfDeath": null,
        "isDeleted": false,
        "deletedAt": null
      },
      "clients": [
        {
          "client": {
            "id": "ee08d709-db94-4e3e-9791-d1cfd5fe7310",
            "name": "ULASTELIG SOLID TIGER AS",
            "type": "Organisasjon",
            "variant": "AS",
            "parent": null,
            "children": null,
            "partyid": 51745556,
            "userId": null,
            "username": null,
            "organizationIdentifier": "313572773",
            "personIdentifier": null,
            "dateOfBirth": null,
            "dateOfDeath": null,
            "isDeleted": false,
            "deletedAt": null
          },
          "access": [
            {
              "role": {
                "id": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
                "code": "rettighetshaver",
                "urn": "urn:altinn:role:rettighetshaver",
                "legacyurn ": null,
                "children": null
              },
              "packages": [
                {
                  "id": "9d2ec6e9-5148-4f47-9ae4-4536f6c9c1cb",
                  "urn": "urn:altinn:accesspackage:fiske",
                  "areaId": "fc93d25e-80bc-469a-aa43-a6cee80eb3e2"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "provider": {
        "id": "b1e5dc9e-9151-46c9-948f-21c2cc1dc7bd",
        "name": "PASSIV MUSKULØS MINK ANS",
        "type": "Organisasjon",
        "variant": "ANS",
        "parent": null,
        "children": null,
        "partyid": 51707476,
        "userId": null,
        "username": null,
        "organizationIdentifier": "311818031",
        "personIdentifier": null,
        "dateOfBirth": null,
        "dateOfDeath": null,
        "isDeleted": false,
        "deletedAt": null
      },
      "clients": [
        {
          "client": {
            "id": "ee08d709-db94-4e3e-9791-d1cfd5fe7310",
            "name": "ULASTELIG SOLID TIGER AS",
            "type": "Organisasjon",
            "variant": "AS",
            "parent": null,
            "children": null,
            "partyid": 51745556,
            "userId": null,
            "username": null,
            "organizationIdentifier": "313572773",
            "personIdentifier": null,
            "dateOfBirth": null,
            "dateOfDeath": null,
            "isDeleted": false,
            "deletedAt": null
          },
          "access": [
            {
              "role": {
                "id": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
                "code": "rettighetshaver",
                "urn": "urn:altinn:role:rettighetshaver",
                "legacyurn ": null,
                "children": null
              },
              "packages": [
                {
                  "id": "9d2ec6e9-5148-4f47-9ae4-4536f6c9c1cb",
                  "urn": "urn:altinn:accesspackage:fiske",
                  "areaId": "fc93d25e-80bc-469a-aa43-a6cee80eb3e2"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "links": {
    "next": null
  }
}
```

### API: Remove client delegation

Removes a delegated client access for the logged in user.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clients`
- **Production**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clients`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `provider` | UUID | Yes | partyUuid for the service provider |
| `from` | UUID | Yes | partyUuid for the client |

Example request (body)

```json
{
  "values": [
    {
      "role": "rettighetshaver",
      "packages": [
        "urn:altinn:accesspackage:regnskapsforer-uten-signeringsrettighet"
      ]
    }
  ]
}
```

### API: Retrieve my service providers

Retrieves all service providers that have delegated client rights to the logged in user.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clientproviders`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clientproviders`

This endpoint has no query parameters.

### API: Remove service provider

Removes the relationship to a service provider. This also removes all client delegations from that service provider.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clientproviders`
- **Production**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clientproviders`

#### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `provider` | UUID | Yes | partyUuid for the service provider |

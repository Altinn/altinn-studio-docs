---
title: Fiks Arkiv
description: How to configure integration with Fiks Arkiv for an app.
tags: [fiks-arkiv, fiks, arkiv]
toc: true
weight: 15
---

{{% notice info %}}
Nuget version [v8.9.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.9.0) or 
higher is required for an app to support Fiks Arkiv.
{{% /notice %}}

In addition to the documentation below, we have created a 
[sample application](https://altinn.studio/repos/ttd/fiks-arkiv-test) showing the complete Fiks Arkiv setup in an app.


## Prerequisites

Before setting up the Fiks Arkiv integration in your app you will need to have the following set up: 

- **Fiks Protokoll** enabled in Fiks forvaltning portal for your organisation
- **Samarbeidsportalen** access to configure Maskinporten clients (national ID provider)
- An **archive system** that integrates with Fiks Arkiv (e.g., Public 360)

## Integration architecture and flow

![fiks-arkiv-flyt.png](fiks-arkiv-flyt.png "Principal of message transmission through Fiks Arkiv. Fagsystem in the sketch would in this case be an Altinn App.")
Source of image: [KS Digital](https://github.com/ks-no/fiks-arkiv-specification)

![fiks-arkitektur.svg](fiks-dataflyt.svg "Flow chart for Fiks Arkiv integration for an Altinn app")

## Configuration for sending messages from Altinn App 
{.floating-bullet-numbers-sibling-ol}

### Step 1: Create a Maskinporten client

- Set up a Maskinporten client with scopes: `ks:fiks`, `altinn:serviceowner/instances.read` and
`altinn:serviceowner/instances.write`
- Generate a **JWK keypair for Maskinporten authentication** and upload the public key to the newly generated Maskinporten client
-  Keep the following configuration values for the Altinn App setup
    - Client id for the generated Maskinporten client
    - Public and private key of the **Maskinporten JWK keypair** (base64 encoded)
_This maskinporten client will be used to authenticate requests from the Altinn App both towards Altinn Platform 
and Fiks._

A detailed guide on how to set up a Maskinporten client in Samarbeidsportalen is available below.

{{% expandlarge id="guide-mp-int-samarbeid" header="Guide on how to register a new Maskinporten integration in Samarbeidsportalen" %}}
{{% insert "content/shared/maskinporten/maskinporten-client-create.en.md" %}}
{{% /expandlarge %}}

### Step 2: Create a Fiks Arkiv account

- Generate an **x509 certificate for Fiks Arkiv encryption**.
 
  Format requirements:
  - Public part: .PEM file, to be uploaded in Fiks Forvaltning
  - Private part: .PEM formatted string, base64 encoded to be uploaded as a secret for the Altinn App. 

  Use your preferred tool to generate the certificate. A guide is available at the end of this section.

- In Fiks Forvaltning, set up a new system under Fiks Protokoll for your organisation.
  [KS Digital's system setup guide](https://developers.fiks.ks.no/tjenester/fiksprotokoll/veiledning_3_opprette_system/)
   

- Create an account linked to this system. [KS Digital's account setup guide](https://developers.fiks.ks.no/tjenester/fiksprotokoll/veiledning_4_opprette_konto/) 
 
  The account should be configured with the following properties
    
    | Property          | Value             |
    |-------------------|-------------------|
    | Protokolltype     | no.ks.fiks.arkiv  |
    | Versjon           | v1                |
    | Protokollparter   | klient.arkivering / klient.full* |

    \* _klient.arkivering_ should be used unless the account will be used for other tasks as well.

- Keep the following configuration values for the Altinn App setup
    - Integration ID and password of the Fiks system
            <img src="fiks-system-integration-values.png" alt="Screenshot illustrating where to find the system configuration values in Fiks Forvaltning" width="80%">
    - The account ID of the Fiks account
            <img src="fiks-account-id.png" alt="Screenshot illustrating where to find the account configuration values in Fiks Forvaltning" width="80%">
    - Private part of the **x509 certificate** as a base64 string

{{% expandlarge id="guide-x509-cert" header="Guide on how to generate an x509 self-signed certificate" %}}
{{% insert "content/shared/x509/cert-generation.en.md" %}}
{{% /expandlarge %}}

### Step 3: Configure and prepare the Altinn App
    
The Altinn Fiks package automatically handles a lot of the integration for you. The simplest setup for a Fiks Integration
involves setting up configuration values for connection to Maskinporten and Fiks, as well as specifying which 
data should be sent to Fiks and who the recipient is. 

That being said, all interfaces can be overridden with custom logic should you wish to have more control yourself. 
The standard way is what is described here, but interfaces will be mentioned for those that wish for more control.

-  Add a reference to the NuGet package
[Altinn.App.Clients.Fiks](https://www.nuget.org/packages/Altinn.App.Clients.Fiks/) in your project file.
The package version should match the version of the _Altinn.App.Core_ and _Altinn.App.Api_ packages.
    {{< code-title >}}
    App/App.csproj
    {{< /code-title >}}
    ```xml {hl_lines=[5]}
        <PackageReference Include="Altinn.App.Api" Version="8.9.0">
        <CopyToOutputDirectory>lib\$(TargetFramework)\*.xml</CopyToOutputDirectory>
        </PackageReference>
        <PackageReference Include="Altinn.App.Core" Version="8.9.0" />
        <PackageReference Include="Altinn.App.Clients.Fiks" Version="8.9.0" />
    ```
- Register all Fiks Arkiv dependencies including required configuration in the program file.
    {{< code-title >}}
    App/Program.cs
    {{< /code-title >}}

    ```csharp
    void RegisterCustomAppServices(
        IServiceCollection services,
        IConfiguration config,
        IWebHostEnvironment env
    )
    {           
        // redacted code 

        services
            .AddFiksArkiv()
            .WithFiksIOConfig("FiksIOSettings")
            .WithFiksArkivConfig("FiksArkivSettings")
            .WithMaskinportenConfig("MaskinportenSettings");
    }
    ```
    __Note:__ You are free to select section names for the configuration values, 
    but these must match the section names used in appsettings.json and/or the applications secret management 
    platform (e.g. Azure Key Vault).

- Set up configuration values in appsettings.json or Azure Key Vault. 
    All sensitive values should be registered in Azure Key Vault, and not checked 
    in to appsettings.json.


{{% expandlarge id="guide-mp-config-vals" header="Overview of Maskinporten configuration" %}}

The client id for the Maskinporten client generated in step 1 and the base64-encoded public and private key
should be added as _ClientId_ and _JwkBase64_ in the _MaskinportenSettings_ section. 


| **Setting Name**  | **Description**                                                                       |
|-------------------|---------------------------------------------------------------------------------------|
| **Authority**     | The Maskinporten authority/audience to use for authentication and authorization.      |
| **ClientId**      | The client ID which has been registered with Maskinporten. Typically a uuid4 string.  |
| **JwkBase64**     | The private key used to authenticate with Maskinporten, in Base64 encoded JWK format. |

### Configuration Example
{.floating-bullet-numbers-sibling-ol}

- **Section name:** `MaskinportenSettings`
- **Service registration:**
  
{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp {hl_lines=[3]}
services
    .AddFiksArkiv()
    .WithMaskinportenConfig("MaskinportenSettings");
```

#### Application settings

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
"MaskinportenSettings": {
    "Authority": "https://test.maskinporten.no/",
    "ClientId": "retrieved from secrets",
    "JwkBase64": "retrieved from secrets"
}
```

#### Key Vault Secrets

- `MaskinportenSettings--ClientId`
- `MaskinportenSettings--JwkBase64`


For the application to be able to read the secrets from Azure Key Vault, it needs to be configured to do so.
   See the [secrets section](/en/altinn-studio/v8/reference/configuration/secrets/) to achieve this.


_Note: The secrets are read by the application on launch so if you make changes after the application is deployed, 
you will need to redeploy the application for them to come into effect._
{{% /expandlarge %}}

{{% expandlarge id="guide-fiks-io-settings" header="Overview of FiksIOSettings" %}}
| **Setting Name**            | **Description**                                                                                       |
|-----------------------------|-------------------------------------------------------------------------------------------------------|
| **AccountId**               | Unique identifier for the FIKS IO account.                                                          |
| **IntegrationId**           | Unique identifier for the FIKS IO integration.                                                      |
| **IntegrationPassword**     | Password used for the Fiks Arkiv system integration.                                                |
| **AccountPrivateKeyBase64** | Base64-encoded private key in PEM format, used for authentication and message decryption.           |

### Configuration Example
{.floating-bullet-numbers-sibling-ol}

It is recommended to store all sensitive FiksIO setting values securely in **Azure Key Vault**
or the secret management provider used by your application.

- **Section name:** `FiksIOSettings`
- **Service registration:**
  
{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp {hl_lines=[3]}
services
    .AddFiksArkiv()
    .WithFiksIOConfig("FiksIOSettings");
```

#### Application settings

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
"FiksIOSettings": {
    "AccountId": "c3c87fac-06be-44ed-a11c-aa137d12863c",
    "IntegrationId": "08b3d8b9-5026-46dc-936c-8e6709efa72c",
    "IntegrationPassword": "retrieved from secrets",
    "AccountPrivateKeyBase64": "retrieved from secrets"
}
```

#### Key Vault Secrets

- `FiksIOSettings--IntegrationPassword`
- `FiksIOSettings--AccountPrivateKeyBase64`

{{% /expandlarge %}}

{{% expandlarge id="guide-fiks-arkiv-settings" header="Overview of FiksArkivSettings" %}}


#### Service registration 

- **Section name:**: FiksArkivSettings
- **Service registration:**

  
{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp  {hl_lines=[3]}
services
    .AddFiksArkiv()
    .WithFiksArkivConfig("FiksArkivSettings");
```
    
#### High-Level Structure

```bash
FiksArkivSettings
├─ Receipt
│  ├─ ConfirmationRecord
│  └─ ArchiveRecord
├─ Recipient
│  ├─ FiksAccount
│  ├─ Identifier
│  ├─ Name
│  └─ OrganizationNumber
├─ Metadata
│  ├─ SystemId
│  ├─ RuleId
│  ├─ CaseFileId
│  ├─ CaseFileTitle
│  └─ JournalEntryTitle
├─ Documents
│  ├─ PrimaryDocument
│  └─ Attachments{}
├─ ErrorHandling
│  ├─ MoveToNextTask
│  └─ Action
└─ SuccessHandling
   ├─ MoveToNextTask
   ├─ Action
   └─ MarkInstanceComplete
```

Further, we break down each sub-section of **FiksArkivSettings**, shows how to bind values (static vs. dynamic), 
and provides a complete `appsettings.json` example.

{{% notice info %}}
As the code is subject to change, the settings are documented after best effort. 
If you want an exact depiction of the available settings, please reference the [source code](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Clients.Fiks/FiksArkiv/Models/FiksArkivSettings.cs#L55).
{{% /notice %}}


#### Sections & Settings

- **Receipt** (FiksArkivSettings.Receipt)
  
  Settings related to the records created after a successful shipment.
   
  {{% notice info %}}
  Note: The data types defined here must have corresponding entries in the datateype definition in applicationmetadata. 
  {{% /notice %}}
    
    | Setting Name           | Purpose                                                   | Format |
    |------------------------|-----------------------------------------------------------|--------|
    | **ConfirmationRecord** | Defines the data type and name for the _arkivkvittering_. | `{ "DataType": "string", "Filename": "string" }` |
    | **ArchiveRecord**      | Defines the data type and name for the _arkivmelding_.    | `{ "DataType": "string", "Filename": "string" }` |

    **Example configuration:**

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
"FiksArkivSettings": {
  "Receipt": {
    "ConfirmationRecord": {
      "DataType": "fiks-receipt",
      "Filename": "Arkivkvittering.xml"
    },
    "ArchiveRecord": {
      "DataType": "fiks-archive-record", 
      "Filename": "Arkivmelding.xml"
    }
  }
}
```

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "dataTypes":[
    {
      "id": "fiks-receipt",
      "allowedContributers": [ "app:owned" ],
      "maxCount": 1,
      "minCount": 0,
      "enablePdfCreation": false,
      "enableFileScan": false,
      "validationErrorOnPendingFileScan": false
    },
    {
      "id": "fiks-archive-record",
      "allowedContributers": [ "app:owned" ],
      "maxCount": 1,
      "minCount": 0,
      "enablePdfCreation": false,
      "enableFileScan": false,
      "validationErrorOnPendingFileScan": false
    }
  ]
}
```

- **Recipient** (FiksArkivSettings.Recipient)
  
    Settings related to who will receive the Fiks Arkiv message.

    | Setting Name           | Purpose                                          | Type              |
    |------------------------|--------------------------------------------------|-------------------|
    | **FiksAccount**        | The recipient account GUID to ship messages to.  | GUID (required)   |
    | **Identifier**         | Recipient identifier (e.g., municipality number).| string (required) | 
    | **Name**               | Recipient name.                                  | string (required) |
    | **OrganizationNumber** | Optional recipient organization number.          | string (optional) |

    Recipient settings support both static and dynamic configuration formats - see 
    [How Values Are Provided](#how-values-are-provided) for syntax and use `DataModelBinding` when fields differ 
    per instance.

    **Example configuration:**

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
  "FiksArkivSettings": {
    "Recipient": {
      "FiksAccount": {
        "DataModelBinding": {
          "DataType": "HelperDataModel",
          "Field": "Recipient.AccountId"
        }
      },
      "Identifier": {
        "DataModelBinding": {
          "DataType": "HelperDataModel",
          "Field": "Recipient.Identifier"
        }
      },
      "OrganizationNumber": {
        "DataModelBinding": {
          "DataType": "HelperDataModel",
          "Field": "Recipient.OrgNumber"
        }
      },
      "Name": {
        "DataModelBinding": {
          "DataType": "HelperDataModel",
          "Field": "Recipient.Name"
      }
    }
  }
}
```

- **Metadata** (FiksArkivSettings.Metadata)

  Contextual information used by the archive system.

  | Setting Name          | Purpose                                                                                   | Default Behavior                                      |
  |-----------------------|-------------------------------------------------------------------------------------------|-------------------------------------------------------|
  | **SystemId**          | System ID used in the generated `arkivmelding.xml`.                                       | Defaults to `Altinn Studio` if not provided.          |
  | **RuleId**            | Optional rule ID for processing the incoming message in systems that support rule IDs.    | Omitted if not provided.                              |
  | **CaseFileId**        | ID for the generated case file *(saksmappe element)*.                                     | Defaults to the instance identifier if not provided.  |
  | **CaseFileTitle**     | Title for the generated *saksmappe tittel* element.                                       | Defaults to the application title if not provided.    |
  | **JournalEntryTitle** | Title for the generated *journalpost tittel* element.                                     | Defaults to the application title if not provided.    |

  Metadata support both static and dynamic configuration formats - see 
  [How Values Are Provided](#how-values-are-provided) for syntax and use `DataModelBinding` when fields differ 
  per instance.

    **Example configuration:**

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
"FiksArkivSettings": {
  "Metadata": {
   "JournalEntryTitle": {
      "DataModelBinding": {
       "DataType": "HelperDataModel",
       "Field": "JournalEntryTitle"
      }
    },
    "CaseFileTitle": {
      "DataModelBinding": {
       "DataType": "HelperDataModel",
       "Field": "CaseFileTitle"
      }
    }
  }
}
```

- **Documents** (FiksArkivSettings.Documents)

Definition of the documents to include in the archive message (arkivmelding) that is sent to Fiks Arkiv.

| Setting Name        | Purpose                                                                           |
|---------------------|-----------------------------------------------------------------------------------|
| **PrimaryDocument** | The main document (e.g., form data or PDF) sent as **Hoveddokument**.             |
| **Attachments**     | Optional additional documents sent as **Vedlegg** (array of attachments).         |

> Each document entry typically uses `DataType` to indicate the source and/or format. For example, `"ref-data-as-pdf"` for a PDF generated from reference data.


  **Example configuration:**

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}


```json
"FiksArkivSettings": {
  "Documents": {
    "PrimaryDocument": {
      "DataType": "ref-data-as-pdf"
    },
    "Attachments": [
      {
        "DataType": "DataModel"
      },
      {
        "DataType": "vedlegg-datatype"
      }
    ]
  }
}
```      


- **ErrorHandling** (FiksArkivErrorHandlingSettings)

What the application should do when a send attempt fails.

| Setting Name        | Purpose                                                            | Type |
|---------------------|--------------------------------------------------------------------|------|
| **MoveToNextTask**  | Whether to automatically progress to the next task on failure.     | bool |
| **Action**          | The action to send when progressing in process after failure (default: `reject`). | string |


  **Example configuration:**

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}


```json
"FiksArkivSettings": {
  "ErrorHandling": {
    "MoveToNextTask": true
  }
}
```      

- **SuccessHandling** (FiksArkivSuccessHandlingSettings)
  
What the application should do when a send attempt succeeds.

| Setting Name             | Purpose                                                            | Type    |
|--------------------------|--------------------------------------------------------------------|---------|
| **MoveToNextTask**       | Whether to automatically progress to the next task on success.     | bool    |
| **Action**               | The action to send when progressing in process after success.      | string  |
| **MarkInstanceComplete** | Whether to mark the instance as completed after success.           | bool    |

  **Example configuration:**

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}


```json
"FiksArkivSettings": {
  "SuccessHandling": {
      "MoveToNextTask": true,
      "MarkInstanceComplete": true
  }
}
```      

#### Practical Tips

- **Start simple**: Configure `Recipient` and `Metadata` first; add `Documents` and `Receipt` details as needed.
- **Use binding for variability**: Prefer `DataModelBinding` for fields that vary per instance or environment.
- **Keep defaults in mind**: If you omit certain metadata fields, sensible defaults (like application title) are used.
- **Actions & flow**: Set `ErrorHandling` and `SuccessHandling` to align with your process (e.g., move to next task, mark instance complete).


#### How Values Are Provided
{.floating-bullet-numbers-sibling-ol}

Each setting can be supplied in one of two ways:

1. **Static (hard-coded) value**
   
   ```json
   "JournalEntryTitle": {
     "Value": "Hallo"
   }
   ```

2. **Dynamic value via data model binding**
  
   ```json
   "CaseFileTitle": {
     "DataModelBinding": {
       "DataType": "HelperDataModel",
       "Field": "CaseFileTitle"
     }
   }
   ```

Use **`Value`** when you know the text upfront; use **`DataModelBinding`** when values should come from your runtime data (e.g., fields collected in a form or helper model).


#### Troubleshooting

- **Missing titles**: If journal or case file titles are empty, check that your `DataModelBinding` points to existing fields, or provide a `Value`.
- **Incorrect recipient**: Verify that `FiksAccount` contains a valid GUID and matches the intended recipient.
- **Attachment resolution**: Ensure each attachment `DataType` is defined in application metadata.

{{% /expandlarge %}}

- Define desired process flow for the application
  
  The recommended process flow for an application using Fiks Arkiv is depicted below. 
  The feedback step is necessary to allow for a response from the asynchronous process of sending the archive message
  and receiving a response before confirming to the user that the sending was successful. 

  <img src="fiks-arkiv-process.png" alt="Illustration of recommended processs flow" width="80%">

- Define the policy for the application

Ensure that each task in the process flow has authorization rules linked to them specifying which entities are allowed 
to complete which actions given a specific state. 

### Overriding standard behavior

If the standard archive message and functionality does not cover what you need in your archive message, 
it is possible to override the implementation of functionality for archive message generation and 
processing the response from the the receiving Fiks account.

#### Override archive message generation

The interface to implement is `IFiksArkivPayloadGenerator`.

If your implemented class is called `OverridePayloadGenerator`, the service registration will be as follows:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp {hl_lines=[3]}
services
  .AddFiksArkiv()    
  .WithPayloadGenerator<OverridePayloadGenerator>()     
```

#### Override response message processing 

The interface to implement is `IFiksArkivResponseHandler`.

If your implemented class is called `OverrideResponseHandler`, the service registration will be as follows:


{{< code-title >}}
App/Program.cs
{{< /code-title >}}


```csharp {hl_lines=[3]}
services
  .AddFiksArkiv()    
  .WithResponseHandler<OverrideResponseHandler>(); 
```

## Configuration for receiving messages in archive system

As Digdir does not offer the archive system or Fiks Arkiv, we do not have extensive documentation here, but recommend that 
the application developer reference KS Digital's documentation along side the documentation of 
the archive system provider. 

However, as more application owners make use of the integration we have seen a few common pit falls.
These along with solutions are listed below, to be used at your convenience. 

### Create a Fiks Arkiv account
{.floating-bullet-numbers-sibling-ol}
1. For your organization, set up a new system under Fiks Protokoll 
2. Create an account linked to this system

    The account should be configured with the following properties

    | Property          | Value             |
    |-------------------|-------------------|
    | Protokolltype     | no.ks.fiks.arkiv  |
    | Versjon           | v1                |
    | Protokollparter   | arkiv.full        |

3. Please reference archive system documentation on requirements for the encryption key pair.

4. Under the account, navigate to the _Søk etter systemer_ tab and look up the system created to send messages.
Grant this system permission to send messages to the recipient account by clicking _Gi tilgang_.
    <img src="fiks-system-whitelist.png" alt="Screenshot illustrating how to give access to a system from a Fiks account" width="80%">

### Known issues in configuration of Public 360

__The encryption key is not documented__

The maskinporten token uploaded in P360 is used as the private part of the encryption key
the Fiks Arkiv account that receives messages should upload the public part of this certificate
as the encryption key. 


## External documentation 

More on Fiks Arkiv:
- https://developers.fiks.ks.no/felles/integrasjoner/
- https://github.com/ks-no/fiks-arkiv-specification/wiki


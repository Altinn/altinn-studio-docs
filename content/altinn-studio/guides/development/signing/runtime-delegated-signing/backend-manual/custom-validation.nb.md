---
hidden: true
---

Du kan bruke standardvalidatoren som nevnt i punkt 2. Den verifiserer at antall signaturer er minst det som er satt til
`minCount` på feltet i datamodellen. Egendefinert validering kan settes opp ved å implementere `IValidator` eller `ITaskValidator`, som
beskrevet i [Hvordan legge til egendefinert validering](https://docs.altinn.studio/altinn-studio/reference/logic/validation/#server-side-validation).

Et eksempel er en validator som verifiserer at en signatur er gjort på vegne av en organisasjon:

```csharp
public class SigningTaskValidator : IValidator
{
    private readonly IProcessReader _processReader;

    public SigningTaskValidator(IProcessReader processReader)
    {
        _processReader = processReader;
    }

    /// <summary>
    /// Vi implementerer <see cref="ShouldRunForTask"/> i stedet.
    /// </summary>
    public string TaskId => "*";

    /// <summary>
    /// Kjører kun for steg med stegtype "signing".
    /// </summary>
    public bool ShouldRunForTask(string taskId)
    {
        AltinnTaskExtension? taskConfig;
        try
        {
            taskConfig = _processReader.GetAltinnTaskExtension(taskId);
        }
        catch (Exception)
        {
            return false;
        }
        
        return taskConfig?.TaskType == "signing";
    }

    public bool NoIncrementalValidation => true;

    /// <inheritdoc />
    public Task<bool> HasRelevantChanges(IInstanceDataAccessor dataAccessor, string taskId, DataElementChanges changes)
    {
        throw new UnreachableException(
            "HasRelevantChanges should not be called because NoIncrementalValidation is true."
        );
    }

    /// <inheritdoc />
    /// <remarks>Validerer at minst en av signaturene er gjort på vegne av en organisasjon.</remarks>
    public async Task<List<ValidationIssue>> Validate(
        IInstanceDataAccessor instanceDataAccessor,
        string taskId,
        string? language
    )
    {
        AltinnSignatureConfiguration signatureConfiguration =
            (_processReader.GetAltinnTaskExtension(taskId)?.SignatureConfiguration)
            ?? throw new ApplicationConfigException("Signing configuration not found in AltinnTaskExtension");

        string signatureDataTypeId =
            signatureConfiguration.SignatureDataType
            ?? throw new ApplicationConfigException("SignatureDataType is not set in the signature configuration.");

        IEnumerable<DataElement> signatureDataElements = instanceDataAccessor.GetDataElementsForType(
            signatureDataTypeId
        );

        SignDocument[] signDocuments = await Task.WhenAll(
            signatureDataElements.Select(async signatureDataElement =>
            {
                ReadOnlyMemory<byte> data = await instanceDataAccessor.GetBinaryData(signatureDataElement);
                string signDocumentSerialized = Encoding.UTF8.GetString(data.ToArray());

                return JsonSerializer.Deserialize<SignDocument>(signDocumentSerialized)
                    ?? throw new JsonException("Could not deserialize signature document.");
            })
        );

        var organisationHasSigned = signDocuments.Any(doc => doc?.SigneeInfo?.OrganisationNumber is not null);

        if (organisationHasSigned is false)
        {
            return
            [
                new ValidationIssue
                {
                    Code = "SignatureIssues",
                    Severity = ValidationIssueSeverity.Error,
                    Description = "An organisation must sign the document.",
                },
            ];
        }
        return [];
    }
}
```

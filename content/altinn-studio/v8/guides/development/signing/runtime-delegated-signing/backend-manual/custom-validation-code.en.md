---
headless: true
hidden: true
---

```csharp
public class SigningTaskValidator : IValidator
{
  private readonly IProcessReader _processReader;

  public SigningTaskValidator(IProcessReader processReader)
  {
    _processReader = processReader;
  }

  /// <summary>
  /// We implement <see cref="ShouldRunForTask"/> instead.
  /// </summary>
  public string TaskId => "*";

  /// <summary>
  /// Only runs for tasks that are of type "signing".
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
  /// <remarks>Validates that at minimum one signature is done on behalf of an organisation.</remarks>
  public async Task<List<ValidationIssue>> Validate(
    IInstanceDataAccessor instanceDataAccessor,
    string taskId,
    string? language
  )
  {
    AltinnSignatureConfiguration signatureConfiguration =
      _processReader.GetAltinnTaskExtension(taskId)?.SignatureConfiguration
      ?? throw new ApplicationConfigException("Signing configuration not found in AltinnTaskExtension");

    string signatureDataTypeId =
      signatureConfiguration.SignatureDataType
      ?? throw new ApplicationConfigException("SignatureDataType is not set in the signature configuration.");

    DataType signatureDataType = instanceDataAccessor.GetDataType(signatureDataTypeId);

    // Set authentication override for the signature data, since this is a restricted type
    instanceDataAccessor.OverrideAuthenticationMethod(signatureDataType, StorageAuthenticationMethod.ServiceOwner());

    IEnumerable<DataElement> signatureDataElements = instanceDataAccessor.GetDataElementsForType(
      signatureDataType
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
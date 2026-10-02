---
draft: true
headless: true
hidden: true
---

{{< code-title >}}
App/logic/DataWriteHandler.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false, hl_lines=26-33" >}}
public class DataWriteHandler(ISomeTaxService someTaxService) : IDataWriteProcessor
{
  /// <summary>
  /// Appen kjører denne metoden når brukeren lagrer endringer i skjemaet.
  /// </summary>
  public async Task ProcessDataWrite(
    IInstanceDataMutator instanceDataMutator,
    string taskId,
    DataElementChanges changes,
    string? language
  )
  {
    var formChanges = changes.FormDataChanges.FirstOrDefault(x =>
      x.DataType.Id == "dataModel"
    );

    if (formChanges is null)
      return;

    var previousData = formChanges.PreviousFormData as MainDataModel;
    var currentData = formChanges.CurrentFormData as MainDataModel;

    if (currentData is null || currentData.Income.Equals(previousData?.Income))
      return;

    // Brukeren har ikke tilgang til de beskyttede dataene,
    // så appen må lese dem som tjenesteeier.
    var restrictedDataType = instanceDataMutator.GetDataType("restrictedDataModel");
    instanceDataMutator.OverrideAuthenticationMethod(
      restrictedDataType,
      StorageAuthenticationMethod.ServiceOwner()
    );
    var restrictedData = await instanceDataMutator.GetFormData<RestrictedDataModel>(restrictedDataType);

    if (restrictedData is null)
      return;

    var taxRate = await someTaxService.GetTaxRateForHousehold(
      currentData.Income,
      restrictedData.Spouse,
      instanceDataMutator.Instance
    );

    currentData.TaxRate = taxRate.CalculatedRate;
  }
}
{{< /highlight >}}

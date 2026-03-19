---
draft: true
headless: true
hidden: true
---

{{< code-title >}}
App/logic/DataWriteHandler.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false, hl_lines=30-33" >}}
public class DataWriteHandler(
  RestrictedDataHelper restrictedDataHelper,
  ISomeTaxService someTaxService
) : IDataWriteProcessor
{

  /// <summary>
  /// This method will execute when the user updates the income portion of the form
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

    var (restrictedData, _) = await restrictedDataHelper.GetOrCreateData<RestrictedDataModel>(
      "restrictedDataModel",
      instanceDataMutator.Instance
    );

    var taxRate = await someTaxService.GetTaxRateForHousehold(
      currentData.Income,
      restrictedData.Spouse,
      instanceDataMutator.Instance
    );

    currentData.TaxRate = taxRate.CalculatedRate;
  }
}
{{< /highlight >}}

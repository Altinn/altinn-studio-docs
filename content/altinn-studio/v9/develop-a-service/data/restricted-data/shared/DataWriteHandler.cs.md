---
draft: true
headless: true
hidden: true
---

{{< code-title >}}
App/logic/DataWriteHandler.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false, hl_lines=1-2 24-28" >}}
using Altinn.App.Core.Models;
using Altinn.App.Models;

public class DataWriteHandler(ISomeTaxService someTaxService) : IDataWriteProcessor
{
  public async Task ProcessDataWrite(
    IInstanceDataMutator instanceDataMutator,
    string taskId,
    DataElementChanges changes,
    string? language
  )
  {
    var formChanges = changes.FormDataChanges.FirstOrDefault(x => x.DataType.Id == "dataModel");
    if (formChanges is null)
      return;

    var previousData = formChanges.PreviousFormData as MainDataModel;
    var currentData = formChanges.CurrentFormData as MainDataModel;
    if (currentData is null || currentData.Income.Equals(previousData?.Income))
      return;

    var dataType = instanceDataMutator.GetDataType("restrictedDataModel");

    // Read the restricted data type with the service owner token
    instanceDataMutator.OverrideAuthenticationMethod(dataType, StorageAuthenticationMethod.ServiceOwner());
    var restrictedData = await instanceDataMutator.GetFormData<RestrictedDataModel>(dataType);
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

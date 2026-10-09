---
draft: true
headless: true
hidden: true
---

{{< code-title >}}
App/logic/RestrictedDataOnTaskStart.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false, hl_lines=10-11 22-31" >}}
public class RestrictedDataOnTaskStart(ISomeTaxService someTaxService) : IOnTaskStartingHandler
{
  public bool ShouldRunForTask(string taskId) => taskId == "Task_1";

  public async Task<HookResult> Execute(OnTaskStartingContext context)
  {
    var dataMutator = context.InstanceDataMutator;
    var dataType = dataMutator.GetDataType("restrictedDataModel");

    // Read and write the restricted data type with the service owner token
    dataMutator.OverrideAuthenticationMethod(dataType, StorageAuthenticationMethod.ServiceOwner());

    var taxPrefill = await someTaxService.GetTaxPrefillData(dataMutator.Instance);
    var spouse = new Spouse
    {
      Name = taxPrefill.Spouse?.Name,
      NationalIdentityNumber = taxPrefill.Spouse?.NationalIdentityNumber,
      GrossIncome = taxPrefill.Spouse?.Income,
      GrossDebt = taxPrefill.Spouse?.Debt,
    };

    // The hook may run more than once, so update the data element if it already exists
    var restrictedData = await dataMutator.GetFormData<RestrictedDataModel>(dataType);
    if (restrictedData is null)
    {
      dataMutator.AddFormDataElement(dataType, new RestrictedDataModel { Spouse = spouse });
    }
    else
    {
      restrictedData.Spouse = spouse;
    }

    return HookResult.Success();
  }
}
{{< /highlight >}}

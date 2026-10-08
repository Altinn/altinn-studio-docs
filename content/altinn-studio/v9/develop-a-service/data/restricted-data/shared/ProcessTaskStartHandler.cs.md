---
draft: true
headless: true
hidden: true
---

{{< code-title >}}
App/logic/ProcessTaskStartHandler.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false" >}}
public class ProcessTaskStartHandler(ISomeTaxService someTaxService) : IOnTaskStartingHandler
{
  /// <summary>
  /// Runs when the process enters task step "Task_1"
  /// </summary>
  public bool ShouldRunForTask(string taskId) => taskId == "Task_1";

  public async Task<HookResult> Execute(OnTaskStartingContext context)
  {
    var dataMutator = context.InstanceDataMutator;
    var taxPrefill = await someTaxService.GetTaxPrefillData(dataMutator.Instance);
    var spouse = new Spouse
    {
      Name = taxPrefill.Spouse?.Name,
      NationalIdentityNumber = taxPrefill.Spouse?.NationalIdentityNumber,
      GrossIncome = taxPrefill.Spouse?.Income,
      GrossDebt = taxPrefill.Spouse?.Debt,
    };

    // The hook may run more than once, so update the element if it already exists
    var existing = dataMutator.GetDataElementsForType("restrictedDataModel").FirstOrDefault();
    if (existing is null)
    {
      dataMutator.AddFormDataElement("restrictedDataModel", new RestrictedDataModel { Spouse = spouse });
    }
    else
    {
      var restrictedData = (RestrictedDataModel)await dataMutator.GetFormData(existing);
      restrictedData.Spouse = spouse;
    }

    return HookResult.Success();
  }
}
{{< /highlight >}}

---
draft: true
headless: true
hidden: true
---

{{< code-title >}}
App/logic/RestrictedDataTaskStartHandler.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false, hl_lines=5 22-32" >}}
public class RestrictedDataTaskStartHandler(ISomeTaxService someTaxService) : IOnTaskStartingHandler
{
  private const string RestrictedDataTypeId = "restrictedDataModel";

  public bool ShouldRunForTask(string taskId) => taskId == "Task_1";

  public async Task<HookResult> Execute(OnTaskStartingContext context)
  {
    var mutator = context.InstanceDataMutator;
    var taxPrefill = await someTaxService.GetTaxPrefillData(mutator.Instance);

    var spouse = new Spouse
    {
      Name = taxPrefill.Spouse?.Name,
      NationalIdentityNumber = taxPrefill.Spouse?.NationalIdentityNumber,
      GrossIncome = taxPrefill.Spouse?.Income,
      GrossDebt = taxPrefill.Spouse?.Debt,
    };

    // Hooken kan bli kjørt på nytt. Finnes dataelementet allerede, oppdaterer du det
    // i stedet for å opprette et nytt.
    var dataType = mutator.GetDataType(RestrictedDataTypeId);
    var existing = await mutator.GetFormData<RestrictedDataModel>(dataType);

    if (existing is null)
    {
      mutator.AddFormDataElement(dataType, new RestrictedDataModel { Spouse = spouse });
    }
    else
    {
      existing.Spouse = spouse;
    }

    return HookResult.Success();
  }
}
{{< /highlight >}}

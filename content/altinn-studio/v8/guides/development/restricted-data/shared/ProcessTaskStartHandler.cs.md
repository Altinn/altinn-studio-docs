---
headless: true
hidden: true
---

{{< code-title >}}
App/logic/ProcessTaskStartHandler.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false, hl_lines=27-31" >}}
public class ProcessTaskStartHandler(
  RestrictedDataHelper restrictedDataHelper,
  ISomeTaxService someTaxService
) : IProcessTaskStart
{

  /// <summary>
  /// This method will execute when the process enters task step "Task_1"
  /// </summary>
  public async Task Start(string taskId, Instance instance, Dictionary<string, string> prefill)
  {
    if (taskId != "Task_1")
      return;

    var taxPrefill = await someTaxService.GetTaxPrefillData(instance);
    var restrictedData = new RestrictedDataModel
    {
      Spouse = new Spouse
      {
        Name = taxPrefill.Spouse?.Name,
        NationalIdentityNumber = taxPrefill.Spouse?.NationalIdentityNumber,
        GrossIncome = taxPrefill.Spouse?.Income,
        GrossDebt = taxPrefill.Spouse?.Debt,
      }
    };

    await restrictedDataHelper.UpdateOrCreateData(
        restrictedData,
        "restrictedDataModel",
        instance
    );
  }
}
{{< /highlight >}}
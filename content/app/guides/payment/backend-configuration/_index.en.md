---
title: Backend configuration 
description: Set up your backend to handle payment.
weight: 1
---

### 1. Create a data type to store payment information:

This data type is used by the payment step to store information and status about the payment. Put it in `App/config/applicationmetadata.json`'s `dataTypes` array. ID can be set to something else, but it must match the ID entered in `paymentDataType` in the process step, as shown in step 2.

```json
{
    "id": "paymentInformation",
    "allowedContentTypes": [
        "application/json"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```


### 2. Extend the app process with payment step:

A process step and a gateway must be added to `App/config/process/process.bpmn`, as in the example below.

Payment uses three user actions. If the Altinn user interface is used by the app, these will be called automatically when you are in the payment step. If only the API is used, these must be called manually via the `/actions` endpoint.
- `pay`: Initiates the payment, often by making API calls to the payment processor. How to check which payment processor is used is described [here](#3-implement-the-iorderdetailscalculator-interface). Information and status about the initiated payment is stored in a JSON data type specified in the payment process step.
- `confirm`: Called when payment has been completed to drive the process to the next step.
- `reject`: If the end user sees something wrong with the order, the person concerned can press "Back" in the payment step. The payment is then canceled and information about the interrupted payment is deleted. Which process step you are then directed to is specified in a gateway in `process.bpmn`, as exemplified below.

```xml
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_start_t1</bpmn:outgoing>
    </bpmn:startEvent>

    <bpmn:sequenceFlow id="Flow_start_t1" sourceRef="StartEvent_1" targetRef="Task_1" />

    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:incoming>Flow_start_t1</bpmn:incoming>
      <bpmn:incoming>Flow_g1_t1</bpmn:incoming>
      <bpmn:outgoing>Flow_t1_t2</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>data</altinn:taskType>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>

    <bpmn:sequenceFlow id="Flow_t1_t2" sourceRef="Task_1" targetRef="Task_2" />

    <bpmn:task id="Task_2" name="Betaling">
      <bpmn:incoming>Flow_t1_t2</bpmn:incoming>
      <bpmn:outgoing>Flow_t2_g1</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>payment</altinn:taskType>
          <altinn:actions>
            <altinn:action>confirm</altinn:action>
            <altinn:action>pay</altinn:action>
            <altinn:action>reject</altinn:action>
          </altinn:actions>
          <altinn:paymentConfig>
            <altinn:paymentDataType>paymentInformation</altinn:paymentDataType>
          </altinn:paymentConfig>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>

    <bpmn:sequenceFlow id="Flow_t2_g1" sourceRef="Task_2" targetRef="Gateway_1" />

    <bpmn:exclusiveGateway id="Gateway_1">
      <bpmn:incoming>Flow_t2_g1</bpmn:incoming>
      <bpmn:outgoing>Flow_g1_t1</bpmn:outgoing>
      <bpmn:outgoing>Flow_g1_end</bpmn:outgoing>
    </bpmn:exclusiveGateway>

    <bpmn:sequenceFlow id="Flow_g1_t1" sourceRef="Gateway_1" targetRef="Task_1">
      <bpmn:conditionExpression>["equals", ["gatewayAction"], "reject"]</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent_1">
      <bpmn:conditionExpression>["equals", ["gatewayAction"], "confirm"]</bpmn:conditionExpression>
    </bpmn:sequenceFlow>

    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>Flow_g1_end</bpmn:incoming>
    </bpmn:endEvent>
```
The value of this node: `<altinn:paymentDataType>paymentInformation</altinn:paymentDataType>` must match the ID of the data type you configured in the previous step.


### 3. Implement the IOrderDetailsCalculator interface

Add a new class where you have your custom code, for example: `App/logic/OrderDetailsCalculator.cs`.

Here you will implement your logic to calculate what the user will pay for.
For example, you can add order lines based on form data, add mandatory fees, or add a fixed cost for the form.

The return value from the `CalculateOrderDetails` method indicates:
- Payment processor to be used for the order. These are made available by implementing the `IPaymentProcessor` interface and registering them as transient in program.cs. Fill in `Nets Easy' to use the default implementation for Nets Easy.
- Currency
- Order lines
- Details of payment receiver. Used in receipt.

In this example, the order lines are calculated based on form data:

```c#
public class OrderDetailsCalculator : IOrderDetailsCalculator
{
    private readonly IDataClient _dataClient;

    public OrderDetailsCalculator(IDataClient dataClient)
    {
        _dataClient = dataClient;
    }
    
    public async Task<OrderDetails> CalculateOrderDetails(Instance instance, string? language)
    {
        DataElement modelData = instance.Data.Single(x => x.DataType == "model");
        InstanceIdentifier instanceIdentifier = new(instance);
        
        Form formData = (Form) await _dataClient.GetFormData(instanceIdentifier.InstanceGuid, typeof(Form), instance.Org, instance.AppId,
            instanceIdentifier.InstanceOwnerPartyId, new Guid(modelData.Id));

        List<PaymentOrderLine> paymentOrderLines = formData.GoodsAndServicesProperties.Inventory.InventoryProperties
            .Where(x => !string.IsNullOrEmpty(x.NiceClassification) && !string.IsNullOrEmpty(x.GoodsAndServices))
            .Select((x, index) =>
                new PaymentOrderLine
                {
                    Id = index.ToString(), Name = $"{GetLocalizedName(x.Id, language)}", PriceExVat = GetPriceForInventoryItem(x), Quantity = 1, VatPercent = 0M
                })
            .ToList();

        return new OrderDetails { 
          PaymentProcessorId = "Nets Easy", 
          Currency = "NOK", 
          OrderLines = paymentOrderLines, 
          Receiver = GetReceiverDetails()};
    }
}

```

Register IOrderDetailsCalculator implementation in program.cs:
```c#
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register your apps custom service implementations here.
    services.AddTransient<IOrderDetailsCalculator, OrderDetailsCalculator>(); 
}
```


### 4. Add config to appsettings.json:

1. [Get your secret key from nets.](https://developer.nexigroup.com/nexi-checkout/en-EU/docs/access-your-integration-keys/). Make sure you use the test key during development.
2. Add your secret key to keyvault, with the variable name: `NetsPaymentSettings--SecretApiKey`. This way it will override `SecretApiKey` in `appsettings.json`.
3. Add `NetsPaymentSettings` to your `appsettings.json`. Remember to set the correct `baseUrl` in production.
```json
{
  "NetsPaymentSettings": {
    "SecretApiKey": "In keyvault",
    "BaseUrl": "https://test.api.dibspayment.eu/",
    "TermsUrl": "https://www.yourwebsite.com/terms",
    "ShowOrderSummary": true,
    "ShowMerchantName": true
  }
}
```

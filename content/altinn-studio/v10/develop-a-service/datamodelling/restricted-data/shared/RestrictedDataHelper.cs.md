---
draft: false
headless: true
hidden: true
---

{{< code-title >}}
App/logic/RestrictedDataHelper.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false, hl_lines=79 95 116" >}}
/// <summary>
/// Note: The logic in this service assumes a single data element of a given data type.
/// </summary>
public class RestrictedDataHelper(IDataClient dataClient)
{
  /// <summary>
  /// Retrieves an existing data element of the specified type or creates a new one if it doesn't exist.
  /// </summary>
  public async Task<(T data, DataElement element)> GetOrCreateData<T>(
    string dataTypeName,
    Instance instance
  )
    where T : class, new()
  {
    var (instanceId, appId) = GetIdentifiers(instance);
    var dataElement = instance.Data.FirstOrDefault(x => x.DataType == dataTypeName);

    // Create a new data element
    if (dataElement is null)
    {
      var newData = new T();
      dataElement = await CreateDataElement(newData, dataTypeName, instanceId, appId);

      // Track the newly created data element with the instance
      instance.Data.Add(dataElement);

      return (newData, dataElement);
    }

    // Data element already exists, retrieve it
    var existingData = await GetModelData<T>(dataElement, instanceId, appId);

    return (existingData, dataElement);
  }

  /// <summary>
  /// Updates an existing data element of the specified type or creates a new one if it doesn't exist.
  /// </summary>
  public async Task<DataElement> UpdateOrCreateData<T>(
    T data,
    string dataTypeName,
    Instance instance
  )
    where T : class, new()
  {
    var (instanceId, appId) = GetIdentifiers(instance);
    var dataElement = instance.Data.FirstOrDefault(x => x.DataType == dataTypeName);

    // Create a new data element
    if (dataElement is null)
    {
      dataElement = await CreateDataElement(data, dataTypeName, instanceId, appId);

      // Track the newly created data element with the instance
      instance.Data.Add(dataElement);

      return dataElement;
    }

    // Data element already exists, update it
    return await UpdateModelData(data, dataElement, instanceId, appId);
  }

  private async Task<DataElement> CreateDataElement<T>(
    T data,
    string dataTypeName,
    InstanceIdentifier instanceId,
    AppIdentifier appId
  )
    where T : class =>
    await dataClient.InsertFormData(
      data,
      instanceId.InstanceGuid,
      typeof(T),
      appId.Org,
      appId.App,
      instanceId.InstanceOwnerPartyId,
      dataTypeName,
      authenticationMethod: StorageAuthenticationMethod.ServiceOwner()
    );

  private async Task<T> GetModelData<T>(
    DataElement dataElement,
    InstanceIdentifier instanceId,
    AppIdentifier appId
  )
    where T : class =>
    await dataClient.GetFormData(
      instanceId.InstanceGuid,
      typeof(T),
      appId.Org,
      appId.App,
      instanceId.InstanceOwnerPartyId,
      Guid.Parse(dataElement.Id),
      authenticationMethod: StorageAuthenticationMethod.ServiceOwner()
    ) as T
    ?? throw new InvalidCastException(
      $"Data element {dataElement.Id} is not of type {typeof(T)}"
    );

  private async Task<DataElement> UpdateModelData<T>(
    T data,
    DataElement dataElement,
    InstanceIdentifier instanceId,
    AppIdentifier appId
  )
    where T : class =>
    await dataClient.UpdateData(
      data,
      instanceId.InstanceGuid,
      typeof(T),
      appId.Org,
      appId.App,
      instanceId.InstanceOwnerPartyId,
      Guid.Parse(dataElement.Id),
      authenticationMethod: StorageAuthenticationMethod.ServiceOwner()
    );

  private static (InstanceIdentifier instanceId, AppIdentifier appId) GetIdentifiers(
    Instance instance
  ) => (new InstanceIdentifier(instance), new AppIdentifier(instance));
}
{{< /highlight >}}

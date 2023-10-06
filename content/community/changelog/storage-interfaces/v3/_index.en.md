---
title: v3
description: Overview of changes introduced in v3 of the Altinn.Platform.Storage.Interface package.
toc: true
weight: 90
---


## 3.11.0 Extended models with support for marking a data element for automatic deletion
- `DataElement` model has been extended with a new property _deleteStatus_.
- `ApplicationMetadata.AppLogic`  has been extended with a new property _autoDeleteOnProcessEnd_.

## 3.10.0 Extended ApplicationMetadata/AppLogic with _allowAnonymousOnStateless_ property
- The `AppLogic` model has been expanded with a new property `allowAnonymousOnStateless`to specify if data type can be accessed anonymously when used in stateless mode. Default is `false` as before and you need to opt in if you would like to enable anonymous access.

## 3.9.0 Extended EFormidlingContract with _DPFShipmentType_ property
- The `EFormidlingContract` model has been expanded with a new property `DPFShipmentType` to hold the DPF shipment type.
Property is included to make routing easier for receiver, when included in the _Arkivmelding_.

## 3.8.0 Extended ProcessHistoryItem with _performedBy_ property
- The `ProcessHistoryItem` model has been expanded with a new property `performedBy` to hold an identification string
for the entity that triggered the process event. This string can contain organisation number og person identification 
number.
 
## 3.7.0 Extended PlatformUser with national identity number property
- The `PlatformUser` model has been expanded with a new property to hold national identity number.

## 3.6.0 Extended InstanceOwner with username property
- The `InstanceOwner` model has been expanded with a new property to hold username.

## 3.5.0 Added CopyInstanceSettings to Application
- The `Application` model has been expanded with a new property to hold CopyInstanceSettings. 
  This property allows for enabling copying of application and specifies excluded data fields and types.

## 3.4.0 Added MessageBoxConfig to Application

- The `Application` model has been expanded with a new property to hold Message Box configuration.

## 3.3.0 Added Tags to the model DataElement

- The `DataElement` model has been expanded with a new property to hold a list of tags.

## 3.2.0 New model OnEntryConfig

- A new model, `OnEntryConfig` was added to support defining what should happen on entry on the application. The model has been added as a property to Application.

## 3.0.1 New model DataValues

- A new model, `DataValues` was added to support updating data values on the instance.

## 3.0.0 Refactoring and model application/instance model changes

### Breaking changes
- The `PresentationField` class was renamed to `DataField`.
  This was done to make the model more generic as it's being used by the new `DataFields` property on the `Application` model as well as the existing `PresentationFields` property. All properties and the usage off the class remains the same.

### Other changes
- A new property, `DataFields` was added to support data field definitions on the `Application` model and a corresponding `DataValues` property on the `Instance` model to hold the actual values.

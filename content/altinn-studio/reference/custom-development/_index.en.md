---
title: Development
description: Overview of available interfaces for custom code
weight: 25
---

This page provides an overview of all available interfaces that can be implemented to add custom code to Altinn apps. 
The interfaces are organised by functional area and include only interfaces marked with the `[ImplementableByApps]` attribute.

**See also:** [How to implement custom code](/en/altinn-studio/guides/development/custom-code/) - step-by-step guide to get started.

## Code lists and options

### IAppOptionsProvider
Implement this interface to create open code lists that are generated dynamically at runtime.

**Use cases:**
- Code lists fetched from external sources
- Code lists that do not contain sensitive data
- Static code lists that are generated programmatically

**Documentation:** [Dynamic code lists](/en/altinn-studio/guides/development/options/sources/dynamic/)

### IInstanceAppOptionsProvider
Implement this interface to create secured code lists that require access to the instance.

**Use cases:**
- Code lists with sensitive or personal data
- Code lists that vary based on the user's permissions
- Code lists that require instance context

**Documentation:** [Dynamic code lists](/en/altinn-studio/guides/development/options/sources/dynamic/)

## Data handling

### IDataProcessor
Implement this interface to process data during saving and loading.

**Use cases:**
- Automatic calculations when data is saved
- Copying values between fields
- Formatting and transforming data
- Calls to external services when data changes

**Documentation:** [Data processing](/en/altinn-studio/reference/logic/dataprocessing/)

### IDataWriteProcessor
Implement this interface for specialised handling of data writing.

**Use cases:**
- Custom logic for data storage
- Integration with external storage systems
- Complex data validation before saving

## Validation

### ITaskValidator
Implement this interface to validate specific tasks in the process.

**Use cases:**
- Task-specific validation
- Validation of states during task transitions
- Conditional validation based on task type

**Documentation:** [Validation](/en/altinn-studio/reference/logic/validation/)

### IDataElementValidator
Implement this interface to validate individual data elements.

**Use cases:**
- Specialised validation of specific data types
- Validation of attachments or files
- Element-specific business rules

**Documentation:** [Validation](/en/altinn-studio/reference/logic/validation/)

### IFormDataValidator
Implement this interface to validate form data.

**Use cases:**
- Complex validation of form content
- Cross-field validation
- Dynamic validation based on form status

**Documentation:** [Validation](/en/altinn-studio/reference/logic/validation/)

### IInstantiationValidator
Implement this interface to validate whether a user can start a new instance.

**Use cases:**
- Access control beyond standard authorisation
- Time-based restrictions
- Validation against external systems at startup

**Documentation:** [Instantiation](/en/altinn-studio/reference/logic/instantiation/)

### IValidateQueryParamPrefill
Implement this interface to validate pre-population via query parameters.

**Use cases:**
- Validation of data sent via URL parameters
- Securing pre-population data
- Control of allowed values from external sources

## Processing and lifecycle

### IInstantiationProcessor
Implement this interface to handle processing during instantiation.

**Use cases:**
- Pre-populating data at startup
- Initialising external systems
- Setting up instance-specific configurations

**Documentation:** [Instantiation](/en/altinn-studio/reference/logic/instantiation/)

### IProcessTaskStart
Implement this interface to handle the start of process tasks.

**Use cases:**
- Logic that should run when a task starts
- Initialising task-specific state
- Integration with external systems at task start

### IProcessTaskEnd
Implement this interface to handle the completion of process tasks.

**Use cases:**
- Cleanup logic at task completion
- Saving intermediate results
- Reporting to external systems

### IProcessEnd
Implement this interface to handle the completion of the entire process.

**Use cases:**
- Final processing of data
- Archiving and reporting
- Resource cleanup

### IProcessTaskAbandon
Implement this interface to handle abandoned tasks.

**Use cases:**
- Cleanup when tasks are abandoned
- Logging of abandoned processes
- Handling partially completed tasks

### IProcessExclusiveGateway
{{<notice warning>}}
NOTE! One of the methods in this interface is obsolete. Use the newer version of `FilterAsync` that includes the `IInstanceDataAccessor` parameter.
{{</notice>}}

Implement this interface to handle conditional process transitions.

**Use cases:**
- Dynamic process flow based on data
- Process branching based on business logic
- Conditional routing between tasks

## User actions

### IUserAction
Implement this interface to define custom user actions.

**Use cases:**
- Custom buttons in the user interface
- Specialised actions not covered by standard functionality
- Integration with external services from the user interface

**Documentation:** [Server actions](/en/altinn-studio/reference/process/actions/serveraction/)

### IUserActionAuthorizer
Implement this interface to authorise user actions.

**Use cases:**
- Access control for custom actions
- Conditional access based on user roles
- Dynamic authorisation based on data or state

## Events

### IEventHandler
Implement this interface to handle application events.

**Use cases:**
- Response to system or user actions
- Integration with event-driven architectures
- Logging and monitoring of application activity

**Documentation:** [Events](/en/altinn-studio/reference/logic/events/)

## Other interfaces

### IValidator
General validation interface for custom validations.

**Use cases:**
- Basis for specialised validators
- General validation that doesn't fit other categories
- Flexible validation with custom rules

---

## Obsolete interfaces (deprecated)

The following interfaces are marked as obsolete and should not be used in new implementations:

### IInstanceValidator [OBSOLETE]
{{<notice warning>}}
NOTE! This interface is obsolete. Use `ITaskValidator`, `IDataElementValidator`, or `IFormDataValidator` for specific validation instead.
{{</notice>}}

Implement this interface to validate entire app instances.

**Replacement:** Use `ITaskValidator` for task validation, `IDataElementValidator` for data elements, or `IFormDataValidator` for form data.

### IPageOrder [OBSOLETE]
{{<notice warning>}}
NOTE! This interface is obsolete from frontend version 4 onwards. Use [dynamic expressions](../logic/expressions/) instead to control whether pages are shown/hidden.
{{</notice>}}

Implement this interface to control the order of pages in the form.

**Replacement:** Use [dynamic expressions](../logic/expressions/) for conditional display of pages.

### IPdfFormatter [OBSOLETE]
{{<notice warning>}}
NOTE! This interface is obsolete and will be removed in future versions. It was used for the old PDF generator and is now only used for backwards compatibility. Create a custom PDF layout instead.
{{</notice>}}

Implement this interface to customise PDF generation.

**Replacement:** Create custom PDF layouts instead of using this interface.
---
title: Custom code
description: When and why you might need to add custom code to your app
weight: 40
---

Whilst Altinn Studio enables you to build many apps without writing code, there are situations where custom code is necessary to meet your specific requirements. This article describes the most common scenarios where you will need to add custom code to your app.

## When do you need custom code?

### At service startup (instantiation)

When a user starts a new instance of your app, you may need to:

- **Validate whether the user is allowed to start the service** - for example based on time, user type, or other business rules beyond the access rules set in the app.
- **Pre-populate the form with data** - fetch information from external sources or based on the user's profile.
- **Set up specific configurations** - customise the app based on who is starting it.

**Example:** An application service that can only be started by organisations within specific industries, or that must be pre-populated with information from your own systems.

### When loading and/or changing data

During form completion, it may be necessary to:

- **Calculate values automatically** - for example sum numbers, calculate percentages, or calculate fees based on what the user fills in.
- **Transfer values between fields** - copy or transform data from one field to another.
- **Fetch data from external sources** - look up information based on what the user fills in.
- **Validate complex business rules** - check relationships between multiple fields or against external systems.

**Example:** An accounting form that automatically calculates VAT and totals when the user enters amounts, or a person field that fetches extended data from the national register.

### When the workflow moves to the next step

During transitions between process steps, you may need to:

- **Perform complex validation** - check that all necessary data is completed correctly and consistently
- **Call external services** - send data to other systems or fetch additional information
- **Update the data model** - add metadata or status that is not visible to the user
- **Control access** - check whether the user is allowed to proceed based on business logic

**Example:** An approval flow where the system must check against an external register before the case can be sent for processing.

### When the user presses custom action buttons

To give users access to specialised functions, you can create custom buttons that:

- **Fetch and display additional data** - for example a "Fetch balance" button that shows updated account information
- **Start external processes** - perform actions in other systems without leaving the app
- **Calculate complex values** - run advanced calculations based on the user's input
- **Validate specific information** - check the validity of ID numbers, account numbers, or similar

**Example:** A "Validate organisation number" button that looks up information in the Brønnøysund registers and displays information about the organisation.

### When the app loads dynamic code lists

To offer users relevant choices, you may need to:

- **Filter choices based on previous input** - show only municipalities in the selected county
- **Fetch updated data from external sources** - ensure that code lists are always up to date
- **Customise choices based on the user's context** - show different alternatives for private individuals and businesses
- **Secure sensitive code lists** - control that the user has access to see specific choices

**Example:** A dropdown for "select doctor" that only shows doctors connected to the selected medical centre, or a code list of available services that is updated in real-time.

## What can you achieve with custom code?

Custom code enables you to:

- **Integrate with external systems** - fetch and send data to other public registers or private systems
- **Implement complex business rules** - handle logic that goes beyond standard validation
- **Optimise user experience** - automate tasks and reduce manual completion
- **Ensure data quality** - validate and correct data during the process
- **Customise functionality** - create specialised solutions for your use case

## Further reading

To learn how to implement custom code, see the following documentation for examples:

- [Instantiation](/en/altinn-studio/reference/logic/instantiation/) - validations and pre-population at startup
- [Data processing](/en/altinn-studio/reference/logic/dataprocessing/) - calculations and data manipulation
- [Validation](/en/altinn-studio/reference/logic/validation/) - custom validation rules
- [Process actions](/en/altinn-studio/reference/process/actions/) - custom buttons and actions
- [Dynamic code lists](/en/altinn-studio/guides/development/options/sources/dynamic/) - code lists generated at runtime


Also see [overview of all available interfaces that can be implemented](/en/altinn-studio/reference/custom-development).

## Considerations before you start

Before you begin with custom code, you should consider:

- **Is it really necessary?** - can the requirement be solved with existing functionality in Altinn Studio?
- **Complexity vs. benefit** - will the code make the solution significantly more complex than necessary?
- **Maintenance** - who will maintain the code over time?
- **Testing** - how will you ensure that the code works as expected?
- **Performance** - will the code negatively affect the app's responsiveness?

With proper planning and implementation, custom code can make your app more powerful and user-friendly, whilst handling the specific requirements of your use case.
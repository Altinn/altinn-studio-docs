---
title: Testing authorization rules
linktitle: Testing
description: Testing authorization rules is important before going to production to verify that the chosen rules work as intended and provide a secure and user-friendly experience
---
{{%notice warning%}}
Errors in authorization rules or choosing an inappropriate role for one or more workflow steps can, in the worst case, result in unauthorized 
users gaining access to data they should not have.  
This can have serious consequences for the actor and will be considered a security breach. 
{{% /notice%}}

## What must be tested?

When testing, it is important to perform both positive and negative tests, i.e., verifying that intended users gain access and that others do NOT gain access.  

Below we have created a list of test situations that an application developer should create test scenarios for and verify.  
We recommend automating these tests in the same way as other app testing.  

- Verify that the intended external roles can perform the various steps in the process and have access to the necessary data to do so  
- Verify that other external roles do NOT gain access to perform the various steps in the process or to the necessary data  
- Verify that users delegated Altinn roles linked to the application can perform the various steps in the process and access the necessary data  
- Verify that the application appears in the list of delegable services and that it is possible to delegate access only to the application without role delegation, see [here](https://www.altinn.no/hjelp/profil/roller-og-rettigheter/gi-roller-eller-rettighet-via-sokefunksjon/)  
- Verify that a user with too low a security level cannot gain access without raising the login security level  

## Documentation of manual testing
To ensure sufficient quality in testing authorization rules, a systematic approach is required, documenting the testing with detailed test scripts.  
In case of errors during testing or later, it is important to have good control over which users and actors were used and which steps in the work process were verified.  

## Test data
It is possible to use [test data from Tenor](https://www.skatteetaten.no/skjema/testdata/) in Altinn to find users with the correct roles for the correct actors.  

Sometimes it may be challenging to find test data that covers the desired test scenarios depending on the types of actors used (e.g., certain organizational forms) or when “unusual” external roles are used.  
Contact Altinn if you cannot find suitable test data, and we can load test users and actors tailored to your needs.  

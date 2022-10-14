---
title: Profile
description: The Profile component gives profile information for users in Altinn.
tags: [platform, profile]
---

The profile component is an ASP.Net Core MVC Application exposing REST-API to Altinn Apps.

The profile solution is now available locally at http://platform.altinn.cloud/profile/api/v1 and all resources are avaiable through endpoints defined below.

Resources: users

## /users
A user is the entity which is logged in in Altinn and performs actions for on behalf of an instance owner.

### User type
| Attribute | Type | Description |
| --------- | ---- | ----------- |
| UserId | int | user ID |
| UserName | string | username set by the user|
| PhoneNumber | string | phone number |
| Email | string  | email address|
| PartyId | int | party ID |
| [Party](https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/ServiceLibrary/Models/Party.cs) | Party  | party object that represents the user |
| [UserType](https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/ServiceLibrary/Enums/UserType.cs)  | UserType | user type |
| [ProfileSettingPreference](https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/ServiceLibrary/Models/ProfileSettingPreference.cs) |  ProfileSettingPreference |  object containing the users profile setting preferences |

### Operations
Get information about a user from user id:

```http
GET /users/{userId}
```

Get information about a user from SSN. Send a POST request with the SSN contained in the request body.

```http
POST /users
```
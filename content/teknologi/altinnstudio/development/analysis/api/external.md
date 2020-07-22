---
title: External APIs - analysis
linktitle: External APIs
description: An analysis of the SBL external API forward compatibility with Altinn Studio Apps.
---

[#956](https://github.com/Altinn/altinn-studio/issues/956)

An analysis of the **SBL** external API forward compatibility with Altinn Studio Apps.

## Legend

Icon               | Status
------------------ | ----------------------------------------------------------------------------------
:white_check_mark: | No changes needed, will work as before.
:1234:             | Needs to handle ServiceCode / ServiceEditionCode.
:id:               | Identifiers will change.
:alien:            | Not part of the Altinn Studio concept, so this API can't be used.
:no_entry:         | Not relevant or will be replaced by something better.


## REST

### Token

#### :white_check_mark: POST authorization/token/{authCode}/loguse
[🛈](https://www.altinn.no/api/Help/Api/POST-authorization-token-authCode-loguse "API help")

#### :white_check_mark: GET authorization/token/{authCode}
[🛈](https://www.altinn.no/api/Help/Api/GET-authorization-token-authCode "API help")

#### :white_check_mark: DELETE authorization/token/{authCode}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-authorization-token-authCode "API help")

---

### RoleDefinitions

#### :1234: GET {who}/authorization/RoleDefinitions/{roleTypeID}?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-RoleDefinitions-roleTypeID_language "API help")
ServiceCode/ServiceEditionCode is part of Rights-list.

#### :white_check_mark: DELETE {who}/authorization/RoleDefinitions/{roleTypeID}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-RoleDefinitions-roleTypeID "API help")

#### :1234: PUT {who}/authorization/RoleDefinitions/{roleTypeID}?language={language}
[🛈](https://www.altinn.no/api/Help/Api/PUT-who-authorization-RoleDefinitions-roleTypeID_language "API help")
ServiceCode/ServiceEditionCode is part of Rights-list.

#### :1234: GET {who}/authorization/RoleDefinitions?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-RoleDefinitions_language "API help")
ServiceCode/ServiceEditionCode is part of Rights-list.

#### :1234: POST {who}/authorization/RoleDefinitions?language={language}
[🛈](https://www.altinn.no/api/Help/Api/POST-who-authorization-RoleDefinitions_language "API help")
ServiceCode/ServiceEditionCode is part of Rights-list.

---

### Rights

#### :1234: GET {who}/authorization/rights
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-rights "API help")
ServiceCode/ServiceEditionCode is part of Rights-list.

#### :white_check_mark: DELETE {who}/authorization/rights/{rightID}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-rights-rightID "API help")

#### :white_check_mark: DELETE {who}/authorization/Rights/{receiverId}/rights/{authzRuleID}?rightID={rightID}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-Rights-receiverId-rights-authzRuleID_rightID "API help")

---

### Roles

#### :white_check_mark: GET {who}/authorization/roles?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-roles_language "API help")

#### :white_check_mark: DELETE {who}/authorization/roles/{roleID}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-roles-roleID "API help")

---

### Reportee

#### :white_check_mark: GET reportees?showConsentReportees={showConsentReportees}&includeInactiveReportees={includeInactiveReportees}
[🛈](https://www.altinn.no/api/Help/Api/GET-reportees_showConsentReportees_includeInactiveReportees "API help")

#### :white_check_mark: GET reportees/{reporteeId}
[🛈](https://www.altinn.no/api/Help/Api/GET-reportees-reporteeId "API help")

#### :1234: GET reportees?serviceCode={serviceCode}&serviceEdition={serviceEdition}&showConsentReportees={showConsentReportees}
[🛈](https://www.altinn.no/api/Help/Api/GET-reportees_serviceCode_serviceEdition_showConsentReportees "API help")
ServiceCode/ServiceEditionCode is part of the input parameters.

#### :white_check_mark: GET {who}/authorization/Reportee/{receiverId}?reporteeId={reporteeId}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-Reportee-receiverId_reporteeId "API help")

---

### Authentication

#### :white_check_mark: POST authentication/authenticatewithpassword
[🛈](https://www.altinn.no/api/Help/Api/POST-authentication-authenticatewithpassword "API help")

---

### Profile

#### :white_check_mark: GET my/profile
[🛈](https://www.altinn.no/api/Help/Api/GET-my-profile "API help")

#### :white_check_mark: GET {orgno}/profile
[🛈](https://www.altinn.no/api/Help/Api/GET-orgno-profile "API help")

#### :white_check_mark: GET {orgno}/profile/contactinformation
[🛈](https://www.altinn.no/api/Help/Api/GET-orgno-profile-contactinformation "API help")

#### :white_check_mark: POST {orgno}/profile/contactinformation
[🛈](https://www.altinn.no/api/Help/Api/POST-orgno-profile-contactinformation "API help")

#### :white_check_mark: GET {orgno}/profile/contactinformation/{id}
[🛈](https://www.altinn.no/api/Help/Api/GET-orgno-profile-contactinformation-id "API help")

#### :white_check_mark: DELETE {orgno}/profile/contactinformation/{id}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-orgno-profile-contactinformation-id "API help")

---

### LookUp

#### :1234: :alien: GET {who}/lookup/{serviceCode}/{serviceEdition}?authorizationCode={authorizationCode}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-lookup-serviceCode-serviceEdition_authorizationCode "API help")
"LookUp" is not a concept in Altinn Studio, since all apps can provide APIs directly themselves. This API can't be used.
Also, ServiceCode/ServiceEditionCode is part of the input parameters.

---

### Metadata

#### :1234: GET metadata?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-metadata_language "API help")
ServiceCode/ServiceEditionCode is part of metadata-list.

#### :white_check_mark: GET metadata/correspondence/{serviceCode}/{serviceEditionCode}?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-metadata-correspondence-serviceCode-serviceEditionCode_language "API help")
"Correspondence" will live on, so this API is not relevant for Altinn Studio.

#### :1234: :alien: GET metadata/formtask/{serviceCode}/{serviceEditionCode}?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-metadata-formtask-serviceCode-serviceEditionCode_language "API help")
"FormTask" is not a concept in Altinn Studio, since all apps can provide forms. This API can't be used.
Also, ServiceCode/ServiceEditionCode is part of input parameters and the returned metadata-list.

#### :1234: :alien: GET metadata/lookup/{serviceCode}/{serviceEditionCode}?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-metadata-lookup-serviceCode-serviceEditionCode_language "API help")
"LookUp" is not a concept in Altinn Studio, since all apps can provide APIs directly themselves. This API can't be used.
Also, ServiceCode/ServiceEditionCode is part of input parameters and the returned metadata-list.

#### :1234: :alien: GET metadata/formtask/{serviceCode}/{serviceEditionCode}/forms/{dataFormatId}/{dataFormatVersion}/xsd
[🛈](https://www.altinn.no/api/Help/Api/GET-metadata-formtask-serviceCode-serviceEditionCode-forms-dataFormatId-dataFormatVersion-xsd "API help")
"FormTask" is not a concept in Altinn Studio, since all apps can provide forms and data models. This API can't be used.
Also, ServiceCode/ServiceEditionCode is part of input parameters.

#### :1234: :alien: GET metadata/lookup/{serviceCode}/{serviceEditionCode}/schemas/{schema}
[🛈](https://www.altinn.no/api/Help/Api/GET-metadata-lookup-serviceCode-serviceEditionCode-schemas-schema "API help")
"LookUp" is not a concept in Altinn Studio, since all apps can provide APIs directly themselves. This API can't be used.
Also, ServiceCode/ServiceEditionCode is part of input parameters.

#### :1234: :alien: GET metadata/formtask/{serviceCode}/{serviceEditionCode}/attachmentrules/{ruleId}/xsd
[🛈](https://www.altinn.no/api/Help/Api/GET-metadata-formtask-serviceCode-serviceEditionCode-attachmentrules-ruleId-xsd "API help")
"FormTask" is not a concept in Altinn Studio, since all apps can provide metadata and data models (XSDs). This API can't be used.
Also, ServiceCode/ServiceEditionCode is part of input parameters.

#### :no_entry: GET metadata/codelists?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-metadata-codelists_language "API help")
Altinn Studio will provide a better solution (and APIs) for code lists.

#### :no_entry: GET metadata/codelists/{name}/{version}?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-metadata-codelists-name-version_language "API help")
Altinn Studio will provide a better solution (and APIs) for code lists.

---

### Organizations

#### :white_check_mark: GET s?showConsentReportees={showConsentReportees}&includeInactiveReportees={includeInactiveReportees}
[🛈](https://www.altinn.no/api/Help/Api/GET-organizations_showConsentReportees_includeInactiveReportees "API help")

#### :white_check_mark: GET organizations/{organizationId}
[🛈](https://www.altinn.no/api/Help/Api/GET-organizations-organizationId "API help")

---

### Attachments

#### :id: POST {who}/messages/{messageId}/attachments/streamedattachment?fileName={fileName}&attachmentType={attachmentType}&language={language}
[🛈](https://www.altinn.no/api/Help/Api/POST-who-messages-messageId-attachments-streamedattachment_fileName_attachmentType_language "API help")
MessageId will probably change to GUID.

#### :id: DELETE {who}/messages/{messageId}/attachments/{attachmentId}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-messages-messageId-attachments-attachmentId "API help")
MessageId and attachmentId will probably change to GUID.

#### :id: POST {who}/messages/{messageId}/attachments/{attachmentId}?language={language}
[🛈](https://www.altinn.no/api/Help/Api/POST-who-messages-messageId-attachments-attachmentId_language "API help")
MessageId and attachmentId will probably change to GUID.

#### :id: POST {who}/messages/{messageId}/attachments/{attachmentId}?fileName={fileName}&attachmentType={attachmentType}&language={language}
[🛈](https://www.altinn.no/api/Help/Api/POST-who-messages-messageId-attachments-attachmentId_fileName_attachmentType_language "API help")
MessageId and attachmentId will probably change to GUID.

#### :id: GET {who}/messages/{messageId}/attachments
[🛈](https://www.altinn.no/api/Help/Api/GET-who-messages-messageId-attachments "API help")
MessageId will probably change to GUID.

#### :id: POST {who}/messages/{messageId}/attachments?language={language}
[🛈](https://www.altinn.no/api/Help/Api/POST-who-messages-messageId-attachments_language "API help")
MessageId will probably change to GUID.

#### :id: GET {who}/authorization/Attachments/{receiverId}?messageId={messageId}&attachmentId={attachmentId}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-Attachments-receiverId_messageId_attachmentId "API help")
MessageId and attachmentId will probably change to GUID.

---

### Messages

#### :id: :1234: GET {who}/Messages/{messageId}?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-Messages-messageId_language "API help")
MessageId will probably change to GUID.
Message contains ServiceCode/ServiceEditionCode.

#### :id: :1234: :alien: PUT {who}/Messages/{messageId}?language={language}&complete={complete}&sign={sign}
[🛈](https://www.altinn.no/api/Help/Api/PUT-who-Messages-messageId_language_complete_sign "API help")
MessageId will probably change to GUID.
Message contains ServiceCode/ServiceEditionCode.  
MainForm/SubForm is not part of Altinn Studio concept. Same with DataFormatId/DataFormatVersion.

#### :id: DELETE {who}/Messages/{messageId}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-Messages-messageId "API help")
MessageId will probably change to GUID.

#### :id: :1234: GET {who}/Messages?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-Messages_language "API help")
MessageId will probably change to GUID.
Message contains ServiceCode/ServiceEditionCode. 

#### :1234: :alien: POST {who}/Messages?language={language}&complete={complete}&sign={sign}
[🛈](https://www.altinn.no/api/Help/Api/POST-who-Messages_language_complete_sign "API help")
Message contains ServiceCode/ServiceEditionCode.  
MainForm/SubForm is not part of Altinn Studio concept. Same with DataFormatId/DataFormatVersion.

#### :id: :alien: GET {who}/Messages/{messageId}/Print?language={language}&dataFormatId={dataFormatId}&dataFormatVersion={dataFormatVersion}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-Messages-messageId-Print_language_dataFormatId_dataFormatVersion "API help")
MessageId will probably change to GUID.  
DataFormatId/DataFormatVersion is not part of Altinn Studio concept.

#### :white_check_mark: PUT {who}/Messages/{messageId}/Archive?language={language}
[🛈](https://www.altinn.no/api/Help/Api/PUT-who-Messages-messageId-Archive_language "API help")

#### :white_check_mark: PUT {who}/Messages/{messageId}/Confirm?language={language}
[🛈](https://www.altinn.no/api/Help/Api/PUT-who-Messages-messageId-Confirm_language "API help")

#### :id: GET {who}/Messages/{messageId}/Validate?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-Messages-messageId-Validate_language "API help")
MessageId will probably change to GUID.

#### :id: :alien: GET {who}/Messages/{messageId}/signingtext?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-Messages-messageId-signingtext_language "API help")
MessageId will probably change to GUID.  
Workflow metadata must be much more powerful and less hardcoded for Altinn Studio.

#### :id: :alien: GET {who}/messages/{messageId}/custommessagedata
[🛈](https://www.altinn.no/api/Help/Api/GET-who-messages-messageId-custommessagedata "API help")
MessageId will probably change to GUID.  
Workflow metadata must be much more powerful and less hardcoded for Altinn Studio.

#### :1234: GET {who}/Messages/trashbin?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-Messages-trashbin_language "API help")
Message contains ServiceCode/ServiceEditionCode.

---

### Forms

#### :id: :alien: GET {who}/messages/{messageId}/forms?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-messages-messageId-forms_language "API help")
MessageId will probably change to GUID.  
DataFormatId/DataFormatVersion and MainForm/SubForm is not part of Altinn Studio concept.

#### :id: :alien: POST {who}/messages/{messageId}/forms
[🛈](https://www.altinn.no/api/Help/Api/POST-who-messages-messageId-forms "API help")
MessageId will probably change to GUID.  
DataFormatId/DataFormatVersion and MainForm/SubForm is not part of Altinn Studio concept.

#### :id: :alien: GET {who}/messages/{messageId}/forms/{formId}?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-messages-messageId-forms-formId_language "API help")
MessageId and formId will probably change to GUID.  
DataFormatId/DataFormatVersion and MainForm/SubForm is not part of Altinn Studio concept.

#### :id: :alien: PUT {who}/messages/{messageId}/forms/{formId}
[🛈](https://www.altinn.no/api/Help/Api/PUT-who-messages-messageId-forms-formId "API help")
MessageId and formId will probably change to GUID.  
DataFormatId/DataFormatVersion and MainForm/SubForm is not part of Altinn Studio concept.

#### :id: DELETE {who}/messages/{messageId}/forms/{formId}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-messages-messageId-forms-formId "API help")
MessageId and formId will probably change to GUID.

#### :id: GET {who}/messages/{messageId}/forms/{formId}/formdata?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-messages-messageId-forms-formId-formdata_language "API help")
MessageId and formId will probably change to GUID.

---

### Delegations

#### :1234: GET {who}/authorization/Delegations/{receiverId}/rights
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-Delegations-receiverId-rights "API help")
ServiceCode/ServiceEditionCode is part of Rights-list.

#### :white_check_mark: GET {who}/authorization/Delegations/{receiverId}/roles?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-Delegations-receiverId-roles_language "API help")

#### :1234: GET {who}/authorization/Delegations/{receiverId}?language={language}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-Delegations-receiverId_language "API help")
ServiceCode/ServiceEditionCode is part of Rights-list.

#### :1234: GET {who}/authorization/Delegations?serviceCode={serviceCode}&serviceEdition={serviceEdition}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-Delegations_serviceCode_serviceEdition "API help")
ServiceCode/ServiceEditionCode is part of input parameters and the returned rights-list.

#### :1234: POST {who}/authorization/Delegations
[🛈](https://www.altinn.no/api/Help/Api/POST-who-authorization-Delegations "API help")
ServiceCode/ServiceEditionCode is part of Rights-list.

#### :1234: GET {who}/authorization/Delegations?receiverId={receiverId}
[🛈](https://www.altinn.no/api/Help/Api/GET-who-authorization-Delegations_receiverId "API help")
ServiceCode/ServiceEditionCode is part of Rights-list.

#### :white_check_mark: DELETE {who}/authorization/Delegations?receiverId={receiverId}&roleId={roleId}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-Delegations_receiverId_roleId "API help")

#### :white_check_mark: DELETE {who}/authorization/Delegations?receiverId={receiverId}&authzRuleId={authzRuleId}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-Delegations_receiverId_authzRuleId "API help")

#### :white_check_mark: DELETE {who}/authorization/Delegations/{receiverId}/roles/{roleId}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-Delegations-receiverId-roles-roleId "API help")

#### :white_check_mark: DELETE {who}/authorization/Delegations/{receiverId}/rights/{authzRuleId}
[🛈](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-Delegations-receiverId-rights-authzRuleId "API help")

---

### BrokerService

#### :white_check_mark: GET {reportee}/BrokerService/files/{fileReference}
[🛈](https://www.altinn.no/api/Help/Api/GET-reportee-BrokerService-files-fileReference "API help")


## Web Services

TODO
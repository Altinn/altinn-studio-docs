---
title: Access Groups
linktitle: Access Groups
description: Access groups 
tags: [architecture, security, authorization, xacml]
---

WORK IN PROGRESS - NOT FINALIZED

Access registry contains information about the sentral defined access groups. 

See [Github #25](https://github.com/Altinn/altinn-authorization/issues/25)

### AccessGroup defintion

- Type of group. Leaf or branch?
- Name of group in different languges
- AccessGroup identifier

### AccessGroup relationship

- Parent/child relantiship between AccessGroups
- Relationship for external roles (ER, AA, 
  
### AccessGroup Membership

- MembershipID
- CoveredBy UserId
- Covered
- OfferedByParty
- AccessGroupId
- ValidTo?

### AccessGroup Delegation

- DelegatedByParty
- DelegatedByUserId
- DelegationType
- DelegatetDateTime

### AccessGroup History

- DelegatedBy
- AccessGroupID
- OfferedBy
- CoveredByUserId
- CoveredByPartyId
- ChangeType (created, deleted)

### 


![Hierar](dbmodel.drawio.svg "Db model")


![Hierar](hierchy.drawio.svg "Db model")


The accessgroupes in 3.0 will replace roles in Altinn 2. 
[Here](type-accessgroups) is a list of accessgroups that will be used. 



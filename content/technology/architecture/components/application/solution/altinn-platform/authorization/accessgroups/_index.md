---
title: Access Groups
linktitle: Access Groups
description: The Access Groups components is responsible for keeping track of membership of different Access Groups defined in Altinn. 
tags: [architecture, security, authorization, xacml]
---

{{<notice warning>}}
This is work in progress
{{</notice>}}

Access registry contains information about the sentrally [defined access groups](https://github.com/altinn/docs/blob/master/content/utviklingsguider/styring-av-tilgang/for-tjenesteeier/forslag-tilgangsgrupper.md). 

See [Github #25](https://github.com/Altinn/altinn-authorization/issues/25)

## Data model

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


## API

See details of API in [Github issue 25](https://github.com/Altinn/altinn-authorization/issues/25)



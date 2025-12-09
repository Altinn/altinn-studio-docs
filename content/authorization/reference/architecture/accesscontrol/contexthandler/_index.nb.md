---
title: Konteksthåndterer
linktitle: Konteksthåndterer
description: Konteksthåndterer har ansvar for å berike en beslutningsforespørsel sendt fra en PEP slik at PDP kan evaluere den.
tags: [architecture, security, authorization, xacml]
weight: 1
---

Som eksempel kan en beslutningsforespørsel bare inneholde userId og instanceId sammen med ønsket handling.

```xml {linenos=false,hl_lines=[5,10,15]}
<?xml version="1.0" encoding="utf-8"?>
<Request xsi:schemaLocation="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17 http://docs.oasis-open.org/xacml/3.0/xacml-core-v3-schema-wd-17.xsd" ReturnPolicyIdList="false" CombinedDecision="false" xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Attributes Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject">
    <Attribute IncludeInResult="false" AttributeId="urn:altinn:user-id">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">15468</AttributeValue>
    </Attribute>
  </Attributes>
  <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource">
    <Attribute IncludeInResult="false" AttributeId="urn:altinn:instance-id">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">cbdc7b44-9442-4fe0-854b-da278bf0b0e</AttributeValue>
    </Attribute>
  </Attributes>
  <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
    <Attribute IncludeInResult="false" AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Read</AttributeValue>
    </Attribute>
  </Attributes>
  <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:environment" />
</Request>
```

Den berikede beslutningsforespørselen inneholder alle nødvendige attributter for subjekt og ressurs slik at PDP kan identifisere riktig policy og evaluere forespørselen basert på denne.

```xml {linenos=false,hl_lines=[3,12,29]}
<?xml version="1.0" encoding="utf-8"?>
<Request xsi:schemaLocation="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17 http://docs.oasis-open.org/xacml/3.0/xacml-core-v3-schema-wd-17.xsd" ReturnPolicyIdList="false" CombinedDecision="false" xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Attributes Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject">
    <Attribute IncludeInResult="false" AttributeId="urn:altinn:user-id">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">1</AttributeValue>
    </Attribute>
    <Attribute IncludeInResult="false" AttributeId="urn:altinn:rolecode">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</AttributeValue>
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">REGNA</AttributeValue>
    </Attribute>
  </Attributes>
  <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource">
    <Attribute IncludeInResult="false" AttributeId="urn:altinn:instance-id">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">cbdc7b44-9442-4fe0-854b-da278bf0b0e</AttributeValue>
    </Attribute>
    <Attribute IncludeInResult="false" AttributeId="urn:altinn:org">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">SKD</AttributeValue>
    </Attribute>
    <Attribute IncludeInResult="false" AttributeId="urn:altinn:app">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">TaxReport</AttributeValue>
    </Attribute>
    <Attribute IncludeInResult="false" AttributeId="urn:altinn:task">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">FormFilling</AttributeValue>
    </Attribute>
    <Attribute IncludeInResult="false" AttributeId="urn:altinn:partyid">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">123456</AttributeValue>
    </Attribute>
  </Attributes>
  <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
    <Attribute IncludeInResult="false" AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Read</AttributeValue>
    </Attribute>
  </Attributes>
  <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:environment" />
</Request>
```

### Bruker Policy Information Point

Konteksthåndterer bruker instansdata fra lagring og roledata for subjektet.

Autorisasjonskomponenten henter denne informasjonen fra PIP for roller og PIP for ressurser.

### Implementasjonsdetaljer

Se [komponentarkitektur for konteksthåndterer](/nb/authorization/reference/architecture/accesscontrol/#context-handler) for implementasjonsdetaljer.

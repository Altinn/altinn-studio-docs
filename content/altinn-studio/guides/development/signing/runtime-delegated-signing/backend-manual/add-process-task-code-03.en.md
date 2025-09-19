---
headless: true
hidden: true
---

```xml
<xacml:Rule RuleId="urn:altinn:org:ttd:signering-brukerstyrt:ruleid:7" Effect="Permit">
  <xacml:Description>
    A rule defining all instance delegation rights the App itself is allowed to perform for instances of the app ttd/signering-brukerstyrt.
    In this example the app can delegate the Read and Sign actions for task SigningTask.
  </xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">app_ttd_signering-brukerstyrt</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:resource:delegation" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
    <xacml:AllOf>
      <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">ttd</xacml:AttributeValue>
        <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
      </xacml:Match>
      <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">signering-brukerstyrt</xacml:AttributeValue>
        <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
      </xacml:Match>
      <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">SigningTask</xacml:AttributeValue>
        <xacml:AttributeDesignator AttributeId="urn:altinn:task" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
      </xacml:Match>
    </xacml:AllOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">sign</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

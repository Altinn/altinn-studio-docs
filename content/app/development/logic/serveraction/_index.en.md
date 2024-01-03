---
title: Server Action
linktitle: Server Action
description: How to write custom server side actions that can be triggered by a API-client or a generic button
toc: true
---

{{% panel theme="warning" %}}
⚠️ Server actions require version 8.0.0 or newer of app-libs

If you want to define a generic button version 4.0.0 or newer of app-frontend is required.
{{% /panel %}}

## Overview

Server actions is a way to write custom backend code that end users can trigger either by pressing a button or making an api request.

They are almost identical to process actions, the only difference is that they do not automatically change the process state when triggered.

A server action is tied to one or more process tasks and needs explisit autorization rules to grant end users execution rights.

## Create and configure server action

### Configure available server action for a process task

To register what server acitons are available for a process task we need to add it to the tasks config in the process.bpmn file

Example of a process task with a server action called `myServerAction`

```xml
<!-- Beginning of process definition omitted for brevity -->
        <bpmn:task id="Task_1" name="Utfylling">
            <bpmn:incoming>SequenceFlow_1</bpmn:incoming>
            <bpmn:outgoing>SequenceFlow_2</bpmn:outgoing>
            <bpmn:extensionElements>
                <altinn:taskExtension>
                    <altinn:taskType>data</altinn:taskType>
                    <altinn:actions>
                        <altinn:action type="serverAction">myServerAction</altinn:action>
                    </altinn:actions>
                </altinn:taskExtension>
            </bpmn:extensionElements>
        </bpmn:task>
<!-- End of process definition omitted for brevity -->
```

### Add access polic

To allow users to trigger the server action we need to add authorization policies to the policy.xml file.

Example of access policy rule granting users with `DAGL` role access to trigger the server action `myServerAction` when the process is in `Task_1`

```xml
<!-- Beginning of policy.xml definition omitted for brevity -->
    <xacml:Rule RuleId="urn:altinn:example:ruleid:2" Effect="Permit">
        <xacml:Description>Rule that defines that user with role DAGL can execute myServerAction for
            [ORG]/[APP] when it is in Task_1
        </xacml:Description>
        <xacml:Target>
            <xacml:AnyOf>
                <xacml:AllOf>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode"
                                                   Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject"
                                                   DataType="http://www.w3.org/2001/XMLSchema#string"
                                                   MustBePresent="false"/>
                    </xacml:Match>
                </xacml:AllOf>
            </xacml:AnyOf>
            <xacml:AnyOf>
                <xacml:AllOf>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:altinn:org"
                                                   Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                                                   DataType="http://www.w3.org/2001/XMLSchema#string"
                                                   MustBePresent="false"/>
                    </xacml:Match>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:altinn:app"
                                                   Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                                                   DataType="http://www.w3.org/2001/XMLSchema#string"
                                                   MustBePresent="false"/>
                    </xacml:Match>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Task_1</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:altinn:task"
                                                   Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                                                   DataType="http://www.w3.org/2001/XMLSchema#string"
                                                   MustBePresent="false"/>
                    </xacml:Match>
                </xacml:AllOf>
            </xacml:AnyOf>
            <xacml:AnyOf>
                <xacml:AllOf>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">myServerAction</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id"
                                                   Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action"
                                                   DataType="http://www.w3.org/2001/XMLSchema#string"
                                                   MustBePresent="false"/>
                    </xacml:Match>
                </xacml:AllOf>
            </xacml:AnyOf>
        </xacml:Target>
    </xacml:Rule>
<!-- End of policy.xml definition omitted for brevity -->
```


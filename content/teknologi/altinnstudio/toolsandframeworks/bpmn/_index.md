---
title: BPMN 2.0
description: Business Process Model and Notation (BMN) - Workflow
weight: 100
tags: [process]
---

## Needs/Background

* Support for visually creating and editing a workflow.
* Standardized workflow format (XML/JSON).
* Step parameters.

### BPMN 2.0

Business Process Model and Notation (BPMN) is a standard for business process modeling that provides a graphical notation for specifying business processes in a Business Process Diagram, based on a flowcharting technique very similar to activity diagrams from Unified Modeling Language (UML) -[*Wikipedia](https://en.wikipedia.org/wiki/Business_Process_Model_and_Notation).

* BPMN 2.0 has a standardized XML format for exchanging BPMN 2.0 processes between different parties and software.
* BPMN 2.0 supports defining collaboartion between two or more collaborators.

#### BPMN 2.0 XML Extensibility

In the formal specifications chapter 8.2.3 the following is described:

> The BPMN metamodel is aimed to be extensible. This allows BPMN adopters to extend the specified metamodel in a
> way that allows them to be still BPMN-compliant.
>
> It provides a set of extension elements, which allows BPMN adopters to attach additional attributes and elements to
> standard and existing BPMN elements.
>
> This approach results in more interchangeable models, because the standard elements are still intact and can still be
> understood by other BPMN adopters. It’s only the additional attributes and elements that MAY be lost during interchange.

**When extended the BPMN XML is still understood by other BPMN adopters, but the additional attributes and elements MAY be lost during interchange.**

* Testing different BPMN software packages shows that the extended attributes in the XML does not show up as configurable properties in other software.
* Modifying the "default template" in the [BeeBPMN editor](https://www.beepmn.com) did not remove the default Altinn properties.

#### XML / XSD

[https://www.omg.org/spec/BPMN/2.0/About-BPMN/](https://www.omg.org/spec/BPMN/2.0/About-BPMN/)

### BPNM.io - bpnm-js

[Homepage](https://bpmn.io)

[BMPN.io modeler](https://rawgit.com/bpmn-io/bpmn-js-examples/master/starter/modeler.html)

* bpmn-js uses BPMN 2.0 XML standard.
* bpmn-js is an open source BPMN 2.0 web-based rendering toolkit and modeler.
* bpmn-js can be extended with rules and custom elements.
  * [Custom elements](https://github.com/bpmn-io/bpmn-js-examples/tree/master/custom-elements)
  * [Nyan](https://github.com/bpmn-io/bpmn-js-nyan)
* bpmn-js has parameter sidebar [link](https://github.com/bpmn-io/bpmn-js-examples/tree/master/properties-panel-extension)


---
title: Naming Conventions
description: Naming guidelines for Altinn Studio development
tags: ["development", "handbook", "naming"]
weight: 100
---
### C\#
The Altinn project will use Microsoft’s coding conventions as a general guideline when no other guidelines are given.

Exceptions/additions to the general guideline:

Implicit typing (var) should only be used when a variable is initialized with an anonymous type, which is a common scenario in LINQ query expressions. In general implicit typing makes the code more difficult to read and understand,and should be avoided.
Altinn specific coding guidelines:

Methods should not be more than 50 lines long
When dealing with XML you should prefer XDocument to XmlDocument (especially in new methods)
If/for/while/using and other structures should normally not be more than 2-3 levels deep
All disposeable objects (proxies, DbCommand and so on) should be disposed by using a using block.
Altinn specific naming guidelines:

Names for classes, methods and variables should be describing, but not too long
WCF-Artifact Naming
TUL Naming Standard
Namespace & Solution Structure
### React
TODO

### Redux

#### Actions
TODO

#### Sagas
TODO

#### Reducers
TODO

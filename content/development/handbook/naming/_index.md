---
title: Naming Conventions
description: Naming guidelines for Altinn Studio development
tags: [development]
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
Names of react-components should be descriptive and in [pascal case](http://wiki.c2.com/?PascalCase)

#### Actions
Names of actions should be descriptive and in [camel case](https://en.wikipedia.org/wiki/Camel_case).  
An action should have the initial action, for instance `fetchFormLayout`, and an action if it succeeds and if it fails. For instance `fetchFormLayoutFulfilled`(succeed) and `fetchFormLayoutRejected`(failed).

#### Sagas
Names of sagas should have the name of the action it listens to, and the word `Saga` appended to the end. For instance fetchFormLayoutSaga.  
And for saga-watchers, should have the `watch`-word appended to the start, and the saga name it watches. For instance `watchFetchFormLayoutSaga`.

#### Reducers
Names of reducers should have a descriptive name of that it is responsible for updating in the redux-store, and the word `Reducer` appended to the end. For instace `formLayoutReducer`.

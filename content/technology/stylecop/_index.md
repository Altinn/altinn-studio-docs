---
title: Stylecop Analyzer
description: Stylecop analyzer is the code analysis tool 
weight: 100
tags: ["tjenester 3.0", "code analysis", "stylecop", "stylecop analyzer"]
---

StyleCop.Analyzers provides warnings that indicate style and consistency rule violations in C# code. The warnings are organized into rule areas such as documentation, layout, naming, ordering, readability, spacing, and so forth. Each warning signifies a violation of a style or consistency rule.
In altinn studio application, we have turned set this "warning" action to "Error" to enforce the use of rules.

## Lenker

- [Rule Documentation](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/DOCUMENTATION.md)
- [Configuring Stylecop Analyzer](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/documentation/Configuration.md)
- [Github](https://github.com/DotNetAnalyzers/StyleCopAnalyzers)

## Nuget Package
Instructions to install the stylecop analyzer in your project can be found [here](https://github.com/DotNetAnalyzers/StyleCopAnalyzers)

## Ruleset

A solution wide stylecop ruleset and configuration(stylecop.json) is set for altinn studio application. This can be linked to the projects by linking these files like below in the project

```
  <ItemGroup>
    <PackageReference Include="StyleCop.Analyzers.Unstable" Version="1.1.1.61" />    
    <AdditionalFiles Include="C:\Repos\altinn-studio\stylecop.json">
      <Link>stylecop.json</Link>
    </AdditionalFiles>
  </ItemGroup>

  <PropertyGroup>
    <CodeAnalysisRuleSet>C:\Repos\altinn-studio\Altinn3.ruleset</CodeAnalysisRuleSet>
  </PropertyGroup>
  
```
We have turn on the rules that will improve the code quality and maintainability.

## Turn off/Turn on a rule

To turn on/off a rule from the ruleset,

1. Click on Altinn3.ruleset file in the solution explorer
2. Expand the Stylecop.Analyzers
3. Check/uncheck the rule you want to turn on/off
4. If you are turning on a rule, select the action to be "Error"

{{<figure src="turnonoffrules.gif?width=1000" title="Turn on/off a rule from ruleset">}}

## Implemented rules in altinn studio

The following rules are implemented in altinn studio

#### Special Rules

SA0001

#### Spacing Rules

SA1000 - SA1027

#### Readability Rules

SA1100, SA1102 - SA 1122, SA1125, SA1127, SA1129 - SA1137

#### Ordering Rules

SA1208 - SA1211, SA1216, SA1217

#### Naming Rules

SA1300, SA1302 - SA1308, SA1311, SA1312, SA1314

#### Maintainability Rules

SA1119, SA1400, SA1401, SA1403, SA1404, SA1407, SA1408, SA1413

#### Layout Rules

SA1500 - SA1520

#### Documentation Rules

SA1600 - SA1622, SA1624 - SA1627, SA1642, SA1643, SA1648, SA1649, SA1651
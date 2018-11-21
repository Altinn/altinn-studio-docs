---
title: Stylecop Analyzer
description: Stylecop analyzer is the code analysis tool 
weight: 100
tags: ["tjenester 3.0", "code analysis", "stylecop", "stylecop analyzer"]
---


#### Lenker
- [Configuring Stylecop Analyzer](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/documentation/Configuration.md)
- [Github](https://github.com/DotNetAnalyzers/StyleCopAnalyzers)

#### Ruleset
A solution wide stylecop ruleset and configuration(stylecop.json) is set for altinn studio application. This can be linked to the projects by linking these files like this

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

#### Turn off/Turn on a rule
- 
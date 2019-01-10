---
title: Data Structure for Repos
linktitle: Structure
description: Struktur for repositories og filer i Gitea
tags: ["repos", "arkitektur"]
weight: 100
---

{{% notice warning %}}
Under arbeid
{{% /notice %}}

## Overordnet struktur

[Gitea](https://gitea.io)  
├── {{<icon name="fa-institution">}} **altinn**  
│  ├── {{<icon name="fa-git-square">}} common  
│  │  ├── {{<icon name="fa-folder">}} text ...  
│  │  └── {{<icon name="fa-folder">}} widgets ...  
│  │  └── README.md  
│  ├── {{<icon name="fa-git-square">}} codelists  
│  │  ├── {{<icon name="fa-code">}} countries.json  
│  │  └── {{<icon name="fa-code">}} ...  
│  │  └── README.md  
│  └── {{<icon name="fa-git-square">}} ...  
│  
├── {{<icon name="fa-institution">}} **org-x**  
│  ├── {{<icon name="fa-git-square">}} org-x  
│  │  ├── {{<icon name="fa-code">}} settings.json  
│  │  ├── {{<icon name="fa-folder">}} text ...  
│  │  └── {{<icon name="fa-folder">}} widgets ...  
│  │  
│  ├── {{<icon name="fa-git-square">}} codelists  
│  │  ├── {{<icon name="fa-code">}} kodeliste1.json  
│  │  └── {{<icon name="fa-code">}} ...  
│  │  
│  ├── {{<icon name="fa-git-square">}} tjeneste-1  
│  │  ├── {{<icon name="fa-folder">}} common ...      
│  │  ├──  {{<icon name="fa-folder-open">}} Implementation  
│  │  │      ├── {{<icon name="fa-code">}} [CalculationHandler.cs](calculationhandler)  
│  │  │      ├── {{<icon name="fa-code">}} [InstantiationHandler.cs](instantiationhandler)  
│  │  │      ├── {{<icon name="fa-code">}} [ServiceImplementation.cs](serviceimplementation)  
│  │  │      └── {{<icon name="fa-code">}} [ValidationHandler.cs](validationhandler)  
│  │  ├──  {{<icon name="fa-folder-open">}} Resources  
│  │  │      ├── {{<icon name="fa-code">}} Styles.json  
│  │  │      ├── {{<icon name="fa-code">}} react-app.css  
│  │  │      ├── {{<icon name="fa-code">}} [react-app.js](reactapp)    
│  │  │      ├── {{<icon name="fa-code">}} [RuleHandler.js](rule-handler)  
│  │  │      ├── {{<icon name="fa-code">}} [FormLayout.json](form-layout)   
│  │  │      ├── {{<icon name="fa-code">}} [ServiceConfigurations.json](service-configurations)  
│  │  │      ├── {{<icon name="fa-code">}} resource.nb-NO.json  
│  │  │      └── {{<icon name="fa-code">}} resource.nn-NO.json  
│  │  ├──  {{<icon name="fa-folder-open">}} Model  
│  │  │      ├── {{<icon name="fa-code">}} [ServiceModel.xsd](servicemodelxsd)  
│  │  │      └── {{<icon name="fa-code">}} [ServiceModel.cs](servicemodel)  
│  │  ├──  {{<icon name="fa-folder-open">}} Metadata  
│  │  │       ├── {{<icon name="fa-code">}} [ServiceMetadata.json](servicemetadata)  
│  │  │       └── {{<icon name="fa-code">}} workflow.json  
│  │  ├──  {{<icon name="fa-code">}} [AltinnService.csproj](altinnservice-projectfile)    
│  │  ├──  {{<icon name="fa-code">}} config.json        
│  │  ├──  .gitignore  
│  │  ├──  LICENSE  
│  │  └──  README.md  
│  │  
│  └── {{<icon name="fa-git-square">}}tjeneste-2 ...  
│  
├── {{<icon name="fa-institution">}} **org-y**  
│  ├── {{<icon name="fa-git-square">}} org-y ...  
│  └── {{<icon name="fa-git-square">}} ...  
│  
├── {{<icon name="user">}} bruker-a  
│  └── {{<icon name="fa-git-square">}} tjeneste-1 (fork av org-x/tjeneste-1)  
├── {{<icon name="user">}} bruker-b ...   
│  
├── {{<icon name="fa-eye">}}[Alle organisasjoner](https://try.gitea.io/explore/organizations)  
├── {{<icon name="fa-eye">}}[Alle repos](https://try.gitea.io/explore/repos)  
└── {{<icon name="fa-eye">}}[Alle brukere](https://try.gitea.io/explore/users)  

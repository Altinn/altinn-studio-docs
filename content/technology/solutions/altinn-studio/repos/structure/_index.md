---
title: Data Structure for Repos
linktitle: Structure
description: Struktur for repositories og filer i Gitea.
tags: [altinn-repos, arkitektur, todo]
---

{{% notice warning %}}
Under arbeid... Her må det gjøres en større opprydding i filstrukturen.
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
│  │  ├── {{<icon name="fa-folder">}} models ...  
│  │  └── {{<icon name="fa-folder">}} widgets ...  
│  │  
│  ├── {{<icon name="fa-git-square">}} codelists  
│  │  ├── {{<icon name="fa-code">}} kodeliste1.json  
│  │  └── {{<icon name="fa-code">}} ...  
│  │  
│  ├── {{<icon name="fa-git-square">}} tjeneste-1  
│  │  ├──  {{<icon name="fa-folder-open">}} Deployment ([helm]({{<ref "/technology/tools/helm">}}))  
│  │  │      ├── {{<icon name="fa-folder-open">}} templates  
│  │  │      │     ├── {{<icon name="fa-code">}} _helpers.tpl  
│  │  │      │     ├── {{<icon name="fa-code">}} deployment.yaml  
│  │  │      │     ├── {{<icon name="fa-code">}} ingress.yaml  
│  │  │      │     ├── {{<icon name="fa-code">}} NOTES  
│  │  │      │     └── {{<icon name="fa-code">}} service.yaml  
│  │  │      ├── {{<icon name="fa-code">}} .helmignore  
│  │  │      ├── {{<icon name="fa-code">}} Chart.yaml  
│  │  │      └── {{<icon name="fa-code">}} values.yaml  
│  │  ├──  {{<icon name="fa-folder-open">}} Implementation  
│  │  │   ├──  {{<icon name="fa-folder-open">}} Calculation   
│  │  │   │   └── {{<icon name="fa-code">}} [CalculationHandler.cs](calculationhandler)   
│  │  │   ├── {{<icon name="fa-code">}} [InstantiationHandler.cs](instantiationhandler)  
│  │  │   ├── {{<icon name="fa-code">}} [ServiceImplementation.cs](serviceimplementation)  
│  │  │   └── {{<icon name="fa-code">}} [ValidationHandler.cs](validationhandler)  
│  │  ├──  {{<icon name="fa-folder-open">}} Metadata          
│  │  │       ├── {{<icon name="fa-code">}} [applicationmetadata.json](application-metadata)  
│  │  │       ├── {{<icon name="fa-code">}} [ServiceMetadata.json](servicemetadata)  
│  │  │       └── {{<icon name="fa-code">}} workflow.json  
│  │  ├──  {{<icon name="fa-folder-open">}} Model  
│  │  │      ├── {{<icon name="fa-code">}} [ServiceModel.xsd](servicemodelxsd)  
│  │  │      └── {{<icon name="fa-code">}} [ServiceModel.cs](servicemodel)  
│  │  ├──  {{<icon name="fa-folder-open">}} Resources   
│  │  │      ├──  {{<icon name="fa-folder-open">}} Dynamics  
│  │  │      │   └── {{<icon name="fa-code">}} [RuleHandler.js](rule-handler)   
│  │  │      ├── {{<icon name="fa-code">}} Styles.json  
│  │  │      ├── {{<icon name="fa-code">}} react-app.css  
│  │  │      ├── {{<icon name="fa-code">}} [react-app.js](reactapp)      
│  │  │      ├── {{<icon name="fa-code">}} [FormLayout.json](form-layout)   
│  │  │      ├── {{<icon name="fa-code">}} [ServiceConfigurations.json](service-configurations)  
│  │  │      ├── {{<icon name="fa-code">}} resource.nb-NO.json  
│  │  │      └── {{<icon name="fa-code">}} resource.nn-NO.json  
│  │  ├──  {{<icon name="fa-folder">}} Test (used for runtime)  
│  │  ├──  {{<icon name="fa-folder-open">}} Testdataforparty (used for runtime)         
│  │  │        ├──{{<icon name="fa-folder-open">}}  user1                        
│  │  │        │     ├──{{<icon name="fa-folder-open">}}  instance1     
│  │  │        │     │     ├──{{<icon name="fa-code">}}  instance1.json          
│  │  │        │     │     ├──{{<icon name="fa-code">}}  instance1.state.json                  
│  │  │        │     │     ├──{{<icon name="fa-folder-open">}} data   
│  │  │        │     │     │    ├──{{<icon name="fa-folder-open">}} data-id1      
│  │  │        │     │     │    │      ├──{{<icon name="fa-code">}} data-id1.xml  
│  │  │        │     │     │    ├──{{<icon name="fa-folder-open">}} data-id...   
│  │  ├──  {{<icon name="fa-folder-open">}} Workflow  
│  │  │      └── {{<icon name="fa-code">}} workflow.bpmn ([BPMN]({{<ref "/technology/tools/bpmn">}}))  
│  │  ├──  {{<icon name="fa-code">}} [App.csproj](app-csproj)    
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


{{<children />}}

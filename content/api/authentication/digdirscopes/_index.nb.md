---
title: DigDir Scopes
linktitle: DigDir Scopes
description: Listen nedenfor viser alle scopes kontrollert av DigDir i ID-porten og maskinporten
---


|name                                         |allowed_integration_types|  authorization_max_lifetime|
|---- |                                        -------------------------|  --------------------------|
|altinn:appdeploy                             |{maskinporten}                               |    3600|
|altinn:appdeploy                             |{maskinporten}                               |    3600
|altinn:brokerservice.read                    |{maskinporten, api_klient}                   | 7776000
|altinn:brokerservice.read                    |{maskinporten, api_klient}                   | 7776000
|altinn:brokerservice.write                   |{maskinporten, api_klient}                   | 7776000
|altinn:brokerservice.write                   |{maskinporten, api_klient}                   | 7776000
|altinn:consentrequests.read                  |{maskinporten}                               |    3600
|altinn:consentrequests.read                  |{maskinporten}                               |    3600
|altinn:consentrequests.write                 |{maskinporten}                               |    3600
|altinn:consentrequests.write                 |{maskinporten}                               |    3600
|altinn:consenttokens                         |{maskinporten}                               |    3600
|altinn:consenttokens                         |{maskinporten}                               |    3600
|altinn:dataaltinnno                          |{maskinporten}                               |    3600
|altinn:dataaltinnno                          |{maskinporten}                               |    3600
|altinn:dataaltinnno/advregbulk               |{maskinporten}|
|altinn:dataaltinnno/advregbulk               |{maskinporten}|
|altinn:dataaltinnno/advregperson             |{maskinporten}|
|altinn:dataaltinnno/advregperson             |{maskinporten}|
|altinn:dataaltinnno/advregverifikasjon       |{maskinporten}|
|altinn:dataaltinnno/advregverifikasjon       |{maskinporten}|
|altinn:dataaltinnno/dihe                     |{maskinporten}                              |    7200|
|altinn:dataaltinnno/dihe                     |{maskinporten}                               |    7200
|altinn:dataaltinnno/ebevis                   |{maskinporten}                               |    7200
|altinn:dataaltinnno/ebevis                   |{maskinporten}                               |    7200
|altinn:dataaltinnno/oed                      |{maskinporten}|
|altinn:dataaltinnno/oed                      |{maskinporten}|
|altinn:dataaltinnno/reelle                   |{maskinporten}|
|altinn:dataaltinnno/reelle                   |{maskinporten}|
|altinn:dataaltinnno/tilda                    |{maskinporten}|
|altinn:dataaltinnno/tilda                    |{maskinporten}|
|altinn:delegationrequests.read               |{maskinporten}                              |    3600|
|altinn:delegationrequests.read               |{maskinporten}                               |    3600
|altinn:delegationrequests.write              |{maskinporten}                               |    3600
|altinn:delegationrequests.write              |{maskinporten}                               |    3600
|altinn:delegations.read                      |{maskinporten, api_klient}                   | 7776000
|altinn:delegations.read                      |{maskinporten, api_klient}                   | 7776000
|altinn:delegations.write                     |{maskinporten, api_klient}                   | 7776000
|altinn:delegations.write                     |{maskinporten, api_klient}                   | 7776000
|altinn:enduser                               |{maskinporten, api_klient}                   | 7776000
|altinn:enduser                               |{maskinporten, api_klient}                   | 7776000
|altinn:enduser/consentrequests.read          |{maskinporten}                               |    3600
|altinn:enduser/consentrequests.read          |{maskinporten}                               |    3600
|altinn:enduser/consentrequests.write         |{maskinporten}                               |    3600
|altinn:enduser/consentrequests.write         |{maskinporten}                               |    3600
|altinn:endusernoconsent                      |{api_klient}                                 | 7776000
|altinn:endusernoconsent                      |{api_klient}                                 | 7776000
|altinn:enterprisebrokerservice               |{maskinporten}                               |    3600
|altinn:enterprisebrokerservice               |{maskinporten}                               |    3600
|altinn:enterpriseusers.read                  |{maskinporten}                               |    3600
|altinn:enterpriseusers.read                  |{maskinporten}                               |    3600
|altinn:enterpriseusers.write                 |{maskinporten}                               |    3600
|altinn:enterpriseusers.write                 |{maskinporten}                               |    3600
|altinn:instances.meta                        |{maskinporten, api_klient}                   | 7776000
|altinn:instances.meta                        |{maskinporten, api_klient}                   | 7776000
|altinn:instances.read                        |{maskinporten, api_klient}                   | 7776000
|altinn:instances.read                        |{maskinporten, api_klient}                   | 7776000
|altinn:instances.write                       |{maskinporten, api_klient}                   | 7776000
|altinn:instances.write                       |{maskinporten, api_klient}                   | 7776000
|altinn:lookup                                |{maskinporten, api_klient}                   | 7776000
|altinn:lookup                                |{maskinporten, api_klient}                   | 7776000
|altinn:maskinporten/delegations              |{maskinporten}                               |    3600
|altinn:maskinporten/delegations              |{maskinporten}                               |    3600
|altinn:maskinporten/delegations.admin        |{maskinporten}                               |    3600
|altinn:maskinporten/delegations.admin        |{maskinporten}                               |    3600
|altinn:maskinporten/delegationschemes.admin  |{maskinporten}                               |    3600
|altinn:maskinporten/delegationschemes.admin  |{maskinporten}                               |    3600
|altinn:maskinporten/delegationschemes.delete |{maskinporten}                               |    3600
|altinn:maskinporten/delegationschemes.delete |{maskinporten}                               |    3600
|altinn:maskinporten/delegationschemes.edit   |{maskinporten}                               |    3600
|altinn:maskinporten/delegationschemes.edit   |{maskinporten}                               |    3600
|altinn:maskinporten/delegationschemes.read   |{maskinporten}                               |    3600
|altinn:maskinporten/delegationschemes.read   |{maskinporten}                               |    3600
|altinn:maskinporten/delegationschemes.write  |{maskinporten}                               |    3600
|altinn:maskinporten/delegationschemes.write  |{maskinporten}                               |    3600
|altinn:profiles.read                         |{maskinporten, api_klient}                   | 7776000
|altinn:profiles.read                         |{maskinporten, api_klient}                   | 7776000
|altinn:profiles.write                        |{maskinporten, api_klient}                   | 7776000
|altinn:profiles.write                        |{maskinporten, api_klient}                   | 7776000
|altinn:reportees                             |{maskinporten, api_klient}                   | 7776000
|altinn:reportees                             |{maskinporten, api_klient}                   | 7776000
|altinn:resourceregistry/resource.admin       |{maskinporten}|
|altinn:resourceregistry/resource.admin       |{maskinporten}|
|altinn:resourceregistry/resource.read        |{maskinporten}|
|altinn:resourceregistry/resource.read        |{maskinporten}|
|altinn:resourceregistry/resource.write       |{maskinporten}|
|altinn:resourceregistry/resource.write       |{maskinporten}|
|altinn:roledefinitions.read                  |{maskinporten, pi_klient}                   | 7776000|
|altinn:roledefinitions.read                  |{maskinporten, api_klient}                   | 7776000
|altinn:roledefinitions.write                 |{maskinporten, api_klient}                   | 7776000
|altinn:roledefinitions.write                 |{maskinporten, api_klient}                   | 7776000
|altinn:rolesandrights.read                   |{maskinporten, api_klient}                   | 7776000
|altinn:rolesandrights.read                   |{maskinporten, api_klient}                   | 7776000
|altinn:rolesandrights.write                  |{maskinporten, api_klient}                   | 7776000
|altinn:rolesandrights.write                  |{maskinporten, api_klient}                   | 7776000
|altinn:serviceowner                          |{maskinporten}                               |    3600
|altinn:serviceowner                          |{maskinporten}                               |    3600
|altinn:serviceowner/consents                 |{maskinporten}                               |    3600
|altinn:serviceowner/consents                 |{maskinporten}                               |    3600
|altinn:serviceowner/delegationrequests.read  |{maskinporten}                               |    3600
|altinn:serviceowner/delegationrequests.read  |{maskinporten}                               |    3600
|altinn:serviceowner/delegationrequests.write |{maskinporten}                               |    3600
|altinn:serviceowner/delegationrequests.write |{maskinporten}                               |    3600
|altinn:serviceowner/delegations.write        |{maskinporten}                               |    3600
|altinn:serviceowner/delegations.write        |{maskinporten}                               |    3600
|altinn:serviceowner/events                   |{maskinporten}                               |    3600
|altinn:serviceowner/events                   |{maskinporten}                               |    3600
|altinn:serviceowner/instances.read           |{maskinporten}                               |    3600
|altinn:serviceowner/instances.read           |{maskinporten}                               |    3600
|altinn:serviceowner/instances.write          |{maskinporten}                               |    3600
|altinn:serviceowner/instances.write          |{maskinporten}                               |    3600
|altinn:serviceowner/notifications.read       |{maskinporten}                               |    3600
|altinn:serviceowner/notifications.read       |{maskinporten}                               |    3600
|altinn:serviceowner/organizations            |{maskinporten}                               |    3600
|altinn:serviceowner/organizations            |{maskinporten}                               |    3600
|altinn:serviceowner/reportees                |{maskinporten}                               |    3600
|altinn:serviceowner/reportees                |{maskinporten}                               |    3600
|altinn:serviceowner/rolesandrights           |{maskinporten}                               |    3600
|altinn:serviceowner/rolesandrights           |{maskinporten}                               |    3600
|altinn:serviceowner/srr.read                 |{maskinporten}                               |    3600
|altinn:serviceowner/srr.read                 |{maskinporten}                               |    3600
|altinn:serviceowner/srr.write                |{maskinporten}                               |    3600
|altinn:serviceowner/srr.write                |{maskinporten}                               |    3600

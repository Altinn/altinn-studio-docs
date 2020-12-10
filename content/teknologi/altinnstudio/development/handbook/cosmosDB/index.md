---
title: Cosmos DB
description: General guidelines and best practice for working with Cosmos DB
tags: [development]
weight: 100
---

## Querying documents in CosmosDB

### Use FeedResponse to retrieve all hits

The documents in a collection might be stored in different partitions. 
When querying documents in a collection, the response will only contain documents from a single partition at a time, 
to retrieve your hits across all partitions you may utilize the the continuation token or the _HasMoreResults_ property of the DocumentQuery.



### Avoid expensive queries

CosmosDB uses indexes to find matches for the queries, 
if there is not value for the indexed property, all instances will have to be checked to figure out if there is a match for the query. 
This occurs in cases where we assert that a property `is null`, so queries like this should be avoided. 

Always try to assert on an existing value, if this is not possible modifying the data model should be considered.



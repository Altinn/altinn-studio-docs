---
title: Queues
description: Guidelines for working with Azure Queue Storage
tags: [development, operations, storage, azure, queue]
weight: 100
---


## Moving messages between queues

During operations we sometimes need to move messages between queues. 
The most common scenario is wanting to re-process elements that have ended in the poision 
queue after too many failed attempts. 

### Prerequisites
- [Azure Storage Explorer](../tools/#azure-storage-explorer) available on your local machine
- An Azure AD account with write-permissions for the related storage account

### How to
1. Open Storage Explorer and sign into Azure under the Account Management tab
2. Once signed in, select the correct storage account 
3. Move to the _explorer tab_ and identify the source queue in the left hand menu
    ![Poison queue marked in red](identify-poisonqueue.png)
4. You should now see the messages in the queue in the explorer.
    If you only want to move a single message, this should be highlightes
    ![Poision queue with elements](move-message-btn-marked.png)
5. Click the arrow next to _Move messages_ to specify if all or just a single message should be moved
6. In the dialogue, select the destination queue and click `Move`
    ![Select destination queue dialogue](select-destination-queue.png)
7. The messages will be moved immediatly, check the destination queue to confirm.
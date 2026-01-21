---
title: What do you get?
linktitle: What do you get?
description: An overview and description of the key functionalities and features of Altinn Broker. 
tags: []
toc: false
weight: 20
---

### End-to-end file transfers
Altinn Broker offers end-to-end file transfers, from creation, sending, receiving to tracking file transfers. This ensures that all parts of the messaging flow are handled efficiently and securely.

### Support for large payloads
A unique feature of Altinn Broker is its ability to handle large data volumes (payloads). The system supports file transfers up to 1600 GB without virus scanning (and of up to 2 GB with virus scanning). This is the ideal solution for those who need to transfer large amounts of information efficiently and securely.

### Security
Altinn Broker leverages Microsoft Azure Storage Service Encryption to protect content. See [Azure Storage Service Encryption](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption) for more details.

### Logging
Altinn Broker ensures that all events and processes are thoroughly logged, making it easy to trace who did what and when.

### Notifications
- Automatic notifications via email or SMS to recipients.
- Reminder after 7 days if a file remains unopened.
- Customizable notification templates and delivery addresses.

### Events
You can receive notifications about events related to submitted messaging services by setting up a subscription for the specific service. For example, you can see whether the file has reached the recipient and whether it has been opened.

### Access Control 
The system offers advanced access control, ensuring that only authorized users can access specific file transfers.

### Support for various file formats
The solution is flexible and supports both structured and unstructured files. This customization allows for adaptation to a wide range of use cases and data formats.

### Availability
The sender determines how long the file will be available for download by the recipient. After this period, the file will become inaccessible.

- 'PurgeFileTransferAfterAllRecipientsConfirmed': Whether the file is deleted once all recipients have confirmed receipt.
- 'PurgeFileTransferGracePeriod': If the above field is set to "true", this parameter specifies how long the file will remain available for download after confirmation (default is 2 hours, maximum is 24 hours).
- 'FileTransferTimeToLive': How long a file is available for download (default is 30 days, maximum is one year).

### API access
All users, both senders and recipients, have access to functionalities through the Broker APIs. This provides you with the possibility to integrate Altinn Broker into your own systems, allowing you to automate your processes.

### Integrations and cloud Support
Altinn Broker seeks to provide as standardized integrations as possible with other common solutions, easing integration with existing systems. The solution also offers buffering to handle large data volumes. It can be configured to use your own cloud solution for storage, should you have requirements for this.

### Overview of your consumption
Altinn Broker utilizes Azure cloud solutions, allowing you to monitor your consumption of cloud resources. This includes monitoring data usage, processing capacity, storage, and other relevant resources. This ensures that you stay within budgeted limits and can optimize the use of cloud resources for better cost-effectiveness.


## Main Features

The following diagram lists the main features as high level user stories (epics).

![High Level User Needs for Managed File Transfer](high-level-user-needs-for-managed-file-transfer.en.png "High Level User Needs for Managed File Transfer")


Examples of how to read the diagram:

* As a Service Owner, I need (the ability) to facilitate secure and user friendly solutions for transfer of large files.
* As a Sender, I need (the ability) to send large files to one or more recipients.

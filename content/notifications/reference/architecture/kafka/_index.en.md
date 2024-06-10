---
title: Kafka
linktitle: Kafka
tags: [architecture, solution, kafka]
weight: 40
toc: true
description: "Kafka is used as a message broker across the components that make up the Notification solution. 
We are currently running Apache Kafka on Confluent Cloud through Azure enabling seamless 
integration with the rest of our components hosted in Azure."
---

## Kafka topic overview

Below is an overview of the Kafka topics used in our system, 
along with information about the producers and the content of each topic


### Health 
<!--New expand-->
{{% expandsmall id="altinn.notifications.health.check" header="altinn.notifications.health.check" %}}

__Description:__ A topic dedicated to verifying the connectivity between microservices and the Kafka cluster.

__Event trigger:__ External party has requested that the health of the microservice is checked.

__Producer:__ Altinn Notifications, KafkaHealthCheck

__Content:__

- Format: string
- Description: A string not intended to carry any significant data. Default value: _test_.
{{% /expandsmall %}}

<!--New expand-->
{{% expandsmall id="altinn.notifications.email.health.check" header="altinn.notifications.email.health.check" %}}

__Description:__ A topic dedicated to verifying the connectivity between microservices and the Kafka cluster.

__Event trigger:__ External party has requested that the health of the microservice is checked.

__Producer:__ Altinn Notifications Email, KafkaHealthCheck

__Content:__

- Format: string
- Description: A string not intended to carry any significant data. Default value: _test_.
{{% /expandsmall %}}

### Orders

<!--New expand-->
{{% expandsmall id="altinn.notifications.orders.pastdue" header="altinn.notifications.orders.pastdue" %}}

__Description:__ A topic dedicated to orders where the requested send time is about to pass, or has passed.

__Event trigger:__ Requested send time of orders is about to, or has, passed.

__Producer:__ Altinn Notifications, OrderProcessingService

__Content:__ 

- Format: json
- Data structure: [NotificationOrder](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Core/Models/Orders/NotificationOrder.cs)
- Description: An order containing notification templates along with complete or partial recipient data.
{{% /expandsmall %}}

<!--New expand-->
{{% expandsmall id="altinn.notifications.orders.pastdue.retry" header="altinn.notifications.orders.pastdue.retry" %}}

__Description:__ A topic dedicated to orders where the requested send time is about to pass,or has passed 
and processing has failed at least once.

__Event trigger:__ Initial processing of the order after passed send time failed due to an unknown or intermittent reason.

__Producer:__ Altinn Notifications, PastDueOrdersConsumer 

__Content:__ 

- Format: json
- Data structure: [NotificationOrder](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Core/Models/Orders/NotificationOrder.cs)
- Description: An order containing notification templates along with complete or partial recipient data.
{{% /expandsmall %}}

### Emails

<!--New expand-->
{{% expandsmall id="altinn.notifications.email.queue" header="altinn.notifications.email.queue" %}}

__Description:__ A topic dedicated to emails that are completed and ready to be sent to out.

__Event trigger:__ All required information has been retrieved and populated to the email 

__Producer:__ Altinn Notifications, EmailNotificationService 

__Content:__ 

- Format: json
- Data structure: [Email](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Core/Models/Email.cs)
- Description: An email with all required properties present
{{% /expandsmall %}}

<!--New expand-->
{{% expandsmall id="altinn.notifications.email.queue.retry" header="altinn.notifications.email.queue.retry" %}}

__Description:__ A topic dedicated to emails that are completed and ready to be sent to out where at least
one previous attempt of sending the email has failed.

__Event trigger:__ Initial attempt to send the email has failed due to an unknown or intermittent reason.

__Producer:__ Altinn Notifications Email, SendEmailQueueConsumer  

__Content:__ 

- Format: json
- Data structure: [Email](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Core/Models/Email.cs)
- Description: An email with all required properties present.
{{% /expandsmall %}}

<!--New expand-->
{{% expandsmall id="altinn.notifications.email.sending.accepted" header="altinn.notifications.email.sending.accepted" %}}

__Description:__ A topic dedicated to send operation identifiers for emails that have been accepted by Azure Communication services.

__Event trigger:__ The system would like an update on the status for an email that was accepted by Azure Communication Services.

__Producer:__ Altinn Notifications Email, SendingService and StatusService

__Content:__ 

- Format: json
- Data structure: [SendNotificationOperationIdentifier](https://github.com/Altinn/altinn-notifications-email/blob/main/src/Altinn.Notifications.Email.Core/SendNotificationOperationIdentifier.cs)
- Description: An object grouping notification id, Azure Communication Services operation Id, and the date and time
  for the last status check.
{{% /expandsmall %}}

<!--New expand-->
{{% expandsmall id="altinn.notifications.email.status.updated" header="altinn.notifications.email.status.updated" %}}

__Description:__ A topic dedicated to hold updates on the send status of an email notification

__Event trigger:__ An update on the progress of sending an email notification has been received from Azure Communication Services.

__Producer:__ Altinn Notifications Email, StatusService

__Content:__ 

- Format: json
- Data structure: [SendOperationResult](https://github.com/Altinn/altinn-notifications-email/blob/main/src/Altinn.Notifications.Email.Core/Status/SendOperationResult.cs)
- Description: An object containing the [EmailSendResult](https://github.com/Altinn/altinn-notifications-email/blob/main/src/Altinn.Notifications.Email.Core/Status/EmailSendResult.cs) 
     for a given notification and operation id for the last status check.
{{% /expandsmall %}}

### Sms

<!--New expand-->
{{% expandsmall id="altinn.notifications.sms.queue" header="altinn.notifications.sms.queue" %}}

__Description:__ A topic dedicated to sms that are completed and ready to be sent to out.

__Event trigger:__ All required information has been retrieved and populated to the sms

__Producer:__ Altinn Notifications, SmsNotificationService 

__Content:__ 

- Format: json
- Data structure: [Sms](https://github.com/Altinn/altinn-notifications-sms/blob/main/src/Altinn.Notifications.Sms.Core/Sending/Sms.cs)
- Description: An sms with all required properties present
{{% /expandsmall %}}

<!--New expand-->
{{% expandsmall id="altinn.notifications.sms.queue.retry" header="altinn.notifications.sms.queue.retry" %}}

__Description:__ A topic dedicated to sms messages that are completed and ready to be sent to out where at least
one previous attempt of sending the sms has failed.

__Event trigger:__ Initial attempt to send the sms has failed due to an unknown or intermittent reason.

__Producer:__ Altinn Notifications Sms, SendSmsQueueConsumer  

__Content:__ 

- Format: json
- Data structure: [Sms](https://github.com/Altinn/altinn-notifications-sms/blob/main/src/Altinn.Notifications.Sms.Core/Sending/Sms.cs)
- Description: An sms with all required properties present.
{{% /expandsmall %}}

<!--New expand-->
{{% expandsmall id="altinn.notifications.sms.status.updated" header="altinn.notifications.sms.status.updated" %}}

__Description:__ A topic dedicated to hold updates on the send status of an sms notification

__Event trigger:__ An update on the progress of sending an sms notification has been received from Link Mobility.

__Producer:__ Altinn Notifications Sms, StatusService

__Content:__ 

- Format: json
- Data structure: [SendOperationResult](https://github.com/Altinn/altinn-notifications-sms/blob/main/src/Altinn.Notifications.Sms.Core/Status/SendOperationResult.cs)
- Description: An object containing the [SmsSendResult](https://github.com/Altinn/altinn-notifications-sms/blob/main/src/Altinn.Notifications.Sms.Core/Status/SmsSendResult.cs) 
     for a given notification and gatewatyreference to Link Mobility for the transaction.
{{% /expandsmall %}}

### Platform services

<!--New expand-->
{{% expandsmall id="altinn.platform.service.updated" header="altinn.platform.service.updated" %}}

__Description:__ A topic dedicated to hold updates on the Altinn platform components

__Event trigger:__ An change in the state or availability of a platform service has occurred

__Producer:__ 
- Altinn Notifications Email, SendingService 

__Content:__ 

- Format: json
- Data structure: [GenericServiceUpdate](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Core\Models/AltinnServiceUpdate/GenericServiceUpdate.cs)
- Description: An object containing an Altinn service update of a schema specified in the payload.
{{% /expandsmall %}}

## Cluster configuration

The kafka cluster used by Altinn Notifications, is a cluster shared between multiple Altinn components.
Configuration in relation to roles and topic policies are in place to ensure integrity in the data on topics 
owned by the Notifications solution.

 
### Roles

Three roles are defined and used by entities interacting with Kafka from the solution. 

- **NotificationsConsumer**: can consume from topics following the naming patterns _altinn.notifications.*_ and _altinn.platform.*_
- **NotificationsProducer** : can write to topics following the naming patterns _altinn.notifications.*_ and _altinn.platform.*_
- **ClusterAdmin**: can create a new topics following the naming patterns _altinn.notifications.*_ and _altinn.platform.*_


## Topic configuration

### Partitions 
The number of partitions on a topic is set at creation. As our solution has the ability to auto scale, 
we have set the number of partitions equal to the maximum number of nodes available in the AKS cluster
running the consumer microservices. This means the maximum numbers of consumers per consumer group will be equal to
the number of nodes in the cluster.  

### Retention
Retention time varies between the environments. 
For all AT environments retention time for a message is 7 days. 
In YT, TT and production retention time for a message is 365 days. 
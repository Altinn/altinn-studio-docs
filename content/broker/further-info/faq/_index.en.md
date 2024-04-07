---
title: Altinn 3 Broker FAQ
linktitle: FAQs
description: Altinn 3 Broker Architecture FAQ answers common questions.
tags: [architecture, solution]
toc: true
weight: 900
---
{{<notice warning>}} <!-- info -->
This is work in progress
{{</notice>}}

{{<notice info>}} <!-- info -->
Some of the FAQ items may be moved to a less product specific FAQ.
{{</notice>}}


## Why use Webhooks over API polling?
Webhooks offer several advantages over API polling:

* **Real-Time Data**: Webhooks provide real-time data updates. As soon as an event occurs, the webhook sends the data, unlike polling where you might have to wait until the next poll interval.

* **Efficiency**: Webhooks are more efficient as they only send data when there's new or changed information. In contrast, polling repeatedly requests data at regular intervals, regardless of whether there are changes, which can be resource-intensive.

* **Reduced Server Load**: Since webhooks respond to events, they reduce the load on both the client and server. Polling, especially if done frequently, can significantly increase server load and network traffic.

* **Scalability**: Webhooks scale better with increased data or users. Polling can become more challenging to manage and less efficient as the scale increases.

* **Simplicity**: Implementing webhooks can be simpler, as it involves setting up a URL endpoint to receive data. Polling requires more complex logic to handle the timing and frequency of requests.

Also see:

1. [Wikipedia on Webhooks](https://en.wikipedia.org/wiki/Webhook)

1. **Svix Resources - Webhooks vs API Polling**: This resource explains the process of API polling and contrasts it with the use of webhooks, highlighting the efficiency and real-time data delivery of webhooks. [Read more here](https://www.svix.com/resources/faq/webhooks-vs-api-polling/).

2. **Merge.dev Blog - Polling vs Webhooks**: This blog post covers how polling and webhooks work, their respective pros and cons, and situations where one might be preferred over the other. [Read more here](https://www.merge.dev/blog/webhooks-vs-polling).

3. **LinkedIn - Benefits and Drawbacks of Webhooks for Real-Time Data Delivery**: This article discusses the efficiency and speed of webhooks, especially in comparison to polling methods. [Read more here](https://www.linkedin.com/advice/0/what-benefits-drawbacks-webhooks-real-time-data).

4. **Salesforce Codex - Difference between WebHook and API Polling**: This piece provides a clear comparison between webhook requests and polling, emphasizing the automatic nature of webhooks and their efficiency. [Read more here](https://stories.salesforcecodex.com/2022/09/interview-tips/difference-between-webhook-and-api-polling/).

5. **DZone - Webhooks vs. Polling: You're Better Than This**: This article explains why webhooks are more efficient than polling, with insights into the resource wastage involved in polling. [Read more here](https://dzone.com/articles/webhooks-vs-polling-youre-better-than-this-1).

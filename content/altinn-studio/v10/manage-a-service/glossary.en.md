---
draft: false
title: Glossary for management and monitoring
linktitle: Glossary
description: Explanations of technical words and concepts used in the documentation on management and monitoring of Altinn services.
weight: 10
tags: [needsReview]
---

This page contains explanations of technical words and concepts used in the documentation on management and monitoring of Altinn services. Words are sorted alphabetically.

## A

### Alerting

Alerting is responding automatically to monitored information or patterns in the data. You can set up rules that notify you when something unusual happens.

**Example:** You receive an email or SMS if the error rate in your app suddenly increases to over 5% of all requests.

### Application Insights

See **Azure Application Insights**.

### ASP.NET Core dashboard

Shows standard metrics for web applications, such as number of requests, error rates, and response times.

### authLevel (authentication level)

How high a security level the user has logged in with (level 3 or 4).

### Azure Application Insights (AI)

An extension of Azure Monitor and the tool we use in Altinn to provide monitoring functionality for apps. Application Insights can provide you as an app developer with valuable insights into the health, performance, and usage of your app.

### Azure Monitor

Microsoft's cloud monitoring platform, whilst Application Insights is the part specifically designed to monitor applications.

## B

### Backend

A system or service that runs on a server and handles data processing and storage, as opposed to frontend which the user sees and interacts with.

**Example:** When you submit a form, the data is sent to a backend that processes and stores it.

## C

### Counter

A metric type that only increases. Used to count events, for example the number of instances created.

**Example:** If 5 instances are created, the counter goes from 0 to 5. It never decreases.

### customDimensions

A field in Application Insights where you can add custom data that is specific to your app.

**Example:** You can use `customDimensions["userId"]` to retrieve the user ID from telemetry data.

## D

### Data element

A part of the data in an instance, for example the form completion itself or an attachment.

### Dependency

An external service or database that your app calls. If a request is slow, it may be because one of these dependencies takes a long time to respond.

## E

### Enrichment

Adding extra information to telemetry to make it more useful.

**Example:** You can automatically add environment name (test/production) or organisation number to all telemetry that is sent out.

### Exception

An error that occurs when the programme runs, for example when it tries to divide by zero or read a file that does not exist.

## G

### Grafana

An open-source tool for creating graphs and dashboards. It is more flexible than Application Insights for creating custom visualisations.

## H

### Histogram

A metric type that shows the distribution of values over time. Used to measure durations and sizes.

**Example:** Instead of just knowing the average duration, you can see that 90% of instances take under 10 seconds, whilst 10% take over 1 minute.

## I

### Instance

A single completion of a form or a process in Altinn. Each time a user starts a new completion, a new instance is created.

### instanceId

A unique ID for a specific completion of a form or a process in Altinn. Each time a user starts a new completion, it gets its own instanceId.

### Instrumentation

Instrumentation means that your software reports what it is doing whilst it runs. This is like adding measuring instruments to a system so you can see what is happening.

**Example:** When a user submits a form, the app can record how long it took to process the submission and whether any errors occurred along the way.

## K

### Key vault

A secure storage location for secrets such as passwords and API keys.

### KQL (Kusto Query Language)

A query language somewhat similar to SQL. You use it to search, filter, and analyse data in Application Insights.

**Example KQL query:**
```
requests
| where timestamp > ago(1h)
| where resultCode != 200
| summarize count() by resultCode
```
This query shows all requests in the last hour that were not successful, grouped by response code.

### Kubernetes cluster

A system that runs and manages container-based apps.

## L

### Local-test

The local development environment where you can test your app on your own machine before publishing it.

### Logs

Text messages that the programme writes out whilst it runs, to document what is happening. Useful for debugging and understanding the app's behaviour.

## M

### Metrics

Numbers and statistics that are automatically collected whilst the app runs. They provide you with an overview of what is happening in your app.

**Example:** Instead of having to read through thousands of log messages, you can see a simple metric showing that 150 instances were created today, and that 5 of them failed.

### Monitoring

Receiving telemetry from instrumentation and making it visible, for example through graphs, tables, or dashboards.

**Example:** In Azure Application Insights, you can see a graph showing how many users have logged in over the past week.

## N

### .NET runtime dashboard

Shows how the app uses system resources such as memory, CPU, and garbage collection.

## O

### OpenTelemetry (OTel)

A vendor-independent standard for collecting and exporting telemetry from applications. Makes it possible to use different monitoring tools without having to change the code.

### orgNumber (organisation number)

The organisation number of the organisation performing the action in Altinn.

## P

### Parent span

In distributed tracing, the step that called the current step. Used to understand the context between different parts of a request.

### partyId

A unique ID for the user or organisation in Altinn.

### Pod

A running instance of an app in Kubernetes.

### Process

The entire flow from start to finish for an instance, including all steps the user must go through.

### Propagation

The way trace data is passed on between different services in a distributed system, so that the entire chain of requests can be traced.

**Explanation:** W3C Trace-Context is a standard that enables different systems to share trace data and understand the context between requests that span multiple services.

### Pull

A method for retrieving telemetry where something asks the app for information (for example, a monitoring service that regularly fetches data).

### Push

A method for sending telemetry where the app actively sends messages to a receiver.

## R

### Response code

A number that the server sends back to indicate whether the request was successful or not. For example, 200 means "OK", whilst 404 means "not found" and 500 means "server error".

### Role name (cloud role name)

Used to distinguish between different apps in the same Azure environment. This allows you to see data only for your app, even if there are many apps in the same Application Insights resource.

**Example:** The role name for your app is your app name (i.e. the repository name in Altinn Studio).

## S

### Sampling

Selecting only a portion of telemetry to be collected. This can reduce costs and data volume.

**Example:** Instead of storing information about every single request, you only store every tenth request, or only requests that take over 1 second.

### Span

A single operation in a trace. Each span represents an activity that takes time, for example an API call or a database query.

**Example:** In a trace showing the processing of a form, one span might be "validate form data" and another span might be "save to database".

### Stack trace

A detailed overview of which functions were called when the error occurred, which helps you find out exactly where the problem lies.

## T

### Telemetry

The information collected from instrumentation. This information can be retrieved in two ways: Pull (something asks the app for information) or Push (the app actively sends messages to a receiver).

**Example:** Your app continuously sends information about the number of logins per hour to Azure Application Insights.

### Trace

A collection of spans that shows the entire journey of a request through the system, from start to finish.

**Example:** When a user submits a form, the trace can show all the calls that were made: from frontend to backend, to the database, to external APIs, and back again.

### Traces

Detailed information about how a request flows through the system. Shows which services were called, how long each part took, and whether errors occurred.

## U

### userId

A unique ID for the person who is logged in to Altinn.

## W

### W3C Trace-Context

A standard that enables different systems to share trace data and understand the context between requests that span multiple services.

---
title: App Events
description: Overview on app events - what it is and how to use it
toc: false
tags: [translate-to-norwegian]
weight: 10
---

## Introduction
App Events is the support for [Altinn Events](/technology/solutions/altinn-platform/events/) within the application template, providing standard event functionality for the application developers.

The functionality provided within the template is:

1. __Pushing events__
   * Enabling of standard events through [configuration](/altinn-studio/reference/configuration/events#activate-generation-of-events-in-your-application)
   * Pushing custom events through [code](/altinn-studio/reference/configuration/events/#pushing-self-defined-events-into-your-application)
2. __Receiving events__
   * Subscribing to events
   * Validate subscription
   * Run custom code when receiving events

### Subscribing to events
[Subscring to events is descibed here](subscribing) 

### Validate subscriptions
Once the application succesfully have created a subscription, the Event Service will sende a ping event. It's a regular event with a specific type `platform.events.validatesubscription`. There is already a handler for this type registered and the validation should be done without further action required.

### Run custom code when receiving events
All inbound events are received through the EventsReceiverController on the route `/{org}/{app}/api/v1/eventsreceiver`. The controller uses `IEventHandlerResolver` interface to resolve the the class that should handle the event based on mapping the incoming event type to the EventType property on registered implementations of `IEventHandler`.

In order to handle an inbound event, all you have to do is two things:

1. Create an implementation of IEventHandler
2. Register your implementation in _Program.cs_ 

#### Create an implementation of IEventHandler   
In order to run your code when you receive an event, you need to create a class implementing the `IEventHandler` interface. `IEventHandler` is an interface that can have multiple implementations registered. The key to resolving the correct implementation is the event type which means you need to set the EventType property equal to the event type you want to handle. This is then matched against the event type of the incoming events, and the `ProcessEvent` method is invoked.  

Your implementation can of course have a constructor that takes in any registred service from the dependency injection container needed to handle the event. 

```csharp
    using Altinn.App.Core.Features;
    using Altinn.App.Core.Models;

    namespace Altinn.App.Core.Internal.Events
    {
        /// <summary>
        /// Implementation used to handled events that the Event system used to validate
        /// the events receiver endpoint.
        /// </summary>
        public class SubscriptionValidationHandler : IEventHandler
        {
            /// <inheritdoc/>
            public string EventType => "platform.events.validatesubscription";

            /// <inheritdoc/>
            public Task<bool> ProcessEvent(CloudEvent cloudEvent)
            {
                return Task.FromResult(true); 
            }
        }
    }
```
#### Register your implementation in _Program.cs_
Add your implementation of the IEventHandler interface in _Program.cs_ to allow the resolver to find it.
```csharp
services.AddTransient<IEventHandler, SubscriptionValidationHandler>();
```
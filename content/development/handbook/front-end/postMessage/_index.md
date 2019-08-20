---
title: Post Message
description: Guidelines for using post message functionality in Altinn Studio
tags: [development, front-end]
weight: 100
---

Window.postMessage() is introduced to handle communication between components that has no connection other then the need to communicate/trigger events.
Eg. its used to communicate with the syncBar to get it to perform a new status check.
To read more see: [Window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

### Usage
Dispatching a message event is done the following way:

```javascript
// variables should be used for messages
var SAVED_EVENT = 'SAVED'
window.postMessage(SAVED_EVENT, window.location.href);
```

Catching the event is done by adding an event listener to the component one needs to communicate with:

```javascript
  public componentDidMount() {
    window.addEventListener('message', this.eventThatShouldHappend);
  }

  public eventThatShouldHappend(){
     if (event.data === SAVED_EVENT){
       //Do necessary handling of correct message
     }
  }
```

When the commponent is unmounting the event listener should be removed:

```javascript
  public componentWillUnmount() {
    window.removeEventListener('message', this.eventThatShouldHappend);
  }
```

> Remember to create "message variables" that make sense when comparing different messages.
> Example: "SAVED_IN_UI_EDITOR", "SAVED_IN_OTHER_PLACE" or "FETCH_REPO_STATUS".

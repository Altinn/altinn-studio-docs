---
title: Async programming                 
description: Guidelines for asynchronous programming
tags: [development, asynchronous-programming]
weight: 100
---

The way our solution is built there is a large need for asynchrous functionality.
It is important for the development teams to be aware of best practices as well as 
which antipatterns to avoid.

## Best Practices

## Async Antipatterns

Keep an eye out for anti-patterns and help the team to maintain a high quality in our code base.

### Blocking on tasks with .Result

When an asynchronous call is needed in a synchronous method, the implementation below is quite common.
This use of `.Result` ties up the thread that could be doing other useful work, but even more serious
it might cause a deadlock.

Instead of implementations like this:

```cs
 public Party GetCurrentParty()
 {
     UserContext userContext = _userHelper.GetUserContext(HttpContext).Result;
     int userId = userContext.UserId;
     string cookieValue = Request.Cookies[_settings.GetAltinnPartyCookieName];
     int.TryParse(cookieValue, out int partyId);
     (...)
 }

```

Try using this:

```cs
 public async Party GetCurrentParty()
 {
    UserContext userContext = await _userHelper.GetUserContext(HttpContext);
    int userId = userContext.UserId;
    string cookieValue = Request.Cookies[_settings.GetAltinnPartyCookieName];
    int.TryParse(cookieValue, out int partyId);
    (...)
 }

```

Whenever in a method that needs to call an asynchronous method, make the method itself asynchronous.

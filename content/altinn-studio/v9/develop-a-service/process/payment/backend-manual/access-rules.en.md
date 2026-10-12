---
draft: true
hidden: true
tags: [needsReview]
---

The user making the payment needs authorisation for the `read`, `write`, `pay`, `confirm` and `reject` actions on the payment task.

The user needs `write` because the app stores and updates the payment information with the user's permissions while the payment task is in progress. The default policy that comes with the app gives the roles Private person (PRIV) and Managing director (DAGL) `read` and `write` for the whole app. If you give other roles or access packages access to the payment task, you must also give them `write` on the payment task.

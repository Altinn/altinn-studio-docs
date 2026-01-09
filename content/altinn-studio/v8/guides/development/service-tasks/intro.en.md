---
hidden: true
---

{{%notice info%}}
Service tasks require at least version 8.9.0 of the Altinn NuGet packages.
{{%/notice%}}

A service task is a process task that runs automatically on the server. As a general rule, the process moves on to the next step when it has finished running, but the service task can define this itself. Examples of standard service tasks include PDF generation and eFormidling.

Service owners can implement their own service tasks and add them as steps in the app's process.
---
title: What's new
description: Overview of changes introduced in version 7.
toc: true
---

## 7.0.0

### Features
- Simplified app template. Moste of the code is removed from app template and into nugets. Dependencies reduced from three to two.
- Possible to write separate code for when a task is abandoned. This was previously handeled in the same method as when a task was completed.
- Possible to write custom code for when a task i started. This code will be executed befor Altinns standard code.

### Bugfixes
- PDF generation now supports dynamic options in repeating groups
---
headless: true
hidden: true
---

{{%notice warning%}}
SMS notifications are not available in TT02 and other test environments. If used, this vil lead to a "notification failed"
status in the SigneeList component. The signee will still receive a message in their altinn inbox.
{{%/notice%}}

Authorization caching may cause delays in users seeing delegated forms in their Altinn inbox if they were logged in when delegation occurred. To avoid this, delegate access to a user not used in testing for the last hour.

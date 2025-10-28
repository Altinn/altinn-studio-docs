---
hidden: true
---

```json
{
  "apiScopes": {
    "users": {
      "read": "<ID-porten prefix>:[app].instances.read",
      "write": "<ID-porten prefix>:[app].instances.write",
      "errorMessageTextResourceKey": "authorization.scopes.insufficient"
    },
    "serviceOwners": {
      "read": "<ID-porten prefix>:[app]/serviceowner/instances.read",
      "write": "<ID-porten prefix>:[app]/serviceowner/instances.write",
      "errorMessageTextResourceKey": "authorization.scopes.insufficient"
    },
    "errorMessageTextResourceKey": "authorization.scopes.insufficient"
  }
}
```
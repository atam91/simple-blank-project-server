---
inject: true
to: app/constants/actions.js
before: "/// HERE Inject Actions Export ///"
---
    <%= h.changeCase.constantCase(name) %>_READ,
    <%= h.changeCase.constantCase(name) %>_CREATE,
    <%= h.changeCase.constantCase(name) %>_UPDATE,
    <%= h.changeCase.constantCase(name) %>_DELETE,

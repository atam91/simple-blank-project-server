---
inject: true
to: app/constants/rolesPermissions.js
before: "/// HERE Inject MutableCrudPermissions functions ///"
---
const <%= h.changeCase.camelCase(name) %> = genMutableCrudPermissions(
    [ ACTIONS.<%= h.changeCase.constantCase(name) %>_READ ],
    [
        ACTIONS.<%= h.changeCase.constantCase(name) %>_CREATE,
        ACTIONS.<%= h.changeCase.constantCase(name) %>_UPDATE,
        ACTIONS.<%= h.changeCase.constantCase(name) %>_DELETE,
    ]
);

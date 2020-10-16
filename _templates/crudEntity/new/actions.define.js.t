---
inject: true
to: app/constants/actions.js
before: "/// HERE Inject Actions Definition ///"
---
const <%= h.changeCase.constantCase(name) %>_READ = '<%= h.changeCase.snakeCase(name) %>_read';
const <%= h.changeCase.constantCase(name) %>_CREATE = '<%= h.changeCase.snakeCase(name) %>_create';
const <%= h.changeCase.constantCase(name) %>_UPDATE = '<%= h.changeCase.snakeCase(name) %>_update';
const <%= h.changeCase.constantCase(name) %>_DELETE = '<%= h.changeCase.snakeCase(name) %>_delete';

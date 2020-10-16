---
inject: true
to: app/routes/api.js
before: "/// HERE Inject Controller Routes ///"
---
<%
    camel = h.changeCase.camelCase(name)
    constant = h.changeCase.constantCase(name)
    pascal = h.changeCase.pascalCase(name)
%>/// <%= pascal %> ///
router.get('/admin/<%= camel %>', authed, checkPermission(ACTIONS.<%= constant %>_READ), <%= camel %>Controller.getList);
router.get('/admin/<%= camel %>/short', authed, checkPermission(ACTIONS.<%= constant %>_READ), <%= camel %>Controller.getShortItems);
router.post('/admin/<%= camel %>', authed, checkPermission(ACTIONS.<%= constant %>_CREATE), <%= camel %>Controller.createItem);
router.get('/admin/<%= camel %>/:id', authed, checkPermission(ACTIONS.<%= constant %>_READ), <%= camel %>Controller.getItem);
router.put('/admin/<%= camel %>/:id', authed, checkPermission(ACTIONS.<%= constant %>_UPDATE), <%= camel %>Controller.updateItem);
router.delete('/admin/<%= camel %>/:id', authed, checkPermission(ACTIONS.<%= constant %>_DELETE), <%= camel %>Controller.dropItem);

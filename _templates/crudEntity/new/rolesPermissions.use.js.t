---
inject: true
to: app/constants/rolesPermissions.js
before: "/// HERE Inject MutableCrudPermissions for ADMIN ROLE ///"
---
        ...<%= h.changeCase.camelCase(name) %>(true),
<%
    console.log();
    console.log('!!! Do not forget fix ACTIONS.' + h.changeCase.constantCase(name) + '_* in app/constants/rolesPermissions.js !!!');
    console.log();
%>
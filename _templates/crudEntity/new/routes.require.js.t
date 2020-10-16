---
inject: true
to: app/routes/api.js
before: "/// HERE Inject Controller Require ///"
---
const <%= h.changeCase.camelCase(name) %>Controller = require('../controllers/<%= h.changeCase.camelCase(name) %>');
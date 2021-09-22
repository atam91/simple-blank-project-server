# Simple Blank Project server
The part of [Simple Blank Project](https://github.com/atam91/simple-blank-project).

# About
Nodejs/Express Application server with simple admin CRUDs implementation which can be [fast generated](#code-generation) into extensible code snippets.
PostgreSQL/knex.js


# Project setup
[Create psql db instruction](/PREPARE_DB.md)

## Get dependencies
    npm install
    npm install -g pm2 knex

## Prepare local configs
    cp config/local{.example,}.js       ## OR       cp config/local{.prod,}.js
    cp knexfile{.example,}.js


# Project environment

## Migrations
    knex migrate:list
    knex migrate:make migration_name
    knex migrate:up
    knex migrate:down
    knex migrate:latest
    knex migrate:rollback
    knex migrate:rollback --all

### Seeds
    knex seed:make seed_name
    knex seed:run
    knex seed:run --specific=seed-filename.js


## Project startup
### Start dev through pm2
    pm2 start dev.config.js

### Start prod through pm2
    pm2 start prod.config.js



# Project structure

    /app - All Application code is here
        /constants - Some static data                       -- Domain Specific
        /controllers - Request handlers                     -- Handlers Adapters
        /middlewares - Request payload handlers             -- Adapters with bit of domain specific
        /models - Data models (DB layer)                    -- Domain Specific Primitives to interact with data layer
            /tables - DB Tables description                 -- Domain Specific
        /routes - Express Routes                            -- Some domain
        /services - High Level Logic                        -- Domain Specific
        /staticModels - Domain data models                  -- Domain Specific
        /utils  -   Non-project specific useful things
        app.js - Express Application
        knex.js - DB connection & QueryBuilder
    /bin - Executable scripts
        www - App's web server listening
    /config - App configuration
    /db  -   app domain details                             -- Domain Specific
        /migrations
        /seeds
    /logs


# Code Generation
    npm i -g hygen
    
    hygen crudEntity new %someNameEntities%

## Example CRUD generation
    hygen crudEntity new coldRivers
    
    git add -A && git status
    ## Changes to be committed:
        modified:   app/constants/actions.js            - Inject CRUD actions(permissions) definition
        modified:   app/constants/rolesPermissions.js   - Inject CRUD permissions to admin role
        new file:   app/controllers/coldRivers.js       - Add CRUD controller
        new file:   app/models/coldRivers.js            - Add Data model with collection primitives
        new file:   app/models/tables/coldRivers.js     - Add DB Table description
        modified:   app/routes/api.js                   - Inject CRUD Routes
        new file:   app/services/coldRivers.js          - Add Place for High Level App Logic

+ Do not forget create&apply migration: `knex migrate:make init_cold_rivers`


# Implementation examples
You can explore to see how collections can be extended:

| Collection \ Component |          Controller           |                             Service                                       |            Model                  |
|-----------------------:|:-----------------------------:|:-------------------------------------------------------------------------:|:---------------------------------:|
| Organizations          |                               | Organization restrictions                                                 | Patch Queries with filters        |
| Departments            | Proxy filter params for lists | Organization restrictions, extend form                                    | Patch Queries with filters, joins |
| Users                  | Proxy filter params for lists | Organization restrictions, extend form                                    | Patch Queries with filters, joins |
| UserGroups             | Proxy filter params for lists | Organization\Owner restrictions, extend form, interact with couple models | Patch Queries with filters, joins |

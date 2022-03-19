# Wiki.js V3 - DEVELOPMENT

[![Continuous Integration](https://github.com/Requarks/wiki-vnext/actions/workflows/build.yml/badge.svg)](https://github.com/Requarks/wiki-vnext/actions/workflows/build.yml)

The most powerful and extensible open source Wiki software.

🛑🛑🛑🛑🛑

> ⚠️ **WARNING** ⚠️
>
> **THIS IS AN UNSTABLE ALPHA VERSION, NOT FOR GENERAL USE.**  
> **DO NOT REPORT BUGS FOR THIS VERSION.**
>
> ➡️ See https://github.com/requarks/wiki for the latest stable version.

🛑🛑🛑🛑🛑

## Development Documentation

*These are early docs and may change / stop working at any time.*

### Requirements

- Node.js 16.x
- Yarn 3.x
- PostgreSQL 11

### Setup

This project is composed of 2 "sub-projects": `core` and `ux`.

- `core` is the GraphQL backend server *(port `11511`)*
- `ux` is the frontend Vue.js app *(port `80`)*

Both must run in order to load the app.

#### 1. Run `core`

> 📂 From the `/core` directory...

Create a `config.yml` file and enter the DB connection info to the PostgreSQL database, e.g.:

```yaml
db:
  host: localhost
  port: 5432
  user: postgres
  pass: postgres
  db: postgres

logLevel: debug
```

From a terminal, run:
```sh
yarn
yarn dev
```

#### 2. Run `ux`

> 📂 From the `/ux` directory...

From a second terminal, run:
```sh
yarn
yarn dev
```

#### 3. Load the app

Load http://localhost/ to access the app.

# Auth

## Documentation

- [Libraries](#libraries)
- [Features](#features)
- [Pre requisite](#pre-reqs)
- [Getting Started](#getting-started)

## Libraries

| Categories    | Libraries                                  |
| ------------- | ------------------------------------------ |
| Server        | [`Hono.js`](https://hono.dev/)             |
| Database      | [`Drizzle ORM`](https://orm.drizzle.team/) |
| Validations   | [`ZOD`](https://zod.dev/)                  |
| Logging       | [`Pino`](https://github.com/pinojs/pino)   |
| OPEN Api Spec | [`Scalar`](https://scalar.com/)            |

## Features

| Feature                      | Progress   |
| ---------------------------- | ---------- |
| Generate and Manage Sessions | Pending ⚠️ |
| Basic Authentication         | Pending ⚠️ |
| Email and Password Auth      | Pending ⚠️ |
| Email and Password - 2FA     | Pending ⚠️ |
| Magic Link                   | Pending ⚠️ |
| Google OAuth2                | Pending ⚠️ |
| Github OAuth2                | Pending ⚠️ |
| Rate Limiting                | Pending ⚠️ |
| Throttling                   | Pending ⚠️ |

## Pre-reqs

- Environment - Node.JS
- Editor - VSCode (Recommended)
- Database - MySQL (pre-configured) via Drizzle ORM (configure as per needs)

## Getting Started

### Clone the Repository

1. Install Dependencies

```bash
# recommended (pnpm)
# npm i -g pnpm

pnpm install
```

### Configure Environment

Create .env file by replicating .env.example and fill as per needs. To properly run this project, you will need to setup following variables to your .env file.

> Server

| key         | default value | available values                            |
| ----------- | ------------- | ------------------------------------------- |
| NODE_ENV    | `dev`         | `dev` `stage` `uat` `preprod` `prod` `test` |
| SERVER_PORT | `3000`        | `number`                                    |

> Logging

| key       | default value | available values                              |
| --------- | ------------- | --------------------------------------------- |
| LOG_LEVEL | `debug`       | `fatal` `error` `warn` `info` `debug` `trace` |

> Database

| key     | default value |
| ------- | ------------- |
| DB_HOST | `localhost`   |
| DB_PORT | `3306`        |
| DB_USER |               |
| DB_PASS |               |
| DB_NAME |               |

### Starting Application

```bash
pnpm dev
```

### Building

```bash
pnpm build
```

### Other Commands

```bash
pnpm <command>
```

| command    | description                              |
| ---------- | ---------------------------------------- |
| dev        | start hot-reload server                  |
| build      | build javascript source                  |
| start      | start application from javascript source |
| lint       | linting via eslint                       |
| lint:fix   | auto-fix linting issues                  |
| fmt        | auto-format via prettier                 |
| test       | test application                         |
| type-check | typecheck application without building   |

## Authors

- [@dhruvsaxena1998](https://github.com/dhruvsaxena1998)

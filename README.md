# BINV1110 - Cozy Corner Backend

## Introduction

This repository contains the backend source code for Cozy Corner, a furniture and home decor store. The goal of this project is to modernize the existing backend by implementing a modular, secure, and scalable REST API in TypeScript.

## How to start

The backend is developed in TypeScript and must be transpiled into JavaScript before execution.

### Transpilation TS->JS

To transpile the TypeScript code into JavaScript, run the following command in the root folder:

```bash
npm run build
```

This will generate a new folder `dist` containing the compiled JavaScript code. The command also watches for changes in the `src` folder and automatically updates the JS output.

### Execution

To start the development server, use:

```bash
npm run dev
```

This command runs the server in watch mode, automatically restarting it upon changes in the `dist` folder. To start the server without watch mode, use:

```bash
npm run start
```

## Architecture

The entry point of the backend is `src/main.ts`, which initializes the server and loads the necessary modules.

## Project Modules

The project is divided into five functional modules:
1. **Product Management** - Handles product listing, creation, updates, and deletion.
2. **Category Management** - Manages product categories and ensures proper linking with products.
3. **User Management** - Allows user registration, authentication, and role management.
4. **Customer Support** - Provides ticketing system for customer inquiries and support requests.
5. **Order Management** - Handles order creation, updates, and status changes.

## Dependencies

To install project dependencies, run:

```bash
npm install
```

## Database

The project uses SQLite as its database. A script is provided to set up the database schema.

---

# BINV1110 - Cozy Corner Backend

This repository contains the backend source code for Cozy Corner, a furniture and home decor store. The goal of this project is to modernize the existing backend by implementing a modular, secure, and scalable REST API in TypeScript.

project-web/
├── src/
│   ├── app.ts                      # Entry point for Express
│   ├── main.ts                     # Server startup
│   ├── db/
│   │   ├── database.ts             # SQLite connection configuration
│   │   └── index.ts                # Exports initDb
│   ├── controllers/
│   │   ├── admin.controllers.ts    # Admin product management
│   │   ├── category.controller.ts  # Category management
│   │   ├── order.controller.ts     # Order management
│   │   ├── product.controller.ts   # Product management
│   │   ├── tickets.controller.ts   # Ticket management
│   │   └── users.controller.ts     # User management
│   ├── models/
│   │   ├── category.model.ts       # Category types
│   │   ├── order.model.ts          # Order types
│   │   ├── product.model.ts        # Product types
│   │   ├── ticket.model.ts         # Ticket types
│   │   └── user.model.ts           # User types
│   ├── middlewares/
│   │   ├── auth.middleware.ts      # Authentication
│   │   └── validateCategoryIdParam.ts # ID validation
│   ├── routes/
│   │   ├── admin.routes.ts         # Admin routes
│   │   ├── category.routes.ts      # Category routes
│   │   ├── order.route.ts          # Order routes
│   │   ├── product.routes.ts       # Product routes
│   │   ├── ticket.routes.ts        # Ticket routes (new)
│   │   └── user.routes.ts          # User routes (new)
│   ├── services/
│   │   ├── category.service.ts     # Category business logic
│   │   ├── order.service.ts        # Order business logic
│   │   ├── product.services.ts     # Product business logic
│   │   ├── tickets.service.ts      # Ticket business logic
│   │   └── users.service.ts        # User business logic
│   ├── types/
│   │   └── express.d.ts            # Express type extensions
│   └── utils/
│       ├── guards.ts               # Data validation
│       └── utils.ts                # Utility functions
├── tsconfig.json
└── package.json

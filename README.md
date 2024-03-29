# Library Management System

## Technical Documentation

### Usage

#### Frontend

- Goto frontend repo.

- Running development server: `npm i && npm run dev`
- Server will start on http://localhost:5173/
- Running automated E2E test: `npm run test` (needs dev server running)

#### Backend

- Goto backend repo.
- Running development server: `docker compose up`
- Server will start on http://localhost:5123/
- API testing endpoint on http://localhost:5123/swagger

### Overview

This system is built upon a stack of JavaScript/TypeScript technologies. This approach enables unified development experience across both frontend and backend while helping developer productivity, maintainability, and the potential for future growth.

### Key Components

#### Backend

- Elysia: Structures a well-defined REST API framework for type safety and speed.
- Prisma: Provides type-safe database interactions and simplifies data modeling.
- SQLite: A lightweight file-based database for development and smaller deployments.
- Swagger: Documents API endpoints, promoting clarity and facilitating integration.

#### Frontend:

- React: Creates dynamic UIs through reusable components and efficient rendering.
- Tailwind CSS: Utility-first approach for rapid styling and customization.

- React Query: Handles data fetching, caching, and state synchronization with the backend.
- Zod: Ensures input data integrity and type safety through schema-based validation.

- Puppeteer: Enables end-to-end testing by simulating browser-based user interactions.

### Design Rationale

- Type Safety: TypeScript and Prisma together enhance code reliability and maintainability.
- Structure: Elysia enforces a well-organized backend architecture.
- Developer Experience: Choices prioritize streamlined development - reducing boilerplate and providing robust abstractions.
- Modularity: React's component-based approach promotes code reusability and a clean separation of concerns.
- Scalability Considerations: While the initial setup is optimized for a streamlined development experience, the system architecture is designed with potential growth in mind.

### Assumptions and Future Considerations

- Author Usage: Author is automatically created when a book is created if author with same name doesn't exist.
- Database Scaling: For production environments with very large datasets, consider migrating to a more robust database solution (e.g., PostgreSQL, MySQL).
- Search Optimization: For extensive book collections, explore indexing and integration with specialized search libraries.
- Security: Implement robust user authentication and authorization when user accounts become a system requirement.
- Enhanced Caching: Investigate additional caching strategies to improve performance under heavy load.
- Need proper error handling and log handling for production server.

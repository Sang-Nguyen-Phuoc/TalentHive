# Directory Details

## Frontend

### `components/`

- **Description:** Contains reusable React components

### `layouts/`

- **Description:** Contains layout components that define the structure of different pages.

### `pages/`

- **Description:** Contains the different pages of the application.

### `public/`

- **Description:** Contains static assets such as images, fonts, etc. These files can be accessed directly via the URL.

### `styles/`

- **Description:** Contains CSS styles for the application. The styles are written in modules and are imported into the components as alias `classes.<style-name>`. Attributes are named in kebab-case. (e.g. `button-primary`)'

### `utils/`

- **Description:** Contains utility functions that can be used across the application. These functions are written in pure JavaScript.

### `context/`

- **Description:** Contains the context API for the application. The context API is used to manage the global state of the application.

### `hooks/`

- **Description:** Contains custom hooks that can be used across the application. These hooks are written in React.

### `services/`

- **Description:** Contains the services that interact with the backend API. These services are written in JavaScript.

## Backend

### `middlewares/`

- **Description**: Contains middleware functions for the application, which handle tasks like authentication, error handling, and logging. Middleware functions process requests before they reach the controllers.

### `controllers/`

- **Description**: Holds the controller functions for each route, containing the core business logic. Controllers receive input from routes, interact with models if needed, and send back the appropriate responses.

### `routes/`

- **Root File**: `index.tsx`
- **Description**: Defines and organizes all API routes for the application. The `index.tsx` file acts as the root entry point, importing and consolidating individual route modules to create a complete API.

### `models/`

- **Description**: Contains data models and schema definitions for the database, often using an ORM or ODM. Models define the structure of data for different entities in the application, making it easier to interact with the database.

### `utils/`

- **Description**: Holds utility functions and helper modules that provide reusable code across the application. Utility functions can include formatting, validation, or any other common operations to avoid redundancy and improve code maintainability.

### `database/`

- **Description**: Contains database configuration files, connection setup, and other database-related code. This directory helps manage database connections, migrations, and other database operations.

## Coding Conventions

1. **File Naming:**

- Frontend:
  - **components:** PascalCase (Ex: `Button.jsx`).
  - **pages:** kebab-case (Ex: `about-us.jsx`).
  - **images:** kebab-case (Ex: `logo.png`).
  - **CSS Modules:** PascalCase (Ex: `Button.module.css`).
  - **Utility Functions:** camelCase (Ex: `formatDate.js`).
  - **Hooks:** camelCase (Ex: `useLocalStorage.js`).
  - **Context:** PascalCase (Ex: `AuthContext.js`).
- Backend:

  - **Middleware Functions:** camelCase (Ex: `authMiddleware.js`).
  - **Controllers:** camelCase (Ex: `userController.js`).
  - **Models:** camelCase (Ex: `userModel.js`).
  - **Services:** camelCase (Ex: `userService.js`).
  - **Routes:** camelCase (Ex: `userRoutes.js`).
  - **Utility Functions:** camelCase (Ex: `formatDate.js`).

- **Note:** All files should have the appropriate extension (`.js`, `.jsx`, `.ts`, `.tsx`, etc.).

2. **Component Structure:**

- Each component should have the following structure:
  1.  import section
  2.  main function return a JSX (arrow function, PascalCase)
  3.  export default
- In the main function, the JSX should be structured in the following way:
  1. States and Props initialization
  2. Event Handlers (supporting functions)
  3. return (JSX)

3. **General Coding Conventions:**

- **Environment Variables:** UPPERCASE (Ex: `.env`).
- **Constants and Enums:** UPPERCASE (Ex: `const API_URL = 'https://api.example.com'`).
- **Variables and Functions:** camelCase (Ex: `const userCount = 10`).

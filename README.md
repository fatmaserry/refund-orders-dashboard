# Refund Dashboard

## Overview
The **Refund Dashboard** is a web application designed to efficiently manage and track refund orders. It provides an interactive user interface with functionalities such as order status updates, decision management, and pagination for easy navigation.

## Features
- **Refund Orders List**: View a list of refund orders with detailed information.
- **Order Management**: Change refund decisions (Accept, Reject, Escalate) and toggle order activation status.
- **Search & Filter**: Quickly find specific refunds using search and filtering options.
- **Reusable Components**: Built with modular and reusable UI components such as buttons, tables, modals, and form inputs for consistency and maintainability.
- **Statistics Dashboard**: The home page features a statistics section displaying refund order insights, including totals, pending refunds, and decisions taken.
- **Order Details Page**: Users can view detailed information about each refund order, including items, amounts, and decisions.
- **Responsive Sidebar**: The sidebar navigation is fully responsive, ensuring a smooth experience across different devices.
- **Tailwind CSS Styling**: The UI is styled using Tailwind CSS for a modern, clean, and efficient design.
- **Pagination**: The refund orders list is paginated, displaying a maximum of 15 rows per page for better usability and performance.

## Prerequisites
Ensure you have the following installed before running the project:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [JSON Server](https://www.npmjs.com/package/json-server)

## Installation
Clone the repository and install dependencies:
```sh
# Clone the repository
git clone https://github.com/fatmaserry/Refund-dashboard.git
cd refund-dashboard

# Install dependencies
npm install  # or yarn install
```

## Running the Project
To start the development server, follow these steps:
1. Start the **JSON Server** for the mock API:
   ```sh
   npm run json-server
   ```

2. Start the React development server:
   ```sh
   npm start  # or yarn start
   ```

3. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## API Endpoints
The mock JSON server provides the following endpoints:

- **Fetch All Refund Orders**
  ```http
  GET /refunds
  ```
  Retrieves a list of all refund orders.

- **Fetch a Refund Order by ID**
  ```http
  GET /refunds/:id
  ```
  Retrieves a specific refund order by its ID.

- **Add a New Refund Order**
  ```http
  POST /refunds
  ```
  Adds a new refund order.

- **Update an Existing Refund Order**
  ```http
  PATCH /refunds/:id
  ```
  Updates an existing refund order with partial data.

## Folder Structure
```
### Key Directories
refund-dashboard/
├── src/
│   ├── components/      # UI Components (Reusable UI elements)
│   ├── api/             # API Functions
│   ├── pages/           # Main Page Components
│   ├── App.tsx          # Main App Component
│   ├── index.tsx        # Entry Point
│   ├── layout/          # Sidebar and Layout Components
│   ├── context/         # Manages context providers for shared state
│   ├── pages/           # Includes the main page components for different views
│   ├── types/           # Contains TypeScript interfaces and types.
├── public/
│   ├── index.html       # HTML Template
│   └── assets/          # Static Assets
├── db.json              # Mock JSON Database
├── package.json         # Dependencies & Scripts
```

## Contributing
Feel free to submit issues, feature requests, or contribute to this project by creating a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---
Happy coding! 🚀

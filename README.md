# Express.js Project with Role-Based Access Control

This is an Express.js project with a role-based access control (RBAC) system implemented using Mongoose and MongoDB. The project includes seeder files to set up initial roles, role permissions, and an admin user.

## Features
- User, Role, and RolePermission models to handle user management and access control
- Seeders to initialize default roles, permissions, and admin user
- Basic user authentication and authorization

## Prerequisites
- [Node.js and npm](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/syahrul35/login-api.git
   ```
   then
   ```bash
   cd login-api
   ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

## Running the Project
1. **Run Seeders:**

    ```bash
    npm run seed
    ```
    
    This will create:
    - Default roles (Admin, User, Guest)
    - Role permissions for each role and feature
    - An admin user with the following credentials:
      - **Username**: `admin`
      - **Password**: `admin1234`

2. **Start the development server:**
    ```bash
    npm run dev
    ```

3. **Access the server:**

    Open your browser or use a tool like Postman or Insomnia, and go to the following endpoint: `localhost:5000/api/`


## License
This project is licensed under the MIT License.

A simple RESTful API for managing personal notes with user authentication. Each user can register, log in, and manage their own notes. The API is built using Node.js, TypeScript, Express, and PostgreSQL.

**Features:**  
1. User registration
2. User login with JWT authentication
3. Create notes
4. View, edit, delete your own notes
5. Delete your user account

**API Endpoints:**   
- Auth:

**POST** /api/register - Register a new user  
**POST** /api/login - Log in a user (returns JWT token)  

- Users:

**GET** /api/user/:id - Get user by ID  
**DELETE** /api/user/:id - Delete a user  

- Notes:

**POST** /api/notes - Create a note (requires authentication)  
**GET** /api/notes - Get all notes for the authenticated user  
**GET** /api/notes/:id - Get a note   
**DELETE** /api/notes/:id - Delete a note (if it belongs to the user)  
**PATCH** /api/notes/:id - Edit a note  

**Authentication**  
After logging in, the user receives a JWT token. This token must be included in the headers of protected requests:  
Authorization: Bearer <your_token>

**Getting Started**  
npm i
tsc  
nodemon dist/main.js
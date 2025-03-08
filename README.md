Recipe Manager is a React-based application that allows users to add, update, and view recipes efficiently. It features light/dark mode support and integrates with a backend API to store and retrieve recipes.

Features
* View Recipes – Displays all stored recipes fetched from the backend.
* Add a New Recipe – Users can create a new recipe by clicking the "Add" button and filling out the form.
* Update Recipes – Clicking on a recipe card shows an "Update" button to modify existing data.
* Light/Dark Mode Support – UI adapts based on the selected theme.
* Backend Integration – Fetches and updates data using API calls.

## Installation & Setup
   * Prerequisites
    Ensure you have Node.js and npm installed.

## Tech Stack
  * Frontend: React.js, CSS
  * Backend: Node.js, Express.js
  * Database: MongoDB
  * API Requests: Axios

## API Endpoints
Method	 Endpoint	  Description
GET	    /recipes	  Fetch all recipes
POST	/recipes	  Add a new recipe
PUT	    /recipes/:id  Update an existing recipe

## UI Design
Light/Dark Mode: Uses inline styles and CSS variables to adjust the theme.
Dynamic UI: Shows/hides input fields based on user actions.

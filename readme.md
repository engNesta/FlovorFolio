# Recipe Book Project - LAB 1

## Project Overview

This project is a web application for storing, viewing, updating, and deleting recipes. It utilizes a Node.js backend with Express for server-side logic and MongoDB as the database for persisting recipe data. The frontend is a simple, dynamic web interface built with vanilla HTML, CSS, and JavaScript.

## Development Journey

### Initial Setup

- Signed up for MongoDB Atlas and set up a new cluster.
- Whitelisted my IP address for secure database access.
- Created a new database and collection for storing recipe data.

### Challenges Faced

- **Learning Curve**: Getting up to speed with Express and MongoDB was initially challenging.
- **CRUD Operations**: Implementing CRUD operations and understanding asynchronous JavaScript took some time, especially error handling and response statuses.
- **Frontend Integration**: Making the frontend dynamically display data from the backend involved learning about the Fetch API and DOM manipulation.
- **Git and GitHub**: Using multiple computers when building the application led to some conflicts a push issues, based on SSH keys and configurations.

### Tools Used

- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Frontend**: HTML, CSS, JavaScript
- **Development Tools**: Visual Studio Code, Postman for API testing
- **Version Control**: Git and GitHub

## Features

- View all recipes stored in the database
- Add new recipes through a web form
- Edit existing recipes
- Delete recipes
- Responsive web design for viewing on various devices

## Future Enhancements

- Implement user authentication and authorization.
- Introduce advanced search and filtering capabilities.
- Improve the UI/UX design.
- Develop a mobile app version of the Recipe Book.

## How to Run Locally

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up your `.env` file with your MongoDB connection string.
4. Start the server with `npm start`.
5. Open `localhost:5000` in your browser to view the app.

## Contributions

Contributions are welcome! If you have ideas for improvements or have found a bug, please open an issue or submit a pull request.

## License

[MIT](LICENSE)

# Simple Registration Form

This npm package provides a simple user registration and login functionality with validation for email addresses and passwords.

## Installation

You can install this package using npm:

```bash
npm install simpleregistrationform
```

## Usage

To use the registration and login functionality, import the module and call the respective functions:

```javascript
const { registerUser, userExists, loginUser } = require('simpleregistrationform');

// Register a new user
const registrationResult = registerUser('user@example.com', 'Password123', 'users.json');
console.log(registrationResult);

// Check if a user exists
const userExistsResult = userExists('user@example.com', 'users.json');
console.log(userExistsResult);

// Login with user credentials
const loginResult = loginUser('user@example.com', 'Password123', 'users.json');
console.log(loginResult);
```

## Features

- User registration with validation for email and password formats.
- Login functionality with validation for user credentials.
- Simple API for integrating registration and login functionality into Node.js applications.

## License

This project is licensed under the [MIT License](LICENSE).

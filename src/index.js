// simpleregistrationform.js

const fs = require('fs');
const { validateEmail, validatePassword } = require('simpleloginpwdform');

// Function to register a new user
function registerUser(email, password, dbPath) {
    let usersDB = {};

    // If a database file already exists, load it
    if (fs.existsSync(dbPath)) {
        const data = fs.readFileSync(dbPath, 'utf8');
        usersDB = JSON.parse(data);
    }

    // Validate email format
    if (!validateEmail(email)) {
        return { success: false, message: 'Invalid email address' };
    }

    // Validate password format
    if (!validatePassword(password)) {
        return { success: false, message: 'Invalid password format. Password must be at least 8 characters long and contain at least one number, one special character, one uppercase letter, and one lowercase letter' };
    }

    // Check if the user already exists in the database
    if (usersDB[email]) {
        return { success: false, message: 'User already exists' };
    }

    // If user does not exist and email/password format is valid, add them to the database
    usersDB[email] = { email, password };

    // Save the updated database to the specified path
    fs.writeFileSync(dbPath, JSON.stringify(usersDB));

    return { success: true, message: 'User registered successfully' };
}

// Function to check if a user exists in the database
function userExists(email, dbPath) {
    if (!fs.existsSync(dbPath)) {
        return false;
    }

    const data = fs.readFileSync(dbPath, 'utf8');
    const usersDB = JSON.parse(data);
    return !!usersDB[email];
}

// Function to validate user credentials during login
function loginUser(email, password, dbPath) {
    if (!fs.existsSync(dbPath)) {
        return { success: false, message: 'Database not found' };
    }

    const data = fs.readFileSync(dbPath, 'utf8');
    const usersDB = JSON.parse(data);

    // Validate email format
    if (!validateEmail(email)) {
        return { success: false, message: 'Invalid email address' };
    }

    // Validate password format
    if (!validatePassword(password)) {
        return { success: false, message: 'Invalid password format. Password must be at least 8 characters long and contain at least one number, one special character, one uppercase letter, and one lowercase letter' };
    }

    // Check if user exists in the database
    if (!usersDB[email]) {
        return { success: false, message: 'User does not exist' };
    }

    // Check if the password matches
    if (usersDB[email].password !== password) {
        return { success: false, message: 'Incorrect password' };
    }

    return { success: true, message: 'Login successful' };
}

// Export the registration functions
module.exports = { registerUser, userExists, loginUser };

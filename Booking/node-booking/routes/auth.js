const { Router } = require("express");
const { signService, loginService } = require('../service/auth')
const auth = Router(); // Correct way to initialize Router

// Define the route with the correct HTTP method and path
auth.post('/signup', signService); // Use '/' for the route path
auth.post('/login', loginService); // Use '/' for the route path

module.exports = auth;
const { json } = require("express");
const moment = require('moment')
const { signupController, findUserController, loginController,
    loginInsertControllers, loginEmailController,
    forgetpasswordController,
    sendEmail } = require("../controller/auth");
const jwt = require('jsonwebtoken');
const { config } = require("dotenv");
async function signService(req, res) {
    try {
        const reqBody = req.body;
        const columns = [
            ...Object.keys(reqBody)
        ];
        const values = [...Object.values(req.body)];
        const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
        const check = await findUserController(reqBody.name, reqBody.email)
        console.log("check: ", check);
        if (check) {
            return res.status(400).json({ message: "User already exists" });

        }
        // Add the new employee documents to the database
        const data = await signupController(columns, values, placeholders);
        console.log("data: ", data);
        return res.status(201).json(data); // Send response to the client


    } catch (error) {
        console.log("error: ", error);

    }
}

async function loginService(req, res) {
    try {
        const reqBody = req.body;
        // Correct typo in JWT expiration option and make sure it's defined
        const token = jwt.sign({ email: reqBody.email },
            process.env.JWT_TOKEN, { expiresIn: '1h' });

        // Define columns and values for database insertion
        // const columns = ['email', 'accesstoken'];  // We now store email and accessToken
        // const values = [reqBody.email, token];

        // const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

        // Check if the user exists and the password is correct
        const check = await loginController(reqBody.email, reqBody.password);
        if (!check) {
            return res.status(400).json({ message: "User does not exist" }); // Send response with a message object
        }

        // Add the new login entry to the database
        // const data = await loginInsertControllers(columns, values, placeholders);

        // Ensure you're returning the proper data (id, email, accessToken)
        return res.status(201).json({ email: reqBody.email, accessToken: token }); // Send id, email, and accessToken as a JSON object

    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({ message: "Internal Server Error" }); // Send generic error response
    }
}

async function forgetPasswordService(req, res) {
    try {
        const reqBody = req.body;
        const check = await loginEmailController(reqBody.email);
        if (!check) {
            return res.status(400).json({ message: "User does not exist" }); // Send response with a message object
        }
        const token = jwt.sign({ email: reqBody.email },
            process.env.JWT_TOKEN, { expiresIn: '1h' });

        const newExpireDate = moment().add(5, 'minute').toISOString();
        const columns = ['email', 'accesstoken', 'expiretime'];  // We now store email and accessToken
        const values = [reqBody.email, token, newExpireDate];

        const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

        await forgetpasswordController(columns, values, placeholders);
        const resetLink = `http://localhost:4001/reset-password?token=${token}`;

        await sendEmail(check.name, resetLink, reqBody.email)



        
        // Ensure jwt.you're returning the proper data (id, email, accessToken)
        return res.status(201).json({ message: "Email send successfully" }); // Send id, email, and accessToken as a JSON object

    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({ message: "Internal Server Error" }); // Send generic error response
    }
}

module.exports = {
    signService,
    loginService, forgetPasswordService
}
const { host, port } = require("pg/lib/defaults");
const pool = require("../Database");
const nodemailer = require('nodemailer')
async function signupController(columns, values, placeholders) {
    try {
        const queryText = `
      INSERT INTO signup (${columns.join(', ')})
      VALUES (${placeholders})
      RETURNING *;
    `;
        const result = await pool.query(queryText, values);
        console.log("result: ", result);
        return result.rows[0]; // Corrected to 'rows' instead of 'row'

    } catch (error) {
        console.log("error: ", error);
    }
}

async function loginController(email, password) {
    try {
        const queryText = `
       SELECT * from signup  WHERE  "email" = $1 AND  "password" = $2`;
        const result = await pool.query(queryText, [email, password]);
        return result.rows[0]; // Corrected to 'rows' instead of 'row'

    } catch (error) {
        console.log("error: ", error);
    }
}
async function loginEmailController(email) {
    try {
        const queryText = `
       SELECT * from signup  WHERE  "email" = $1 `;
        const result = await pool.query(queryText, [email]);
        return result.rows[0]; // Corrected to 'rows' instead of 'row'

    } catch (error) {
        console.log("error: ", error);
    }
}

async function loginInsertControllers(columns, values, placeholders) {
    try {
        const queryText = `
      INSERT INTO login (${columns.join(', ')})
      VALUES (${placeholders})
      RETURNING *;
    `;
        const result = await pool.query(queryText, values);
        return result.rows[0]; // Corrected to 'rows' instead of 'row'

    } catch (error) {
        console.log("error: ", error);
    }
}
async function findUserController(name, email) {
    try {
        const queryText = `
      SELECT * from signup WHERE "name" = $1 OR "email" = $2;
    `;
        const result = await pool.query(queryText, [name, email]);
        return result.rows[0]; // Corrected to 'rows' instead of 'row'

    } catch (error) {
        console.log("error: ", error);
    }
}
async function forgetpasswordController(columns, values, placeholders) {
    console.log("columns, values, placeholders: ", columns, values, placeholders);
    try {
        const queryText = `
      INSERT INTO resetPassword (${columns.join(', ')})
      VALUES (${placeholders})
      RETURNING *;`;
        const result = await pool.query(queryText, values);
        console.log("result: ", result);
        return result.rows[0]; // Corrected to 'rows' instead of 'row'

    } catch (error) {
        console.log("error: ", error);
    }
}
async function sendEmail(name, resetLink, to,) {
    try {
        // Create transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587, // 465
            secure: true,// Set to true if port is 465
            auth: {
                user: "mistusharma80@gmail.com", // Replace with your email
                pass: "xevx hipw zmlm wrnc", // Replace with your email password
            },
        });

        // Mail options
        const mailOptions = {
            from: 'mistusharma80@gmail.com', // Replace with your name and email
            to: to,
            subject: "Password Reset Request",
            html: `
              <p>Hi ${name},</p>
              <p>You requested to reset your password. Please click the link below to reset it:</p>
              <a href="${resetLink}" target="_blank">Reset Password</a>
              <p>If you did not request this, please ignore this email.</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to", to);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
}

module.exports = {
    signupController,
    findUserController,
    loginController,
    loginEmailController, forgetpasswordController,
    loginInsertControllers, sendEmail
};
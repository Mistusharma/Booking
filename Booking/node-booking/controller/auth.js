const { query } = require("express");
const { rows } = require("pg/lib/defaults");
const pool = require("../Database");

async function signupController(columns, values, placeholders) {
    try {
        const queryText = `
      INSERT INTO signup (${columns.join(', ')})
      VALUES (${placeholders})
      RETURNING *;
    `;
        const result = await pool.query(queryText, values);
        return result.rows[0]; // Corrected to 'rows' instead of 'row'

    } catch (error) {
        console.log("error: ", error);
    }
}

async function loginController(email, password) {
    try {
        const queryText = `
       SELECT * from signup  WHERE  "email" = $1 AND  "password" = $2;`;
        const result = await pool.query(queryText, [email, password]);
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
async function findUserController( email) {
    try {
        const queryText = `
      SELECT * from signup WHERE  "email" = $1;
    `;
        const result = await pool.query(queryText, [ email]);
        return result.rows[0]; // Corrected to 'rows' instead of 'row'

    } catch (error) {
        console.log("error: ", error);
    }
}



module.exports = { signupController, findUserController, loginController, loginInsertControllers };
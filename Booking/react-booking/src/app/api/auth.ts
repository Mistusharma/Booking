import axios from 'axios';
export const signUp = async (userData: { name: string; email: string; password: string }) => {
    try {
        const response = await axios.post(`http://localhost:4000/auth/signup`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
       console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        throw error; // Re-throw error for handling in Signup component
    }
};

export const login = async (
    userData: { email: string; password: string }) => {
    try {
        const response = await axios.post(`http://localhost:4000/auth/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        throw error; // Re-throw error for handling in Signup component
    }
};



export const forgetpassword = async (
    userData: { email: string}) => {
    try {
        const response = await axios.post(`http://localhost:4000/auth/forgetPassword`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        throw error; // Re-throw error for handling in Signup component
    }
};

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; // for navigation to the login page
import { signUp } from '../api/auth'
import '../style/signup.css'; // Import the CSS file

export function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !email || !password) {
            setError('Please fill out all fields.');
            return;
        }

        setLoading(true);
        try {
            const data = await signUp({ name, email, password });
            console.log("data: ", data);
            // If successful, navigate to the login page
            navigate('/login');
        } catch (error: any) {
            console.log("error: ", error.response.data.message);
            setError(error.response.data.message|| 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="error-message" >{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;

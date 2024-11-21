import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/signup.css"; // Reusing the same CSS file for consistency
import { login } from "../api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await login({ email, password });
      console.log("data: ", data);
      // If successful, navigate to the login page
      navigate("/");
    } catch (error: any) {
      console.log("error: ", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
        <p>
          <a href="/forget-password">forget password</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

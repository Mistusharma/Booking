import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgetpassword } from '../api/auth';
import useSweetAlert from '../components/alert';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const showAlert = useSweetAlert();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);
    try {
      const data = await forgetpassword({ email });
      console.log('data: ', data);

      // Show success alert
      showAlert({
        title: 'Success',
        text: 'Email sent successfully!',
        icon: 'success',
      });

      // // Navigate to login page
      // navigate('/');
    } catch (error: any) {
      console.log('error: ', error);
      setError(error.message || 'Something went wrong. Please try again.');

      // Show error alert
      showAlert({
        title: 'Error',
        text: error.message || 'Something went wrong. Please try again.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Forget Password</h2>
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
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Reset'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default ForgetPassword;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email);
    navigate('/users');
  };

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="mt-2 text-muted">
              Enter your email to access your account.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="font-medium">
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}

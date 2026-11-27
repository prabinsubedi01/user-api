
import { Link, useParams } from 'react-router-dom';
import { USERS } from './Users.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';

export default function UserDetail() {
  const { id } = useParams();
  const user = USERS.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">User not found</h1>
        <Link to="/users" className="text-primary hover:underline">
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">User Details</h1>

      <Card>
        <h2 className="text-2xl font-semibold">{user.name}</h2>

        <p className="mt-3 text-muted">
          Email: {user.email}
        </p>

        <p className="mt-2 text-muted">
          User ID: {user.id}
        </p>

        <div className="mt-6">
          <Link to="/users">
            <Button variant="secondary">Back to Users</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

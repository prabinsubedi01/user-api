import { Link, useParams } from 'react-router-dom';
import { USERS } from './Users.jsx';

export default function UserDetail() {
  const { id } = useParams();
  const user = USERS.find((u) => u.id === Number(id));

  if (!user) return <p>User not found. <Link to="/users">Back</Link></p>;

  return (
    <>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <Link to="/users">Back to users</Link>
    </>
  );
}
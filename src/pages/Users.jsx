
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import Card from '../components/ui/Card.jsx';

export const USERS = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com' },
  { id: 2, name: 'Sita Thapa', email: 'sita@example.com' },
  { id: 3, name: 'Ram Gurung', email: 'ram@example.com' },
];

export default function Users() {
  const [search, setSearch] = useLocalStorage('userSearch', '');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const filtered = USERS.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="mt-2 text-muted">
          Search and manage application users.
        </p>
      </div>

      <p className="text-sm text-muted">
        Viewport width: {width}px
      </p>

      <input
        type="search"
        placeholder="Search users..."
        aria-label="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary sm:max-w-md"
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6">
        {filtered.map((u) => (
          <Card key={u.id}>
            <h2 className="text-xl font-semibold">{u.name}</h2>

            <p className="mt-2 text-muted">{u.email}</p>

            <Link
              to={`/users/${u.id}`}
              className="mt-4 inline-block font-medium text-primary hover:underline"
            >
              View Details →
            </Link>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted">No users found.</p>
      )}
    </div>
  );
}

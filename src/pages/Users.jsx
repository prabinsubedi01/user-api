
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

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
    <>
      <h1>Users</h1>

      <p>Viewport width: {width}px</p>

      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filtered.map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

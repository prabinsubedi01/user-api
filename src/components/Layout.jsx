import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Layout() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink> <NavLink to="/users">Users</NavLink>{' '}
          {user ? <button onClick={logout}>Logout ({user.name})</button> : <NavLink to="/login">Login</NavLink>}
          <button onClick={toggle} aria-label="Toggle theme">{theme === 'dark' ? '☀️' : '🌙'}</button>
        </nav>
      </header>
      <main><Outlet /></main>
    </>
  );
}

import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Button from './ui/Button.jsx';

export default function Layout() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();

  const linkStyle = ({ isActive }) =>
    `font-medium transition hover:text-primary ${
      isActive ? 'text-primary' : 'text-fg'
    }`;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="border-b border-line bg-surface">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <NavLink to="/" className="text-xl font-bold text-primary">
            Book Store
          </NavLink>

          <div className="flex flex-wrap items-center gap-4">
            <NavLink to="/" className={linkStyle}>
              Home
            </NavLink>

            <NavLink to="/users" className={linkStyle}>
              Users
            </NavLink>

            {user ? (
              <Button variant="secondary" onClick={logout}>
                Logout ({user.name})
              </Button>
            ) : (
              <NavLink to="/login" className={linkStyle}>
                Login
              </NavLink>
            )}

            <Button variant="secondary" onClick={toggle}>
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

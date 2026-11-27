
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg">
      <Card className="space-y-4 text-center">
        <h1 className="text-5xl font-bold text-primary">404</h1>

        <h2 className="text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="text-muted">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </Card>
    </div>
  );
}

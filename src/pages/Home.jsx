
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      title: 'Manage Users',
      description: 'View and search users in one place.',
    },
    {
      title: 'User Details',
      description: 'View individual user information easily.',
    },
    {
      title: 'Easy Navigation',
      description: 'Move between pages using simple navigation.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-surface p-8 md:flex-row md:p-12">
        <div className="max-w-xl space-y-4">
          <p className="font-semibold text-primary">
            Welcome to Book Store
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Manage your users easily.
          </h1>

          <p className="text-lg text-muted">
            A simple and responsive application built with React and Tailwind CSS.
          </p>

          <Link to="/users">
            <Button>View Users</Button>
          </Link>
        </div>

        <div className="text-8xl" aria-hidden="true">
          📚
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Our Features</h2>
          <p className="mt-2 text-muted">
            Explore what you can do with this application.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-muted">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

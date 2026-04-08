import Link from "next/link";

const actions = [
  {
    href: "/user-list",
    title: "User List",
    copy: "Browse paginated users and add new records.",
  },
  {
    href: "/trip-tracker",
    title: "Trip Tracker",
    copy: "Explore expenses, filter by trip, and sync with Google Sheets.",
  },
];

export default function HomePage() {
  return (
    <main className="home-shell">
      <section className="home-card">
        <span className="home-eyebrow">Next.js App Router</span>
        <h1 className="home-title">Main Dashboard</h1>
        <p className="home-copy">
          The app now uses file-based routing, built-in SSR support, and a
          setup ready to scale further on Next.js.
        </p>

        <div className="home-actions">
          {actions.map((action) => (
            <Link key={action.href} href={action.href} className="home-action">
              <span className="home-action-title">{action.title}</span>
              <span className="home-action-copy">{action.copy}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container page-section empty-state">
      <span className="eyebrow">404 ERROR</span>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>

      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
}
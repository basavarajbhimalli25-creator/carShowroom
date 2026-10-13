import { Link } from "react-router-dom";
import { CarFront } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Link to="/" className="brand footer-brand">
          <CarFront size={28} />
          <span>AutoElite</span>
        </Link>

        <p>
          Discover your next drive with confidence.
        </p>

        <p>© {new Date().getFullYear()} AutoElite. All rights reserved.</p>
      </div>
    </footer>
  );
}
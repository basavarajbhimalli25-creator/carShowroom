import { NavLink } from "react-router-dom";
import { CarFront, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  const links = [
    { path: "/", label: "Home" },
    { path: "/cars", label: "Cars" },
    { path: "/categories", label: "Categories" },
    { path: "/bookings", label: "Bookings" },
    { path: "/customers", label: "Customers" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <CarFront size={30} />
        <span>AutoElite</span>
      </NavLink>

      <nav className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-actions">
        <NavLink to="/profile" className="profile-link">
          Profile
        </NavLink>

        <button
          className="theme-button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
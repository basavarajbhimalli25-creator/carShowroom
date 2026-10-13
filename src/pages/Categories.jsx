import { Link, Outlet } from "react-router-dom";

const categories = [
  {
    name: "SUV",
    description: "Spacious vehicles for family travel and adventure.",
  },
  {
    name: "Sedan",
    description: "Comfortable and refined cars for everyday journeys.",
  },
  {
    name: "Luxury",
    description: "Premium vehicles with sophisticated styling.",
  },
  {
    name: "Electric",
    description: "Discover modern electric mobility.",
  },
];

export default function Categories() {
  return (
    <section className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">EXPLORE BY TYPE</span>
        <h1>Car Categories</h1>
        <p>Choose a category to discover your next vehicle.</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.name}
            className="category-card"
          >
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <span>Explore category →</span>
          </Link>
        ))}
      </div>

      <Outlet />
    </section>
  );
}
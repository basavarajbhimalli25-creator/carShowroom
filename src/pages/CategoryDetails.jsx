import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CarCard from "../components/CarCard";

export default function CategoryDetails() {
  const { category } = useParams();

  const cars = useSelector((state) => state.cars);

  const normalizedCategory = decodeURIComponent(category || "");

  const filteredCars = cars.filter(
    (car) =>
      car.category.toLowerCase() === normalizedCategory.toLowerCase()
  );

  return (
    <div className="category-results">
      <h2>{normalizedCategory} Cars</h2>

      {filteredCars.length ? (
        <div className="car-grid">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No cars are available in this category yet.</p>
          <Link to="/cars" className="btn btn-primary">
            View All Cars
          </Link>
        </div>
      )}
    </div>
  );
}
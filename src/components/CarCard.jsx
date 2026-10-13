import { Link } from "react-router-dom";
import { Fuel, Settings2, ArrowUpRight } from "lucide-react";

export default function CarCard({ car, onDelete }) {
  return (
    <article className="car-card">
      <div className="car-image-wrap">
        <img src={car.image} alt={car.name} />

        <span className="car-category">{car.category}</span>
      </div>

      <div className="car-card-content">
        <h3>{car.name}</h3>
        <p className="car-brand">{car.brand}</p>

        <div className="car-meta">
          <span>
            <Fuel size={15} /> {car.fuel}
          </span>

          <span>
            <Settings2 size={15} /> {car.transmission}
          </span>
        </div>

        <div className="car-card-footer">
          <div>
            <strong>
              ₹{(car.price / 100000).toFixed(2)} Lakh
            </strong>

            <small>{car.year} Model</small>
          </div>

          <Link
            to={`/cars/${car.id}`}
            className="icon-link"
            aria-label={`View ${car.name}`}
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>

        {onDelete && (
          <button
            className="btn btn-danger"
            onClick={() => onDelete(car.id)}
          >
            Delete Car
          </button>
        )}
      </div>
    </article>
  );
}
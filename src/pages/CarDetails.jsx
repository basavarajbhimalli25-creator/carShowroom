import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  Fuel,
  Settings2,
  Users,
} from "lucide-react";

export default function CarDetails() {
  const { id } = useParams();

  const car = useSelector((state) =>
    state.cars.find((item) => item.id === Number(id))
  );

  if (!car) {
    return (
      <section className="container page-section empty-state">
        <h1>Car not found</h1>
        <p>The requested vehicle does not exist in the inventory.</p>
        <Link to="/cars" className="btn btn-primary">
          Browse Cars
        </Link>
      </section>
    );
  }

  return (
    <section className="container page-section">
      <Link to="/cars" className="back-link">
        <ArrowLeft size={18} /> Back to Cars
      </Link>

      <div className="details-layout">
        <div className="details-image">
          <img src={car.image} alt={car.name} />
        </div>

        <div className="details-content">
          <span className="eyebrow">{car.category} COLLECTION</span>
          <h1>{car.name}</h1>
          <p>{car.description || "Explore this vehicle at AutoElite."}</p>

          <h2 className="details-price">
            ₹{(car.price / 100000).toFixed(2)} Lakh
          </h2>

          <div className="spec-grid">
            <div>
              <Fuel />
              <span>Fuel</span>
              <strong>{car.fuel}</strong>
            </div>

            <div>
              <Settings2 />
              <span>Transmission</span>
              <strong>{car.transmission}</strong>
            </div>

            <div>
              <Users />
              <span>Seats</span>
              <strong>{car.seats || 5}</strong>
            </div>
          </div>

          <p><strong>Brand:</strong> {car.brand}</p>
          <p><strong>Model year:</strong> {car.year}</p>

          <Link
            to={`/bookings?car=${encodeURIComponent(car.name)}`}
            className="btn btn-primary"
          >
            Book a Test Drive
          </Link>
        </div>
      </div>
    </section>
  );
}
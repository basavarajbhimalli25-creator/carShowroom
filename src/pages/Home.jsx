import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  CarFront,
  ShieldCheck,
  Headphones,
  Gauge,
} from "lucide-react";

export default function Home() {
  const cars = useSelector((state) => state.cars);

  const featuredCars = cars.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>

          <h1>
            Find Your
            <br />
            <span>Perfect Drive.</span>
          </h1>

          <p>
            Discover premium cars, compare your favorites, and
            experience a better way to buy your next vehicle.
          </p>

          <div className="hero-actions">
            <Link to="/cars" className="btn btn-primary">
              Explore Cars <ArrowRight size={18} />
            </Link>

            <Link to="/about" className="btn btn-outline">
              About Us
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{cars.length}+</strong>
              <span>Available Cars</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Customer Focus</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Online Access</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85"
            alt="Premium car"
          />

          <div className="floating-card">
            <CarFront size={26} />
            <div>
              <strong>Premium Collection</strong>
              <span>Find a car that fits your life.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="section-heading">
          <span className="eyebrow">WHY AUTOELITE</span>
          <h2>A better way to find your car</h2>
          <p>Everything you need for a confident car-buying journey.</p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <CarFront size={30} />
            <h3>Premium Collection</h3>
            <p>Explore sedans, SUVs, luxury vehicles, and electric cars.</p>
          </article>

          <article className="feature-card">
            <ShieldCheck size={30} />
            <h3>Trusted Experience</h3>
            <p>Review vehicle details and make informed decisions.</p>
          </article>

          <article className="feature-card">
            <Headphones size={30} />
            <h3>Customer Support</h3>
            <p>Contact our showroom team for help with your next vehicle.</p>
          </article>

          <article className="feature-card">
            <Gauge size={30} />
            <h3>Easy Comparison</h3>
            <p>Compare prices and specifications in one place.</p>
          </article>
        </div>
      </section>

      <section className="container featured-section">
        <div className="section-heading heading-row">
          <div>
            <span className="eyebrow">OUR COLLECTION</span>
            <h2>Featured vehicles</h2>
          </div>

          <Link to="/cars" className="text-link">
            View All Cars <ArrowRight size={17} />
          </Link>
        </div>

        <div className="car-grid">
          {featuredCars.map((car) => (
            <article className="car-card" key={car.id}>
              <img src={car.image} alt={car.name} />

              <div className="car-card-content">
                <span className="car-category">{car.category}</span>
                <h3>{car.name}</h3>

                <div className="car-meta">
                  <span>{car.year}</span>
                  <span>{car.fuel}</span>
                  <span>{car.transmission}</span>
                </div>

                <div className="car-card-footer">
                  <strong>
                    ₹{(car.price / 100000).toFixed(2)} Lakh
                  </strong>

                  <Link
                    to={`/cars/${car.id}`}
                    className="icon-link"
                    aria-label={`View ${car.name}`}
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
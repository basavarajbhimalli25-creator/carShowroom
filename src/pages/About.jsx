import { ShieldCheck, Users, Award } from "lucide-react";

export default function About() {
  return (
    <section className="container page-section">
      <div className="about-layout">
        <div>
          <span className="eyebrow">ABOUT AUTOELITE</span>

          <h1>
            Driven by quality.
            <br />
            Built around you.
          </h1>

          <p>
            AutoElite is a car showroom management application
            designed to make exploring vehicles and arranging test
            drives simple and convenient.
          </p>

          <p>
            From everyday sedans to premium SUVs and electric cars,
            our platform brings vehicle information and appointment
            management together in one modern interface.
          </p>
        </div>

        <img
          className="about-image"
          src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1200&q=80"
          alt="Car showroom"
        />
      </div>

      <div className="feature-grid about-features">
        <article className="feature-card">
          <ShieldCheck size={30} />
          <h3>Transparency</h3>
          <p>Clear vehicle information and straightforward pricing.</p>
        </article>

        <article className="feature-card">
          <Users size={30} />
          <h3>Customer First</h3>
          <p>A customer-focused approach to vehicle discovery.</p>
        </article>

        <article className="feature-card">
          <Award size={30} />
          <h3>Quality</h3>
          <p>A professional digital experience for every visitor.</p>
        </article>
      </div>
    </section>
  );
}
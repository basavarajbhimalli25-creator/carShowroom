import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      return;
    }

    setSuccess(
      "Thank you! Your message has been validated successfully."
    );

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <section className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">GET IN TOUCH</span>
        <h1>Let's talk cars.</h1>
        <p>Have a question? Our showroom team is ready to help.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div>
            <MapPin />
            <h3>Visit Us</h3>
            <p>AutoElite Showroom, Karnataka, India</p>
          </div>

          <div>
            <Phone />
            <h3>Call Us</h3>
            <p>+91 98765 43210</p>
          </div>

          <div>
            <Mail />
            <h3>Email Us</h3>
            <p>support@autoelite.example</p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Send a message</h2>

          {success && <p className="success-message">{success}</p>}

          <input
            placeholder="Your full name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
            required
          />

          <textarea
            placeholder="How can we help?"
            rows="5"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            required
          />

          <button className="btn btn-primary" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
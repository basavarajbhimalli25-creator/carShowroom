import { useState } from "react";
import { Search } from "lucide-react";

import useFetchData from "../hooks/useFetchData";

export default function Customers() {
  const { data, loading, error } = useFetchData(
    "https://dummyjson.com/users?limit=30"
  );

  const [search, setSearch] = useState("");

  const customers = data.filter((customer) =>
    `${customer.firstName} ${customer.lastName} ${customer.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">CUSTOMER DIRECTORY</span>
        <h1>Our Customers</h1>
        <p>Customer information loaded from an external API.</p>
      </div>

      <label className="search-box customer-search">
        <Search size={20} />

        <input
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      {loading && <p className="loading">Loading customers...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="customer-grid">
          {customers.map((customer) => (
            <article className="customer-card" key={customer.id}>
              <img
                src={customer.image}
                alt={`${customer.firstName} ${customer.lastName}`}
              />

              <h3>
                {customer.firstName} {customer.lastName}
              </h3>

              <p>{customer.email}</p>
              <p>{customer.phone}</p>
              <span>{customer.address?.city || "City unavailable"}</span>
            </article>
          ))}

          {customers.length === 0 && (
            <p>No matching customers found.</p>
          )}
        </div>
      )}
    </section>
  );
}
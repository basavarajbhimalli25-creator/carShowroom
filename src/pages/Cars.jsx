import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Plus, Search, X } from "lucide-react";

import CarCard from "../components/CarCard";
import { addCar, deleteCar } from "../redux/carSlice";

const emptyForm = {
  name: "",
  brand: "",
  category: "SUV",
  price: "",
  year: "2026",
  fuel: "Petrol",
  transmission: "Automatic",
  image: "",
  description: "",
};

export default function Cars() {
  const cars = useSelector((state) => state.cars);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const nameRef = useRef(null);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const page = Math.max(
    1,
    Number.parseInt(searchParams.get("page") || "1", 10) || 1
  );

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = `${car.name} ${car.brand}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || car.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [cars, search, category]);

  const pageSize = 6;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCars.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleCars = filteredCars.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function updateQuery(key, value) {
    const next = new URLSearchParams(searchParams);

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    next.set("page", "1");
    setSearchParams(next);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.brand.trim()) {
      setError("Please enter both the car name and brand.");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      setError("Enter a valid car price.");
      return;
    }

    dispatch(
      addCar({
        ...form,
        price: Number(form.price),
        year: Number(form.year),
        image:
          form.image.trim() ||
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
        seats: 5,
      })
    );

    setForm(emptyForm);
    setError("");
    setShowForm(false);
    setSearchParams({});
  }

  function openForm() {
    setShowForm(true);

    setTimeout(() => {
      nameRef.current?.focus();
    }, 0);
  }

  return (
    <section className="container page-section">
      <div className="page-heading">
        <div>
          <span className="eyebrow">EXPLORE INVENTORY</span>
          <h1>Our Cars</h1>
          <p>Discover the right vehicle for your lifestyle.</p>
        </div>

        <button className="btn btn-primary" onClick={openForm}>
          <Plus size={18} /> Add New Car
        </button>
      </div>

      <div className="filter-bar">
        <label className="search-box">
          <Search size={20} />

          <input
            value={search}
            onChange={(event) =>
              updateQuery("search", event.target.value)
            }
            placeholder="Search by car or brand..."
          />
        </label>

        <select
          value={category}
          onChange={(event) =>
            updateQuery(
              "category",
              event.target.value === "All" ? "" : event.target.value
            )
          }
          aria-label="Filter by category"
        >
          <option>All</option>
          <option>SUV</option>
          <option>Sedan</option>
          <option>Luxury</option>
          <option>Electric</option>
        </select>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-title">
            <h2>Add a new car</h2>

            <button
              type="button"
              className="icon-button"
              onClick={() => setShowForm(false)}
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="form-grid">
            <input
              ref={nameRef}
              placeholder="Car name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              placeholder="Brand"
              value={form.brand}
              onChange={(e) =>
                setForm({ ...form, brand: e.target.value })
              }
              required
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option>SUV</option>
              <option>Sedan</option>
              <option>Luxury</option>
              <option>Electric</option>
            </select>

            <input
              type="number"
              min="1"
              placeholder="Price in rupees"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
            />

            <input
              type="number"
              min="1990"
              max="2035"
              placeholder="Model year"
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: e.target.value })
              }
              required
            />

            <select
              value={form.fuel}
              onChange={(e) =>
                setForm({ ...form, fuel: e.target.value })
              }
            >
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>Hybrid</option>
            </select>

            <select
              value={form.transmission}
              onChange={(e) =>
                setForm({ ...form, transmission: e.target.value })
              }
            >
              <option>Automatic</option>
              <option>Manual</option>
            </select>

            <input
              type="url"
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
            />
          </div>

          <textarea
            placeholder="Car description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button className="btn btn-primary" type="submit">
            Save Car
          </button>
        </form>
      )}

      <p className="result-count">
        Showing {visibleCars.length} of {filteredCars.length} cars
      </p>

      {visibleCars.length ? (
        <div className="car-grid">
          {visibleCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onDelete={(id) => {
                if (window.confirm("Delete this car?")) {
                  dispatch(deleteCar(id));
                }
              }}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No cars found</h2>
          <p>Try another search or choose a different category.</p>
        </div>
      )}

      {filteredCars.length > pageSize && (
        <div className="pagination">
          <button
            className="btn btn-outline"
            disabled={currentPage === 1}
            onClick={() =>
              updateQuery("page", String(currentPage - 1))
            }
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline"
            disabled={currentPage === totalPages}
            onClick={() =>
              updateQuery("page", String(currentPage + 1))
            }
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Bookings.css";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  CalendarDays,
  CarFront,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import {
  addBooking,
  updateBooking,
  deleteBooking,
  updateBookingStatus,
} from "../redux/bookingSlice";

import "./Bookings.css";

const initialForm = {
  customerName: "",
  email: "",
  phone: "",
  carId: "",
  bookingDate: "",
  amount: "",
  status: "Pending",
};

function Bookings() {
  const dispatch = useDispatch();

  const bookings = useSelector(
    (state) => state.bookings?.bookings ?? []
  );

  const cars = useSelector(
    (state) => state.cars?.cars ?? []
  );

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const filteredBookings = useMemo(() => {
    const query = search.toLowerCase().trim();

    return bookings.filter((booking) => {
      const car = cars.find(
        (item) => String(item.id) === String(booking.carId)
      );

      return [
        booking.customerName,
        booking.email,
        booking.phone,
        booking.status,
        car?.name,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      );
    });
  }, [bookings, cars, search]);

  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function openAddForm() {
    setEditingId(null);
    setForm(initialForm);
    setShowForm(true);
  }

  function openEditForm(booking) {
    setEditingId(booking.id);

    setForm({
      customerName: booking.customerName ?? "",
      email: booking.email ?? "",
      phone: booking.phone ?? "",
      carId: booking.carId ? String(booking.carId) : "",
      bookingDate: booking.bookingDate ?? "",
      amount: booking.amount ?? "",
      status: booking.status ?? "Pending",
    });

    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(initialForm);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const bookingData = {
      ...form,
      carId: form.carId,
      amount: Number(form.amount),
    };

    if (editingId !== null) {
      dispatch(
        updateBooking({
          id: editingId,
          ...bookingData,
        })
      );
    } else {
      dispatch(
        addBooking({
          id: Date.now(),
          ...bookingData,
          createdAt: new Date().toISOString(),
        })
      );
    }

    closeForm();
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (confirmed) {
      dispatch(deleteBooking(id));
    }
  }

  function handleStatusChange(id, status) {
    dispatch(
      updateBookingStatus({
        id,
        status,
      })
    );
  }

  function getCarName(carId) {
    const car = cars.find(
      (item) => String(item.id) === String(carId)
    );

    return car?.name ?? `Car #${carId || "N/A"}`;
  }

  return (
    <section className="bookings-page">
      <div className="bookings-header">
        <div>
          <span className="bookings-eyebrow">AUTOELITE MANAGEMENT</span>
          <h1>Bookings Management</h1>
          <p>Manage customer bookings and vehicle reservations.</p>
        </div>

        <button className="booking-primary-btn" onClick={openAddForm}>
          <Plus size={19} />
          Add Booking
        </button>
      </div>

      <div className="booking-stats">
        <div className="booking-stat-card">
          <div className="booking-stat-icon purple">
            <CalendarDays size={23} />
          </div>
          <div>
            <p>Total Bookings</p>
            <h2>{totalBookings}</h2>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon green">
            <CheckCircle size={23} />
          </div>
          <div>
            <p>Confirmed</p>
            <h2>{confirmedBookings}</h2>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon orange">
            <Clock size={23} />
          </div>
          <div>
            <p>Pending</p>
            <h2>{pendingBookings}</h2>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon red">
            <XCircle size={23} />
          </div>
          <div>
            <p>Cancelled</p>
            <h2>{cancelledBookings}</h2>
          </div>
        </div>
      </div>

      <div className="booking-table-card">
        <div className="booking-table-header">
          <div>
            <h2>All Bookings</h2>
            <p>View and manage all vehicle reservations.</p>
          </div>

          <div className="booking-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search bookings..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="booking-table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Booking Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <div className="booking-customer">
                        <div className="booking-avatar">
                          {(booking.customerName || "C")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>{booking.customerName}</strong>
                          <span>{booking.email}</span>
                          <span>{booking.phone}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="booking-vehicle">
                        <CarFront size={19} />
                        <span>{getCarName(booking.carId)}</span>
                      </div>
                    </td>

                    <td>
                      {booking.bookingDate
                        ? new Date(
                            `${booking.bookingDate}T00:00:00`
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>

                    <td>
                      <strong>
                        {Number(booking.amount || 0).toLocaleString(
                          "en-IN",
                          {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          }
                        )}
                      </strong>
                    </td>

                    <td>
                      <select
                        className={`booking-status-select ${String(
                          booking.status || "Pending"
                        ).toLowerCase()}`}
                        value={booking.status || "Pending"}
                        onChange={(event) =>
                          handleStatusChange(
                            booking.id,
                            event.target.value
                          )
                        }
                        aria-label={`Change status for ${booking.customerName}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td>
                      <div className="booking-actions">
                        <button
                          className="booking-icon-btn edit"
                          title="Edit booking"
                          aria-label="Edit booking"
                          onClick={() => openEditForm(booking)}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          className="booking-icon-btn delete"
                          title="Delete booking"
                          aria-label="Delete booking"
                          onClick={() => handleDelete(booking.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="booking-empty-state">
                      <CalendarDays size={38} />
                      <h3>No bookings found</h3>
                      <p>
                        {search
                          ? "Try another search term."
                          : "Add your first vehicle booking to get started."}
                      </p>

                      {!search && (
                        <button
                          className="booking-primary-btn"
                          onClick={openAddForm}
                        >
                          <Plus size={18} />
                          Add Booking
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div
          className="booking-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <div
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <div className="booking-modal-header">
              <div>
                <h2 id="booking-modal-title">
                  {editingId !== null ? "Edit Booking" : "Add New Booking"}
                </h2>
                <p>Enter customer and vehicle reservation details.</p>
              </div>

              <button
                className="booking-close-btn"
                onClick={closeForm}
                aria-label="Close form"
                type="button"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="booking-form-grid">
                <label>
                  Customer Name *
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Enter customer name"
                    value={form.customerName}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Email Address *
                  <input
                    type="email"
                    name="email"
                    placeholder="customer@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Phone Number *
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
                

                {/* <label>
                  Select Vehicle *
                  <select
                    name="carId"
                    value={form.carId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a vehicle</option>
                    {cars.map((car) => (
                      <option key={car.id} value={String(car.id)}>
                        {car.name}
                      </option>
                    ))}
                  </select>
                </label> */}

                <label>
                  Booking Date *
                  <input
                    type="date"
                    name="bookingDate"
                    value={form.bookingDate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Booking Amount (₹) *
                  <input
                    type="number"
                    name="amount"
                    min="0"
                    step="1"
                    placeholder="Enter amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="booking-full-width">
                  Booking Status
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </label>
              </div>

              <div className="booking-modal-footer">
                <button
                  type="button"
                  className="booking-secondary-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button type="submit" className="booking-primary-btn">
                  {editingId !== null ? "Save Changes" : "Create Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Bookings;

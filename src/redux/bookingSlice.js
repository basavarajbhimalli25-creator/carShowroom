
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },

    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(
        (booking) => booking.id === action.payload.id
      );

      if (index !== -1) {
        state.bookings[index] = {
          ...state.bookings[index],
          ...action.payload,
        };
      }
    },

    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },

    updateBookingStatus: (state, action) => {
      const booking = state.bookings.find(
        (item) => item.id === action.payload.id
      );

      if (booking) {
        booking.status = action.payload.status;
      }
    },
  },
});

export const {
  addBooking,
  updateBooking,
  deleteBooking,
  updateBookingStatus,
} = bookingSlice.actions;

export default bookingSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./carSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    cars: carReducer,
    bookings: bookingReducer,
  },
});
import { createSlice } from "@reduxjs/toolkit";

const initialCars = [
  {
    id: 1,
    name: "BMW 3 Series",
    brand: "BMW",
    category: "Luxury",
    price: 6500000,
    year: 2025,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    description:
      "A premium sedan combining sporty performance, comfort, and modern technology.",
  },
  {
    id: 2,
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    category: "Luxury",
    price: 7500000,
    year: 2025,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    description:
      "A refined luxury sedan with an elegant exterior and premium interior.",
  },
  {
    id: 3,
    name: "Hyundai Creta",
    brand: "Hyundai",
    category: "SUV",
    price: 1500000,
    year: 2025,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    description:
      "A versatile SUV designed for comfortable city driving and family journeys.",
  },
  {
    id: 4,
    name: "Toyota Fortuner",
    brand: "Toyota",
    category: "SUV",
    price: 4500000,
    year: 2025,
    fuel: "Diesel",
    transmission: "Automatic",
    seats: 7,
    image:
      "https://images.unsplash.com/photo-151 SUV?auto=format&fit=crop&w=1200&q=80",
    description:
      "A spacious SUV built for long-distance travel and demanding roads.",
  },
  {
    id: 5,
    name: "Tesla Model 3",
    brand: "Tesla",
    category: "Electric",
    price: 6000000,
    year: 2025,
    fuel: "Electric",
    transmission: "Automatic",
    seats: 5,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
    description:
      "An electric sedan featuring a minimalist cabin and advanced technology.",
  },
  {
    id: 6,
    name: "Honda City",
    brand: "Honda",
    category: "Sedan",
    price: 1400000,
    year: 2025,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    description:
      "A comfortable sedan suitable for daily commutes and family use.",
  },
];


const carSlice = createSlice({
  name: "cars",
  initialState: initialCars,
  reducers: {
    addCar: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
      });
    },

    updateCar: (state, action) => {
      const index = state.findIndex(
        (car) => car.id === Number(action.payload.id)
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteCar: (state, action) => {
      return state.filter(
        (car) => car.id !== Number(action.payload)
      );
    },
  },
});

export const { addCar, updateCar, deleteCar } = carSlice.actions;

export default carSlice.reducer;
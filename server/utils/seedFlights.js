import Flight from "../models/Flight.js";

export const seedFlights = async () => {
  const count = await Flight.countDocuments();
  if (count > 0) {
    console.log("Flights already exist, skipping seeding.");
    return;
  }

  const routes = [
    ["Delhi", "Mumbai"],
    ["Mumbai", "Bangalore"],
    ["Bangalore", "Hyderabad"],
    ["Hyderabad", "Chennai"],
    ["Chennai", "Kolkata"],
    ["Kolkata", "Delhi"],
    ["Pune", "Goa"],
    ["Ahmedabad", "Jaipur"],
    ["Lucknow", "Delhi"],
    ["Chandigarh", "Mumbai"],
    ["Kolkata", "Pune"],
    ["Goa", "Bangalore"],
    ["Bangalore", "Chennai"],
    ["Delhi", "Kochi"],
    ["Kochi", "Hyderabad"],
    ["Indore", "Mumbai"],
    ["Nagpur", "Delhi"],
    ["Varanasi", "Kolkata"],
    ["Surat", "Hyderabad"],
    ["Patna", "Delhi"]
  ];

  const airlines = ["Indigo", "Air India", "Vistara", "SpiceJet", "Akasa Air"];
  const flights = [];
  let flightNum = 101;

  routes.forEach((route, index) => {
    const airline = airlines[index % airlines.length];

    flights.push({
      airline,
      flightNumber: `${airline.substring(0, 2).toUpperCase()}${flightNum++}`,
      from: route[0],
      to: route[1],
      date: "2025-12-20",
      time: `0${(index % 9) + 8}:30`,
      price: 3500 + (index * 200),
      seats: 60
    });
  });

  await Flight.insertMany(flights);
  console.log("🔥 Seeded 20 diverse Indian flights!");
};

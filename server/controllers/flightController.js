import Flight from "../models/Flight.js";

export const addFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.json({ msg: "Flight added", flight });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET /api/flights/search?from=Chennai&to=Delhi&date=2025-12-31
// Used by the React Home page to search flights.
export const searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    const query = {};

    if (from) {
      // case‑insensitive exact match for origin
      query.from = new RegExp(`^${from}$`, "i");
    }

    if (to) {
      // case‑insensitive exact match for destination
      query.to = new RegExp(`^${to}$`, "i");
    }

    if (date) {
      // stored as simple string (YYYY‑MM‑DD)
      query.date = date;
    }

    const flights = await Flight.find(query);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

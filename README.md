# FlightBooking 100% Fixed

This project contains:

- `server/` — fully working Node/Express/Mongo backend
- `client/` — minimal React client to test flights API

## Backend setup

```bash
cd server
npm install
```

Edit `.env` with your real MongoDB Atlas URI and a JWT secret:

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/flightBooking
JWT_SECRET=yourSecret
PORT=5000
```

Then:

```bash
npm run dev
```

On first call to `GET /api/flights`, sample Indian flights are auto-seeded,
so you will not see "No flights available" anymore.

## Client setup

```bash
cd client
npm install
npm run dev
```

Make sure backend is running at `http://localhost:5000`.

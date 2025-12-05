# Flight Booking Client (React + Tailwind)

This is the React frontend for the Flight Booking system.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios

## Folder Structure

```bash
client/
  src/
    components/
    pages/
    routes/
    context/
    services/
    utils/
```

## Setup

1. Go into the `client` folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file (optional) to point to your backend API:

   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser at the URL printed in the terminal (default: http://localhost:5173).

## Backend Connection

- The Axios instance in `src/services/api.js` points to:

  - `VITE_API_URL` if defined in `.env`
  - otherwise `http://localhost:5000/api`

- Make sure your Node/Express backend is running on that URL and supports:

  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/flights`
  - `GET /api/flights/search`
  - `POST /api/bookings/create`

## Notes

- The Home page UI is inspired by a modern flight booking landing page, with hero image, search bar and flight cards.
- Some pages (Admin, Ticket view, Payment) are placeholders where you can wire up your real backend APIs, charts, and PDF ticket download.
- Auth state is stored in localStorage and provided via `AuthContext`.
``` 

### HotelShredder Frontend

React + Vite frontend for the HotelShredder booking system. Lets users browse rooms, search availability, make bookings and payments, and manage rooms/bookings as an admin. Talks to the Spring Boot backend over a JSON API.

---

### What it does

- **Home page** – Hero banner plus quick search (dates + room type) and a link to view all rooms.
- **Room listing** – `/rooms` shows all rooms with photos, price, capacity, and filters by room type.
- **Room details & booking** – `/room-details/:roomId` shows a room, lets users pick dates, and create a booking.
- **Auth** – `/login`, `/register` for customer sign‑in and sign‑up.
- **Profile** – `/profile` shows user details and booking history with room photos.
- **Find booking** – `/find-booking` lets you look up a booking by confirmation code.
- **Admin pages** –
  - `/admin` – admin landing page.
  - `/admin/manage-rooms`, `/admin/add-room`, `/admin/edit-room/:roomId` – manage room inventory and images.
  - `/admin/manage-bookings`, `/admin/edit-booking/:bookingCode` – manage bookings and statuses.
- **Payments** – integrates with Stripe via a payment page and client‑side Stripe Elements.

---

### Tech stack

| Area      | Stack                                    |
|-----------|------------------------------------------|
| Framework | React, React Router                      |
| Build     | Vite                                     |
| Styling   | Plain CSS (component and global styles)  |
| HTTP      | Axios                                    |
| Auth      | JWT stored in `localStorage`             |
| Payments  | Stripe (via Stripe.js & React bindings)  |

---

### Project structure

- `src/`
  - `main.jsx` – App bootstrap and global CSS import.
  - `App.jsx` – Router and top‑level layout (navbar, footer, routes).
  - `components/`
    - `home/` – `HomePage` (hero banner and services section).
    - `booking_rooms/` – `AllRoomsPage`, `RoomDetailsPage`, `FindBookingPage`.
    - `auth/` – `LoginPage`, `Register`.
    - `profile/` – `ProfilePage`, `EditProfile`.
    - `admin/` – `AdminPage`, `AddRoomPage`, `EditRoomPage`, `ManageBookingPage`, `EditBookingPage`, etc.
    - `payment/` – `PaymentPage`, `PaymentForm`, `PaymentSuccess`, `PaymentFailure`.
    - `common/` – `Navbar`, `Footer`, `Pagination`, `RoomSearch`, `RoomResult`.
  - `service/ApiService.jsx` – Centralized Axios wrapper for all backend API calls.
  - `index.css` – Global and shared styles (forms, layout, components).

---

### Environment variables

The app uses Vite env vars (must be prefixed with `VITE_`):

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_ENCRYPTION_KEY=some-local-dev-key
VITE_API_BASE_URL=http://localhost:9090/api
VITE_BACKEND_BASE_URL=http://localhost:9090
```

In production, set these to your live URLs, for example:

```env
VITE_API_BASE_URL=https://hotel-shredder-backend-production.up.railway.app/api
VITE_BACKEND_BASE_URL=https://hotel-shredder-backend-production.up.railway.app
```

- `VITE_API_BASE_URL` – Base URL for JSON API calls (e.g. `/rooms/all`, `/bookings`).
- `VITE_BACKEND_BASE_URL` – Base URL used to build full image URLs from `imageUrl` paths, e.g.:

  ```jsx
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || "";
  <img src={`${BACKEND_BASE_URL}${room.imageUrl}`} alt="Room" />
  ```

> Do not commit real API URLs or keys for private environments; use env config on your hosting platform.

---

### Running locally

#### Prerequisites

- Node.js 18+
- Backend running at `http://localhost:9090/api` (from the `HotelBooking` repo)

#### Steps

```bash
cd hotel-app-frontend

# 1. Create .env as shown above

npm install
npm run dev
```

Open `http://localhost:5173` (or the port Vite prints) in your browser.

---

### Building for production

```bash
cd hotel-app-frontend
npm run build
```

This produces a `dist/` directory with static assets that can be deployed to any static host (Netlify, Vercel, Railway static site, etc.). Ensure `VITE_API_BASE_URL` and `VITE_BACKEND_BASE_URL` are set appropriately in your hosting environment before building.

---

### License

See `LICENSE` for licensing details.
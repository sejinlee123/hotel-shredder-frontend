### HotelShredder Frontend

React + Vite frontend for the HotelShredder booking system. Lets users browse rooms, search availability, make bookings and payments, and manage rooms/bookings as an admin. Talks to the Spring Boot backend over a JSON API.

**Live site:** [https://hotelshredder.cv](https://hotelshredder.cv/home)

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

## License
See [LICENSE](LICENSE).

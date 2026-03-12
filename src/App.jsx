import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import RegisterPage from "./components/auth/Register";
import LoginPage from "./components/auth/LoginPage";
import HomePage from "./components/home/HomePage";
import AllRoomsPage from "./components/booking_rooms/AllRoomsPage";
import RoomDetailsPage from "./components/booking_rooms/RoomDetailsPage";
import {AdminRoute, CustomerRoute} from "./service/Guard.jsx";
import FindBookingPage from "./components/booking_rooms/FindBookingPage";
import ProfilePage from "./components/profile/ProfilePage";
import EditProfilePage from "./components/profile/EditProfile";
import PaymentPage from "./components/payment/PaymentPage";
import PaymentSuccess from "./components/payment/PaymentSuccess";
import PaymentFailure from "./components/payment/PaymentFailure";
import AdminPage from "./components/admin/AdminPage";
import ManageRoomPage from "./components/admin/MangeRoomPage";
import AddRoomPage from "./components/admin/AddRoomPage";
import EditRoomPage from "./components/admin/EditRoomPage";
import ManageBookingsPage from "./components/admin/ManageBookingPage";
import EditBookingPage from "./components/admin/EditBookingPage";
import AdminRegisterPage from "./components/admin/AdminRegisterPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/rooms" element={<AllRoomsPage />} />
            <Route path="/find-booking" element={<FindBookingPage />} />

            <Route
              path="/room-details/:roomId"
              element={<CustomerRoute element={<RoomDetailsPage />} />}
            />
            <Route
              path="/profile"
              element={<CustomerRoute element={<ProfilePage />} />}
            />
            <Route
              path="/edit-profile"
              element={<CustomerRoute element={<EditProfilePage />} />}
            />

            {/* PAYMENT PAGES */}

            <Route
              path="/payment/:bookingReference/:amount"
              element={<CustomerRoute element={<PaymentPage />} />}
            />
            <Route
              path="/payment-success/:bookingReference"
              element={<CustomerRoute element={<PaymentSuccess />} />}
            />
            <Route
              path="/payment-failed/:bookingReference"
              element={<CustomerRoute element={<PaymentFailure />} />}
            />

            {/* ADMIN ROUTES */}
            <Route
              path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
            />
            <Route
              path="/admin/manage-rooms"
              element={<AdminRoute element={<ManageRoomPage />} />}
            />
            <Route
              path="/admin/add-room"
              element={<AdminRoute element={<AddRoomPage />} />}
            />
            <Route
              path="/admin/edit-room/:roomId"
              element={<AdminRoute element={<EditRoomPage />} />}
            />
            <Route
              path="/admin/manage-bookings"
              element={<AdminRoute element={<ManageBookingsPage />} />}
            />
            <Route
              path="/admin/edit-booking/:bookingCode"
              element={<AdminRoute element={<EditBookingPage />} />}
            />

            <Route
              path="/admin-register"
              element={<AdminRoute element={<AdminRegisterPage />} />}
            />

            {/* FALLBACK URL */}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

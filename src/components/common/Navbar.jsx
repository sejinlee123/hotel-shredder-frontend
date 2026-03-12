import React, { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Navbar.css";
import ApiService from "../../service/ApiService";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isAuthenticated = ApiService.isAthenticated();
  const isCustomer = ApiService.isCustomer();
  const isAdmin = ApiService.isAdmin();

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    const isLogout = window.confirm("Are you sure you want to logout?");
    if (isLogout) {
      ApiService.logout();
      navigate("/home");
    }
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/home">LShredder Hotel</NavLink>
      </div>

      <div className="navbar-menu-wrapper" ref={menuRef}>
        <button
          type="button"
          className="navbar-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span className="navbar-hamburger-bar" />
          <span className="navbar-hamburger-bar" />
          <span className="navbar-hamburger-bar" />
        </button>

        {menuOpen && (
          <ul className="navbar-dropdown">
            <li>
              <NavLink to="/home" className={navLinkClass} onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/rooms" className={navLinkClass} onClick={closeMenu}>
                Rooms
              </NavLink>
            </li>
            <li>
              <NavLink to="/find-booking" className={navLinkClass} onClick={closeMenu}>
                Find My Bookings
              </NavLink>
            </li>
            {isCustomer && (
              <li>
                <NavLink to="/profile" className={navLinkClass} onClick={closeMenu}>
                  Profile
                </NavLink>
              </li>
            )}
            {isAdmin && (
              <li>
                <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
                  Admin
                </NavLink>
              </li>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <NavLink to="/login" className={navLinkClass} onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={navLinkClass} onClick={closeMenu}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li>
                <button type="button" className="navbar-dropdown-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

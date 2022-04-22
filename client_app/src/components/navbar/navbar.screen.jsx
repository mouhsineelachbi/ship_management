import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logoutUser } from "../../feature/user/user.slice";
import './nav.screen.css';

export default function Navbar() {
  const { userLoading, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {!user ? (
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-md-8 d-flex justify-content-end w-100">
                <li className="nav-item mx-2">
                  <Link to="/login" className="nav-link">
                    <h5>Login</h5>
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link to="/register" className="nav-link">
                    <h5>Register</h5>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-md-8 d-flex justify-content-end w-100">
                <li className="nav-item active mx-2">
                  <span className="nav-link">
                    Welcome {user.username}
                  </span>
                </li>
                <li className="nav-item active mx-2">
                  <Link to="/login" className="nav-link" onClick={logout}>
                    <h5>Logout</h5>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

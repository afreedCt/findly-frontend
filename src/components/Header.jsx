import React from "react";
import { Link } from "react-router-dom";
import logoPic from "../assets/logo.jpg";

const Header = ({ onAboutClick, onContactClick }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="d-flex justify-content-center">
      <nav
        className="navbar navbar-expand-lg glass w-75 rounded-5 "
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand fs-3 text- fw-bold ms-3" href="/">
            <img
              src={logoPic}
              width={50}
              height={50}
              className="rounded-circle me-2"
              alt=""
            />
            <span style={{ color: "blueviolet" }}>Findly</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse header" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  to={"/"}
                  className="nav-link active text-info fw-bold fs-5"
                >
                  Home
                </Link>
              </li>
              {!user && (
                <li className="nav-item">
                  <Link to={"/login"} class="nav-link text-info fw-bold fs-5">
                    Login
                  </Link>
                </li>
              )}
              <li onClick={onContactClick} className="nav-item">
                <Link to={'/'} className="nav-link text-info fw-bold fs-5">Contact</Link>
              </li>
              <li onClick={onAboutClick} className="nav-item">
                <Link to={"/"} className="nav-link text-info fw-bold fs-5">
                  About{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

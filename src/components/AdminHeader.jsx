import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import SERVER_URL from "../server/server";
import { userContext } from "../context/ContextAPI";

const AdminHeader = ({ searchBar }) => {
  const navigate = useNavigate();
  const {user,setUser}=useContext(userContext)
  const handleLogout = () => {
    sessionStorage.clear();
    setUser("")
    setTimeout(() => {
      navigate("/");
    }, 100);
  };
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg bg-primary " data-bs-theme="dark">
        <div className="container-fluid">
          <Link to={'/admin-dashboard'} className="navbar-brand fs-3 fw-bold">
            Findly - Admin
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link fs-5" href="/admin/all-posts">
                  All Posts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="/admin/all-claims">
                  All Claims
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to={"/admin/all-users"}>
                  All Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to={"/admin/all-reports"}>
                  All Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to={"/admin/dashboard"}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item dropdown d-flex justify-content- align-items-center fs-5">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account
                </a>
                <div className="dropdown-menu">
                  <Link to={"/account"} className="dropdown-item">
                    {user?.profilePic ? (
                      <img
                        className="rounded-circle me-1"
                        width={35}
                        height={35}
                        src={user.profilePic.startsWith("http")?user.profilePic:`${SERVER_URL}/uploads/${user.profilePic}`}
                        alt="user profile"
                      />
                    ) : (
                      <i className="fa-solid fa-user me-2"></i>
                    )}
                    My Profile
                  </Link>
                  {/* <Link class="dropdown-item" to={"/my-posts"}>
                    My Posts
                  </Link> */}
                  <div className="dropdown-divider"></div>
                  <Link onClick={handleLogout} className="dropdown-item">
                    Logout
                  </Link>
                </div>
              </li>
            </ul>

            {/* <div className="nav-item btn btn-light text-primary">
              <Link
                onClick={handleLogout}
                className="nav-link fs-5 text- me-2"
                to={"/logout"}
              >
                Logout
              </Link>
            </div> */}

            {searchBar && (
              <input
                className="p-2 bg-white text-dark "
                // style={{marginLeft:"auto"}}
                // onChange={(e) => setEmail(e.target.value)}
                type="search"
                placeholder="search by place"
              />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminHeader;

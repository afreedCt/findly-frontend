import React, { useContext, useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import userProfile1 from "../assets/user-profile-1.jpg";
import logoPic from "../assets/logo.jpg";
import { userContext } from "../context/ContextAPI";
import SERVER_URL from "../server/server";
import Badge from 'react-bootstrap/Badge';

const UserHeader = ({ searchBar }) => {
  const navigate = useNavigate();
  const {setUser}=useContext(userContext)
  const handleLogout = () => {
    sessionStorage.clear();
    setUser("")
    
    setTimeout(() => {
      navigate("/");
      
    }, 100);
    // console.log("going....")
  };

  const {user,messageCount,searchData,setSearchData}=useContext(userContext)
// console.log(user)
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-info w-100" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand fs-3" href="/">
            <img
              src={logoPic}
              width={40}
              height={40}
              className="rounded-circle me-3"
              alt=""
            />
            Findly
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
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto user-header d-flex">
              <li className="nav-item">
                <a className="nav-link fs-5" href="/all-posts">
                  All Posts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="/claims">
                  Claims
                </a>
              </li>
              <li className="nav-item d-flex">
                <Link className="nav-link fs-5" to={"/messages"}>
                  Messages
                </Link>
                {messageCount!==0&&<div>
                  <Badge bg="secondary">{messageCount}</Badge>
                </div>}
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to={"/donation"}>
                  Donation
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
                    {user.profilePic ? (
                      <img
                        className="rounded-circle me-2"
                        width={35}
                        height={35}
                        src={user.profilePic.startsWith("http")?user.profilePic:`${SERVER_URL}/uploads/${user.profilePic}`}
                        // alt="user profile"
                      />
                    ) : (
                      <i className="fa-solid fa-user me-2"></i>
                    )}
                    {/* <img className="rounded-circle" src={user?.image} alt="user profile" /> */}
                    My Profile
                  </Link>
                  <Link className="dropdown-item" to={"/my-posts"}>
                    My Posts
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link onClick={handleLogout} className="dropdown-item">
                    Logout
                  </Link>
                </div>
              </li>
              {/* <li className="nav-item ms-3">
                <Link className="nav-link fs-5" to={"/match-posts"}>
                  Matched Posts
                </Link>
              </li> */}
            </ul>

            {searchBar && (
              <input
                className="p-2 bg-white text-dark border-1 border border-primary outline-none rounded-4 overflow-hidden"
                // style={{marginLeft:"auto"}}
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
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

export default UserHeader;

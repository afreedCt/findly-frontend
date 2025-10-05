import React from "react";
import logoPic from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="d-flex justify-content-center dashboard">
      <div className="row gradient container rounded-4" style={{}}>
        <div className="col-md-6 bg-">
          <h1 className="text-light my-3">
            <img
              width={100}
              className="rounded-circle"
              height={100}
              src={logoPic}
              alt=""
            />{" "}
            Findly
          </h1>
          <p className="text-light">
            Findly is a community-driven platform that helps people reconnect
            with their lost belongings and return found items with ease. Whether
            you’ve misplaced something valuable or discovered an item that needs
            to find its owner, Findly makes the process simple, secure, and
            trustworthy. Together, we’re building a space where honesty meets
            technology to bring lost things back home.
          </p>
        </div>
        <div className="col-md-6 text-light d-flex justify-content-center gap-2">
          <div className=" w-100 mt-3">
            <h1 className="text-center my-3 fw-bold">Links</h1>
            <div className="d-flex flex-column ">
              <Link className="text-decoration-none fs-4 fw-bold text-light mx-auto " to={'/'}>Home</Link>
              <Link className="text-decoration-none fs-4 fw-bold text-light mx-auto " to={'/about'}>About</Link>
              <Link className="text-decoration-none fs-4 fw-bold text-light mx-auto " to={'/contact'}>Contact</Link>
              <Link className="text-decoration-none fs-4 fw-bold text-light mx-auto " to={'/login'}>Login</Link>
            </div>
          </div>
          <div className="bg- w-100 mt-3">
             <h3 className="text-center my-3 fw-bold">Social Media</h3>
             <div className="d-flex flex-wrap gap-3 justify-content-center">
                <i className="fa-brands fa-facebook fs-3"></i>
                <i className="fa-brands fa-github fs-3"></i>
                <i className="fa-brands fa-linkedin fs-3"></i>
                <i className="fa-brands fa-instagram fs-3"></i>
             </div>
          </div>
        </div>
        <p className="text-center text-light my-2 fw-bold"><span className="">&copy;</span> Protected By Findly</p>
      </div>
    </div>
  );
};

export default Footer;

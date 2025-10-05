import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./Header";
import GuestPageCards from "./GuestPageCards";
import { dummyPosts } from "../assets/assets";
import { Link } from "react-router-dom";
import Contact from "./Contact";
import { userContext } from "../context/ContextAPI";
// import AllPosts from "./AllPosts";

const GuestPage = () => {
  const { guestPosts } = useContext(userContext);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="bg-light" style={{position:"relative"}}>
      {/* <!-- Hero Section --> */}
      <div className="gradient text-white text-center py-5 ">
        <div className="guest-header" style={{top:"20px"}}>
          <Header
          onAboutClick={() => scrollToSection(faqRef)}
          onContactClick={() => scrollToSection(contactRef)}
        />
        </div>
        <h1 className="display-4 fw-bold mb-3 mt-5 " style={{position:"relative",top:"30px"}}>
          Lost Something? Found Something?
        </h1>
        <p className="lead mb-4 mt-5">
          Connect with people and recover lost items easily.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to={"/all-posts"} className="text-decoration-none">
            <button className="btn btn-light text-primary fw-medium px-4 py-2">
              Report Lost
            </button>
          </Link>
          <Link to={"/all-posts"} className="text-decoration-none">
            <button className="btn btn-warning text-dark fw-medium px-4 py-2">
              Report Found
            </button>
          </Link>
        </div>
      </div>

      {/* <!-- Stats Section --> */}
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row text-center gap-3 justify-content-center">
            <div
              className="col-6 col-md-2 mb-4 shadow-lg p-3  "
              data-aos="fade-up"
            >
              <h2 className="fw-bold text-primary ">10K+</h2>
              <p className="text-muted mb-0 fw-bold">Active Users</p>
            </div>
            <div
              className="col-6 col-md-2 mb-4 shadow-lg p-3"
              data-aos="fade-up"
            >
              <h2 className="fw-bold text-primary">5K+</h2>
              <p className="text-muted mb-0 fw-bold">Items Reported</p>
            </div>
            <div
              className="col-6 col-md-2 mb-4 shadow-lg p-3"
              data-aos="fade-up"
            >
              <h2 className="fw-bold text-primary">2K+</h2>
              <p className="text-muted mb-0 fw-bold">Items Returned</p>
            </div>
            <div
              className="col-6 col-md-2 mb-4 shadow-lg p-3"
              data-aos="fade-up"
            >
              <h2 className="fw-bold text-primary">98%</h2>
              <p className="text-muted mb-0 fw-bold">Claim Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest posts */}
      <div className="container py-3 bg-secondary">
        <h2 className="fw-bold text-center mb-4">Latest Posts</h2>
        <div className="d-flex flex-wrap gap-3 ms-5 justify-content-center justify-content-md-start">
          {guestPosts.slice(0, 4).map((post, index) => (
            <GuestPageCards key={index} post={post} />
          ))}
        </div>
        <div className="d-flex justify-content-center my-3">
          <Link to={"/all-posts"} className="btn btn-outline-primary">
            See All Posts
          </Link>
        </div>
      </div>

      {/* <!-- FAQ Section --> */}
      <div ref={faqRef} class="container py-3 " id="contact">
        <h2 className="fw-bold text-center mb-4">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                What is Findly?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Findly is a platform where people can report lost and found
                items, connect with others, and reclaim their belongings easily.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button fw-semibold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
              >
                Is this service free?
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Yes! Reporting lost or found items is completely free.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button fw-semibold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
              >
                How do I report a lost item?
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Go to the "Add Post" section, choose Lost, fill in the details
                (title, description, date, location), and upload a picture if
                available.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button fw-semibold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
              >
                How can I claim an item?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Click on the item and submit a claim message. The finder will
                review and approve/reject.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button fw-semibold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
              >
                Is my personal information safe?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Yes. We only display necessary details (like username and
                contact preference). Your sensitive data is kept private and
                secure.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button
                className="accordion-button fw-semibold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
              >
                How are fake reports handled?
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Users can report suspicious posts or users. Our admin team
                reviews reports and takes necessary action, including warnings
                or post removal.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSeven">
              <button
                className="accordion-button fw-semibold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
              >
                Can I use Findly on mobile?
              </button>
            </h2>
            <div
              id="collapseSeven"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Yes! Findly is mobile-friendly and works smoothly on any device.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact */}
      <Contact contactRef={contactRef} />
    </div>
  );
};

export default GuestPage;

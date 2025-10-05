import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../CSS/SwipeButton.css"; // custom styles for animation
import { blockUserAPI } from "../server/allAPI";
import Spinner from "react-bootstrap/Spinner";

const SwipeButton = ({ user }) => {
  const [isActive, setIsActive] = useState(user?.isActive);
  const [loading, setLoading] = useState(false);

  const handleActive = async () => {
    setIsActive(!isActive);
    setLoading(true);
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };
      let reqBody = {
        isActive: !isActive,
      };
      try {
        const res = await blockUserAPI(user._id, reqBody, reqHeader);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error to get admin claims : ", error);
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center ">
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <div className="swipe-container">
            <div
              className={`swipe-track ${!isActive ? "blocked" : "unblocked"}`}
            >
              <div className="swipe-label left fw-bold">Unblock</div>
              <div className="swipe-label right fw-bold">Block</div>
              <div
                className={`swipe-button ${!isActive ? "right" : "left"}`}
                onClick={handleActive}
              >
                {!isActive ? "Blocked" : "Unblocked"}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SwipeButton;

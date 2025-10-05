import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { addUserReportAPI } from "../server/allAPI";

const ReportUser = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (message.trim() == "") {
      toast.warning("enter a reason");
      return;
    }
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };
    }

    let reqBody = {
      message,
      reportedUser: post.postedBy,
    };
    try {
      const res = await addUserReportAPI(reqBody, reqHeader);
      // console.log(res); 
      handleClose();
      toast.success("successfully reported user");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(res.response.data.message);
      console.log("error to add post report : ", error);
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-end fw-bold me-5 overflow-hidden">
        {/* {isHovered && ( */}
        <div
          className={`w-100 ${
            isHovered ? "d-flex" : "d-none"
          } justify-content-end me-1`}
        >
          <p className={`text-end bg- p-`}>report user</p>
        </div>
        {/* )} */}
        <span className="text-danger py-2 h-100">
          <p
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleShow}
            style={{ cursor: "pointer" }}
            className=""
          >
            ?
          </p>
        </span>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Report User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput2"
            label="Reason"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              type="textarea"
              placeholder="enter your message"
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-outline-danger"
            variant=""
            onClick={handleClose}
          >
            cancel
          </Button>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Button
              onClick={handleSubmit}
              className="btn btn-outline-primary"
              variant=""
            >
              Report
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReportUser;

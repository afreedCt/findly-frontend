import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { addPostReportAPI } from "../server/allAPI";

const ReportModal = ({post}) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(false)
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleKeyDown = () => {
    if (e.key == "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading((true))
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
    
    let reqBody={
      message,
      postId:post._id
      
    }
    try {
      const res = await addPostReportAPI(reqBody,reqHeader);
      console.log(res)
      handleClose()
      toast.success("successfully reported post")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(res.response.data.message)
      console.log("error to add post report : ", error);
    }
  };
  return (
    <>
      <button onClick={handleShow} className="btn btn-outline-danger col-md-5">
        report
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Report Post</Modal.Title>
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
          {
            loading?
            <div className="d-flex justify-content-center"><Spinner animation="border" variant="primary" /></div>
            :
            <Button
            onClick={handleSubmit}
            className="btn btn-outline-primary"
            variant=""
          >
            Report
          </Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReportModal;

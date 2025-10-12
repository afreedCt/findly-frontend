import React from "react";
import { useState } from "react";
import { FloatingLabel, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { sendContactMailAPI } from "../server/allAPI";
import { toast } from "react-toastify";

const Contact = ({ contactRef }) => {
  const [contactData, setContactData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { username, email, message } = contactData;
    if (username && email && message) {
      console.log("sending");
      try {
        const res = await sendContactMailAPI(contactData);
        setLoading(false);
        toast.success(res.data.message);
        setContactData({
          username: "",
          email: "",
          message: "",
        });
      } catch (error) {
        toast.error(error.message);
        // console.log("error to send message")
      }
    } else {
      setLoading(false);
      toast.info("enter all field");
      // alert("enter all field");
    }
  };
  return (
    <>
      <div ref={contactRef} className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 gap-3 my-4 shadow-lg p-3 contact rounded-4">
            <h1 className="text-center my-2 fw-bold text-light">Contact</h1>
            <FloatingLabel
              controlId="floatingInput2"
              label="Username"
              className="mb-3"
            >
              <Form.Control
                required
                value={contactData.username}
                onChange={(e) =>
                  setContactData({ ...contactData, username: e.target.value })
                }
                type="text"
                placeholder="enter your username"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput2"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                required
                value={contactData.email}
                onChange={(e) =>
                  setContactData({ ...contactData, email: e.target.value })
                }
                type="text"
                placeholder="enter your email"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput2"
              label="Enter Message"
              className="mb-3"
            >
              <Form.Control
                required
                value={contactData.message}
                onChange={(e) =>
                  setContactData({ ...contactData, message: e.target.value })
                }
                className=""
                as="textarea"
                rows={3}
                placeholder="enter your message"
              />
            </FloatingLabel>
            {/* <textarea placeholder='Enter your message' className='p-3'>

              </textarea> */}
            <div className="d-flex justify-content-center">
              {loading ? (
                <div className="d-flex justify-content-center my-3">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <button onClick={handleSubmit} className="btn btn-primary">
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

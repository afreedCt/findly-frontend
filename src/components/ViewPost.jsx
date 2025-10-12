import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dummyPosts } from "../assets/assets";
import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { userContext } from "../context/ContextAPI";
import SERVER_URL from "../server/server";
import { addClaimRequestAPI } from "../server/allAPI";
import ReportModal from "./ReportModal";
import ReportUser from "./ReportUser";
import UserHeader from "./UserHeader";

const ViewPost = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(false)
  const { user, allPosts } = useContext(userContext);
  const handleClose = () => {
    setShow(false);
    setMessage("");
  };
  const handleShow = () => {
    setShow(true);
  };

  const { id } = useParams();
  const [post, setPost] = useState({});
  // console.log("post", post);
  useEffect(() => {
    let result = allPosts.find((item) => item._id == id);
    if (result) {
      setPost(result);
    } else {
      toast.warning("item not found");
      navigate("/");
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true)
    if (message.trim() !== "") {
      const token = sessionStorage.getItem("token");
      let reqHeader = {};
      if (token) {
        reqHeader = {
          authorization: `Bearer ${token}`,
        };
      }
      try {
        const res = await addClaimRequestAPI(
          { postId: id, message },
          reqHeader
        );
        // console.log(res);
        toast.success("claim request success");
        setLoading(false)
        handleClose();
      } catch (error) {
        setLoading(false)
        console.log("error to add claim request : ", error);
      }
    } else {
      setLoading(false)
      toast.warning("add a messsage");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSubmit();
    }
  };
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(-1);
  };
  return (
    <>
      <UserHeader/>
    <div className="d-flex justify-content-center align-items-center min-vh-100 dashboard">
      <div
        className="shadow-lg row w-100 container box-shadow bg-light p-3 rounded-5"
        style={{ width: "auto", minHeight: "450px" }}
      >
        <div className="col-12 col-md-8 col-lg-6 overflow-hidden d-flex flex-column align-items-center ">
          <Link
            className="text-decoration-none text-dark my-4"
            style={{ marginRight: "auto", cursor: "pointer" }}
            onClick={handleNav}
          >
            <i className="fa-solid fa-arrow-left ms-3 fs-2"></i>
          </Link>
          <img
            className="overflow-hidden mx-2"
            width={300}
            height={300}
            src={`${SERVER_URL}/uploads/${post?.postImage}`}
            alt={post?.title}
          />
        </div>
        <div className="col-12 col-md-8 col-lg-6 text-center text-md-start ps-4 d-flex flex-column pt- ">
          {/* <div> */}
          <ReportUser post={post} />

          {/* </div>  */}

          <p
            className="text-center me-3 mt-3 px-3 rounded-3 fw-bold"
            style={{
              color: post?.type == "lost" ? "red" : "green",
              border:
                post?.type == "lost" ? "1px solid red" : "1px solid green",
              width: "80px",
              marginLeft: "auto",
            }}
          >
            {post?.type}
          </p>
          <h3 className="text-center text-md-start mt-2">
            <strong>Title : </strong>
            {post?.title}{" "}
          </h3>
          <p className="text-center text-md-start mt-3">
            <strong>Description : </strong>
            {post?.description}
          </p>
          <p className="text-center text-md-start mt-3">
            <strong>Location : </strong>
            {post?.location}
          </p>
          <p className="text-center text-md-start mt-3">
            <strong>Date : </strong>
            {post?.date?.split("T")[0]}
          </p>

          <div className="d-flex row gap-3 mt-4">
            {user?.id !== post?.postedBy && <ReportModal post={post} />}
            {post?.type == "found" && user?._id !== post?.postedBy && (
              <button
                onClick={() => {
                  handleShow();
                }}
                className="btn btn-outline-success col-md-5"
              >
                claim
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change User Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput2"
            label="message"
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
            submit
          </Button>
          }
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default ViewPost;

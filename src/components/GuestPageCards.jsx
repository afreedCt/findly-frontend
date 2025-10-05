import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import EditPostModal from "./EditPostModal";
import SERVER_URL from "../server/server";
import { userContext } from "../context/ContextAPI";
import Modal from "react-bootstrap/Modal";
import { deletePostAPI, restorePostAPI } from "../server/allAPI";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const GuestPageCards = ({ admin, post, myPost, report }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   // setUser(JSON.parse(sessionStorage.getItem("user")));
  // }, []);

  const { user, fetchAllPosts } = useContext(userContext);

  const handleDeletePost = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };
    }
    try {
      const res = await deletePostAPI(post._id, reqHeader);
      // console.log("res", res);
      toast.success(res.data.message);
      handleClose();
      fetchAllPosts();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log("error in deleting post : ", error.message);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (token) {
      let reqHeader = {
        authorization: `Bearer ${token}`,
      };

      try {
        const res = await restorePostAPI(
          post._id,
          { status: "active" },
          reqHeader
        );
        console.log(res);
        fetchAllPosts();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error to update post status for restore : ", error);
      }
    }
  };

  return (
    <>
      <Card
        data-aos="fade-up"
        style={{ width: "16rem" }}
        className="pb-3 shadow-lg"
      >
        <Card.Img
          className="p-3 rounded-5"
          style={{ overflow: "hidden" }}
          variant="top"
          width={150}
          height={200}
          src={`${SERVER_URL}/uploads/${post?.postImage}`}
          alt={post?.title}
        />
        <Card.Body>
          <Card.Title>
            {post.title}{" "}
            <span
              style={{
                fontSize: "0.8rem",
                color: post.type === "lost" ? "red" : "green",
              }}
              className="fw-bold"
            >
              ({post.type})
            </span>
          </Card.Title>
          <Card.Text>
            📍 {post?.location}, {post?.location?.city} <br />
            📅 {post?.date?.split("T")[0]}
          </Card.Text>
          <div className="d-flex justify-content-between gap-2 ">
            {!admin && !myPost && !report && post.status == "active" && (
              <Link className="w-100" to={`/view-post/${post._id}`}>
                <Button className="p-2 w-100 rounded-3" variant="primary">
                  View Details
                </Button>
              </Link>
            )}
{/* 
            {admin || post.status == "claimed" && (
              <span className="border border-3 p-2 border-success rounded-4 text-success fw-bold">
                {post.status}
              </span>
            )} */}
            {admin && post.status == "active" && (
              <div className="w-100">
                {" "}
                <EditPostModal post={post} />
              </div>
            )}
            {admin && post.status == "active" && (
              <div onClick={handleShow} className="w-100">
                <Button className="p-2 rounded-3 w-100" variant="danger">
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            )}
            {admin && post.status == "removed" && (
              <div onClick={handleRestore} className="w-100">
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <Button className="p-2 rounded-3 w-100" variant="info">
                    <i className="fa-solid fa-rotate-left"></i>
                  </Button>
                )}
              </div>
            )}

            {myPost && (
              <div className="w-100">
                {" "}
                <EditPostModal post={post} />
              </div>
            )}
            {myPost && (
              <div onClick={handleShow} className="w-100">
                <Button className="p-2 rounded-3 w-100" variant="danger">
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            )}
          </div>
          {myPost && post?.type == "lost" && (
            <Link
              to={`/match-posts/${post?._id}`}
              className="btn btn-warning w-100 mt-3"
            >
              Matched Posts
            </Link>
          )}
        </Card.Body>
      </Card>

      {/* delete modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button onClick={handleDeletePost} variant="danger">
              yes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GuestPageCards;

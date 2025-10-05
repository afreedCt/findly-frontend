import React, { useContext, useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import { claims, dummyPosts } from "../assets/assets";
import {
  button,
  div,
  h1,
  h3,
  span,
  td,
  text,
  title,
} from "framer-motion/client";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Spinner, Table } from "react-bootstrap";
import { userContext } from "../context/ContextAPI";
import SERVER_URL from "../server/server";
import { addMessageAPI, updateClaimAPI } from "../server/allAPI";
import { toast } from "react-toastify";

const MyClaims = () => {
  const [selectedField, setSelectedField] = useState("myclaim");
  const { user, allClaims, fetchAllClaims, loading } = useContext(userContext);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [claimUser, setClaimUser] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setClaimUser(null);
  };
  const handleShow = (user) => {
    setShow(true);
    setClaimUser(user);
  };

  // console.log(allClaims)
  const receivedClaims = allClaims
    .filter((c) => c.postId?.postedBy == user._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // console.log(receivedClaims);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentReceived = receivedClaims.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Array.from(
    { length: Math.ceil(receivedClaims.length / rowsPerPage) },
    (_, i) => i + 1
  );

  const handleUpdate = async (claim, action) => {
    setLoadingStatus(action);
    let reqBody = {};
    if (action === "approved") {
      reqBody["status"] = "approved";
    } else {
      reqBody["status"] = "rejected";
    }
    // console.log(reqBody, claim);
    try {
      const token = sessionStorage.getItem("token");
      let reqHeader = {};
      if (token) {
        reqHeader = {
          authorization: `Bearer ${token}`,
        };
      }
      const res = await updateClaimAPI(claim._id, reqBody, reqHeader);
      console.log(res);
      toast.success(`successfully ${res.data.updatedClaim.status}`);
      fetchAllClaims();
      const reqBody1 = {
        receiverId: res.data.updatedClaim.claimerId,
        title: `claim ${res.data.updatedClaim.status} ${
          res.data.updatedClaim.status === "rejected" ? "❌" : "✅"
        }`,
        text: `your claim for ${claim.postId.title} was ${res.data.updatedClaim.status}`,
        type: "claimUpdate",
        postId: claim.postId,
      };

      // we need to pass email username and profile pic as message
      if (action === "approved") {
        reqBody1["email"] = res.data.updatedClaim.postId.postedBy.email;
        reqBody1["username"] = res.data.updatedClaim.postId.postedBy.username;
        reqBody1["profilePic"] =
          res.data.updatedClaim.postId.postedBy.profilePic;
      }
      const msgRes = await addMessageAPI(reqBody1, reqHeader);
      toast.info("successfully sented message");
      // console.log(msgRes);
      setLoadingStatus("");
    } catch (error) {
      setLoadingStatus("");
      console.log("error to update claim : ", error);
    }
  };
  return (
    <div className="commonBg pb-4">
      <UserHeader />
      {/* claim buttons */}
      <div className="my-3 ms-5 gap-3 d-flex">
        <button
          onClick={() => setSelectedField("myclaim")}
          className={`btn btn-outline-warning px-4  bg-${
            selectedField == "myclaim" ? "warning" : "white"
          } text-${selectedField == "myclaim" ? "white" : "dark"}`}
        >
          My Claims
        </button>
        <button
          onClick={() => setSelectedField("received")}
          className={`btn btn-outline-primary 
            bg-${selectedField == "received" ? "primary" : "white"} text-${
            selectedField == "received" ? "white" : "dark"
          }`}
        >
          Received Claims
        </button>
      </div>

      {/* my claims */}
      {selectedField == "myclaim" && (
        <div className="d-flex flex-wrap gap-3 mx-5">
          {loading ? (
            <div className="d-flex justify-content-center w-100 h-100 align-items-center mt-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : allClaims.filter((c) => c.claimerId._id == user._id).length > 0 ? (
            allClaims
              .filter((c) => c.claimerId._id == user._id)
              .map((claim) => (
                <Card
                  key={claim._id}
                  style={{ width: "17rem", minHeight: "rem" }}
                >
                  {claim.postId.status == "removed" && (
                    <div className="d-flex justify-content-end pe-3 pt-2">
                      <span className="bg-danger text-light text-center rounded-3 p-1 fw-bold w-50">
                        Removed
                      </span>
                    </div>
                  )}
                  <Card.Img
                    className="p-3"
                    style={{ overflow: "hidden" }}
                    variant="top"
                    width={150}
                    height={200}
                    src={`${SERVER_URL}/uploads/${claim.postId.postImage}`}
                    alt="post img"
                  />
                  <Card.Body
                    style={{
                      textDecoration:
                        claim.postId.status == "removed"
                          ? "line-through"
                          : "none",
                    }}
                  >
                    <Card.Title>{claim.postId.title}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {claim.postId.location},{" "}
                      {/* {claim.post.location.state}  */}
                      <br />
                      <strong>Message:</strong> {claim.message}
                      <br />
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          claim.status === "pending"
                            ? "text-warning"
                            : claim.status === "approved"
                            ? "text-success"
                            : "text-danger"
                        }
                        style={{ fontWeight: "bold" }}
                      >
                        {claim.status}
                      </span>
                    </Card.Text>
                    {/* <Button style={{}} className="bg-info " variant="primary">
                    View Post
                  </Button> */}
                  </Card.Body>
                </Card>
              ))
          ) : (
            <div className="w-100">
              {loading ? (
                <div className="d-flex justify-content-center w-100 h-100 align-items-center mt-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <h3 className="text-center">No claims requested</h3>
              )}
            </div>
          )}
        </div>
      )}

      {/* received claims */}
      {selectedField == "received" && receivedClaims.length > 0 && (
        <div className="overflow-auto ">
          <Table
            className="container"
            // style={{ overflow: "hidden" }}
            striped
            bordered
            hover
            responsive
            size="sm"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Claimer</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReceived.map((claim, ind) => (
                <tr key={claim._id}>
                  <td>{ind + 1}</td>
                  <td>
                    {claim.postId.status !== "removed" ? (
                      <span>{claim?.postId?.title}</span>
                    ) : (
                      "---"
                    )}
                  </td>
                  <td>
                    {claim.postId.status !== "removed" ? (
                      <span>
                        {claim?.claimerId.username}
                        <i
                          onClick={() => handleShow(claim.claimerId)}
                          className="ms-1"
                          style={{ cursor: "pointer" }}
                        >
                          👀
                        </i>
                      </span>
                    ) : (
                      "---"
                    )}
                  </td>
                  <td>
                    {claim.postId.status !== "removed" ? (
                      claim?.message
                    ) : (
                      <span className="fw-bold">
                        This Post is removed by admin
                      </span>
                    )}{" "}
                  </td>
                  <td>
                    {claim.postId.status !== "removed"
                      ? claim?.createdAt.split("T")[0]
                      : "---"}
                  </td>
                  <td
                    className={
                      claim.status === "pending"
                        ? "text-warning"
                        : claim.status === "approved"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {claim.postId.status !== "removed" ? claim?.status : "---"}
                  </td>
                  {claim?.status === "pending" &&
                  claim.postId.status !== "removed" ? (
                    <td className="d-flex flex-wrap gap-2">
                      <div className="d-flex gap-2">
                        {loadingStatus === "approved" ? (
                          <Spinner animation="border" variant="primary" />
                        ) : (
                          <button
                            onClick={() => handleUpdate(claim, "approved")}
                            className="btn btn-outline-success"
                          >
                            Approve
                          </button>
                        )}
                        {loadingStatus === "rejected" ? (
                          <Spinner animation="border" variant="primary" />
                        ) : (
                          <button
                            onClick={() => handleUpdate(claim, "rejected")}
                            className="btn btn-outline-danger"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  ) : (
                    <td>
                      <span className="text-center">Action Taken</span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          <div
            className="d-flex justify-content-center mb-3"
            style={{ marginTop: "10px" }}
          >
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <span style={{ margin: "0 10px" }}>
              <div className="d-none d-sm-flex gap-2">
                {totalPages.map((page) => (
                  <div
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`btn ${
                      currentPage == page
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }  `}
                  >
                    {page}
                  </div>
                ))}
              </div>
            </span>
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === totalPages.length}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}

      {selectedField == "received" && receivedClaims.length == 0 && (
        <div className="w-100">
          <h3 className="text-center">No claims received</h3>
        </div>
      )}

      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center ">
            <img
              src={
                claimUser?.profilePic?.startsWith("http")
                  ? claimUser.profilePic
                  : claimUser
              }
              width={200}
              height={200}
              className="rounded-3"
              alt="User Image"
            />
          </div>
          <h5 className="text-center my-3">
            Username : <strong>{claimUser?.username}</strong>{" "}
          </h5>
          <h5 className="text-center my-3">
            Email : <strong>{claimUser?.email}</strong>{" "}
          </h5>
          <h5 className="text-center my-3">
            Joined At :{" "}
            <strong>
              {new Date(claimUser?.createdAt).toLocaleDateString()}
            </strong>{" "}
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyClaims;

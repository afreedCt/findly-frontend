import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import AdminHeader from "./AdminHeader";
import { adminClaimsAPI } from "../server/allAPI";
import Spinner from "react-bootstrap/Spinner";
const userDefaultImg =
  "https://img.freepik.com/premium-vector/minimalist-user-vector-icon-illustration_547110-2552.jpg";


const AdminAllClaims = () => {
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
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

  const [claims, setClaims] = useState([]);

  // console.log(claims)
  // console.log(claims);
  useEffect(() => {
    getAdminClaims();
  }, [searchKey]);

  const getAdminClaims = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        const res = await adminClaimsAPI(searchKey, reqHeader);
        // console.log(res);
        setClaims(res.data.claims);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error to get admin claims : ", error);
      }
    }
  };

  // <Spinner animation="border" variant="primary" />
  return (
    <div className="commonBg">
      <AdminHeader />
      <div className="d-flex justify-content-between mt-3 mb-2 me-">
        <h1 className="fw-bold my ms-5">All Claims</h1>
        <select
          onChange={(e) => setSearchKey(e.target.value)}
          name="filter"
          id=""
          className="p-2 me-5"
        >
          <option value="">All Claims</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>
      {loading ? (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : claims.length > 0 ? (
        <div className="overflow-auto ">
          {/* <div className="d-flex justify-content-between mx-4 my-3">
            <h1 className="fw-bold my ms-5">All Claims</h1>
          </div> */}
          <Table
            className="container"
            style={{ overflow: "hidden" }}
            striped
            bordered
            hover
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
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, ind) => (
                <tr key={ind}>
                  <td>{ind + 1}</td>
                  <td>{claim?.postId?.title}</td>
                  <td>
                    {claim?.claimerId.username}{" "}
                    <i
                      onClick={() => handleShow(claim.claimerId)}
                      className="ms-1"
                      style={{ cursor: "pointer" }}
                    >
                      👀
                    </i>
                  </td>
                  <td>{claim?.message} </td>
                  <td>{new Date(claim?.createdAt).toDateString()}</td>
                  <td
                    className={`${claim.status == "approved" && "text-success"}
                    ${claim.status == "rejected" && "text-danger"}
                    ${claim.status == "pending" && "text-warning"} fw-bold`}
                  >
                    {claim?.status}
                  </td>
                  {/* <td className="d-flex flex-wrap gap-2">
                        <button onClick={()=>handleUpdate(claim.claimId,"approve")} className="btn btn-outline-success">Approve</button>
                        <button onClick={()=>handleUpdate(claim.claimId,"reject")} className="btn btn-outline-danger">Reject</button>
                      </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="text-center my-3">
          <h3>No claims as of now</h3>
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
                  ? claimUser?.profilePic
                  : claimUser?.profilePic
                  ? `${SERVER_URL}/uploads/${claimUser.profilePic}`
                  : userDefaultImg
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

export default AdminAllClaims;

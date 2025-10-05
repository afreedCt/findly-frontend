import React, { useEffect, useState } from "react";
import { claims, dummyPosts } from "../assets/assets";
import { Table } from "react-bootstrap";
import AdminHeader from "./AdminHeader";
import { adminClaimsAPI } from "../server/allAPI";
import Spinner from "react-bootstrap/Spinner";
import { div } from "framer-motion/client";

const AdminAllClaims = () => {
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  // claims.map((c, i) => {
  //   let data = dummyPosts.find((p) => p.id == c.postId);
  //   claims[i] = { ...claims[i], post: data };
  // });

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
    <div className="">
      <AdminHeader />
      <div className="d-flex justify-content-end mt-3 me-5">
        <select
          onChange={(e) => setSearchKey(e.target.value)}
          name="filter"
          id=""
          className="p-2"
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
          <div className="d-flex justify-content-between mx-4 my-3">
            <h1 className="fw-bold my ms-5">All Claims</h1>
          </div>
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
                  <td>{claim?.claimerId.username}</td>
                  <td>{claim?.message} </td>
                  <td>{new Date(claim?.createdAt).toDateString()}</td>
                  <td
                    className={`${claim.status == "approved" && "text-success"}
                    ${claim.status == "rejected" && "text-danger"}
                    ${claim.status=="pending" && 'text-warning'} fw-bold`}
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
    </div>
  );
};

export default AdminAllClaims;

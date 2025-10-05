import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { Spinner, Table } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { getAllDonationAPI } from "../server/allAPI";
import CountUp from "react-countup";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [allPayments, setAllPayments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [loading, setLoading] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allPayments.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Array.from(
    { length: Math.ceil(allPayments.length / rowsPerPage) },
    (_, i) => i + 1
  );

  useEffect(() => {
    fetchAllDonations();
  }, []);

  const fetchAllDonations = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (token) {
      let reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        const res = await getAllDonationAPI(reqHeader);
        // console.log(res);
        setAllPayments(res.data.donations);
        setTotalUsers(res.data.totalUsers);
        setTotalPosts(res.data.totalPosts);
        setTotalSum(res.data.totalSum);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.messsage)
        console.log("error to get all donation details ", error.messsage);
      }
    }
  };
  return (
    <div>
      <AdminHeader />
      <div className="container mt-4 ">
        <div className="row gap-5 justify-content-center mb-4">
          <div className="col-md-3 shadow-lg p-4 user-gradient text-center text-light rounded-5">
            <h2>Total Users</h2>
            <h3 className="fw-bold">
              <CountUp end={totalUsers * 100} duration={2} />
            </h3>
          </div>
          <div className="col-md-3 shadow-lg p-4 post-gradient text-center text-light rounded-5">
            <h2>Total Posts</h2>
            <h3 className="fw-bold">
              <CountUp end={totalPosts * 100} duration={2} />
            </h3>
          </div>
          <div className="col-md-3 shadow-lg p-4 pay-gradient text-center text-light rounded-5">
            <h2>Total Payment</h2>
            <h3 className="fw-bold">
              &#8377;
              <CountUp end={totalSum} duration={2} />
            </h3>
          </div>
        </div>
        <h3 className="mb-4">Payment History</h3>
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Amount (₹)</th>
                  <th>Status</th>
                  {/* <th>Method</th> */}
                  <th>Date</th>
                  <th>Razorpay ID</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{payment.userId.username}</td>
                    <td>₹{payment.amount}</td>
                    <td>
                      <Badge
                        bg={payment.status === "paid" ? "success" : "danger"}
                      >
                        {payment.status}
                      </Badge>
                    </td>
                    {/* <td>{payment.method || "---"}</td> */}
                    <td>{new Date(payment.createdAt).toDateString()}</td>
                    <td>{payment.orderId}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Pagination buttons */}
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
                <div className="d-flex d-sm-none btn btn-primary">
                  {currentPage}
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
      </div>
    </div>
  );
};

export default Dashboard;

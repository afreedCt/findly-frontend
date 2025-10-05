import React, { useEffect, useState } from "react";
import { dummyPosts, users } from "../assets/assets";
import { Table } from "react-bootstrap";
import SwipeButton from "./SwipeButton";
import AdminHeader from "./AdminHeader";
import { getAllUsersAPI } from "../server/allAPI";
import SERVER_URL from "../server/server";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
const userDefaultPic =
  "https://img.freepik.com/premium-vector/minimalist-user-vector-icon-illustration_547110-2552.jpg";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serachInput,setSearchInput]=useState("")

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentUsers = allUsers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Array.from(
    { length: Math.ceil(allUsers.length / rowsPerPage) },
    (_, i) => i + 1
  );

  useEffect(() => {
    getAllUsers();
  }, [serachInput]);
  const getAllUsers = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        const res = await getAllUsersAPI(serachInput,reqHeader);
        // console.log(res);
        setAllUsers(res.data.users);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message)
        console.log("error to get all users data :", error.message);
      }
    }
  };
  return (
    <div className="">
      <AdminHeader />

      <div className="overflow-auto">
        <div className="d-flex justify-content-between my-4">
          <h1 className="ms-5 my-">All Users</h1>
          <input type="search" value={serachInput} onChange={(e)=>setSearchInput(e.target.value)} className="me-5 rounded-4 ps-3" placeholder="search by username" />
        </div>
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div>
            <Table className="container">
              <thead>
                <tr>
                  <th>
                    <strong>#</strong>
                  </th>
                  <th>
                    <strong>Name</strong>
                  </th>
                  <th>
                    <strong>Email</strong>
                  </th>
                  <th className="text-center">
                    <strong>Actions</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, ind) => (
                  <tr key={ind}>
                    <td>{ind + 1}</td>
                    <td>
                      <img
                        src={
                          user?.profilePic?.startsWith("http")
                            ? user.profilePic
                            : user.profilePic
                            ? `${SERVER_URL}/uploads/${user.profilePic}`
                            : userDefaultPic
                        }
                        width={40}
                        height={40}
                        alt={user?.username}
                        className="rounded-circle"
                      />{" "}
                      <span className="fw-bold">{user?.username}</span>
                    </td>
                    <td>{user?.email}</td>
                    <td>
                      <SwipeButton user={user} />
                    </td>
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

export default AllUsers;

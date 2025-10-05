import React, { useEffect } from "react";
import UserHeader from "./UserHeader";
import { useState } from "react";
import { getUserMessageAPI, updateMessageStatusAPI } from "../server/allAPI";
import { useContext } from "react";
import { userContext } from "../context/ContextAPI";
import { Spinner } from "react-bootstrap";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  // console.log(messages)
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentMessages = messages.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Array.from(
    { length: Math.ceil(messages.length / rowsPerPage) },
    (_, i) => i + 1
  );

  useEffect(() => {
    fetchUserMessages();
  }, []);

  const { getMessageCount } = useContext(userContext);

  const fetchUserMessages = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        const res = await getUserMessageAPI(reqHeader);
        // console.log(res)
        setMessages(res.data.messages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error to get user messages : ", error);
      }
    }
  };
  const markAsRead = async (msg) => {
    if(msg.status==="read") return 
    setLoadingId(msg._id);
    if (msg.status !== "read") {
      try {
        const token = sessionStorage.getItem("token");
        let reqHeader = {};
        let reqBody = {
          status: "read",
        };
        if (token) {
          reqHeader = {
            authorization: `Bearer ${token}`,
          };
          const res = await updateMessageStatusAPI(msg._id, reqBody, reqHeader);
          // console.log(res);
          fetchUserMessages();
          getMessageCount();
          setLoadingId(null);
        }
      } catch (error) {
        console.log("error to update a message status : ", error);
      } finally {
        setLoadingId(null);
      }
    }
  };
  return (
    <div className="commonBg py-3">
      <UserHeader />
      <div className="container mt-4">
        <div className="d-flex ">
          <h3 className="mb-3">📩 Messages </h3>
          <small className="mt-2 ms-2">(click to mark as read) </small>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : messages.length > 0 ? (
          <div>
            <ul className="list-group">
              {currentMessages.map((msg) => (
                <li
                  key={msg._id}
                  className={`list-group-item d-flex justify-content-between align-items-start ${
                    msg.status === "unread" ? "fw-bold" : ""
                  }`}
                  onClick={() => markAsRead(msg)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{msg.title}</div>
                    <small>{msg.text}</small>
                    <br />
                    {msg.email && (
                      <div>
                        <strong>Email : </strong>
                        <small>{msg.email}</small>
                        <br />
                        <strong>Username : </strong>
                        <small>{msg.username}</small>
                      </div>
                    )}
                  </div>
                  <span className="badge bg-secondary rounded-pill">
                    {new Date(msg.createdAt).toDateString()}
                    {loadingId == msg._id ? (
                      // <div className="d-flex justify-content-center">
                      <Spinner animation="border" variant="primary" />
                    ) : (
                      // </div>
                      <span
                        className={`fs-6 ms-2 text-info ${
                          msg.status === "read" ? "text-primary" : "text-dark"
                        } `}
                      >
                        {msg.status == "read" ? "✓✓" : "✓"}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
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
        ) : (
          <div className="w-100 text-center pb-3">
            <h3>No messages</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;

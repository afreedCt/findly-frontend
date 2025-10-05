import React, { useState } from "react";
import {
  Button,
  Card,
  FloatingLabel,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import GuestPageCards from "./GuestPageCards";
import SERVER_URL from "../server/server";
import SwipeButton from "./SwipeButton";
import {
  addMessageAPI,
  blockUserAPI,
  createWarningAPI,
  deletePostAPI,
  dismissMessageAPI,
  dismissReportAPI,
  updateReportAPI,
} from "../server/allAPI";
import { toast } from "react-toastify";
import { title } from "framer-motion/client";
const userDefaultImg =
  "https://img.freepik.com/premium-vector/minimalist-user-vector-icon-illustration_547110-2552.jpg";

const ReportActionModal = ({ getAllReports, report }) => {
  const token = sessionStorage.getItem("token");
  let reqHeader = {
    authorization: `Bearer ${token}`,
  };
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warnLoading, setWarnLoading] = useState(false);
  const [dismissLoading, setDismissLoading] = useState(false);
  //   const [message, setMessage] = useState("");
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  console.log(report);

  const handleDismiss = async () => {
    setDismissLoading(true);
    if (token) {
      try {
        const res = await dismissReportAPI(report._id, reqHeader);
        // console.log(res)
        getAllReports();
        const msgBody = {
          receiverId: report.reportedBy._id,
          type: "report",
          title: "Report Dismissed ❌",
          text: `Your ${report.type} report dismissed by admin `,
        };
        const msgRes = await dismissMessageAPI(msgBody, reqHeader);
        // console.log(msgRes)
        handleClose();
        toast.success(res.data.message);
        setDismissLoading(false);
      } catch (error) {
        setDismissLoading(false);
        console.log("error to dismiss report : ", error);
      }
    }
  };

  const handleReportBan = async () => {
    setLoading(true);
    if (token) {
      try {
        const res = await blockUserAPI(
          report.reportedUser._id,
          { isActive: false },
          reqHeader
        );
        if (res) {
          const reportRes = await updateReportAPI(
            report._id,
            { status: "baned" },
            reqHeader
          );
          // console.log(reportRes)
          const receiverBody = {
            receiverId: report.reportedBy._id,
            title: "Thanks for your report",
            text: "successfully baned the user , Thanks for your effort 💐",
            type: "report",
          };
          const senderBody = {
            receiverId: report.reportedUser._id,
            title: "you are baned ❌",
            text: "you are baned by admin due to violation of guidelines",
            type: "report",
          };

          const receiverRes = await dismissMessageAPI(receiverBody, reqHeader);
          const senderRes = await dismissMessageAPI(senderBody, reqHeader);
          // console.log(receiverRes);
          // console.log(senderRes);
        }

        handleClose();
        getAllReports();
        toast.success("successfully baned user");
        setLoading(false);
        //   console.log(res)
      } catch (error) {
        setLoading(false);
        console.log("error to Ban A user : ", error);
      }
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (token) {
      try {
        const res = await deletePostAPI(report.reportedPost._id, reqHeader);
        console.log(res);
        if (res) {
          const reportRes = await updateReportAPI(
            report._id,
            { status: "deleted" },
            reqHeader
          );
          // console.log("res", reportRes);
          const receiverBody = {
            receiverId: report.reportedBy._id,
            title: "Thanks for your report",
            text: "successfully deleted the post , Thanks for your effort keep going 💐",
            type: "report",
            // postId:report.reportedPost._id
          };
          const senderBody = {
            receiverId: report.reportedPost.postedBy,
            title: "Post deleted ❌",
            text: "you are Post deleted by admin due to violation of guidelines",
            type: "report",
            // postId:report.reportedPost._id
          };

          const receiverRes = await dismissMessageAPI(receiverBody, reqHeader);
          const senderRes = await dismissMessageAPI(senderBody, reqHeader);

          // console.log("res",receiverRes,"send",senderRes)
        }

        handleClose();
        getAllReports();
        toast.success("successfully deleted post");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error to delete a post report : ", error);
      }
      console.log(token);
    }
  };

  const handleWarn = async () => {
    setWarnLoading(true);
    if (token) {
      const reqBody = {
        postId: report.reportedPost._id,
        message: "Your post violates our guidelines",
      };
      try {
        const res = await createWarningAPI(reqBody, reqHeader);
        console.log(res) 
        const reportRes = await updateReportAPI(
            report._id,
            { status: "warned" },
            reqHeader
          );
        const receiverBody = {
          receiverId: report.reportedBy._id,
          title: "Thanks for your report",
          text: "successfully warned the user , Thanks for your effort keep going 💐",
          type: "report",
        };
        const senderBody = {
          receiverId: report.reportedPost.postedBy,
          title: "Warning ❌",
          text: "This is a warning for you, Your post violates our guidelines never repeat that",
          type: "report",
        };

        const receiverRes = await dismissMessageAPI(receiverBody, reqHeader);
        const senderRes = await dismissMessageAPI(senderBody, reqHeader);
        handleClose();
        getAllReports();
        toast.success("successfully warned the user");
        setWarnLoading(false);
        // console.log("res",receiverRes,"send",senderRes)
      } catch (error) {
        setWarnLoading(false);
        console.log("error to warn a user : ", error.message);
      }
    }
  };
  return (
    <div>
      <button onClick={handleShow} className="btn btn-primary">
        {/* <span className="me-1">👁️</span> */}
        View
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Reported {report.type == "post" ? "Post" : "User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {report.type == "post" ? (
            <div className="d-flex align-items-center flex-column">
              <GuestPageCards report post={report.reportedPost} />
              <div className="d-flex flex-column gap-2">
                <div>
                  <strong>Reported User : </strong>
                  {report.reportedBy.username}
                </div>
                <div>
                  <strong>Reported Count : </strong>
                  {report.reportedCount}
                  {/* {5} */}
                </div>
                <div>
                  <strong>Reported Date : </strong>
                  {new Date(report.createdAt).toDateString()}
                </div>
                <div>
                  <strong>Reason : </strong>
                  {report.reason}
                </div>
              </div>

              <div className="d-flex w-50 gap-2">
                {loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <button
                    onClick={handleDelete}
                    className="btn btn-danger my-2 w-100"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
                {warnLoading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <button
                    onClick={handleWarn}
                    className="btn btn-warning my-2 w-100"
                  >
                    Warn
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <Card
                data-aos="fade-up"
                style={{ width: "20rem" }}
                className="pb-3 shadow-lg"
              >
                <Card.Img
                  className="p-3 rounded-5"
                  style={{ overflow: "hidden" }}
                  variant="top"
                  width={150}
                  height={200}
                  src={
                    report.reportedUser.profilePic.startsWith("http")
                      ? report.reportedUser.profilePic
                      : report.reportedUser.profilePic
                      ? `${SERVER_URL}/uploads/${report.reportedUser?.profilePic}`
                      : userDefaultImg
                  }
                  alt={report?.reportedUser.username}
                />
                <Card.Body>
                  <Card.Text>
                    <strong>Username : </strong> {report?.reportedUser.username}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email : </strong> {report?.reportedUser.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Post Count : </strong> {report.postCount}
                  </Card.Text>
                  <Card.Text>
                    <strong>Joined At : </strong>{" "}
                    {new Date(report?.reportedUser.createdAt).toDateString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Reported By : </strong>{" "}
                    {report?.reportedBy.username}
                  </Card.Text>
                  <Card.Text>
                    <strong>Reported Date : </strong>{" "}
                    {new Date(report?.createdAt).toDateString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Reason : </strong> {report?.reason}
                  </Card.Text>
                  <Card.Text>
                    <strong>Reported Count : </strong> {report.reportedCount}
                  </Card.Text>
                  {/* <Card.Text> */}
                  {/* <SwipeButton user={report?.reportedUser} /> */}
                  {
                    loading?
                    <div className="d-flex justify-content-center"><Spinner animation="border" variant="primary" /></div>
                    :
                  <button
                    onClick={handleReportBan}
                    className="btn btn-success w-100 mt-3 rounded-5"
                  >
                    Ban
                  </button>

                  }
                  {/* </Card.Text> */}
                </Card.Body>
              </Card>
            </div>
          )}
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
            dismissLoading?
            <div className="d-flex justify-content-center"><Spinner animation="border" variant="primary" /></div>
            :<Button
            onClick={handleDismiss}
            className="btn btn-outline-primary"
            variant=""
          >
            Dismiss
          </Button>}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReportActionModal;

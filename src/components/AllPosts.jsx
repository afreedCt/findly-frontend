import React, { useContext, useState } from "react";
import GuestPageCards from "./GuestPageCards";
import UserHeader from "./UserHeader";
import CreatePostModal from "./CreatePostModal";
import { userContext } from "../context/ContextAPI";
import { Spinner } from "react-bootstrap";

const AllPosts = () => {
  const [postField, setPostField] = useState("");
  const { allPosts, user, loading } = useContext(userContext);
  // console.log(allPosts);

  return (
    <div className="commonBg">
      <UserHeader searchBar />
      <div className=" p-4"> 
        <div className=" d-flex justify-content-between align-items-center">
          <h3
            onClick={() => setPostField("")}
            style={{ cursor: "pointer" }}
            className="ms-4 my-3 ps-3 fw-bold"
          >
            All Posts
          </h3>
          <CreatePostModal />
        </div>
        <div className="my-3 ms-5 gap-3 d-flex">
          <button
            onClick={() => setPostField("lost")}
            className={`btn btn-outline-danger bg-${
              postField == "lost" ? "danger" : "white"
            } text-${postField == "lost" ? "white" : "dark"} px-4`}
          >
            lost
          </button>
          <button
            onClick={() => setPostField("found")}
            className={`btn btn-outline-success bg-${
              postField == "found" ? "success" : "white"
            } text-${postField == "found" ? "white" : "dark"}`}
          >
            found
          </button>
        </div>

        {/* </div> */}
        <div className="d-flex flex-wrap gap-3 ms-5 justify-content-center justify-content-md-start">
          {loading ? (
            <div className="d-flex justify-content-center w-100 h-100 align-items-center mt-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : !postField ? (
            allPosts
              .filter(
                (p, i) => p.postedBy?._id !== user._id 
              )
              .map((item, ind) => <GuestPageCards post={item} key={ind} />)
          ) : (
            allPosts
              .filter(
                (item) =>
                  item.postedBy._id !== user._id &&
                  item.type == postField &&
                  item.status == "active"
              ).length>0?
              allPosts
              .filter(
                (item) =>
                  item.postedBy._id !== user._id &&
                  item.type == postField &&
                  item.status == "active"
              ).map((item, ind) => <GuestPageCards post={item} key={ind} />)
              :
              <div className="d-flex justify-content-center w-100"><h3>No Posts </h3></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;

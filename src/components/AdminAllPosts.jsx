import React, { useContext } from "react";
import { dummyPosts } from "../assets/assets";
import GuestPageCards from "./GuestPageCards";
import AdminHeader from "./AdminHeader";
import { userContext } from "../context/ContextAPI";
import { Spinner } from "react-bootstrap";
const AdminAllPosts = () => {
  const {allPosts,loading}=useContext(userContext)
  return (
    <div className="dashboard pb-5">
      <AdminHeader />
      <h1 className="fw-bold ms-5 my-4">All Posts</h1>
      {
        loading?
        <div className="d-flex justify-content-center mx-4"><Spinner animation="border" variant="primary" /></div>
        :
        <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3 mx-4">
        {allPosts?.map((item, ind) => (
          <GuestPageCards admin post={item} key={item?._id} />
        ))}
      </div>}
    </div>
  );
};

export default AdminAllPosts;

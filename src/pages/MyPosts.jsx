import React, { useContext } from "react";
import UserHeader from "../components/UserHeader";
import { dummyPosts } from "../assets/assets";
import GuestPageCards from "../components/GuestPageCards";
import { userContext } from "../context/ContextAPI";

const MyPosts = () => {
  // const user = JSON.parse(sessionStorage.getItem("user"));
  const {user,allPosts}=useContext(userContext)
  const userPosts = allPosts.filter((p) => p.postedBy._id === user?._id);
  console.log("userPosts",userPosts);
  return (
    <div className="commonBg pb-4">
      <UserHeader />
      
      <h1 className="fw-bold ms-5 my-4">My Posts</h1>
      <div className="d-flex flex-wrap gap-3 ms-0 ms-md-5 justify-content-center justify-content-md-start">
        {
          userPosts.length>0?
          (
            userPosts.map((post, ind) => (
          <GuestPageCards key={ind} post={post} myPost />
        ))
          )
          :
          (
            <div className=" w-100"><h3 className="text-center">No posts rigth now</h3></div>
          )
        }
      </div>
    </div>
  );
};

export default MyPosts;

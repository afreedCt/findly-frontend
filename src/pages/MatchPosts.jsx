import React from "react";
import UserHeader from "../components/UserHeader";
import { dummyPosts } from "../assets/assets";
import { useParams } from "react-router-dom";
import GuestPageCards from "../components/GuestPageCards";
import { matchedPostsAPI } from "../server/allAPI";
import { useEffect } from "react";
import { useState } from "react";

const MatchPosts = () => {
  const { id: postId } = useParams();

  const [matchedPosts,setMatchedPosts]=useState({})
  // console.log(postId);
  // const user=JSON.parse(sessionStorage.getItem("user"))
  // const userPosts = dummyPosts.filter((p) => p.postedBy == user?.id);
  // const lostPost = dummyPosts.find((p) => p.id == postId);
  // const MatchedPosts = dummyPosts.filter(
  //   (p) =>
  //     (p.type == "found" &&
  //       p?.title
  //         .toLowerCase()
  //         .startsWith(lostPost.title.toLocaleLowerCase())) ||
  //     p.description
  //       .toLowerCase()
  //       .includes(lostPost.title.toLocaleLowerCase())
  // );
  // console.log("matched posts", MatchedPosts);

  useEffect(()=>{
    getMatchedPosts()
  },[])
  const getMatchedPosts=async()=>{
    try {
      const token=sessionStorage.getItem("token")
      if(token){
        let reqHeader={
          authorization:`Bearer ${token}`
        }
        const res=await matchedPostsAPI(postId,reqHeader)
        console.log(res)
        setMatchedPosts(res.data.matches)
      }
    } catch (error) {
      console.log("error to get matched posts : ",error.message)
    }
  }
  return (
    <div className="commonBg">
      <UserHeader />

      <h1 className="fw-bold ms-5 my-4">Matched Posts</h1>
      <div className="d-flex flex-wrap gap-3 ms-5 justify-content-center justify-content-md-start">
        {matchedPosts.length > 0 ? (
          <div className="d-flex flex-wrap gap-3 ms-5 justify-content-center justify-content-md-start mb-3">
            {matchedPosts.map((item, ind) => (
              <GuestPageCards key={ind} post={item} />
            ))}
          </div>
        ) : (
          <div>
            <h3>No matched Posts</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchPosts;

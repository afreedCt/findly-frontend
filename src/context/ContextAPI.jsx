import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  getAllClaimsAPI,
  getAllPostsAPI,
  getGuestPagePostsAPI,
  messageCountAPI,
} from "../server/allAPI";
import { claims } from "../assets/assets";

export const userContext = createContext();
const ContextAPI = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [allPosts, setAllPosts] = useState([]);
  const [allClaims, setAllClaims] = useState([]);
  const [guestPosts, setGuestPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(null);
  const [searchData, setSearchData] = useState("");

  // console.log("all claims", allClaims);

  // to get all posts data
  useEffect(() => {
    fetchAllClaims();
    getGuestPagePosts();
    getMessageCount();
    fetchAllPosts();
    // setUser(JSON.parse(sessionStorage.getItem("user")));
  }, [user]);

  useEffect(() => {
    fetchAllPosts();
  }, [searchData]);
  const fetchAllPosts = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        // console.log(searchData);
        const res = await getAllPostsAPI(searchData,reqHeader);
        setAllPosts(res.data.posts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error to get all posts ", error);
      }
    }
  };

  const fetchAllClaims = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        const res = await getAllClaimsAPI(reqHeader);
        setAllClaims(res.data.claims);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error to get all claims ", error.message);
      }
    }
  };

  const getGuestPagePosts = async () => {
    setLoading(true);
    try {
      const res = await getGuestPagePostsAPI(4);
      setGuestPosts(res.data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error to get guest page posts : ", error);
    }
  };

  const getMessageCount = async () => {
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };

      try {
        const res = await messageCountAPI(reqHeader);
        // console.log(res)
        setMessageCount(res.data.messageCount);
      } catch (error) {
        console.log("error to get message count : ", error.message);
      }
    }
  };
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        setAllPosts,
        allPosts,
        fetchAllPosts,
        allClaims,
        setAllClaims,
        guestPosts,
        fetchAllClaims,
        loading,
        messageCount,
        getMessageCount,
        setSearchData,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default ContextAPI;

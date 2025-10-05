import React from "react";
import { dummyPosts } from "../assets/assets";
import GuestPageCards from "../components/GuestPageCards";
import AdminHeader from "../components/AdminHeader";
import AdminAllPosts from "../components/AdminAllPosts";

const AdminDashboard = () => {
  return (
    <div>
      <AdminAllPosts/>
    </div>
  )
}

export default AdminDashboard
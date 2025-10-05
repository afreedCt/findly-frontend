import React, { useContext, useEffect, useState } from "react";
// import SideBar from "./SideBar";
import UserHeader from "./UserHeader";
import ChangeUserDataModal from "./ChangeUserDataModal";
import uploadImage from "../assets/image-upload.png";
import { userContext } from "../context/ContextAPI";
import SERVER_URL from "../server/server";
import AdminHeader from "./AdminHeader";
const userDefaultImg =
  "https://img.freepik.com/premium-vector/minimalist-user-vector-icon-illustration_547110-2552.jpg";

const Account = () => {
  // const [user, setUser] = useState({});
  // console.log(user)
  // useEffect(() => {
  //   setUser(JSON.parse(sessionStorage.getItem("user")));
  // }, []);

  const { user } = useContext(userContext);
  // console.log(user)
  return (
    <div className="commonBg w-100">
      {
        user.role=="user"?
        <UserHeader />
        :
        <AdminHeader/>
      }

      <div className="container mt-4">
        <div className="row">
          {/* <!-- Profile Card --> */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <img
                  width={150}
                  height={150}
                  src={
                    user?.profilePic?.startsWith("http")
                      ? user.profilePic
                      : user.profilePic
                      ? `${SERVER_URL}/uploads/${user?.profilePic}`
                      : userDefaultImg
                    //  || userDefaultImg
                  }
                  className="rounded-circle mb-3 p-3  "
                  alt="User Avatar"
                />
                <h4 className="card-title">{user?.username}</h4>
                <p className="text-muted">{user?.email}</p>
                <span className="badge bg-primary px-3 py-2 fw-bold">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* <!-- Profile Info --> */}
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                Profile Details
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>User ID:</strong>
                  </div>
                  <div className="col-sm-8">{user?._id}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Name:</strong>
                  </div>
                  <div className="col-sm-8">{user?.username}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Email:</strong>
                  </div>
                  <div className="col-sm-8">{user?.email}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Joined At:</strong>
                  </div>
                  <div className="col-sm-8">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="d-flex ">
                  {/* <button class="btn btn-primary me-2 text-center ms-5">
                    Edit Profile
                  </button> */}
                  <ChangeUserDataModal user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

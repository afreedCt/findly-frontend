import React from 'react'

import { Link } from 'react-router-dom'
import AllPosts from '../components/AllPosts'
// import SideBar from '../components/SideBar'
import UserHeader from '../components/UserHeader'
import Footer from '../components/Footer'
import { userContext } from '../context/ContextAPI'
import { useContext } from 'react'

const UserDashboard = () => {
   const {user,setUser}=useContext(userContext)
    // console.log("user",user)
  return (
    <div>
      <AllPosts/>
      {/* <Footer/> */}
    </div>
  )
}

export default UserDashboard
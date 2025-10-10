import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import LogoPic from "../assets/logo.jpg";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  loginAPI,
  registerAPI,
  sendOtpAPI,
  verifyOtpAPI,
} from "../server/allAPI";
import { useContext } from "react";
import { userContext } from "../context/ContextAPI";
// import OtpInput from "../components/otpInput";
import OtpInput from "../components/OtpInput";
import { Spinner } from "react-bootstrap";
import SERVER_URL from "../server/server";

const AuthPage = ({ isLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  // const [key,setKey]=useState("")
  const navigate = useNavigate();

  const { user, setUser } = useContext(userContext);

  const handleSendOtp = async () => {
    setOtpLoading(true);
    if (username && email && password) {
      try {
        const res = await sendOtpAPI({ email });
        console.log("res", res);
        if (res.status === 406) {
          toast.warning(res.response.data.message);
        }
        if (res.status === 201) {
          setOtp(res.data.data.otp);
        }
        setOtpLoading(false);
      } catch (error) {
        toast.error(error.message);
        setOtpLoading(false);
        console.log("error to send otp : ", error.message);
      }
    } else {
      setOtpLoading(false);
      toast.warning("please fill all the fields");
    }
  };

  const handleVerifyOtp = async (userOtp) => {
    // console.log("first", userOtp);

    try {
      const res = await verifyOtpAPI({
        username,
        email,
        password,
        otp: userOtp,
      });
      // console.log(res);

      if (res.status === 401 || res.status === 402 || res.status === 400) {
        toast.warning(res.response.data.message);
      }

      if (res.status === 201) {
        // console.log("going ot login page")
        setOtp("");
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
      // console.log("error to verify otp : ", error.message);
    }
  };

  const handleLogin = async () => {
    if (email && password) {
      try {
        const res = await loginAPI({ email, password });
        console.log("res", res);
        if (res.status == 406) {
          toast.info(res.response.data.message);
        }

        if (res.status == 401) {
          toast.warning("Incorrect password");
        }

        if (res.status === 201) {
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          sessionStorage.setItem("token", res.data.token);
          toast.success(res.data.message);
          setUser(res.data.user);
          if (!res.data.user.isActive) {
            toast.error("you are baned by admin");
            return;
          }

          if (res.data.user.role == "user") {
            // console.log("to user dashboard");
            navigate("/user-dashboard");
          } else {
            // console.log("to admin dashboard");
            navigate("/admin-dashboard");
          }
        }
      } catch (error) {
        // console.log("error to login in authPage : ", error.message);
        toast.error(error.message);
      }
    } else {
      toast.warning("Enter all fields");
    }
  };

  const handleGoogleSuccess = async (res) => {
    try {
      const token = res.credential;
      const response = await axios.post(`${SERVER_URL}/api/auth/google`, {
        token,
      });
      
      if (!response.data.user.isActive) {
        toast.error("you are baned by admin");
        return;
      }
      
      setUser(response.data.user);
      // console.log("first", response.data.user);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      sessionStorage.setItem("token", response.data.appToken);
      if (response.data.user.role == "user") {
        // console.log("to user dashboard");
        navigate("/user-dashboard");
      } else {
        // console.log("to admin dashboard");
        navigate("/admin-dashboard");
      }
      toast.success("successfully logined");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <div className="mt-4 ">
        <Header />
      </div>
      <div className="d-flex justify-content-center align-items- my-5 min-vh-70 rounded-5">
        <div
          className={`login shadow-lg row mx-3 mx-md-auto `}
          style={{
            width: "750px",
            height: "450px",
            borderRadius: "50px",
            overflow: "hidden",
            border: "1px solid blueviolet",
            boxShadow: "0 50x 10px rgba(65, 29, 164, 0.1)",
          }}
        >
          <div className="col-md-6 bg- right p-3 ">
            {!otp ? (
              <div>
                <h1 className="fw-bold text-dark text-center fs-1 mb-3">
                  {isLogin ? "Login" : "Register"}
                </h1>
                <form action="">
                  {!isLogin && (
                    <FloatingLabel
                      controlId="floatingInput2"
                      label="username"
                      className="mb-3"
                    >
                      <Form.Control
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="enter your username"
                      />
                    </FloatingLabel>
                  )}

                  <FloatingLabel
                    controlId="floatingInput1"
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      placeholder="name@example.com"
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      // onKeyDown={(e) => handleKeyDown(e)}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                    />
                  </FloatingLabel>
                </form>
                {
                  isLogin ? (
                    <button
                      onClick={handleLogin}
                      className="btn btn-outline-primary w-100 rounded-3 my-3"
                    >
                      Login
                    </button>
                  ) : // {
                  otpLoading ? (
                    <div className="d-flex justify-content-center mx-4 my-2">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <button
                      // onClick={handleRegister}
                      onClick={handleSendOtp}
                      className="btn btn-outline-primary w-100 rounded-3 my-3"
                    >
                      Register
                    </button>
                  )
                  // }
                }
                <GoogleOAuthProvider
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_SECRET}
                >
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log("Login Failed")}
                  />
                </GoogleOAuthProvider>
                {isLogin ? (
                  <p className="d-flex d-md-none mt-2 p-1">
                    Don't have an acount <Link to={"/register"}>Register</Link>
                  </p>
                ) : (
                  <p className="d-flex d-md-none mt-4 p-1">
                    Already have an acount <Link to={"/login"}>Login</Link>
                  </p>
                )}
              </div>
            ) : (
              // for otp section
              <OtpInput
                email={email}
                length={6}
                onSubmitOtp={handleVerifyOtp}
              />
            )}
          </div>

          <div
            className="left col-md-6 bg-info d-none d-md-flex flex-column justify-content- align-items-center text-white"
            style={{
              borderTopLeftRadius: "120px",
              borderBottomLeftRadius: "120px",
            }}
          >
            <img
              src={LogoPic}
              width={100}
              height={100}
              className="rounded-circle mt-5"
              alt="logo"
            />
            <h1>{isLogin ? "Hello Friend !" : "Welcome back !"}</h1>
            <h5 className=" p-3">
              {isLogin ? "Don't have an Account" : "Already have an Account"}
            </h5>
            {/* <h1>Welcome back !</h1>
//             <h4 className=" p-3">Already have an Account ...</h4> */}
            {isLogin ? (
              <Link
                className="text-decoration-none text-white fw-bold btn btn-white border border-2"
                to={"/register"}
              >
                Register
              </Link>
            ) : (
              <Link
                className="text-decoration-none text-white fw-bold btn btn-white border border-2"
                to={"/login"}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

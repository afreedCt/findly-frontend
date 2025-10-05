import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const OtpInput = ({ email, length, onSubmitOtp }) => {
  const [otpArr, setOtpArr] = useState(new Array(length).fill(""));
  const otpRefs = useRef([]);
  const [compinedOtp, setCompinedOtp] = useState("");

//   console.log(compinedOtp);
  useEffect(() => {
    // Focus the first input after the refs are attached
    const timer = setTimeout(() => {
      if (otpRefs.current[0]) {
        otpRefs.current[0].focus();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [length]); // runs again if OTP length changes

  const handleOtpChange = (index, e) => {
    const value = e.target.value;

    // Only allow numbers and 1 character per box
    if (!/^[0-9]?$/.test(value)) return;

    const newOtpArr = [...otpArr];
    newOtpArr[index] = value;
    setOtpArr(newOtpArr);

    setCompinedOtp(newOtpArr.join(""));

    // Auto move to next box
    if (value && index < length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace to move back
    if (e.key === "Backspace" && !otpArr[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpClick = (index) => {
    otpRefs.current[index].select();
    // otpRefs.current[index].setSelectionRange(1,1);
  };

  return (
    <div className="mt-5 d-flex flex-column justify-content-center">
      <h2 className="text-center mt-3 fw-bold">Verify OTP</h2>
      <p className="text-center">OTP sent to {email}</p>

      <div className="d-flex justify-content-center mt-1">
        {otpArr.map((val, index) => (
          <input
            key={index}
            ref={(input) => (otpRefs.current[index] = input)}
            type="text"
            className="m-1 text-center"
            style={{ width: "40px", height: "40px", fontSize: "20px" }}
            value={val}
            onChange={(e) => handleOtpChange(index, e)}
            onClick={() => handleOtpClick(index)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            maxLength={1}
          />
        ))}
      </div>
      {compinedOtp.length===length&&<div className="d-flex justify-content-center mt-4">
        <button onClick={()=>onSubmitOtp(compinedOtp)} className="btn btn-primary w-100">verify Otp</button>
      </div>}
      <div className="mt-4 mx-2">
        <span className="">
            Do you want to
        <Link  to={'/register'}>Change Email ?</Link>
        </span>
      </div>
    </div>
  );
};

export default OtpInput;

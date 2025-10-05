import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserHeader from "../components/UserHeader";
import logo from "../assets/logo.jpg";
import {
  addDonationMessageAPI,
  addMessageAPI,
  createOrderAPI,
  FailedOrderAPI,
  verifyOrderAPI,
} from "../server/allAPI";
import { useContext } from "react";
import { userContext } from "../context/ContextAPI";
import { Spinner } from "react-bootstrap";

const Donation = () => {
  // const user = JSON.parse(sessionStorage.getItem("user"));
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const {getMessageCount}=useContext(userContext)
  const [donationLoading,setDonationLoading]=useState(false)

  
  // Handle Payment
  const handlePayment = async (e) => {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
    // console.log("razorpayKey",razorpayKey)
    e.preventDefault(); // stop page reload
    setDonationLoading(true)
    
    if (!amount || amount <= 0) {
      toast.warning("Please enter a valid amount");
      setDonationLoading(false)
      return;
    }
    
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };
    }
    
      const data = await createOrderAPI({ amount }, reqHeader);
      // console.log("order response : ", data);
      
      const options = {
        key: razorpayKey, // test key
        amount: data.data.order.amount,
        currency: data.data.order.currency,
        name: "Findly",
      description: "Donation",
      image: logo,
      order_id: data.data.order.id,
      handler: async (response) => {
        setDonationLoading(true)
        try {
          const res = await verifyOrderAPI(response, reqHeader);
          // console.log("verify res", res);
          toast.success("successfully donated");
          
          if(res.status==201){
            const msgBody = {
              title: "successfully donated ✅",
              type: "system",
              text: `Thank you for donating ₹ ${amount} 🎉`,
            };
            
            
            const msgRes = await addDonationMessageAPI(msgBody, reqHeader);
            
            // console.log(msgRes);
            if(msgRes){
              getMessageCount()
            }
            
          }
          
          setDonationLoading(false)
        } catch (error) {
          setDonationLoading(false)
          console.log("verify error : ", error);
        }finally{
          setDonationLoading(false)
        }
      },
      theme: { color: "#6810e3ff" },
    };
    
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    let paymentFailedHandled = false;
    rzp1.on("payment.failed", async function (response) {
      setDonationLoading(true)
      // console.log(paymentFailedHandled)
      
      if(!paymentFailedHandled){
        try {
          const res = await FailedOrderAPI(response.error.metadata, reqHeader);
          // console.log(res);
        if (res.data.success) {
          const msgBody = {
            title: "Donation Failed ❌",
            type: "system",
            text: `Donation for ₹ ${amount} was failed`,
          };
          const msgRes = await addDonationMessageAPI(msgBody, reqHeader);
          // console.log(msgRes);
          paymentFailedHandled=true;
        }
        navigate("/all-posts");
        // toast.warning("payment failed")
      } catch (error) {
        setDonationLoading(false)
        console.log("error to update status failed : ", error);
      }
      }
    });
  };

  return (
    <div className="dashboard">
      <UserHeader />

      {donationLoading?
      <div className="d-flex justify-content-center align-items-center" style={{minHeight:"60vh"}}>
        <Spinner animation="border" variant="primary" />
      </div>
      :
      <div className="container pt-5 pb-3 ">
        <Link
          className="text-decoration-none text-dark mt-5 mx-5 w-25 h-25"
          style={{ marginRight: "", cursor: "pointer" }}
          to={"/all-posts"}
        >
          <i className="fa-solid fa-arrow-left ms-3 fs-2"></i>
        </Link>
        <div className="text-center mb-4">
          <h1 className="fw-bold text-primary">Support Findly ❤️</h1>
          <p className="text-muted">
            Your donation helps us reunite people with their lost items.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Enter Amount (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Eg: 100"
                    required
                  />
                </div>

                <div className="d-flex justify-content-center gap-2 mb-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary fw-bold"
                    onClick={() => setAmount(50)}
                  >
                    ₹50
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary fw-bold"
                    onClick={() => setAmount(100)}
                  >
                    ₹100
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary fw-bold"
                    onClick={() => setAmount(500)}
                  >
                    ₹500
                  </button>
                </div>

                <div className="text-center py-3">
                  <button
                    type="submit"
                    onClick={handlePayment}
                    className="btn btn-success px-5"
                  >
                    Donate Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-muted py-3">
          <small>✔ 100% Secure Payment with Razorpay</small>
        </div>
      </div>}
    </div>
  );
};

export default Donation;

import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { updateUserAPI } from "../server/allAPI";
import { userContext } from "../context/ContextAPI";
import { toast } from "react-toastify";
import SERVER_URL from "../server/server";

const userDefaultPic =
  "https://img.freepik.com/premium-vector/minimalist-user-vector-icon-illustration_547110-2552.jpg";

function ChangeUserDataModal({ user }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setUsername(user.username)
    setEmail(user.email)
    setPreviewImg("")
    setProfileImage("")
  };
  const handleShow = () => setShow(true);

  // const user = JSON.parse(sessionStorage.getItem("user"));

  const { setUser } = useContext(userContext);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profileImage, setProfileImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (profileImage) {
      setPreviewImg(URL.createObjectURL(profileImage));
    }
  }, [profileImage]);

  const handleChange = async () => {
    if (username && email) {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      previewImg
        ? reqBody.append("profilePic", profileImage)
        : reqBody.append("profilePic", user?.profilePic);

      const token = sessionStorage.getItem("token");
      let reqHeader = {};
      if (token) {
        reqHeader = {
          authorization: `Bearer ${token}`,
        };
        try {
          const res = await updateUserAPI(reqBody, reqHeader);
          // console.log(res);
          // fetchUserMessages()
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          setUser(res.data.user);
          toast.success("user updated successfully");
          handleClose();
        } catch (error) {
          console.log("error to get user messages : ", error);
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    // console.log(e.key == "Enter");
    if (e.key == "Enter") {
      handleChange();
    }
  };

  return (
    <>
      <Button
        variant=""
        className="btn btn-outline-primary mx-3 my-3"
        onClick={handleShow}
      >
        Change Details
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change User Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label
            className="d-flex justify-content-center"
            style={{ cursor: "pointer" }}
          >
            {previewImg ? (
              <img
                className="my-3"
                accept="image/*"
                width={150}
                height={150}
                src={previewImg || userDefaultPic}
                alt="upload image"
              />
            ) : (
              <img
                className="my-3 rounded-3"
                accept="image/*"
                width={200}
                height={200}
                src={
                  user?.profilePic?.startsWith("http")
                    ? user.profilePic
                    : user.profilePic
                    ? `${SERVER_URL}/uploads/${user.profilePic}`
                    : userDefaultPic
                }
                alt=""
              />
            )}
            <input
              onChange={(e) => setProfileImage(e.target.files[0])}
              type="file"
              accept="image/*"
              hidden
            />
          </label>
          <FloatingLabel
            controlId="floatingInput2"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="enter your username"
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput2"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="enter your username"
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-outline-danger"
            variant=""
            onClick={handleClose}
          >
            cancel
          </Button>
          <Button
            onClick={handleChange}
            className="btn btn-outline-primary"
            variant=""
          >
            change
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangeUserDataModal;

import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import uploadImage from "../assets/image-upload.png";
import { toast } from "react-toastify";
import { addPostAPI } from "../server/allAPI";
import { userContext } from "../context/ContextAPI";
import { Spinner } from "react-bootstrap";

const CreatePostModal = () => {
  const [show, setShow] = useState(false);
  const [loading,setLoading]=useState(false)

  const handleShow = () => setShow(true);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const {fetchAllPosts}=useContext(userContext)

  const [postDetails, setPostDetails] = useState({
    type: "lost",
    image: "",
    title: "",
    description: "",
    location: "",
    date:""
  });
  const handleClose = () => {
    setShow(false);
    setPostDetails({
      type: "lost",
      image: "",
      title: "",
      description: "",
      location: "",
      date:""
    });
  };
  // console.log(postDetails);
  const [previewImg, setPreviewImg] = useState("");
  // console.log(previewImg)

  useEffect(() => {
    if (postDetails.image) {
      setPreviewImg(URL.createObjectURL(postDetails.image));
    }
  }, [postDetails.image]);

  const handleCreatePost =async () => {
    setLoading(true)
    const { image, title, description, location ,date ,type} = postDetails;
    if (image && title && description && location && date && type) {
        const reqBody=new FormData()
        reqBody.append("postImage",image)
        reqBody.append("title",title)
        reqBody.append("description",description)
        reqBody.append("location",location)
        reqBody.append("type",type)
        reqBody.append("date",date)

        const token=sessionStorage.getItem("token")
        let reqHeader={}
        if (token) {
        reqHeader = {
          "content-type": "multypart/formdata",
          authorization: `Bearer ${token}`,
        };
      }

      try {
        const res=await addPostAPI(reqBody,reqHeader)
        // console.log(res)
        toast.success(res.data.message);
        handleClose();
        fetchAllPosts()
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log("error to create a post : ",error)
      }
    } else {
      setLoading(false)
      toast.warning("please fill all the fields");
    }
  };

  return (
    <div>
      <button
        // to={"/create-post"}
        onClick={handleShow}
        className="ms-5 btn btn-outline-primary text-decoration-none fw-bold fs-md-5"
        style={{ marginLeft: "100%" }}
      >
        Create Post
      </button>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column gap-3" action="">
            <label
              className="d-flex justify-content-center"
              style={{ cursor: "pointer" }}
            >
              <img
                width={150}
                height={150}
                src={previewImg || uploadImage}
                alt="upload image"
              />
              <input
                onChange={(e) =>
                  setPostDetails({ ...postDetails, image: e.target.files[0] })
                }
                type="file"
                accept="image/*"
                hidden
              />
            </label>
            <div className="">
              <label for="exampleSelect1" class="form-label mt-4">
                post type
              </label>
              <div className="row">
                <div className="col-md-6 mb-3 mb-md-0">
                  <select
                  class="form-select p-3 w-100"
                  id="exampleSelect1"
                  fdprocessedid="ayn519"
                  onChange={(e) =>
                    setPostDetails({ ...postDetails, type: e.target.value })
                  }
                >
                  <option className="p-3" value={"lost"}>
                    Lost
                  </option>
                  <option className="p-3" value={"found"}>
                    Found
                  </option>
                </select>
                </div>

                <FloatingLabel
                  controlId="floatingInput2"
                  label="Date"
                  className="col-md-6  "
                >
                  <Form.Control
                    onChange={(e) =>
                      setPostDetails({ ...postDetails, date: e.target.value })
                    }
                    type="date"
                    placeholder="enter title"
                  />
                </FloatingLabel>
              </div>
            </div>
            <div className="row">
              <FloatingLabel
                controlId="floatingInput2"
                label="title"
                className="col-md-6 mb-3 mb-md-0"
              >
                <Form.Control
                  onChange={(e) =>
                    setPostDetails({ ...postDetails, title: e.target.value })
                  }
                  type="text"
                  placeholder="enter title"
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput2"
                label="locatioin"
                className="col-md-6"
              >
                <Form.Control
                  onChange={(e) =>
                    setPostDetails({ ...postDetails, location: e.target.value })
                  }
                  type="text"
                  placeholder="enter descrition"
                />
              </FloatingLabel>
            </div>
            <FloatingLabel
              controlId="floatingInput2"
              label="description"
              className="mb-"
            >
              <Form.Control
                onChange={(e) =>
                  setPostDetails({
                    ...postDetails,
                    description: e.target.value,
                  })
                }
                type="text"
                placeholder="enter descrition"
              />
            </FloatingLabel>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          {
            loading?
            <div className="d-flex justify-content-center"><Spinner animation="border" variant="primary" /></div>
            :
          <Button variant="primary" onClick={handleCreatePost}>
            Create
          </Button>
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePostModal;

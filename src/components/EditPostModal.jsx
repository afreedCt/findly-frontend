import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import uploadImage from "../assets/image-upload.png";
import { toast } from "react-toastify";
import { userContext } from "../context/ContextAPI";
import SERVER_URL from "../server/server";
import { updatePostAPI } from "../server/allAPI";
import { Spinner } from "react-bootstrap";

const EditPostModal = ({ post }) => {
  const [show, setShow] = useState(false);
  // const [loading,setLoading]=useState(false)

  const handleShow = () => {
    setShow(true);
    setPostDetails({
      type: post?.type,
      image: "",
      title: post?.title,
      description: post?.description,
      location: post?.location,
      date:post.date.split("T")[0]
    });
  };
  const { user, fetchAllPosts ,loading} = useContext(userContext);

  const [postDetails, setPostDetails] = useState({
    type: post?.type,
    image: "",
    title: post?.title,
    description: post?.description,
    location: post?.location,
    date: post?.date.split("T")[0],
  });
  const handleClose = () => {
    setShow(false);
    setPostDetails({
      type: post?.type,
      image: "",
      title: post?.title,
      description: post?.description,
      location: post?.location,
      date: post?.date?.split("T")[0],
    });
    setPreviewImg("");
  };
  // console.log("post", postDetails);
  const [previewImg, setPreviewImg] = useState("");
  // console.log(previewImg);

  useEffect(() => {
    if (postDetails.image) {
      setPreviewImg(URL.createObjectURL(postDetails.image));
    }
  }, [postDetails.image]);

  const handleUpdatePost = async () => {
    const { title, type, description, location, date ,image } = postDetails;
    if (title && type && description && location && date) {
      const reqBody = new FormData();
      previewImg
        ? reqBody.append("postImage", image)
        : reqBody.append("postImage", post.postImage);
      reqBody.append("title", title);
      reqBody.append("description", description);
      reqBody.append("location", location);
      reqBody.append("type", type);
      reqBody.append("date", date);

      const token = sessionStorage.getItem("token");
      let reqHeader = {};
      if (token) {
        reqHeader = {
          "content-type": "multypart/formdata",
          authorization: `Bearer ${token}`,
        };
      }
      try {
        console.log("calling type");
        const res = await updatePostAPI(post._id, reqBody, reqHeader);
        console.log(res);
        toast.success(res.data.message);
        fetchAllPosts();
        handleClose();
      } catch (error) {
        console.log("error to update a post : ", error);
      }
    }
  };
  return (
    <div>
      <Button
        onClick={handleShow}
        className="p-2 w-100 rounded-3"
        variant="primary"
      >
        <i className="fa-solid fa-pencil"></i>
      </Button>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column gap-3" action="">
            <label
              className="d-flex justify-content-center"
              style={{ cursor: "pointer" }}
            >
              {postDetails.image ? (
                <img
                  width={150}
                  height={150}
                  src={previewImg || uploadImage}
                  alt="upload image"
                />
              ) : (
                <img
                  width={150}
                  height={150}
                  src={
                    `${SERVER_URL}/uploads/${post?.postImage}` || uploadImage
                  }
                  alt="upload image"
                />
              )}
              <input
                onChange={(e) =>
                  setPostDetails({ ...postDetails, image: e.target.files[0] })
                }
                type="file"
                accept="image/*"
                hidden
              />
            </label>
            <div>
              <label htmlFor="exampleSelect1" class="form-label mt-4">
                post type
              </label>
              <div className="row gap-2">
                <div className="col-md-6">
                  <select
                    className="form-select p-3"
                    id="exampleSelect1"
                    fdprocessedid="ayn519"
                    onChange={(e) =>
                      setPostDetails({ ...postDetails, type: e.target.value })
                    }
                    value={postDetails.type}
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
                    value={postDetails.date}
                    onChange={(e) =>
                      setPostDetails({ ...postDetails, date: e.target.value })
                    }
                    type="date"
                    placeholder="enter title"
                  />
                </FloatingLabel>
              </div>
            </div>

            <div className="row ">
              <FloatingLabel
                controlId="floatingInput2"
                label="title"
                className="mb-3 col-md-6"
              >
                <Form.Control
                  onChange={(e) =>
                    setPostDetails({ ...postDetails, title: e.target.value })
                  }
                  value={postDetails.title}
                  type="text"
                  placeholder="enter title"
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput2"
                label="location"
                className=" col-md-6"
              >
                <Form.Control
                  onChange={(e) =>
                    setPostDetails({ ...postDetails, location: e.target.value })
                  }
                  value={postDetails.location}
                  type="text"
                  placeholder="enter descrition"
                />
              </FloatingLabel>
            </div>
            <FloatingLabel
              controlId="floatingInput2"
              label="description"
              className="w-100"
            >
              <Form.Control
                onChange={(e) =>
                  setPostDetails({
                    ...postDetails,
                    description: e.target.value,
                  })
                }
                value={postDetails.description}
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
          <Button variant="primary" onClick={handleUpdatePost}>
            Update
          </Button>
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditPostModal;

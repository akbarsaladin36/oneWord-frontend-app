import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { createPost } from "../../redux/actions/post";
import styles from "./CreatePost.module.css";

function CreatePost() {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [keywords, setKeywords] = useState("");
  const [imagePost, setImagePost] = useState("");
  const [imagePostPreview, setImagePostPreview] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmitPost = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("postTitle", title);
    formData.append("imageFile", imagePost);
    formData.append("postMessage", message);
    formData.append("postKeywords", keywords);
    dispatch(createPost(formData))
      .then((res) => {
        // console.log(res);
        setIsSuccess(res.action.payload.data.msg);
        setIsError(false);
        setTimeout(() => {
          history.push("/home");
        }, 3000);
      })
      .catch((err) => {
        // console.log(err.response);
        setIsError(err.response.data.msg);
        setIsSuccess(false);
      });
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeMessage = (event) => {
    setMessage(event.target.value);
  };

  const changeKeywords = (event) => {
    setKeywords(event.target.value);
  };

  const imagePostUpload = (event) => {
    // const URL1 = window.webkitURL;
    const file = event.target.files[0];
    setImagePost(file);
    setImagePostPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <Navbar />
      <Container>
        <h1 className="mt-5 pt-5">Create Post</h1>
        {isSuccess && (
          <div className="alert alert-success mt-5" role="alert">
            {isSuccess}
          </div>
        )}
        {isError && (
          <div className="alert alert-danger mt-5" role="alert">
            {isError}
          </div>
        )}
        <Form className="mt-5" onSubmit={handleSubmitPost}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(event) => changeTitle(event)}
              placeholder="Enter your post title"
            />
          </Form.Group>
          {imagePostPreview && (
            <img
              src={imagePostPreview}
              alt="post preview thumbnail"
              className={styles.img_post_thumbnail}
            />
          )}
          <Form.Group controlId="formFile" className="mb-3 mt-3">
            <Form.Control
              type="file"
              onChange={(event) => imagePostUpload(event)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              value={message}
              onChange={(event) => changeMessage(event)}
              rows={10}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Keywords</Form.Label>
            <Form.Control
              type="text"
              value={keywords}
              onChange={(event) => changeKeywords(event)}
              placeholder="Enter your post title"
            />
          </Form.Group>
          <Button className={`${styles.submit_button} mt-3`} type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default CreatePost;

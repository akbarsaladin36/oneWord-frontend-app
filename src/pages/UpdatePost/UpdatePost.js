import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { onePost, updatePost } from "../../redux/actions/post";
import styles from "./UpdatePost.module.css";
require("dotenv").config();

function UpdatePost() {
  const { id } = useParams();
  const postDetail = useSelector((state) => state.post.dataOnePost);
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [keywords, setKeywords] = useState("");
  const [imagePost, setImagePost] = useState("");
  const [imagePostPreview, setImagePostPreview] = useState(null);

  useEffect(() => {
    getPostById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPostById = (id) => {
    dispatch(onePost(id))
      .then((res) => {
        console.log(res);
        setTitle(res.action.payload.data.data[0].posts_title);
        setMessage(res.action.payload.data.data[0].posts_message);
        setKeywords(res.action.payload.data.data[0].posts_keywords);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleUpdatePost = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("postTitle", title);
    formData.append("imageFile", imagePost);
    formData.append("postMessage", message);
    formData.append("postKeywords", keywords);
    dispatch(updatePost(id, formData))
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          history.push("/home");
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response);
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
        <h1 className="mt-5 pt-5">Update Post</h1>
        <Form className="mt-5" onSubmit={handleUpdatePost}>
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
            Update
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default UpdatePost;

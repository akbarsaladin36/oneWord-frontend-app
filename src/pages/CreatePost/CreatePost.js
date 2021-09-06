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

  const handleSubmitPost = (event) => {
    event.preventDefault();
    dispatch(
      createPost({
        postTitle: title,
        postMessage: message,
        postKeywords: keywords,
      })
    )
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

  return (
    <div>
      <Navbar />
      <Container>
        <h1 className="mt-5 pt-5">Create Post</h1>
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

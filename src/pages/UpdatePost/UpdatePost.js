import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { updatePost } from "../../redux/actions/post";
import styles from "./UpdatePost.module.css";

function UpdatePost(props) {
  const onePost = useSelector((state) => state.post.dataOnePost);
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(onePost.posts_title);
  const [message, setMessage] = useState(onePost.posts_message);
  const [keywords, setKeywords] = useState(onePost.posts_keywords);

  const handleUpdatePost = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    dispatch(
      updatePost(id, {
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

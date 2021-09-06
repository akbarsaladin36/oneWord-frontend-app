import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  onePost,
  createComment,
  getAllComment,
} from "../../redux/actions/post";
import styles from "./PostDetail.module.css";

function PostDetail(props) {
  const post = useSelector((state) => state.post.dataOnePost);
  const commentDetail = useSelector((state) => state.post.dataComment);
  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState("");
  const [postItem, setPostItem] = useState("");
  const [commentItem, setCommentItem] = useState([]);

  useEffect(() => {
    handlePostDetail();
    handleCommentDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePostDetail = () => {
    const id = props.match.params.id;
    dispatch(onePost(id))
      .then((res) => {
        // console.log(res);
        setPostItem(res.action.payload.data.data[0]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCommentDetail = () => {
    const id = props.match.params.id;
    dispatch(getAllComment(id))
      .then((res) => {
        // console.log(res);
        setCommentItem(res.action.payload.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    dispatch(
      createComment(id, {
        postId: post.posts_id,
        commentMessage: comment,
      })
    )
      .then((res) => {
        // console.log(res);
        dispatch(getAllComment(id));
        setComment("");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const changeComment = (event) => {
    setComment(event.target.value);
  };

  const handleToUpdatePost = (id) => {
    history.push(`/post/update-post/${id}`);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <h1 className="mt-5 pt-5">{postItem.posts_title}</h1>
          </Col>
          <Col className="mt-5 pt-5">
            <Button
              variant="success"
              className="mt-2 float-end"
              onClick={() => handleToUpdatePost(postItem.posts_id)}
            >
              Update Post
            </Button>
          </Col>
        </Row>
        <p className={`${styles.post_detail_message_paragraph} mt-3`}>
          {postItem.posts_message}
        </p>
        <b className="mt-3">Keywords: {postItem.posts_keywords}</b>
        <h1 className="mt-3">Comment</h1>
        <Form onSubmit={handleCommentSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(event) => changeComment(event)}
              className={styles.comment_form_width}
            />
          </Form.Group>
          <Button type="submit">Comment</Button>
        </Form>
        <h2 className="mt-3">All Comment</h2>
        {commentDetail === 0 || commentDetail === null ? (
          <div>
            <p>
              There is no comment in this post. Please become a first person to
              comment!
            </p>
          </div>
        ) : (
          commentDetail.map((item, index) => (
            <div key={index}>
              <b>{item.user_username}</b>
              <p>{item.comment_message}</p>
            </div>
          ))
        )}
        {}
      </Container>
      <Footer />
    </div>
  );
}

export default PostDetail;

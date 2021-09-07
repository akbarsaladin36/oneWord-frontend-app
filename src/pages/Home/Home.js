import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { allPosts, deletePost } from "../../redux/actions/post";
import DefaultPostPicture from "../../assets/default-post-image.jpg";
require("dotenv").config();

function Home() {
  const post = useSelector((state) => state.post.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllPosts = () => {
    dispatch(allPosts())
      .then((res) => {
        console.log(res);
        setPostList(res.action.payload.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id))
      .then((res) => {
        console.log(res);
        dispatch(allPosts());
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleDetailPost = (id) => {
    history.push(`/post/${id}`);
  };

  // console.log(post);

  return (
    <div>
      <Navbar />
      <Container>
        <h2 className="mt-5 pt-5">Recent Posts</h2>
        <Row>
          {post.data === null ? (
            <Col className="mt-5">
              <h3>{post.msg}</h3>
            </Col>
          ) : (
            post.map((item, index) => (
              <Col className="mt-5" key={index}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={
                      item.posts_image
                        ? `${process.env.REACT_APP_IMAGE_API_URL}${item.posts_image}`
                        : DefaultPostPicture
                    }
                  />
                  <Card.Body>
                    <Card.Title>{item.posts_title}</Card.Title>
                    <Card.Text>{item.posts_message}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        onClick={() => handleDetailPost(item.posts_id)}
                      >
                        Detail
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeletePost(item.posts_id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { oneUser, updateUserProfile } from "../../redux/actions/user";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
// import DefaultPostPicture from "../../assets/default-post-image.jpg";
import styles from "./Profile.module.css";
require("dotenv").config();

function Profile() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.dataOneUser);
  const dispatch = useDispatch();
  // const history = useHistory();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    getUserById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserById = (id) => {
    dispatch(oneUser(id))
      .then((res) => {
        console.log(res);
        setUsername(res.action.payload.data.data[0].user_username);
        setImage(res.action.payload.data.data[0].user_image);
        setFirstName(res.action.payload.data.data[0].user_first_name);
        setLastName(res.action.payload.data.data[0].user_last_name);
        setPhoneNumber(res.action.payload.data.data[0].user_phone_number);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleUpdateProfile = (event) => {
    // console.log("OK");
    event.preventDefault();
    const formData = new FormData();
    formData.append("userName", username);
    formData.append("imageFile", image);
    formData.append("userFirstName", firstName);
    formData.append("userLastName", lastName);
    formData.append("userPhoneNumber", phoneNumber);
    dispatch(updateUserProfile(id, formData))
      .then((res) => {
        console.log(res);
        dispatch(oneUser(id));
        // history.push("/home");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const imageUpload = (event) => {
    // const URL1 = window.webkitURL;
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const changeLastName = (event) => {
    setLastName(event.target.value);
  };

  const changePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  console.log(user);
  return (
    <div>
      <Navbar />
      <Container>
        <h1 className="mt-5 pt-5">My Profile</h1>
        <Row className="mt-5">
          <Col xs={3}>
            <Card style={{ width: "18rem" }}>
              <div className={styles.image_upload}>
                <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                  {!imagePreview && user.user_image ? (
                    <img
                      src={`${process.env.REACT_APP_IMAGE_API_URL}${image}`}
                      alt="profile user"
                      className={`${styles.profile_picture_size} rounded-circle mx-3 my-3`}
                    />
                  ) : (
                    <img
                      src={imagePreview}
                      alt="profile user"
                      className={`${styles.profile_picture_size} rounded-circle mx-3 my-3`}
                    />
                  )}
                </label>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => imageUpload(event)}
                />
              </div>
            </Card>
          </Col>
          <Col className="ms-5">
            <Form onSubmit={(event) => handleUpdateProfile(event)}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(event) => changeUsername(event)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={firstName}
                      onChange={(event) => changeFirstName(event)}
                      placeholder="Enter your first name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={lastName}
                      onChange={(event) => changeLastName(event)}
                      placeholder="Enter your last name"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={phoneNumber}
                      onChange={(event) => changePhoneNumber(event)}
                      placeholder="Enter your phone number"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                variant="primary"
                type="submit"
                className="form-control mt-3"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Profile;

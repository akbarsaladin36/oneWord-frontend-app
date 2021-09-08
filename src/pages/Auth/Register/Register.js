import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import styles from "./Register.module.css";
import { register } from "../../../redux/actions/auth";
import { Link, useHistory } from "react-router-dom";

function Register() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(
      register({ userName: username, userEmail: email, userPassword: password })
    )
      .then((res) => {
        // console.log(res);
        setIsSuccess(res.action.payload.data.msg);
        setIsError(false);
        setTimeout(() => {
          history.push("/login");
        }, 3000);
        setUserName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        // console.log(err.response);
        setIsError(err.response.data.msg);
        setIsSuccess(false);
      });
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changeUsername = (event) => {
    setUserName(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  // console.log(auth);

  return (
    <div>
      <Navbar />
      <Container>
        <div className={`${styles.register_body_size} mt-5 mb-5 mx-auto`}>
          <h2 className="text-center">Register</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(event) => changeUsername(event)}
                placeholder="Enter new username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => changeEmail(event)}
                placeholder="Enter new email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => changePassword(event)}
                placeholder="Enter new password"
              />
            </Form.Group>
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
            <Button
              variant="primary"
              className={`${styles.sign_up_button} mt-3`}
              type="submit"
            >
              Register Now!
            </Button>
          </Form>
          <p className="mt-3 text-center">
            Are you joined ? Please login {"  "}
            <Link to="/login">here</Link>
          </p>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Register;

import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import styles from "./Login.module.css";
import { login } from "../../../redux/actions/auth";
import { Link } from "react-router-dom";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ userEmail: email, userPassword: password }))
      .then((res) => {
        // console.log(res);
        localStorage.setItem("token", res.action.payload.data.data.token);
        localStorage.setItem("user", res.action.payload.data.data.user_id);
        localStorage.setItem("loginStatus", auth.isLogin);
        setIsSuccess(res.action.payload.data.msg);
        setIsError(false);
        setTimeout(() => {
          history.push("/home");
        }, 3000);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        // console.log(err.response);
        setIsError(err.response.data.msg);
        setIsSuccess(false);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div>
      <Navbar />
      <Container>
        <div
          className={`${styles.login_body_size} mt-5 mb-5 mx-auto pt-5 pb-5`}
        >
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                name="userEmail"
                onChange={(event) => changeEmail(event)}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="userPassword"
                value={password}
                onChange={(event) => changePassword(event)}
                placeholder="Password"
              />
            </Form.Group>
            <div className="float-end">
              <p>Forgot Password ?</p>
            </div>
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
              className={styles.sign_in_button}
              type="submit"
            >
              Login
            </Button>
          </Form>
          <p className="mt-3 text-center">
            You want to join ? Please register {"  "}
            <Link to="/register">here</Link>
          </p>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Login;

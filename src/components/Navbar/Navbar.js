// import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import styles from "./Navbar.module.css";

function Navbar1() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const authToken = localStorage.getItem("token");
  const isUser = localStorage.getItem("user");
  const isLoggedIn = localStorage.getItem("loginStatus");

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg" fixed="top">
        <Container>
          {isLoggedIn ? (
            <Navbar.Brand className={styles.navbar_color_word_1} href="/home">
              OneWord
            </Navbar.Brand>
          ) : (
            <Navbar.Brand className={styles.navbar_color_word_1} href="/">
              OneWord
            </Navbar.Brand>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {authToken && isLoggedIn && isUser ? (
              <Nav className="ms-auto">
                <Nav.Link
                  className={styles.navbar_color_word_1}
                  href="/create-post"
                >
                  Create a Post
                </Nav.Link>
                <Nav.Link
                  className={styles.navbar_color_word_1}
                  href={`/profile/${auth.data.user_id}`}
                >
                  Profile
                </Nav.Link>
                <Button onClick={handleLogout}>Logout</Button>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <Nav.Link className={styles.navbar_color_word_1} href="/login">
                  Login
                </Nav.Link>
                <Nav.Link
                  className={styles.navbar_color_word_1}
                  href="/register"
                >
                  Register
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbar1;

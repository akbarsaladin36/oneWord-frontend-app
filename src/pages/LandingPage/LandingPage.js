// import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import styles from "./LandingPage.module.css";
import HomePicture1 from "../../assets/default-background-image-1.jpg";
import HomePicture2 from "../../assets/default-background-image-2.jpg";
import HomePicture3 from "../../assets/default-background-image-3.jpg";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Container className="mb-5">
        <h1 className="mt-5 text-center pt-5">Welcome to OneWord</h1>
        <div
          className={`${styles.header_text_position_1} mt-5 d-flex justify-content-center`}
        >
          <h2>The clean and fastest blog on earth</h2>
        </div>
        <Row className="mt-5">
          <Col>
            <img
              src={HomePicture1}
              alt="home header 1"
              className={styles.left_home_image_1}
            />
          </Col>
          <Col className="mt-5">
            <h5 className={styles.header_text_position_1}>
              OneWord is the blog app that inspired from Blogger and Medium.
              This app are become clean and fastest blog in future. You can
              create your idea, opinion or etc to this blog.
            </h5>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mt-5">
            <h5 className={`${styles.header_text_position_2} mt-5`}>
              Every word can make the people know you, or make the people ask
              about your blog. Many human can talk each other via social media
              but there are many less people write on blog.
            </h5>
          </Col>
          <Col>
            <img
              src={HomePicture2}
              alt="home header 2"
              className={styles.left_home_image_2}
            />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <img
              src={HomePicture3}
              alt="home header 3"
              className={styles.left_home_image_1}
            />
          </Col>
          <Col className="mt-5">
            <h5 className={styles.header_text_position_1}>
              Our professional reviewer will check your blog every month. If
              your blog is great and your people's view is high than any other
              blog, Your blog will be paying with more money that can't be your
              imagine.
            </h5>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default LandingPage;

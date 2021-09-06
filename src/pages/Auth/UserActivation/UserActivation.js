import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link, useParams } from "react-router-dom";
import axiosApiIntances from "../../../utils/axios";

function UserActivation() {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axiosApiIntances
        .get(`auth/user-activation/${id}`)
        .then((res) => {
          console.log(res);
          console.log("Successfully get an id!");
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <div className="mt-5 text-center">
          <h2>Your account is activated!</h2>
          <p>
            Congratulation for you! Your account is activate! Now, you can login
            and create your new blog with your ideas{" "}
            <Link to="/login">here</Link>
          </p>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default UserActivation;

import { Form, Container, Button, Image } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { APIContext } from "../contexts/APIContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import vioScreenLogo2 from "../assets/logo2.png";

export default function LoginPage() {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const { URL } = useContext(APIContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";

  useEffect(() => {
    if (authToken) {
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath);
    }
  }, [authToken, navigate, redirectPath]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await axios.post(`${URL}/login`, { email, password });

      if (res.data && res.data.success === true && res.data.token) {
        setError(false);
        setAuthToken(res.data.token);
        console.log("Login success");
      }
    } catch (error) {
      if (error.status === 400) {
        setError(true);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        className="p-3 "
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Container className="d-flex justify-content-center">
          <Image
            src={vioScreenLogo2}
            className="p-3"
            style={{ maxHeight: "30vh" }}
            fluid
          />
        </Container>
        <h3 className="my-3 text-center">Login to your account</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>
          {error && (
            <p className="mt-2" style={{ color: "red" }}>
              Incorrect email or password
            </p>
          )}

          <Button
            variant="dark"
            className="mt-4"
            type="submit"
            style={{ width: "100%" }}
          >
            <i className="bi bi-box-arrow-in-right me-2" />
            Login
          </Button>
        </Form>
        <p className="mt-3">
          Need an account? <a href="/signup">Register</a>
        </p>
      </Container>
    </div>
  );
}

import { Form, Container, Button, Image } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIContext } from "../contexts/APIContext";
import vioScreenLogo2 from "../assets/logo2.png";

export default function SignupPage() {
  const { URL } = useContext(APIContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(`${URL}/signup`, {
        email,
        password,
        username,
        phonenumber,
      });
      if (res.data && res.data.success === true) {
        setError(false);
        navigate("/login");
      }
    } catch (error) {
      if (error.status === 409) {
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
        <h3 className="my-3 text-center">Create your account</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              type="text"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              value={phonenumber}
              type="tel"
              pattern="[0-9]{3}-[0-9]{7}"
              onChange={(event) => setPhonenumber(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
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
              email or phone number already used
            </p>
          )}
          <Button
            variant="dark"
            className="mt-4"
            type="submit"
            style={{ width: "100%" }}
          >
            <i className="bi bi-person-add me-2" />
            Sign Up
          </Button>
          <p className="mt-3">
            <a href="/login">Already have an account?</a>
          </p>
        </Form>
      </Container>
    </div>
  );
}

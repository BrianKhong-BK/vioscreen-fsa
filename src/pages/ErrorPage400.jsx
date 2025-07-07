import { Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo404 from "../assets/404-logo.png";

export default function ErrorPage400() {
  const navigate = useNavigate();

  function toHome() {
    navigate("/");
  }
  return (
    <div
      className="text-white py-4"
      style={{
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <Container
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "200px" }}
      >
        <Image src={logo404} style={{ maxHeight: "40vh" }} />
        <h1>Opps! Page Not Found</h1>
        <Button variant="outline-light" className="my-3" onClick={toHome}>
          <i className="bi bi-house me-2" />
          Back to home
        </Button>
      </Container>
    </div>
  );
}

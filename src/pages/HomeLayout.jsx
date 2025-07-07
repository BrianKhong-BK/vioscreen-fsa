import { Container, Button, Navbar, Image } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HomeLayout() {
  const navigate = useNavigate();

  function login() {
    navigate("/login");
  }

  function signUp() {
    navigate("/signup");
  }

  return (
    <>
      <Navbar className="bg-dark navbar-dark justify-content-between">
        <Container>
          <Navbar.Brand href="/">
            <Image
              className="me-2"
              src="/src/assets/logo.png"
              style={{ maxHeight: "30px" }}
              fluid
            />
            <strong>VioScreen</strong>
          </Navbar.Brand>
          <div>
            <Button variant="outline-light" className="me-2" onClick={login}>
              <i className="bi bi-box-arrow-in-right me-2" />
              Login
            </Button>
            <Button variant="outline-light" onClick={signUp}>
              <i className="bi bi-person-add me-2" />
              Sign Up
            </Button>
          </div>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

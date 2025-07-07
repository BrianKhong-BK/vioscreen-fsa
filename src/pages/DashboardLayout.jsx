import { Container, Button, Navbar, Nav, Image } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function DashboardLayout() {
  const { setAuthToken } = useContext(AuthContext);

  function logout() {
    setAuthToken("");
  }

  return (
    <>
      <Navbar className="bg-dark navbar-dark">
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
          <Container>
            <Nav>
              <Nav.Link href="/mybooking">MyBookings</Nav.Link>
            </Nav>
          </Container>
          <div>
            <Button variant="outline-light" className="d-flex" onClick={logout}>
              <i className="bi bi-box-arrow-in-right me-2" /> Logout
            </Button>
          </div>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

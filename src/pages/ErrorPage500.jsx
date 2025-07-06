import { Container, Image } from "react-bootstrap";

export default function ErrorPage500() {
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
        <Image src="/src/assets/500-logo.png" style={{ maxHeight: "40vh" }} />
        <h1>Internal Server Error</h1>
      </Container>
    </div>
  );
}

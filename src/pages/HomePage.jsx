import { Container, Card, Image, Col, Row, Button } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../contexts/APIContext";
import TrailerModal from "./TrailerModal";

export default function HomePage() {
  const { URL } = useContext(APIContext);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [videoId, setVideoId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getMovie() {
      try {
        const res = await axios.get(`${URL}/movies`);
        setMovies(res.data);
      } catch (error) {
        setError(true);
        console.error(error);
      }
    }

    getMovie();
  }, [URL]);

  function handleClose() {
    setShowModal(false);
  }

  function CardGroup() {
    return movies.map((movie, index) => {
      function handleBookNow() {
        navigate(`book-seats/${movie.id}`);
      }

      function handleModal() {
        setVideoId(movie.video);
        setShowModal(true);
      }

      return (
        <Col sm={3} key={index} className="mb-4">
          <Card className="bg-dark text-white border-0">
            <Card.Img variant="top" src={movie.image} className="rounded-top" />
            <Card.Body className="d-flex flex-column text-center">
              <Card.Title>{movie.name}</Card.Title>
              <Button variant="warning" className="mb-3" onClick={handleModal}>
                <i className="bi bi-film me-2" />
                Watch Trailer
              </Button>
              <Button variant="warning" onClick={handleBookNow}>
                <i className="bi bi-bookmark me-2" />
                Book Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  }

  return (
    <div
      style={{
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <Container>
        {error && <h1>500 Server Error</h1>}
        <Row className="p-3">
          <CardGroup />
        </Row>
        <TrailerModal
          show={showModal}
          handleClose={handleClose}
          videoId={videoId}
        />
      </Container>
    </div>
  );
}

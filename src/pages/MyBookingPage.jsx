import { APIContext } from "../contexts/APIContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Button, Card, Image, Col, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function MyBookingPage() {
  const navigate = useNavigate();
  const { URL } = useContext(APIContext);
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [clickMovieId, setClickMovieId] = useState("");
  const [clickMovie, setClickMovie] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const token = localStorage.getItem("authToken");
  const decode = jwtDecode(token);
  const userId = decode.id;

  useEffect(() => {
    async function getBookings() {
      try {
        const res = await axios.get(`${URL}/bookings/user/${userId}`);
        const results = res.data;
        setBookings(results.bookings);
        setMovies(results.movies);
      } catch (error) {
        console.error(error);
      }
    }

    getBookings();
  }, [URL, userId, refresh]);

  function MovieGroup() {
    return movies.map((movie, index) => {
      function handleClick() {
        setClickMovie(movie);
        setClickMovieId(movie.id);
      }

      return (
        <Col sm={3} key={index} className="mb-4">
          <Card className="bg-dark text-white border-0" onClick={handleClick}>
            <Card.Img variant="top" src={movie.image} className="rounded-top" />
            <Card.Body className="text-center">
              <Card.Title style={{ fontSize: "1vw" }}>
                {movie.movie_name}
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  }

  function BookingGroup() {
    return bookings
      .filter((booking) => booking.movie_name === clickMovie.movie_name)
      .map((booking, index) => {
        const d = new Date(`${booking.date}`);
        const showDate = d.toLocaleDateString("en-GB");
        const showDay = weekdayNames[d.getDay()];

        function handleEdit() {
          const data = {
            movieId: clickMovieId,
            bookingId: booking.id,
          };

          const json = JSON.stringify(data);
          const encoded = btoa(json);

          navigate(`/edit/${encoded}`);
        }

        async function handleDelete() {
          try {
            await axios.delete(`${URL}/bookings/${booking.id}`);
            setRefresh(!refresh);
          } catch (error) {
            console.error(error);
          }
        }
        return (
          <Card className="mb-3 bg-dark text-white" key={index}>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={9}>
                  <h5 className="mb-1">Seat: {booking.seat}</h5>
                  <p className="mb-0">
                    Date: {showDate} ({showDay})
                  </p>
                  <p className="mb-0">Time: {booking.time}</p>
                </Col>
                <Col md={3} className="text-md-end text-center mt-3 mt-md-0">
                  <Button
                    variant="outline-light"
                    className="me-2"
                    onClick={handleEdit}
                  >
                    <i className="bi bi-pencil-square me-2" />
                    Edit
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    <i className="bi bi-trash3 me-2" />
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
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
      <Container className="text-white">
        <h1>My Bookings</h1>

        {!clickMovie && (
          <Row className="p-3">
            <MovieGroup />
          </Row>
        )}
        {clickMovie && (
          <>
            <Container>
              <Button
                variant="outline-light"
                className="mb-3"
                onClick={() => setClickMovie(null)}
              >
                <i className="bi bi-arrow-left me-2" />
                Back
              </Button>
            </Container>

            <Row>
              <Col md={4}>
                <Container className="d-flex flex-column text-center">
                  <Image
                    src={clickMovie.image}
                    className="rounded mb-3"
                    fluid
                  />
                  <h1 className="mb-4">{clickMovie.movie_name}</h1>
                </Container>
              </Col>
              <Col md={8}>
                <BookingGroup />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

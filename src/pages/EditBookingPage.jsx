import { Container, Button, Image, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { APIContext } from "../contexts/APIContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SeatPage from "./SeatPage";
import { jwtDecode } from "jwt-decode";

export default function EditBookingPage() {
  const encoded = useParams().data;
  const decoded = atob(encoded);
  const data = JSON.parse(decoded);
  const { URL } = useContext(APIContext);
  const navigate = useNavigate();
  const movieId = parseInt(data.movieId);
  const bookingId = parseInt(data.bookingId);
  const [movie, setMovie] = useState("");
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [seatList, setSeatList] = useState([]);
  const [booking, setBooking] = useState([]);
  const [occupied, setOccupied] = useState([]);
  const [load, setLoad] = useState(false);
  const [seatEmpty, setSeatEmpty] = useState(false);
  const edit = true;
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    async function getShow() {
      try {
        const [res1, res2] = await Promise.all([
          axios.get(`${URL}/shows/${movieId}`),
          axios.get(`${URL}/bookings/${bookingId}`),
        ]);

        setMovie(res1.data.movie[0]);
        setDates(res1.data.dates);
        setTimes(res1.data.times);
        setBookDate(res2.data[0].date);
        setBookTime(res2.data[0].time);
        setBooking({
          seat: res2.data[0].seat,
          date: res2.data[0].date,
          time: res2.data[0].time,
        });

        setLoad(true);
      } catch (error) {
        console.error(error);
      }
    }

    async function getSeat() {
      const movieName = movie.name;
      const date = bookDate;
      const time = bookTime;

      if (movieName && date && time) {
        try {
          const res = await axios.post(`${URL}/bookseats`, {
            movieName,
            date,
            time,
          });
          setOccupied(
            res.data
              .filter((res) => {
                if (res.date === booking.date && res.time === booking.time) {
                  return res.seat !== booking.seat;
                } else {
                  return res.seat;
                }
              })
              .map((res) => res.seat)
          );
          if (bookDate === booking.date && bookTime === booking.time) {
            setSeatList([booking.seat]);
          } else {
            setSeatList([]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (!load) {
      getShow();
    } else {
      getSeat();
    }
  }, [movieId, load, bookDate, bookTime, movie.name, URL, bookingId]);

  function DateGroup() {
    return dates.map((date, index) => {
      const d = new Date(`${date.date}`);
      const showDate = d.toLocaleDateString("en-GB");
      const showDay = weekdayNames[d.getDay()];
      const isActive = bookDate === date.date ? "warning" : "outline-warning";

      function setDate() {
        setBookDate(date.date);
        setBookTime(
          times
            .filter((time) => time.date === date.date)
            .map((time) => time.time_slot)[0]
        );
      }

      return (
        <Button
          variant={isActive}
          key={index}
          className="d-flex flex-column me-3"
          onClick={setDate}
        >
          <span>{showDay}</span>
          <span>{showDate}</span>
        </Button>
      );
    });
  }

  function TimeGroup() {
    return times
      .filter((time) => time.date === bookDate)

      .map((time, index) => {
        const isActive =
          bookTime === time.time_slot ? "warning" : "outline-warning";
        function setTime() {
          setBookTime(time.time_slot);
        }
        return (
          <Button
            variant={isActive}
            key={index}
            className="d-flex flex-column me-3"
            onClick={setTime}
          >
            <span>{time.time_slot}</span>
          </Button>
        );
      });
  }

  async function handleUpdate() {
    if (seatList.length > 0) {
      const token = localStorage.getItem("authToken");
      const decode = jwtDecode(token);
      const userId = decode.id;
      const email = decode.email;
      const movieName = movie.name;
      const date = bookDate;
      const time = bookTime;
      const seat = seatList[0];

      try {
        await axios.put(`${URL}/bookings/${bookingId}`, {
          email,
          seat,
          movieName,
          date,
          time,
          userId,
        });
        navigate("/mybooking");
      } catch (error) {
        console.error(error);
      }
    } else {
      setSeatEmpty(true);
    }
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
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <Image
              src={movie.image}
              className="rounded mb-3"
              style={{ maxHeight: "500px" }}
              fluid
            ></Image>
            <h1 className="mb-4">{movie.name}</h1>
          </Col>
        </Row>

        <section className="mb-5">
          <h2 className="text-center mb-4">Select Date</h2>
          <div className="d-flex flex-wrap justify-content-center">
            <DateGroup />
          </div>
        </section>

        <section className="mb-5">
          <h2 className="text-center mb-4">Select Time</h2>
          <div className="d-flex flex-wrap justify-content-center">
            <TimeGroup />
          </div>
        </section>

        <section className="mb-5">
          <h2 className="text-center mb-4">Select Seat</h2>
          <div className="d-flex flex-wrap justify-content-center mb-4">
            <SeatPage
              seatList={seatList}
              setSeatList={setSeatList}
              occupied={occupied}
              edit={edit}
            />
          </div>
          {seatEmpty && (
            <p className="text-center" style={{ color: "red" }}>
              Please select a seat
            </p>
          )}
          <div className="d-flex flex-wrap justify-content-center">
            <Button variant="warning" onClick={handleUpdate}>
              <i className="bi bi-arrow-clockwise me-2" />
              Update
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}

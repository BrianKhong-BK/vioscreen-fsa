import { Button, Container } from "react-bootstrap";
import SeatButton from "../components/SeatButton";

export default function SeatPage({ seatList, setSeatList, occupied, edit }) {
  function SeatGroup({ seatsNumber, row }) {
    let count = 1;
    const seats = Array.from(
      { length: seatsNumber },
      () => row + (count++).toString()
    );
    return seats.map((seat, index) => {
      return (
        <SeatButton
          key={index}
          seat={seat}
          setSeatList={setSeatList}
          seatList={seatList}
          occupied={occupied}
          edit={edit}
          isActive={seatList.includes(seat) ? true : false}
        />
      );
    });
  }

  return (
    <Container>
      <Container className="d-flex flex-wrap justify-content-center">
        <SeatGroup seatsNumber={6} row={"A"} />
      </Container>
      <Container className="d-flex flex-wrap justify-content-center">
        <SeatGroup seatsNumber={10} row={"B"} />
      </Container>
      <Container className="d-flex flex-wrap justify-content-center">
        <SeatGroup seatsNumber={10} row={"C"} />
      </Container>
      <Container className="d-flex flex-wrap justify-content-center">
        <SeatGroup seatsNumber={10} row={"D"} />
      </Container>
    </Container>
  );
}

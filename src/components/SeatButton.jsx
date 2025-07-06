import { Button } from "react-bootstrap";

export default function SeatButton({
  seat,
  setSeatList,
  seatList,
  occupied,
  edit,
  isActive,
}) {
  const variant =
    isActive && edit
      ? "primary"
      : isActive
      ? "success"
      : occupied.includes(seat)
      ? "danger"
      : "secondary";

  function bookSeat() {
    if (!seatList.includes(seat) && !occupied.includes(seat)) {
      if (edit) {
        setSeatList([seat]);
      } else {
        setSeatList([...seatList, seat]);
      }
    } else {
      setSeatList(seatList.filter((s) => s !== seat));
    }
  }

  return (
    <Button
      variant={variant}
      className="d-flex justify-content-center m-1"
      style={{ height: "40px", width: "40px" }}
      onClick={bookSeat}
    >
      {seat}
    </Button>
  );
}

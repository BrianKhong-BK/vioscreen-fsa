import { Modal } from "react-bootstrap";

export default function TrailerModal({ show, handleClose, videoId }) {
  return (
    <Modal size="xl" show={show} onHide={handleClose} centered>
      <div className="ratio ratio-16x9">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </Modal>
  );
}

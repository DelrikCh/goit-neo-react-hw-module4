import styles from "./ImageModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function ImageModal({ image, onClose }) {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div
        className={styles.imageContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className={styles.modalImage}
        />
        <div className={styles.infoOverlay}>
          <p>Author: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
          <p>{image.description || image.alt_description}</p>
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;

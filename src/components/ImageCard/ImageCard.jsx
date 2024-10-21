import styles from "./ImageCard.module.css";
import { useState } from "react";
import Loader from "../Loader/Loader.jsx";

function ImageCard({ image }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={styles.cardContainer}>
      {isLoading && <Loader />}

      <img
        src={image.urls.small}
        alt={image.alt_description || "Image"}
        className={`${styles.cardImage} ${isLoading ? styles.hidden : ""}`}
        onLoad={handleImageLoad}
      />
    </div>
  );
}

export default ImageCard;

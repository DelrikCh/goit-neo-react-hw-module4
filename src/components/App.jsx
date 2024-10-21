/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import SearchBar from "./SearchBar/SearchBar.jsx";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";
import Loader from "./Loader/Loader.jsx";
import ErrorMessage from "./ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./ImageModal/ImageModal.jsx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

const ACCESS_KEY = "3vK9ZEsB5PMhCBQDe0IRrU9qRkUgPRVq9mkOmN_WNU8";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  const pageRef = useRef(1);

  const fetchImages = async (query, page) => {
    setIsLoading(true);
    setHasError(false);
    setNoResults(false);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query, page, per_page: 12 },
          headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
        }
      );

      const newImages = response.data.results;

      if (newImages.length === 0 && page === 1) {
        setNoResults(true);
        setHasMoreImages(false);
      } else if (newImages.length === 0 && page > 1) {
        setHasMoreImages(false);
      } else {
        const uniqueImages = newImages.filter(
          (newImage) => !images.some((image) => image.id === newImage.id)
        );
        setImages((prevImages) => [...prevImages, ...uniqueImages]);

        if (newImages.length < 12) {
          setHasMoreImages(false);
        }
      }
    } catch (error) {
      setHasError(true);
      toast.error("Error fetching images.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    pageRef.current = 1;
    setHasMoreImages(true);
    fetchImages(searchQuery, 1);
  };

  const handleLoadMore = () => {
    pageRef.current += 1;
    fetchImages(query, pageRef.current);
  };

  const handleImageClick = (image) => setSelectedImage(image);

  const closeModal = () => setSelectedImage(null);

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearch} />

      {noResults && <ErrorMessage message="No images found for this search." />}

      {hasError ? (
        <ErrorMessage message="There was an error loading images." />
      ) : (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}

      {isLoading && <Loader />}

      {images.length > 0 && !isLoading && hasMoreImages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
      <Toaster />
    </div>
  );
}

export default App;

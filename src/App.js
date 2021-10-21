import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Oval from './components/Loader/Loader';
import s from '../src/app.module.css';
import SearchBar from './components/SearchBar/Searchbar';
import fetchImages from './components/services/pixabay';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';

export default function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [bigImage, setBigImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchApi();
  }, [query]);

  const fetchApi = () => {
    setLoading(true);

    fetchImages(query, page)
      .then(data => {
        setData(s => [...s, ...data]);
        setPage(s => s + 1);

        if (page !== 1) {
          scrollOnLoadButton();
        }
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const handleSearch = q => {
    setQuery(q);
    setPage(1);
    setData([]);
  };

  const handleGalleryLargeItem = largeImageURL => {
    setBigImage(largeImageURL);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(s => !s);
    setBigImage('');
  };

  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const showMore = data.length > 0 && data.length >= 12;

  return (
    <div className={s.App}>
      <SearchBar searchProp={handleSearch} />
      <ToastContainer autoClose={3000} />
      <ImageGallery data={data} onImageClick={handleGalleryLargeItem} />
      {loading && <Oval />}
      {error && <h3>{error.message}</h3>}
      {showMore && <Button onClick={fetchApi} />}
      {showModal && <Modal onClose={toggleModal} bigImage={bigImage} />}
    </div>
  );
}

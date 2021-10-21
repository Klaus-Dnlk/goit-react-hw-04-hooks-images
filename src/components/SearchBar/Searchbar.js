import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from '../SearchBar/searchBar.module.css';

export default function SearchBar({ searchProp }) {
  const [imageName, setImageName] = useState('');

  const handleChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      toast.error('Input image name');
      return;
    }
    searchProp(imageName);
    setImageName('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images"
          value={imageName}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

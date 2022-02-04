import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const searchHandler = (e) => {
    if (e.code === 'Enter') {
      navigate(`/search?name[regex]=${searchValue}`);
      setSearchValue('');
    }
  };
  return (
    <input
      type='text'
      className='search-bar'
      placeholder='Search...'
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyUp={searchHandler}
    />
  );
}

export default SearchBar;

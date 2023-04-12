import { useState } from 'react';

import { SearchBarStyled, SearchForm } from './Searchbar.styled';

export const Searchbar = props => {
  const [searchRequest, setSearchRequest] = useState('');

  // state = {
  //   searchRequest: '',
  // };

  const handleChange = e => {
    setSearchRequest(e.target.value);
  };

  return (
    <SearchBarStyled
      onSubmit={e => {
        props.onSubmit(e);
      }}
    >
      <header className="searchbar">
        <SearchForm className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            name="searchValue"
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchRequest}
            onChange={handleChange}
          />
        </SearchForm>
      </header>
    </SearchBarStyled>
  );
};

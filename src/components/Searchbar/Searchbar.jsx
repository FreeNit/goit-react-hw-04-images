import { Component } from 'react';

import { SearchBarStyled, SearchForm } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchRequest: '',
  };

  handleChange = e => {
    this.setState({
      searchRequest: e.target.value,
    });
  };

  render() {
    return (
      <SearchBarStyled
        onSubmit={e => {
          this.props.onSubmit(e);
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
              value={this.state.searchRequest}
              onChange={this.handleChange}
            />
          </SearchForm>
        </header>
      </SearchBarStyled>
    );
  }
}

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../css/search.css';
import '../css/albuns.css';

class SearchInput extends Component {
  render() {
    const {
      load,
      inputChange,
      validArtist,
    } = this.props;
    return (
      <form action="" onSubmit={ load } className="search-input">
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ inputChange }
          name="artist"
          placeholder="DIGITE A SUA PESQUISA"
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ !validArtist }
        >
          PROCURAR
        </button>
      </form>
    );
  }
}

SearchInput.propTypes = {
  load: PropTypes.func,
  inputChange: PropTypes.func,
  validArtist: PropTypes.bool,
}.isRequired;

export default SearchInput;

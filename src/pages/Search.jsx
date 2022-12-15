import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artistName: '',
    validArtist: false,
  };

  artistValidate = () => {
    const { artistName } = this.state;
    const validName = artistName.length >= 2;
    this.setState({ validArtist: validName });
  };

  inputChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.artistValidate);
  };

  render() {
    const {
      validArtist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.inputChange }
            name="artistName"
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ !validArtist }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    artist: '',
    validArtist: false,
    albumsList: [],
    loading: false,
    search: false,
  };

  artistValidate = () => {
    const { artist } = this.state;
    const validName = artist.length >= 2;
    this.setState({ validArtist: validName });
  };

  inputChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.artistValidate);
  };

  searchAlbums = async () => {
    const { artist } = this.state;
    const albums = await searchAlbumsAPI(artist);
    this.setState({ albumsList: albums, loading: false, search: true });
  };

  load = (e) => {
    e.preventDefault();
    this.setState({ loading: true }, this.searchAlbums);
  };

  render() {
    const {
      validArtist,
      albumsList,
      artist,
      loading,
      search,
    } = this.state;
    return (
      <div data-testid="page-search">
        { !loading && (
          <form action="" onSubmit={ this.load }>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.inputChange }
              name="artist"
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ !validArtist }
            >
              Pesquisar
            </button>
          </form>) }

        { loading ? <Loading /> : (
          <section>
            {albumsList.length === 0 ? search && <h1>Nenhum álbum foi encontrado</h1> : (
              <div>
                <h1>{`Resultado de álbuns de: ${artist}`}</h1>
                <ul className="album-list">
                  {albumsList.map(({
                    collectionName,
                    artworkUrl100,
                    collectionId,
                    artistName,
                  }) => (
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      key={ collectionName }
                      to={ `album/${collectionId}` }
                    >
                      <li
                        className="album-item"
                      >
                        <img src={ artworkUrl100 } alt={ collectionName } />
                        <h2>{collectionName}</h2>
                        <h3>{artistName}</h3>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>)}
          </section>)}
      </div>
    );
  }
}

export default Search;

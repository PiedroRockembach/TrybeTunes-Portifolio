import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingLarge from '../components/LoadingLarge';
import SearchInput from '../components/SearchInput';

class Search extends Component {
  state = {
    artist: '',
    validArtist: false,
    albumsLi: [],
    loading: false,
    search: false,
    showName: '',
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
    const str = artist;
    const albums = await searchAlbumsAPI(str);
    this.setState({
      showName: str,
      albumsLi: albums,
      loading: false,
      search: true,
      artist: '',
    });
  };

  load = (e) => {
    e.preventDefault();
    this.setState({ loading: true }, this.searchAlbums);
  };

  render() {
    const {
      artist,
      validArtist,
      albumsLi,
      showName,
      loading,
      search,
    } = this.state;
    return (
      <div data-testid="page-search" className="page-search">
        <SearchInput
          load={ this.load }
          inputChange={ this.inputChange }
          validArtist={ validArtist }
          inputValue={ artist }
        />

        <section className="section-albuns">
          { loading ? <LoadingLarge /> : (
            <div className="albuns-menu">
              {albumsLi.length === 0 ? search && (
                <h1 className="not-found">Nenhum álbum foi encontrado</h1>
              ) : (
                <div className="albuns-container">
                  <h1>{`Resultado de álbuns de: ${showName}`}</h1>
                  <div className="album-list">
                    {albumsLi.map(({
                      collectionName,
                      artworkUrl100,
                      collectionId,
                      artistName,
                    }, index) => (
                      <Link
                        data-testid={ `link-to-album-${collectionId}` }
                        key={ `${collectionName}-${index}` }
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
                  </div>
                </div>)}
            </div>)}
        </section>
      </div>
    );
  }
}

export default Search;

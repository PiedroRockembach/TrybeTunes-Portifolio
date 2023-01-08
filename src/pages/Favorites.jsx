import React, { Component } from 'react';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

import '../css/favorites.css';

class Favorites extends Component {
  state = {
    loading: false,
    songList: [],
  };

  componentDidMount() {
    this.setState({ loading: true }, this.load);
  }

  load = () => {
    getFavoriteSongs().then((list) => this.setState({ songList: list, loading: false }));
  };

  refreshFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ songList: favorites });
  };

  render() {
    const {
      loading,
      songList,
    } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <header className="favorites-header">
          Músicas Favoritas
        </header>
        <div className="favorite-songs">
          {loading ? <Loading /> : (
            <ul>
              {songList.map((music) => (
                <MusicCard
                  key={ music.trackName }
                  trackName={ music.trackName }
                  url={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                  isLoading={ (bool) => this.setState({ loading: bool }) }
                  refresh={ this.refreshFavorites }
                  checked
                />
              ))}
            </ul>
          ) }
        </div>
      </div>
    );
  }
}

export default Favorites;

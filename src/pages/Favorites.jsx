import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

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
      <div data-testid="page-favorites">
        <Header />
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
    );
  }
}

export default Favorites;

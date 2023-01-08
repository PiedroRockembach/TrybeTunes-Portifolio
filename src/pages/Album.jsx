import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingLarge from '../components/LoadingLarge';

class Album extends Component {
  state = {
    loading: true,
    musicsList: [],
    artist: '',
    favoriteList: [],

  };

  componentDidMount() {
    const prop = this.props;
    const { id } = prop.match.params;
    this.getData(id).then(async (data) => {
      await this.refreshFavorites();
      this.setState({
        musicsList: data,
        artist: data[0].artistName,
        loading: false,
      });
    });
  }

  getData = async (id) => {
    const albumInfo = await getMusics(id);
    return albumInfo;
  };

  refreshFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteList: favorites }, this.checkFavorite);
  };

  checkFavorite = (music) => {
    const { favoriteList } = this.state;
    if (favoriteList.length !== 0 && music) {
      const bool = favoriteList.some((song) => song.trackId === music.trackId);
      return bool;
    }
  };

  render() {
    const {
      loading,
      artist,
      musicsList,
    } = this.state;
    return (
      <div data-testid="page-album">
        {loading ? <LoadingLarge /> : (
          <section>
            <h1 data-testid="artist-name">{artist}</h1>
            <h2 data-testid="album-name">
              {`${musicsList[0].collectionName}`}
            </h2>
            <ul>
              {musicsList.map((music, index) => index !== 0 && (
                <MusicCard
                  key={ music.trackName }
                  trackName={ music.trackName }
                  url={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                  isLoading={ (bool) => this.setState({ loading: bool }) }
                  refresh={ this.refreshFavorites }
                  checked={ this.checkFavorite(music) }
                />
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;
export default Album;

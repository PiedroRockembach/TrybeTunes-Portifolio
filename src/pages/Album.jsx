import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingLarge from '../components/LoadingLarge';

import '../css/albuns.css';

class Album extends Component {
  state = {
    loading: true,
    musicsList: [],
    artist: '',
    favoriteList: [],
    artwork: '',

  };

  componentDidMount() {
    const prop = this.props;
    const { id } = prop.match.params;
    this.getData(id).then(async (data) => {
      await this.refreshFavorites();
      console.log(data);
      this.setState({
        musicsList: data,
        artist: data[0].artistName,
        loading: false,
        artwork: data[0].artworkUrl100,
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
      artwork,
    } = this.state;
    return (
      <div data-testid="page-album" className="album-page">
        {loading ? <LoadingLarge /> : (
          <section className="album-content">
            <div className="album-pic">
              <img src={ artwork } alt="" />
            </div>
            <div className="album-songs">
              <header className="album-header">
                <h1 data-testid="artist-name">{artist}</h1>
                <h2 data-testid="album-name">
                  {`${musicsList[0].collectionName}`}
                </h2>
              </header>
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
            </div>
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

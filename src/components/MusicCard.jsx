import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  checkboxHandler = ({ target }) => {
    const { music } = this.props;
    if (target.checked) {
      this.setState({ loading: true }, () => {
        addSong(music)
          .then(() => this.setState({ loading: false }));
      });
    }
  };

  render() {
    const { loading } = this.state;
    const {
      url,
      trackName,
      trackId,
    } = this.props;
    return (
      <div>
        <h1>{trackName}</h1>
        <audio data-testid="audio-component" src={ url } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="trackId">
          {loading ? <Loading /> : 'Favorita' }
          <input
            type="checkbox"
            name=""
            id="trackId"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.checkboxHandler }
          />

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  url: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  music: PropTypes.object,
}.isRequired;
export default MusicCard;

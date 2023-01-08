import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    check: false,
  };

  componentDidMount() {
    const { checked } = this.props;
    this.setState({ check: checked });
  }

  checkboxHandler = async ({ target }) => {
    const { music, isLoading, refresh } = this.props;
    await isLoading(true);
    if (target.checked) {
      (await addSong(music));
    } else { await removeSong(music); }
    await refresh();
    await isLoading(false);
  };

  render() {
    const { check } = this.state;
    const {
      url,
      trackName,
      trackId,
    } = this.props;
    return (
      <div className="music-card">
        <div className="song-name"><h1>{trackName}</h1></div>
        <div className="album-track">
          <audio data-testid="audio-component" src={ url } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <label htmlFor={ trackId } className="favorite-checkbox">
          <input
            type="checkbox"
            name=""
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.checkboxHandler }
            checked={ check }
          />
          <span className="checkmark">&hearts;</span>
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
  isLoading: PropTypes.func,
  push: PropTypes.func,
  checked: PropTypes.bool,
}.isRequired;
export default MusicCard;

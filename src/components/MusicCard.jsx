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
    const { music, isLoading, refresh, push } = this.props;
    console.log(target.checked);
    await isLoading(true);
    if (target.checked) {
      (await addSong(music));
    } else { await removeSong(music); }
    await push();
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
          Favorita
          <input
            type="checkbox"
            name=""
            id="trackId"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.checkboxHandler }
            checked={ check }
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
  isLoading: PropTypes.func,
  push: PropTypes.func,
  checked: PropTypes.bool,
}.isRequired;
export default MusicCard;

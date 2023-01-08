import React, { Component } from 'react';
import '../css/loading.css';

const spin = require('../images/icon_spinner.png');

class LoadingLarge extends Component {
  render() {
    return (
      <div className="Loading-large-component">
        <section>
          <img src={ spin } alt="Spin" className="spin-large" />
          <span>Carregando...</span>
        </section>
      </div>
    );
  }
}

export default LoadingLarge;

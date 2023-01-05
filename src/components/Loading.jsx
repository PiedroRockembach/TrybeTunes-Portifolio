import React, { Component } from 'react';
import '../css/loading.css';

const spin = require('../images/icon_spinner.png');

class Loading extends Component {
  render() {
    return (
      <div className="Loading-component">
        <img src={ spin } alt="Spin" className="spin" />
        <span>Carregando...</span>
      </div>
    );
  }
}

export default Loading;

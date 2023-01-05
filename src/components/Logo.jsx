import React, { Component } from 'react';

const logo = require('../images/logo.png');

class Logo extends Component {
  render() {
    return (
      <img src={ logo } alt="Trybe Tunes" className="logo-component" />
    );
  }
}

export default Logo;

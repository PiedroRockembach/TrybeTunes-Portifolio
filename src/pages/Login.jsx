import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingLarge from '../components/LoadingLarge';
import Logo from '../components/Logo';

import '../css/login.css';

class Login extends Component {
  render() {
    const {
      userName,
      inputChange,
      validName,
      createUser,
      loading,
    } = this.props;
    return (
      loading ? <LoadingLarge />
        : (
          <div data-testid="page-login" className="page-login">
            <form action="" onSubmit={ createUser } className="form-login">
              <Logo />
              <input
                className="input-text "
                placeholder="qual o seu nome?"
                data-testid="login-name-input"
                type="text"
                value={ userName }
                name="userName"
                onChange={ inputChange }
              />
              <button
                className={ `input-button ${!validName && 'disabled'}` }
                type="submit"
                data-testid="login-submit-button"
                disabled={ !validName }
              >
                ENTRAR
              </button>
            </form>
          </div>
        )
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string,
  inputChange: PropTypes.func,
}.isRequired;
export default Login;

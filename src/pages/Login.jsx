import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Logo from '../components/Logo';

import '../css/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      loading ? <Loading />
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

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
          <div data-testid="page-login">
            <form action="" onSubmit={ createUser }>
              <input
                data-testid="login-name-input"
                type="text"
                value={ userName }
                name="userName"
                onChange={ inputChange }
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ !validName }
              >
                Entrar
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

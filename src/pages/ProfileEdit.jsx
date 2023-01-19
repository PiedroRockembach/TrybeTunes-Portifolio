import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingLarge from '../components/LoadingLarge';
import { getUser, updateUser } from '../services/userAPI';
import '../css/edit.css';

class ProfileEdit extends Component {
  state = {
    loading: true,
    name: '',
    email: '',
    description: '',
    image: '',
    verify: false,
  };

  componentDidMount() {
    getUser().then(({ name, email, description, image }) => this.setState({
      name,
      email,
      description,
      image,
      loading: false }));
  }

  updateLocalUser = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      description,
      image,
    } = this.state;
    await updateUser({ name, email, description, image });
    this.refresh();
  };

  refresh = () => {
    const { history } = this.props;
    history.push('/profile');
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.verifyInputs);
  };

  verifyInputs = () => {
    const {
      name,
      email,
      description,
      image,
    } = this.state;
    const vrfy = name !== '' && email !== '' && description !== '' && image !== '';
    this.setState({ verify: vrfy });
  };

  render() {
    const {
      loading,
      verify,
      name,
      email,
      description,
      image,

    } = this.state;
    return (
      <div data-testid="page-profile-edit" className="profile-container">
        { loading ? <LoadingLarge /> : (
          <div className="profile-page">
            <img src={ image } alt="" />
            <section className="profile-info">
              <form className="form-edit" onSubmit={ this.updateLocalUser }>
                <div htmlFor="perfil-edit-input-name">
                  <h1>Nome:</h1>
                  <input
                    name="name"
                    type="text"
                    data-testid="edit-input-name"
                    id="perfil-edit-input-name"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </div>
                <div htmlFor="perfil-edit-input-email">
                  <h1>Email:</h1>
                  <input
                    name="email"
                    type="email"
                    data-testid="edit-input-email"
                    id="perfil-edit-input-email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                </div>
                <div htmlFor="perfil-edit-input-description">
                  <h1>Descrição:</h1>
                  <textarea
                    name="description"
                    cols="30"
                    rows="10"
                    data-testid="edit-input-description"
                    id="perfil-edit-input-description"
                    value={ description }
                    onChange={ this.handleChange }
                  />
                </div>
                <div htmlFor="perfil-edit-input-image">
                  <h1>Link da Imagem:</h1>
                  <input
                    name="image"
                    type="text"
                    data-testid="edit-input-image"
                    id="perfil-edit-input-image"
                    value={ image }
                    onChange={ this.handleChange }
                  />
                </div>
                <button
                  type="submit"
                  data-testid="edit-button-save"
                  disabled={ !verify }
                >
                  Editar perfil
                </button>
              </form>
            </section>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.array,
}.isRequired;

export default ProfileEdit;

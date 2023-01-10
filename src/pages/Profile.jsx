import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoadingLarge from '../components/LoadingLarge';
import '../css/profile.css';
import { getUser } from '../services/userAPI';

const defaultURL = 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527__340.png';
const defEmail = 'Você ainda não cadastrou seu email.';
const defdescription = 'Você ainda não tem uma descrição';
class Profile extends Component {
  state = {
    description: '',
    email: '',
    image: defaultURL,
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    getUser().then((data) => {
      const { description, email, image, name } = data;
      this.setState({
        description: description === '' ? defdescription : description,
        email: email === '' ? defEmail : email,
        image: image === '' ? defaultURL : image,
        name,
        loading: false,
      });
    });
  }

  render() {
    const { description, email, image, name, loading } = this.state;
    return (
      <div className="profile-container">
        {loading ? <LoadingLarge /> : (
          <div data-testid="page-profile" className="profile-page">
            <img
              src={ image }
              alt=""
              className="profile-img"
              data-testid="profile-image"
            />
            <section className="profile-info">
              <div className="profile-name">
                <h1>Nome</h1>
                <p>{ name }</p>
              </div>
              <div className="profile-email">
                <h1>E-mail</h1>
                <p>{ email }</p>
              </div>
              <div className="profile-description">
                <h1>Descrição</h1>
                <p>{ description }</p>
              </div>
              <Link to="/profile/edit"><button type="submit">Editar perfil</button></Link>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;

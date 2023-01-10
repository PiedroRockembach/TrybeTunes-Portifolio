import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Logo from './Logo';

class Header extends Component {
  state = {
    name: '',
    loading: true,
  };

  componentDidMount() {
    this.getUserName()
      .then((data) => this.setState({ name: data, loading: false }));
  }

  getUserName = async () => {
    const user = await getUser();
    const a = user.name;
    return a;
  };

  render() {
    const {
      name,
      loading,
    } = this.state;
    return (
      <header data-testid="header-component" className="header-component">
        <Logo />
        <nav className="nav-menu">
          <ul className="nav-list">
            <li>
              &#x1F50D; &nbsp;
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Pesquisa
              </Link>
            </li>
            <li>
              &#9733; &nbsp;
              <Link to="/favorites" data-testid="link-to-favorites">
                Favoritas
              </Link>
            </li>
            <li>
              &#128100; &nbsp;
              <Link to="/profile" data-testid="link-to-profile">
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
        {loading ? <Loading />
          : (
            <h2 data-testid="header-user-name" className="user-name">
              { name }
            </h2>
          )}
      </header>
    );
  }
}

export default Header;

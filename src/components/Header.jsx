import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
      <header data-testid="header-component">
        {loading ? <Loading />
          : (
            <h2 data-testid="header-user-name">
              { name }
            </h2>
          )}
        <nav>
          <ul>
            <li><Link to="/search" data-testid="link-to-search">Pesquisar</Link></li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Músicas Favoritas
              </Link>
            </li>
            <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;

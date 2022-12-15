import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;

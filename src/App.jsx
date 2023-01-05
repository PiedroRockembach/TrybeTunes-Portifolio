import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Header from './components/Header';

import { createUser } from './services/userAPI';
import './css/app.css';

class App extends React.Component {
  state = {
    userName: '',
    validName: false,
    loading: false,
    loged: false,
  };

  sendUser = (e) => {
    e.preventDefault();
    this.setState({ loading: true }, async () => {
      const { userName } = this.state;
      await createUser({ name: userName });
      this.setState({ loading: false, loged: true });
    });
  };

  nameValidate = () => {
    const { userName } = this.state;
    const validNumber = 3;
    const comparator = userName.length >= validNumber;
    this.setState({ validName: comparator });
  };

  inputChange = ({ target }) => {
    const state = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [state]: value,
    }, () => {
      this.nameValidate();
    });
  };

  render() {
    const {
      userName,
      validName,
      loading,
      loged,
    } = this.state;
    return (
      <div className="main-component">
        <BrowserRouter>
          {loged && <Header />}
          <main>
            <Switch>
              <Route
                exact
                path="/"
              >
                { loged ? <Redirect to="/search" />
                  : (
                    <Login
                      userName={ userName }
                      inputChange={ this.inputChange }
                      validName={ validName }
                      createUser={ this.sendUser }
                      loading={ loading }
                    />)}
              </Route>
              <Route exact path="/search" render={ () => <Search /> } />
              <Route
                exact
                path="/album/:id"
                render={ (props) => <Album { ...props } /> }
              />
              <Route exact path="/favorites" render={ () => <Favorites /> } />
              <Route exact path="/profile" render={ () => <Profile /> } />
              <Route exact path="/profile/edit" render={ () => <ProfileEdit /> } />
              <Route path="*" render={ () => <NotFound /> } />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

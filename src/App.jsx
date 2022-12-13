import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" render={ () => <Login /> } />
        <Route exact path="/search" render={ () => <Search /> } />
        <Route exact path="/album/:id" render={ () => <Album /> } />
        <Route exact path="/favorites" render={ () => <Favorites /> } />
        <Route exact path="/profile" render={ () => <Profile /> } />
        <Route exact path="/profile/edit" render={ () => <ProfileEdit /> } />
        <Route exact path="*" render={ () => <NotFound /> } />
      </BrowserRouter>
    );
  }
}

export default App;

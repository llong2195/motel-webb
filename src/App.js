import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Creator from './components/Creator/Creator';
import Profile from './components/Creator/Profile';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/post" />} />
          <Route path="/post" exact component={Home} />
          <Route path="/post/search" exact component={Home} />
          <Route path="/post/:id" exact component={PostDetails} />
          <Route
            path={['/creators/:id']}
            component={Creator}
          />
          <Route
            path={['/profile/:id']}
            component={Profile}
          />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/post" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;

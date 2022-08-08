import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/Store';
import 'antd/dist/antd.css';
import Container from './components/Container';
import Home from './pages/Home';
import Report from './pages/Report';

import './assets/styles/global.css';

const App = () => {
  return(
    <Router>
      <Provider store={store}>
        <Container>
          <Switch>
            <Route 
              exact 
              path="/"
            >
              <Home />
            </Route>
            <Route path="/report">
              <Report />
            </Route>
          </Switch>
        </Container>
      </Provider>
    </Router>
  );
};

export default App;

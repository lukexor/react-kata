import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import LandingPage from './pages/Landing'

export default () => (
  <main style={{margin: '0 auto', maxWidth: 1200}}>
    <Router >
      <Switch>
        <Route exact path="/" >
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  </main>
)
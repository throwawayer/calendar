import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Routes from 'router/routes';
import AppContainer from 'containers/AppContainer';
import SpinnerContainer from 'containers/common/SpinnerContainer';

export default hot(module)(() => (
  <Router>
    <AppContainer>
      <Suspense fallback={<SpinnerContainer />}>
        <Switch>
          {Routes.map((route) => (
            <Route
              exact={route.exact}
              path={route.path}
              component={route.component}
              key={route.key}
            />
          ))}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Suspense>
    </AppContainer>
  </Router>
));

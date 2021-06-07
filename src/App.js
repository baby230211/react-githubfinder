import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Suspense, lazy } from 'react';

import GithubState from './context/githubState';
import AlertState from './context/alertState';

// component
import NabBar from './components/NavBar';
import Spinner from './components/utils/Spinner';

// Page
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
const About = lazy(() => import('./components/pages/About'));
const User = lazy(() => import('./components/Users/User'));
function App() {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <NabBar />
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/about">
                <Suspense fallback={<Spinner />}>
                  <About />
                </Suspense>
              </Route>
              <Route
                exact
                path="/user/:login"
                render={props => (
                  // 省略return ()
                  <Suspense fallback={<Spinner />}>
                    <User {...props} />
                  </Suspense>
                )}
              />
              <Route exact path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;

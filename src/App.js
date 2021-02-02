import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { AuthProvider } from './Firebase/auth-context';

import './App.css';
import Quiz from './containers/Quiz/Quiz';
import Authentication from './containers/Authentication/Authentication';

function App() {
  const routes = <Switch>
    <Route path="/auth" exact component={Authentication}></Route>
    <Route path="/quiz" exact component={Quiz}></Route>
    <Redirect to="/quiz"/>
  </Switch>;


<Route path="/" exact component={Quiz}></Route>
  return (
    <AuthProvider>
        <div className="App">
          {routes}
        </div>
    </AuthProvider>
  );
}

export default withRouter(App);

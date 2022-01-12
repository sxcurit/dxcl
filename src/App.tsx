import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Create from './components/customer/Create';
import EditClients from './components/customer/Edit';
import Footer from './components/Footer';
import Page from './components/Page';
import Clients from './components/Clients';
class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>

            <li>
              <Link to={'/clients'}>Clients </Link>
            </li>

            <li>
              <Link to={'/about'}> About </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={'/'} exact component={Page} />
          <Route path={'/clients'} exact component={Clients} />
          <Route path={'/addclients'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={EditClients} />
        </Switch>

        <Switch>
        <Route path={'/'} exact component={Footer} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
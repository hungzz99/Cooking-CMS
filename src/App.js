import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";
import withTracker from "./withTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import {
  InstantSearch,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';


const searchClient = algoliasearch('MAN6LLCBXM', 'cb0affd964bf1e6e4fd384dd5c93e4f5');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reloadCache: false,
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    this.setState({ refresh: true }, () => {
      this.setState({ refresh: false });
    });
  }

  render() {
    return (
      <InstantSearch indexName="posts" searchClient={searchClient} refresh={this.state.reloadCache}>
        <Router onChange={this.onChange} basename={process.env.REACT_APP_BASENAME || ""}>
          <div>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={withTracker(props => {
                    return (
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    );
                  })}
                />
              );
            })}
          </div>
        </Router>
      </InstantSearch>
    )
  }
}

export default App;

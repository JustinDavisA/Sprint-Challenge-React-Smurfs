import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSmurf: null,
      smurfs: [],
      error: ''
    };
  }
  
  componentDidMount() {
    console.log('CDM now running');
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        console.log(res);
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  }

  addSmurf = (e, smurf) => {
    e.peventDefault();
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
        this.props.history.push('/smurf-list')
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        {/* <SmurfForm />
        <Smurfs smurfs={this.state.smurfs} /> */}
        <Route 
          path = '/'
          render = {props => (
            <SmurfForm
              {...props}
            />
          )}
        />
        <Route 
          exact path = '/'
          render = {props => (
            <Smurfs
              {...props}
              smurfs = {this.state.smurfs}
            />
          )}
        />
      </div>
    );
  }
}

export default App;

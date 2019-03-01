import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {
  BrowserRouter as Router,
  NavLink,
  Route,
  withRouter
} from 'react-router-dom';

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
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

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
          path = '/smurf-form'
          render = {props => (
            <SmurfForm
              {...props}
              activeSmurf = {this.state.activeSmurf}
              addSmurf = {this.addSmurf}
            />
          )}
        />
        <Route 
        
        />
      </div>
    );
  }
}

export default App;

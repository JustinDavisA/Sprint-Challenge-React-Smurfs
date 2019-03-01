import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Route, withRouter } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';
import Home from './components/Home';

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
    e.preventDefault();
    console.log('now inside addSmurf');
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

  deleteSmurf = (e, id) => {
    e.preventDefault();
    console.log('now in deleteSmurf');
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          smurfs: res.data
        });
        this.props.history.push('/smurf-list');
      })
      .catch(err => {
        console.log(err);
      });
  };

  setUpdateForm = (e, smurf) => {
    e.preventDefault();
    console.log('setUpdateForm running');
    this.setState({
      activeSmurf: smurf
    });
    this.props.history.push('/smurf-form');
  };

  updateSmurf = (e, smurf) => {
    e.preventDefault();
    console.log('Inside updateSmurf');
    axios
      .put(`http://localhost:3333/smurfs/${smurf.id}`, smurf)
      .then(res => {
        this.setState({
          activeSmurf: null,
          smurfs: res.data
        });
        this.props.history.push('/smurf-list');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className = "App">

        <div className = 'nav'>
          <NavLink to = '/'>Home</NavLink>
          <NavLink to = '/smurf-list'>Smurfs</NavLink>
          <NavLink to = '/smurf-form'>Add New Smurf</NavLink>
        </div>

        <Route
          exact path = '/'
          render = {Home}
        />

        <Route
          path = '/smurf-form'
          render = {props => (
            <SmurfForm
              {...props}
              activeSmurf = {this.state.activeSmurf}
              addSmurf = {this.addSmurf}
              updateSmurf = {this.updateSmurf}
            />
          )}
        />

        <Route
          path = '/smurf-list'
          render = {props => (
            <Smurfs
              {...props}
              smurfs = {this.state.smurfs}
              deleteSmurf = {this.deleteSmurf}
              setUpdateForm = {this.setUpdateForm}
            />
          )}
        />

        <Route
          path = "/smurf/:id"
          render = {props => (
            <Smurf
              {...props}
              deleteSmurf = {this.deleteSmurf}
              smurfs = {this.state.smurfs}
              setUpdateForm = {this.setUpdateForm}
            />
          )}
        />
      </div>
    );
  }
}

export default App;

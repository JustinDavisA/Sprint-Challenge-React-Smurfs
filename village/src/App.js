import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Route, withRouter } from 'react-router-dom';

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
        this.props.history.push('/smurfs')
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
          items: res.data
        });
        this.props.history.push('/smurfs');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">

        <div className='nav'>
          <NavLink to='/smurf-form'>Add Smurf</NavLink>
          <NavLink to='/'>Home</NavLink>
        </div>

        <Route
          path='/smurf-form'
          render={props => (
            <SmurfForm
              {...props}
            />
          )}
        />
        <Route
          exact path='/'
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
            />
          )}
        />
      </div>
    );
  }
}

export default App;

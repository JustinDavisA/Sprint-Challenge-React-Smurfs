import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurf: this.props.activeSmurf || {
        name: '',
        age: '',
        height: ''
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.activeSmurf &&
      prevProps.activeSmurf !== this.props.activeSmurf
    ) {
      this.setState({
        smurf: this.props.activeSmurf
      })
    }
  }

  handleInputChange = e => {
    e.persist();
    this.setState(prevState => ({
      smurf: {
        ...prevState.smurf,
        [e.target.name]: e.target.value
      }
    })
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.activeSmurf) {
      this.props.updateSmurf(e, this.state.smurf)
    } else {
      this.props.addSmurf(e, this.state.smurf)
      this.setState({
        smurf: {
          name: '',
          age: '',
          height: ''
        }
      });
    }
  }

  render() {
    return (
      <div className="SmurfForm">
        <h1>{`${this.props.activeSmurf ? 'Update' : 'Add New'} Smurf`}</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">{`${this.props.activeSmurf ? "Update" : "Add New"} Smurf`}</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;

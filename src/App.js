import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
import * as locations from './locations'
import LocationsMenu from './LocationsMenu';

class App extends Component {
  
  state = {
    locations: locations
  }

  render() {
    return (
      <div className="App">
        <LocationsMenu places={this.state.locations} />
        <Map mapLocations={ this.state.locations } />
      </div>
    )
  }
}

export default App;

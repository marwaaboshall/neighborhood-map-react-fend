import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
import * as locations from './locations'

class App extends Component {
  state = {
    locations: locations
  }
  componentDidMount() {
    LoadMapToHead();
  }
  render() {
    return (
      <div className="App">
        <Map mapLocations={ this.state.locations }/>
      </div>
    )
  }
}
export default App;

function LoadMapToHead() {
  let newScript = document.createElement('script');
  newScript.onerror = loadError;
  newScript.type = 'text/javascript';
  newScript.async = true;
  document.head.appendChild(newScript);
  newScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWmB3dGaB0hh6-CWcCSI2ldW39iDJAOVE&callback=initMap';
}
function loadError() {
  document.getElementById("map").innerHTML = "Can't load map";
}
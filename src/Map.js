import React, { Component } from 'react';
import LocationsMenu from './LocationsMenu';

class Map extends Component {

    state = {
        map: '',
        marker: '',
        markers: [],
        infoWindow: ''
    }

    componentDidMount() {
        this.initMap();
    }

    initMap() {
        let thisBind = this;
        let markers =  [];
        let infowindow = new window.google.maps.InfoWindow();
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: 40.7413549, lng: -73.9980244}
        });

        this.setState({ map: map });
        this.setState({ infoWindow: infowindow});

        for (let i = 0; i < this.props.mapLocations.length; i++) {
            let position = this.props.mapLocations[i].location;
            let title = this.props.mapLocations[i].title;
            let id = this.props.mapLocations[i].id;

            let marker = new window.google.maps.Marker({
                position: position,
                map: map,
                title: title,
                animation: window.google.maps.Animation.DROP,
                id: id
            });
            this.setState({ marker: marker });
            
            this.state.markers.push(marker);
            marker.addListener('click', function () {
                thisBind.populateInfoWindow(this, infowindow, map);
            });
        }        
    }
    populateInfoWindow(marker, infowindow, map) {
        if (infowindow.marker !== marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
        }
    }

    render() {
        return (
            <div className="map-container">
                 <LocationsMenu 
                    places={this.props.mapLocations}
                    markers={this.state.markers}
                    map={this.state.map}
                    infowindow={this.state.infoWindow}
                    enableInfoWindow={this.populateInfoWindow}/>
                 <div id="map" />
            </div>
           
        )
    }
}

export default Map;
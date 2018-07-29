import React, { Component } from 'react';
import LocationsMenu from './LocationsMenu';

class Map extends Component {

    state = {
        map: '',
        marker: '',
        markers: []
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

        for (let i = 0; i < this.props.mapLocations.length; i++) {
            let position = this.props.mapLocations[i].location;
            let title = this.props.mapLocations[i].title;

            var marker = new window.google.maps.Marker({
                position: position,
                map: map,
                title: title,
                animation: window.google.maps.Animation.DROP,
                id: i
            });
            this.setState({ marker: marker });
            
            this.state.markers.push(marker);
            marker.addListener('click', function () {
                thisBind.populateInfoWindow(this, infowindow);
            });
        }        
    }
    populateInfoWindow(marker, infowindow) {
        if (infowindow.marker !== marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            // infowindow.addListener('closeclick', function() {
            //     infowindow.setMarker(null);
            // });
            infowindow.open(this.state.map, marker);
        }
    }

    render() {
        return (
            <div className="map-container">
                 <LocationsMenu places={this.props.mapLocations} markers={this.state.markers} map={this.state.map}/>
                 <div id="map" />
            </div>
           
        )
    }
}

export default Map;
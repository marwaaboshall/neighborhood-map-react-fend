import React, { Component } from 'react';

class Map extends Component {

    state = {
        map: '',
        marker: '',
        infoWindowOpen: false
    }

    componentDidMount() {
        let thisBind = this;
        let markers =  [];
        let infowindow = new window.google.maps.InfoWindow({
            content: 'Do you ever feel like an InfoWindow, floating through the wind,' + ' ready to start again?'
        });
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
            
            markers.push(this.state.marker);

            marker.addListener('click', function () {
                thisBind.populateInfoWindow(this, infowindow);
            });
        }
    }

    populateInfoWindow(marker, infowindow) {
        if (infowindow.marker !== marker) {
            console.log("here");
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            // infowindow.addListener('closeclick', function() {
            //     infowindow.setMarker(null);
            // });
            console.log(infowindow.marker.title);
            infowindow.open(this.state.map, marker);
        }
    }

    render() {
        return <div id="map" />;
    }
}

export default Map;
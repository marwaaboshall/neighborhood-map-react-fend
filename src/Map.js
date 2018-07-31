import React, { Component } from 'react';
import LocationsMenu from './LocationsMenu';

class Map extends Component {

    state = {
        map: '',
        marker: '',
        infoWindow: '',
        placeData: '',
        markers: []
        
    }

    componentDidMount() {
        window.initMap = this.initMap;
    }

    initMap = () => {
        let thisBind = this;
        let markers =  [];
        let infowindow = new window.google.maps.InfoWindow();
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: 52.5162746, lng: 13.3755154}
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
            
            this.getLocationData(marker.getPosition().lat(), marker.getPosition().lng(), marker);
            marker.customeInfo = this.state.placeData;
            
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
            infowindow.setContent(`<div> ${marker.title}</div><br>
                <div><b>Nearby</b></div>
                <div>${marker.customeInfo}</div>
            `);
            infowindow.open(map, marker);
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
        
    }

    getLocationData(lat, lng, marker) {
        fetch('https://api.foursquare.com/v2/venues/search?ll='+lat+','+lng+'&client_id=AEAWOHKH311VIKVSZKQGQHUO311JT4IZLGVFPVHQS5UV2UID&client_secret=QZK22ZH5YEDKOQGUD0NKEJU5XUWJIKBKER04JK434DSCPJJV&v=20180730')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(!data.response.venues[1].location.address) {
                data.response.venues[1].location.address = data.response.venues[1].location.lat +"," +data.response.venues[1].location.lng
            }
            this.setState({ placeData: data.response.venues[1].name +', ' +  data.response.venues[1].location.address }, () => {
                marker.customeInfo = this.state.placeData;
            });
        })
        .catch(err => {
            this.setState({ placeData: "Data can't be loaded" }, () => {
                marker.customeInfo = this.state.placeData;
            });
        });
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
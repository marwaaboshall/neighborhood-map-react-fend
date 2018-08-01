import React, { Component } from 'react';
import LocationsMenu from './LocationsMenu';
import PropTypes from 'prop-types';

class Map extends Component {
    state = {
        map: {},
        marker: '',
        infoWindow: {},
        placeData: '',
        markers: [],
        prevMrker: ''
    }
    static propTypes = {
        mapLocations: PropTypes.array.isRequired
    }
    componentDidMount() {
        // initializing Map after mounting component
        window.initMap = this.initMap;
        this.handleIframe();
    }
    initMap = () => {
        const { mapLocations } = this.props;
        let thisBind = this;
        let markers =  [];
        let infowindow = new window.google.maps.InfoWindow();
        let defaultIcon = this.makeMarkerIcon('da2d7f');        
        let highlightedIcon = this.makeMarkerIcon('cfd51b');
        let pressedIcon = this.makeMarkerIcon('95C8B7');
        // creating map element
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: 52.5162746, lng: 13.3755154}
        });
        this.setState({ 
            map: map,
            infoWindow: infowindow
        });
        // looping through the locations and creating a new marker for each location
        for (let i = 0; i < mapLocations.length; i++) {
            let position = mapLocations[i].location;
            let title = mapLocations[i].title;
            let id = mapLocations[i].id;

            let marker = new window.google.maps.Marker({
                position: position,
                map: map,
                title: title,
                icon: defaultIcon,
                animation: window.google.maps.Animation.DROP,
                id: id
            });
            // retrieving location data according to the location lat and lng
            this.getLocationData(marker.getPosition().lat(), marker.getPosition().lng(), marker);
            marker.customeInfo = this.state.placeData;
            
            this.setState({ marker: marker });
            this.state.markers.push(marker);
            // marker click listener to display infowindow with the data about the location
            marker.addListener('click', function () {
                thisBind.populateInfoWindow(this, infowindow, map, thisBind.state.prevMrker);
            });
            // marker mouseover and mouseover events to handle marker color according to the event
            marker.addListener('mouseover', function() {
                this.setIcon(highlightedIcon);
            });
            marker.addListener('mouseout', function() {
                this.setIcon(defaultIcon);
            });
            
        }        
    }
    // a function that handles opening an infowindow with the datails of the location
    // also, handles the opened marker animation and infowindow close event listener
    populateInfoWindow = (marker, infowindow, map, prevMarker) => {
        let thisBind = this;
        if(prevMarker && prevMarker !== marker) {
            prevMarker.setAnimation(null);
        }
        this.setState({ prevMrker: marker });
        marker.setAnimation(window.google.maps.Animation.BOUNCE);

        if (infowindow.marker !== marker) {
            infowindow.marker = marker;
            infowindow.setContent(`<div> ${marker.title}</div><br>
                <div><b>Nearby</b></div>
                <div>${marker.customeInfo}</div>
                <div>Foursquare Data</div>
            `);
            infowindow.open(map, marker);
            infowindow.addListener('closeclick', function() {
                thisBind.state.prevMrker.setAnimation(null);
                infowindow.marker = null;
            });
        }
        
    }
    // get location data depending on the lat and lng of the location. making a request
    // to foursquare api and get the first nearby place of the array of places.
    getLocationData(lat, lng, marker) {
        fetch('https://api.foursquare.com/v2/venues/search?ll='+lat+','+lng+'&client_id=U34VPANGCAV135RM5GDYLKKXPEI31YQ4XNORWHAWQIPORAYV&client_secret=WBEBFPAKIFGZS0L4PMEYWOVRRYT3RYBN21X0YWFEDYYGRUBS&v=20180730')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(!data.response.venues[1].location.address) {
                data.response.venues[1].location.address = data.response.venues[1].location.lat +"," +data.response.venues[1].location.lng;
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

    // change marker color function
    makeMarkerIcon = (markerColor) => {
        let markerImage = new window.google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
            '|40|_|%E2%80%A2',
            new window.google.maps.Size(24, 39),
            new window.google.maps.Point(0, 0),
            new window.google.maps.Point(10, 34),
            new window.google.maps.Size(24, 39)
        );
        return markerImage;
    }
    // adding title to iframe according to aria roles
    handleIframe() {
        window.addEventListener('load', (event) => {
            let iframeElement = document.querySelector('iframe');
            if(iframeElement) {
              iframeElement.title = 'Map iframe';
              iframeElement.tabIndex = -1;
            }
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
                    enableInfoWindow={this.populateInfoWindow}
                    prevMarker={this.state.prevMrker}/>
                 <div 
                    id="map"
                    role="application"
                    aria-label="Map with interest points"/>
            </div>
        )
    }
}
export default Map;
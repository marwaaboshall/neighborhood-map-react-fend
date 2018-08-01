import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';

class LocationsMenu extends Component {
    state = {
        query: '',
        filteredPlaces: [],
        filteredMarkers: [],
        selectedMarker: ''
    }
    static propTypes = {
        places: PropTypes.array.isRequired,
        markers: PropTypes.array.isRequired,
        enableInfoWindow: PropTypes.func.isRequired,
        map: PropTypes.object.isRequired,
        infowindow: PropTypes.object.isRequired,
        prevMarker: PropTypes.any.isRequired
    }
    componentDidMount() {
        this.setState({ 
            filteredPlaces: this.props.places,
            filteredMarkers: this.props.markers
        });
    }
    updateQuery = (query) => {
        let filteredPlaces;
        let filteredMarkers;
        //closing infowindow if displayed on the screen
        if(this.props.prevMarker) {
            this.props.prevMarker.setAnimation(null);
        }
        this.props.infowindow.close();
        this.setState({ query: query.trim()})
        
        this.EnableMarkers(this.props.markers, false);
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            filteredPlaces = this.props.places.filter((location) => match.test(location.title));
            filteredMarkers = this.props.markers.filter((marker) => match.test(marker.title));
            this.EnableMarkers(filteredMarkers, true);
        } else {
            filteredPlaces = this.props.places;
            filteredMarkers = this.props.markers;
            this.EnableMarkers(this.props.markers, true);
        }

        filteredPlaces.sort(sortBy('name'));
        this.setState({ 
            filteredPlaces: filteredPlaces,
            filteredMarkers: filteredMarkers
        });
    }
    EnableMarkers = (markersArr, value) => {
        for (var i = 0; i < markersArr.length; i++) {
            markersArr[i].setVisible(value);
        }
    }
    showInfoWindow = (place) => {
        this.props.infowindow.marker = null;
        this.state.filteredMarkers.filter(marker => 
            marker.title === place.title && this.setState({ selectedMarker: marker }, () => {
            this.props.enableInfoWindow(this.state.selectedMarker, this.props.infowindow, this.props.map, this.props.prevMarker);
        }));
    }
    openSideList = () => {
        document.getElementById("places-list").style.visibility = "visible";
    }
    closeSideList = () => {
        document.getElementById("places-list").style.visibility = "hidden";
    }

    render() {
        return(
            <div>
                <div
                  id="places-list"
                  className="locations-list"
                  aria-label="Places side list"
                  aria-labelledby="openbutton">
                    <span
                      className="close-button"
                      onClick={ this.closeSideList }
                      aria-label="Places side list close button"
                      role="button">&times;
                    </span>
                    <form>
                        <input
                          type="text"
                          name="search"
                          placeholder="filter places"
                          value={ this.state.query }
                          aria-label="Places side list filter field"
                          onChange={ (event) => this.updateQuery(event.target.value)
                        }/>
                    </form>
                    <ul aria-label="Places List">
                    {this.state.filteredPlaces.map(place =>
                        <li
                          aria-label={`${place.title} location`}
                          className="list-item"
                          key={place.title}
                          onClick={ () => this.showInfoWindow(place) }>{ place.title } 
                        </li> 
                    )}
                    </ul>
                </div>
                <div className="nav-bar" aria-label="Neighborhood map navigation bar">
                    <span 
                       onClick={this.openSideList}
                       aria-label="Filter Places side menu open button"
                       role="button"
                       id="openbutton">&#9776; Filter Places
                    </span>
                </div>
            </div>
        )
    }
}
export default LocationsMenu;
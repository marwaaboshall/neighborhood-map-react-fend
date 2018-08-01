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
        // setting an initial value for filteredPlaces and filteredMarkers arrays
        this.setState({ 
            filteredPlaces: this.props.places,
            filteredMarkers: this.props.markers
        });
    }
    updateQuery = (query) => {
        let filteredPlaces;
        let filteredMarkers;
        // setting marker animation to null if the user is searching for a place
        if(this.props.prevMarker) {
            this.props.prevMarker.setAnimation(null);
        }
        // closing infowindow if displayed on the screen
        this.props.infowindow.close();
        this.setState({ query: query.trim()})
        
        this.EnableMarkers(this.props.markers, false);
        // matching filtered places and marker according to the search quary, display all places and marker
        // if the query is empty
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
        // setting palaces and markers to the new filtered values
        this.setState({ 
            filteredPlaces: filteredPlaces,
            filteredMarkers: filteredMarkers
        });
    }
    // a function that sets marker visibilty to true or false depending on the value passed to it
    EnableMarkers = (markersArr, value) => {
        for (let i = 0; i < markersArr.length; i++) {
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
    // functions to handle the visibility of the side menu
    openSideList = () => {
        document.getElementById("places-list").style.visibility = "visible";
        // setting the focus to the close button of the side menu to reset the navigation
        window.setTimeout(function () {
            document.getElementById("close").focus()
        }, 200);
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
                      id="close"
                      className="close-button"
                      onClick={this.closeSideList}
                      onKeyPress={this.closeSideList}
                      aria-label="Places side list close button"
                      role="button"
                      tabIndex="0">&times;
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
                          tabIndex="0"
                          aria-label={`${place.title} location`}
                          className="list-item"
                          key={place.title}
                          role="button"
                          onClick={() => this.showInfoWindow(place)}
                          onKeyPress= {() => this.showInfoWindow(place)}>{ place.title }
                        </li> 
                    )}
                    </ul>
                </div>
                <div
                  className="nav-bar"
                  aria-label="Neighborhood map navigation bar">
                    <span 
                       onClick={this.openSideList}
                       onKeyPress={this.openSideList}
                       aria-label="Filter Places side menu open button"
                       id="openbutton"
                       tabIndex="0"
                       role="button"
                       >&#9776; Filter Places
                    </span>
                </div>
            </div>
        )
    }
}
export default LocationsMenu;
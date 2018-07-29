import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class LocationsMenu extends Component {
    state = {
        query: '',
        filteredPlaces: [],
        filteredMarkers: []
    }

    componentDidMount() {
        this.setState({ filteredPlaces: this.props.places });
        this.setState({ filteredMarkers: this.props.markers });
    }
    updateQuery = (query) => {
        this.setState({ query: query.trim()})
        let filteredPlaces;
        let filteredMarkers;

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            filteredPlaces = this.props.places.filter((location) => match.test(location.title));
            filteredMarkers = this.props.markers.filter((marker) => match.test(marker.title));
            this.markerVisible(this.props.markers, false);
            this.markerVisible(filteredMarkers, true);
        } else {
            filteredPlaces = this.props.places;
            filteredMarkers = this.props.markers;
            this.markerVisible(this.props.markers, true);
        }

        filteredPlaces.sort(sortBy('name'));
        this.setState({ filteredPlaces });
        this.setState({ filteredMarkers });
    }
    markerVisible = (markersArr, value) => {
        for (var i = 0; i < markersArr.length; i++) {
            markersArr[i].setVisible(value);
        }
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
                <div id="places-list" className="locations-list">
                    <a className="close-button" onClick={this.closeSideList}>&times;</a>
                    <form>
                        <input type="text" name="search" placeholder="filter places" value={ this.state.query } onChange={ (event) => this.updateQuery(event.target.value) }/>
                    </form>
                    {this.state.filteredPlaces.map(place =>
                        <a className="list-item" key={place.title}> { place.title } </a> 
                    )}
                </div>
                <div className="nav-bar">
                    <span onClick={this.openSideList}>&#9776; open</span>
                </div>
            </div>
        )
    }
}
export default LocationsMenu;
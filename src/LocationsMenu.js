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
        this.setState({ filteredPlaces });
        this.setState({ filteredMarkers });
    }

    EnableMarkers = (markersArr, value) => {
        for (var i = 0; i < markersArr.length; i++) {
            markersArr[i].setVisible(value);
        }
    }

    selectMarker = () => {
        console.log("clicked");
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
                    <a className="close-button" onClick={ this.closeSideList }>&times;</a>
                    <form>
                        <input type="text" name="search" placeholder="filter places" value={ this.state.query } onChange={ (event) => this.updateQuery(event.target.value) }/>
                    </form>
                    {this.state.filteredPlaces.map(place =>
                        <li className="list-item" key={place.title} onClick={ this.selectMarker }> { place.title } </li> 
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
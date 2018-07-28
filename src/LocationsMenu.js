import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class LocationsMenu extends Component {
    state = {
        query: '',
        filteredLocations: []
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim()})
    }

    openSideList = () => {
        document.getElementById("places-list").style.visibility = "visible";
    }
    closeSideList = () => {
        document.getElementById("places-list").style.visibility = "hidden";
    }

    render() {

        let filteredLocations;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
            filteredLocations = this.props.places.filter((location) => match.test(location.title));
        } else {
            filteredLocations = this.props.places;
        }

        filteredLocations.sort(sortBy('name'));
        
        return(
            <div>
                <div id="places-list" className="locations-list">
                    <a className="close-button" onClick={this.closeSideList}>&times;</a>
                    <form>
                        <input type="text" name="search" placeholder="filter places" value={ this.state.query } onChange={ (event) => this.updateQuery(event.target.value) }/>
                    </form>
                    {filteredLocations.map(place =>
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
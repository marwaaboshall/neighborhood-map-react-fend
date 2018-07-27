import React, { Component } from 'react';

class LocationsMenu extends Component {

    state = {
        sideMenuOpen: false
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
                        <input type="text" name="search" placeholder="filter places"/>
                    </form>
                    {this.props.places.map(place =>
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
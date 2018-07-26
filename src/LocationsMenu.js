import React, { Component } from 'react';

class LocationsMenu extends Component {

    openSideList = () => {
        document.getElementById("places-list").style.width = "400px";
        console.log("open");
    }
    closeSideList = () => {
        document.getElementById("places-list").style.width = "0";
        console.log("close");
    }

    render() {
        return(
            <div>
                <div id="places-list" className="locations-list">
                    <a className="close-button" onClick={this.closeSideList}>&times;</a>
                    <form>
                        <input type="text" name="search" />
                    </form>
                    {this.props.places.map(place =>
                        <a key={place.title}> { place.title } </a> 
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
# Neighborhood Project

This project is the final project of the Front-end Nanodegree program of Udacity. The main idea behind the project is to do it from scratch, the website should be responsive, get data from google maps and a third party API, developed using React, have accessibility roles and can work offline. 
The project is about showing at least five locations, loading google maps and showing markers of those locations. It should have a side menu displaying the five locations and the ability to filter them using an input field. By clicking on each list item or marker, an infowindow shows up with infromation about the location and a nearby place retrieved from foursquare using foursquare API.

## Start

* clone project:  `git clone https://github.com/marwaaboshall/neighborhood-map-react-fend.git`
* install node modules: `npm install`
* start project: `yarn start` or `npm start`

## Development

A list of the packages that are used in development:
* PropTypes: npm install --save prop-types
* escapeRegExp and sortBy packages: npm install --save escape-string-regexp sort-by


## How to use the app

* First, install and run the project using the instructions above.
* In the main page, you'll find a list of locations, markers on google maps and an input field to filter locations.
* By clicking on any marker or a list element, you can find an infowindow about the selected location with the nearby place retrieved from foursqaure API depending on the longitude and latitude of the location.
* Use the input field to filter the locations both on the list view and on the map.
* You can close the side menu using the close button and open it using the hamburger menu button.


## Locations Data

The initial 6 locations are retrieved from 'locations.json'. 'locations.json' is a json file that has an array of 6 locations, each has a title, longitude, latitude and id.

## References

* Marker Animations: https://developers.google.com/maps/documentation/javascript/examples/marker-animations
* Loading Script Element: https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement
* Font: https://fonts.google.com/specimen/Ubuntu?selection.family=Ubuntu
* Side bar: https://www.w3schools.com/w3css/w3css_sidebar.asp

## APIs

* Google Maps: https://developers.google.com/maps/documentation/javascript/tutorial
* Foursquare: https://developer.foursquare.com/
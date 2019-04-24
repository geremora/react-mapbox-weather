import React from "react";
import { Component } from "react";
import Map from "../components/map";

/* Inicial parameters map (mapbox) */
const TOKEN = 'pk.eyJ1IjoiZ2VyZW1vcmEiLCJhIjoiY2p1dWczdmY2MGRoejQ0bXg4djdpdW92biJ9.25y6j4yy4hmTreQyJvzrtg';
const LNG = 34;
const LAT = 40;
const ZOOM = 1.5;
const STYLE_ID = 'streets-v9';

export default class App extends Component {
    render() {
        return (
            <div>
                <Map  token = { TOKEN }
                      lat = { LNG }
                      lng = { LAT }
                      zoom = { ZOOM }
                      styleID = { STYLE_ID }
                />
            </div>
        );
    }
}
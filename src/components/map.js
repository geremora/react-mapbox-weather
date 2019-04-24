import React, {Component} from "react";
import mapboxgl from 'mapbox-gl';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchWeather, changeUnits} from "../actions/index";
import popupCreator from "../utils/popup";


class Map extends Component {

    constructor(props) {
        super(props);

        this.onClickMap = this.onClickMap.bind(this);
        this.onClickUnitsMenu = this.onClickUnitsMenu.bind(this);
        this.popup = null; // reference to the open popup.
    }

    onClickMap(e) {
        let {lat, lng} = e.lngLat;
        this.setState({lat: lat, lng: lng, lngLat: e.lngLat});
        this.props.fetchWeather(this.state.lat, this.state.lng, this.props.units);
    }

    onClickUnitsMenu(e) {
        this.props.changeUnits(e.target.value);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.units !== nextProps.units) {
            // If the open is opened and the user change the units, then remove this popup and call to the API for the new values of temperature.
            if (this.popup && this.popup.isOpen()) {
                this.popup.remove();
                this.props.fetchWeather(this.state.lat, this.state.lng, nextProps.units);
            }
        } else {
            if (nextProps.weather) {
                this.popup = new mapboxgl.Popup().setLngLat(this.state.lngLat).setHTML(popupCreator(nextProps.weather, nextProps.units)).addTo(this.map);
            }
        }
    }

    componentDidMount() {
        const {token, lng, lat, zoom, styleID} = this.props;

        mapboxgl.accessToken = token;
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: `mapbox://styles/mapbox/${ styleID }`,
            center: [lng, lat],
            zoom
        });

        this.map.on('click', this.onClickMap);
    }

    render() {

        return (
            <div>
                <div
                    className="inline-block absolute top right mt12 ml12 color-red z1 py6 px12 round-full txt-m txt-bold">
                    <div>{this.props.errorMessage}</div>
                </div>
                <div
                    className="inline-block absolute top left mt12 ml12 color-white z1 py6 px12 round-full txt-s txt-bold">
                    <div className="ui buttons">
                        <button value='imperial' onClick={this.onClickUnitsMenu}
                                className={this.props.units === 'imperial' ? "ui button active" : "ui button"}>℉
                        </button>
                        <button value='metric' onClick={this.onClickUnitsMenu}
                                className={this.props.units === 'metric' ? "ui button active" : "ui button"}>℃
                        </button>
                    </div>
                </div>
                <div ref={el => this.mapContainer = el} className="absolute top right left bottom"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        weather: state.weather.weatherData,
        errorMessage: state.weather.errorMessage,
        units: state.userInterface.units
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchWeather, changeUnits}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);

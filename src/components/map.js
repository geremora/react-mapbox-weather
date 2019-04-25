import React, {Component} from "react";
import mapboxgl from 'mapbox-gl';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchWeather, changeUnits} from "../actions/index";
import popupCreator from "../utils/popup";

/**
 * TODO
 * - Current lat & lng on reducer using move event
 * - Improve handling of modal help (check dont show again,etc). Improve text and add image.
 * - Add style map changer (sat, streets, etc)
 */
export class Map extends Component {

    constructor(props) {
        super(props);

        this.onClickMap = this.onClickMap.bind(this);
        this.onClickUnitsMenu = this.onClickUnitsMenu.bind(this);
        this.onClickModal = this.onClickModal.bind(this);
        this.popup = null; // reference to the open popup.
        this.state = { showHelp:true }; // show the help modal window in the start
    }

    onClickMap(e) {
        let {lat, lng} = e.lngLat;
        this.setState({showHelp:false, lat: lat, lng: lng, lngLat: e.lngLat});
        this.props.fetchWeather(this.state.lat, this.state.lng, this.props.units);
    }

    onClickUnitsMenu(e) {
        this.props.changeUnits(e.target.value);
    }

    onClickModal(e){
        this.setState({ showHelp:false });
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

    renderModal() {
        if (this.state.showHelp) {
            return (<div className='bg-darken10 viewport-half'>
                <div className='flex-parent flex-parent--center-main pt36'>
                    <div className='flex-child bg-white round relative w600'>
                        <button onClick={this.onClickModal} className='absolute top right px12 py12'>
                            <svg className='icon link color-darken50'>
                                <use xlinkHref='#icon-close'></use>
                            </svg>
                        </button>
                        <div className='px24 py24'>
                            <div className='txt-l mb12'>Welcome!</div>
                            <div className='txt-m'>
                                You can click over the map to know weather information
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }else{
            //Prevent rendering with null
            return null;
        }
    }

    renderUnitsMenu() {
        return (<div
            className="inline-block absolute top left mt12 ml12 color-white z1 py6 px12 round-full txt-s txt-bold">
            <div className="ui buttons">
                <button value='imperial' onClick={this.onClickUnitsMenu}
                        className={this.props.units === 'imperial' ? "ui button active" : "ui button"}>℉
                </button>
                <button value='metric' onClick={this.onClickUnitsMenu}
                        className={this.props.units === 'metric' ? "ui button active" : "ui button"}>℃
                </button>
            </div>
        </div>)
    }

    render() {

        return (
            <div>
                <div
                    className="inline-block absolute top right mt12 ml12 color-red z1 py6 px12 round-full txt-m txt-bold">
                    <div>{this.props.errorMessage}</div>
                </div>

                {this.renderUnitsMenu()}

                <div ref={el => this.mapContainer = el} className="absolute top right left bottom"/>

                {this.renderModal()}

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

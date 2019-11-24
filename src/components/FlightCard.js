import React, { Component } from "react";
import moment from 'moment';

class FlightCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            flightsParams: {},
            flightsData: {},
            itineraries: [],
            sortPrice: [],
            origin: "",
            destination: "",
            outboundDate: "",
            inboundDate: "",
            price: []
        }
    }

    render() {
        return (
            <div>
                {this.props.price.map(elemn => (
                    <div
                        key={(elemn.Price * Math.random()).toString()}
                        className="flightCardContainer">
                        <div className="flightCardRoute">
                            <h2> {this.props.flightsParams.origin}</h2>
                            <h4 className="arrow">
                                <svg width="100px"
                                    height="20px"
                                    viewBox="0 0 100 20"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g stroke="none"
                                        strokeWidth="1"
                                        fill="none">
                                        <g transform="translate(5.000000, 5.000000)">
                                            <path d="M0.5,5 L79,5"
                                                stroke="#666666"
                                                strokeWidth="2"
                                                strokeLinecap="square">
                                            </path><polygon
                                                fill="#666666"
                                                transform="translate(85.000000, 5.000000) rotate(90.000000) translate(-85.000000, -5.000000) "
                                                points="85 0 90 10 80 10">
                                            </polygon>
                                        </g>
                                        <circle stroke="#666666"
                                            strokeWidth="2"
                                            fill="#FFFFFF"
                                            cx="50"
                                            cy="10"
                                            r="3">
                                        </circle></g></svg>
                            </h4>
                            <h2>{this.props.flightsParams.destination}</h2>
                        </div>

                        <div className="flightCardGetPrice">
                            <div className='flightCardDateContainer'>
                                <h2 className="flightCardDateH noMarginTopTag">
                                    <span className="flightCardDate">Departure: </span>
                                    {formatDayFl(this.props.flightsParams.outboundDate)}
                                    <br />
                                    <span className="flightCardDate">return: </span>
                                    {formatDayFl(this.props.flightsParams.inboundDate)}
                                </h2>
                            </div>
                            <div className="priceContainer">
                                <h2 className="priceStyle noMarginTopTag">Price: {elemn.Price + '  \u20AC'}
                                    <a
                                        className="anchorBtn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`${elemn.DeeplinkUrl}`}
                                    >Buy</a>
                                </h2>
                            </div>
                        </div>
                    </div >
                ))}
            </div>
        );
    };
};

const formatDayFl = (day) => {
    return moment(day).format("dddd L")
};

export default FlightCard;
import React, { Component } from "react";

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
                            <h4 className="arrow">From  </h4>
                            <h2> {this.props.flightsParams.origin}</h2>
                            <h4 className="arrow">  fligh to  </h4>
                            <h2>{this.props.flightsParams.destination}</h2>
                        </div>

                        <div className="flightCardGetPrice">
                            <div className='flightCardDateContainer'>
                                <h3 className="flightCardDateH noMarginTopTag">
                                    <span className="flightCardDate">Departure date: </span>
                                    {this.props.flightsParams.outboundDate}
                                    <br />
                                    <span className="flightCardDate">return date: </span>
                                    {this.props.flightsParams.inboundDate}
                                </h3>
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

export default FlightCard;
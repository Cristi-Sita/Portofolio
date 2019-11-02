import React, { Component } from "react";
import axios from "axios";

class FlightCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: [],
            // elemn: {},
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

    loadItems = () => {
        return axios.get("http://localhost:8080/items")
            .then(response => {
                this.setState({ item: response.data });
                this.setState({ flightsParams: this.state.item[0] });
                this.setState({ flightsData: JSON.parse(this.state.flightsParams.flightsData) });
                this.setState({ itineraries: this.state.flightsData.responseFlightsData.Itineraries });
                this.setState({ price: this.state.itineraries[0].PricingOptions })
                // this.setState({ sortPrice: misho(this.state.itineraries)[0][0] });
                // this.setState({ sortPrice: misho(this.state.itineraries) })
            })
            .then(() => {
                console.log(/*this.state.item, this.state.flightsParams, this.state.itineraries[0].PricingOptions,*/
                    this.state.price, this.state.price[0].Price)
            })
    }

    componentDidMount() {
        this.loadItems()
    }

    render() {

        return (
            <div>
                {this.state.price.map(elemn => (
                    <div
                        key={(elemn.Price * Math.random()).toString()}
                        className="flightCardContainer"
                    >
                        <div className="flightCardRoute">
                            <h4 className="arrow">From </h4>
                            <h2> {this.state.flightsParams.origin}</h2>
                            <h4 className="arrow">fligh to </h4>
                            <h2>{this.state.flightsParams.destination}</h2>
                        </div>

                        <div className="flightCardGetPrice">
                            <div className='flightCardDateContainer'>
                                <h3 className="flightCardDateH noMarginTopTag">
                                    <span className="flightCardDate">Departure date: </span>
                                    {this.state.flightsParams.outboundDate}
                                    <br />
                                    <span className="flightCardDate">return date: </span>{this.state.flightsParams.inboundDate}
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

// const misho = arr => arr.map(elemn => { return elemn.PricingOptions })


export default FlightCard;
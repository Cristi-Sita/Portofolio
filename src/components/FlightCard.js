import React, { Component } from "react";
import axios from "axios";



class FlightCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            flightsParams: [],
            origin: "",
            destination: "",
            outboundDate: "",
            inboundDate: ""
        }
    }

    loadItems = () => {
        return axios.get("http://localhost:8080/items")
            .then(response => {
                this.setState({ items: response.data });
                this.setState({ flightsParams: response.data.pop() });
                this.setState({ flightsData: JSON.parse(this.state.flightsParams.flightsData) });
                this.setState({ itineraries: this.state.flightsData.responseFlightsData.Itineraries });
                console.log(this.state.flightsData, this.state.itineraries)
            })
    }


    componentDidMount() {
        this.loadItems()
    }

    render() {
        return (
            <div className="container" >
                <div className="city">
                    <h5>{this.state.flightsParams.origin}
                    </h5>
                    <h5 className="arrow">fligh to</h5>
                    <h5>{this.state.flightsParams.destination}</h5>
                </div>
                <h2>Departure date</h2>
                <h2>{this.state.flightsParams.outboundDate}</h2>
                <div className='departureDate'>
                    <h2><p>{this.state.flightsParams.inboundDate}</p></h2>
                </div>
            </div>
        );
    };
};
export default FlightCard;
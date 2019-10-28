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
                this.setState({ flightsData: JSON.parse(response.data.pop().flightsData) });
                console.log(this.state.items, this.state.flightsParams)
            })
    }


    componentDidMount() {
        this.loadItems()
    }

    render() {
        return (
            <div className="container" >
                <div className="city">
                    <h1>{this.state.flightsParams.origin}<p>{this.state.flightsParams.outboundDate}</p></h1>
                    <h3 className="arrow">fligh to</h3>
                    <h1>{this.state.flightsParams.destination}<p>{this.state.flightsParams.inboundDate}</p></h1>
                </div>
            </div>
        )
    };
};
export default FlightCard;
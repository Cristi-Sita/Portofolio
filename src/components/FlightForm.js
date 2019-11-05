import React, { Component } from "react";
import axios from "axios";
// import FlightCard from "./FlightCard";

class FlightForm extends Component {
    constructor(props) {
        super(props);
        // const now = new Date();
        // let outboundDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // let inboundDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        this.state = {
            originPlace: "Cluj Napoca",
            destinationPlace: "",
            inboundDate: new Date().toLocaleDateString(),
            outboundDate: new Date().toLocaleDateString(),
            cabinClass: "economy",
            adults: "1",
            country: "RO",
            currency: "EUR",
            locale: "en-US"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state)
        axios.post('http://localhost:8080/items', this.state)
            .then(() => {
                const delay = setTimeout(() => {
                    this.loadItems();
                    console.log("Try again!")
                }, 3000)
                if (this.response.data.items[0].wheatherdestination == null) {
                    return delay();
                }
                return this.loadItems()
            })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    loadItems = () => {
        return axios.get("http://localhost:8080/items")
            .then(response => {
                this.setState({ items: response.data });
            })
        // .then(() => console.log(this.state.wheatherdestination, this.state.items[0]/*.flightsData, */, this.state.cities[0]))
    }


    componentDidMount() {
        this.loadItems()
    }

    render() {

        return (
            <div className="flightFormContainer">
                <form
                    className="flightForm"
                    onSubmit={this.handleSubmit}
                >
                    <div className="formRow">
                        <label>Flying from: </label>
                        <select
                            name="originPlace"
                            required
                            value={this.state.originPlace}
                            onChange={this.handleChange}
                        >
                            <option className="city" value="Bucuresti">Bucuresti</option>
                            <option className="city" value="Cluj Napoca">Cluj Napoca</option>
                            <option className="city" value="Constanta">Constanta</option>
                            <option className="city" value="Timisoara">Timisoara</option>
                        </select>
                        <label>Flying to: </label>
                        <input
                            type="text"
                            name="destinationPlace"
                            placeholder="Bucuresti"
                            required
                            value={this.state.destinationPlace}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="formRow">
                        <label>Departure date</label>
                        <input
                            type='date'
                            id="datePickerId"
                            name='outboundDate'
                            required
                            // placeholder={date}
                            // fieldName="outboundDate"
                            value={this.state.outboundDate}
                            onChange={this.handleChange}
                        />
                        <label>Return date</label>
                        <input
                            type='date'
                            name='inboundDate'
                            required
                            // fieldName="intboundDate"
                            value={this.state.intboundDate}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="formRow">
                        <label>Cabin Class</label>
                        <select
                            type="text"
                            name="cabinClass"
                            value={this.state.cabinClass}
                            onChange={this.handleChange}
                        >
                            <option value="economy"> Economy </option>
                            <option value="premiumeconomy"> Premium Economy </option>
                            <option value="business"> Business </option>
                            <option value="first"> First </option>
                        </select>
                        <label>Passenger Count</label>
                        <select
                            type="text"
                            name="adults"
                            value={this.state.adults}
                            onChange={this.handleChange}
                        >
                            <option value="1"> 1 </option>
                            <option value="2"> 2 </option>
                            <option value="3"> 3 </option>
                        </select>
                    </div>
                    <div className="subButton">
                        <button
                            type="submit"
                        >
                            Search
                        </button>
                    </div>
                </form>
                {/* <FlightCard /> */}
            </div>
        );
    }
};

export default FlightForm;
import React, { Component } from "react";

class FlightForm extends Component {
    constructor(props) {
        super(props);

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
    };

    render() {

        return (
            <div className="flightFormContainer">
                <form
                    className="flightForm"
                    onSubmit={this.props.handleSubmit}
                >
                    <div className="formRow">
                        <label>Flying from: </label>
                        <select
                            name="originPlace"
                            required
                            value={this.props.originPlace}
                            onChange={this.props.handleChange}
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
                            value={this.props.destinationPlace}
                            onChange={this.props.handleChange}
                        />
                    </div>
                    <div className="formRow">
                        <label>Departure date</label>
                        <input
                            type='date'
                            id="datePickerId"
                            name='outboundDate'
                            required
                            value={this.props.outboundDate}
                            onChange={this.props.handleChange}
                        />
                        <label>Return date</label>
                        <input
                            type='date'
                            name='inboundDate'
                            required
                            value={this.props.intboundDate}
                            onChange={this.props.handleChange}
                        />
                    </div>
                    <div className="formRow">
                        <label>Cabin Class</label>
                        <select
                            type="text"
                            name="cabinClass"
                            value={this.props.cabinClass}
                            onChange={this.props.handleChange}
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
                            value={this.props.adults}
                            onChange={this.props.handleChange}
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
            </div>
        );
    }
};

export default FlightForm;
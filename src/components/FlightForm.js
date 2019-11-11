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
                        <div className="dropDown">
                            <h3>Flying from: </h3>
                            <select
                                className="dropDownSelect"
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
                        </div>
                        <div className="textInput">
                            <h3>Flying to: </h3>
                            <input
                                className="inputText"
                                type="text"
                                name="destinationPlace"
                                placeholder="Bucuresti"
                                required
                                value={this.props.destinationPlace}
                                onChange={this.props.handleChange}
                            />
                        </div>
                    </div>
                    <div className="formRow ">
                        <h3>Departure date</h3>
                        <input
                            className='textInput dateBox'
                            type='date'
                            name='outboundDate'
                            required
                            value={this.props.outboundDate}
                            onChange={this.props.handleChange}
                        />
                        <h3>Return date</h3>
                        <input
                            className='textInput dateBox'
                            type='date'
                            name='inboundDate'
                            required
                            value={this.props.intboundDate}
                            onChange={this.props.handleChange}
                        />
                    </div>
                    <div className="formRow lastRow">
                        <div className="dropDown">
                            <h3>Cabin Class</h3>
                            <select
                                className="dropDownSelect"
                                type="text"
                                name="cabinClass"
                                value={this.props.cabinClass}
                                onChange={this.props.handleChange}
                            >
                                <option value="economy"> Economy </option>
                                <option value="business"> Business </option>
                                <option value="first"> First </option>
                            </select>
                        </div>
                        <div className="dropDown">
                            <h3>Passenger Count</h3>
                            <select
                                className="dropDownSelect"
                                type="text"
                                name="adults"
                                value={this.props.adults}
                                onChange={this.props.handleChange}
                            >
                                <option value="1"> 1 </option>
                                <option value="2"> 2 </option>
                                <option value="3"> 3 </option>
                                <option value="4"> 4 </option>
                            </select>
                        </div>
                    </div>
                    <div className="subButton">
                        <button
                            className="myButton"
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
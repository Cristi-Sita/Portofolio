import React, { Component } from "react";
// import { Row, Container, Col } from "reactstrap";
import DateP from "./Date";

class FlightForm extends Component {
    constructor() {
        super();
        this.state = {
            cabinClass: "economy",
            adults: "1",
            outboundDate: "",
            inboundDate: "",
            originPlace: "Cluj Napoca",
            destinationPlace: "Bucuresti",
            country: "RO",
            currency: "EUR",
            locale: "en-US",
            // livePrice: "",
            // status: ""
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    componentDidMount() {
        console.log("FlightForm mounted");
    }

    componentDidUpdate() {
        if (this.state.inboundDate <= this.state.outboundDate) {
            this.setState({
                outboundDate: this.state.outboundDate + 1,
            })
            alert("Your departure date was too close to your arrival date (same day) so we added a day but you can change it again to get better results.")
        }
    }

    // pollPrices(interval, timeout, key, config) {
    //     this.setState({
    //         status: "Searching"
    //     });
    //     var count = 0;
    //     var searching = setInterval(() => {
    //         if (count === 0) {
    //             this.setState({
    //                 status: "Searching."
    //             })
    //             count++
    //         } else if (count === 1) {
    //             this.setState({
    //                 status: "Searching.."
    //             })
    //             count++
    //         } else {
    //             this.setState({
    //                 status: "Searching..."
    //             })
    //             count = 0;
    //         }
    //     }, 500)
    //     function stopSearching() {
    //         console.log("Stop searching fired")
    //         clearInterval(searching);
    //     }
    //     console.log("Poll fired");
    //     let start = Date.now();
    //     function startPoll() {
    //         return axios
    //             .get(
    //                 `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${key}/?sortType=price&sortOrder=asc&pageIndex=0`,
    //                 config
    //             )
    //             .then(res => {
    //                 function delay(t) {
    //                     return new Promise(function (resolve) {
    //                         setTimeout(resolve, t);
    //                     });
    //                 }

    //                 if (res.data.Status === "UpdatesPending") {
    //                     console.log("UPdatespending")

    //                     if (
    //                         timeout !== 0 &&
    //                         Date.now() - start > timeout &&
    //                         res.data.Itineraries !== undefined
    //                     ) {
    //                         return res;
    //                     } else if (
    //                         timeout !== 0 &&
    //                         Date.now() - start > timeout &&
    //                         res.data.Itineraries === undefined
    //                     ) {
    //                         return new Error("timeout error on pollPrices");
    //                     } else {
    //                         return delay(interval).then(startPoll);
    //                     }
    //                 }

    //                 else if (res.data.Status === "UpdatesComplete") {
    //                     stopSearching();
    //                     if (res.data.Itineraries.length > 0) {
    //                         return res;
    //                     } else if (res.data.Itineraries <= 0) {
    //                         alert(
    //                             "Sorry - no routes are available on this itinierary. Try pushing your departure date out a bit further."
    //                         );
    //                     }
    //                 }
    //             });
    //     }

    //     return startPoll();
    // }

    // testPython() {
    //     axios.get('http://127.0.0.1:8000/countries/search/').then(res => console.log(res));
    // };


    // handleClick(event) {
    //     event.preventDefault();

    //     var postConfig = {
    //         headers: {
    //             "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API,
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         }
    //     };

    //     axios
    //         .post(
    //             "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
    //             querystring.stringify({
    //                 country: this.state.country,
    //                 currency: this.state.currency,
    //                 locale: this.state.locale,
    //                 cabinClass: this.state.cabinClass,
    //                 adults: this.state.adults,
    //                 outboundDate: moment(this.state.outboundDate).format("YYYY-MM-DD"),
    //                 inboundDate: moment(this.state.inboundDate).format("YYYY-MM-DD"),
    //                 originPlace: this.state.originPlace + "-sky",
    //                 destinationPlace: this.state.destinationPlace + "-sky"
    //             }),
    //             postConfig
    //         )
    //         .catch(function (response) {
    //             console.log(response, "This is the handleclick error response")
    //             return response;
    //         })
    //         .then(response => {
    //             let liveConfig = {
    //                 headers: {
    //                     "X-RapidAPI-Key":
    //                         process.env.REACT_APP_RAPID_API
    //                 }
    //             };
    //             let session = response.headers.location.split("/").pop(-1);
    //             console.log(session, "this is the session")

    //             this.pollPrices(500, 35000, session, liveConfig)
    //                 .then(res => {
    //                     console.log(res, "this is the handle click poll prices response")
    //                     if (res.data.Itineraries.length > 0) {
    //                         this.setState({
    //                             livePrice: res.data.Itineraries[0].PricingOptions[0].Price,
    //                             status: "Price:"
    //                         });
    //                     } else {
    //                         this.setState({
    //                             status: ""
    //                         });
    //                     }
    //                 })
    //                 .catch(function (response) {
    //                     console.log(response);
    //                 });
    //         });
    // }

    handleValueChange = event => {
        const name = event.target.name;
        this.setState(
            {
                value: event.target.value
            },
            () => {
                this.setState({
                    [name]: this.state.value
                });
            }
        );
    };

    handleChange(name, value) {
        this.setState(
            {
                [name]: this.value
            }
        );
    };

    render() {

        return (
            <div className="flightFormContainer">
                <form className="flightForm" action="">
                    {/* <Container>
                        <Row>
                            <Col sm={12} md={3} lg={3} xl={3} className="inputBox dport"> */}
                    <label>Flying from: </label>
                    <select
                        type="text"
                        name="originPlace"
                        value={this.state.originPlace}
                        onChange={this.handleValueChange.bind(this)}
                    >
                        <option className="city" value="Bucuresti">Bucuresti</option>
                        <option className="city" value="Cluj Napoca">Cluj Napoca</option>
                        <option className="city" value="Constanta">Constanta</option>
                        <option className="city" value="Timisoara">Timisoara</option>
                    </select>
                    {/* </Col>
                            <Col sm={12} md={3} lg={3} xl={3} className="inputBox aport"> */}
                    <label>Flying to: </label>
                    <input
                        type="text"
                        name="destinationPlace"
                        defaultValue={this.state.destinationPlace}
                        onChange={this.handleChange}
                        style={{
                            width: this.state.destinationPlace.length + 'em'
                        }}
                    />
                    <br />
                    {/* </Col>
                        </Row>

                        <Row>
                            <Col sm={12} md={4} lg={3} xl={3} className="inputBox ddate"> */}
                    <label>Departure Date</label>
                    <DateP
                        className='datepicker'
                        fieldName="outboundDate"
                        handleChange={this.handleChange.bind(this)}
                        {...this.state}
                    />
                    {/* </Col>
                            <Col sm={12} md={4} lg={3} xl={3} className="inputBox rdate"> */}
                    <label>Return Date</label>
                    <DateP
                        className='datepicker'
                        fieldName="inboundDate"
                        handleChange={this.handleChange.bind(this)}
                        {...this.state}
                    />
                    {/* </Col>
                            <Col sm={12} md={4} lg={3} xl={3} className="inputBox tier"> */}
                    <label>Cabin Class</label>
                    <select
                        type="text"
                        name="cabinClass"
                        value={this.state.cabinClass}
                        onChange={this.handleValueChange.bind(this)}
                    >
                        <option value="economy"> Economy </option>
                        <option value="premiumeconomy"> Premium Economy </option>
                        <option value="business"> Business </option>
                        <option value="first"> First </option>
                    </select>
                    {/* </Col>
                            <Col sm={12} md={12} lg={3} xl={3} className="inputBox passengers"> */}
                    <label>Passenger Count</label>
                    <select
                        type="text"
                        name="adults"
                        value={this.state.adults}
                        onChange={this.handleValueChange.bind(this)}
                    >
                        <option value="1"> 1 </option>
                        <option value="2"> 2 </option>
                        <option value="3"> 3 </option>
                    </select>
                    {/* </Col>
                        </Row>

                        <Row>
                            <Col sm={12} md={6} lg={6} xl={6}> */}
                    <div className="subButton">
                        <button type="submit" onClick={this.handleClick}>
                            Search
                                    </button>
                    </div>
                    {/* </Col>
                            <Col sm={12} md={6} lg={6} xl={6} className="d-flex flex-column">
                                <h2>{this.state.status}</h2>
                                <h2 className="formSubmit">{this.state.livePrice}</h2>
                            </Col>
                        </Row>
                    </Container> */}
                </form>
            </div>
        );
    }
};

export default FlightForm;
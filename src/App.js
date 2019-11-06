import React, { Component } from 'react';
import axios from "axios";
import FlightForm from './components/FlightForm';
import FlightCard from './components/FlightCard';
import './App.css';
import './components/FlightForm.css'
import './components/FlightCard.css'
import './components/Loader.css'
import './components/img/baloon.jpeg'

class App extends Component {
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
      price: [],
      originPlace: "Cluj Napoca",
      destinationPlace: "",
      cities: [],
      wheatherorigin: [],
      wheatherdestination: [],
      cabinClass: "economy",
      adults: "1",
      country: "RO",
      currency: "EUR",
      locale: "en-US",
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { originPlace,
      destinationPlace,
      inboundDate,
      outboundDate,
      adults,
      currency,
      locale,
      country,
      cabinClass } =
      this.state
    axios.post('http://localhost:8080/items', {
      originPlace,
      destinationPlace,
      inboundDate,
      outboundDate,
      adults,
      currency,
      locale,
      country,
      cabinClass
    })
      .then(response => {
        this.setState({ loading: true })
        console.log(response)
        setTimeout(() => this.loadItems(), 14000)
      })
      .catch(error => console.log(error));
  }

  loadItems = () => {
    return axios.get("http://localhost:8080/items")
      .then(response => {
        if (response.data[0].wheatherorigin === null || typeof (response.data[0].wheatherorigin) === 'undefined') {
          console.log(response, "response.data[0].wheatherorigin.cnt");
          return setTimeout(() => this.loadItems(), 2000)
        };
        this.setState({ loading: false })
        this.setState({ items: response.data });
        this.setState({ cities: sliceArr(response.data) })
        this.setState({ wheatherorigin: sliceArr(JSON.parse(response.data[0].wheatherorigin).wheathOrigin.list) });
        this.setState({
          wheatherdestination: sliceArr(JSON.parse(response.data[0].wheatherdestination)
            .wheathDestination.list)
        });
        this.setState({ flightsParams: this.state.items[0] });
        this.setState({ flightsData: JSON.parse(this.state.flightsParams.flightsData) });
        this.setState({ itineraries: this.state.flightsData.responseFlightsData.Itineraries });
        this.setState({ price: concatItineraries(this.state.itineraries) });
        this.setState({
          sortPrice: this.state.price.sort((a, b) => {
            return Number(a.Price) - Number(b.Price);
          })
        });
      })
      .then(() => console.log(/*this.state.wheatherdestination, this.state.items[0],*/ this.state.flightsData,
        this.state.cities[0]))
  }

  componentDidMount() {
    this.loadItems()
  }

  render() {
    return <div className="mainContainer" >
      <img src={require('./components/img/baloon.jpeg')} alt="hot air baloon" />
      <header className="App-header">
        <h1 className="pageTitle">Flights search engine</h1>
        <p className="powered">Powered by Skyscanner</p>
      </header>
      <main className="mainContent">
        <div className="sideContainers historyOfSearch">
          <div className="sideImage airplaneImage"></div>
          <h3 className="historyTitle">The latest flight searches:
          <br />
            <span style={{
              marginTop: 0,
              fontSize: '0.6em'
            }}>(results are from MySQL database)</span>
          </h3>
          {this.state.items.map(item => (
            <div
              key={item.id}
              className="historyCard">
              <h4 className="noMarginTopTag">{item.origin} to {item.destination}</h4>
              <h5 className="noMarginTopTag">{item.outboundDate} return on: {item.inboundDate}</h5>
            </div>
          ))}
        </div>
        <div className="middleContainer">
          <FlightForm handleSubmit={this.handleSubmit}
            originPlace={this.state.originPlace}
            handleChange={this.handleChange} />
          {this.state.loading === true ? <div id="loader">
            <h3 id="loadingText">Loading...</h3>
            <div id="loaderAnimation"></div>
          </div> :
            <FlightCard price={this.state.price}
              itineraries={this.state.itineraries}
              flightsData={this.state.flightsData}
              flightsParams={this.state.flightsParams}
            />}
        </div>
        <div className="sideContainers forecastWheather">
          <div className="sideImage wheatherImage"></div>
          <div>
            {this.state.wheatherorigin.map(day => (
              <div
                key={(day.dt * Math.random()).toString()}
                className="wheathCard">
                {this.state.cities.map(city => (<h3
                  className="noMarginTopTag"
                  key={(city.id * Math.random()).toString()}>{city.origin}</h3>))}
                {this.state.cities.map(city => (<h4 className="noMarginTopTag">{city.outboundDate}</h4>))}
                <h5 className="noMarginTopTag">Temp max: {Math.round(day.temp.max)} &#8451;</h5>
                <h5 className="noMarginTopTag">Temp min: {Math.round(day.temp.min)} &#8451;</h5>
                <h5 className="noMarginTopTag capitalizes">{day.weather[0].description}</h5>
              </div>
            ))}
            {this.state.wheatherdestination.map(day => (
              <div
                key={(day.dt * Math.random()).toString()}
                className="wheathCard">
                {this.state.cities.map(city => (<h3
                  className="noMarginTopTag"
                  key={(city.id * Math.random()).toString()}>{city.destination}</h3>))}
                {this.state.cities.map(city => (<h4 className="noMarginTopTag">{city.inboundDate}</h4>))}
                <h5 className="noMarginTopTag">Temp max: {Math.round(day.temp.max)} &#8451;</h5>
                <h5 className="noMarginTopTag">Temp min: {Math.round(day.temp.min)} &#8451;</h5>
                <h5 className="noMarginTopTag capitalizes">{day.weather[0].description}</h5>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div >;
  };
};

// const wheath = (wheat) => {
//   return wheat.slice(0, 1);
// }

const sliceArr = (items) => {
  return items.slice(0, 1);
}

const concatItineraries = (elemns) => {
  if (elemns.length === 0) return alert("Something is wrong!")
  else if (elemns.length === 1) {
    return elemns[0].PricingOptions;
  }
  else if (elemns.length === 2) {
    return elemns[0].PricingOptions.concat(elemns[1].PricingOptions);
  }
  return elemns[0].PricingOptions.concat(elemns[1].PricingOptions).concat(elemns[2].PricingOptions);
}

export default App;

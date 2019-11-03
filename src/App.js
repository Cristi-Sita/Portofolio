import React, { Component } from 'react';
import axios from "axios";
import FlightForm from './components/FlightForm';
import './App.css';
import './components/FlightForm.css'
import './components/FlightCard.css'
import './components/img/baloon.jpeg'
import FlightCard from './components/FlightCard';



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
      price: []
    };
  };

  loadItems = () => {
    return axios.get("http://localhost:8080/items")
      .then(response => {
        this.setState({ items: response.data });
        this.setState({ flightsParams: this.state.items[0] });
        this.setState({ flightsData: JSON.parse(this.state.flightsParams.flightsData) });
        this.setState({ itineraries: this.state.flightsData.responseFlightsData.Itineraries });
        this.setState({
          price: this.state.itineraries[0].PricingOptions.concat(this.state.itineraries[1]
            .PricingOptions).concat(this.state.itineraries[2].PricingOptions)
            .concat(this.state.itineraries[3].PricingOptions)
        });
        this.setState({
          sortPrice: this.state.price.sort((a, b) => {
            return Number(a.Price) - Number(b.Price);
          })
        });
      })
      .then(() => console.log(this.state.itineraries, this.state.items))
  }

  componentDidMount() {
    this.loadItems()
  }

  render() {
    return (
      <div className="mainContainer">
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
              <span style={{ marginTop: 0, fontSize: '0.5em' }}>(result are from MySQL database)</span>
            </h3>
            {this.state.items.map(item => (
              <div
                key={item.id}
                className="historyCard">
                <h4 className="noMarginTopTag">{item.origin} to {item.destination}</h4>
                <h5 className="noMarginTopTag">{item.outboundDate} -- {item.inboundDate}</h5>
              </div>
            ))}
          </div>
          <div className="middleContainer">
            <FlightForm />
            <FlightCard />
          </div>
          <div className="sideContainers forecastWheather">
            <div className="sideImage wheatherImage"></div>
          </div>
        </main>
      </div >
    );
  };
};

export default App;

import React, { Component } from 'react';
import axios from "axios";
import FlightForm from './components/FlightForm';
import FlightCard from './components/FlightCard';
import './App.css';
import './components/FlightForm.css'
import './components/FlightCard.css'
import './components/Loader.css'
import "./components/Responsive.css"
import './components/img/baloon.jpeg'
import './components/img/commercialAirplane.jpg'
import './components/img/commercialAirplane1.jpg'
import './components/img/commercialAirplane2.jpg'

const slide = ['commercialAirplane1.jpg', 'baloon.jpeg', 'commercialAirplane.jpg', 'commercialAirplane2.jpg'];
let i = 0;

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
      slide: slide,
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
    axios.post('https://flightsearchnodejs.cristisita.now.sh/items', {
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
        // console.log(response)
        setTimeout(() => this.loadItems(), 12000)
      })
      .catch(error => console.log(error));
  }

  loadItems = () => {
    return axios.get("https://flightsearchnodejs.cristisita.now.sh/items")
      .then(response => {
        if (response.data[0].wheatherorigin === null || typeof (response.data[0].wheatherorigin) === 'undefined') {
          console.log(response);
          i++;
          if (i === 12) {
            return axios.delete("https://flightsearchnodejs.cristisita.now.sh/items/id")
              .then(response => {
                i = 0;
                console.log(response, "delete")
                setTimeout(() => this.loadItems(), 2000)
              })
              .then(() => alert('Something is wrong! Check if the destination is correct, if so, try again later!'))
          }
          return setTimeout(() => this.loadItems(), 3000)
        }
        this.setState({ loading: false })
        this.setState({ items: response.data });
        this.setState({ cities: sliceArr(response.data) })
        this.setState({
          wheatherorigin: [wheath(response.data[0].outboundDate,
            JSON.parse(response.data[0].wheatherorigin).wheathOrigin.list)]
        });
        this.setState({
          wheatherdestination: [wheath(response.data[0].outboundDate,
            JSON.parse(response.data[0].wheatherdestination).wheathDestination.list)]
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
        console.log(wheath(response.data[0].outboundDate,
          JSON.parse(response.data[0].wheatherorigin).wheathOrigin.list),
          this.state.wheatherorigin
          //   wheath(response.data[0].outboundDate,
          //     JSON.parse(response.data[0].wheatherorigin).wheathOrigin.list),
          //   response.data[0].inboundDate,
          //   response.data[0].outboundDate,
          //   this.state.cities[0].outboundDate,
          //   JSON.parse(response.data[0].wheatherdestination).wheathDestination.list
        )
      })
      // .then(() => console.log(this.state.cities, /*this.state.items[0], this.state.flightsData*/
      //   this.state.wheatherorigin))
      .catch((error) => console.log(error))
  }

  componentDidMount() {
    this.loadItems()
  }

  render() {
    return <div className="mainContainer" >
      <img className="bkgImage"
        src={require(`./components/img/${slide[
          Math.floor(slide.length * Math.random())
        ]}`)}
        alt="flying objects" />
      <header className="appHeader">
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
              <h3 className="noMarginTop">{item.origin} to {item.destination}</h3>
              <h4 className="noMarginTop">{item.outboundDate} return on: {item.inboundDate}</h4>
            </div>
          ))}
        </div>
        <div className="middleContainer">
          <FlightForm handleSubmit={this.handleSubmit}
            originPlace={this.state.originPlace}
            handleChange={this.handleChange} />
          {this.state.loading === true ? <div id="loader">
            <div id="loaderAnimation">
            </div>
            <h3 className="loadingText">Searching...</h3>
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
              typeof (day) === "undefined" ? <h1>Can't display wheather.
               But doesn't matter because the weather is unpredictable.</h1> :
                <div
                  key={(day.dt * Math.random()).toString()}
                  className="wheathCard">
                  {this.state.cities.map(city => (<h2
                    className="noMarginTop"
                    key={(city.id * Math.random()).toString()}>{city.origin}</h2>))}
                  {this.state.cities.map(city => (<h4
                    key={this.state.cities[0].id}
                    className="noMarginTop">{city.outboundDate}</h4>))}
                  <h4 className="noMarginTop">Temp max: {Math.round(day.temp.max)} &#8451;</h4>
                  <h4 className="noMarginTop">Temp min: {Math.round(day.temp.min)} &#8451;</h4>
                  <h4 className="noMarginTop capitalizes">{day.weather[0].description}</h4>
                </div>
            ))}
            {this.state.wheatherdestination.map(day => (
              typeof (day) === "undefined" ? <h1>Can't display wheather.
              But doesn't matter because the weather is unpredictable.</h1> :
                <div
                  key={(day.dt * Math.random()).toString()}
                  className="wheathCard">
                  {this.state.cities.map(city => (<h2
                    className="noMarginTop"
                    key={(city.id * Math.random()).toString()}>{city.destination}</h2>))}
                  {this.state.cities.map(city => (<h4
                    key={this.state.cities[0].id.toString()}
                    className="noMarginTop">{city.outboundDate}</h4>))}
                  <h4 className="noMarginTop">Temp max: {Math.round(day.temp.max)} &#8451;</h4>
                  <h4 className="noMarginTop">Temp min: {Math.round(day.temp.min)} &#8451;</h4>
                  <h4 className="noMarginTop capitalizes">{day.weather[0].description}</h4>
                </div>
            ))}
            <div className="contact">
              <h3>Contact:</h3>
              <h4>cristi_sita@yahoo.com</h4>
              <a
                className="anchorBtn gitLink"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/Cristi-Sita/Portofolio`}
              >GitHub</a>
            </div>
          </div>
        </div>
      </main>
    </div >;
  };
};

const wheath = (date, forecast16D) => {
  let someDay = new Date(date);
  return forecast16D.find(day => {
    let d2 = day.dt * 1000;
    let someDayW = new Date(d2);
    if (someDay <= someDayW) {
      return day;
    };
    return day;
  })
}

const sliceArr = (items) => {
  return items.slice(0, 1);
}

const concatItineraries = (elemns) => {
  let arr = elemns[0].PricingOptions;
  if (elemns.length === 0) return alert("Something is wrong! Verify if destination is type corectly! If yes try again.")
  else if (elemns.length === 1) {
    return elemns[0].PricingOptions;
  }
  for (let i = 1; i < elemns.length; i++) {
    arr = arr.concat(elemns[i].PricingOptions);
  }
  return arr;
}

export default App;

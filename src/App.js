import React, { Component } from 'react';
// import axios from "axios";
import FlightForm from './components/FlightForm';
import './App.css';
import './components/FlightForm.css'
import './components/FlightCard.css'
import './components/img/baloon.jpeg'
import FlightCard from './components/FlightCard';



class App extends Component {
  constructor() {
    super();

    this.state = {
    };
  };

  // componentDidMount() {
  //   Delay();
  // }

  render() {
    return (
      <div className="mainContainer">
        <header className="App-header">
          <h1 className="pageTitle">Flights search engine</h1>
          <p className="powered">Powered by Skyscanner</p>
        </header>
        <main className="mainContent">
          <img src={require('./components/img/baloon.jpeg')} alt="hot air baloon" />
          <div className="sideContainers historyOfSearch">
            <div className="sideImage airplaneImage"></div>
            <h3>The latest flight searches: </h3>
          </div>
          <div className="middleContainer">
            {/* <div className="formContainer"> */}
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

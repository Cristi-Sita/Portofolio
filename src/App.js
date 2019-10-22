import React from 'react';
// import axios from "axios";
import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: []
//     };
//   }

//   componentDidMount() {
//     this.loadItems();
//   }

function App() {
  return (
    <div className="mainContainer">
      <header className="App-header">
        <h1 className="pageTitle">Flights search engine</h1>
      </header>
      <main className="mainContent">
        <div className="sideContainers historyOfSearch">
          <div className="sideImage airplaneImage"></div>
          <h3>The latest flight searches: </h3>
        </div>
        <div className="middleContainer">
          <div className="formContainer">
            <form className="containerForm" autoComplete="on" action="http://localhost:8080/items" method="post">
              <label className="originCity">Flying from:</label>
              <select className="originCity" name="originCity">
                <option className="city" value="Bucuresti">Bucuresti</option>
                <option className="city" value="Cluj Napoca">Cluj Napoca</option>
                <option className="city" value="Constanta">Constanta</option>
                <option className="city" value="Timisoara">Timisoara</option>
              </select>
              <label className="destinationCity">Flying to:</label>
              <input
                className="destinationCity"
                type="textarea"
                required />
              <label className="departinDate">Departing: </label>
              <input
                type="date"
                name="dateTravel departingDate"
                required
                id={'() => datePickerId.max = new Date().toISOString().split("T")[0]'} />
              <label className="dateTravel returningDate">Returning: </label>
              <input
                type="date"
                name="returningDate"
                max=""
                required />
              <label className="travelers">Travelers:</label>
              <input
                type="number"
                className="peopleTravelers"
                name="adultsTravelers"
                min={'1'}
                max={'6'}
                required />Adults
              <input
                type="number"
                className="peopleTravelers"
                name="childrenTravelers"
                max={'6'} />Children ages (2-17)
              <input
                type="number"
                className="peopleTravelers"
                name="infantsTravelers"
                max={'6'} />Infants Age under 2
              <label className="cabin">Cabin Class:</label>
              <select className="cabinClases">
                <option className="cabinClass" value="economy">Economy</option>
                <option className="cabinClass" value="premiumeconomy">Premium Economy</option>
                <option className="cabinClass" value="business">Business</option>
                <option className="cabinClass" value="first">First</option>
              </select>

            </form>
          </div>
        </div>
        <div className="sideContainers forecastWheather">
          <div className="sideImage wheatherImage"></div>
        </div>
      </main>
    </div >
  );
}

export default App;

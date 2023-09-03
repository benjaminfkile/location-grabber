import { Component } from "react"
import "./App.css"
import userLocation from "./utils/userLocation"

type Types = {
  lat: number,
  lng: number
}

class App extends Component<{}, Types>{

  state = {
    lat: 0,
    lng: 0
  }

  componentDidMount() {
    userLocation.getUserLocation()
    this.getCoordiates()
  }

  getCoordiates = () => {
    if (userLocation.coordinates.lat && userLocation.coordinates.lng) {
      this.setState({ lat: userLocation.coordinates.lat, lng: userLocation.coordinates.lng })
    }
    setTimeout(() => {
      userLocation.getUserLocation()
      this.getCoordiates()
    }, 500)
    // console.log(this.state)
  }

  render() {

    return (
      <div className="App">
        <p>{`lat: ${this.state.lat}`}</p>
        <p>{`lng: ${this.state.lng}`}</p>
        <div id="snackbar">snacks</div>
      </div>
    )
  }
}

export default App
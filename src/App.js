import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import appKey from './key';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      citySearch: '',
      cityName: '',
      region: '',
      temperature: 0,
      pressure: 0,
      humidity: 0,
      wind: 0,
      weather: 0,
      icon: '//cdn.apixu.com/weather/64x64/day/122.png',
      description: 'No Status',
      error: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();
    const { citySearch } = this.state;

    const url = `http://api.apixu.com/v1/current.json?key=${appKey}&q=${citySearch}`;
    axios.get(url)
    .then(response => {
      const data = response.data

      this.setState({
        cityName: data.location.name,
        region: data.location.region,
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        pressure: data.current.pressure_mb,
        icon: data.current.condition.icon,
        description: data.current.condition.text,
        error: ''
      })
    })
    .catch((e) =>{
      this.setState({
        error: 'Not Found, Try Again',
      })
    })
  }

  render() {
    const state = this.state;
    return (
      <div className="content">
      <div className="container">
        <div className="panel">
        <div className="col-left">
          <h3>Conditions:</h3>
          <div className="section">
                <div className="icon">
                  <img src={`${state.icon}`} alt=""/>
                </div>
                <h4>{state.description}</h4>
            </div>
        </div>
        <div className="col-right">
          <form>
          <div className="searchbar">
            <input name="citySearch" onChange={this.onChange} type="text" placeholder="Please insert your location here"/>
          </div>
          <button onClick={this.onSubmit} className="searchbutton">Search</button>
          </form>
          <div className="error">
            <h4>{state.error}</h4>
          </div>
          <div className="info">
            <div className="city">
            <h1><strong>City:</strong><span className="nameCity">{state.cityName}</span>
            <strong>Region:</strong><span className="nameCity">{state.region}</span>
            </h1>
            </div>
            <div className="weather-state">
              <div className="title">
                <h1>Temperature</h1>
              </div>
              <div className="value">
                {state.temperature}
                <span>ºC</span>
              </div>
              <div className="title">
                <h1>Humidity</h1>
              </div>
              <div className="value">
                {state.humidity}
              </div>
              <div className="title">
                <h1>Wind</h1>
              </div>
              <div className="value">
                {state.wind}
                <span>Km/h</span>
              </div>
              <div className="title">
                <h1>Pressure</h1>
              </div>
              <div className="value">
                {state.pressure}
                <span>mbar</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    )
  }
}


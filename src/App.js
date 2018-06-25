import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/game'
// import FA from 'react-fontawesome';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Play Nine</h1>
          </header>
          {/*<FA
            className="super-crazy-colors"
            name="rocket"
            size="2x"
            spin
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />*/}
        </div>
        <div>
          <Game />
        </div>
      </div>
    );
  }
}

export default App;

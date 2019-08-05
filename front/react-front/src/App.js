import React from 'react';
import logo from './logo.svg';
import './App.css';
import "aviator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link navigate"
          href={Aviator.hrefFor('/red')}
          rel="noopener noreferrer"
        >
          Go To Red
        </a>
        <a
          className="App-link navigate"
          href={Aviator.hrefFor('/green')}
          rel="noopener noreferrer"
        >
          Go To Green
        </a>
      </header>
    </div>
  );
}

export default App;

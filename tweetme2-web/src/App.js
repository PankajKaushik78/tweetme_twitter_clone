import React from 'react';
import './App.css';

import { TweetComponent } from "./tweets"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tweet me</h1>
        <div>
          <TweetComponent />
        </div>
      </header>
    </div>
  );
}

export default App;

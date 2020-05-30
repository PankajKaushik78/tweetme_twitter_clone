import React, { useEffect, useState } from 'react';
import './App.css';

import { TweetList } from "./tweets"


function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1>Tweet me</h1>
        <div>
          <TweetList />
        </div>
      </header>
    </div>
  );
}

export default App;

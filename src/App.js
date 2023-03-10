import React from 'react';
import './App.css';
import Provider from './Context/loginProvider';
import Routes from './Routes/Routes';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './componentes/LandingPage/LandingPage';
import Home from './componentes/Home/Home';
import VideogamesCreated from './componentes/VideogamesCreated/VideogamesCreated'
import Detail from './componentes/Detail/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/createVideogames" component={VideogamesCreated} />
        <Route exact path="/home/:id" component={Detail} />

      </div>
    </BrowserRouter>
  );
}

export default App;

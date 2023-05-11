import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import LandingPage from './components/Landing/landing';
import Home from './components/Home/home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route exact path = '/Home' component = {Home}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

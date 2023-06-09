import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import LandingPage from './components/Landing/landing';
import Home from './components/Home/home';
import Detail from './components/Detail/detail';
import CreateDog from './components/CreateDog/createdog';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route exact path = '/Home' component = {Home}/>
        <Route exact path="/Home/:id(\d+)" component={Detail} />
        <Route exact path= '/Form' component = {CreateDog} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

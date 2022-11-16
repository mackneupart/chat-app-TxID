import './App.css';
import './Design System/colours.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn.js';
import SignUp from './Pages/SignUp/SignUp';
import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = 'oyvNGU2jDF7KZjkNpZCyXZh9xpBaIh0Mrzg6fwpg';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'Zymf5X99QaEaZWjjWF8f3TVCtfi0SCWHdW7kjyU4';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App(props) {
  return (

    <BrowserRouter>
      <div className="App">
      </div>
      <Routes>
        <Route path= "/" element = {<SignIn page = "SignIn"/>}/>
        <Route path="signup" element = {<SignUp page = "SignUp"/>}/>
        <Route path="home" element = {<Home page = "Home"/>}/>
      </Routes>
  </BrowserRouter>


  );
}

export default App;

import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

function App(props) {
  return (

    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Sign in</Link></li>
            <li><Link to="signup">Sign Up</Link></li>
            <li><Link to="home">Home</Link></li>
          </ul>
        </nav>
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

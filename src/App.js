import "./App.css";
import "./DesignSystem/colours.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn.js";
import SignUp from "./Pages/SignUp/SignUp";
import ChatTest from "./Pages/ChatTest/ChatTest"
import Parse from "parse";

const ParseAppID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const ParseHostURL = process.env.REACT_APP_PARSE_HOST_URL;
const ParseJavaScriptKey = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(ParseAppID, ParseJavaScriptKey);
Parse.serverURL = ParseHostURL;

function App(props) {
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Routes>
        <Route path="/" element={<SignIn page="SignIn" />} />
        <Route path="signup" element={<SignUp page="SignUp" />} />
        <Route path="home" element={<Home page="Home" />} />
        <Route path="chatTest" element={<ChatTest page="ChatTest" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
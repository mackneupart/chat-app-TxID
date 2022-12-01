import "./App.css";
import "./DesignSystem/colours.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn.js";
import SignUp from "./Pages/SignUp/SignUp";
import ChatTest from "./Pages/ChatTest/ChatTest"
import Parse from "parse";
//import { createUser, readCatIcons } from "./API/API";

const ParseAppID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const ParseHostURL = process.env.REACT_APP_PARSE_HOST_URL;
const ParseJavaScriptKey = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(ParseAppID, ParseJavaScriptKey);
Parse.serverURL = ParseHostURL;
/* 
const getCatIcons = async () => {
  try {
    const result = await readCatIcons();
    return result;
  } catch (error) {
    console.log(`Error when trying to read cat icons: ${error}`);
  }
};

const test = async function () {
  try {
    await createUser(
      "catcat",
      "12345",
      "catcat@email.com",
      await getCatIcons()[0]
    );
    console.log(Parse.User.current());
    console.log("this is test image:")
    console.log(Parse.User.current().get("test"));
  } catch (error) {
    console.log(error);
  }
};

test();
 */
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

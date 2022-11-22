import LanguageDropdown from "../../Components/language/LangugageDropdown";
import TextInput from "../../Components/text/TextInput";
import InterestList from "../../Components/InterestList/InterestList"
import "./SignUp.css";
import Parse from 'parse/dist/parse.min.js';
import {useEffect, useState} from "react";
import { Navigate,useNavigate } from "react-router-dom";

export default function SignUp(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState([]);
    const [targetLanguage, setTargetLanguage] = useState([]); 
    const [catIcons, setCatIcons] = useState(null);
    const navigate = useNavigate();
    


    const doUserRegistration = async function () {
        const user = new Parse.User();
        user.set("username", username);
        user.set("password",password);
        user.set("email", email);
        user.set("nativeLanguage", nativeLanguage);
        user.set("targetLanguage", targetLanguage);
        try{
            await user.signUp();
            alert(`User ${user.getUsername()} created`)
            navigate("/")
        }catch(error){
            alert(`Error! ${error}`);
        }
      };
    
    useEffect(()=> {
        const getCatPNG = async function(){
            const query = new Parse.Query("catIcons");
            const icons = await query.find();
            setCatIcons(icons)
            
        }
        getCatPNG()
            .catch(console.error);

    },[])
    


    function makeProfileSelection(){
        //to avoid many reloads
        
            try{
                return ( 
                    <div>
                        {catIcons.map((catIcon) => (
                        <img alt={catIcon !== null  ? catIcon.get("name") : "not working :("} src={catIcon !== null  ? catIcon.get("catPNG")._url : "altText"} onClick={() => handleSelect(catIcon.get("catPNG")._url)}/>
                      ))}
                    </div>
                    
                );
            } catch (error){
                return false;
            }        
    }

    
    function handleSelect(source){
        //change profile picture to selected picture
        const profPic = document.getElementById("ProfilePicture");
        profPic.src = source;       

    }
    
    return(
        <div>
        <div className="background">

                {/**left side, picture */}
                <div className = "lila_box">
                    <div className = "profilePic">
                        <img className="profilePicture" id="ProfilePicture" alt = "Profile" src = {catIcons !== null  ? catIcons[0].get("catPNG")._url : "altText"} />
                    </div>
                    <label>Select a profile picture:</label>
                    <div className = "pictureSelection">
                        {makeProfileSelection()}
                       
                    </div>
                    
                    <div>
                        {/**right side user information */}
                        {/**User name control */}
                        <label>Username:</label>
                            <input
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Username"
                            size="large"
                            className="form_input"
                            /> <br/>
                        <label>E-mail :</label>
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="email"
                            size="large"
                            className="form_input"
                        />
                        <br/>
                        {/** TODO password control*/}
                        <label>Password: </label><input type="password"></input><br/>
                        {/**repeat passwotd */}
                        <label>Repeat password: </label>
                            <input
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Password"
                                size="large"
                                type="password"
                            /><br/>
                    </div> 
                    <div>
                        {/**TODO: show different Languages /intersts after selection */}
                        <label>What is your native Language</label>
                        <LanguageDropdown setLanguage = {setNativeLanguage}/> <br/>
                        <label>What languages do you want to learn?</label>
                        <LanguageDropdown setLanguage = {setTargetLanguage}/> <br/>
                        <label>What are your interests:</label> <InterestList/> </div><br/>
                    <button onClick={() => doUserRegistration()}>Sign up</button>
                </div>
                
            </div>
        </div>
    )
}
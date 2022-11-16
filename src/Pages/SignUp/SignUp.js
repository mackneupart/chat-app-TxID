import LanguageDropdown from "../../Components/language/LangugageDropdown";
import TextInput from "../../Components/text/TextInput";
import InterestList from "../../Components/InterestList/InterestList"
import "./SignUp.css";
import Parse from 'parse/dist/parse.min.js';
import {useState} from "react";
import { Navigate,useNavigate } from "react-router-dom";

export default function SignUp(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState([]);
    const [targetLanguage, setTargetLanguage] = useState([]); 
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

    // const cat = new Parse.catIcons();
    // console.log(cat.getCatPNG());
    const src = [
        "./CatIcons/cat1.png", 
        "./CatIcons/cat2.png" ,
        "./CatIcons/cat3.png", 
        "./CatIcons/cat4.png", 
        "./CatIcons/cat5.png", 
        "./CatIcons/cat6.png", 
        "./CatIcons/cat7.png", 
        "./CatIcons/cat8.png", 
        "./CatIcons/cat9.png" ,
        "./CatIcons/cat10.png",
        "./CatIcons/cat11.png",
        "./CatIcons/cat12.png",
        "./CatIcons/cat13.png",
        "./CatIcons/cat14.png",
        "./CatIcons/cat15.png"
        ]
    
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
                        <img className="profilePicture" id="ProfilePicture" alt = "Profile" src = "./CatIcons/cat1.png" />
                    </div>
                    <label>Select a profile picture:</label>
                    <div className = "pictureSelection">
                        <img alt="Cat1" src={src[0]} onClick={() => handleSelect(src[0])} />
                        <img alt="Cat2" src={src[1]} onClick={() => handleSelect(src[1])}/>
                        <img alt="Cat3" src={src[2]} onClick={() => handleSelect(src[2])}/>
                        <img alt="Cat4" src={src[3]} onClick={() => handleSelect(src[3])}/>
                        <img alt="Cat5" src={src[4]} onClick={() => handleSelect(src[4])}/>
                        <img alt="Cat6" src={src[5]} onClick={() => handleSelect(src[5])}/>
                        <img alt="Cat7" src={src[6]} onClick={() => handleSelect(src[6])}/>
                        <img alt="Cat8" src={src[7]} onClick={() => handleSelect(src[7])}/>
                        <img alt="Cat9" src={src[8]} onClick={() => handleSelect(src[8])}/>
                        <img alt="Cat10" src={src[9]} onClick={() => handleSelect(src[9])} />
                        <img alt="Cat11" src={src[10]} onClick={() => handleSelect(src[10])} />
                        <img alt="Cat12" src={src[11]} onClick={() => handleSelect(src[11])} />
                        <img alt="Cat13" src={src[12]} onClick={() => handleSelect(src[12])} />
                        <img alt="Cat14" src={src[13]} onClick={() => handleSelect(src[13])} />
                        <img alt="Cat15" src={src[14]} onClick={() => handleSelect(src[14])} />
                    </div>
                    {/** we accidentally deleted the Select button but it might work better without */}
                    <div>
                        {/**right side user information */}
                        {/**User name control */}
                        {/**TODO make Text input types */}
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
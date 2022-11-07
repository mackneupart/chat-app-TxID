//import { useState } from 'react';
import LanguageDropdown from "../../Components/language/LangugageDropdown";
import TextInput from "../../Components/text/TextInput";
import InterestList from "../../Components/InterestList/InterestList"
import "./SignUp.css";


//TODO: Save this input somewhere
export default function SignUp(){

    //const alert = useAlert()
    //TODO: Handle Submit
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
    function handleSubmit(){
        console.log("Submitted!")
        //check for unique user name
        //check mail => is mail
        //check password and repeated password
        //send everything to databank
    }
    
    function handleSelect(source){
        //change profile picture to selected picture
        const profPic = document.getElementById("ProfilePicture");
        profPic.src = source;       

    }
    
    return(
        <div>
        <div className="background">

        <form onSubmit={handleSubmit}>


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
                        <label>Username:</label> <TextInput/> <br/>
                        <label>E-mail :</label> <TextInput/><br/>
                        {/** TODO password control*/}
                        <label>Password: </label><input type="password"></input><br/>
                        {/**repeat passwotd */}
                        <label>Repeat password: </label><input type="password"></input><br/>
                    </div> 
                    <div>
                        {/**TODO: show different Languages /intersts after selection */}
                        <label>What is your native Language</label>
                        <LanguageDropdown/> <br/>
                        <label>What languages do you want to learn?</label>
                        <LanguageDropdown/> <br/>
                        <label>What are your interests:</label> <InterestList/> </div><br/>
                    <input type="submit" value = "Sign Up"></input>
                </div>
                </form>
            </div>
        </div>
    )
}
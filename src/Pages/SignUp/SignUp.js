
import LanguageDropdown from "../../Components/language/LangugageDropdown";
import TextInput from "../../Components/text/TextInput";
import "./SignUp.css";

//TODO: Save this input somewhere
export default function SignUp(){

    //const alert = useAlert()
    //TODO: Handle Submit
    function handleSubmit(){
        console.log("Submitted!")
    }
    //const profilePicture = [picture, setPicture]
    function handleSelect(picture){
        //change profile picture to selected picture

    }
    
    return(
    
        <div>
            <div className="background">
                <form onSubmit={handleSubmit}>
                    <div>
                        {/**left side, picture */}
                        <div ClassName = "lila_box">
                            <div Classname = "profilePic">

                            </div>
                            <label>Select a profile picture:</label>
                            <div ClassName = "pictureSelection">

                            </div>
                            <input type="button" value = "Select" onClick = {() => handleSelect(/**picture */)}></input>

                        </div>
                    </div>
                    <div>
                        {/**right side user information */}
                        {/**User name control */}
                        <label>Username:</label> <TextInput/> <br/>
                        <label>E-mail :</label> <TextInput/><br/>
                        {/** TODO password control*/}
                        <label>Password: </label><input type="password"></input><br/>
                        {/**repeat passwotd */}
                    </div>
                    <div>
                        {/**TODO: show different Languages /intersts after selection */}
                        <label>What is your native Language</label>
                        <LanguageDropdown/> <br/>
                        <label>What languages do you want to learn?</label>
                        <LanguageDropdown/> <br/>
                        <label>What are your interests:</label> <input type="text"></input>
                    </div><br/>
                    <input type="submit" value = "Sign Up"></input>
                </form>
            </div>
        </div>
    )
}
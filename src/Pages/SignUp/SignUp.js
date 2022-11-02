import LanguageDropdown from "../../Components/language/LangugageDropdown";
import TextInput from "../../Components/text/TextInput";


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
        //<ProfilePic scr = new scr)

    }
    
    return(
    
        <form onSubmit={handleSubmit}>
            <h1 className="page">Sign UP Page</h1>
            <div>
                {/**left side, picture */}
                <div ClassName = "lila_box">
                    <div Classname = "profilePic">
                        <img className="profilePicture" id="ProfilePicture" alt = "Profile Picture" src = "./CatIcons/cat1.png" />
                    </div>
                    <label>Select a profile picture:</label>
                    <div ClassName = "pictureSelection">
                    <img alt="Cat1" src="./CatIcons/cat1.png" />
                    <img alt="Cat2" src="./CatIcons/cat2.png" />
                    <img alt="Cat3" src="./CatIcons/cat3.png" />
                    <img alt="Cat4" src="./CatIcons/cat4.png" />
                    <img alt="Cat5" src="./CatIcons/cat5.png" />
                    <img alt="Cat6" src="./CatIcons/cat6.png" />
                    <img alt="Cat7" src="./CatIcons/cat7.png" />
                    <img alt="Cat8" src="./CatIcons/cat8.png" />
                    <img alt="Cat9" src="./CatIcons/cat9.png" />
                    <img alt="Cat10" src="./CatIcons/cat10.png" />
                    <img alt="Cat11" src="./CatIcons/cat11.png" />
                    <img alt="Cat12" src="./CatIcons/cat12.png" />
                    <img alt="Cat13" src="./CatIcons/cat13.png" />
                    <img alt="Cat14" src="./CatIcons/cat14.png" />
                    <img alt="Cat15" src="./CatIcons/cat15.png" />
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
    )
}
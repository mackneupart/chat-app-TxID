
import LanguageDropdown from "../Components/language/LangugageDropdown";
import TextInput from "../Components/text/TextInput";

//Save this input somewhere
export default function SignUp(){

    //const alert = useAlert()
    //TODO: Handle commit
    function handleSubmit(){
        console.log("Submitted!")
    }

    
    return(
    
        <form onSubmit={handleSubmit}>
            <h1 className="page">Sign UP Page</h1>
            <div>
                <label>Username:</label> <TextInput/> <br/>
                <label>E-mail :</label> <TextInput/><br/>
                {/** TODO passwort control*/}
                <label>Password: </label><input type="password"></input><br/>
            </div>
            <div>
                {/**TODO: show different Languages /intersts after selection */}
                <label>What is your native Language</label>
                <LanguageDropdown/> <br/>
                <label>What languages do you want to learn?</label>
                <LanguageDropdown/> <br/>
                <label>What are your interests:</label> <input type="text"></input>
            </div><br/>
            <input type="submit"></input>
        </form>
    )
}
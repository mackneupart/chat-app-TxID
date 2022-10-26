
function SignUp(){

    function handleSubmit(){
        
    }
    //name+ 
    //email + 
    //password
    //native
    //learning 
    //interests
    return(
    
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label> <input type = "text"></input>
                <label>E-mail :</label> <input type = "text"></input>
                <label>Password: </label><input type="password"></input>
            </div>
            <div>
                <label>What is your native Language</label>
                <select name = "languages"> 
                    <option>Spanish</option>
                    <option>Danish</option>
                </select>
                <label>What are your interests:</label> <input type="text"></input>
            </div>
            <input type="submit"></input>
        </form>
    )
}
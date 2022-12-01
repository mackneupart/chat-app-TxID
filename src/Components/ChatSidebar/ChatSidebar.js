import "./ChatSidebar.css"
import ChatList  from "../home/ChatList"

export default function ChatSidebar({chats, currenChat}){
    const language1 = "Danish" //currentChat language 1
    const language2 = "Spanish" // currentChat language 2

    function searchChat(event){
        
    }

    return(
        <div className="side-bar">
            <input className="search" type="text" placeholder = "Search" onChange={searchChat} ></input>
            <ChatList className="chat-list" chatList = {chats}/>
            
            <div className="language-radio">
                <p>Currently you are writing in:</p>
                <input className="radio-input" type="radio" name="current-language" value= {language1}/>
                <label for={language1}>{language1}</label>
                <input className="radio-input" type="radio" name="current-language" value= {language2}/>
                <label for={language2}>{language2}</label>                    
            </div>
                
            
        </div>
    )
}
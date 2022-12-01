import "./Message.css"

export default function Message({author, currentUser, content,  timestamp, index}){
    let received = true;
    //const currentUser = "User1"
    if (author === currentUser){
        received = false
        author = "you"
    }

    function handleEdit(content){
        console.log(content)

    }

    return(
        
        <div className="message" type= {received ? "received" : "send"}>
            <div className="author">{author}:</div>
            <div className="content" type= {received ? "received" : "send"}>{content}</div>
            <div className="edit-token" onClick={() => handleEdit(content)}>✏️</div>
            <div className="timestamp">{timestamp}</div>
            
        </div>
        
    );
}
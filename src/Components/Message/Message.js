import "./Message.css"

export default function Message({content, author, timestamp}){
    let received = true;
    const currentUser = "User1"
    if (author == currentUser){
        received = false
        author = "you"
    }

    return(
        
        <div className="message"  >
            <div className="author">{author}:</div>
            <div className="content" type= {received ? "received" : "send"}>{content}</div>
            <div className="timestamp">{timestamp}</div>
        </div>
        
    );
}
import { type } from "@testing-library/user-event/dist/type"
import "./PopUp.css"

export default function PopUp({type, function, content}){
    if(type == "edit"){
        return(
            <div className="popup">
                <input type={text} className="correction-field"></input>
            </div>
        );
    }
}
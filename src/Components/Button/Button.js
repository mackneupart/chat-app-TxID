import React from "react";

const Button = (props) => {
    const click = props.click;
    const text = props.text;

    return (
        
        <button className="button" onClick={click}>{text}</button>
    )
}

export default Button;
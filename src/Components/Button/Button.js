import React from "react";
import "./Button.css"

const Button = (props) => {
    const handleClick = props.click;
    const text = props.text;

    return (
        
        <button className="button-default button-text" onClick={handleClick}>{text}</button>
    )
}

export default Button; 
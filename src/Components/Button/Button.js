import React from "react";

const Button = (props) => {
    const handleClick = props.click;
    const text = props.text;

    return (
        
        <button className="button" onClick={handleClick}>{text}</button>
    )
}

export default Button;
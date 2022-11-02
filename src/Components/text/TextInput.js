import { useState } from 'react';

export default function TextInput(){

    const [input, setInput] = useState("")

    function handleChange(event){
        setInput(event.target.value)
    }
    return(
        <input type="text" value={input} onChange={handleChange} />
    )
}
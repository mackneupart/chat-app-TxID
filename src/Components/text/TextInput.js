import { useState } from 'react';

export default function TextInput({handleNewItem}){

    const [input, setInput] = useState("")

    function handleChange(event){
        setInput(event.target.value)
    }
    function handleSubmit(event){
        event.preventDefault()
        handleNewItem(input)
    }
    return(
        <input type="text" value={input} onChange={handleChange} onSubmit = {handleSubmit}/>
    )
}
import { useState } from 'react';
import ListItem from '../ListItem/ListItem';
import './ItemList.css'

const ItemList= ()=>{
    //const [input, setInput] = useState("")
    const [itemList, setItemList] = useState(
        [
            
        ]
    )
    

    /**function handleChange(event){
        setInput(event.target.value)
    }
    */
    function handleAdd(val){
        setItemList(prevState => [...prevState, val])
        console.log(val)
        //setInput("")
    }
    function deleteItem(index){
        setItemList(prevState => [...prevState.filter((item, i ) => i != index)])
    }
    return(
            
        <ul>{itemList.map((item, index) => 
                <ListItem key = {index} item ={item} index = {index} deleteItem = {deleteItem} />
            )}
            
        </ul>
        
        
    );
}

export default ItemList;
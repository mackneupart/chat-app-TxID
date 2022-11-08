import "./ListItem.css";



function ListItem({item, index, deleteItem}){

    function handleClick(index){
        deleteItem(index)
    }
    return(
        <li className="Item">{item}
            <span className="delete" onClick={() => handleClick(index)}>
            {/**cross might be better, this is for visibility */}
            🗑️ 
            </span>
        </li>
    )
}

export default ListItem
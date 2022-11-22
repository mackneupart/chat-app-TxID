import "./ListItem.css";

function ListItem({item, index, deleteItem}){

    return(
        <li className="Item">{item}
            <span className="delete" onClick={() => deleteItem(index)}>
            {/**cross might be better, this is for visibility */}
            🗑️ 
            </span>
        </li>
    )
}

export default ListItem
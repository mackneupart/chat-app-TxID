import "./ListItem.css";

function ListItem({item, index, deleteItem}){

    return(
        <li className="item">{item}
            <span className="delete" onClick={() => deleteItem(index)}>
            {/**cross might be better, this is for visibility */}
            x
            </span>
        </li>
    )
}

export default ListItem
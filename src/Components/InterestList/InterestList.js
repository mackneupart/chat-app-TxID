import { useState } from "react";
import ListItem from "../ListItem/ListItem";
import TextInput from "../text/TextInput";
import "./InterestList.css";

//TODO: not reload on enter
const InterestList = () => {
  const [input, setInput] = useState("");
  const [interestList, setInterestList] = useState([]);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleNewItem(input) {
    setInterestList((prevState) => [...prevState, input]);
    console.log(input);
    //event.preventDefault()
    setInput("");
  }
  function deleteItem(index) {
    setInterestList((prevState) => [
      ...prevState.filter((item, i) => i != index),
    ]);
  }
  return (
    <div>
      <TextInput handleNewItem={handleNewItem} />

      <ul>
        {interestList.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            index={index}
            deleteItem={deleteItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default InterestList;

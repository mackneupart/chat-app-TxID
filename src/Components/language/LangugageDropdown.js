import { useEffect, useState } from "react";
import ListItem from "../ListItem/ListItem";
import { getLanguages } from "../../API/API";

export default function LanguageDropdown({ showChosen }) {
  // what would be better name than 'showChosen'? Change here and in SignUp. /cema
  const [selected, setSelected] = useState(""); // I still do not understand 'selected'. /cema
  const [chosenLanguagesName, setChosenLanguagesName] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [chosenLanguagesID, setChosenLanguagesID] = useState([]);

  useEffect(() => {
    const getLanguagesOptions = async function () {
      setLanguageOptions(await getLanguages());
    };
    getLanguagesOptions();
  }, []);

  useEffect(() => {
    if (chosenLanguagesName) {
      showChosen(chosenLanguagesID);
      console.log(chosenLanguagesName);
      console.log(chosenLanguagesID);
    }
  }, [chosenLanguagesID]);

  function addToChosen(language) {
    setChosenLanguagesID((prevState) => [...prevState, language.value]);
    setChosenLanguagesName((prevState) => [...prevState, language.text]);
  }

  function deleteItem(index) {
    setChosenLanguagesName((prevState) => [
      ...prevState.filter((item, i) => i !== index),
    ]);
  }

  return (
    <div className="languageDropdown">
      <select
        id="languages"
        name="languages"
        value={selected}
        onChange={(e) => addToChosen(e.target.selectedOptions[0])}
      >
        <option>Select Language</option>
        {languageOptions.map((language) => (
          <option key={language.id} value={language.id}>
            {language.get("name")}
          </option>
        ))}
      </select>
      <ul>
        {chosenLanguagesName.map((language, index) => (
          <ListItem
            key={language.id}
            item={language}
            index={index}
            deleteItem={deleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

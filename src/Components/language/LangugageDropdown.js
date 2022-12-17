import { useEffect, useState } from 'react';
import ListItem from '../ListItem/ListItem';
import Parse from "parse";

export default function LanguageDropdown({showChosen}) { // what would be better name than 'showChosen'? Change here and in SignUp. /cema
    const [selected, setSelected] = useState(""); // I still do not understand 'selected'. /cema
    const [chosenLanguages, setChosenLanguages] = useState([]);
    const [languageOptions, setLanguageOptions] = useState([]);

    useEffect(() => {
        const getLanguageOptions = async function () {
            const languageQuery = new Parse.Query("Language");
            languageQuery.ascending("name");
            languageQuery.includeAll();
            let languages = await languageQuery.find();
            setLanguageOptions(languages);
            return languages;
        }
        getLanguageOptions()
        // setLanguages(await getLanguages()), resten i API
    },[])

    function addToList(language){
        setChosenLanguages(prevState => [...prevState, language])
    }
    
    function deleteItem(index){
        setChosenLanguages(prevState => [...prevState.filter((item, i ) => i != index)])
    }

    return(
        <div className='languageDropdown'>
        <select id="languages" name="languages" value = {selected} onChange={(e) => addToList(e.target.selectedOptions[0].text)}>
            <option>Select Language</option>
            {languageOptions.map((language) => <option key={language.id} value={language.get("objectId")}>{language.get("name")}</option>)}
        </select>
        <ul>{chosenLanguages.map((language, index) => 
                <ListItem key={index} item={language} index={index} deleteItem={deleteItem} />
            )}
            {showChosen(chosenLanguages)}
            {/* ^^ put in useeffect */}
            
        </ul>
        </div>
    );
}
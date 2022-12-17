import { useEffect, useState } from 'react';
import ListItem from '../ListItem/ListItem';
import Parse from "parse";

export default function LanguageDropdown({showChosen}) {
    const [selected, setSelected] = useState("");
    const [chosenLanguages, setChosenLanguages] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const getLanguages = async function () {
            const languageQuery = new Parse.Query("Language");
            languageQuery.ascending("name");
            languageQuery.includeAll();
            let languages = await languageQuery.find();
            setLanguages(languages);
            return languages;
        }
        getLanguages()
        // setLanguages(await getLanguages()), resten i API
    },[])

    function selectDropdown(value){
        setChosenLanguages(prevState => [...prevState, value])
    }
    
    function deleteItem(index){
        setChosenLanguages(prevState => [...prevState.filter((item, i ) => i != index)])
    }

    return(
        <div className='languageDropdown'>
        <select id="languages" name="languages" value = {selected} onChange={(e) => selectDropdown(e.target.selectedOptions[0].text)}>
            <option>Select Language</option>
            {languages.map((language) => <option key={language.id} value={language.get("objectId")}>{language.get("name")}</option>)}
        </select>
        <ul>{chosenLanguages.map((item, index) => 
                <ListItem key = {index} item ={item} index = {index} deleteItem = {deleteItem} />
            )}
            {showChosen(chosenLanguages)}
            {/* maybe put in useeffect */}
            
        </ul>
        </div>
    );
}

export default function SelectedField(probs){

    function handleClick(event){
        const span = document.getElementsByClassName("close")
        span.parentElement.style.display = 'none';
    }
    return(
        <li>{probs.value}<span className="close" onClick={handleClick}>x</span> </li>
    );
}
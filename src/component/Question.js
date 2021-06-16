import React, {useEffect, useState} from "react";

const Question = () => {
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Récupération de la première question
        fetch('https://127.0.0.1:8000/api/questions/1').then(response => response.json()).then(data => console.log(data));
    }, []);

    useEffect(() => {
        // Dès qu'il y a une réponse, on enregistre tout dans history à la suite, et on demande une nouvelle question
        setHistory((prevState) => ({
            ...prevState,
            [question]: [answer]
        }));
        fetch('https://127.0.0.1:8000/api/questions/2').then(response => response.json()).then(data => console.log(data));
    }, [answer]);

    // Afficher dans le return la question et les options de réponse
    return <div>

    </div>
}

export default Question;
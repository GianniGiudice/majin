import React, {useEffect, useState} from "react";

const Question = () => {
    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState('OUI');
    const [history, setHistory] = useState([]);
    const [nb, setNb] = useState(1);
    const [end, setEnd] = useState(false);
    const [found, setFound] = useState(false);
    const [guess, setGuess] = useState('');

    useEffect(() => {
        // Récupération de la première question
        fetch('https://127.0.0.1:8000/api/questions/1').then(response => response.json()).then(
            data => setQuestion({id: data.id, value: data.value})
        );
    }, []);

    const onAnswerChanged = (e) => {
        setAnswer(e.currentTarget.value);
    }

    const onValidation = (e) => {
        e.preventDefault();
        setHistory((prevState) => ({
            ...prevState,
            [question.id]: answer
        }));
        setAnswer('OUI');

        fetch('https://127.0.0.1:8000/api/questions/particular?' + new URLSearchParams(history)).then(response => response.json()).then((data) => {
                let res = data['hydra:member'];
                if (res.length === 0) {
                    setEnd(true);
                }
                else if (res.length === 1) {
                    setEnd(true);
                    setFound(true);
                    setGuess(res[0].name);
                }
                else {
                    fetch('https://127.0.0.1:8000/api/questions/' + nb).then(response => response.json()).then((data) => {
                        setNb(nb + 1);
                        setQuestion({id: data.id, value: data.value});
                    })
                }
            }
        );
    }

    // Afficher dans le return la question et les options de réponse
    return <div>
        <p>
            {end ? 'Mmmmmh...' :
            question.value }
        </p>

        { (end && found) && <div>
            <p>J'ai trouvé ! Ton personnage est ...</p>
            <p className="text-success">{ guess }</p>
        </div>}

        { (end && !found) && 'Désolé, je n\'ai pas réussi à trouver ton personnage..'}

        {!end &&
            <form>
                <input type="radio" name="answer" value='OUI' checked={answer === 'OUI'} onChange={onAnswerChanged}/>
                <span className="text-success"> OUI</span>

                <input type="radio" name="answer" value='NON' checked={answer === 'NON'} onChange={onAnswerChanged}
                       className="ms-3"
                />
                <span className="text-danger"> NON</span>

                <div className="mt-3">
                    <button className="btn btn-majin" onClick={onValidation}>Valider</button>
                </div>
            </form>
        }
    </div>
}

export default Question;
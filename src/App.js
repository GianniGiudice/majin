import ParticlesBackground from "./component/ParticlesBackground";
import Question from "./component/Question";
import './App.css';
import Genie from './genie.svg';
import React, {useState} from 'react';

function App() {

    const [showQuestion, setShowQuestion] = useState(false);

    const handleClick = () => {
        setShowQuestion(true);
    }

    return (
        <div className="App">
            <header className="App-header">

                <ParticlesBackground/>

                <div id="content">
                    <img src={Genie} className="App-logo" alt="logo"/>

                    <p>{showQuestion}</p>
                    {
                        !showQuestion ? (
                            <>
                                <h1>Bienvenue sur Majin</h1>

                                <p>
                                    Pense à un personnage, j'essayerai de le trouver.
                                </p>

                                <button className="btn btn-majin btn-lg" onClick={handleClick}>
                                    Commencer
                                </button>
                            </>
                        ) : (<Question/>)
                    }

                </div>

            </header>
        </div>
    );
}

export default App;

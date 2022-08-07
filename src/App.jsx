import { useState } from 'react'
import './App.css';
import arrow from './arrow.svg'
import axios from 'axios'
import {SetCookie, GetCookie} from './Cookie'


function App() {

  const [checkCookie, setCheckCookie] = useState(GetCookie("nigga-already-done") ? true : false)

  const API = "https://godchildre-summercamp-beta-api.herokuapp.com/add/newScout"
  const [invalidField, setInvalidField] = useState(false)
  const [yourName, setYourName] = useState("")
  const [networkError, setNetworkError] = useState(false)

  function changeName(e) {
    setYourName(e.target.value)
  }


  function InputHandler(e) {
    setNetworkError(false)

    if(yourName.trim().length >= 4){
      axios.post(API, {name : yourName})
      .then((res) => {
        console.log(res.data.message)
        setInvalidField(false)
        setYourName('')
        SetCookie("nigga-already-done", res.data.message)
        setCheckCookie(true)
        })
        .catch((err) => {
          console.log("Error posting data: ", err)
          setNetworkError(true)
        })
    }

    else{
      setInvalidField(true)
    }
  }
  
  return (
    <div className="App">
      {checkCookie && <div id="already-in"> 
        <h1 id="already-in-text">Vous êtes déjà inscrit(e) 🙃</h1>
        <div id="circle"></div> 
      </div>}
      
      {networkError && <h1 className="newtwork-error">Erreur lors du POST. Verifiez votre connexion</h1>}

    {!checkCookie && 
      <div className="input-name">
        <input 
        type="text" name="your-name" id="your-name" placeholder='Votre nom'
        className={invalidField ? "invalid-field" : ""}
        onChange={changeName}
        autoFocus/>
        
        <div className="separator"></div>
        
        <div className={"arrow"}> 
          <img src={arrow} id="arrow-svg" alt="Valider" title='Valider' required onClick={InputHandler} /> 
        </div>

      </div>
    }
    </div>
  );
}

export default App;

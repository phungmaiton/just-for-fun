import React, { useState, useRef } from 'react';
import question from "./question.gif";
import yes from "./yes.gif";
import no from "./no.gif";
import yay from "./yay.gif";
import './App.css';
import anime from 'animejs';
import Confetti from 'react-confetti'
import { useWindowSize} from '@react-hook/window-size'

function App() {
  const [position, setPosition] = useState({ bottom: 0, left: 0 });
  const [yesIsClicked, setYesIsClicked] = useState(false);
  const noImageRef = useRef(null);
  const { width, height } = useWindowSize()
  const handleMouseOver = (e) => {
    const image = noImageRef.current;
    if (image) {
      const bottom = getRandomNumberForHeight();
      const left = getRandomNumberForWidth();

      animateMove(image, 'bottom', bottom);
      animateMove(image, 'left', left);

      setPosition({ bottom, left });
    }
  }

  const animateMove = (element, prop, pixels) => {
    anime({
      targets: element,
      [prop]: pixels,
      easing: 'easeOutCirc'
    });
  }

  const getRandomNumberForWidth = () => {
    const halfWindowWidth = window.innerWidth / 2;
    return Math.floor(Math.random() * halfWindowWidth);
  };
  
  const getRandomNumberForHeight = () => {
    const halfWindowHeight = window.innerHeight / 2;
    return Math.floor(Math.random() * halfWindowHeight);
  };
  

  return (
    <div className="App">
      {yesIsClicked && <Confetti
        width={width}
        height={height}
      />}
      <header className="App-header">
        <h1>{!yesIsClicked ? '나랑 사귈래?' : '사랑해!'}</h1>
        <img src={yesIsClicked ? yay : question} className="question" alt="question" />
        {!yesIsClicked && 
          <div className="image-container">
            <img src={yes} style={{cursor: 'pointer', marginLeft: -80}} alt="yes" onClick={() => setYesIsClicked(true)} />
            <img
              src={no}
              className="no"
              alt="no"
              ref={noImageRef}
              onMouseOver={handleMouseOver}
              style={{ position: 'relative' }}
            />
          </div>
        }
      </header>
    </div>
  );
}

export default App;

import TypeArea from './components/typeArea.jsx'
import { useState, useRef } from 'react'
import './App.css'
import keyboard from "/keyboard.svg"

function App() {

  return (
    <>
        <div className="App">
          <div id="top-wrapper">
            <h1 id="fight-type" >FightType</h1>
            <img id="keyboard-icon" src={keyboard} alt="" />
          </div>
        <TypeArea/>
        </div>
    </>
  )
}
export default App

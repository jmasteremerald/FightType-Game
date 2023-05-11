import Options from './options.jsx'
import React, { useState, useEffect, useRef } from 'react'
import '../stylesheets/typeArea.css'
// functional modulet s
function TypeArea(){
    let first = useRef(0);
    let second = useRef(0);
    // p variable is used to store and immediately update paragraph array  the paragraph value ---- p.current
    let p = useRef("he irony of the situation hadn't escaped her. She had taken years to sculpt the perfect persona with the perfect look that she shared on Instagram. She knew her hundreds of thousands of followers envied that life she showed and stayed engaged with her because they wanted that life too. The truth was that she wanted the perfect life she portrayed more than any of her fans. The fact was that despite all the perfection she shared on social media, her life was actually more of a mess than most.");
    let refs = useRef(p.current.split("").map(() => React.createRef()))
    //array state to update the paragraph state 
    const setArrLength = [];
    setArrLength.length = 400;
    let myInputArr = [];
    let inputArr;
    let numberOfIncorrectCharacters = 0;
    let checker;
    let counter = 0;
    let seconds;
    let interval;
    let errChecker;

    useEffect(() => {
        document.getElementById('s0').classList.add('active-letter');
        document.getElementById('animation-span').classList.add('type-to-start-animation');
        clearInterval(interval);
        document.getElementById("ac").innerText = "Total Incorrect Characters Typed: 0";
        document.getElementById("ct").innerText = "Total Character Typed: 0" ;
      }, []);
    // Jsx variable for handeling the creation of elements for the paragraph array
    const arrHandler = p.current.split("").map((letter, index)=>{
        return(<span ref={refs.current[index]} value={letter} id={"s" + index.toString()} key={index}>{letter}</span>)
    })
    //function for setting timer
    function setTimer(){
        clearInterval(interval);
        if(second.current === 0){
            return(15);
        }
        else if(second.current === 1){
            return(30)  
        }
        else if(second.current === 2){
            return(60)  
        }
        else if(second.current === 3){
            return(80)
        }
    };
    // function for clearing the input-array counter and stored-data/classes        creating a new game session
    function clear(){
        clearInterval(interval)
        seconds = setTimer();
        document.getElementById('timer').innerText = "";
        myInputArr.length = 0;
        counter = 0;
        Array.from(document.getElementsByClassName('active')).forEach(element => element.classList.remove('non-pointer'));
        Array.from(document.getElementsByClassName('inactive')).forEach(element => element.classList.remove('non-pointer'));
        Array.from(document.getElementsByClassName('active-letter')).forEach(element => element.classList = '')
        Array.from(document.getElementsByClassName('wrong')).forEach(element => element.classList = '')
        Array.from(document.getElementsByClassName('right')).forEach(element => element.classList = '')
        document.getElementById('s0').classList.add('active-letter');
        numberOfIncorrectCharacters = 0;
    }
    /// count down function
    function startCountdown() {
        Array.from(document.getElementsByClassName('inactive')).forEach(element => element.classList.add('non-pointer'));
        Array.from(document.getElementsByClassName('active')).forEach(element => element.classList.add('non-pointer'));
        function startInterval(){
            console.log(seconds)
            document.getElementById('timer').innerText = seconds;
            seconds--;
            if (seconds < 0) {
                clearInterval(interval);
                document.getElementById('timer').innerText = setTimer()
                document.getElementById('animation-span').classList.add('type-to-start-animation');
                document.getElementById('animation-span').classList.remove('type-to-start-animation-not-active');
                document.getElementById("ac").innerText = "Total Incorrect Characters Typed: " + document.getElementsByClassName('wrong').length;
                document.getElementById("ct").innerText = "Total Characters Typed: " + myInputArr.length + " out of " + p.current.split("").length;
                Array.from(document.getElementsByClassName('inactive')).forEach(element => element.classList.remove('non-pointer'));
                Array.from(document.getElementsByClassName('active')).forEach(element => element.classList.remove('non-pointer'));
                Array.from(document.getElementsByClassName('wrong')).forEach(element => element.classList = '')
                clear()
                console.log('Ding!');
            }
        }
        startInterval()
        interval = setInterval(startInterval, 1000);
        return interval
    }
    //function for storing user input
    function storeUserInput(keyPress){
        if( myInputArr.length <= p.current.split("").length){
            myInputArr.push(keyPress.key);
        }
        return myInputArr;
    }
    // function for removing user input upon backspace
    function removeUserInput(){
        myInputArr.pop();
        return myInputArr;
    }
    //function for comparing user input to paragraph array and checking if they match
    function letterChecker(inputArr, arr2){
        if(!(inputArr[counter] === arr2[counter])){
            checker = false;
        }
        else{
            checker = true;
        }
        if(myInputArr.length <= arr2.length){
            counter++;
        }
        // if array reaches the end move cursor to end of word by changing class
        if(myInputArr.length === arr2.length){
            document.getElementById('s' +(counter-1).toString()).classList.add('end-letter');
            document.getElementById('s' +(counter-1).toString()).classList.remove('active-letter');
        }
        return checker;
    }
    function event(){
        addEventListener('keydown', (e)=>{
            console.log(myInputArr.length)
            // title animation toggle
            document.getElementById('animation-span').classList.remove('type-to-start-animation');
            document.getElementById('animation-span').classList.add('type-to-start-animation-not-active');
            // prevent spaceBar from sliding page down
            if(e.key === " "){
                e.preventDefault();
            }
            // if key is pressed after input-array reaches the end of paragraph array refresh game
            if(myInputArr.length === p.current.split("").length-1){
                document.getElementById('timer').innerText = setTimer()
                document.getElementById('animation-span').classList.add('type-to-start-animation');
                document.getElementById('animation-span').classList.remove('type-to-start-animation-not-active');
                storeUserInput(e);
                document.getElementById("ac").innerText = "Total Incorrect Characters Typed: " + document.getElementsByClassName('wrong').length;
                document.getElementById("ct").innerText = "Total Characters Typed: " + myInputArr.length + " out of " + p.current.split("").length;
                Array.from(document.getElementsByClassName('wrong')).forEach(element => element.classList = '')
                clear()
            }
            else{
                // if backspace reaches the end of words clear and reset timer
                if(counter <= 0 && e.key === "Backspace"){
                    clear()
                }
                else if(counter === 0 ){
                    clear()
                    interval = startCountdown();
                }
                // making sure the array index counter is never set below 0
                if (counter < 0){
                    counter = 0;
                    clear()
                }
                // removing data from user input array and classes on elements when backspaced
                if(e.key === "Tab"){
                    document.getElementById('timer').innerText = setTimer()
                    e.preventDefault();
                    clear()
                    document.getElementById('animation-span').classList.add('type-to-start-animation');
                    document.getElementById('animation-span').classList.remove('type-to-start-animation-not-active');
                }
                else if(e.key === "Backspace"){
                    // if backspace reaches the end of words clear and reset timer
                    if (counter === 1){
                        clear()
                    }
                    // backspace should delete the last added elment from the array and clear the classes from that element also
                    else{
                        inputArr = removeUserInput();
                        document.getElementById('s' +(counter-1).toString()).classList.value = '';
                        document.getElementById('s' +(counter).toString()).classList.remove('active-letter');
                        document.getElementById('s' +(counter-1).toString()).classList.add('active-letter');
                        counter--;
                        console.log(e.key);
                    }
                }
                else{
                    if(e.key === "Shift"){
                    }
                    else{
                        inputArr = storeUserInput(e);
                        checker = letterChecker(inputArr, p.current.split(""));
                        if(!checker){
                            document.getElementById('s' +(counter-1).toString()).classList.add('wrong');
                            document.getElementById('s' +(counter-1).toString()).classList.remove('letter');
                            console.log(e.key);
                            numberOfIncorrectCharacters++;
                        }
                        else{
                            document.getElementById('s' +(counter-1).toString()).classList.remove('wrong');
                            document.getElementById('s' +(counter-1).toString()).classList.add('right');   
                        }
                        document.getElementById('s' +(counter).toString()).classList.add('active-letter');
                        document.getElementById('s' +(counter-1).toString()).classList.remove('active-letter');
                    }
                }
            }
        })  
    }
    event();
    // rendered return 
    return (
        <>
            <div id="container"className="type-area-wrapper">
                <Options 
                second={second}
                p={p}
                first={first}
                refs={refs}
                />
                <div id="ans-wrapper">
                    <div className="ans" id="ans">
                        <div className="div-text" >Score Board!!!</div>
                        <div className="div-text" id="ac">
                        </div>
                        <div className="div-text"  id="ct">
                        </div>
                    </div>
                    <div className="ans" id="ans">
                        <div className="div-text" >This game will auto reset when the time runs out, watch the time and do your best. The score board will update the score to your last play attempt, If you are on a mobile device, please tap the words to display keyboard</div>
                    </div>
                </div>
                <span id="type-to-start">Type to<span id="animation-span" className="type-to-start-animation"> Start</span></span>
                <div className="game-area">
                    <div id="timer">
                    </div>
                   <textarea id="textArea"></textarea>
                    {arrHandler}
                </div>
            </div>
            <div id="tab-wrapper">
                press <span className="keys">Tab</span> to restart the game or <span className="keys">Backspace</span> to the begining
                </div>
        </>
    )
};
export default TypeArea;

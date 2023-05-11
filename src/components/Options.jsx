import React, { useState, useEffect } from 'react'
import '../stylesheets/options.css'

function Options({second, p, first, refs}){
    //timer options
    let timerTitles =  ["15", "30", "60", "80"]
    let wordOptions = ["words","Caps & Punctuation","quotes"]
    let wordOptionsIcons = ["@", "/A.",`""`]
    //random number
    let r;
    useEffect(()=>{

    }, [second.current])
    useEffect(()=>{
        getData();
    }, [first.current])

    const getData=()=>{
        let dataSrc;
        if (first.current === 0){
            dataSrc = "random.json"
        }
        else if(first.current === 1){
            dataSrc = "punctuationAndCaps.json"
        }
        else if(first.current === 2){
            dataSrc = "quotes.json"
        }
        fetch(dataSrc,{ headers : { 'Content-Type': 'application/json','Accept': 'application/json'}})
        .then(function(response){
            return response.json();
        })
        .then(function(myJson) {
            r = Math.floor(Math.random() * 9);
            p.current = myJson[r].paragraph;
 
            refs.current.forEach((elementRef, index, arr )=>{
                if(index >= p.current.split("").length){
                    elementRef.current.innerText = ""
                }
                else{
                    elementRef.current.innerText = p.current.split("")[index]
                }
            })
        });
    }

    //active timer state
    const [firstOptActive, setFirstOptActiveState] = useState(null);
    const [secondOptActive, setSecondOptActiveState] = useState(null);

    function firstToggelActive(index){
        first.current = index;
        setFirstOptActiveState(index)
    }
    
    function secondToggelActive(index){
        second.current = index;
        setSecondOptActiveState(index);
    }
    function thirdToggelActive(index){
        setThirdOptActiveState({...thirdOptActive, active: thirdOptActive.id[index]})
    }    

    ///////// mapping out elements for each decision group
    //first map/*
    const firstMapOptions = wordOptions.map((option, indexF)=>(
        <p key={indexF} className={first.current === indexF ? "active s-o" : "inactive s-o"} onClick={()=>{firstToggelActive(indexF);}}> 
            <span className="word-icon">{wordOptionsIcons[indexF]}</span> {option}
        </p>
        ));

        // second map
    const secondMapOptions = timerTitles.map((timerTitle, indexS)=>(
        <span id={"second-options"+ indexS.toString()}key={indexS} className={ second.current===indexS ? "active s-o" : "inactive s-o"} onClick={()=>{
            secondToggelActive(indexS);}}>
            {timerTitle + "s"}&nbsp;&nbsp;&nbsp;</span>
        ));

    return(
        <>
        <div id="wrapper">
            <div className=" wrapper-containers">
                {firstMapOptions}
            <span className="border"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className="wrapper-containers">
            <p id="time"><span className="word-icon">Time:</span> &nbsp;&nbsp;&nbsp;
                {secondMapOptions}
            </p>
            <span className="border"></span>
            </div>
        </div>
        </>
    )
}
export default Options;
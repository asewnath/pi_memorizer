import React, { useRef, useEffect, useState } from 'react';
import pi from './constants'
import { useNavigate } from "react-router-dom";

var pi_index = 0;
var str_pi_index = 0;
var piString = '';
var focus_index = 0;

function TestPi() {

  /*
   TODO:
   - Each square should have two tries
   - Slower transition between learn and test
   - Back and forth between states in learn
   - add a digit counter
  */

  const [digits, setDigits] = useState(new Array(6).fill(""));
  const [knownDigits, setKnownDigits] =  useState(null);
  const [piError, setPiError] = useState(null);
  const [piCorrect, setPiCorrect] = useState(null);
  const [attempt, setAttempt] = useState(true);
  const piBoxReference = useRef([]);

  const navigate = useNavigate();

  const resetDigits = () => {
    let newArr = [...digits];
    for(let i = 0; i < 6; i++){
      newArr[i] = "";
    }
    setDigits(newArr);
    piBoxReference.current[0].focus();
  }

  function handleChange(value, index) {
    
    setPiCorrect(null);
    if(value === pi[index + pi_index]){
      let newArr = [...digits];
      newArr[index] = value;
      setDigits(newArr);
      setPiError(null);

      if(value && index < 5){
        piBoxReference.current[index + 1].focus();
      }
      if((index + 1) % 3 === 0){
        if(str_pi_index === 0){
          piString = '3.14';
          setKnownDigits(piString);
        }else{
          for(let i = str_pi_index; i <= str_pi_index+2; i++){
            piString = piString + pi[i];
          }
          setKnownDigits(piString);
        }
        str_pi_index = str_pi_index + 3;
      }
      if( (index + 1) % 6 === 0){
        pi_index = pi_index + 6;
        resetDigits();
        setAttempt(true);
        setPiCorrect("Correct! Enter next 6 digits");
      }
    }else{
      if(attempt){
        setPiError("❌ Incorrect digit, one more try");
        setAttempt(false)
      }else{
        let tmp_pi_index = pi_index
        pi_index = 0;
        str_pi_index = 0;
        piString = '';
        navigate("learnPi", {state: {pi_index:tmp_pi_index, known:knownDigits}});
      }
    }
  }

  useEffect(() => {
    if(digits.join("") === ""){
      setPiError(null);
      piBoxReference.current[0].focus();
    }
  }, [digits]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      event.preventDefault();
    }
    piBoxReference.current.forEach((box) => {
      if (box) {
        box.addEventListener('mousedown', handleMouseDown);
      }
    });
    return () => {
      piBoxReference.current.forEach((box) => {
        if (box) {
          box.removeEventListener('mousedown', handleMouseDown);
        }
      });
    };
  }, []);

  return (

    <section className="flex items-top justify-center min-h-96 max-w-7xl">
      <div className="w-3/5 bg-white rounded-lg p-6 shadow-lg"> 
        <article className="bg-white">
          <p className="text-base text-black mt-6 mb-4 font-semibold">Digits of π you know:</p>
          <p className="text-base text-black mt-4 bg-white p-4 rounded-md">{knownDigits}</p>
          <p className="text-base text-black mt-6 mb-4 font-semibold">Test: enter digits of π:</p>
        
        <div className='grid grid-cols-7 space-x-1'>
          {digits.map((digit, index)=>(
            <input key={index} value={digit} maxLength={1}
            onBlur={e => {
              if (e.relatedTarget === null) {
                  e.target.focus();
              }
            }}
            onChange={(e)=> handleChange(e.target.value, index)}
            ref={(reference) => (piBoxReference.current[index] = reference)}
            className={`border ${index === 2 ? 'grid-cols-subgrid col-span-2' : ''} w-20 h-auto text-black text-[30px] text-center p-3 rounded-md block bg-[#ffffff] focus:border-2 focus:outline-none appearance-none`}
            />
          ))}
        </div>

          <p className={`text-lg text-white mt-4 ${piCorrect ? 'correct-show' : ''}`}>{piCorrect}</p>
          <p className={`text-lg text-white mt-4 ${piError ? 'error-show' : ''}`}>{piError}</p>
        </article>
      </div>`
    </section>

  );
}

export default TestPi;

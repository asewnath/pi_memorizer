import React, { useRef, useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import pi from './constants'

var round = 1

function LearnPi(){
  const { state } = useLocation();
  const { pi_index, known } = state;
  const [digits, setDigits] = useState(new Array(6).fill(""));
  const [currDigits, setCurrDigits] = useState(new Array(6).fill(""));
  const [knownDigits, setKnownDigits] =  useState(known);
  const piBoxReference = useRef([]);

  const resetDigits = () => {
    let newArr = [...digits];
    for(let i = 0; i < 6; i++){
      newArr[i] = "";
    }
    setDigits(newArr);
    piBoxReference.current[0].focus();
  }

  function handleChange(value, index) {
    if(value === pi[index + pi_index]){
      let newArr = [...digits];
      newArr[index] = value;
      setDigits(newArr);
      
      if(value && index < 5){
        piBoxReference.current[index + 1].focus();
      }
      if(index === 6){
        round += 1;
        resetDigits();
      }
    }
  }

  useEffect(() => {
    if(round === 1){
      let newArr = [...currDigits];
      for(let i = 0; i < 6; i++){
        newArr[i] = pi[i + pi_index];
      }
      setCurrDigits(newArr);
    }
  }, [currDigits]);

  useEffect(() => {
    if(digits.join("") === ""){
      piBoxReference.current[0].focus();
    }
  }, [digits]);

  return(

    <section className="flex items-top justify-center min-h-96 max-w-7xl">
      <div className="w-3/5 bg-white rounded-lg p-6 shadow-lg"> 
        <article className="bg-white">
        <p className="text-base text-black mt-6 mb-4 font-semibold">Digits of pi you know:</p>
        <p className="text-base text-black mt-4 bg-white p-4 rounded-md">{knownDigits}</p>
        <div className='grid grid-cols-7 space-x-1'>

          {currDigits.map((digit, index)=>(
            <input key={index} value={digit} maxLength={1}  
            onChange={(e)=> handleChange(e.target.value, index)}
            className={`${index === 2 ? 'grid-cols-subgrid col-span-2' : ''} w-20 h-auto text-black text-[30px] text-center p-3 rounded-md block bg-[#ffffff] focus:border-2 focus:outline-none appearance-none`}
            />
          ))}

          {digits.map((digit, index)=>(
            <input key={index} value={digit} maxLength={1}  
            onChange={(e)=> handleChange(e.target.value, index)}
            ref={(reference) => (piBoxReference.current[index] = reference)}
            className={`border ${index === 2 ? 'grid-cols-subgrid col-span-2' : ''} w-20 h-auto text-black text-[30px] text-center p-3 rounded-md block bg-[#ffffff] focus:border-2 focus:outline-none appearance-none`}
            />
          ))}
        </div>
        </article>
      </div>
    </section>

  )
}

export default LearnPi





import React, { useRef, useEffect, useState } from 'react';

const correctPi = ["3", "1", "4", "1", "5", "9", "2", "6", "5", "3", "5", "8",
                   "9", "7", "9", "3", "2", "3", "8", "4", "6", "2", "6", "4"];
var pi_index = 0;
var piString = '';

function DigitInput({ numberOfDigits }) {
  
  // TODO:
  // - Don't make other boxes clickable

  const [digits, setDigits] = useState(new Array(numberOfDigits).fill(""));
  const [knownDigits, setKnownDigits] =  useState(null);
  const [piError, setPiError] = useState(null);
  const [piCorrect, setPiCorrect] = useState(null);
  const [attempt, setAttempt] = useState(true);
  const piBoxReference = useRef([]);

  const resetDigits = () => {
    let newArr = [...digits];
    for(let i = 0; i < numberOfDigits; i++){
      newArr[i] = "";
    }
    setDigits(newArr);
    piBoxReference.current[0].focus();
  }

  function handleChange(value, index) {

    setPiCorrect(null);
    if(value === correctPi[index + pi_index]){
      let newArr = [...digits];
      newArr[index] = value;
      setDigits(newArr);
      setPiError(null);

      if(value && index < numberOfDigits-1){
        piBoxReference.current[index + 1].focus();
      }

      if( (index + 1) % 6 === 0){

        // Update knownDigits string
        if(pi_index === 0){
          piString = '3.14159';
          setKnownDigits(piString);
        }else{
          for(let i = pi_index; i <= pi_index+5; i++){
            piString = piString + correctPi[i];
          }
          setKnownDigits(piString);
        }

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
        pi_index = 0;
        piString = '';
        setKnownDigits(null);
        resetDigits();
        setPiError(null);
        setAttempt(true);
      }
    }
  }

  useEffect(() => {
    if(digits.join("") === ""){
      setPiError(null);
    }
  }, [digits]);

  return (
    <article className="w-1/2">
      <p className="text-2xl text-center font-medium text-white mt-12">pi memorizer</p>
      <p className="text-base text-white mt-6 mb-4">Digits of pi you know:</p>

      <p className="text-base text-black mt-4 bg-[#cbd6cd] p-4 rounded-md">{knownDigits}</p>
      
      <p className="text-base text-white mt-6 mb-4">Enter digits of pi:</p>
     
     <div className='flex items-center gap-4'>
      {digits.map((digit, index)=>(
        <input key={index} value={digit} maxLength={1}  
        onChange={(e)=> handleChange(e.target.value, index)}
        ref={(reference) => (piBoxReference.current[index] = reference)}
        className={`border w-20 h-auto text-white p-3 rounded-md block bg-[#022e13] focus:border-2 focus:outline-none appearance-none`}
        />
      ))}

     </div>
      
     <p className={`text-lg text-white mt-4 ${piCorrect ? 'correct-show' : ''}`}>{piCorrect}</p>
      <p className={`text-lg text-white mt-4 ${piError ? 'error-show' : ''}`}>{piError}</p>
    </article>
  );
}

export default DigitInput;
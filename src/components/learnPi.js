import React from 'react'
import {useLocation} from "react-router-dom";

function LearnPi(){
  const {state} = useLocation();
  const { piIndexState } = state;

  return(
    <div>
      <p> Time to learn pi!</p>
      <p>{piIndexState}</p>
    </div>
  )
}

export default LearnPi





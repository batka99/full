import firebase from "../firebase/firebase"
import axios from "axios";
import { Link } from "react-router-dom";

import React, {useState, useEffect} from 'react'

const Test = () => {
    const [token, setToken] = useState()
    const [url, setUrl] = useState()
    const [image, setImage] = useState()
    const [seconds, setSeconds] = useState(0);
    const x = 0


  useEffect(() => {
    const interval = setInterval(() => {
     
      
      
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  console.log(seconds)

  return (
    <div>
        {/* <button onClick={on}>on</button>
        <button onClick={invoice}>off</button>
        <p>{token}</p>
        <img    src={`data:image/png;base64,${image}`}/>
        <a href={url}>darna uu</a> */}
   
        
     
  
        </div>
  )
}

export default Test












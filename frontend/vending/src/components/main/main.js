import Category from "../category/category"
import Product from "../product/product"
import Navbar from "../navbar/navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faThinFaHammer,
  faHammer
} from "@fortawesome/free-solid-svg-icons";

import main from './main.css'
import React, {useEffect, useState, useContext} from "react";
import 'react-multi-carousel/lib/styles.css';
import UserContext from "../context/userContext";
import { getDatabase, ref, set, update, get, child, onValue,} from "firebase/database";






function Main() {
    const userCtx = useContext(UserContext);
    const db = getDatabase();
    const [serviceValue, setServiceValue] = useState([]);

    useEffect (()=> {
        const refUrl = ref(db, `data/${userCtx.state.userId}/configuration/service`)
        onValue(refUrl, (snapshot) => {
        const data = snapshot.val();
        setServiceValue(data);
      
    });
    },[])

    return ( 
    <div> 
        {serviceValue.status? <>
        <div className="container">
             <div className="col-12 d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 rounded">
                <FontAwesomeIcon 
                icon={faHammer}
                className="mr-2 ml-2 fa-thin"
                size="3x" />
                <h5 className='ml-2 mr-2 mt-4' > {serviceValue.statusText}</h5>

            </div>
          </div>
        </div>
            </>: <>
        <Navbar/>
        <Product/>
        </>}
    
    </div> );
}

export default Main;
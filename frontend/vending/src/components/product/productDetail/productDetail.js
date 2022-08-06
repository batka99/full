import React, {useEffect, useState, Component} from "react";
import axios from 'axios'
import {useParams} from "react-router-dom"
import { SpinnerRoundFilled } from 'spinners-react';





export default function ProductDetail() {
    const {productId} = useParams()
    const [backendData, setBackendData] = useState([])
    const [spinner, setSpinner]= useState(false)

    useEffect(() => {
        setSpinner(true)
        axios({ 
            method: 'get',
            url: '/api/v1/product',
          })
            .then(function (response) {
                const data = response.data.data[productId]
                setBackendData(data)
               
            });

            setSpinner(false)
      }, []);



  return (
    <div>
        {spinner? <SpinnerRoundFilled size={100}  />: <><h1>{backendData.name}</h1>
        <h5>{backendData.description}</h5>
        <h5>{backendData.avaragePrice}</h5></>}
        
        </div>
 
  )
}















// export default function ProductDetail() {



    






//   return (
//     <div> {data ? data.map((element, index) =>(<div>good</div>)):""}</div>
//   )
// }

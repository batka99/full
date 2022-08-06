import React, {useEffect, useState, Component} from "react";
import axios from "axios";
import {Navigate, Link, useParams} from "react-router-dom"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import undaa from '../../image/undaa.jpg'
import { SpinnerRoundFilled } from 'spinners-react';
import firebase  from "../firebase/firebase";
import { getDatabase, ref, set, get, child, onValue, update } from "firebase/database";






function Cart() {
    const [check, setCheck]= useState(true)
    const {productId} = useParams()
    const [backendData, setBackendData] = useState([])
    const [spinner, setSpinner]= useState(false)
    const [home, setHome]= useState()
    

    useEffect(() => {
        setSpinner(true)

        const db = getDatabase();
        const refUrl = ref(db, `data/user/product/${productId}`)
        
        onValue(refUrl, (snapshot) => {
          const data = snapshot.val();
          setBackendData(data)
       
        });





        // axios({ 
        //     method: 'get',
        //     url: `/api/v1/product/${productId}`,
        //   })
        //     .then(function (response) {
        //         const data = response.data.data
        //         setBackendData(data)
        //     });
        //     try{
        //         const db = getDatabase();
        //         const refUrl = ref(db, 'data/user/check')
        //         onValue(refUrl, (snapshot) => {
        //           const rtdb = snapshot.val();
        //         //   setCheck(rtdb.checked);
        //         });
        // }finally{}  

            setSpinner(false)       
      }, []);


      const UnconfirmOrder = () =>{
        const db = getDatabase();
        update(ref(db, 'data/user/check'), {
        checked: false,
        checkedPayment: false,
        })
        setHome(true)
      }

    return ( 
    <div > 
       {check? <>
        {spinner? <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <h1> <SpinnerRoundFilled size={100}  />  </h1>
    <h5>Та түр хүлээнэ үү</h5>
</div> : <><div className="container">
      <nav className="navbar navbar-light bg-light justify-content-between mt-4 bg-white">
            <Link to={`/${productId}`}>
                        <button className="btn text-white" style={{ borderRadius: "10px", background: "#DE3163" }}>Буцах</button>
            </Link>
            <CountdownCircleTimer
                    isPlaying
                    size={40}
                    strokeWidth={2}
                    duration={120}
                    colors={["#00FD25", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[100, 60, 20, 10]}
                    onComplete={() => {
                        setHome(true);
                        UnconfirmOrder();
                    }}
                    >
                    {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
        </nav>
      
        <h2 className="text-center shadow-lg p-4 mx-4 mt-4 text-white" style={{ borderRadius: "30px", background: "#DE3163" }}>Карт уншуулах</h2>
        </div>
        <div className="container mt-4" style={{maxWidth: "500px"} }>
            <div className="card" style={{borderRadius: "30px"} }>

                <div className="row align-items-center h-100 text-center">
                    <div className="col-6" >
                        <img className=" p-4" src={undaa} style={{maxWidth: "200px"} }></img>
                    </div>
                    <div className="col-6 mr-4">
                        <p>Барааны нэр: {backendData.name}</p>
                        <p>Төлөх дүн: {backendData.price}</p>
                    </div>
                </div>
            </div>

            <div className="col-12 text-center mx-4 mt-4 align-items-center">
            <h5 className="pb-4 text-center mx-4 mt-4">
                Та картаа уншуулна уу</h5>
            <SpinnerRoundFilled size={100}  />  
                </div>

        </div></>}</>:<div className="container">
        <nav className="navbar navbar-light bg-light justify-content-between ml-4 mt-4 bg-white">
            <Link to={`/${productId}`}>
                        <button className="btn text-white" style={{ borderRadius: "10px", background: "#DE3163" }}>Буцах</button>
            </Link>
            <CountdownCircleTimer
                    isPlaying
                    size={40}
                    strokeWidth={2}
                    duration={20}
                    colors={["#00FD25", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[20, 15, 10, 5]}
                    onComplete={() => {
                        setHome(true);
                        setTimeout(() => {  UnconfirmOrder() }, 3000);
                    }}
                    >
                    {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </nav>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <h1> <SpinnerRoundFilled size={100}  />  </h1>
                <h5>Та түр хүлээнэ үү</h5>
            </div>
            </div>}
            <div>{home ? <Navigate to="/"/> : ""}</div>
    </div> );
}

export default Cart;
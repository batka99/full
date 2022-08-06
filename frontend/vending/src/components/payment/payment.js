import {Link, Navigate} from "react-router-dom"
import firebase from "../firebase/firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import qr from "../../image/qqq.png"
import cart from "../../image/cart.png"
import {useParams} from "react-router-dom"
import ReactJsAlert from "reactjs-alert"
import Swal from 'sweetalert2'




import axios from "axios"
import React, {useEffect, useState, useContext} from "react";
import 'react-multi-carousel/lib/styles.css';
import drinks from '../../image/drinks.png'
import 'react-multi-carousel/lib/styles.css';
import { getDatabase, ref, set, update } from "firebase/database";
import UserContext from "../context/userContext";







function Payment() {
    const [back, setBack] = useState()
    const [home, setHome] = useState()
    const {productId} = useParams()
    const ctxUser = useContext(UserContext);
    const [status, setStatus] = useState(false);
    const [type, setType] = useState();
    const [title, setTitle] = useState();
    const [card, setcard] = useState();

    const db = getDatabase();

    const checkCard = () =>{


        Swal.fire({
          
          title: 'Уучлаарай ',
          text: 'Та Qpay ашиглан төлбөрөө төлнө үү',
          cancelButtonColor: '#28559A',
          showConfirmButton: false,
          allowOutsideClick: true,
          timer: 5000,

          showCancelButton: true,
          cancelButtonText: "Хаах",

    })}


      const checkData = () =>{ 

        update(ref(db, `data/${ctxUser.state.userId}/check`), {
          checkedPayment: true,
        });
      }



      const UnconfirmOrder = () =>{
        
        update(ref(db, `data/${ctxUser.state.userId}/check`), {
        checked: false,
        checkedPayment: false,
        })
        setHome(true)
      }

      // const payQr = () => {

      //   axios({
      //     method: 'post',
      //     url: '/api/v1/qpay',
      //     "auth": {
      //       "username": "VOLT_SYSTEM",
      //       "password": "7VAsM58u",
      //   }
          
      //   })
      //     .then(function (response) {
      //       localStorage.setItem("tokenToData", response.data.access_token)
      //     });
      // }


      

    return ( 
    <div > 
      <div className="container">

      
      <nav className="navbar navbar-light bg-light justify-content-between mt-4 bg-white">
            <div className="card" style={{borderRadius: "10px"}}>
            <Link to="/">
                        <button onClick={UnconfirmOrder} className="btn text-white m-2" style={{ borderRadius: "10px", background: "#28559A" }}>Буцах</button>
            </Link>
            </div>
            <CountdownCircleTimer
                    isPlaying
                    size={40}
                    strokeWidth={2}
                    duration={15}
                    colors={["#00FD25", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[15, 10, 5, 0]}
                    onComplete={() => {
                        setHome(true);
                        setTimeout(() => {  UnconfirmOrder() }, 3000);
                    }}
                    >
                    {({ remainingTime }) => remainingTime}
                  </CountdownCircleTimer>
        </nav>

        <div className="card mt-2"  style={{ borderRadius: "30px" }}>
        <h2 className="text-center shadow-lg p-4  text-white m-2" style={{ borderRadius: "30px", background: "#28559A" }}>Төлбөр төлөх төрлөө сонгоно уу</h2>
        </div>
    
      
      
        
        </div>
        <div className="row mx-4 row justify-content-center mt-4">
 
           <Link to="#" onClick={checkCard}  src="#" className="card shadow-lg col-12 col-md-11 col-lg-5 col-xl-5 m-4  text-center" style={{color: 'inherit', textDecoration: 'inherit' ,maxWidth: "300px", borderRadius: "30px", }}>
            <img className="" src={cart}></img>
                <h3 className="pb-4">Карт уншуулах</h3>
            </Link>

         
            <Link to={`/qr/${productId}`} onClick={checkData} className="card shadow-lg col-12 text-center m-4" style={{color: 'inherit', textDecoration: 'inherit', maxWidth: "300px", borderRadius: "30px", }}>
              
                <img className="m-4" src={qr}></img>
           
                <h3 className="pb-4">Qpay</h3>
            </Link> 
        
            <div className="container mx-4 mt-4 col-12">
            
                <h3 className="pb-4 text-center mx-4" style={{marginTop: "50px"}}>
                    Та төлбөрөө төлсний дараа таны сонгосон бараа автомат машинаас гарч ирнэ.
                </h3>

        </div>        
        </div>

        <div>{home ? <Navigate to="/"/> : ""}</div>
        
    </div> );
}

export default Payment;
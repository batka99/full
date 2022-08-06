import React, {useState} from "react"
import axios from "axios"



const QrContext = React.createContext();


export const QrStore = (props) => {
    const qpayLogin = () => {

        axios({
          method: 'post',
          url: '/api/v1/qpay',
          "auth": {
            "username": "VOLT_SYSTEM",
            "password": "7VAsM58u",
        }
        })
          .then(function (response) {
            // console.log("qpay logged in..",response)
            localStorage.setItem("tokenToData", response.data.access_token)
            localStorage.setItem("tokenToDataRefresh", response.data.refresh_token)
            localStorage.setItem("expireData", response.data.expires_in)
          });
      }

     

    const refreshQpayToken = (milliSec) =>{
      // console.log("Qpay refreshed ene test")
        axios.post('/api/v1/qpay/refreshToken',{ body: {
            tokenRefresh:localStorage.getItem("tokenToDataRefresh"),
          } }, {
             
          }).then((response)=> {
            // console.log(response)
            // console.log("Qpay refreshed")

          }).catch((error)=> {
            // console.log('Error on refreshToken');
          });

      
          setTimeout(() => {
            refreshQpayToken(36000);
          }, milliSec);
        
    }
    const checkTest = () =>{
        // console.log("testing......")
    }

    





return (
        <QrContext.Provider value={{qpayLogin, refreshQpayToken, checkTest}}>
          {props.children}
        </QrContext.Provider>
      );

}

export default QrContext;






import React, { useState, useContext } from "react";
import axios from "axios"
import QrContext from "./qpayContext";

const UserContext = React.createContext();

const initialState = {
    saving: false,
    logginIn: false,
    error: null,
    errorCode:null,
    token:null,
    userId: null,
    expireDate: null
    
}


export const UserStore = (props) => {
    const [state, setState] = useState(initialState);
    const qrCtx = useContext(QrContext);


    const loginUserSuccess = (token, userId, expiresIn, expireDate, refreshToken ) =>{
      
      
        localStorage.setItem("token", token);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expiresIn", expiresIn);
        localStorage.setItem("refreshToken", refreshToken);
        setState({
            ...state, 
            logginIn: false, 
            error:null, 
            errorCode:null, 
            token, 
            userId,
            expiresIn,
            expireDate,
            refreshToken
            });

        
            axios({
              method: 'post',
              url: 'https://merchant.qpay.mn/v2/auth/token',
              'headers': {
                'Authorization': 'Basic'
              },
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
 

    const autoRenewTokenAfterMillisec = (milliSec) => {
      // token shinechleh code
      axios.post("https://securetoken.googleapis.com/v1/token?key=AIzaSyChdS58SaxVp_1A_gR7eYqoMtuGcpuRMIo",
          {   
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem("refreshToken"),
          }
        )
        .then((result) => {
          // console.log("Token refreshed .....", result);
          const token = result.data.id_token;
          const userId = result.data.user_id;
          const expiresIn = result.data.expires_in;
          const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
          const refreshToken = result.data.refresh_token;
          loginUserSuccess(token, userId, expiresIn, expireDate, refreshToken);
        })
        .catch((err) => {
          setState({
            ...state,
            logginIn: false,
            // error: err.message,
            // errorCode: err.code,
            token: null,
            userId: null,
            expireDate: null,
          });
        });
  
      // avtomat logout
      setTimeout(() => {
        // logout
        autoRenewTokenAfterMillisec(360000);
      }, milliSec);
    };



    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expireDate");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresIn");
        setState(initialState);
      };



    const loginUser = (email, password) =>{  
        setState({...state, logginIn:true});

        const data = {
            "email":email,
            "password":password,
            returnSecureToken:true
        }


        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChdS58SaxVp_1A_gR7eYqoMtuGcpuRMIo', data)
        .then((response) => {
            const token = response.data.idToken;
            const userId = response.data.localId;
            const expiresIn = response.data.expiresIn;
            const expireDate = new Date(new Date().getTime() + expiresIn * 10000);
            const refreshToken = response.data.refreshToken;
            loginUserSuccess(token, userId, expiresIn, expireDate, refreshToken);        
          })
          .catch(function (error) {
            alert(error.message)
            setState({
                ...state,
                saving: false,
                token: null,
                userId: null,
                expiresIn: null,
                expireDate: null,
              });
          });
    }





    return (
        <UserContext.Provider value={{ state, loginUser, logOut, loginUserSuccess, autoRenewTokenAfterMillisec }}>
          {props.children}
        </UserContext.Provider>
      );


    

}
export default UserContext;
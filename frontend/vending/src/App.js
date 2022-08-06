import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import './App.css';
import Main from './components/main/main';
import Payment from './components/payment/payment';
import Cart from "./components/cart/cart";
import Qr from "./components/qr/qr";
import Test from "./components/TEST/test";
import Login from "./components/user/login";
import UserContext from "./components/context/userContext";
import serviceContext from "./components/context/serviceContext";
import ServicePage from "./components/servicePage/servicePage"
import { getDatabase, ref, set, update, get, child, onValue,} from "firebase/database";
import QrContext from "./components/context/qpayContext";

export default function App() {
  const userCtx = useContext(UserContext);
  const serviceCtx = useContext(serviceContext);
  const qrCtx = useContext(QrContext);
  const [serviceValue, setServiceValue] = useState();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiresIn = localStorage.getItem("expiresIn")
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    const qpayRefreshToken = localStorage.getItem("tokenToDataRefresh");
    const qpayExpires = new Date(localStorage.getItem("expireData"));

    

    const db = getDatabase();
                const refUrl = ref(db, `data/${userCtx.state.userId}/configuration`)
                onValue(refUrl, (snapshot) => {
                  const data = snapshot.val();
                  setServiceValue(data);
                });

   

    

    if(token){
      
      

      if (expireDate > new Date()) {
        // Hugatsaa n duusaaagui token baina, avtomat login hiine
        userCtx.loginUserSuccess(token, userId, expiresIn, expireDate, refreshToken)
        
        // Token huchingui bolohod uldej baigaa hugatsaag tootsoolj
        // Ter hugatsaanii daraa avtomataar logout hiine
        userCtx.autoRenewTokenAfterMillisec(expireDate.getTime() - new Date().getTime());
      } else {
        // Token hugatsaa n duussan bainaa, logout hiine
        // userCtx.logout();
        userCtx.autoRenewTokenAfterMillisec(3600000);
      }

   
    }

    if(qpayRefreshToken){
            qrCtx.refreshQpayToken(4000);
    }

  

      



  }, []);

 









  return (
   <Routes>
    {userCtx.state.userId ? <>
     <Route path="/" element={<Main />} />
     <Route exact path="/:productId" element={<Payment />} />
     <Route path="/cart/:productId" element={<Cart />} />
     <Route path="/qr/:productId" element={<Qr />} />
     <Route path="/test" element={<Test />} />
     <Route exact path="/login" element={<Navigate to="/" Login />} /> 
     </>:
     <>
     <Route path="/" element={<Login />} />
     <Route exact path="/login" element={<Login />} />
     </>}
      
     
   
     
     
   </Routes>

      
    
  );
}


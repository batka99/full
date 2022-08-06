import React, {useState, useEffect, useContext} from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signInWithCustomToken  } from "firebase/auth";
import axios from "axios";
import { set } from "firebase/database";
import userContext from "../context/userContext"
import QrContext from "../context/qpayContext";







function Login() {

    const ctx = useContext(userContext);
    const qrCtx = useContext(QrContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();



    const handleLogIn =()=>{
        ctx.loginUser(email, password)
    }

    const logOut =()=>{
        ctx.logOut()
    }




    
      
     
    



  
   








    return ( <div style={{backgroundColor : "#CA6F1E"}}>
   <div className="container " style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <div className="card w-50 shadow-sm border-1" >
            <div className="">
                <div  className="m-4">
                   <h2 className="text-center mb-4">Нэвтрэх</h2>
                <div className="form-group mt-2">
                    <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Нэвтрэх нэр" />
                </div>
                <div className="form-group mt-4 mb-2">
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Нууц үг" />
                </div>
                <button type="submit" className="btn btn-primary mt-2" onClick={handleLogIn} >Нэвтрэх</button>
                </div>
            </div>
        </div>
    </div>
</div> );
}

export default Login;
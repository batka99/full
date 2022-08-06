import React, { useEffect, useContext, useState } from "react";
import UserContext from "../context/userContext";
import firebase from "../firebase/firebase"
import { getDatabase, ref, set, update, get, child, onValue, orderByChild, query, equalTo, limitToFirst, startAt } from "firebase/database";


const serviceContext = React.createContext();


export const ServiceStore = (props) => {
    const ctxUser = useContext(UserContext);
    const [serviceValue, setServiceValue] = useState();


    // useEffect(() => {

    //     const db = getDatabase();
    //               const refUrl = ref(db, `data/${ctxUser.state.userId}/number`)
    //               onValue(refUrl, (snapshot) => {
    //                 const data = snapshot.val().number;
    //                 setServiceValue(data);
    //               });
  
    //   }, []);



return (
    <serviceContext.Provider value={{serviceValue}}>
        {props.children}
    </serviceContext.Provider>
    );

}



export default serviceContext
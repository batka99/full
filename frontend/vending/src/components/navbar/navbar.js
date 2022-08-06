import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import React, {useContext, useEffect, useState} from "react";
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";
import UserContext from '../context/userContext';
import { getDatabase, ref, onValue,  } from "firebase/database";








function Navbar() {
    const ctxUser = useContext(UserContext);
    const [serviceValue, setServiceValue] = useState([]);
    const [logo, setLogoImage] = useState([]);


    useEffect(() => {

        const db = getDatabase();
                  const refUrl = ref(db, `data/${ctxUser.state.userId}/configuration`)
                  onValue(refUrl, (snapshot) => {
                    const data = snapshot.val();
                    setServiceValue(data);
                    setLogoImage(data.logo)
                  });
  
      }, []);

    return (<div className="card m-4" style={{borderRadius: "30px"}}>
    <nav className="navbar navbar-dark shine shadow m-2"  style={{borderRadius: "30px"}}>
            <Link to="/" className="navbar-brand" href="#" >
                <img src={logo.logoImage} width={30} height={30} className="d-inline-block align-top mx-4"  />
                {serviceValue.brand}
            </Link>
            <div  className="text-white mx-4"  >
            <FontAwesomeIcon icon={faPhone} className="mx-2 " />
                {serviceValue.number}
            </div>
        {/* <p className='textColor mx-4'> <FontAwesomeIcon icon={faPhone} className="mx-2" /> <div className="d-inline-block align-top mx-4">{serviceValue.number}</div></p>  */}
        {/* <button onClick={ctxUser.logOut }>logout</button> */}
    </nav>   
</div>);
}

export default Navbar;
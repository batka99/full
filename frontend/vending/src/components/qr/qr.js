import React, {useContext, useEffect, useState,} from "react";
import axios from "axios";
import {Link, useParams, Navigate} from "react-router-dom"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { SpinnerRoundFilled } from 'spinners-react';
import { getDatabase, ref, set, get, child, onValue, update } from "firebase/database";
import Swal from 'sweetalert2'
import UserContext from "../context/userContext";







function Qr() {

    const [backendData, setBackendData] = useState([])
    const [invoice, setInvoice] = useState()
    const [status, setStatus] = useState(false)
    const {productId} = useParams()
    const ctxUser = useContext(UserContext)
    // const [home, setHome] = useState(Date.now());
    const [home, setHome] = useState()
    let interval;



   



    const checkPayment = (invoiced) => {

      const db = getDatabase();
      axios.post('/api/v1/qpay/checkPayment',{ body: {
          token: localStorage.getItem("tokenToData"),
          price : backendData.price,
          invoiceId : invoiced
        } }, {
        }).then((response)=> {
          // console.log(response);

          if(response.data.paid_amount){
            // console.log("yes")
            const db = getDatabase();
            update(ref(db, `data/${ctxUser.state.userId}/product/${productId}`), {
            motor: true,
            })
            set(ref(db, `data/${ctxUser.state.userId}/invoice`), {
              invoiceId: productId,
              price: backendData.price,
              name: backendData.name
              })
            clearInterval(interval)
            Swal.fire(
              
              {
                title: 'Амжилттай',
                text: 'Баярлалаа',
                icon: "success",
                timer: 6000,
                timerProgressBar: true,
              }
              
            )
          }else{
            // console.log("moe")
          }

        }).catch((error)=> {
          // console.log('Error on Authentication');
        })
  }
    

   

    const getTest = () => {
      const token = localStorage.getItem("tokenToData")
      axios.post("https://vending-merchant.com/api/v1/qpay/invoice").then((resonse) =>{console.log(resonse)})
    }

    const checkInv = ()=>{
      axios.post("https://merchant.qpay.mn/v2/invoice",
      {body: JSON.stringify(
        {
            "invoice_code": "VOLT_SYSTEM_INVOICE",
            "sender_invoice_no": "123455678",
            "invoice_receiver_code": "83",
            "sender_branch_code":"BRANCH1",
            "invoice_description": "Order No1311 200.00",
            "enable_expiry":"false",
            "allow_partial": false,
            "minimum_amount": null,
            "allow_exceed": false,
            "maximum_amount": null,
            "amount": 200,
            "callback_url": "https://bd5492c3ee85.ngrok.io/payments?payment_id=12345678",
            "sender_staff_code": "online",
            "note":null,
            "invoice_receiver_data": {
                "register": "UZ96021105",
                "name": "Ganzul",
                "email": "test@gmail.com",
                "phone": "88614450"
            },
            "lines": [
                {
                    "tax_product_code": "6401",
                    "line_description": " Order No1311 200.00 .",
                    "line_quantity": "1.00",
                    "line_unit_price": 999999,
                    "note": "-.",
                    "discounts": [
                        {
                            "discount_code": "NONE",
                            "description": " discounts",
                            "amount": 10,
                            "note": " discounts"
                        }
                    ],
                    "surcharges": [
                        {
                            "surcharge_code": "NONE",
                            "description": "Хүргэлтийн зардал",
                            "amount": 10,
                            "note": " Хүргэлт"
                        }
                    ],
                    "taxes": [
                        {
                            "tax_code": "VAT",
                            "description": "НӨАТ",
                            "amount": 0,
                            "note": " НӨАТ"
                        }
                    ]
                }
            ]
        }
 
)},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI5ZmMwOTI2Yy1jYTkxLTRlZWEtOTdjNy0zYmZiMWI0NmJmMTciLCJzZXNzaW9uX2lkIjoid2prOWljNDlJS1RCX2FiUW4xNExubks2cE1yVzNsUF8iLCJpYXQiOjE2NTk2NDE4NTEsImV4cCI6MzMxOTM3MDEwMn0.gvWmtOqI2NA3PU_DFGQrU2JZeM59CrrlYNY43VCo_0o`
    },
      }
      
      
      
      ).then((resonse) =>{console.log(resonse)})


    }


    const getInvoice = () =>{
      


      
      Swal.fire({
          
        title: 'Та түр хүлээнэ үү',
        text: "",
        cancelButtonColor: '#28559A',
        showConfirmButton: false,
        allowOutsideClick: true,
        timer: 10000,
        didOpen: () => {
          Swal.showLoading() 
        },

  })
  

      axios.post('/api/v1/qpay/invoice',{ body: {
        token:localStorage.getItem("tokenToData"),
        price : backendData.price,
      } }, {
         
      }).then((response)=> {
        console.log(response)
        console.log(response.data)
        setInvoice(response.data.invoice_id)
        Swal.fire({
          
          title: 'Qr код уншуулж',
          text: 'Төлбөрөө төлнө үү',
          imageUrl: `data:image/png;base64,${response.data.qr_image}`,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Төлсөн',
          confirmButtonColor: '#28559A',
          cancelButtonColor: "#28559A",
          showLoaderOnConfirm: `true`,
          showConfirmButton: false,
          allowOutsideClick: true,
          timer: 100000,
          timerProgressBar: true,
          showCancelButton: true,
          cancelButtonText: "Цуцлах",
          

          

          didOpen: () => {
            
              interval = setInterval(() => {
                  checkPayment(response.data.invoice_id);
                  // console.log("checking") 
                }, 6000);    
                
                
          },
          willClose: () => {
            clearInterval(interval)
          }
        })

   

        
        
        
      }).catch((error)=> {
        // console.log('Error on Authentication');
      });
    }



    const UnconfirmOrder = () =>{
      
      const db = getDatabase();
      update(ref(db, `data/${ctxUser.state.userId}/check`), {
      checked: false,
      checkedPayment: false,
      })
      
      setHome(true)
    }






      useEffect(() => {

        const db = getDatabase();
        const refUrl = ref(db, `data/${ctxUser.state.userId}/product/${productId}`)
        
        onValue(refUrl, (snapshot) => {
          const data = snapshot.val();
          setBackendData(data)
        });

    }, []);


    return ( 
    <div > 
      <div className="container">
      <nav className="navbar navbar-light bg-light justify-content-between mt-4 bg-white">
            <div className="card" style={{borderRadius: "10px"}}>
            <Link to={`/${productId}`}>
                        <button onClick={UnconfirmOrder} className="btn text-white m-2" style={{ borderRadius: "10px", background: "#28559A" }}>Буцах</button>
            </Link>
            </div>
            <CountdownCircleTimer
                    isPlaying
                    size={40}
                    strokeWidth={2}
                    duration={120}
                    colors={["#00FD25", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[100, 60, 20, 10]}
                    onComplete={() => {
                        setHome(true);
                        // setTimeout(() => {  UnconfirmOrder() }, 3000);
                    }}
                    >
                    {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
        </nav>
        <div className="card mt-2"  style={{ borderRadius: "30px",  }}>
        <h2 className="text-center shadow-lg p-4  text-white m-2" style={{ borderRadius: "30px", background: "#28559A" }}>Qr код уншуулах</h2>
        </div>
      
        </div>
        <div className="container  mt-4" style={{maxWidth: "500px"} }>
    
           <div className="card m-3 shadow-lg text-center" style={{borderRadius: "30px", } }>
                <div className="row align-items-center h-100 text-center">
                    <div className="col-6" >
                        <img className=" p-4" src={backendData.image} style={{maxWidth: "200px",borderRadius: "30px" } }></img>
                    </div>
                    <div className="card shadow-lg col-6 ml-4 card-body text-white" style={{borderRadius: "30px", backgroundColor: "#28559A"} }>
                        <p>Таны төлөх дүн: {backendData.price}</p>
                        <p>Барааны нэр: Ундаа</p>
                    </div>
                </div>
            </div>


            <div className="col-12 text-center mx-4 mt-4 align-items-center">
            <h5 className="pb-4 text-center mx-4 mt-4">
                Төлбөрийн мэдээлэл хүлээж байна.</h5>
                
                </div>
                <div className="card text-center " style={{borderRadius: "10px"}}>
                  <button  onClick={getInvoice} className="btn text-white m-2" style={{ borderRadius: "10px", background: "#28559A",  }}>Төлбөр төлөх</button>  
                </div>
                <button onClick={checkInv}>test</button>

        </div> 
        <div>{home ? <Navigate to="/"/> : ""}</div>     
    </div> );
}

export default Qr;
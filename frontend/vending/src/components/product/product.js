
import React, {useEffect, useState, useContext} from "react";
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { SpinnerRoundFilled } from 'spinners-react';
import { getDatabase, ref,onValue, orderByChild, query, equalTo } from "firebase/database";
import UserContext from "../context/userContext";
import QrContext from "../context/qpayContext";
import "./product.css"



function Product() {
    const [backendData, setBackendData] = useState()
    const [category, setCategory] = useState([])
    const [categorySettings, setCategorySettings] = useState([])
    const [spinner, setSpinner]= useState(false)
    const ctxUser = useContext(UserContext);
    const ctxQpay = useContext(QrContext);

    

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4,
          slidesToSlide: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 4
        }
      };

    useEffect(() => {

      const db = getDatabase();
                const refUrl = ref(db, `data/${ctxUser.state.userId}/product`)
                onValue(refUrl, (snapshot) => {
                  const data = snapshot.val();
                  const dataList = [];
                  for (let id in data) 
                  {dataList.push({id, ...data[id] });}
                  setBackendData(dataList);
                });

                const catUrl = ref(db, `data/${ctxUser.state.userId}/category`)
                onValue(catUrl, (snapshot) => {
                  const data = snapshot.val();
                  const categoryList = [];
                  for (let id in data) 
                  {categoryList.push({id, ...data[id] });}
                  setCategory(categoryList);
                });

                const categorySettingsUrl = ref(db, `data/${ctxUser.state.userId}/configuration`)
                onValue(categorySettingsUrl, (snapshot) => {
                  const data = snapshot.val();
                  setCategorySettings(data.category);
                });

        

                

    }, []);


      const allCategory = () => {
        setSpinner(true)
        const db = getDatabase();
        const refUrl = ref(db, `data/${ctxUser.state.userId}/product`)
                onValue(refUrl, (snapshot) => {
                  const data = snapshot.val();
                  const dataList = [];
                  for (let id in data) 
                  {dataList.push({id, ...data[id] });}
                  setBackendData(dataList);
                });
                setSpinner(false)
      }
      


      const findCategory = (categoryName) =>{
        setSpinner(true)
        const db = getDatabase();
        const refUrl = query(ref(db, `data/${ctxUser.state.userId}/product/`), orderByChild("category"), equalTo(categoryName))
                onValue(refUrl, (snapshot) => {
                  const data = snapshot.val()
                  // console.log(data)
                  const dataList = [];
                  for (let id in data) 
                  {dataList.push({id, ...data[id] });}
                  setBackendData(dataList);
                });
                setSpinner(false)
      }

    return (<>
     <div className="container">
      {categorySettings ? <>
      <h2 className='text-center mt-4'>Төрөл</h2>
        <Carousel className='mt-4 mx-4' 
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        transitionDuration={4000}
        renderDotsOutside={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        afterChange={(previousSlide, { currentSlide, onMove }) => {
          allCategory();
        }}
        >

              <div className="card m-2" style={{borderRadius: "30px"}}>
                <div onClick={allCategory} type="button" className="btn shine text-white m-2" style={{borderRadius: "30px"}}>Бүгд</div>
              </div>
              {category ? category.map((element, index) =>(
              
              <div className="card m-2" style={{borderRadius: "30px"}}>
                <div key={index} onClick={e => findCategory(element.name)} className="btn shine text-white m-2" style={{borderRadius: "30px"}}>{element.name}</div>
              </div>
              
              )):""
              }
        </Carousel></>: "" }
        

    </div>

        <h2 className='text-center mt-4'>Бүтээгдэхүүн</h2>
    <div className='mx-4 mt-4 mb-4 row '>
    {spinner? <div className="d-flex justify-content-center">
      <div>
      <h5 className="text-center"></h5>
      
      <SpinnerRoundFilled size={100} className="mt-4" />
      
        </div>
      </div> : <>{backendData ? backendData.map((element, index) =>(





        <div key={index} to="payment" className='col-12 mb-4 col-sm-12 col-md-6 col-lg-3 col-xl-3'>
                <div className="card shadow-lg" style={{borderRadius: "30px"}}>
                  <Link  to={`${element.id}`} style={{borderRadius: "30px"}} className="m-2 p-1 card shadow-lg  cartTool border border-white border-0 ">
                      <img className="card-img-top imageTool border border-0" src={element.image} alt="true" />
                      <div className="card-body cartTool my-4  text-white" >
                          <h5 className="card-title">{element.name}</h5>
                          <h2>{element.price}₮</h2>
                      </div>
                  </Link>
                </div>
        </div>
        
        )):""}</>}
     </div> 
     <div className="mouse_scroll">
  <div className="mouse">
    <div className="wheel" />
  </div>
  <div>
    <span className="m_scroll_arrows unu" />
    <span className="m_scroll_arrows doi" />
    <span className="m_scroll_arrows trei" />
  </div>
</div>
       </>);
}

export default Product;
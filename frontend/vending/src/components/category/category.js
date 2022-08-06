
import axios from "axios"
import drinks from '../../image/drinks.png'
import React, {useEffect, useState} from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';




function Category() {
    const [category, setCategory] = useState([])

    useEffect (() => {
        axios({
            method: 'get',
            url: '/api/v1/categories',
          })
            .then(function (response) {
                const categoryData = response.data.data
                const categoryList = [];
                for (let id in categoryData) {
                    categoryList.push({id, ...categoryData[id] });
                  }
                  setCategory(categoryList);
            });    
      }, []);


    const notf = () => {
        alert("working")
    }

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
          items: 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 4
        }
      };
    return ( 
<>
    <di className="container">
        <h2 className='text-center'>Төрөл</h2>
        <Carousel className='mt-4 mx-4' responsive={responsive} >
            {category ? category.map((element, index) =>(<div key={index} onClick={notf} class="card mx-4 col-8 col-3 mb-4 col-sm-8 col-md-6 shadow-sm"  role="alert">
                        <p className='text-center mt-2'>{element.name}</p>
            </div>)):""
            }
        </Carousel>

    </di>
    
</> );
}

export default Category;
import Category from "../category/category"
import Product from "../product/product"
import Navbar from "../navbar/navbar"
import main from './main.css'
import React, {useEffect, useState} from "react";
import 'react-multi-carousel/lib/styles.css';






function Main() {
    return ( 
    <div> 
    <Navbar/>
    <Product/>
    </div> );
}

export default Main;
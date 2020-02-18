import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Show_product from './show_product'
import Add_product from './add_product'

export default class vendor_home extends Component {
    
    // onclick(){
    //     temp_user=JSON.parse(localStorage.getItem("ven"))
    //     console.log('fuck u')
    // }
   
    render() {
        console.log("hello")
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/vendor_home" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/show_product" className="nav-link">My Products</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/add_product" className="nav-link">Add Products</Link>
                            </li>
                            </ul>
                        </div>
                    </nav>
                    <p> Welcome Vendor </p>
                    <p><button onclick='showdetails' type='button' id='demo' >My Profile</button> </p>
                    <br/>
                    <Route path="/show_product" component={Show_product}/>
                    <Route path="/add_product" component={Add_product}/>
                </div>
            </Router>
        )
    }
}


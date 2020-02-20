import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Show_product from './show_product'
import Add_product from './add_product'
import Ready_to_dispatch from './ready_to_dispatch'
import Dispatch_list from './dispatch_products'

export default class vendor_home extends Component {
    
    showdetials(){
        // temp_user=JSON.parse(localStorage.getItem("ven"))
        console.log('fuck u')
    }
   
    render() {
        console.log("hello")
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/vendor_home/" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/vendor_home/show_product" className="nav-link">My Products</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/vendor_home/add_product" className="nav-link">Add Products</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/vendor_home/ready_to_dispatch" className="nav-link">Ready to dispatch</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/vendor_home/dispatch_list" className="nav-link">Dispatch List</Link>
                            </li>
                            </ul>
                        </div>
                    </nav>
                    <p> Welcome Vendor </p>
                    {/* <p><button onclick='showdetails' type='button' id='demo' >My Profile</button> </p> */}
                    <br/>
                    <Route path="/vendor_home/show_product" exact component={Show_product}/>
                    <Route path="/vendor_home/add_product" exact component={Add_product}/>
                    <Route path="/vendor_home/ready_to_dispatch" exact component={Ready_to_dispatch}/>
                    <Route path="/vendor_home/dispatch_list" exact component={Dispatch_list}/>
                </div>
            </Router>
        )
    }
}


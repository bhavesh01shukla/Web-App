import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class customer_home extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            product_name: '',
            products: []
        }

        this.onChangeProduct_name = this.onChangeProduct_name.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeProduct_name(event) {
        this.setState({ product_name: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newProduct = {
            product_name: this.state.product_name,
        }
        // console.log(newProduct)
        axios.post('http://localhost:4000/search-product', newProduct)
        .then(response => {
            console.log('printing response');
            console.log(response.data);
            this.setState({products: response.data.pro});
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    render() {
        console.log("hahaahahahahahaah")
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Search Product </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.product_name}
                               onChange={this.onChangeProduct_name}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                </form>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vendor name</th>
                            <th>Product Name</th>
                            <th>Total Quantity</th>
                            <th>Available Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            if(currentProduct.avail_quantity>0)
                            {
                                return (
                                    <tr>
                                        <td>{currentProduct.vendor_name}</td>
                                        <td>{currentProduct.p_name}</td>
                                        <td>{currentProduct.total_quantity}</td>
                                        <td>{currentProduct.avail_quantity}</td>
                                        <td>{currentProduct.price}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

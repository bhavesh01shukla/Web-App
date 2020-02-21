import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class customer_home extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            product_name: '',
            products: [],
            order_quantity: ''
        }
    
        this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
        this.sortByQuantityAsc = this.sortByQuantityAsc.bind(this);
    
        this.onChangeProduct_name = this.onChangeProduct_name.bind(this);
        this.onChangeOrder_quantity = this.onChangeOrder_quantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /// method1 : using prevState and return
    sortByPriceAsc() {
        this.setState(prevState => {
            return this.state.products.sort((a, b) => (a.price - b.price))
        });
    }

    /// method2: using basic method
    sortByQuantityAsc() {
        this.setState({
            products: this.state.products.sort((a, b) => (a.avail_quantity - b.avail_quantity))
        });
    }
    onChangeProduct_name(event) {
        this.setState({ product_name: event.target.value });
    }
    onChangeOrder_quantity(event) {
        this.setState({ order_quantity: event.target.value });
    }
    
    onSubmit(e) {
        e.preventDefault();

        const newProduct = {
            p_name: this.state.product_name,
        }
        console.log('printing search name')
        console.log(newProduct)
        axios.post('http://localhost:4000/search-product', newProduct)
        .then(res => {
            console.log('printing response');
            console.log(res.data);
            this.setState({products: res.data.pro});
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    place_order=(currentProduct)=>{
        this.setState({
            order_quantity: '',
        });
        var temp=JSON.parse(localStorage.getItem("cus"))
        console.log("printing cus name in place order func in cus_home.js")
        console.log(temp.username)

        //find avail quantity of pro
        //find total quantity of pro
        const neworder = {
            vendor_name: currentProduct.vendor_name,
            customer_name: currentProduct.temp_username,
            product_name: currentProduct.p_name,
            avail_quantity: currentProduct.avail_quantity,
            total_quantity: currentProduct.total_quantity,
            status: 'available'
        };
        console.log("printing avail quantity in place order cus_home.js")
        console.log(currentProduct.avail_quantity)
        console.log("printing input order quantity in place order cus_home.js")
        console.log(this.order_quantity)
        if(currentProduct.avail_quantity > this.order_quantity)
        {console.log('order may be placed')}
        // axios.post('http://localhost:4000/check-order', neworder)
        // .then(res => {
          
        //     if(res.data.pro[0].p_name===currentProduct.p_name){
        //         console.log('printing response of check-order');
        //         console.log(res.data.pro[0].p_name);
        //         console.log(res.data.pro[0].avail_quantity);

                
        //         if(res.data.pro[0].avail_quantity > this.order_quantity){
        //             console.log('order may be placed')
        //         }
        //     }
        //     else{
        //         alert('error occured')
        //     }
        //     // this.setState({products: res.data.pro});
        // })
        // .catch(function(error) {
        //     console.log(error);
        // })

    }

    render() {
        return (
            <div>
                <p>Note to customer: Only products with available quantity(greater > 0) will be displayed in search results</p>

                <br></br><br></br>
    
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Search Product </label>
                        <input type="text" className="form-control" 
                        value={this.state.product_name} onChange={this.onChangeProduct_name}/>
                    </div>
                    <div className="form-group">
                        <input type="submit"  value="Search" className="btn btn-primary"/>
                    </div>
                </form>

                <br></br><br></br>
                <div className="form-group">
                {/* onClick={()=>{this.sortByPriceAsc}} */}
                <button type="button" onClick={()=>{this.sortByPriceAsc()}} >Sort by price</button>
                <button type="button" onClick={()=>{this.sortByQuantityAsc()}} >Sort by quantity</button>
                </div>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vendor name</th>
                            <th>Product Name</th>
                            {/* <th>Total Quantity</th> */}
                            <th>Available Quantity</th>
                            <th>Price</th>
                            <th>Place Order</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {                            
                                return (
                                    <tr>
                                        <td>{currentProduct.vendor_name}</td>
                                        <td>{currentProduct.p_name}</td>
                                        {/* <td>{currentProduct.total_quantity}</td> */}
                                        <td>{currentProduct.avail_quantity}</td>
                                        <td>{currentProduct.price}</td>
                                        <td>
                                            <form onSubmit={this.onSubmit}>
                                                <div className="form-group">
                                                    <label>Quantity</label>
                                                    <input type="number" 
                                                        className="form-control" 
                                                        value={this.state.order_quantity}
                                                        onChange={this.onChangeOrder_quantity}
                                                        />
                                                </div>
                                                <div className="form-group">
                                                    <input type="submit" value="Order" onClick={()=>{this.place_order(currentProduct)}} className="btn btn-primary"/>
                                                </div>
                                            </form>
                                        </td>
                                    </tr>
                                )
                            
                        })
                    }
                    </tbody>
                </table>

                {/* <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Give Order Quantity</label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.order_quantity}
                               onChange={this.onChangeOrder_quantity}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit
                        " className="btn btn-primary"/>
                    </div>
                </form> */}
            </div>
        )
    }
}

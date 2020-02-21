import React, {Component} from 'react';
import axios from 'axios';

export default class Add_product extends Component {
    
    constructor(props) {
        super(props);
        var x=JSON.parse(localStorage.getItem("ven"))

        console.log('check once')
        console.log(x);
        console.log(x.username);

        this.state = {
            vendor_name: x.username,
            p_name: '',
            total_quantity: '',
            avail_quantity: '',
            price: '',
            status: 'available'
        }
        // this.onChangeVendor_name = this.onChangeVendor_name.bind(this);
        this.onChangeP_name = this.onChangeP_name.bind(this);
        this.onChangeTotal_quantity = this.onChangeTotal_quantity.bind(this);
        this.onChangeAvail_quantity = this.onChangeAvail_quantity.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    // onChangeVendor_name(event) {
    //     this.setState({ vendor_name: event.target.value });
    // }

    onChangeP_name(event) {
        this.setState({ p_name: event.target.value });
    }

    onChangeTotal_quantity(event) {
        this.setState({ total_quantity : event.target.value });
    }

    onChangeAvail_quantity(event) {
        this.setState({ avail_quantity : event.target.value });
    }
    onChangePrice(event) {
        this.setState({ price : event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newProduct = {
            vendor_name: this.state.vendor_name,
            p_name: this.state.p_name,
            total_quantity: this.state.total_quantity,
            avail_quantity: this.state.avail_quantity,
            price: this.state.price,
            status: this.state.status
        }
        axios.post('http://localhost:4000/add-product', newProduct)
             .then(res => {
                 console.log('checking');
                console.log(res.data.pro.vendor_name);
                if(res.data.pro.vendor_name!=null)
                    {alert("Product added");}
                else{alert("error while adding product");}
            })

        this.setState({
            // vendor_name: '',
            p_name: '',
            total_quantity: '',
            avail_quantity: '',
            price: '',
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {/* <div className="form-group">
                        <label>Vendor name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.vendor_name}
                               onChange={this.onChangeVendor_name}
                               />
                    </div> */}
                    <div className="form-group">
                        <label>Product name: </label>
                        <input type="text"
                               className="form-control" 
                               value={this.state.p_name}
                               onChange={this.onChangeP_name}
                               />  
                    </div>
                  
                    <div className="form-group">
                        <label>Total Quantity </label>
                        <input type="number"
                               className="form-control" 
                               value={this.state.total_quantity}
                               onChange={this.onChangeTotal_quantity}
                               />  
                        
                    </div>

                    <div className="form-group">
                        <label>Available Quantity </label>
                        <input type="number"
                               className="form-control" 
                               value={this.state.avail_quantity}
                               onChange={this.onChangeAvail_quantity}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Price </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

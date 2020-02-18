import React, {Component} from 'react';
import axios from 'axios';

export default class ProductsList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: []}
    }

    componentDidMount() {
        
        var temp=JSON.parse(localStorage.getItem("ven"))
        console.log('checking username')
        console.log(temp)

        const newUser = {
            vendor_name: temp.username
        };
        console.log('checking newUser')
        console.log(newUser)
        //check for get or post request
        axios.post('http://localhost:4000/show-products',newUser)
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
        return (
            <div>
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
                            return (
                                <tr>
                                    <td>{currentProduct.vendor_name}</td>
                                    <td>{currentProduct.p_name}</td>
                                    <td>{currentProduct.total_quantity}</td>
                                    <td>{currentProduct.avail_quantity}</td>
                                    <td>{currentProduct.price}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

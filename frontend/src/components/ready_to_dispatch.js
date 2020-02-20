import React, { Component } from 'react';
import axios from 'axios';

export default class Ready_to_dispatch extends Component {

    constructor(props) {
        super(props);
        this.state = { products: [] }

        // this.change_status = this.change_status.bind(this);
    }

    change_status = (currentProduct) => {
        // console.log('in change_status')
        const newPro = {
            id: currentProduct._id,
            vendor_name: currentProduct.vendor_name,
            p_name: currentProduct.p_name,
            total_quantity: currentProduct.total_quantity,
            avail_quantity: currentProduct.avail_quantity,
            price: currentProduct.price,
            status: 'dispatch'
        };
        console.log(newPro)
        axios.put('http://localhost:4000/change-product-status', newPro)
    }

    componentDidMount() {

        var temp = JSON.parse(localStorage.getItem("ven"))
        console.log('checking username')
        console.log(temp)

        const newUser = {
            vendor_name: temp.username
        };
        console.log('checking newUser')
        console.log(newUser)
        //check for get or post request
        axios.post('http://localhost:4000/ready-to-dispatch', newUser)
            .then(response => {
                console.log('printing response');
                console.log(response.data);
                this.setState({ products: response.data.pro });
            })
            .catch(function (error) {
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
                            <th>Price</th>
                            <th>Id</th>
                            <th>Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((currentProduct, i) => {
                                if(currentProduct.status==='available'){
                                    return (
                                        <tr>
                                            <td>{currentProduct.vendor_name}</td>
                                            <td>{currentProduct.p_name}</td>
                                            <td>{currentProduct.total_quantity}</td>
                                            {/* <td>{currentProduct.avail_quantity}</td> */}
                                            <td>{currentProduct.price}</td>
                                            <td>{currentProduct._id}</td>
                                            <td> <button type="button" onClick={()=>{this.change_status(currentProduct)}}>Dispatch</button> </td>
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

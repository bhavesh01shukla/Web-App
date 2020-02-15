import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            phone_no: '',
            password: '',
            type: 'Customer'
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone_no = this.onChangePhone_no.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePhone_no(event) {
        this.setState({ phone_no: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangeType(event) {
        this.setState({ type: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            phone_no: this.state.phone_no,
            password: this.state.password,
            type: this.state.type
        }
        console.log(newUser)
        axios.post('http://localhost:4000/add', newUser)
             .then(res => console.log(res.data));

        this.setState({
            username: '',
            email: '',
            phone_no: '',
            password: '',
            type: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                  
                    <div className="form-group">
                        <label>User Type </label>
                        <select className="form-control" value={this.state.type} onChange={this.onChangeType} >
                            <option value="Customer">Customer</option>
                            <option value="Vendor">Vendor</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Phone_no: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.phone_no}
                               onChange={this.onChangePhone_no}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

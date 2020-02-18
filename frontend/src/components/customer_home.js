import React, {Component} from 'react';
import axios from 'axios';

export default class vendor_home extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
        }
        // console.log(newUser)
        axios.post('http://localhost:4000/login', newUser)
             .then(res => {
                 console.log(res.data);
                 if(res.data.username == null){
                     alert("User not found");
                 }
                 else{
                     window.location('/vendor_home');
                 }
                });

        this.setState({
            username: '',
            password: '',
        });
    }

    render() {
        console.log("hello")

        return (
            <div>
                 <p> welcome customer</p>
                {/* <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form> */}
            </div>
        )
    }
}


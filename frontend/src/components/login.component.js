import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    
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
                // console.log(typeof(res.data))
                console.log(res.data);
                

                if(res.data.user == null){
                    alert("User not found");
                }
                else{
                    console.log("user found");
                    console.log("========================");
                    console.log(res.data.user.username);
                    console.log("========================");
                    console.log(res.data.user.type);
                    // window.location.href='/vendor_home';
                    if(res.data.user.type==='Vendor'){
                        console.log(res.data.user)
                        localStorage.setItem("ven",JSON.stringify(res.data.user)) 
                        window.location.href='/vendor_home/';
                    }
                    else if (res.data.user.type==='Customer'){
                        localStorage.setItem("cus",JSON.stringify(res.data.user)) 
                        window.location.href='/customer_home';
                    }
                }
            }
        )
        this.setState({
            username: '',
            password: '',
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
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

import React, {Component} from "react";
import { withCookies } from "react-cookie";


class Login extends Component {
    state = {
        credentials: {
            username: "",
            password: ""
        },
        isLoginView: true
    }

    inputChanged = event => {
        let credentials = this.state.credentials;
        credentials[event.target.name] = event.target.value;
        this.setState({credentials: credentials});
    }

    login = event => {
        if (this.state.isLoginView) {

        } else {
            
        }
        fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.credentials)
        }).then(response => response.json())
        .then(response => {
            console.log(response.token);
            this.props.cookies.set("mr-token", response.token);
            window.location.href="/movies"; // redirect
            })
        .catch(error => console.log(error))
    }

    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView})
    }
    render() {
        return <div className="login-container"> 
            <h1>
                {this.state.isLoginView ? "Login" : "Register"}
            </h1>                
             <span>Username</span><br/>
            <input type="text" name="username" value={this.state.credentials.username} 
                onChange={this.inputChanged}/><br/>
            <span>Password</span><br/>
                <input type="password" name="password" value={this.state.credentials.password} 
                    onChange={this.inputChanged}/><br/>
            <button onClick={this.login}>
                {this.state.isLoginView ? "Login": "Register"}
            </button>

            <p onClick={this.toggleView}>
            {this.state.isLoginView ? "Create Account": "back to login"}
        </p>
    </div>
    }
}

export default withCookies(Login);

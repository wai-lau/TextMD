import React, { Component } from 'react';
import $ from 'jquery';
import './Login.css';
import { withRouter} from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
        patient: {}
    }
  }

  componentWillMount(){
  }

  handleSubmit(e){
    let usr = this.refs.usr.value ;
    let pwd = this.refs.pwd.value ;
    if(usr === '') {
        alert('Please enter a username');
    } else if (pwd === '') {
        alert('Please enter a password');
    } else {
        if (usr === "Kevin" && pwd === "Fred") {
            localStorage.setItem("token", "ONEOKPPAP");
            this.props.history.push({
                pathname: '/'
            })
        } else {

        }
    }
    e.preventDefault();
    
   }

   handleRegister() {
   }

  render() {
    return (
<div className="Login">
    <div className="container">
        <div className="row">
        <header className="Login-header">
          <h1 className="Login-title">Login: </h1>
          <h2>Doctors Only!</h2>
        </header>
        </div>
        <hr />

        <div className="row">
            
        <div className="panel panel-primary">
                <div className="panel-heading loginPageHeader">
                     <h4>Details</h4>
                </div>
                <div className="panel-body login-body">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" ref="usr" />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" ref="pwd" />
                    </div>
                    <div>
                        <div className="btn-group">
                        <button className="btn btn-success" id="login-submit">Submit</button>
                        <button className="btn btn-primary" onClick={this.handleRegister.bind(this)}>Apply for an Account</button>
                        </div>
                
                    </div>
                </form>
            </div>
            </div>     
        </div>        
    </div>   
</div>
    );
  }
}

export default withRouter(Login);

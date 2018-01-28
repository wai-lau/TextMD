import React, { Component } from 'react';
import $ from 'jquery';
import './PatientPage.css';
import { withRouter} from 'react-router-dom';

class PatientPage extends Component {
  constructor() {
    super();
    this.state = {
        patient: {}
    }
  }

  componentWillMount(){
    if (this.props.location.state) {
        this.setState({patient: 
            {
                id: this.props.location.state.id,
                name: this.props.location.state.name,
                age: this.props.location.state.age,
                sex: this.props.location.state.sex,
                category: this.props.location.state.category,
                description: this.props.location.state.description,
            }
        });
        
    }
  }

  componentDidMount() {
    console.log(this.state);
  }

  handleSubmit(e){
    if(this.refs.response.value === '') {
        alert('A response is required');
    } else {
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: 'http://localhost:8080/response',
            cache: false,
            data: '{"response": "' + this.refs.response.value.replace(/\s/g,' ') + '", "id" : "' + this.state.patient.id + '"}',
            success: function(data){
                console.log(data);
                this.props.history.push({
                    pathname: '/',
                    state: {
                      id: this.state.patient.id,
                      response: this.refs.response.value
                    }
                })
            }.bind(this),
            error: function(xhr, status, err){
              console.error(err);
            }
          });
        
    }
    e.preventDefault();
    
   }

   handleCancel(e) {
    this.props.history.push({
      pathname: '/'
    });
   }


  render() {
    return (
      <div className="PatientPage">
      <div className="container">
        <div className="row">
        <header className="Patient-header">
          <h1 className="Patient-title">Patient Page: </h1>
          <h2>{this.state.patient.name}</h2>
        </header>
        </div>
        <hr />
        <div className="row">
          <div className="panel panel-primary">
            <div className="panel-heading patientPageHeader">
              <h4>Details</h4>
            </div>
            <div className="panel-body">
            <dl className="row">
                <dt className="col-sm-3">Age: </dt>
                <dd className="col-sm-9">{this.state.patient.age}</dd>
                <dt className="col-sm-3">Sex: </dt>
                <dd className="col-sm-9">{this.state.patient.sex}</dd>
                <dt className="col-sm-3">Phone Number: </dt>
                <dd className="col-sm-9">{this.state.patient.id}</dd>
                <dt className="col-sm-3">Category: </dt>
                <dd className="col-sm-9">{this.state.patient.category}</dd>
                <dt className="col-sm-3">Description: </dt>
                <dd className="col-sm-9">{this.state.patient.description}</dd>
            </dl>
            
                <div className="form-group">
                    <label>Response:</label>
                    <textarea className="form-control" rows="5" id="response" ref="response"></textarea>
                </div>
                <div className="btn-group">
                    <button className="btn btn-danger" id="cancel" onClick={this.handleCancel.bind(this)}>Cancel</button>
                    <button className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Submit</button>
                </div>
            
            </div>
          </div>    
        </div>
      </div>

      </div>
    );
  }
}

export default withRouter(PatientPage);

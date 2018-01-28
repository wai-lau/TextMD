import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import './PatientPage.css';

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
            </div>
          </div>    
        </div>
      </div>

      </div>
    );
  }
}

export default PatientPage;

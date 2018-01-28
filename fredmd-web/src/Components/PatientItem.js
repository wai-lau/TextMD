import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class PatientItem extends Component {
    constructor(props) {
        super(props);
    }
    
    goToPage(){
        // console.log(this.props.patient);
        this.props.history.push({
            pathname: '/patient',
            state: {
              id: this.props.patient.id,
              name: this.props.patient.name,
              age: this.props.patient.age,
              sex: this.props.patient.sex,
              category: this.props.patient.category,
              description: this.props.patient.description,
            }
        })
    }
    render() {
        return (
            <tr className="Patient">
                <td><strong>{this.props.patient.name}</strong></td>
                <td>{this.props.patient.description}</td>
                <td><button onClick={this.goToPage.bind(this)} className="btn btn-success">Respond</button></td>
            </tr>
        );
    }
}

export default withRouter(PatientItem);
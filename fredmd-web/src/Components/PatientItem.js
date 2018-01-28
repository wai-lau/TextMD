import React, { Component } from 'react';

class PatientItem extends Component {

    render() {
        return (
            <li className="Patient">
                <strong>{this.props.patient.name}</strong>: {this.props.patient.category}
            </li>
        );
    }
}

export default PatientItem;
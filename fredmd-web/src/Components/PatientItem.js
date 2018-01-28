import React, { Component } from 'react';

class PatientItem extends Component {

    render() {
        return (
            <tr className="Patient">
                <td><strong>{this.props.patient.name}</strong></td>
                <td>{this.props.patient.category}</td>
                <td><button className="btn btn-success">Respond</button></td>
            </tr>
        );
    }
}

export default PatientItem;
import React, { Component } from 'react';
import PatientItem from './PatientItem';

class Patients extends Component {

    render() {
        let patientItems;
        if(this.props.patients) {
            patientItems = this.props.patients.map(patient => {
                return (
                    <PatientItem key={patient.id} patient={patient} />
                );
            });
        }
        return (
            <div className="Patients">
                <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {patientItems}
                </tbody>
                </table>
            </div>
        );
    }
}

export default Patients;
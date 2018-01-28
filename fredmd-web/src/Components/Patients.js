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
                {patientItems}
            </div>
        );
    }
}

export default Patients;
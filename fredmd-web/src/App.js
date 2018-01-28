import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Patients from './Components/Patients';
import uuid from 'uuid';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
    }
  }

  getPatients() {
    this.setState({patients: [
      {
        id: uuid.v4(),
        name: "Kevin",
        age: 22,
        sex: "Male",
        category: "Healthy"
      },
      {
        id: uuid.v4(),
        name: "Wai Lun",
        age: 22,
        sex: "Male",
        category: "Cold"
      },
      {
        id: uuid.v4(),
        name: "Fredric",
        age: 22,
        sex: "Male",
        category: "Undefined"
      }
    ]});
  }

  componentWillMount(){
    this.getPatients();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
      <Grid>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TextMD</h1>
        </header>
        <Row>
          <Col md={6}>
            <Patients patients={this.state.patients} />
          </Col>
          <Col md={6}>
            <p>Test</p>
          </Col>
        </Row>
      </Grid>
      </div>
    );
  }
}

export default App;

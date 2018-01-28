import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Patients from './Components/Patients';
import uuid from 'uuid';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
      title: "Patients",
      categoryList: ["Cardio", "Eye", "Muscle"]
    }
  }

  getPatients() {
    this.setState({patients: [
      {
        id: uuid.v4(),
        name: "Kevin",
        age: 22,
        sex: "Male",
        category: "Healthy",
        description: "React, and the overall everything guy also i am a god"
      },
      {
        id: uuid.v4(),
        name: "Wai Lun",
        age: 22,
        sex: "Male",
        category: "Cold",
        description: "Docker"
      },
      {
        id: uuid.v4(),
        name: "Fredric",
        age: 22,
        sex: "Male",
        category: "Undefined",
        description: "Watson"
      }
    ]});
  }

  componentWillMount(){
    this.getPatients();
    console.log(this.state.categoryList[0]);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
      console.log(this.props.location.state)
      if (this.props.location.state) {
        let patients = this.state.patients;
        let idToDelete = this.props.location.state.id;
        let index = patients.findIndex(x => x.id === idToDelete);
        patients.splice(index, 1);
        this.setState({patients: patients});
      }
    }
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:8080/test',
      cache: false,
      success: function(data){
          console.log(data);
      },
      error: function(xhr, status, err){
        console.error(err);
      }
    });
  }

  handleCatChange(e) {
    console.log(e.target.value);
  }

  render() {
    let categories = this.state.categoryList.map(category => {
      // console.log(category);
      return (
          <option key={category}>{category}</option>
      );
    });
    return (
      <div className="App">
      <div className="container">
        <div className="row">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TextMD: Intelligent Texting for Doctors of the Future</h1>
        </header>
        </div>
        <hr />
        <div className="row">
          <div className="panel panel-primary">
            <div className="panel-heading patientHeader">
              <h4>{this.state.title}</h4>
              <div className="input-group">
                <label>Select category:</label>
                <select className="form-control" id="category" onChange={this.handleCatChange.bind(this)}>
                  {categories}
                </select>
              </div>
            </div>
            <div className="panel-body">
            <Patients patients={this.state.patients} />
            </div>
          </div>    
        </div>
      </div>

      </div>
    );
  }
}

export default App;

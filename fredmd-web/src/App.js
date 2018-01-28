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
      patients: [
        {
          id: uuid.v4(),
          name: "Kevin",
          age: 22,
          sex: "Male",
          category: "Healthy",
          description: "React"
        }
      ],
      title: "Patients",
      categoryList: ["cardio"],
      categoryListCap: ["Cardio"]
    }
  }

  getCategories() {
    $.ajax({
      url: 'http://localhost:8080/categories',
      cache: false,
      success: function(data){
          console.log(data);
          data = JSON.parse(data);
          let categories = [];
          let categoriesCap = [];
          for (let c in data) {
            categories.push(data[c]);
            let temp = data[c].charAt(0).toUpperCase() + data[c].substr(1);
            categoriesCap.push(temp);
          }
          this.setState({categoryList: categories, categoryListCap: categoriesCap });
          this.getPatients();
      }.bind(this),
      error: function(xhr, status, err){
        console.error(err);
      }
    });
  }

  findCategory(c) {
    let ind1 = this.state.categoryListCap.findIndex(x => x === c);
    return this.state.categoryList[ind1];
  }

  getPatients() {
    let url = 'http://localhost:8080/patients/' + this.state.categoryList[0];
    $.ajax({
      url: url,
      cache: false,
      success: function(data){
          console.log(data);
          data = JSON.parse(data);
          let patients = [];
          for (let p in data) {
            let person = data[p];
            let toAdd = {
              id: p,
              name: person.user_info.name,
              age: person.user_info.age,
              sex: person.user_info.sex,
              category: person.category,
              description: person.description
            }
            patients.push(toAdd);
          }
          this.setState({patients: patients })
      }.bind(this),
      error: function(xhr, status, err){
        console.error(err);
      }
    });
  }

  checkLogin() {
    if (localStorage.getItem("token") !== "ONEOKPPAP") {
      this.props.history.push({
        pathname: '/login'
      })
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.props.history.push({
        pathname: '/login'
    });
    
  }

  componentWillMount(){
    this.getCategories();
  }

  componentDidMount() {
    this.checkLogin();
  }

  handleCatChange(e) {
    console.log(e.target.value);
    let url = 'http://localhost:8080/patients/' + this.findCategory(e.target.value);
    $.ajax({
      url: url,
      cache: false,
      success: function(data){
          console.log(data);
          data = JSON.parse(data);
          let patients = [];
          for (let p in data) {
            let person = data[p];
            let toAdd = {
              id: p,
              name: person.user_info.name,
              age: person.user_info.age,
              sex: person.user_info.sex,
              category: person.category,
              description: person.description,
            }
            patients.push(toAdd);
          }
          this.setState({patients: patients })
      }.bind(this),
      error: function(xhr, status, err){
        console.error(err);
      }
    });
  }
  render() {
    let categories = this.state.categoryListCap.map(category => {
      // console.log(category);
      return (
          <option key={category} value={category}>{category}</option>
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
        <div className="row">
        <button className="btn btn-danger" onClick={this.logout.bind(this)}>Logout</button>
        </div>

      </div>

      </div>
    );
  }
}

export default App;

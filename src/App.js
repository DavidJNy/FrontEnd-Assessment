import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MDBInput, MDBCol } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function App() {

  const [student, setStudent] = useState([]);
  const [avgScore, setAvgScore] = useState([]);
  const [entry, setEntry] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setStudent(data.students);
        setFilteredResults(data.students)
      })
        .catch((err) => {
          console.log(err.message);
        })
      }, []);
      
      
      // let grad = student
      // const finalScore = [];
      // for (let i = 0; i < grad.length; i++) {
      //   let listGrades = grad[i].grades;
      //   let numberArray = listGrades.map(Number);
      //   const sum = numberArray.reduce((a, b) => a + b, 0);
      //   const finalAvg = (sum / numberArray.length) || 0;
      //   finalScore.push(finalAvg);
      //   setAvgScore(finalScore);
  // useEffect(() => {
  //   let grad = student
  //   function Average(grad) {

  //     }
  //   }
  // }, []);
    
  
    const filterName = (searchName) => {
    setEntry(searchName);
    setFilteredResults(student)
    const filteredData = student.filter((item) => {
      let tempfullname = item.firstName.concat(" ", item.lastName);
      return tempfullname.toLowerCase().includes(entry.toLowerCase())
    })
    setFilteredResults(filteredData)
    console.log(filteredResults)
  }



  return (
    <div id="body">
      <div class="container w-50 p-3 border-bottom">
        <MDBCol md="12">
          <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={(event) => { filterName(event.target.value) }} />
        </MDBCol>
      </div>
      <div>
        {filteredResults.map((dude) => (
          <div class='container w-50 p-3 border-bottom' key={dude.id}>
            <div class="row pl-5">
              <img class="" alt="" id="image" src={dude.pic}></img>
              <div class="col">
                <h1>{dude.firstName + " " + dude.lastName}</h1>
                <div class="container">
                  <div>Email: {dude.email}</div>
                  <div>Company: {dude.company}</div>
                  <div>Skill: {dude.skill}</div>
                  <div>Average: {avgScore}%</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MDBInput, MDBCol } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function App() {

  const [student, setStudent] = useState([]);
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
         
  const calScore = (listofgrades) => {
    let numbArray = listofgrades.map(Number)
    const sum = numbArray.reduce((a, b) => a + b, 0);
    const finalAvg = (sum / numbArray.length) || 0;
    return finalAvg;
  }

  useEffect(() => {
    console.log(entry)
      const filteredData = student.filter((item) => {
        let tempfullname = item.firstName.concat(" ", item.lastName);
        return tempfullname.toLowerCase().includes(entry.toLowerCase())
      })
      setFilteredResults(filteredData)
      console.log(filteredResults)
    }, [entry])

  return (
    <div id="body">
      <div class="container w-50 p-3 border-bottom">
        <MDBCol md="12">
          <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={(event) => {setEntry(event.target.value)}} />
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
                  <div>Average: {calScore(dude.grades)}%</div>
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


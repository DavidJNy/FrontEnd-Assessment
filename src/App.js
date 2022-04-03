import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MDBInput, MDBCol } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

function App() {
  
  const [student, setStudent] = useState([]);
  const [entry, setEntry] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  //Fetching data
  useEffect(() => {
    fetch('https://api.hatchways.io/assessment/students')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setStudent(data.students);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);
  
//Adding two keys to the JSONs (display & tag)
  student.forEach((poo) => {
    poo.display = false;
    poo.tag = "";
    })

// Calculating the Average of the scores
  const calScore = (listofgrades) => {
    let numbArray = listofgrades.map(Number)
    const sum = numbArray.reduce((a, b) => a + b, 0);
    const finalAvg = (sum / numbArray.length) || 0;
    return finalAvg;
  }

//Filtering what student to display in the searchbar
  useEffect(() => {
    const filteredData = student.filter((item) => {
      let tempfullname = item.firstName.concat(' ', item.lastName);
      return tempfullname.toLowerCase().includes(entry.toLowerCase())
    })
    setFilteredResults(filteredData)
  }, [entry, student])

//Toggling the grade view in each student


  function plusOrMinus(fauxIndex) {
    filteredResults[fauxIndex].display = !filteredResults[fauxIndex].display
    console.log(filteredResults[fauxIndex])
  };

//Converting the string of grades into numbers
  function listOfGrades(listOfResults) {
    let result = listOfResults.map(Number);
    return (
      result.map((poo, index) => <div key={index}>Test {index + 1} : {poo}</div>)
    )
  }
  
  
  return (
    <div id='body'>
      <div class="container w-50 p-3 border-bottom">
        <MDBCol md='12'>
          <MDBInput hint='Search' type='text' containerClass='mt-0' onChange={(event) => { setEntry(event.target.value) }} />
        </MDBCol>
        <div>
          {filteredResults.map((dude, index) => (
            <div class="container-fluid w-100 border-bottom d-flex flex-row" id='card' key={dude.id}>
              <div class='d-flex justify-content-start'>
                <img alt='' id='image' src={dude.pic}></img>
              </div>
              <div class='flex-fill justify-content-center'>
                <h1>{dude.firstName + ' ' + dude.lastName}</h1>
                <div class='pl-3'>
                  <div>Email: {dude.email}</div>
                  <div>Company: {dude.company}</div>
                  <div>Skill: {dude.skill}</div>
                  <div>Average: {calScore(dude.grades)}%</div>
                  <div class=''>
                      {dude.display ? listOfGrades(dude.grades) : null }
                  </div>
                </div>
              </div>
              <button class='btn btn-primary align-self-start justify-content-end' onClick={() => plusOrMinus(index)} type="button" data-toggle="button" aria-pressed="false" autoComplete="off" >+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
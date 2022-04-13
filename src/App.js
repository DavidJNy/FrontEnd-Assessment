import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MDBInput, MDBCol } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { produce } from "immer";


function App() {

  const [student, setStudent] = useState([]);
  const [entry, setEntry] = useState('');
  const [searchTagEntry, setSearchTagEntry] = useState('');

  //Fetching data on on first load
  useEffect(() => {
    fetch('https://api.hatchways.io/assessment/students')
      .then(response => {
        return response.json();
      })
      .then(data => {
        //Adding two keys to the JSONs (display & tag) Rendering only on first load.
        let addData = data.students
        addData.forEach((poo) => {
          poo.display = false;
          poo.tag = [];
        })
        setStudent(addData);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  // Calculating the Average of the scores
  function calScore (listOfGrades) {
    let numbArray = listOfGrades.map(Number)
    const sum = numbArray.reduce((a, b) => a + b, 0);
    const finalAvg = (sum / numbArray.length) || 0;
    return finalAvg;
  }

  //Toggling the grade view in each student using immer npm package
  function plusOrMinus(id) {
    setStudent(produce(student, draft => {
      draft[id].display = !draft[id].display
    }))
  }
  
  //Filtering what student to display in the searchbar AND TAG!! Combine the search results of tag and search bar to be the return data
  const filteredData = student.filter((item) => {
    let tempFullName = item.firstName.concat(' ', item.lastName);
    let listOfTag = item.tag
    return (
      listOfTag.join(" ").toLowerCase().includes(searchTagEntry.toLowerCase()) &&
      tempFullName.toLowerCase().includes(entry.toLowerCase())
    )
  })
  
  //Displaying a list of grades.
  function listOfGrades(listOfResults) {
    let result = listOfResults.map(Number);
    return (
      result.map((poo, index) => <div key={index}>Test {index + 1} : {poo} %</div>)
      )
  }       
  
  //Displaying a list of tags.
  function tagComp(AllTheTags) {
    if (AllTheTags === []) return null
    return (AllTheTags.map((draftTag, index) => (
      <div class="d-inline-flex p-2" key={index}>
        {draftTag}
      </div>
    )))
  }
  
  //Adding the tag to the student
  function addTag(e, index) {
    if (e.key === 'Enter') {
      e.preventDefault();
      let newTag = e.target.value;
      setStudent(produce(student,draft => {
        let obj = draft.find(o => o.id === index)
        let arrayOfTags = obj.tag
        arrayOfTags.push(newTag)
      }))
      let stringOfIndex = index.toString();
      let tarElment = document.getElementById(stringOfIndex);
      console.log(tarElment)
      tarElment.value = " "
      //MDBinput component didn't allow me to change it so i just put generic input html
    }
  }
  
  return (
    <div id='body'>
      <div class="container w-50 p-3 border-bottom">
        <form class='d-flex flex-column'>
          <input class='p-2 ' placeholder='Search by name' type='text' containerClass='mt-0' onChange={(event) => { setEntry(event.target.value) }} ></input>
          <input class='p-2 ' placeholder='Search by tag' type='text' containerClass='mt-0' onChange={(event) => { setSearchTagEntry(event.target.value) }} ></input>
        </form>
        {/* <MDBCol md='12'>
          <MDBInput hint='Search by name' type='text' containerClass='mt-0' onChange={(event)  => { setEntry(event.target.value) }} />
        </MDBCol>
        <MDBCol md='12'>
          <MDBInput hint='Search by tag' type='text' containerClass='mt-0' onChange={(event) => { setSearchTagEntry(event.target.value) }} />
        </MDBCol> */}
        <div>
          {filteredData.map((dude, index) => (
            <div class="container-fluid w-100 border-bottom d-flex flex-row" id='card' key={dude.id}> {/*A scrollbar should be added here but can't find the one you used in the demo */}
              <div class='d-flex justify-content-start'>
                <img alt='' id='image' src={dude.pic}></img>
              </div>
              <div class='flex-grow-1 justify-content-center'>
                <h1>{dude.firstName + ' ' + dude.lastName}</h1>
                <div class='pl-3'>
                  <div>Email: {dude.email}</div>
                  <div>Company: {dude.company}</div>
                  <div>Skill: {dude.skill}</div>
                  <div>Average: {calScore(dude.grades)}%</div>
                  {dude.display ? listOfGrades(dude.grades) : null}       {/* this would be a nice to send to another component*/}
                  {tagComp(dude.tag)}
                  <form>
                    <input class='p-2' placeholder='Add Tag' type='text' autoComplete="off" containerClass='mt-0' onKeyDown={(event) => (addTag(event, dude.id))} id={dude.id}></input>
                    {/* <MDBCol md='6'>
                      <MDBInput hint='Add Tag' type='text' autoComplete="off" containerClass='mt-0' onKeyDown={(event) => (addTag(event, dude.id))} id={dude.id}/>       
                    </MDBCol> */}
                  </form>
                </div>
              </div>
              <button class='font-weight-bold display-3 align-self-start justify-content-end' onClick={() => plusOrMinus(index)}>{dude.display ? "-" : "+" }</button>
              {/* Sorry. Can't find out how to make my button look like your button. lol*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
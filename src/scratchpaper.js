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
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        fetch('https://api.hatchways.io/assessment/students')
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
        const filteredData = student.filter((item) => {
            let tempfullname = item.firstName.concat(' ', item.lastName);
            return tempfullname.toLowerCase().includes(entry.toLowerCase())
        })
        setFilteredResults(filteredData)
    }, [entry, student])


    function plusOrMinus(poop) {
        console.log('hi')
    }

    function listofgrades(listofresults) {
        let result = listofresults.map(Number);
        return (
            result.map((poo, index) => <div>Test {index + 1} : {poo}</div>)
        )
    }

    return (
        <div id='body'>
            <div class="container w-50 p-3 border-bottom">
                <MDBCol md='12'>
                    <MDBInput hint='Search' type='text' containerClass='mt-0' onChange={(event) => { setEntry(event.target.value) }} />
                </MDBCol>
                <div>
                    {filteredResults.map((deets) => (
                        <div class="container-fluid w-100 border-bottom d-flex flex-row" id='card' key={deets.id}>
                            <div class='d-flex justify-content-start'>
                                <img alt='' id='image' src={deets.pic}></img>
                            </div>
                            <div class='flex-fill justify-content-center'>
                                <h1>{deets.firstName + ' ' + deets.lastName}</h1>
                                <div class='pl-3'>
                                    <div>Email: {deets.email}</div>
                                    <div>Company: {deets.company}</div>
                                    <div>Skill: {deets.skill}</div>
                                    <div>Average: {calScore(deets.grades)}%</div>
                                    <div>
                                        {listofgrades(deets.grades)}
                                    </div>
                                </div>
                            </div>
                            <button class='align-self-start justify-content-end' onClick={plusOrMinus} type="button" >+</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_toggle_hide_show


{/* <div>
    {arrayOfDetails.map((deets, index) => (
        <div>
            <h1>{deets.firstName + ' ' + deets.lastName}</h1>
            <div>
                <div id={index}>
                    {listOfGrades(deets.grades)}
                </div>
            </div>
            <button type="button" data-toggle="button" aria-pressed="false" autoComplete="off">+</button>
        </div>
    ))}
</div> */}
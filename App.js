import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [fathname, setFathName] = useState('');
  const [cnic, setCnic] = useState('');
  const [gender, setGender] = useState('');
  const [stdlist, setStdList] = useState([]);

  const [newfname, setNewFName] = useState('');
  const [newlname, setNewLName] = useState('');
  const [newfathname, setNewFathName] = useState('');
  const [newcnic, setNewCnic] = useState('');
  const [newgender, setNewGender] = useState('');


  const addStd = () => {
    Axios.post('http://localhost:5000/create', {
      fname: fname,
      lname: lname,
      fathname: fathname,
      cnic: cnic,
      gender: gender
    }).then(() => {
      console.log("success fully inserted");
    })
  }

  const updateStd = (id) => {
    Axios.put("http://localhost:5000/update", {
      fname: newfname,
      lname: newlname,
      fathname: newfathname,
      cnic: newcnic,
      gender: newgender,
      id: id
    }).then(
      (response) => {
        setStdList(
          stdlist.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                fname: val.fname,
                lname: val.lname,
                fathname: val.fathname,
                cnic: val.cnic,
                gender: val.gender
              }
              : val;
          })
        );
      }
    );
  };
  const deleteStd = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
      setStdList(
        stdlist.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const getStd = () => {
    Axios.get('http://localhost:5000/get').then((response) => {
      setStdList(response.data);
    })
  }

  return (
    <div>
      <div className="info">
      <label>FirstName</label>
      <input type="text" onChange={(event) => { setFName(event.target.value); }}></input>
      <label>Last Name</label>
      <input type="text" onChange={(event) => { setLName(event.target.value); }}></input>
      <label>Father Name</label>
      <input type="text" onChange={(event) => { setFathName(event.target.value); }}></input>

      <label>CNIC</label>
      <input type="text" onChange={(event) => { setCnic(event.target.value); }}></input>
      <label>Gender</label>
      <input type="text" onChange={(event) => { setGender(event.target.value); }}></input>

      <button onClick={addStd}>Add Student</button>
      <button onClick={getStd}>show students</button>
      </div>
      <div className="display">
        <table align="center" border="1" cellPadding='3' cellSpacing='3'>
          <tbody>

            <tr><th>First Name</th><th>Last Name</th><th>Father name</th><th>CNIC</th><th>Gender</th></tr>
            {stdlist.map((val, key) => {
              return (
                <>
                  <tr>
                    <td>{val.fname}</td>
                    <td>{val.lname}</td>
                    <td>{val.fathname}</td>
                    <td>{val.cnic}</td>
                    <td>{val.gender}</td>
                    <td>update action</td>
                    <td>Delete action</td>
                  </tr>
                  <tr>
                    <td><input type="text" placeholder="enter first name" onChange={(event) => { setNewFName(event.target.value); }} /></td>
                    <td><input type="text" placeholder="enter last name" onChange={(event) => { setNewLName(event.target.value); }} /></td>
                    <td><input type="text" placeholder="enter father name" onChange={(event) => { setNewFathName(event.target.value); }} /></td>
                    <td><input type="text" placeholder="enter cnic" onChange={(event) => { setNewCnic(event.target.value); }} /></td>
                    <td><input type="text" placeholder="enter gender" onChange={(event) => { setNewGender(event.target.value); }} /></td>
                    <td><button onClick={() => { updateStd(val.id); }}>{" "}Update</button></td>
                    <td><button onClick={() => { deleteStd(val.id); }}>Delete</button></td>
                  </tr>
                </>
              )

            })}



          </tbody>
        </table>
      </div>
    </div>

  )
}

export default App;

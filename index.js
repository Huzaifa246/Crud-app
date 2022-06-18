const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql'); 

app.use(express.json());

app.use(cors());


//database connection

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'huzaifa',
});

//post request

app.post('/create', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const fathname = req.body.fathname;
    const cnic = req.body.cnic;
    const gender = req.body.gender;
    
    db.query('INSERT INTO details(fname, lname, fathname,cnic,gender) VALUES (?,?,?,?,?)', [fname, lname, fathname, cnic, gender], (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("success");
        }
    });

});

// update
app.put("/update",(req,res)=>{
    const id = req.body.id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const fathname = req.body.fathname;
    const cnic = req.body.cnic;
    const gender = req.body.gender;

    db.query("UPDATE details SET fname = ?, lname = ?, fathname = ?, cnic = ?, gender = ? WHERE id= ?",
    [fname,lname,fathname,cnic,gender,id],
    (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
});

app.delete("/delete/:id", (req, res) =>{
    const id = req.params.id;
    db.query("DELETE FROM details WHERE id = ?", id, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });

//get request

app.get('/get', (req, res) => {
    db.query('SELECT * FROM details', (err,result) => {

        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.listen(5000, () => {

    console.log("server is running on port 5000");
})
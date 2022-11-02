
// Importing the packages required for the project.

const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

// Used for sending the Json Data to Node API
app.use(bodyparser.json());

// Connection String to Database
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : '', 
    database : 'aiedu',
    multipleStatements : true
});

// To check whether the connection is succeed for Failed while running the project in console.
mysqlConnection.connect((err) => {
    if(!err) {
        console.log("Db Connection Succeed");
    }
    else{
        console.log("Db connect Failed \n Error :" + JSON.stringify(err,undefined,2));
    }
});

// To Run the server with Port Number
app.listen(3000,()=> console.log("Express server is running at port no : 3000"));

// CRUD Methods
//Get all Employees
app.get('/peminjaman',(req,res)=>{
    mysqlConnection.query('SELECT * FROM peminjaman',(err,rows,fields)=>{
    if(!err) 
    res.send(rows);
    else
        console.log(err);
    
})
});

//Get the Employee Data based on Id
app.get('/peminjaman/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM peminjaman WHERE id = ?',[req.params.id],(err,rows,fields)=>{
    if(!err) 
    res.send(rows);
    else
        console.log(err);
    
})
});

//Delete the Employee Data based on Id
app.delete('/peminjaman/delete/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM peminjaman WHERE id = ?',[req.params.id],(err,rows,fields)=>{
    if(!err) 
    res.send("Data Deletion Successful");
    else
        console.log(err);
    
})
});


//Insert an Employee through the Stored Procedure
app.post('/peminjaman',(req,res)=>{
    let pem = req.body;
    var sql = "SET @id_peminjaman = ?;SET @nama_mobil = ?;SET @tanggal_peminjaman = ?;SET @tanggal_pengembalian = ?;SET @status = ?; \
              CALL AddorUpdateEmployee(@id_peminjaman,@nama_mobil,@tanggal_peminjaman,@tanggal_pengembalian,@status);"
    mysqlConnection.query(sql,[pem.id_peminjaman,pem.nama_mobil,pem.tanggal_peminjaman,pem.tanggal_pengembalian,pem.status],(err,rows,fields)=>{
    if(!err) 
    res.send("Insertion Completed");
    else
        console.log(err);
})
});

//Update an Employee through the Stored Procedure
app.put('/peminjaman',(req,res)=>{
    let pem = req.body;
    var sql = "SET @id_peminjaman = ?;SET @nama_mobil = ?;SET @tanggal_peminjaman = ?;SET @tanggal_pengembalian = ?;SET @status = ?; \
              CALL AddorUpdateEmployee(@id_peminjaman,@nama_mobil,@tanggal_peminjaman,@tanggal_pengembalian,@status);"
    mysqlConnection.query(sql,[pem.id_peminjaman,pem.nama_mobil,pem.tanggal_peminjaman,pem.tanggal_pengembalian,pem.status],(err,rows,fields)=>{
    if(!err) 
    res.send("Updation Done");
    else
        console.log(err);
})
});
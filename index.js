var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
const PORT = 3000;

// API version var to be set
// ???

const mySqlConn = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_db'
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log("Server is listening at port " + PORT);
})

// Get Students
app.get('/students', (req, res) => {

    let query = "SELECT * FROM tbl_students";

    mySqlConn.query(query, (err, result) => {

        if (!err) {
            res.json({
                code: 200,
                msg: 'No data has been found',
                data: result
            });
        } else {
            res.json({
                code: 200,
                msg: 'No data has been found',
                data: []
            })
        }
        
    });
})

// Save Student details

app.post('/student', (req, res) => {

    let name = req.body.name;
    let role_no = req.body.role_no;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let mobile_no = req.body.mobile_no;

    // Check if username already exists
    let checkUsernameQry = "SELECT * FROM `tbl_students` WHERE email = '" + username + "'";

    mySqlConn.query(checkUsernameQry, (err, result) => {

        if(err) {
            res.status(500).send(err);
        }

        if(result.length > 0) {
            res.json({
                data: [],
                code: 400,
                msg: 'Username already exists!!!'
            });
        } else {
            let query = "INSERT INTO `tbl_students` (name, role_no, username, password, email, mobile_no, is_active, created_on) VALUES ('" +
            name + "', '" + role_no + "', '" + username + "', '" + password + "', '" + email + "', '" + mobile_no + "' , 'Y', NOW())";

            mySqlConn.query(query, (err, result) => {
                if(!err) {
                    res.json({
                        data: [],
                        code: 200,
                        msg: 'data saved successfully'
                    })
                } else {
                    res.json({
                        data: [],
                        code: 400,
                        msg: 'Error => ' + err
                    })
                }
            });
        }

    })

});

// Update a student record
app.put('/student/:id', (req,res) => {

    let id = req.params.id;

    // Post vars
    let name = req.body.name;
    let role_no = req.body.role_no;
    let password = req.body.password;
    let email = req.body.email;
    let mobile_no = req.body.mobile_no;

    let updateQry = "UPDATE tbl_students SET name = '" + name + "', \
    role_no = '" + role_no + "', \
    password = '" + password + "', \
    email = '" + email + "', \
    mobile_no = '" + mobile_no + "' \
    WHERE id = '" + id + "'";

    console.log(updateQry);

    mySqlConn.query( updateQry, (err, result) => {

        if(!err) {
            res.json({
              data: [],
              code: 200,
              msg: "record updated successfully"  
            });
        } else {
            res.json({
                data: [],
                code: 400,
                msg: 'Error => ' + err
            });
        }

    });

});

// Find Student by ID
app.get('/student/:id', (req, res) => {

    let id = req.params.id;
    let query = "SELECT * FROM tbl_students WHERE id = '" + id + "' LIMIT 1";

    mySqlConn.query(query, (err, result) => {
        if(!err) {
            res.json({
                data: result,
                code: 200,
                msg: 'data found'
            });
        } else {
            res.json({
                data: [],
                code: 400,
                msg: 'Error => ' + err
            });
        }
    });

});

// Delete a student record
app.delete("/student/:id", (req,res) => {
    let id = req.params.id;
    let query = "DELETE FROM tbl_students WHERE id = '" + id +"' LIMIT 1";

    mySqlConn.query(query, (err, result) => {
        if(!err) {
            res.json({
                data: [],
                code: 200,
                msg: 'Record deleted'
            });
        } else {
            res.json({
                data: [],
                code: 400,
                msg: 'Error => ' + err
            });
        }
    });
}); 
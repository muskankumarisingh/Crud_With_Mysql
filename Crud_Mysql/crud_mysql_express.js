const express = require("express")
const app = express()
app.use(express.json())
const port = 4000;

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Muskan123@',
        database: 'MuskiData'
    }
});

// creating table
knex.schema.hasTable("class").then(function (exits) {
    if (!exits) {
        return knex.schema.createTable("class", function (table) {
            table.increments('Userid').primary();
            table.string("Name");
            table.string("Email");
            table.string("Password");
        })
    }
})
.then((data)=>{
    console.log("table has created")
})
.catch((error)=>{
    console.log("error")
})

// inserting data into table
app.post('/registration',(req,res) =>{
    knex("class").insert({
        Name: req.body.Name,
        Email: req.body.Email,
        password: req.body.password
    })
    .then((data)=>{
        console.log(data,'data inserted successfully')
        console.log(data)
        res.json(data)
    })
    .catch((err)=>{
        console.log(err,"err")
        res.json(err)
    })
})

// geeting data from a table
app.get('/geeting-data',(req,res)=>{
    knex.select('*').from("class")
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log(err)
        res.send(err)
    })
})
// updating data from table
app.put('/profile-edit/:Userid',(req,res)=>{
    knex.update(
        req.body
        )
        .table('class').where('Userid',req.params.Userid)

    // knex('user').where('Userid',req.params.Userid).update({Name:req.body.Name,email:req.body.email,password:req.body.password})
        .then((data)=>{
            console.log("updating");
            res.json(data)
        }).catch((err)=>{
            console.log("not updating")
            res.json(err)
        })
})

app.listen(port,()=>{
    console.log(`your port is working ${port}`)
})
// delete data from table
app.delete("/remove/:id",(req,res)=>{
    knex("class").where('Userid',req.params.id).del()
    .then((data)=>{
        res.send("user remove successfully")
        console.log("user remove the data from table")
    })
    .catch((err)=>{
        res.json({err:err.message})
        console.log("error")
    })
})

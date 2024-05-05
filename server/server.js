import express from "express"; 
import bodyParser from "body-parser"; 
import "dotenv/config";

import database from "./models/database.js"; 

const app = express(); 


app.use(bodyParser.json()); 

database.init(); 

database.createTable("nodetable", "email varchar, firstName varchar(200), lastName varchar(200), age int");


let categories = ["email", "firstName", "lastName"];

let values = ["swervejones@gmail.com", "swerve", "jones"];
//using PORT environment for when deployed but localhost 3000 while we dev 
app.listen(process.env.PORT || 3000, async () => 
    {
        console.log("Listening on port 3000!"); 
        let theTest = await database.insertData("nodetable", categories, values ); 
        console.log(theTest); 
    }); 

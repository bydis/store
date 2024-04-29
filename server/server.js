import express from "express"; 
import bodyParser from "body-parser"; 
import pg from "pg"; 


const app = express(); 


app.use(bodyParser.urlencoded({extended: true})); 

//used for dev purposes until deployment
const port = 3000; 

const db = new pg.Client({
    user: "bydus", 
    password: "", 
    database: "store",
    port: "5432", 
    host: "localhost"
}); 

db.connect(() => 
    {
    console.log("Database connected!")
    });

async function insertData()
{
    await db.query("INSERT INTO test(name) VALUES($1)", ['Justin']); 
    let theTest = await db.query("SELECT name FROM test"); 
    const result = theTest.rows[0]; 
    return result; 
}


app.listen(port, async () => 
    {
        console.log("Listening on port 3000!"); 
        let theTest = await insertData(); 
        console.log(theTest); 
    }); 

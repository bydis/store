import pg from "pg";
import "dotenv/config";


const database = 
    {
        db: null, 

        init: function init() 
        {
            
            this.db = new pg.Client({
                user: process.env.USER, 
                password: process.env.DB_PASSWORD, 
                database: "store",
                port: process.env.PORT || "5432", 
                host: process.env.HOST || "localhost"
            }); 

            this.db.connect(() => 
                {
                    console.log("Database connected!")
                });

        },
       
        //Takes .in a map for a parameter of varied length to create table
        createTable: async function createTable(tableName, categories)
        {
            await this.db.query(`CREATE TABLE ${tableName} ( ${categories} );`);
        },
  
        //insertData to automate insertion of any kind to any table                 
        //tableName is the name of the table you wish to insert data into
        //the table categories are the categories you wish to modify
        //the values are the string array of values you wish to add to the table 
        //table categories must be an array of strings of columns or null by default
        insertData: async function insertData(tableName, tableCategories = "", values)
        {
            //valueInsertions array used to hold $ amounts based on number of added categories
            let valueInsertions = [];

            //concatedCategories array used to convert the table categories array into concated array for query
            let concatedCategories = [];
 
            //theTest will ultimately take the data from the insertion to display                             
            let theTest = null;

            for(let i = 1; i <=  tableCategories.length; i++)
            {
                if(i == tableCategories.length )
                {
                    valueInsertions.push(`$${i}`); 
                    concatedCategories.push(`${tableCategories[i-1]}`);
                }
                else
                {
                    valueInsertions.push(`$${i}, `);
                    concatedCategories.push(`${tableCategories[i-1]}, `);
                }
            };

            if(tableCategories !== "")
            {
                await this.db.query(`INSERT INTO ${tableName}(${''.concat(...concatedCategories)}) VALUES(${''.concat(...valueInsertions)})`, [...values]); 
                theTest = await this.db.query(`SELECT ${''.concat(...concatedCategories)} FROM ${tableName}`); 
            }
            else
            {
                await this.db.query(`INSERT INTO ${tableName} VALUES(${''.concat(...valueInsertions)})`, [...values]); 
                theTest = await this.db.query(`SELECT * FROM ${tableName}`); 
            }
            const result = theTest.rows[0]; 
            return result;  
        },
        shutdown: function shutdown()
        {
            this.db.end();
        }
    }

export default database;

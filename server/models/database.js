import pg from "pg";
import "dotenv/config";

//Framework for node-postgres to easier accomplish tasks
const database = 
    {
        db: null, 

        init: function init() 
        {
            //NOTE: DATABASE_URL is for future deployment on Heroku when the database will be imported. For now, user and passowrd are utilized for the localhost
            this.db = new pg.Client({
                //connection string: process.env.DATABASE_URL
                user: process.env.USER, 
                password: process.env.DB_PASSWORD, 
                database: "store",
                port:  "5432", 
                host:  "localhost"
            }); 

            this.db.connect(() => 
                {
                    console.log("Database connected!")
                });

        },
       
        //If a table exists, the original table is dropped and replaced with a new table of the same name. 
        createTable: async function createTable(tableName, categories)
        {
            await this.db.query(`DROP TABLE IF EXISTS ${tableName}`);
            await this.db.query(`CREATE TABLE ${tableName} ( ${categories} );`);
        },
  
        //insertData to automate insertion of any kind to any table                 
        //tableName is the name of the table you wish to insert data into
        //tableCategories are the categories you wish to modify (null if not specified and all categories are to be modified)
            //--table categories must be an array of strings of columns or null by default
        //values is an array of values of any type you wish to add to the table

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
        //wipes a table clean of all data; TODO: create a deletion function that deletes selected categories 
        deleteAllTableData: async function deleteAllTableData(tableName)
        {
            await this.db.query(`DELETE FROM ${tableName}`); 
            this.db.end(); 
        },
        shutdown: function shutdown()
        {
            this.db.end();
        }
    }

export default database;

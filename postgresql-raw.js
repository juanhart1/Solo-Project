const pg = require('pg');
const URIforDB = 'postgres://student:apple@localhost/breathe_easy';
const pool = new pg.Pool({
    connectionString: URIforDB
});

//How to's:
    //Create a database/table: CREATE DATABASE/TABLE <NAME>
    //Delete/Drop a database/table: DROP DATABASE/TABLE <NAME>
    //List available databases: \l
    //List available tables in a database: \dt

//How do I connect to a postgres db???
  //I'll need to use the pool.connect method
    //pass it the uri where the database exists
    //provide a callback
      //callback has 2x args, err & db
        //if err is not null, we should throw an error
        //if err is null, I have access to the db
      //I can then proceed with raw SQL queries to that db
      //Use db.query
        //use 'CREATE TABLE IF NOT EXISTS' to create a table for 'cities' for first argument of db.query
      //use callback for error handling and to inspect result

//Wrap database connection inside of a Promise to be returned
//If Promise is successful, resolve the client that will be exposed
//If unsuccessful, effectively error handle

//Notes about Promises
//The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value

//Syntax of a Promise
  //new keyword to invoke constructor
  //Promise constructor being called
  //Promise constructor is passed a callback, known as the executor, with 2x arguments
    //resolve, which is the 

const breathe_easyDB = new Promise((resolve, reject) => {
  pool.connect((err, client) => {
    if (err) reject(err);
    else resolve(client);
  })
});

module.exports = breathe_easyDB;
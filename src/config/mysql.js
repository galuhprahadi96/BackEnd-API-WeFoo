// const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE,
// });

const pg = require('pg')

var connectionString = "postgres://kdfuhgjypbpmpj:2119524463418465823ea9dea82325b3e91e50d52d974f427a9031d01ef972d9@ec2-3-211-228-251.compute-1.amazonaws.com:5432/dblnhgfv6e2eu7";
const connection = new pg.Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
})

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("You are now conected ...");
});

module.exports = connection;

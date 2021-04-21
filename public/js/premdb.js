require('dotenv').config()



const { Client } = require('pg')
const connectionString = process.env.DB_URI; 

const client = new Client({
  connectionString,
})
client.connect()
client.query('SELECT * from standings', (err, res) => {
  console.log(err, res)
  client.end()
})
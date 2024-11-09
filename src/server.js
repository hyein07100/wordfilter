const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost', 
  user: 'root', 
  password: '1234', 
  database: 'wordfilter', 
  port: 3399
};

app.get('/prohibited-words', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT word FROM prohibited_words');
    await connection.end();
    res.json(rows.map(row => row.word));
});

app.get('/insult-words', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT word FROM insult_words');
    await connection.end();
    res.json(rows.map(row => row.word));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

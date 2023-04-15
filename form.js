var express = require('express');
var connection = require("./connection");


var app = express();
var port = 6597;



var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

app.get("/",function(req, res){
  res.sendFile(__dirname+"/register.html");
})



// Define an API endpoint for adding a new restaurant
app.post('/submit', (req, res) => {
  const { restaurant_name, contact_name, pincode, location, website, phone_number, avg_daily_transactions } = req.body;


  // Validate the user input
  if (!restaurant_name || !contact_name || !pincode || !location || !phone_number || !avg_daily_transactions) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // Insert the new restaurant into the MySQL database
  const query = 'INSERT INTO merchant_details (restauranName, contactName, pincode, location, website, phoneNumber, averageDailyTransaction) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [restaurant_name, contact_name, pincode, location, website, phone_number, avg_daily_transactions];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting new restaurant:', err);
      res.status(500).json({ error: 'Failed to add new restaurant' });
      return;
    }
    console.log('Inserted new restaurant with ID:', results.insertId);
    res.status(200).json({ message: 'Restaurant added successfully' });
  });

});


// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

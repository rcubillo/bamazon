// Load the NPM Package inquirer
var inquirer = require('inquirer');

// Load my password
var login = require("./login");

// Load the NPM Package mysql
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: login.password,
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
});


// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Created a series of questions
inquirer.prompt([
  {
    type: "list",
    name: "doingWhat",
    message: "Welcome Manager. What do you want to do today?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory" , "Add New Product"]
  },
]).then(function(manager) {
if (manager.doingWhat === "View Products for Sale"){
    inventory();
}


});


function inventory() {
  connection.query('SELECT * FROM products', function(err, res) {
    console.log('===================================================');
    console.log('BAMAZON');
    console.log('Existing Inventory: ');
    console.log('===================================================');
    for (var i = 0; i < res.length; i++) {
      console.log(
        'ID: ' +
          res[i].item_id +
          ' | ' +
          'Product: ' +
          res[i].product_name +
          ' | ' +
          'Department: ' +
          res[i].department_name +
          ' | ' +
          'Price: $' +
          res[i].price +
          ' | ' +
          'QTY: ' +
          res[i].stock_quantity
      );
      console.log('');
    }
  });
};